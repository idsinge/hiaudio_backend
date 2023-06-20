import os
from flask import Flask, request, url_for, redirect, jsonify, send_from_directory
from flask_migrate import Migrate
from flask_cors import CORS, cross_origin

from orm import db, User, UserInfo

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
app.register_blueprint(api.user.user)
app.register_blueprint(api.composition.comp)
app.register_blueprint(api.track.track)
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
