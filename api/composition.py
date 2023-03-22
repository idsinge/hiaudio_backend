from flask import request, jsonify

def compositions(current_user, Composition):
    user_auth = current_user.get_id()    
    allcompositions = Composition.query.all()
    compositions = []
    for comp in allcompositions:
        if ((user_auth is None) and (comp.privacy == 1)):           
            compositions.append(comp)
        else:
            if(comp.privacy != 3 ):                
                compositions.append(comp)
            else:
                if(comp.user.id == user_auth):
                    compositions.append(comp)
    jcompositions = jsonify(compositions=[ composition.to_dict( rules=('-tracks',) ) for composition in compositions])
    return jcompositions


# if privacy= 2 or 3, and not logged => not accesible
# if privacy=3 and not the owner => not accesible

def composition(id, current_user, Composition):
    user_auth = current_user.get_id()
    composition = Composition.query.get_or_404(id)
    if ((user_auth is None) and ((composition.privacy == 2) or (composition.privacy == 3))):
        return jsonify({"error":"composition not accesible"})
    else:
        owner = composition.user.id == user_auth        
        if((composition.privacy == 3) and (composition.user.id != user_auth)):
            return jsonify({"error":"composition not accesible"})
        else:
            data = composition.to_dict( rules=('-path',) )
            data['owner'] = owner
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
