import os
from flask import Flask, request, url_for, redirect, jsonify, send_from_directory

from flask_cors import CORS, cross_origin

from orm import db, Composition, Recording, User

from flask_login import (
    LoginManager,
    current_user,
    login_required,
    logout_user,
)

import api.auth
import api.composition
from api.recording import DATA_BASEDIR
from api.recording import BASEDIR

DB_FILE = os.path.join(BASEDIR, 'database.db')

app = Flask(__name__)
# allow uploads up to 16MB
app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' +  DB_FILE
app.config['SQLALCHEMY_RECORDING_MODIFICATIONS'] = False

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
        # It could be implemented at /compositions  API level by returning 
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
#     jusers = jsonify(users=[ user.to_dict( rules=('-compositions',) ) for user in users])    
#     return jusers

# @app.route('/users/<string:id>')
# @cross_origin()
# def user(id):
#     user = User.query.get_or_404(id)
#     juser = jsonify(user.to_dict( rules=('-path',) ))    
#     return juser
# END NOT WORKING

@app.route('/compositions')
@cross_origin()
def compositions():
    compositions = Composition.query.all()
    jcompositions = jsonify(compositions=[ composition.to_dict( rules=('-recordings',) ) for composition in compositions])    
    return jcompositions


@app.route('/composition/<int:id>')
@cross_origin()
def composition(id):
    result = api.composition.composition(id, current_user, Composition)
    return result

@app.route('/newcomposition', methods=['POST'])
@login_required
@cross_origin()
def newcomposition():
    result = api.composition.newcomposition(current_user,User, Composition, db)
    return result

@app.route('/recording/<int:id>')
@cross_origin()
def recording(id):
    recording = Recording.query.get_or_404(id)
    return send_from_directory( DATA_BASEDIR, recording.path )

@app.route('/deleterecording/<int:id>', methods=['DELETE'])
@login_required
@cross_origin()
def deleterecording(id):
   result = api.recording.deleterecording(id, Recording, db)
   return result

@app.route('/fileUpload', methods=['POST'])
@cross_origin()
@login_required
def fileupload():    
    result=api.recording.fileupload(current_user, Composition, Recording, db)
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
