import os
from flask import request, jsonify
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {'wav', 'mp3', 'ogg'}
CURRENTDIR = os.path.abspath(os.path.dirname(__file__))
BASEDIR = os.path.abspath(CURRENTDIR + "/../")
DATA_BASEDIR = os.path.join(BASEDIR, "../data/")

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def deletetrack(id, Track, db):
    track = Track.query.get(id)

    if(track is None):
        return jsonify({"error":"track not found"})
    else:
        trackpath = f"compositions/{track.composition_id}/{track.title}"        
        fullpath = os.path.join(DATA_BASEDIR, trackpath )          
        os.remove(fullpath)        
        db.session.delete(track)
        db.session.commit()
        return jsonify({"ok":"true", "result":track.id})

def fileupload(current_user, Composition, Track, db):
    user_auth = current_user.get_id()
    compositionid = request.form['composition_id']
    composition = Composition.query.get_or_404(compositionid)
    if composition.user.id == user_auth:

        file = request.files['audio']


        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            trackpath = f"compositions/{compositionid}/{filename}"
            fullpath = os.path.join(DATA_BASEDIR, trackpath )

            os.makedirs(os.path.dirname(fullpath), exist_ok=True);

            file.save( fullpath )

            newtrack = Track(title=filename, path=trackpath, composition=composition)
            db.session.add(newtrack)
            db.session.commit()
            data=newtrack.to_dict( rules=('-path',) )
            respInfo ={"message":{
                "audio":{"compositionid":compositionid, "title":filename, "path":trackpath, "file_unique_id":data['id']}},
                "date":"123456789",
                "message_id":"messageid"}
            return jsonify({"ok":"true", "result":respInfo})
        else:
            return jsonify({"error":"type not allowed"})
    else:
        return jsonify({"error":"not valid user"})