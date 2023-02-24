from flask import request, jsonify

def composition(id, current_user, Composition):
    user_auth = current_user.get_id()
    composition = Composition.query.get_or_404(id)
    owner = False
    if composition.user.id == user_auth:
        owner = True
    data = composition.to_dict( rules=('-path',) )
    data['owner'] = owner
    jcomposition = jsonify(data)
    return jcomposition

def newcomposition(current_user,User, Composition, db):
    if current_user.is_authenticated:
        title = request.get_json()["title"]
        user = User.query.get(current_user.get_id())
        composition = Composition(title=title, user=user)

        db.session.add(composition)
        db.session.commit()

        return jsonify(composition=composition.to_dict( rules=('-path',) ))

    else:
        return jsonify({"error":"not authenticated"})
