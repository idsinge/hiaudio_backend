import os
from flask import Blueprint, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from orm import db, UserRole, Track, Composition, Contributor, LevelPrivacy
from flask_login import (current_user, login_required)
from flask_cors import cross_origin
import shortuuid
import config

track = Blueprint('track', __name__)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in config.ALLOWED_EXTENSIONS

def deletefromdb(trackinfo):
    trackpath = f"compositions/{trackinfo.composition_id}/{trackinfo.title}"
    fullpath = os.path.join(config.DATA_BASEDIR, trackpath )
    if os.path.exists(fullpath):
        os.remove(fullpath)
    db.session.delete(trackinfo)
    db.session.commit()

@track.route('/trackfile/<string:uuid>')
@cross_origin()
def trackfile(uuid):

    track = Track.query.filter_by(uuid=uuid).first()
    if(track is None):
        return jsonify({"error":"track not found"})
    else:
        user_auth = current_user.get_id() and int(current_user.get_id())
        composition = Composition.query.get(track.composition_id)
        privacy = composition.privacy
        if((privacy.value == LevelPrivacy.public.value) or ((privacy.value == LevelPrivacy.onlyreg.value) and (user_auth is not None))):
            return send_from_directory( config.DATA_BASEDIR, track.path )
        elif ((privacy.value == LevelPrivacy.onlyreg.value) and (user_auth is None)):
            return jsonify({"error":"user not authorized"})
        else:
            role = UserRole.none.value
            if(composition.user_id == user_auth):
                role = UserRole.owner.value
            else:
                iscontributor = Contributor.query.filter_by(composition_id=composition.id, user_id=user_auth).first()
                if(iscontributor is not None):
                    role = iscontributor.role.value
            if(UserRole.owner.value <= role <= UserRole.guest.value):
                return send_from_directory( config.DATA_BASEDIR, track.path )
            else:
                return jsonify({"error":"user not authorized"})

@track.route('/deletetrack/<string:uuid>', methods=['DELETE'])
@login_required
@cross_origin()
def deletetrack(uuid):
    track = Track.query.filter_by(uuid=uuid).first()

    if(track is None):
        return jsonify({"error":"track not found"})
    else:
        user_auth = current_user.get_id() and int(current_user.get_id())
        role = UserRole.none.value
        composition = Composition.query.get_or_404(track.composition_id)
        iscontributor = Contributor.query.filter_by(composition_id=composition.id, user_id=user_auth).first()
        if(composition.opentocontrib):
            role = UserRole.member.value
        if(composition.user_id == user_auth):
            role = UserRole.owner.value
        if(iscontributor is not None):
            role = iscontributor.role.value
        if ((UserRole.owner.value <= role <= UserRole.admin.value) or (track.user_id == user_auth)):
            deletefromdb(track)
            return jsonify({"ok":True, "result":track.id, "role":role })
        else:
            return jsonify({"error":"not permission to delete"})

@track.route('/fileUpload', methods=['POST'])
@cross_origin()
@login_required
def fileupload():
    user_auth = current_user.get_id() and int(current_user.get_id())
    comp_uuid = request.form['composition_id']
    latency = request.form.get('latency', 0)    
    composition = Composition.query.filter_by(uuid=comp_uuid).first()
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
            trackpath = f"compositions/{composition.id}/{filename}"
            fullpath = os.path.join(config.DATA_BASEDIR, trackpath )

            os.makedirs(os.path.dirname(fullpath), exist_ok=True);

            thefile.save( fullpath )
            ## TODO: check uuid is not duplicated
            newtrack = Track(title=filename, path=trackpath, composition=composition, user_id=user_auth, uuid=shortuuid.uuid(), latency=latency)
            db.session.add(newtrack)
            db.session.commit()
            data=newtrack.to_dict( rules=('-path',) )
            respinfo ={"message":{
                "audio":{"compositionid":comp_uuid, "title":filename, "path":trackpath, "file_unique_id":data['uuid'], "user_id":user_auth}},
                "date":"123456789",
                "message_id":"messageid"}
            return jsonify({"ok":True, "result":respinfo})
        else:
            return jsonify({"error":"type not allowed"})
    else:
        return jsonify({"error":"not valid user"})