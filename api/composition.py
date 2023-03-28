from flask import request, jsonify

def compositions(current_user, Composition, Contributor):
    user_auth = current_user.get_id()    
    allcompositions = Composition.query.all()
    compositions = []
    for comp in allcompositions:
        if ((user_auth is None) and (comp.privacy == 1)):           
            compositions.append(comp)
        else:
            if((comp.privacy != 3 ) and (user_auth is not None)):                
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


# if privacy= 2 or 3, and not logged => not accesible
# if privacy=3 and not either owner/contributor => not accesible

def composition(id, current_user, Composition, Contributor):
    user_auth = current_user.get_id()
    composition = Composition.query.get_or_404(id)
    if ((user_auth is None) and ((composition.privacy == 2) or (composition.privacy == 3))):
        return jsonify({"error":"composition not accesible"})
    else:
        owner = composition.user.id == user_auth
        iscontributor = Contributor.query.filter_by(composition_id=composition.id, user_id=user_auth).first()       
        role = 0 
        if(composition.user.id == user_auth):
              role = 1          
        if(iscontributor is not None):
            role = iscontributor.role            
        if((composition.privacy == 3) and (composition.user.id != user_auth) and (role == 0)):
            return jsonify({"error":"composition not accesible"})
        else:
            data = composition.to_dict( rules=('-path',) )
            data['owner'] = owner
            data['role'] = role
            data['viewer_id'] = user_auth
            jcomposition = jsonify(data)
            return jcomposition

def newcomposition(current_user,User, Composition, db):
    if current_user.is_authenticated:
        title = request.get_json()["title"]
        privacy = request.get_json()["privacy_level"]
        user = User.query.get(current_user.get_id())
        composition = Composition(title=title, user=user, privacy=privacy)

        db.session.add(composition)
        db.session.commit()

        return jsonify(composition=composition.to_dict( rules=('-path',) ))

    else:
        return jsonify({"error":"not authenticated"})
