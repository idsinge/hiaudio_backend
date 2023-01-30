import os, json
from flask import Flask, request, redirect, url_for, jsonify, send_from_directory

from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename

from orm import db, Song, Track, User

from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)
from oauthlib.oauth2 import WebApplicationClient
import requests

# Configuration
GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", None)
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", None)
GOOGLE_DISCOVERY_URL = (
    "https://accounts.google.com/.well-known/openid-configuration"
)

basedir = os.path.abspath(os.path.dirname(__file__))

DB_FILE = os.path.join(basedir, 'database.db')
DATA_BASEDIR = os.path.join(basedir, "../data/")

ALLOWED_EXTENSIONS = {'wav', 'mp3', 'ogg'}

app = Flask(__name__)
# allow uploads up to 16MB
app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' +  DB_FILE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.secret_key = os.environ.get("SECRET_KEY") or os.urandom(24)
# User session management setup
# https://flask-login.readthedocs.io/en/latest
login_manager = LoginManager()
login_manager.init_app(app)

# OAuth 2 client setup
client = WebApplicationClient(GOOGLE_CLIENT_ID)

# Flask-Login helper to retrieve a user from our db
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

db.init_app(app)

@app.route('/')
def index():
    if current_user.is_authenticated:
        return redirect("https://localhost:7007/webapp/index.html?auth=true")
    else:
        return redirect("https://localhost:7007/webapp/index.html")

@app.route("/register")
@app.route("/profile")
def register():
    if current_user.is_authenticated:
        return (
            "<p>Hello, {}! You're logged in! Email: {}</p>"
            "<div><p>Google Profile Picture:</p>"
            '<img src="{}" alt="Google profile pic"></img></div>'
            '<a class="button" href="/">Go Home</a><br>'
            '<a class="button" href="/logout">Logout</a>'.format(
                current_user.name, current_user.email, current_user.profile_pic
            )
        )
    else:
        return '<a class="button" href="/login">Google Login</a>'

def get_google_provider_cfg():
    return requests.get(GOOGLE_DISCOVERY_URL).json()

@app.route("/login")
def login():
    # Find out what URL to hit for Google login
    google_provider_cfg = get_google_provider_cfg()
    authorization_endpoint = google_provider_cfg["authorization_endpoint"]

    print (request.base_url)
    # Use library to construct the request for Google login and provide
    # scopes that let you retrieve user's profile from Google
    request_uri = client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri=request.base_url + "/callback",
        #redirect_uri= "https://localhost:80/index.html?auth=true",                
        scope=["openid", "email", "profile"],
    )
    return redirect(request_uri)

@app.route("/login/callback")
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
        #redirect_url= "https://127.0.0.1:7007",  
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
        return "User email not available or not verified by Google.", 400
    
    # Create a user in your db with the information provided
    # by Google
    user = User(id=unique_id, name=users_name, email=users_email, profile_pic=picture)
   
    # Doesn't exist? Add it to the database.  
    if not User.query.get(unique_id):
        db.session.add(user)
        db.session.commit()

    # Begin user session by logging the user in    
    login_user(user)

    # Send user back to homepage
    return redirect(url_for("index"))

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("index"))

@app.route('/users')
@cross_origin()
def users():
    users = User.query.all()
    jusers = jsonify(users=[ user.to_dict( rules=('-songs',) ) for user in users])    
    return jusers

@app.route('/users/<int:id>')
@cross_origin()
def user(id):
    user = User.query.get_or_404(id)
    juser = jsonify(user.to_dict( rules=('-path',) ))    
    return juser

@app.route('/songs')
@cross_origin()
def songs():
    songs = Song.query.all()
    jsongs = jsonify(songs=[ song.to_dict( rules=('-tracks',) ) for song in songs])    
    return jsongs


@app.route('/song/<int:id>')
@cross_origin()
def song(id):
    song = Song.query.get_or_404(id)
    jsong = jsonify(song.to_dict( rules=('-path',) ))    
    return jsong


@app.route('/trackfile/<int:id>')
@cross_origin()
def trackfile(id):
    track = Track.query.get_or_404(id)
    return send_from_directory( DATA_BASEDIR, track.path )

@app.route('/newsong', methods=['POST'])
@login_required
@cross_origin()
def newsong():
    print(current_user.get_id())
    if current_user.is_authenticated:        
        title = request.get_json()["title"]

        song = Song(title=title)

        db.session.add(song)
        db.session.commit()

        return jsonify(song=song.to_dict( rules=('-path',) ))
    
    else:
        return jsonify({"error":"not authenticated"})

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/fileUpload', methods=['POST'])
@cross_origin()
@login_required
def fileupload():
    
    if current_user.is_authenticated:        
        songid = request.form['song_id']
        song = Song.query.get_or_404(songid)

        file = request.files['audio']


        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            trackpath = f"songs/{songid}/{filename}"
            fullpath = os.path.join(DATA_BASEDIR, trackpath )

            os.makedirs(os.path.dirname(fullpath), exist_ok=True);

            file.save( fullpath )

            newtrack = Track(title=filename, path=trackpath, song=song)
            db.session.add(newtrack)
            db.session.commit()
            respInfo ={"message":{
                "audio":{"songid":songid, "title":filename, "path":trackpath, "file_unique_id":"fileuniqueid"}}, 
                "date":"123456789", 
                "message_id":"messageid"}
            return jsonify({"ok":"true", "result":respInfo})
        else: 
            return jsonify({"error":"type not allowed"})
    else:
        return jsonify({"error":"not authenticated"})

@app.route('/<path:filename>', methods=['GET', 'POST'])
def page(filename):    
    filename = filename or 'webapp/index.html'
    if request.method == 'GET':
        return send_from_directory('.', filename)

    return jsonify(request.data)

# FOR HTTPS
if __name__ == "__main__":
    app.run(ssl_context="adhoc", port=7007, debug=True)

# FOR HTTP
# if __name__ == "__main__":    
#     app.run(host='0.0.0.0', port=7007, debug=True)
