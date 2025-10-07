from flask import Blueprint, request, jsonify
from orm import db, User, UserRole, LevelPrivacy, Composition, Contributor, Collection, UserInfo
from flask_jwt_extended import current_user, jwt_required
from api.auth import is_user_logged_in
from flask_cors import cross_origin
from utils import Utils
import config
import os
import shutil

from .composition_helper import checkcompshouldberetrieved, getcompjsonwithuserandcollection, getcollaborationsbyuseridwithrole, getfilteredcompostionsbyrole, setcontributorsemails, deletecompfolder, updatecompfield, clonecompositiontracks, ERROR_404

comp = Blueprint('comp', __name__)

@comp.route('/compositions')
@cross_origin()
def compositions():
    user = is_user_logged_in()
    user_auth = user.id if user else None
    allcompositions = Composition.query.all()
    compositions = []
    for comp in allcompositions:
        if checkcompshouldberetrieved(comp, user_auth):
            compositions.append(comp)

    jcompositions = getcompjsonwithuserandcollection(compositions)
    return jsonify(jcompositions)


@comp.route('/recentcompositions')
@cross_origin()
def recentcompositions():
    allcompositions = Composition.query.filter_by(privacy=LevelPrivacy.public.value)
    compositions = allcompositions.order_by(Composition.id.desc()).limit(config.MAX_RECENT_COMPOSITIONS)
    jcompositions = getcompjsonwithuserandcollection(compositions)
    return jsonify(jcompositions)

@comp.route('/mycompositions')
@jwt_required()
@cross_origin()
def mycompositions():
    user_auth = current_user.id
    allmycompositions = Composition.query.filter_by(user_id=user_auth)
    collaborations = getcollaborationsbyuseridwithrole(user_auth,user_auth)    
    merged_comps = list(allmycompositions) + collaborations
    jcompositions = getcompjsonwithuserandcollection(merged_comps) 
    return jsonify(jcompositions)

@comp.route('/compositionsbyuserid/<string:uuid>')
@cross_origin()
def compositionsbyuserid(uuid):
    currentuser = is_user_logged_in()
    user_auth = currentuser.id if currentuser else None   
    usertoget = User.query.filter_by(uid=uuid).first()
    if(usertoget is not None):                
        allcompositions = Composition.query.filter_by(user_id=usertoget.id)
        filteredcompositions = getfilteredcompostionsbyrole(allcompositions, user_auth)
        collaborations = getcollaborationsbyuseridwithrole(usertoget.id, user_auth)           
        merged_comps = list(filteredcompositions) + collaborations
        jcompositions = getcompjsonwithuserandcollection(merged_comps)
        jcompositions['username'] = UserInfo.query.get(usertoget.id).name
        return jsonify(jcompositions)
    else:
        return jsonify({"ok":False, "error":"user id not found"})

# if privacy= 2 (onlyreg) or 3 (private), and not logged => not accesible
# if privacy=3 (private) and not either owner/contributor => not accesible

@comp.route('/composition/<string:uuid>')
@cross_origin()
def composition(uuid):
    user = is_user_logged_in()
    user_auth = user.id if user else None
    composition = Composition.query.filter_by(uuid=uuid).first()
    if(composition is None):
        return jsonify({"error":ERROR_404})
    else:
        if ((user_auth is None) and ((composition.privacy.value == LevelPrivacy.onlyreg.value) or (composition.privacy.value == LevelPrivacy.private.value))):
            return jsonify({"error":"composition not accesible"})
        else:
            owner = composition.user.id == user_auth
            iscontributor = Contributor.query.filter_by(composition_id=composition.id, user_id=user_auth).first()
            role = UserRole.none.value
            isopen = composition.opentocontrib
            if(isopen):
                if (user_auth is None):
                    role = UserRole.none.value
                else:
                    role = UserRole.member.value
            if(composition.user.id == user_auth):
                role = UserRole.owner.value
            if(iscontributor is not None):
                role = iscontributor.role.value

            if((composition.privacy.value == LevelPrivacy.private.value) and (composition.user.id != user_auth) and (role == UserRole.none.value)):
                return jsonify({"error":"composition not accesible"})
            else:
                data = composition.to_dict( rules=('-path','-collection', '-id') )
                data['username'] = UserInfo.query.get(composition.user_id).name
                if data['contributors'] and (role == UserRole.owner.value):                    
                    data['contributors'] = setcontributorsemails(data['contributors'])                    
                if(data['collection_id']):
                    coll = Collection.query.get(data['collection_id'])
                    data['parent_collection'] = coll.title
                    data['collection_id'] = coll.uuid
                data['owner'] = owner
                data['role'] = role
                data['user_id'] = User.query.get(composition.user_id).uid
                if(user is not None):
                    data['viewer_id'] = user.uid
                    data['user_isadmin'] = user.is_admin
                jcomposition = jsonify(data)
                return jcomposition

@comp.route('/newcomposition', methods=['POST'])
@jwt_required()
@cross_origin()
def newcomposition():

    user_auth = current_user.id
    title = request.get_json()["title"]
    description = request.get_json().get("description", None)
    privacy = request.get_json()["privacy_level"]
    parent_uuid = request.get_json().get("parent_uuid", None)
    collection=None
    if(parent_uuid):
            parent=Collection.query.filter_by(uuid=parent_uuid).first()
            if(parent and parent.user_id == user_auth):
                collection=parent
            else:
                return jsonify({"error":"wrong parent uuid"})
    if(privacy and (privacy is not None) and (LevelPrivacy.public.value <= int(privacy) <= LevelPrivacy.private.value)):
        user = User.query.get(current_user.id)
        composition = Composition(title=title,
                                  description=description,
                                  user=user, privacy=LevelPrivacy(int(privacy)).name,
                                  uuid=Utils().generate_unique_uuid(Composition, 'uuid'),
                                  collection=collection)
        db.session.add(composition)
        db.session.commit()
        return jsonify(composition=composition.to_dict( rules=('-path','-collection') ), ok=True)
    else:
        return jsonify({"error":"privacy value not valid", "ok": False})

@comp.route('/clonecomposition', methods=['POST'])
@jwt_required()
@cross_origin()
def clonecomposition():    
    title = request.get_json()["title"]
    description = request.get_json().get("description", None)
    privacy = request.get_json()["privacy_level"]
    clone_from = request.get_json().get("clone_from", None)
    if(clone_from):
        orig_composition = Composition.query.filter_by(uuid=clone_from).first()
        if(orig_composition):
            if(orig_composition.is_template):
                parent=Collection.query.get(orig_composition.collection_id)
                if(privacy and (privacy is not None) and (LevelPrivacy.public.value <= int(privacy) <= LevelPrivacy.private.value)):                                      
                    src_dir = f"compositions/{orig_composition.id}"                     
                    fullpath_src_dir = os.path.join(config.DATA_BASEDIR, src_dir )
                    if not os.path.exists(fullpath_src_dir):
                        os.makedirs(fullpath_src_dir)                   
                    user = User.query.get(current_user.id)
                    clone_composition = Composition(title=title,
                                               description=description,
                                               user=user, privacy=LevelPrivacy(int(privacy)).name,
                                               uuid=Utils().generate_unique_uuid(Composition, 'uuid'),
                                               collection=parent, cloned_from=orig_composition.uuid)                    
                    db.session.add(clone_composition)
                    db.session.commit()                    
                    dest_dir = f"compositions/{clone_composition.id}/"
                     
                    fullpath_dest_dir = os.path.join(config.DATA_BASEDIR, dest_dir )
                    if not os.path.exists(os.path.dirname(fullpath_dest_dir)):
                        clone_tracks = clonecompositiontracks(orig_composition, clone_composition, user)
                        if clone_tracks:                        
                            shutil.copytree(fullpath_src_dir, fullpath_dest_dir)
                            return jsonify(composition=clone_composition.to_dict( rules=('-path','-collection') ), ok=True)
                        else:
                            db.session.delete(clone_composition)
                            db.session.commit()
                            return jsonify({"error":"Error while cloning", "ok": False})                        
                    else:
                        return jsonify({"error":"composition directory already exists", "ok": False})
                else:
                    return jsonify({"error":"privacy value not valid", "ok": False})
                
            else:
                return jsonify({"error":"Composition is not a template", "ok": False}) 
        else:
            return jsonify({"error":"Composition to clone not found", "ok": False})    
    else:
        return jsonify({"error":"comp uuid must not be empty", "ok": False})  

@comp.route('/deletecomposition/<string:uuid>', methods=['DELETE'])
@jwt_required()
@cross_origin()
def deletecomposition(uuid):
    user_auth = current_user.id
    composition = Composition.query.filter_by(uuid=uuid).first()
    if(composition is None):
        return jsonify({"error":ERROR_404})
    else:
        # only the creator can delete the composition
        if(composition.user.id == user_auth):
            deletecompfolder(composition.id)
            db.session.delete(composition)
            db.session.commit()
            return jsonify({"ok":True, "result": "composition deleted successfully"})
        else:
            return jsonify({"error":"user is not authorized"})

@comp.route('/updatecompprivacy', methods=['PATCH'])
@jwt_required()
@cross_origin()
def updatecompprivacy():
   # TODO: From API perspective, if the composition is Open To Contribution
   # it should not be possible to set privacy level to 3 (private)
   # according to UI interaction
   # TODO: control the level of privacy is between 1 and 3
   return updatecompfield('privacy')

@comp.route('/updatecomptitle', methods=['PATCH'])
@jwt_required()
@cross_origin()
def updatecomptitle():
    return updatecompfield('title')

@comp.route('/updatecompdescription', methods=['PATCH'])
@jwt_required()
@cross_origin()
def updatecompdescription():
    return updatecompfield('description')

@comp.route('/updatecomptocontrib', methods=['PATCH'])
@jwt_required()
@cross_origin()
def updatecomptocontrib():
    # TODO: control the value is boolean
    return updatecompfield('opentocontrib')

@comp.route('/updatecompcollection', methods=['PATCH'])
@jwt_required()
@cross_origin()
def updatecompcollection():
    user_auth = current_user.id
    coll_id = request.get_json()['collection_id']
    comp_uid = request.get_json()['uuid']
    composition = Composition.query.filter_by(uuid=comp_uid).first()
    if(composition is not None):
        if(composition.user.id == user_auth):
            collection = Collection.query.filter_by(uuid=coll_id).first()
            if(coll_id == '' or coll_id == None) or(collection is not None):
                return updatecompfield('collection_id')
            else:
                return jsonify({"error":"collection not found"})
        else:
            return jsonify({"error":"user not authorized"})
    else:
        return jsonify({"error":"composition not found"})
@comp.route('/updatecompastemplate', methods=['PATCH'])
@jwt_required()
@cross_origin()
def updatecompastemplate():
    # TODO: control the value is boolean
    user_isadmin = current_user.is_admin
    if(user_isadmin):
        return updatecompfield('is_template')
    else:
        return jsonify({"error":"user is not admin"})