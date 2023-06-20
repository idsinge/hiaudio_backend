import re
from flask import Blueprint, request, jsonify
from orm import db, User, UserRole, Composition, Contributor, UserInfo
from flask_login import (current_user, login_required)
from flask_cors import cross_origin

contrib = Blueprint('contrib', __name__)

@contrib.route('/addcontributorbyemail', methods=['POST'])
@cross_origin()
@login_required
def addcontributorbyemail():
  
    user_auth = current_user.get_id() and int(current_user.get_id())
    compositionid = request.get_json()['composition_id']
    composition = Composition.query.get_or_404(compositionid)
    user1 = UserInfo.query.get(user_auth)
    # if the person who tries to add the contributor is the owner
    # TODO: [issue 89] check if the role is 1 (UserRole.owner.value)
    # control that permission is not changed to creator of the composition
    if composition.user.id == user_auth:        
        email = request.get_json()["email"] 
        # check is gmail address       
        match = re.search(r'@gmail.', email)                
        role = request.get_json()['role']  
        # check the email is in DB      
        user2 = UserInfo.query.filter_by(google_email=email).first()
        
        # TODO: if user is not in DB we could send an invite email to join
        
        # if Owner tries to add himself throws error
        if((user2 is not None) and (user1.google_email != email) and (match is not None) and (UserRole.owner.value <= role <= UserRole.guest.value)):            
            return addcontributortodb(user2.id, user2.google_uid, composition, role)
        else:
            return jsonify({"error":"not valid contributor"})
    else:
        return jsonify({"error":"not valid owner"})


@contrib.route('/addcontributorbyid', methods=['POST'])
@cross_origin()
@login_required
def addcontributorbyid():
  
    user_auth = current_user.get_id() and int(current_user.get_id())
    compositionid = request.get_json()['composition_id']
    composition = Composition.query.get_or_404(compositionid)
    
    # if the person who tries to add the contributor is the owner
    # TODO:[issue 89] check if the role is 1 (UserRole.owner.value)
    # control that permission is not changed to creator of the composition
    if composition.user.id == user_auth:        
        useruid = request.get_json()["user_uid"] 
                       
        role = request.get_json()['role']  
        # check the ID is in DB      
        user2 = User.query.filter_by(uid=useruid).first()
        # if Owner tries to add himself throws error
        if((user2 is not None) and (user_auth != user2.id) and (UserRole.owner.value <=role <= UserRole.guest.value)):            
            return addcontributortodb(user2.id, useruid, composition, role)
        else:
            return jsonify({"error":"not valid contributor"})
    else:
        return jsonify({"error":"not valid owner"})

def addcontributortodb(user2id, user2uid, composition, role):
    querycontributor = Contributor.query.filter_by(user_id=user2id, composition_id=composition.id)
    iscontributor = querycontributor.first()                    
    # if is already contributor => UPDATE role
    # TODO: check current role is not the same to avoid running db statement
    if(iscontributor is not None):
        querycontributor.update({"role":UserRole(role).name})
        db.session.commit()
        return jsonify({"ok":"true", "result":"role updated successfully", "contribid":iscontributor.id})
    else:    
        contributor = Contributor(role=UserRole(role).name, user_id=user2id, user_uid=user2uid, composition=composition)          
        db.session.add(contributor)
        db.session.commit()         
        return jsonify({"ok":"true", "result":"role added successfully", "contribid":contributor.id})

@contrib.route('/deletecontributor/<string:uid>', methods=['DELETE'])
@login_required
@cross_origin()
def deletecontributor(uid):
    user_auth = current_user.get_id() and int(current_user.get_id())
    contributor = Contributor.query.filter_by(user_uid=uid).first()
    if(contributor is not None):
        compid = contributor.composition_id        
        composition = Composition.query.get_or_404(compid)        
        # the action is done by the creator of the composition
        if(composition.user_id == user_auth):            
            db.session.delete(contributor)
            db.session.commit()
            return jsonify({"ok":"true", "result":uid})
        # the action is done by an authorized role of the composition
        else:
            queryauthorized = Contributor.query.filter_by(user_id=user_auth, composition_id=compid)
            isauthorized = queryauthorized.first() 
            if (isauthorized is not None):
                role = isauthorized.role.value 
                if (UserRole.owner.value<= role <= UserRole.admin.value):
                    db.session.delete(contributor)
                    db.session.commit()
                    return jsonify({"ok":"true", "result":uid})
                else:
                    return jsonify({"error":"not permission to delete"})
            else:
                return jsonify({"error":"not permission to delete"})
    else:
        return jsonify({"error":"contributor not found"})                  
            