import os
from flask import Flask, request, url_for, redirect, jsonify, send_from_directory
from flask_migrate import Migrate
from flask_cors import CORS, cross_origin

from orm import db, Composition, User, UserInfo

from flask_login import (
    LoginManager,
    current_user,
    login_required,
    logout_user,
)

import api.auth
import api.composition
import api.track
import api.contributor
import api.user

import config

DB_FILE = config.DB_FILE if hasattr(config, 'DB_FILE') else None
app = Flask(__name__)
# allow uploads up to 50MB
app.config['MAX_CONTENT_LENGTH'] = 50 * 1000 * 1000
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.config['SQLALCHEMY_DATABASE_URI'] = config.DB_CNX
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.secret_key = os.environ.get("SECRET_KEY") or os.urandom(24)
# User session management setup
# https://flask-login.readthedocs.io/en/latest
login_manager = LoginManager()
login_manager.init_app(app)

migrate = Migrate(app, db)

# Flask-Login helper to retrieve a user from our db
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

db.init_app(app)

@app.route('/')
def index():
    if current_user.is_authenticated:
        # TODO: Find a different way to redirect to home page with auth
        # It could be implemented at /compositions  API level by returning
        # a param in the response
        return redirect(request.base_url+"public/index.html?auth=true")
    else:
        return redirect(request.base_url+"public/index.html")

@app.route("/profile")
def register():
    return api.user.profile()

@app.route("/login")
def login():
    request_uri = api.auth.login()
    return redirect(request_uri)

@app.route("/login/callback")
def callback():
    result = api.auth.callback(User, UserInfo, db)
    # TODO: check if result is correct
    return redirect(url_for("index"))

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("index"))

@app.route('/users')
@cross_origin()
def users():
    return api.user.users()

@app.route('/user/<string:uid>')
@cross_origin()
def user(uid):    
    return api.user.userbyuid(uid)

@app.route('/deleteuser/<string:uid>', methods=['DELETE'])
@cross_origin()
@login_required
def deleteuser(uid):
    return api.user.deleteuser(uid)

# TODO: this API method could change in the future to allow filtering users in the app search bar when adding a new contributor
# param "info" can be either an email address, a user id or a name
@app.route('/checkuser/<string:info>')
@cross_origin()
@login_required
def checkuser(info):
    result=api.user.checkuser(info)
    return result

@app.route('/compositions')
@cross_origin()
def compositions():
    compositions = api.composition.compositions()
    return compositions


@app.route('/composition/<int:id>')
@cross_origin()
def composition(id):
    result = api.composition.composition(id)
    return result

@app.route('/newcomposition', methods=['POST'])
@login_required
@cross_origin()
def newcomposition():
    result = api.composition.newcomposition()
    return result

@app.route('/deletecomposition/<int:id>', methods=['DELETE'])
@login_required
@cross_origin()
def deletecomposition(id):
    result = api.composition.deletecomposition(id)
    return result

@app.route('/updateprivacy', methods=['PATCH'])
@login_required
@cross_origin()
def updateprivacy():
    result = api.composition.updateprivacy()
    return result

@app.route('/updatecomptitle', methods=['PATCH'])
@login_required
@cross_origin()
def updatecomptitle():
    result = api.composition.updatecomptitle()
    return result

@app.route('/updatecomptocontrib', methods=['PATCH'])
@login_required
@cross_origin()
def updatecomptocontrib():
    result = api.composition.updatecomptocontrib()
    return result

@app.route('/trackfile/<int:id>')
@cross_origin()
def trackfile(id):
    return api.track.trackfile(id)  

@app.route('/deletetrack/<int:id>', methods=['DELETE'])
@login_required
@cross_origin()
def deletetrack(id):
   result = api.track.deletetrack(id)
   return result

@app.route('/fileUpload', methods=['POST'])
@cross_origin()
@login_required
def fileupload():
    result=api.track.fileupload()
    return result

@app.route('/addcontributorbyemail', methods=['POST'])
@cross_origin()
@login_required
def addcontributorbyemail():
    result=api.contributor.addcontributorbyemail()
    return result

@app.route('/addcontributorbyid', methods=['POST'])
@cross_origin()
@login_required
def addcontributorbyid():
    result=api.contributor.addcontributorbyid()
    return result

@app.route('/deletecontributor/<string:uid>', methods=['DELETE'])
@login_required
@cross_origin()
def deletecontributor(uid):
   result = api.contributor.deletecontributor(uid)
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
