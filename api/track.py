import os
from flask import request, jsonify
from werkzeug.utils import secure_filename
from app import DATA_BASEDIR
ALLOWED_EXTENSIONS = {'wav', 'mp3', 'ogg'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def deletetrack(id, Track, db):
    track = Track.query.get(id) 

    # TODO: delete file from folder   
    if(track is None):
        return jsonify({"error":"track not found"})
    else:
        db.session.delete(track)
        db.session.commit()
        return jsonify({"ok":"true", "result":track.id})

def fileupload(current_user, Song, Track, db):
    user_auth = current_user.get_id()    
    songid = request.form['song_id']
    song = Song.query.get_or_404(songid)
    if song.user.id == user_auth:        

        file = request.files['audio']


        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            trackpath = f"songs/{songid}/{filename}"
            fullpath = os.path.join(DATA_BASEDIR, trackpath )

            os.makedirs(os.path.dirname(fullpath), exist_ok=True);

            file.save( fullpath )

            newtrack = Track(title=filename, path=trackpath, song=song)
            db.session.add(newtrack)
            db.session.commit()
            data=newtrack.to_dict( rules=('-path',) )
            respInfo ={"message":{
                "audio":{"songid":songid, "title":filename, "path":trackpath, "file_unique_id":data['id']}}, 
                "date":"123456789", 
                "message_id":"messageid"}
            return jsonify({"ok":"true", "result":respInfo})
        else: 
            return jsonify({"error":"type not allowed"})
    else:
        return jsonify({"error":"not valid user"})