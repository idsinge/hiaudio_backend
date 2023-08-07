import re
from flask import  Blueprint, jsonify, make_response
from orm import  db, User, UserInfo, Composition
from flask_login import (current_user, login_required)
from api.composition import deletecompfolder
from flask_cors import cross_origin

user = Blueprint('user', __name__)

def custom_error(message, status_code):
    return make_response(jsonify(message), status_code)

@user.route('/profile')
def profile():
    if current_user.is_authenticated:
        userinfo = UserInfo.query.get(current_user.get_id())
        return jsonify({"ok":True, "name":userinfo.name, "email":userinfo.google_email, "profile_pic":userinfo.profile_pic, "user_uid":current_user.uid})
    else:
        return jsonify({"ok":False})


# # unused for now, need access control
# @user.route('/users')
# @cross_origin()
# def users():
#     users = User.query.all()
#     jusers = jsonify(users=[ user.to_dict( rules=('-id','-compositions', '-userinfo', '-collections') ) for user in users])
#     return jusers

# @user.route('/user/<string:uid>')
# def userbyuid(uid):
#     user = User.query.filter_by(uid=uid).first()
#     if(user is not None):
#         juser = jsonify(user.to_dict( rules=('-id', '-userinfo', '-compositions.collection', '-collections.compositions') ))
#         return juser
#     else:
#         return jsonify({"error":"Not Found"})

@user.route('/deleteuser/<string:uid>', methods=['DELETE'])
@cross_origin()
@login_required
def deleteuser(uid):
    if current_user.is_authenticated:
        user_auth = current_user.get_id()
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
@login_required
def checkuser(info):
    result = None
    userid = None
    if (info.isnumeric()):
        user = User.query.filter_by(uid=info).first()
        if(user is not None):
            userid = user.uid
            result = jsonify({"ok":True, "user_uid":userid})
    elif (re.search(r'@gmail.', info)):
        user = UserInfo.query.filter_by(google_email=info).first()
        if(user is not None):
            result = jsonify({"ok":True, "user_uid":user.google_uid})
    else:
        user = UserInfo.query.filter_by(name=info).first()
        if user:
            userid = user.google_uid
            result = jsonify({"ok":True, "user_uid":user.google_uid})

    if result is None:
        result = custom_error({"error":"User Not Found"}, 404)
    else:
        ownerid = current_user.get_id() and int(current_user.get_id())
        if(userid == ownerid):
            result = custom_error({"error":"Same User"}, 403)

    return result