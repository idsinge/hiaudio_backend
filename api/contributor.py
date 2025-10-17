from flask import Blueprint, request, jsonify
from email_validator import validate_email, EmailNotValidError
from orm import db, User, UserRole, Composition, Contributor, UserInfo, InvitationEmail
from flask_jwt_extended import current_user, jwt_required
from flask_cors import cross_origin
from emails import Emails
import api.auth
import shortuuid
import config

contrib = Blueprint('contrib', __name__)

@contrib.route('/addcontributorbyemail', methods=['POST'])
@cross_origin()
@jwt_required()
def addcontributorbyemail():
    if not getattr(config, 'EMAIL_MODULE_ACTIVE', False):
        return jsonify({"error":"email module not active"})
    user_auth = current_user.id
    rjson = request.get_json()
    comp_uuid = rjson.get("composition_id", None)   
    email_to_invite = rjson.get("email", None)
    role_to_add = rjson.get("role", None)
    if(comp_uuid is None) or (email_to_invite is None) or (not role_to_add) or  (role_to_add is None) or (int(role_to_add) < UserRole.owner.value) or (int(role_to_add) > UserRole.guest.value):
        return jsonify({"error":"error in parameters"})
    else:
        composition = Composition.query.filter_by(uuid=comp_uuid).first()
        if(composition is None):
            return jsonify({"error":"composition not found"})
        
        user1 = UserInfo.query.get(user_auth)
        creator = UserInfo.query.get(composition.user_id)
        user_who_invites = Contributor.query.filter_by(user_uid=user1.user_uid, composition_id=composition.id).first()
        is_allowed = False

        if (user_who_invites is not None) and (role_to_add != UserRole.owner.value):
            is_allowed = user_who_invites.role.value == UserRole.owner.value
            
        if ((creator.user_id == user_auth) or is_allowed) and creator.user_email != email_to_invite:
            if email_to_invite is not None:                
                try:
                    emailinfo = validate_email(email_to_invite, check_deliverability=False)
                    email_to_invite = emailinfo.normalized
                except EmailNotValidError as e:            
                    return jsonify({"ok":False, "error":str(e)})  
            
            # if user tries to add himself throws error            
            if(user1.user_email != email_to_invite):
                user2 = UserInfo.query.filter_by(user_email=email_to_invite).first()

                if(user2 is None):                
                    refusal_code = shortuuid.uuid()                    
                    result = Emails().sendinvitationemail(email_to_invite, request.host, refusal_code)
                    if(result):                        
                        new_invitation = InvitationEmail(email=email_to_invite, refusal_code=refusal_code, invited_by=user_auth)
                        db.session.add(new_invitation)
                        db.session.commit()  
                        newuser = api.auth.createnewuserindb(email_to_invite)
                        user2 = user2 = UserInfo.query.get(newuser.id)
                    else:
                        return jsonify({"error":"problem sending email"})

                return addcontributortodb(user2.id, user2.user_uid, composition, role_to_add)
            else:
                return jsonify({"error":"you can't add yourself as a contributor"})
        else:
            return jsonify({"error":"adding that contributor with that role is not allowed"})


@contrib.route('/addcontributorbyid', methods=['POST'])
@cross_origin()
@jwt_required()
def addcontributorbyid():
    return jsonify({"error":"method not valid anymore"})
    """ user_auth = current_user.id
    comp_uuid = request.get_json()['composition_id']
    composition = Composition.query.filter_by(uuid=comp_uuid).first()
    if(composition is None):
        return jsonify({"error":"composition not found"})
    else:
        # if the person who tries to add the contributor is the owner
        # TODO:[issue 89] check if the role is 1 (UserRole.owner.value)
        # control that permission is not changed to creator of the composition
        if composition.user.id == user_auth:
            useruid = request.get_json()["user_uid"]

            role = request.get_json()['role']
            # check the ID is in DB
            user2 = User.query.filter_by(uid=useruid).first()
            # if Owner tries to add himself throws error
            if((user2 is not None) and (user_auth != user2.id) and (UserRole.owner.value <=role <= UserRole.guest.value)):
                return addcontributortodb(user2.id, useruid, composition, role)
            else:
                return jsonify({"error":"not valid contributor"})
        else:
            return jsonify({"error":"not valid owner"}) """

def addcontributortodb(user2id, user2uid, composition, role):
    querycontributor = Contributor.query.filter_by(user_id=user2id, composition_id=composition.id)
    iscontributor = querycontributor.first()
    # if is already contributor => UPDATE role
    # TODO: check current role is not the same to avoid running db statement
    if(iscontributor is not None):
        querycontributor.update({"role":UserRole(role).name})
        db.session.commit()
        return jsonify({"ok":True, "result":"role updated successfully", "contribid":iscontributor.id})
    else:
        contributor = Contributor(role=UserRole(role).name, user_id=user2id, user_uid=user2uid, composition=composition)
        db.session.add(contributor)
        db.session.commit()
        return jsonify({"ok":True, "result":"role added successfully", "contribid":contributor.id, "uuid":user2uid})

@contrib.route('/deletecontributor', methods=['DELETE'])
@jwt_required()
@cross_origin()
def deletecontributor():
    user_auth = current_user.id
    rjson = request.get_json()
    contrib_uuid = rjson.get("contrib_uuid", None)
    comp_uuid = rjson.get("comp_uuid", None)
    if(contrib_uuid and comp_uuid):
        composition = Composition.query.filter_by(uuid=comp_uuid).first()
        if(composition):
            contributor = Contributor.query.filter_by(user_uid=contrib_uuid, composition_id=composition.id).first()
            if(contributor is not None):

                # the action is done by the creator of the composition
                if(composition.user_id == user_auth):
                    db.session.delete(contributor)
                    db.session.commit()
                    return jsonify({"ok":True, "result":"deleted contributor " + contrib_uuid + " from composition " + comp_uuid})
                # the action is done by an authorized role of the composition
                else:
                    queryauthorized = Contributor.query.filter_by(user_id=user_auth, composition_id=composition.id)
                    isauthorized = queryauthorized.first()
                    # a owner contributor cannot delete another owner contributor, only creator can do that
                    if (isauthorized is not None):
                        role = isauthorized.role.value
                        # check the user is not the owner but it's himself, example:
                        # I removed myself from a composition where I was a contributor (role member)
                        if ((role == UserRole.owner.value and contributor.role.value != UserRole.owner.value) or(isauthorized.user_uid == contrib_uuid)):
                            db.session.delete(contributor)
                            db.session.commit()
                            return jsonify({"ok":True,  "result":"deleted contributor " + contrib_uuid + " from composition " + comp_uuid + " by " +isauthorized.user_uid })
                        else:
                            return jsonify({"error":"not permission to delete"})
                    else:
                        return jsonify({"error":"not permission to delete"})
            else:
                return jsonify({"error":"contributor not found"})
        else:
            return jsonify({"error":"composition not found"})
    else:
        return jsonify({"error":"wrong params"})
