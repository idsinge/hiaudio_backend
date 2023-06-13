import re
from flask import jsonify, make_response
from orm import  db, User, UserInfo, Composition
from flask_login import current_user
from api.composition import deletecompfolder

def custom_error(message, status_code): 
    return make_response(jsonify(message), status_code)

def profile():
    if current_user.is_authenticated:
        userinfo = UserInfo.query.get(current_user.get_id())
        return jsonify({"ok":True, "name":userinfo.name, "email":userinfo.google_email, "profile_pic":userinfo.profile_pic, "user_uid":current_user.uid})
    else:
        return jsonify({"ok":False})

def users():
    users = User.query.all()
    jusers = jsonify(users=[ user.to_dict( rules=('-id','-compositions', '-userinfo') ) for user in users])
    return jusers

def userbyuid(uid):
    user = User.query.filter_by(uid=uid).first()    
    if(user is not None):
        juser = jsonify(user.to_dict( rules=('-path', '-id', '-userinfo') ))
        return juser
    else:
        return jsonify({"error":"Not Found"})

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