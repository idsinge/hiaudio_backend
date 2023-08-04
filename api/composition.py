import os
import shutil
from flask import Blueprint, request, jsonify
from orm import db, User, UserRole, LevelPrivacy, Composition, Contributor, Collection
from flask_login import (current_user, login_required)
from flask_cors import cross_origin
import shortuuid
import config

comp = Blueprint('comp', __name__)

@comp.route('/compositions')
@cross_origin()
def compositions():
    user_auth = current_user.get_id() and int(current_user.get_id())
    allcompositions = Composition.query.all()
    compositions = []
    for comp in allcompositions:
        if ((user_auth is None) and (comp.privacy.value == LevelPrivacy.public.value)):
            compositions.append(comp)
        else:
            if((comp.privacy.value != LevelPrivacy.private.value ) and (user_auth is not None)):
                compositions.append(comp)
            else:
                if(comp.user.id == user_auth):
                    compositions.append(comp)
                else:
                    iscontributor = Contributor.query.filter_by(composition_id=comp.id, user_id=user_auth).first()
                    if(iscontributor is not None):
                        compositions.append(comp)

    jcompositions = jsonify(compositions=[ composition.to_dict( rules=('-tracks','-collection') ) for composition in compositions])
    return jcompositions


# if privacy= 2 (onlyreg) or 3 (private), and not logged => not accesible
# if privacy=3 (private) and not either owner/contributor => not accesible

@comp.route('/composition/<string:uuid>')
@cross_origin()
def composition(uuid):
    user_auth = current_user.get_id() and int(current_user.get_id())
    composition = Composition.query.filter_by(uuid=uuid).first()
    if(composition is None):
        return jsonify({"error":"composition not found"})
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
                data = composition.to_dict( rules=('-path','-collection') )
                if(data['collection_id']):
                    coll = Collection.query.get(data['collection_id'])
                    data['collection_id'] = coll.uuid
                data['owner'] = owner
                data['role'] = role
                data['viewer_id'] = user_auth
                jcomposition = jsonify(data)
                return jcomposition

@comp.route('/newcomposition', methods=['POST'])
@login_required
@cross_origin()
def newcomposition():
    if current_user.is_authenticated:
        user_auth = current_user.get_id() and int(current_user.get_id())
        title = request.get_json()["title"]
        privacy = request.get_json()["privacy_level"]
        collection=None
        try:
            parent_uuid = request.get_json()["parent_uuid"]
        except KeyError:
            parent_uuid = None
        if(parent_uuid):
                parent=Collection.query.filter_by(uuid=parent_uuid).first()
                if(parent and parent.user_id == user_auth):
                    collection=parent
                else:
                    return jsonify({"error":"wrong parent uuid"})
        if(privacy and (privacy is not None) and (LevelPrivacy.public.value <= int(privacy) <= LevelPrivacy.private.value)):
            user = User.query.get(current_user.get_id())
            ## TODO: check uuid is not duplicated
            composition = Composition(title=title, user=user, privacy=LevelPrivacy(int(privacy)).name, uuid=shortuuid.uuid(), collection=collection)
            db.session.add(composition)
            db.session.commit()
            return jsonify(composition=composition.to_dict( rules=('-path','-collection') ))
        else:
            return jsonify({"error":"privacy value not valid"})

    else:
        return jsonify({"error":"not authenticated"})

def deletecompfolder(compid):
    compositionpath = f"compositions/{compid}/"
    fullpath = os.path.join(config.DATA_BASEDIR, compositionpath )
    if os.path.exists(fullpath):
        shutil.rmtree(fullpath)

@comp.route('/deletecomposition/<string:uuid>', methods=['DELETE'])
@login_required
@cross_origin()
def deletecomposition(uuid):
    user_auth = current_user.get_id() and int(current_user.get_id())
    composition = Composition.query.filter_by(uuid=uuid).first()
    if(composition is None):
        return jsonify({"error":"composition not found"})
    else:
        iscontributor = Contributor.query.filter_by(composition_id=composition.id, user_id=user_auth).first()

        role = UserRole.none.value
        if(composition.user.id == user_auth):
            role = UserRole.owner.value
        if(iscontributor is not None):
            role = iscontributor.role.value

        if(role == UserRole.owner.value):
            deletecompfolder(composition.id)
            db.session.delete(composition)
            db.session.commit()
            return jsonify({"ok":True, "result": "composition deleted successfully"})
        else:
            return jsonify({"error":"user is not authorized"})

@comp.route('/updatecompprivacy', methods=['PATCH'])
@login_required
@cross_origin()
def updatecompprivacy():
   # TODO: From API perspective, if the composition is Open To Contribution
   # it should not be possible to set privacy level to 3 (private)
   # according to UI interaction
   # TODO: control the level of privacy is between 1 and 3
   return updatecompfield('privacy')

@comp.route('/updatecomptitle', methods=['PATCH'])
@login_required
@cross_origin()
def updatecomptitle():
    return updatecompfield('title')

@comp.route('/updatecomptocontrib', methods=['PATCH'])
@login_required
@cross_origin()
def updatecomptocontrib():
    # TODO: control the value is boolean
    return updatecompfield('opentocontrib')

@comp.route('/updatecompcollection', methods=['PATCH'])
@login_required
@cross_origin()
def updatecompcollection():
    # TODO: issue-150 other users with owner role can update collection too
    user_auth = current_user.get_id() and int(current_user.get_id())
    coll_id = request.get_json()['collection_id']
    collection = Collection.query.filter_by(uuid=coll_id).first()
    if((coll_id == '' or coll_id == None) or(collection is not None and collection.user.id == user_auth)):
        return updatecompfield('collection_id')
    else:
        return jsonify({"error":"user not authorized or collection not found"})

def updatecompfield(field):
    comp_uuid = request.get_json()['uuid']
    composition = Composition.query.filter_by(uuid=comp_uuid).first()
    if(composition is None):
        return jsonify({"error":"composition not found"})
    else:
        ## TODO: wrap in try catch and send error, for example for invalid Privacy
        fieldvalue = request.get_json()[field]
        if(field == 'collection_id'):
            collection=Collection.query.filter_by(uuid=fieldvalue).first()
            if(collection):
                fieldvalue = collection.id
            elif(fieldvalue =="" or fieldvalue == None):
                fieldvalue = None
            else:
                return jsonify({"error":"not valid collection"})
        if(field == 'privacy'):
            fieldvalue = LevelPrivacy(int(fieldvalue)).name
        user_auth = current_user.get_id() and int(current_user.get_id())
        iscontributor = Contributor.query.filter_by(composition_id=composition.id, user_id=user_auth).first()
        role = UserRole.none.value
        if(composition.user.id == user_auth):
            role = UserRole.owner.value
        if(iscontributor is not None):
            role = iscontributor.role.value
        if(role == UserRole.owner.value):
            setattr(composition, field, fieldvalue)
            db.session.commit()
            return jsonify({"ok":True, "result": field + " updated successfully"})
        else:
            return jsonify({"error":"not possible to update composition field " + field + " with role " + str(role)})