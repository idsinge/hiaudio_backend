import os, json
from email_validator import validate_email, EmailNotValidError
import random
from oauthlib.oauth2 import WebApplicationClient
from random_username.generate import generate_username
from orm import db, User, UserInfo, VerificationCode, InvitationEmail
from flask import Blueprint, jsonify, request, redirect, url_for
import requests
from datetime import datetime
import shortuuid

from utils import Utils

from flask_jwt_extended import (
    jwt_required, create_access_token, unset_jwt_cookies,
    set_access_cookies, verify_jwt_in_request, get_current_user
)
from flask_jwt_extended.config import config as jwtconfig
from flask_jwt_extended.exceptions import JWTExtendedException
from jwt.exceptions import PyJWTError



# Configuration
GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", None)
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", None)
GOOGLE_DISCOVERY_URL = (
    "https://accounts.google.com/.well-known/openid-configuration"
)


# OAuth 2 client setup
client = WebApplicationClient(GOOGLE_CLIENT_ID)

auth = Blueprint('auth', __name__)


def user_loader_callback(_jwt_header, jwt_data):
    uid = jwt_data["sub"]
    user = User.query.filter_by(uid=uid).first()
    return user


def is_user_logged_in():
    try:
        verify_jwt_in_request()
        return get_current_user()
    except (JWTExtendedException, PyJWTError) as e:
        pass
    return None


def get_user_token():
    if is_user_logged_in():
        return request.cookies.get(jwtconfig.access_cookie_name, None)
    else:
        return None


def get_google_provider_cfg():
    return requests.get(GOOGLE_DISCOVERY_URL).json()

@auth.route("/googlelogin")
def googlelogin():
    # Find out what URL to hit for Google login
    google_provider_cfg = get_google_provider_cfg()
    authorization_endpoint = google_provider_cfg["authorization_endpoint"]

    # Use library to construct the request for Google login and provide
    # scopes that let you retrieve user's profile from Google
    request_uri = client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri=request.base_url + "/callback",
        scope=["openid", "email", "profile"],
    )
    return redirect(request_uri)

@auth.route("/googlelogin/callback")
def callback():
    # Get authorization code Google sent back to you
    code = request.args.get("code")
    # Find out what URL to hit to get tokens that allow you to ask for
    # things on behalf of a user
    google_provider_cfg = get_google_provider_cfg()
    token_endpoint = google_provider_cfg["token_endpoint"]
    # Prepare and send a request to get tokens! Yay tokens!
    token_url, headers, body = client.prepare_token_request(
        token_endpoint,
        authorization_response=request.url,
        redirect_url=request.base_url,
        code=code
    )
    token_response = requests.post(
        token_url,
        headers=headers,
        data=body,
        auth=(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET),
    )

    # Parse the tokens!
    client.parse_request_body_response(json.dumps(token_response.json()))
    # Now that you have tokens (yay) let's find and hit the URL
    # from Google that gives you the user's profile information,
    # including their Google profile image and email
    userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
    uri, headers, body = client.add_token(userinfo_endpoint)
    userinfo_response = requests.get(uri, headers=headers, data=body)
    # You want to make sure their email is verified.
    # The user authenticated with Google, authorized your
    # app, and now you've verified their email through Google!
    if userinfo_response.json().get("email_verified"):
        users_email = userinfo_response.json()["email"]
    #else:
        # "User email not available or not verified by Google.", 400

    user = createnewuserindb(users_email)

    response = redirect(url_for("index"))

    return setaccessforuser(user, response)

def generate_unique_uuid():

    while True:
        uuid = shortuuid.uuid()
        if not User.query.filter_by(uid=uuid).first():
            return uuid


def generate_unique_username():

    while True:
        uname = generate_username()
        uname = uname[0]
        if not UserInfo.query.filter_by(name=uname).first():
            return uname

def createnewuserindb(users_email):

    user =  None

    user_by_email = UserInfo.query.filter_by(user_email=users_email).first()

    if user_by_email is not None:
        user = User.query.get(user_by_email.user_id)
    else:
        # Doesn't exist? Add it to the database.
        unique_id = generate_unique_uuid()
        rdmusername = generate_unique_username()

        # TODO: generate a random user profile picture
        default_picture ="https://raw.githubusercontent.com/gilpanal/beatbytebot_webapp/master/src/img/agp.png"
        user = User(uid=unique_id)
        # Create a user info entry in your db with the information provided by Google
        userinfo = UserInfo(user=user, user_uid=unique_id, user_email=users_email, name=rdmusername, profile_pic=default_picture)
        db.session.add(user)
        db.session.commit()
        db.session.add(userinfo)
        db.session.commit()

    return user

def setaccessforuser(user, response):

    userinfo = UserInfo.query.get(user.id)
    verification_pending = VerificationCode.query.filter_by(email=userinfo.user_email).first()
    if verification_pending:
        db.session.delete(verification_pending)
        db.session.commit()
    invitation_pending = InvitationEmail.query.filter_by(email=userinfo.user_email).first()
    if invitation_pending:
        db.session.delete(invitation_pending)
        db.session.commit()
    # create token, write it in the response, and redirect to home
    access_token = create_access_token(identity=user.uid)
    set_access_cookies(response, access_token)

    return response


@auth.route("/logout")
@jwt_required()
def logout():
    response = redirect(url_for("index"))
    unset_jwt_cookies(response)
    return response

@auth.route('/generatelogincode/<string:email>', methods=['PUT'])
def generatelogincode(email):

    if is_user_logged_in():
        return jsonify({"ok":False, "error":"user already logged in"})
    else:
        code = None

        try:
            emailinfo = validate_email(email, check_deliverability=False)
            email = emailinfo.normalized
        except EmailNotValidError as e:
            return jsonify({"ok":False, "error":str(e)})

        existing_email = VerificationCode.query.filter_by(email=email).first()

        if existing_email:
            if existing_email.attempts >= 5:
                return jsonify({"ok":False, "error":"You reached the maximum of attempts, please try with a different email account"})
            else:
                existing_email.attempts += 1
                existing_email.date = datetime.utcnow()
                code = ''.join(str(random.randint(0, 9)) for _ in range(6))
                existing_email.code = code
                db.session.commit()
        else:
            code = ''.join(str(random.randint(0, 9)) for _ in range(6))
            new_code = VerificationCode(email=email, code=code)
            db.session.add(new_code)
            db.session.commit()

        utils = Utils()
        result = utils.sendeverificationcode(email, code)

        if result:
            return jsonify({"ok":True, "result":"Code successfully sent"})
        else:
            user_email = VerificationCode.query.filter_by(email=email).first()
            # if the email was not sent then remove the entry from DB
            db.session.delete(user_email)
            db.session.commit()
            return jsonify({"ok":False, "error":"Sorry, there was a problem sending the email"})


@auth.route('/logincodevalidation', methods=['POST'])
def logincodevalidation():
    if is_user_logged_in():
        return jsonify({"ok":False, "error":"user already logged in"})
    else:
        rjson = request.get_json()
        email = rjson.get("email", None)
        code = rjson.get("code", None)

        if email is not None and code is not None:

            try:
                emailinfo = validate_email(email, check_deliverability=False)
                email = emailinfo.normalized
            except EmailNotValidError as e:
                return jsonify({"ok":False, "error":str(e)})
            code_str = str(code)
            if code_str.isdigit() and len(code_str) == 6:
                existing_email = VerificationCode.query.filter_by(email=email).first()
                if existing_email:
                    if existing_email.code == str(code):
                        # TODO: check expiration date
                        user = createnewuserindb(email)

                        response = jsonify({"ok":True})

                        return setaccessforuser(user, response)

                    else:
                        return jsonify({"ok":False, "error":"wrong code"})
                else:
                    return jsonify({"ok":False, "error":"email not found"})
            else:
                return jsonify({"ok":False, "error":"wrong code format"})
        else:
            return jsonify({"ok":False, "error":"no email or code"})
