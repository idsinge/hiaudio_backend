import os
from flask import Flask, request, redirect, jsonify, send_from_directory, abort
from flask_migrate import Migrate
from flask_cors import CORS
from orm import db, User

from flask_login import (
    LoginManager,
    current_user
)

from admin import HiAdmin

import api.auth
import api.composition
import api.track
import api.contributor
import api.user
import api.collection

import config

DB_FILE = config.DB_FILE if hasattr(config, 'DB_FILE') else None
app = Flask(__name__, static_folder=os.path.join(config.BASEDIR, "public", "static"))

app.register_blueprint(api.auth.auth)
app.register_blueprint(api.user.user)
app.register_blueprint(api.composition.comp)
app.register_blueprint(api.track.track)
app.register_blueprint(api.contributor.contrib)
app.register_blueprint(api.collection.coll)

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
    return db.session.get(User, user_id)

db.init_app(app)

@app.route('/')
def index():
    return page("index.html")

@app.route('/<path:filename>', methods=['GET', 'POST'])
def page(filename):
    filename = filename or 'index.html'
    if request.method == 'GET':
        return send_from_directory(os.path.join(config.BASEDIR, "public"), filename)

    abort(404, description="Resource not found")


HiAdmin(app, db)


# FOR HTTPS
if __name__ == "__main__":
    app.run(ssl_context="adhoc", host='0.0.0.0', port=7007, debug=True)

# FOR HTTP
# if __name__ == "__main__":
#     app.run(host='0.0.0.0', port=7007, debug=True)
