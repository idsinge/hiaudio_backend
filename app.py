import os
from flask import Flask, request, send_from_directory, abort, redirect, url_for
from flask_migrate import Migrate
from flask_cors import CORS
from orm import db
from flask_mail import Mail

from flask_jwt_extended import JWTManager

from admin import HiAdmin
from utils import Utils

import api.auth
import api.composition
import api.track
import api.contributor
import api.user
import api.collection
import api.annotation

import config

DB_FILE = config.DB_FILE if hasattr(config, 'DB_FILE') else None
app = Flask(__name__, static_folder=os.path.join(config.BASEDIR, "public", "static"))

app.register_blueprint(api.auth.auth)
app.register_blueprint(api.user.user)
app.register_blueprint(api.composition.comp)
app.register_blueprint(api.track.track)
app.register_blueprint(api.contributor.contrib)
app.register_blueprint(api.collection.coll)
app.register_blueprint(api.annotation.annotat)

# allow uploads up to 50MB by default
app.config['MAX_CONTENT_LENGTH'] = config.UPLOAD_MAX_SIZE if hasattr(config, 'UPLOAD_MAX_SIZE') else 50 * 1000 * 1000
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.config['SQLALCHEMY_DATABASE_URI'] = config.DB_CNX
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.secret_key = os.environ.get("SECRET_KEY") or os.urandom(24)

app.config['JWT_SECRET_KEY'] = os.environ.get("JWT_SECRET_KEY") or os.urandom(24)
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 30*24*3600  # 30 days
app.config['JWT_TOKEN_LOCATION'] = ['headers', 'cookies']
app.config['JWT_COOKIE_CSRF_PROTECT'] = False  # not sure about this, needs some tests
app.config['JWT_SESSION_COOKIE'] = False

jwt = JWTManager(app)
jwt.user_lookup_loader(api.auth.user_loader_callback)

migrate = Migrate(app, db)

db.init_app(app)


app.config['MAIL_SERVER'] = config.MAIL_SERVER
app.config['MAIL_PORT'] = config.MAIL_PORT
app.config['MAIL_USERNAME'] = config.MAIL_USERNAME
app.config['MAIL_PASSWORD'] = os.environ.get("OVH_EMAIL_PASSWD")
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
mail = Mail(app)

DEFAULT_PAGE = 'index.html'

@app.route('/')
def index():
    return page(DEFAULT_PAGE)

@app.route('/user_page/<string:uid>')
def user_page(uid):    
    return redirect(url_for('page', filename=DEFAULT_PAGE, userid=uid))

@app.route('/collection_page/<string:uid>')
def collection(uid):
    return redirect(url_for('page', filename=DEFAULT_PAGE, collectionid=uid))

@app.route('/workshop', methods=["GET"])
def redirect_external():
    return redirect('https://hi-audio.imt.fr/agenda/29th-april-music-workshop/', code=302)

@app.route('/<path:filename>', methods=['GET', 'POST'])
def page(filename):
    filename = filename or DEFAULT_PAGE
    if request.method == 'GET':   
        return send_from_directory(os.path.join(config.BASEDIR, "public"), filename)

    abort(404, description="Resource not found")



HiAdmin(app, db)
Utils(app, mail)

# FOR HTTPS
if __name__ == "__main__":
    app.run(ssl_context="adhoc", host='0.0.0.0', port=7007, debug=True)

# FOR HTTP
# if __name__ == "__main__":
#     app.run(host='0.0.0.0', port=7007, debug=True)
