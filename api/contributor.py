import re
from flask import request, jsonify, make_response

def custom_error(message, status_code): 
    return make_response(jsonify(message), status_code)

def checkuser(current_user, User, info):
    result = None
    userid = None
    if (info.isnumeric()):
        user = User.query.get(info)
        if(user is not None):
            userid = user.id
            result = jsonify({"ok":True, "user_id":userid})       
    elif (re.search(r'@gmail.', info)):
        user = User.query.filter_by(email=info).first()
        if(user is not None):
            userid = user.id
            result = jsonify({"ok":True, "user_id":user.id})        
    else:
        user = User.query.filter_by(name=info).first()
        if user:         
            userid = user.id
            result = jsonify({"ok":True, "user_id":user.id})

    if result is None:
        result = custom_error({"error":"User Not Found"}, 404)
    else:
        ownerid = current_user.get_id()
        if(userid == ownerid):
            result = custom_error({"error":"Same User"}, 403)
    
    return result


def addcontributorbyemail(current_user, Composition, Contributor, User, db):
  
    user_auth = current_user.get_id()
    compositionid = request.get_json()['composition_id']
    composition = Composition.query.get_or_404(compositionid)
    
    # if the person who tries to add the contributor is the owner
    # TODO: check if the role is 1
    # control that permission is not changed to creator of the composition
    if composition.user.id == user_auth:        
        email = request.get_json()["email"] 
        # check is gmail address       
        match = re.search(r'@gmail.', email)                
        role = request.get_json()['role']  
        # check the email is in DB      
        user2 = User.query.filter_by(email=email).first()
        
        # TODO: if user is not in DB we could send an invite email to join
        
        # if Owner tries to add himself throws error
        if((user2 is not None) and (current_user.email != email) and (match is not None) and (1 <=role <=4)):            
            return addcontributortodb(Contributor, user2.id, composition, role, db)
        else:
            return jsonify({"error":"not valid contributor"})
    else:
        return jsonify({"error":"not valid owner"})


def addcontributorbyid(current_user, Composition, Contributor, User, db):
  
    user_auth = current_user.get_id()
    compositionid = request.get_json()['composition_id']
    composition = Composition.query.get_or_404(compositionid)
    
    # if the person who tries to add the contributor is the owner
    # TODO: check if the role is 1
    # control that permission is not changed to creator of the composition
    if composition.user.id == user_auth:        
        userid = request.get_json()["user_id"] 
                       
        role = request.get_json()['role']  
        # check the ID is in DB      
        user2 = User.query.filter_by(id=userid).first()
               
        # if Owner tries to add himself throws error
        if((user2 is not None) and (user_auth != userid) and (1 <=role <=4)):            
            return addcontributortodb(Contributor, user2.id, composition, role, db)
        else:
            return jsonify({"error":"not valid contributor"})
    else:
        return jsonify({"error":"not valid owner"})

def addcontributortodb(Contributor, user2id, composition, role, db):
    querycontributor = Contributor.query.filter_by(user_id=user2id, composition_id=composition.id)
    iscontributor = querycontributor.first()                    
    # if is already contributor => UPDATE role
    # TODO: check current role is not the same to avoid running db statement
    if(iscontributor is not None):
        querycontributor.update({"role":role})
        db.session.commit()
        return jsonify({"ok":"true", "result":"role updated successfully", "contribid":iscontributor.id})
    else:    
        contributor = Contributor(role=role, user_id=user2id, composition=composition)          
        db.session.add(contributor)
        db.session.commit()         
        return jsonify({"ok":"true", "result":"role added successfully", "contribid":contributor.id})
    
def deletecontributor(contribid, current_user, Composition, Contributor, db):
    user_auth = current_user.get_id()
    contributor = Contributor.query.get(contribid)
    if(contributor is not None):
        compid = contributor.composition_id        
        composition = Composition.query.get_or_404(compid)        
        # the action is done by the creator of the composition
        if(composition.user_id == user_auth):            
            db.session.delete(contributor)
            db.session.commit()
            return jsonify({"ok":"true", "result":contribid})
        # the action is done by an authorized role of the composition
        else:
            queryauthorized = Contributor.query.filter_by(user_id=user_auth, composition_id=compid)
            isauthorized = queryauthorized.first() 
            if (isauthorized is not None):
                role = isauthorized.role 
                if (1<= role <= 2):
                    db.session.delete(contributor)
                    db.session.commit()
                    return jsonify({"ok":"true", "result":contribid})
                else:
                    return jsonify({"error":"not permission to delete"})
            else:
                return jsonify({"error":"not permission to delete"})
    else:
        return jsonify({"error":"contributor not found"})                  
            