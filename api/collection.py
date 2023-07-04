from flask import Blueprint, request, jsonify
from flask_login import (current_user, login_required)
from flask_cors import cross_origin
from sqlalchemy import and_, or_
from orm import db, User, Collection, LevelPrivacy
import shortuuid


coll = Blueprint('coll', __name__)


@coll.route('/collection/<string:uuid>')
@cross_origin()
def collection(uuid):
    user_auth = current_user.get_id() and int(current_user.get_id())
    collection = Collection.query.filter_by(uuid=uuid).first()
    if(collection is None):
        return jsonify({"error":"collection not found"})
    else:
        if ((user_auth is None) and ((collection.privacy.value == LevelPrivacy.onlyreg.value) or (collection.privacy.value == LevelPrivacy.private.value))):
            return jsonify({"error":"collection not accesible"})
        else:            
            if((collection.privacy.value == LevelPrivacy.private.value) and (collection.user.id != user_auth)):
                return jsonify({"error":"collection not accesible"})
            else:
                data = collection.to_dict( rules=('-id','-compositions',) )      
                jcollection = jsonify(data)
                return jcollection                

@coll.route('/collectionsbyuser/<string:uid>')
@cross_origin()
def collectionsbyuser(uid):
    user_auth = current_user.get_id() and int(current_user.get_id())
    if(user_auth is None):
        # if it's not registered user show only public
        user = User.query.filter_by(uid=uid).first()
        if(user):
            all_public_collections = Collection.query.filter_by(user_id=user.id, privacy=LevelPrivacy.public.value).all()
            jcollections = jsonify(all_public_collections=[ collection.to_dict( rules=('-id','-compositions',) ) for collection in all_public_collections])
            return jcollections              
        else:
            return jsonify({"error":"user uid not found"})  
    else:
        _user = User.query.get(current_user.get_id())
         
        if(_user.uid == uid):
            # if it's the user itself show private too
            all_collections = Collection.query.filter_by(user_id=user_auth).all()            
            jcollections = jsonify(all_collections=[ collection.to_dict( rules=('-id','-compositions',) ) for collection in all_collections])
            return jcollections            
        else:
            target_user = User.query.filter_by(uid=uid).first()
            if(target_user):
                # if it's registered user not show private                
                all_pubonlyreg_coll = Collection.query.filter(and_(or_(Collection.privacy == LevelPrivacy.public.value, Collection.privacy == LevelPrivacy.onlyreg.value), Collection.user_id==target_user.id)).all()                
                jcollections = jsonify(all_pubonlyreg_coll=[ collection.to_dict( rules=('-id','-compositions',) ) for collection in all_pubonlyreg_coll])
                return jcollections                
            else:
                return jsonify({"error":"user uid not found"})   

@coll.route('/newcollection', methods=['POST'])
@login_required
@cross_origin()
def newcollection():
    if current_user.is_authenticated:
        user_auth = current_user.get_id() and int(current_user.get_id())
        title = request.get_json()["title"]
        privacy = request.get_json()["privacy_level"]
        parent_uuid = request.get_json()["parent_uuid"]
        if(privacy and (LevelPrivacy.public.value <= int(privacy) <= LevelPrivacy.private.value)):
            user = User.query.get(current_user.get_id())            
            parent_id=None
            if(parent_uuid):
                parent=Collection.query.filter_by(uuid=parent_uuid).first()
                if(parent and parent.user_id == user_auth):
                    parent_id=parent.id
                else:
                    return jsonify({"error":"wrong parent uuid or not authorized"})                    
            ## TODO: check uuid is not duplicated
            coll_uuid=shortuuid.uuid()
            collection = Collection(title=title, user=user, privacy=LevelPrivacy(int(privacy)).name, uuid=coll_uuid, parent_id=parent_id)
            db.session.add(collection)
            db.session.commit()
            return jsonify({"ok":True, "uuid":coll_uuid})
        else:
            return jsonify({"error":"privacy value not valid"})
    else:
        return jsonify({"error":"not authenticated"})

@coll.route('/updatecolltitle', methods=['PATCH'])
@login_required
@cross_origin()
def updatecolltitle():
    title = request.get_json()["title"]
    if(title is not None):
        return updatecollfield("title", title)
    else:
        return jsonify({"error":"wrong title value"})

@coll.route('/updatecollprivacy', methods=['PATCH'])
@login_required
@cross_origin()
def updatecollprivacy():
    privacy = request.get_json()["privacy"]
    if(LevelPrivacy(int(privacy)).name):
        fieldvalue = LevelPrivacy(int(privacy)).name
        return updatecollfield("privacy", fieldvalue)
    else:
        return jsonify({"error":"wrong privacy value"})

def countstepsup(current_parent, limit):
    steps = 0
    search = True
    the_parent = current_parent
    while (the_parent.parent_id != None and search):
        if(limit and limit == steps):
            search = False
        else:
            next_parent = Collection.query.filter_by(id=the_parent.parent_id).first()
            if(next_parent):
                the_parent = next_parent        
                steps += 1
            else:
                search = False
    return steps

@coll.route('/updatecollparent', methods=['PATCH'])
@login_required
@cross_origin()
def updatecollparent():
    if current_user.is_authenticated:
        user_auth = current_user.get_id() and int(current_user.get_id())     
        parent_uuid = request.get_json()["parent_uuid"]
        parent_collection = Collection.query.filter_by(uuid=parent_uuid).first()
        coll_uuid = request.get_json()["uuid"] 
        current_collection = Collection.query.filter_by(uuid=coll_uuid).first()
        if(current_collection and (current_collection.user.id == user_auth)): 
            if(parent_collection is None):
                # make root collection
                # Check it's not already NULL
                if(current_collection.parent_id):
                    setattr(current_collection, "parent_id", None)                
                    db.session.commit()
                    return jsonify({"ok":True, "result": "parent updated successfully as root"})
                else:
                    return jsonify({"ok":True, "result": "already root"})
            else:
                
                if(parent_collection.id !=current_collection.id):                            
                        
                        is_parent = Collection.query.filter_by(parent_id=current_collection.id).all()
                        
                        if(len(is_parent) > 0):

                            steps = countstepsup(current_collection, None)                            
                            new_steps = countstepsup(parent_collection, steps)
                            
                            if(new_steps >= steps):
                                try:
                                    for child in is_parent:
                                        child.parent_id = current_collection.parent_id                            
                                    setattr(current_collection, "parent_id", parent_collection.id)                
                                    db.session.commit()
                                    return jsonify({"ok":True, "result": "parent moved down successfully and children new parent"})
                                except Exception as e:
                                    db.session.rollback()
                                    jsonify({"error":"error updating parent in children"})
                            else:                       
    
                                setattr(current_collection, "parent_id", parent_collection.id)                
                                db.session.commit()
                                return jsonify({"ok":True, "result": "parent moved up successfully"})
                        else:
                            setattr(current_collection, "parent_id", parent_collection.id)                
                            db.session.commit()
                            return jsonify({"ok":True, "result": "parent updated successfully"})
                else:
                    return jsonify({"error":"cannot update collection parent to itself"})
        else:
            return jsonify({"error":"wrong collection or user"})       
  
    else:
        jsonify({"error":"user not authorized"})

def updatecollfield(field, fieldvalue):
    if current_user.is_authenticated:
        user_auth = current_user.get_id() and int(current_user.get_id())       
        coll_uuid = request.get_json()["uuid"]        
        collection = Collection.query.filter_by(uuid=coll_uuid).first()
        if(collection is None):
            return jsonify({"error":"collection not found"})
        else:
            if(collection.user.id == user_auth): 
                setattr(collection, field, fieldvalue)
                db.session.commit()
                return jsonify({"ok":True, "result": field + " updated successfully"})
            else:
                jsonify({"error":"user not authorized"})  
    else:
        jsonify({"error":"user not authorized"})
    

@coll.route('/deletecollection/<string:uuid>', methods=['DELETE'])
@login_required
@cross_origin()
def deletecollection(uuid):
    user_auth = current_user.get_id() and int(current_user.get_id())
    collection = Collection.query.filter_by(uuid=uuid).first()
    if(collection is None):
        return jsonify({"error":"collection not found"})
    else:
        if(collection.user.id == user_auth):           
            db.session.delete(collection)
            db.session.commit()
            return jsonify({"ok":True, "result": "collection deleted successfully"})
        else:
            return jsonify({"error":"user is not authorized"})