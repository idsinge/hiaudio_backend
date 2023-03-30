import os
import re
from flask import request, jsonify

def addcontributor(current_user, Composition, Contributor, User, db):
  
    user_auth = current_user.get_id()
    compositionid = request.get_json()['composition_id']
    composition = Composition.query.get_or_404(compositionid)
    
    # if the person who tries to add the contributor is the owner
    # TODO: check if the role is 1
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
            querycontributor = Contributor.query.filter_by(user_id=user2.id, composition_id=compositionid)
            iscontributor = querycontributor.first()                    
            # if is already contributor => UPDATE role
            if(iscontributor is not None):
                querycontributor.update({"role":role})
                db.session.commit()
                return jsonify({"ok":"true", "result":"role updated successfully"})
            else:    
                contributor = Contributor(role=role, user_id=user2.id, composition=composition)          
                db.session.add(contributor)
                db.session.commit()        
                return jsonify({"ok":"true", "result":"role added successfully"})
        else:
            return jsonify({"error":"not valid contributor"})
    else:
        return jsonify({"error":"not valid owner"})

def deletecontributor(contribid, compid, current_user, Composition, Contributor, db):
    user_auth = current_user.get_id()
    contributor = Contributor.query.get(contribid)
    if(contributor is not None):
        composition = Composition.query.get_or_404(compid)
        role = 0
        if(composition.user_id == user_auth):
            role = 1
            db.session.delete(contributor)
            db.session.commit()
            return jsonify({"ok":"true", "result":contribid, "role":role })
        else:
            role = contributor.role 
            if (1<= role <= 2):
                db.session.delete(contributor)
                db.session.commit()
                return jsonify({"ok":"true", "result":contribid, "role":role })
            else:
                return jsonify({"error":"not permission to delete"})
    else:
        return jsonify({"error":"contributor not found"})                  
            