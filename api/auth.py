import os, json
from oauthlib.oauth2 import WebApplicationClient
from random_username.generate import generate_username
from orm import db, User, UserInfo
from flask import Blueprint, request, redirect, url_for
import requests
from flask_login import (
    login_user,
    logout_user,
    login_required
)
# Configuration
GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", None)
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", None)
GOOGLE_DISCOVERY_URL = (
    "https://accounts.google.com/.well-known/openid-configuration"
)


# OAuth 2 client setup
client = WebApplicationClient(GOOGLE_CLIENT_ID)

auth = Blueprint('auth', __name__)

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
    result="ok", 200
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
    else:
        result="User email not available or not verified by Google.", 400

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

    # Begin user session by logging the user in
    login_user(user)

    # Send user back to homepage
    # TODO: check result before forwarding to homepage
    return redirect(url_for("index"))

@auth.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("index"))