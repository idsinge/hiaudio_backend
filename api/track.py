import os
from flask import request, jsonify
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {'wav', 'mp3', 'ogg', 'm4a'}
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

def fileupload(current_user, Composition, Track, Contributor, db):
    user_auth = current_user.get_id()
    compositionid = request.form['composition_id']
    composition = Composition.query.get_or_404(compositionid)
    role = 0
    istheowner = composition.user.id == user_auth
    if not istheowner:
        iscontributor = Contributor.query.filter_by(composition_id=composition.id, user_id=user_auth).first()    
        if(iscontributor is not None):
            role = iscontributor.role 
    if ((istheowner) or (1<= role <= 3)):

        thefile = request.files['audio']


        if thefile and allowed_file(thefile.filename):
            filename = secure_filename(thefile.filename)
            trackpath = f"compositions/{compositionid}/{filename}"
            fullpath = os.path.join(DATA_BASEDIR, trackpath )

            os.makedirs(os.path.dirname(fullpath), exist_ok=True);

            thefile.save( fullpath )

            newtrack = Track(title=filename, path=trackpath, composition=composition, user_id=user_auth)
            db.session.add(newtrack)
            db.session.commit()
            data=newtrack.to_dict( rules=('-path',) )
            respinfo ={"message":{
                "audio":{"compositionid":compositionid, "title":filename, "path":trackpath, "file_unique_id":data['id']}},
                "date":"123456789",
                "message_id":"messageid"}
            return jsonify({"ok":"true", "result":respinfo})
        else:
            return jsonify({"error":"type not allowed"})
    else:
        return jsonify({"error":"not valid user"})