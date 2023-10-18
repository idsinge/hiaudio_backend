from flask import Blueprint, request, jsonify
from flask_jwt_extended import current_user, jwt_required
from api.auth import is_user_logged_in
from flask_cors import cross_origin
from sqlalchemy import and_, or_
from orm import db, User, Collection, LevelPrivacy
import shortuuid


coll = Blueprint('coll', __name__)


@coll.route('/collection/<string:uuid>')
@cross_origin()
def collection(uuid):
    user = is_user_logged_in()
    user_auth = user.id if user else None
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
    user = is_user_logged_in()
    user_auth = user.id if user else None
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
        _user = User.query.get(current_user.id)

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

def get_collection_hierarchy(collection):
    subcollections = Collection.query.filter_by(parent_id=collection.id).all()
    return {
        'uuid': collection.uuid,
        'privacy': collection.privacy.value,
        'title': collection.title,
        'description': collection.description,
        'compositions': [get_composition_hierarchy(composition) for composition in collection.compositions],
        'collections': [get_collection_hierarchy(sub_collection) for sub_collection in subcollections]
    }

def get_composition_hierarchy(composition):
    return {
        'uuid': composition.uuid,
        'privacy': composition.privacy.value,
        'title': composition.title,
        'description': composition.description,
        #'tracks': [track.title for track in composition.tracks],
        #'contributors': [contributor.name for contributor in composition.contributors],
        'opentocontrib': composition.opentocontrib,
    }

@coll.route('/mycollectionsastree', methods=['GET'])
@jwt_required()
@cross_origin()
def mycollectionsastree():
    root_collections = Collection.query.filter_by(user_id=current_user.id, parent_id=None).all()
    collections_json = [get_collection_hierarchy(collection) for collection in root_collections]
    return jsonify(collections_json)


@coll.route('/mycollections')
@jwt_required()
@cross_origin()
def mycollections():
    all_collections = Collection.query.filter_by(user_id=current_user.id).all()
    jcollections = jsonify(all_collections=[ collection.to_dict( rules=('-id','-compositions',) ) for collection in all_collections])
    return jcollections


@coll.route('/newcollection', methods=['POST'])
@jwt_required()
@cross_origin()
def newcollection():
    user_auth = current_user.id
    rjson = request.get_json()
    title = rjson.get("title", None)
    description = rjson.get("description", None)
    privacy = rjson.get("privacy_level", None)
    parent_uuid = rjson.get("parent_uuid", None)
    if(privacy and (LevelPrivacy.public.value <= int(privacy) <= LevelPrivacy.private.value)):
        user = User.query.get(current_user.id)
        parent_id=None
        if(parent_uuid):
            parent=Collection.query.filter_by(uuid=parent_uuid).first()
            if(parent and parent.user_id == user_auth):
                parent_id=parent.id
            else:
                return jsonify({"error":"wrong parent uuid or not authorized"})
        ## TODO: check uuid is not duplicated
        coll_uuid=shortuuid.uuid()
        collection = Collection(title=title, description=description, user=user, privacy=LevelPrivacy(int(privacy)).name, uuid=coll_uuid, parent_id=parent_id)
        db.session.add(collection)
        db.session.commit()
        return jsonify({"ok":True, "uuid":coll_uuid})
    else:
        return jsonify({"ok":False, "error":"privacy value not valid"})


@coll.route('/updatecolltitle', methods=['PATCH'])
@jwt_required()
@cross_origin()
def updatecolltitle():
    title = request.get_json()["title"]
    if(title is not None):
        return updatecollfield("title", title)
    else:
        return jsonify({"error":"wrong title value"})

@coll.route('/updatecolldescription', methods=['PATCH'])
@jwt_required()
@cross_origin()
def updatecolldescription():
    description = request.get_json()["description"]
    return updatecollfield("description", description)


@coll.route('/updatecollprivacy', methods=['PATCH'])
@jwt_required()
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
@jwt_required()
@cross_origin()
def updatecollparent():
    user_auth = current_user.id
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
                                return jsonify({"error":"error updating parent in children"})
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



def updatecollfield(field, fieldvalue):
    if is_user_logged_in():
        user_auth = current_user.id
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
                return jsonify({"error":"user not authorized"})
    else:
        return jsonify({"error":"user not authorized"})


@coll.route('/deletecollection/<string:uuid>', methods=['DELETE'])
@jwt_required()
@cross_origin()
def deletecollection(uuid):
    user_auth = current_user.id
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