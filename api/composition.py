import os
import shutil
from flask import Blueprint, request, jsonify
from orm import db, User, UserRole, LevelPrivacy, Composition, Contributor, Collection, UserInfo
from flask_jwt_extended import current_user, jwt_required
from api.auth import is_user_logged_in
from flask_cors import cross_origin
import shortuuid
import config

comp = Blueprint('comp', __name__)

def getcompositionusername(user_id):
    return UserInfo.query.get(user_id).name

def getnameparentcollection(collection_id):
    if collection_id is not None:
        coll = Collection.query.get(collection_id)        
        return coll.title
    else:
        return collection_id

def getcompjsonwithuserandcollection(compositions):
    composition_dicts = [
        {      
            **composition.to_dict(rules=('-c', '-collection')),
            'parent_collection': getnameparentcollection(composition.collection_id),
            'username': getcompositionusername(composition.user_id)
        }
        for composition in compositions
    ]    
    result_dict = {'compositions': composition_dicts}
    return  jsonify(result_dict)

@comp.route('/compositions')
@cross_origin()
def compositions():
    user = is_user_logged_in()
    user_auth = user.id if user else None
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

    jcompositions = getcompjsonwithuserandcollection(compositions)
    return jcompositions


@comp.route('/recentcompositions')
@cross_origin()
def recentcompositions():
    allcompositions = Composition.query.filter_by(privacy=LevelPrivacy.public.value)
    compositions = allcompositions.order_by(Composition.id.desc()).limit(config.MAX_RECENT_COMPOSITIONS)
    jcompositions = getcompjsonwithuserandcollection(compositions)
    return jcompositions

@comp.route('/mycompositions')
@jwt_required()
@cross_origin()
def mycompositions():
    user_auth = current_user.id
    allmycompositions = Composition.query.filter_by(user_id=user_auth)
    collaborations = get_my_collaborations(user_auth)
    merged_comps = list(allmycompositions) + collaborations
    jcompositions = getcompjsonwithuserandcollection(merged_comps) 
    return jcompositions

def get_my_collaborations(user_auth):
        compositions = []
        iscontributor = Contributor.query.filter_by(user_id=user_auth)
        for collab in iscontributor:
            comp = Composition.query.get(collab.composition_id)
            compositions.append(comp)
        return  compositions

@comp.route('/mycollaborations')
@jwt_required()
@cross_origin()
def mycollaborations():
    user_auth = current_user.id
    compositions = get_my_collaborations(user_auth)
    jcompositions = jsonify(mycollaborations=[ composition.to_dict( rules=('-tracks','-collection') ) for composition in compositions])
    return jcompositions

def setcontributorsemails(listofcontrib):
    newlist = listofcontrib
    index = 0
    for contrib in newlist:
        contrib_usrinf = UserInfo.query.filter_by(user_uid=contrib['user_uid']).first()
        newlist[index]['email'] = contrib_usrinf.user_email
        index += 1   
    return newlist

# if privacy= 2 (onlyreg) or 3 (private), and not logged => not accesible
# if privacy=3 (private) and not either owner/contributor => not accesible

@comp.route('/composition/<string:uuid>')
@cross_origin()
def composition(uuid):
    user = is_user_logged_in()
    user_auth = user.id if user else None
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
                data = composition.to_dict( rules=('-path','-collection', '-id') )
                if data['contributors'] and (role == UserRole.owner.value):                    
                    data['contributors'] = setcontributorsemails(data['contributors'])                    
                if(data['collection_id']):
                    coll = Collection.query.get(data['collection_id'])
                    data['collection_id'] = coll.uuid
                data['owner'] = owner
                data['role'] = role
                data['user_id'] = User.query.get(composition.user_id).uid
                if(user is not None):
                    data['viewer_id'] = user.uid
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
        ## TODO: check uuid is not duplicated
        composition = Composition(title=title, description=description, user=user, privacy=LevelPrivacy(int(privacy)).name, uuid=shortuuid.uuid(), collection=collection)
        db.session.add(composition)
        db.session.commit()
        return jsonify(composition=composition.to_dict( rules=('-path','-collection') ), ok=True)
    else:
        return jsonify({"error":"privacy value not valid", "ok": False})


def deletecompfolder(compid):
    compositionpath = f"compositions/{compid}/"
    fullpath = os.path.join(config.DATA_BASEDIR, compositionpath )
    if os.path.exists(fullpath):
        shutil.rmtree(fullpath)

@comp.route('/deletecomposition/<string:uuid>', methods=['DELETE'])
@jwt_required()
@cross_origin()
def deletecomposition(uuid):
    user_auth = current_user.id
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
    # TODO: issue-150 other users with owner role can update collection too
    user_auth = current_user.id
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
        user_auth = current_user.id
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