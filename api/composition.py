import os
import shutil
from flask import request, jsonify
from api.track import DATA_BASEDIR
from orm import db, User, UserRole, CompPrivacy, Composition, Contributor
from flask_login import current_user


def compositions():
    user_auth = current_user.get_id() and int(current_user.get_id())
    allcompositions = Composition.query.all()
    compositions = []
    for comp in allcompositions:
        if ((user_auth is None) and (comp.privacy.value == CompPrivacy.public.value)):           
            compositions.append(comp)
        else:
            if((comp.privacy.value != CompPrivacy.private.value ) and (user_auth is not None)):                
                compositions.append(comp)
            else:
                if(comp.user.id == user_auth):
                    compositions.append(comp)
                else:                    
                    iscontributor = Contributor.query.filter_by(composition_id=comp.id, user_id=user_auth).first()                    
                    if(iscontributor is not None):
                        compositions.append(comp)

    jcompositions = jsonify(compositions=[ composition.to_dict( rules=('-tracks',) ) for composition in compositions])
    return jcompositions


# if privacy= 2 (onlyreg) or 3 (private), and not logged => not accesible
# if privacy=3 (private) and not either owner/contributor => not accesible

def composition(id):
    user_auth = current_user.get_id() and int(current_user.get_id())
    composition = Composition.query.get_or_404(id)
    if ((user_auth is None) and ((composition.privacy.value == CompPrivacy.onlyreg.value) or (composition.privacy.value == CompPrivacy.private.value))):
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
        if((composition.privacy.value == CompPrivacy.private.value) and (composition.user.id != user_auth) and (role == UserRole.none.value)):
            return jsonify({"error":"composition not accesible"})
        else:
            data = composition.to_dict( rules=('-path',) )
            data['owner'] = owner
            data['role'] = role
            data['viewer_id'] = user_auth
            jcomposition = jsonify(data)
            return jcomposition

def newcomposition():
    if current_user.is_authenticated:
        title = request.get_json()["title"]
        privacy = request.get_json()["privacy_level"]
        if(privacy and (privacy is not None) and (CompPrivacy.public.value <= int(privacy) <= CompPrivacy.private.value)):
            user = User.query.get(current_user.get_id())
            composition = Composition(title=title, user=user, privacy=CompPrivacy(int(privacy)).name)
            db.session.add(composition)
            db.session.commit()
            return jsonify(composition=composition.to_dict( rules=('-path',) ))
        else:
            return jsonify({"error":"privacy value not valid"})

    else:
        return jsonify({"error":"not authenticated"})

def deletecompfolder(compid):
    compositionpath = f"compositions/{compid}/"        
    fullpath = os.path.join(DATA_BASEDIR, compositionpath )
    if os.path.exists(fullpath):     
        shutil.rmtree(fullpath)

def deletecomposition(compid):
    user_auth = current_user.get_id() and int(current_user.get_id())
    composition =  Composition.query.get_or_404(compid)
    iscontributor = Contributor.query.filter_by(composition_id=composition.id, user_id=user_auth).first()       
    role = UserRole.none.value
    if(composition.user.id == user_auth):
        role = UserRole.owner.value        
    if(iscontributor is not None):
        role = iscontributor.role.value    
    if(role == UserRole.owner.value):       
        deletecompfolder(compid)
        db.session.delete(composition)
        db.session.commit()
        return jsonify({"ok":"true", "result": "composition deleted successfully"})
    else:
        return jsonify({"error":"user is not authorized"})
    
def updateprivacy():
   # TODO: From API perspective, if the composition is Open To Contribution 
   # it should not be possible to set privacy level to 3 (private)
   # according to UI interaction
   # TODO: control the level of privacy is between 1 and 3
   return updatecompfield('privacy')    

def updatecomptitle():
    return updatecompfield('title')

def updatecomptocontrib():  
    # TODO: control the value is boolean
    return updatecompfield('opentocontrib')

def updatecompfield(field):
    compid = request.get_json()['id']
    fieldvalue = request.get_json()[field]
    if(field == 'privacy'):        
        fieldvalue = CompPrivacy(int(fieldvalue)).name
    user_auth = current_user.get_id() and int(current_user.get_id())
    composition =  Composition.query.get_or_404(compid)
    iscontributor = Contributor.query.filter_by(composition_id=composition.id, user_id=user_auth).first()       
    role = UserRole.none.value
    if(composition.user.id == user_auth):
        role = UserRole.owner.value          
    if(iscontributor is not None):
        role = iscontributor.role.value    
    if(role == UserRole.owner.value):        
        setattr(composition, field, fieldvalue)
        db.session.commit()
        return jsonify({"ok":"true", "result": field + " updated successfully"})
    else:
        return jsonify({"error":"not possible to update composition field " + field})