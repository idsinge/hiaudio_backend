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

def deleterecording(id, Recording, db):
    recording = Recording.query.get(id) 

    # TODO: delete file from folder   
    if(recording is None):
        return jsonify({"error":"recording not found"})
    else:
        db.session.delete(recording)
        db.session.commit()
        return jsonify({"ok":"true", "result":recording.id})

def fileupload(current_user, Composition, Recording, db):
    user_auth = current_user.get_id()    
    compositionid = request.form['composition_id']
    composition = Composition.query.get_or_404(compositionid)
    if composition.user.id == user_auth:        

        file = request.files['audio']


        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            recordingpath = f"compositions/{compositionid}/{filename}"
            fullpath = os.path.join(DATA_BASEDIR, recordingpath )

            os.makedirs(os.path.dirname(fullpath), exist_ok=True);

            file.save( fullpath )

            newrecording = Recording(title=filename, path=recordingpath, composition=composition)
            db.session.add(newrecording)
            db.session.commit()
            data=newrecording.to_dict( rules=('-path',) )
            respInfo ={"message":{
                "audio":{"compositionid":compositionid, "title":filename, "path":recordingpath, "file_unique_id":data['id']}}, 
                "date":"123456789", 
                "message_id":"messageid"}
            return jsonify({"ok":"true", "result":respInfo})
        else: 
            return jsonify({"error":"type not allowed"})
    else:
        return jsonify({"error":"not valid user"})