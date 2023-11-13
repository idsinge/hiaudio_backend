import os
from flask import Flask, request, redirect, jsonify, send_from_directory, abort
from flask_migrate import Migrate
from flask_cors import CORS
from orm import db, User

from flask_jwt_extended import JWTManager

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
jwt = JWTManager(app)
jwt.user_lookup_loader(api.auth.user_loader_callback)

migrate = Migrate(app, db)

db.init_app(app)





@app.route('/')
def index():
    return page("index.html")



from flask_mail import Mail, Message

app.config['MAIL_SERVER'] = 'ssl0.ovh.net'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'admin@hiaudio.fr'
app.config['MAIL_PASSWORD'] = os.environ.get("OVH_EMAIL_PASSWD")
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
mail = Mail(app)

@app.route('/email')
def email():
    msg = Message(subject='Hello from the other side!', sender=('HiAudio', 'admin@hiaudio.fr'), recipients=['aurelien.david@telecom-paris.fr', 'aureliendavid.pro@gmail.com'])
    msg.body = "Hey Paul, sending you this email from my Flask app, lmk if it works"
    mail.send(msg)
    return "Message sent!"


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
