import os
import time
from flask import Blueprint, request, jsonify, send_from_directory, current_app
from werkzeug.utils import secure_filename
from orm import db, User, UserRole, Track, Composition, Contributor, LevelPrivacy
from flask_jwt_extended import current_user, jwt_required
from api.auth import is_user_logged_in
from flask_cors import cross_origin
from utils import Utils
from api.annotation import get_track_annotations, update_track_annotations, RESERVED_WORDS
import config

track = Blueprint('track', __name__)

ERROR_404 = "track not found"

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in config.ALLOWED_EXTENSIONS

def deletefromdb(trackinfo):
    trackpath = f"{trackinfo.path}"
    compresspath = f"{trackinfo.compress_path}"
    fullpath = os.path.join(config.DATA_BASEDIR, trackpath )    
    compressfullpath = os.path.join(config.DATA_BASEDIR, compresspath )
    if os.path.exists(fullpath):
        os.remove(fullpath)   
    if os.path.exists(compressfullpath):
        os.remove(compressfullpath)
    db.session.delete(trackinfo)
    db.session.commit()


def checktrackpermissions(uuid):
    track = Track.query.filter_by(uuid=uuid).first()
    if(track is None):
        return False, jsonify({"error":ERROR_404})
    else:
        user = is_user_logged_in()
        user_auth = user.id if user is not None else None
        composition = Composition.query.get(track.composition_id)
        privacy = composition.privacy
        if((privacy.value == LevelPrivacy.public.value) or ((privacy.value == LevelPrivacy.onlyreg.value) and (user_auth is not None))):
            return True, track
        elif ((privacy.value == LevelPrivacy.onlyreg.value) and (user_auth is None)):
            return False, jsonify({"error":"user not authorized"})
        else:
            return checkcompositiontrackrole(composition, track, user_auth)

@track.route('/trackfile/<string:uuid>')
@cross_origin()
def trackfile(uuid):
    optional_get_raw =  bool(request.args.get('raw', None))    
    isok, result = checktrackpermissions(uuid)    
    if(isok):
        path_is = result.path
        if config.COMPRESSION_MODULE_ACTIVE and result.compress_path and (optional_get_raw is not True):
            path_is = result.compress_path        
        return send_from_directory( config.DATA_BASEDIR, path_is )
    else:
        return result

@track.route('/getinfotrack/<string:uuid>')
@cross_origin()
def getinfotrack(uuid):

    isok, result = checktrackpermissions(uuid)

    if(isok):
        annot = get_track_annotations(uuid)
        ret = {"title": result.title, "annotations": annot, "reserved_keys": RESERVED_WORDS}
        return jsonify(ret)
    else:
        return result

def checkcompositiontrackrole(composition, trackis, user_auth):
    role = UserRole.none.value
    if(composition.user_id == user_auth) or (trackis.user_id == user_auth):
        role = UserRole.owner.value
    else:
        iscontributor = Contributor.query.filter_by(composition_id=composition.id, user_id=user_auth).first()
        if(iscontributor is not None):
            role = iscontributor.role.value
    if(UserRole.owner.value <= role <= UserRole.guest.value):
        return True,  trackis
    else:
        return False, jsonify({"error":"user not authorized"})

def performauthactionontrack(trackuid, error404):
    track = Track.query.filter_by(uuid=trackuid).first()
    if(track is not None):
        composition = Composition.query.get(track.composition_id)
        user_auth = current_user.id
        iscontributor = Contributor.query.filter_by(composition_id=composition.id, user_id=user_auth).first()
        role = UserRole.none.value            
        if((composition.user.id == user_auth) or (track.user_id == user_auth)):                
            role = UserRole.owner.value                
        if((iscontributor is not None) and (role is not UserRole.owner.value)):
            role = iscontributor.role.value
        if((role == UserRole.owner.value) or (role == UserRole.admin.value)):
            return True, track
        else:
            return False, f"not possible to update track info with role {str(role)}"
    else:
        return False, error404

@track.route('/updatetrackinfo', methods=['PATCH'])
@jwt_required()
@cross_origin()
def updatetrackinfo():
    rjson = request.get_json()
    trackuid = rjson.get("trackid", None)
    tracktitle = rjson.get("title", None)
    trackannotations = rjson.get("annotations", None)
    if(trackuid is None):
        return jsonify({"ok":False, "error":"track uuid is mandatory"})
    elif(tracktitle is None and trackannotations is None):
        return jsonify({"ok":False, "error":"track title or annotations are mandatory"})
    else:
        isok, result = performauthactionontrack(trackuid, ERROR_404)
        if(isok):
            return handletrackinfoupdate(result, tracktitle, trackuid, trackannotations)
        else:
            return jsonify({"ok":False, "error":result})
    
@track.route('/deletetrack/<string:uuid>', methods=['DELETE'])
@jwt_required()
@cross_origin()
def deletetrack(uuid):
    track = Track.query.filter_by(uuid=uuid).first()

    if(track is None):
        return jsonify({"error":ERROR_404})
    else:
        user_auth = current_user.id
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

def handletrackinfoupdate(the_track, tracktitle, trackuid, trackannotations):
    fields_changed = 0
    errors = []
    if(tracktitle is not None):
        setattr(the_track, "title", tracktitle)
        db.session.commit()
        fields_changed += 1
    if(trackannotations is not None):
        updated, created, errors  = update_track_annotations(trackuid, trackannotations)
        fields_changed += updated + created
    if(fields_changed > 0):
        return jsonify({"ok":True, "result": "track info updated successfully: " + str(fields_changed) + " fields changed", "errors":errors})
    else:
        return jsonify({"ok":False, "result": "No track info updated", "errors":errors})

def handleuploadtrack(thefile, composition, user_auth):    
    filename = secure_filename(thefile.filename)
    timestamp_prefix = str(int(time.time())) + "_"
    trackpath = f"compositions/{composition.id}/{timestamp_prefix + filename}"
    fullpath = os.path.join(config.DATA_BASEDIR, trackpath )
    user_uid = User.query.get(user_auth).uid

    os.makedirs(os.path.dirname(fullpath), exist_ok=True)

    thefile.save( fullpath )
    needs_compress = filename.lower().endswith(('.wav', '.flac'))
    newtrack = Track(title=filename, 
                     path=trackpath, 
                     composition=composition, 
                     user_id=user_auth, 
                     user_uid=user_uid, 
                     uuid=Utils().generate_unique_uuid(Track,'uuid'),
                     needs_compress=needs_compress)
    
    db.session.add(newtrack)
    db.session.commit()
    data=newtrack.to_dict( rules=('-path',) )
    respinfo ={"message":{
        "audio":{"composition_id":composition.uuid, 
                 "title":filename, 
                 "path":trackpath, 
                 "file_unique_id":data['uuid'], 
                 "user_id":user_auth, 
                 "user_uid":user_uid
                 }},
        "date":timestamp_prefix}
    return respinfo

@track.route('/fileUpload', methods=['POST'])
@cross_origin()
@jwt_required()
def fileupload():
    user_auth = current_user.id
    comp_uuid = request.form['composition_id']
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
            respinfo = handleuploadtrack(thefile, composition, user_auth)
            return jsonify({"ok":True, "result":respinfo})
        else:
            return jsonify({"ok":False, "error":"type not allowed"})
    else:
        return jsonify({"ok":False, "error":"not valid user"})


@track.errorhandler(413)
def track_too_large_error(e):
    return jsonify({"ok":False, "error":f"request too large (limit is {current_app.config['MAX_CONTENT_LENGTH']} bytes)"}), 200
