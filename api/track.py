import os
from flask import Blueprint, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from orm import db, UserRole, Track, Composition, Contributor
from flask_login import (current_user, login_required)
from flask_cors import cross_origin

ALLOWED_EXTENSIONS = {'wav', 'mp3', 'ogg', 'm4a'}
CURRENTDIR = os.path.abspath(os.path.dirname(__file__))
BASEDIR = os.path.abspath(CURRENTDIR + "/../")
DATA_BASEDIR = os.path.join(BASEDIR, "../data/")

track = Blueprint('track', __name__)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def deletefromdb(trackinfo):    
    trackpath = f"compositions/{trackinfo.composition_id}/{trackinfo.title}"        
    fullpath = os.path.join(DATA_BASEDIR, trackpath )          
    if os.path.exists(fullpath):
        os.remove(fullpath)        
    db.session.delete(trackinfo)
    db.session.commit()

@track.route('/trackfile/<int:id>')
@cross_origin()
def trackfile(id):
    track = Track.query.get_or_404(id)
    return send_from_directory( DATA_BASEDIR, track.path )

@track.route('/deletetrack/<int:id>', methods=['DELETE'])
@login_required
@cross_origin()
def deletetrack(id):
    track = Track.query.get(id)

    if(track is None):
        return jsonify({"error":"track not found"})
    else:
        user_auth = current_user.get_id() and int(current_user.get_id())       
        if(track.user_id == user_auth):           
            deletefromdb(track)
            # TODO: [issue 133] should not return role Owner 1 if is only member
            # otherwise the delete option is shown for tracks he does not own
            return jsonify({"ok":"true", "result":track.id, "role":UserRole.owner.value})
        else: 
            composition = Composition.query.get_or_404(track.composition_id)
            role = UserRole.none.value          
            iscontributor = Contributor.query.filter_by(composition_id=composition.id, user_id=user_auth).first()            
            if(iscontributor is not None):
                role = iscontributor.role.value                           
            if ((UserRole.owner.value <= role <= UserRole.admin.value) or (composition.user.id == user_auth)):
                deletefromdb(track)
                return jsonify({"ok":"true", "result":track.id, "role":role })
            else:
                return jsonify({"error":"not permission to delete"})

@track.route('/fileUpload', methods=['POST'])
@cross_origin()
@login_required
def fileupload():
    user_auth = current_user.get_id() and int(current_user.get_id())
    compositionid = request.form['composition_id']
    composition = Composition.query.get_or_404(compositionid)
    role = UserRole.none.value
    istheowner = composition.user.id == user_auth
    isopen = composition.opentocontrib
    if(isopen):
        role = UserRole.member.value
    if not istheowner:
        iscontributor = Contributor.query.filter_by(composition_id=composition.id, user_id=user_auth).first()    
        if(iscontributor is not None):
            role = iscontributor.role.value 
    if ((istheowner) or (UserRole.owner.value <= role <= UserRole.member.value)):

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
                "audio":{"compositionid":compositionid, "title":filename, "path":trackpath, "file_unique_id":data['id'], "user_id":user_auth}},
                "date":"123456789",
                "message_id":"messageid"}
            return jsonify({"ok":"true", "result":respinfo})
        else:
            return jsonify({"error":"type not allowed"})
    else:
        return jsonify({"error":"not valid user"})