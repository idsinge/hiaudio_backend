import os, json
from flask import Flask, render_template, request, redirect, url_for, jsonify, send_from_directory

from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

from orm import db, Song, Track


basedir = os.path.abspath(os.path.dirname(__file__))

DB_FILE = os.path.join(basedir, 'database.db')
DATA_BASEDIR = os.path.join(basedir, "../data/")

ALLOWED_EXTENSIONS = {'wav', 'mp3', 'ogg'}

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' +  DB_FILE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False



db.init_app(app)




@app.route('/')
@cross_origin()
def index():
    songs = Song.query.all()
    jsongs = jsonify(songs=[ song.to_dict( rules=('-tracks',) ) for song in songs])
    print(jsongs)
    return jsongs


@app.route('/song/<int:id>')
@cross_origin()
def song(id):
    song = Song.query.get_or_404(id)
    jsong = jsonify(song.to_dict( rules=('-path',) ))
    print(jsong)
    return jsong


@app.route('/trackfile/<int:id>')
@cross_origin()
def trackfile(id):
    track = Track.query.get_or_404(id)
    return send_from_directory( DATA_BASEDIR, track.path )



@app.route('/newsong', methods=['POST'])
@cross_origin()
def newsong():
    print(request.data)
    title = request.get_json()["title"]

    song = Song(title=title)

    db.session.add(song)
    db.session.commit()

    return jsonify(song=song.to_dict( rules=('-path',) ))



def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/fileUpload/', methods=['POST'])
@cross_origin()
def fileupload():

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


    return ""





if __name__ == "__main__":
    app.run(host='0.0.0.0', port=7007, debug=True)
