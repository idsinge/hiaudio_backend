import re
from email_validator import validate_email, EmailNotValidError
from flask import  Blueprint, jsonify, make_response, request
from orm import  db, User, UserInfo, Composition, InvitationEmail
from flask_jwt_extended import current_user, jwt_required
from api.auth import is_user_logged_in, get_user_token
from api.composition import deletecompfolder
from flask_cors import cross_origin

user = Blueprint('user', __name__)

def custom_error(message, status_code):
    return make_response(jsonify(message), status_code)

@user.route('/profile')
def profile():
    if is_user_logged_in():
        userinfo = UserInfo.query.get(current_user.id)
        if(userinfo is not None):            
            ret = {
                "ok":True,
                "name":userinfo.name,
                "email":userinfo.user_email,
                "profile_pic":userinfo.profile_pic,
                "user_uid":current_user.uid,
                "terms_accepted":current_user.terms_accepted
            }
            token = get_user_token()
            if token:
                ret['token'] = token
            return jsonify(ret)
        else:
            return jsonify({"ok":False})
    else:
        return jsonify({"ok":False})

@user.route('/acceptterms', methods=['PUT'])
def acceptterms():
    if is_user_logged_in():
        user = User.query.get(current_user.id)
        setattr(user, 'terms_accepted', True)
        db.session.commit()           
        return jsonify({"ok":True})
    else:
        return jsonify({"ok":False})

@user.route('/rejectterms', methods=['PUT'])
def rejectterms():
    if is_user_logged_in():
        user = User.query.get(current_user.id)
        setattr(user, 'terms_accepted', False)
        db.session.delete(user)        
        db.session.commit()           
        return jsonify({"ok":True})
    else:
        return jsonify({"ok":False})

@user.route('/deleteuser/<string:uid>', methods=['DELETE'])
@cross_origin()
@jwt_required()
def deleteuser(uid):
    if is_user_logged_in():
        user_auth = current_user.id
        user = User.query.get_or_404(user_auth)
        if(user.uid == uid):
            # TODO: in the future (when implmented) delete also all collections
            ## NOTE: If it was contributor at other compositions
            ## the data files will remain
            compositions = Composition.query.filter_by(user_id=user_auth).all()
            if(len(compositions)):
                for comp in compositions:
                    deletecompfolder(comp.id)
            db.session.delete(user)
            db.session.commit()

            return jsonify({"ok":True, "result":"user deleted successfully"})
        else:
            return jsonify({"error":"not allowed"})
    else:
        return jsonify({"error":"not authenticated"})

# TODO: this API method could change in the future to allow filtering users in the app search bar when adding a new contributor
# param "info" can be either an email address, a user id or a name
@user.route('/checkuser/<string:info>')
@cross_origin()
@jwt_required()
def checkuser(info):
    result = None
    userid = None    
    try:
        emailinfo = validate_email(info, check_deliverability=False)
        email = emailinfo.normalized
        user = UserInfo.query.filter_by(user_email=email).first()        
        if(user is not None):
            userid = user.user_uid
            result = jsonify({"ok":True, "user_uid":user.user_uid}) 
    except EmailNotValidError as e:        
        user = User.query.filter_by(uid=info).first()
        if(user is not None):
            userid = user.uid
            result = jsonify({"ok":True, "user_uid":userid})
        else:
            user = UserInfo.query.filter_by(name=info).first()
            if user:
                userid = user.user_uid
                result = jsonify({"ok":True, "user_uid":user.user_uid})           

    if result is None:
        result = custom_error({"ok":False, "error":"User Not Found"}, 404)
    else:
        ownerid = current_user.uid
        if(userid == ownerid):
            result = custom_error({"ok":False, "error":"Same User"}, 403)

    return result

@user.route('/refuseinvitation', methods=['POST'])
def refuseinvitation():
 
    rjson = request.get_json()
    email = rjson.get("email", None)
    code = rjson.get("refusal_code", None)
    if (email is None) or (not code) or (code is None):
        return jsonify({"ok":False, "error":"error in parameters"})        
    invitation = InvitationEmail.query.filter_by(email=email, refusal_code=code).first()
    if invitation is not None:
        userinfo = UserInfo.query.filter_by(user_email=email).first()
        user = User.query.get(userinfo.user_id)
        db.session.delete(invitation)
        db.session.delete(user)
        db.session.commit()
        return jsonify({"ok":True, "result":"user deleted successfully"})
    else:    
        return jsonify({"ok":False, "error":"wrong email or code"})