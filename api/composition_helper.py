import os
import shutil
from flask import request, jsonify
from orm import db, UserRole, LevelPrivacy, Composition, Contributor, Collection, UserInfo
from flask_jwt_extended import current_user
import config

ERROR_404 = "composition not found"

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

def getfilteredcompostionsbyrole(listofcomps, user_auth):
    compositions = []        
    for comp in listofcomps:       
        if checkcompshouldberetrieved(comp, user_auth):
            compositions.append(comp)
    return  compositions

def checkcompshouldberetrievedforuserauth(comp, user_auth):
    result_ok = False
    if comp.privacy == LevelPrivacy.onlyreg:
                result_ok = True
    elif comp.privacy == LevelPrivacy.private:
        if comp.user_id == user_auth:
            result_ok = True
        else:
            userauthiscontrib = Contributor.query.filter_by(user_id=user_auth, composition_id=comp.id).first()                            
            if userauthiscontrib is not None:                                
                result_ok = True
    return result_ok

def checkcompshouldberetrieved(comp, user_auth):
    result_ok = False
    if comp.privacy == LevelPrivacy.public:
            return True
    else:
        if user_auth is not None:
            result_ok = checkcompshouldberetrievedforuserauth(comp, user_auth)
    return result_ok

def getcollaborationsbyuseridwithrole(targetuser, user_auth):
    compositions = []
    collaborations = Contributor.query.filter_by(user_id=targetuser)
    for collab in collaborations:
        comp = Composition.query.get(collab.composition_id)
        if checkcompshouldberetrieved(comp, user_auth):
            compositions.append(comp)
       
    return  compositions

def setcontributorsemails(listofcontrib):
    newlist = listofcontrib
    index = 0
    for contrib in newlist:
        contrib_usrinf = UserInfo.query.filter_by(user_uid=contrib['user_uid']).first()
        newlist[index]['email'] = contrib_usrinf.user_email
        index += 1   
    return newlist

def deletecompfolder(compid):
    compositionpath = f"compositions/{compid}/"
    fullpath = os.path.join(config.DATA_BASEDIR, compositionpath )
    if os.path.exists(fullpath):
        shutil.rmtree(fullpath)


def updatecompfield(field):
    comp_uuid = request.get_json()['uuid']
    composition = Composition.query.filter_by(uuid=comp_uuid).first()
    if(composition is None):
        return jsonify({"error":ERROR_404})
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