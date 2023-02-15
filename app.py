import os
from flask import Flask, request, url_for, redirect, jsonify, send_from_directory

from flask_cors import CORS, cross_origin

from orm import db, Song, Track, User

from flask_login import (
    LoginManager,
    current_user,
    login_required,
    logout_user,
)

import api.auth
import api.song
import api.track

basedir = os.path.abspath(os.path.dirname(__file__))

DB_FILE = os.path.join(basedir, 'database.db')
DATA_BASEDIR = os.path.join(basedir, "../data/")

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


# Flask-Login helper to retrieve a user from our db
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

db.init_app(app)

@app.route('/')
def index():
    if current_user.is_authenticated:    
        # TODO: Find a different way to redirect to home page with auth
        # It could be implemented at /songs  API level by returning 
        # a param in the response
        return redirect(request.base_url+"public/index.html?auth=true")
    else:
        return redirect(request.base_url+"public/index.html")

@app.route("/profile")
def register():
    if current_user.is_authenticated:
        return jsonify({"ok":True, "name":current_user.name, "email":current_user.email, "profile_pic":current_user.profile_pic})       
    else:
        return jsonify({"ok":False})        

@app.route("/login")
def login():
    request_uri = api.auth.login()
    return redirect(request_uri)

@app.route("/login/callback")
def callback():  
    result = api.auth.callback(User, db)  
    # TODO: check if result is correct   
    return redirect(url_for("index"))

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("index"))

# NOT WORKING
# @app.route('/users')
# @cross_origin()
# def users():
#     users = User.query.all()
#     jusers = jsonify(users=[ user.to_dict( rules=('-songs',) ) for user in users])    
#     return jusers

# @app.route('/users/<string:id>')
# @cross_origin()
# def user(id):
#     user = User.query.get_or_404(id)
#     juser = jsonify(user.to_dict( rules=('-path',) ))    
#     return juser
# END NOT WORKING

@app.route('/songs')
@cross_origin()
def songs():
    songs = Song.query.all()
    jsongs = jsonify(songs=[ song.to_dict( rules=('-tracks',) ) for song in songs])    
    return jsongs


@app.route('/song/<int:id>')
@cross_origin()
def song(id):
    result = api.song.song(id, current_user, Song)
    return result

@app.route('/newsong', methods=['POST'])
@login_required
@cross_origin()
def newsong():
    result = api.song.newsong(current_user,User, Song, db)
    return result

@app.route('/trackfile/<int:id>')
@cross_origin()
def trackfile(id):
    track = Track.query.get_or_404(id)
    return send_from_directory( DATA_BASEDIR, track.path )

@app.route('/deletetrack/<int:id>', methods=['DELETE'])
@login_required
@cross_origin()
def deletetrack(id):
   result = api.track.deletetrack(id, Track, db)
   return result

@app.route('/fileUpload', methods=['POST'])
@cross_origin()
@login_required
def fileupload():    
    result=api.track.fileupload(current_user, Song, Track, db)
    return result

@app.route('/<path:filename>', methods=['GET', 'POST'])
def page(filename):    
    filename = filename or 'public/index.html'
    if request.method == 'GET':
        return send_from_directory('.', filename)

    return jsonify(request.data)

# FOR HTTPS
if __name__ == "__main__":
    app.run(ssl_context="adhoc", host='0.0.0.0', port=7007, debug=True)

# FOR HTTP
# if __name__ == "__main__":    
#     app.run(host='0.0.0.0', port=7007, debug=True)
