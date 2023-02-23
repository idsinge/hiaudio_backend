from flask import request, jsonify

def song(id, current_user, Song):
    user_auth = current_user.get_id()
    song = Song.query.get_or_404(id)
    owner = False
    if song.user.id == user_auth:
        owner = True
    data = song.to_dict( rules=('-path',) )
    data['owner'] = owner
    jsong = jsonify(data)
    return jsong

def newsong(current_user,User, Song, db):
    if current_user.is_authenticated:
        title = request.get_json()["title"]
        user = User.query.get(current_user.get_id())
        song = Song(title=title, user=user)

        db.session.add(song)
        db.session.commit()

        return jsonify(song=song.to_dict( rules=('-path',) ))

    else:
        return jsonify({"error":"not authenticated"})
