import os, json
from oauthlib.oauth2 import WebApplicationClient
from random_username.generate import generate_username
from orm import db, User, UserInfo
from flask import Blueprint, request, redirect, url_for
import requests


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

@auth.route("/login")
def login():
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

@auth.route("/login/callback")
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
        unique_id = userinfo_response.json()["sub"]
        users_email = userinfo_response.json()["email"]
        picture = userinfo_response.json()["picture"]
        users_name = userinfo_response.json()["given_name"]
    #else:
        # "User email not available or not verified by Google.", 400

    # TODO: check the random username is not already there in DB (must be unique)
    rdmusername = generate_username()

    # TODO: generate a random user profile picture
    default_picture ="https://raw.githubusercontent.com/gilpanal/beatbytebot_webapp/master/src/img/agp.png"

    user = User.query.filter_by(uid=unique_id).first()

    if user is not None:
        userinfo = UserInfo.query.filter_by(google_uid=unique_id)
        userinfo.update({"google_name":users_name,"google_profile_pic":picture,"google_email":users_email})
        db.session.commit()
    else:
        # Doesn't exist? Add it to the database.
        user = User(uid=unique_id)
        # Create a user info entry in your db with the information provided by Google
        userinfo = UserInfo(user=user, google_uid=unique_id, google_name=users_name, google_profile_pic=picture, google_email=users_email, name=rdmusername[0], profile_pic=default_picture)
        db.session.add(user)
        db.session.commit()
        db.session.add(userinfo)
        db.session.commit()


    # create token, write it in the response, and redirect to home
    access_token = create_access_token(identity=user.uid)
    response = redirect(url_for("index"))
    set_access_cookies(response, access_token)

    return response


@auth.route("/logout")
@jwt_required()
def logout():
    response = redirect(url_for("index"))
    unset_jwt_cookies(response)
    return response
