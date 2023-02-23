from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from sqlalchemy_serializer import SerializerMixin


db = SQLAlchemy()

class User(db.Model, UserMixin, SerializerMixin):

    id = db.Column(db.String(100), primary_key=True)
    username = db.Column(db.String(100))
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    profile_pic = db.Column(db.String(100))
    songs = db.relationship('Song', backref='user')

    def __repr__(self):
        return f'<User "{self.email}">'



class Song(db.Model, SerializerMixin):

    serialize_rules = ('-user', )

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    tracks = db.relationship('Track', backref='song')

    user_id = db.Column(db.String(100), db.ForeignKey('user.id'))

    def __repr__(self):
        return f'<Song "{self.title}">'




class Track(db.Model, SerializerMixin):

    serialize_rules = ('-song', )

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    path = db.Column(db.String(1024))

    song_id = db.Column(db.Integer, db.ForeignKey('song.id'))

    def __repr__(self):
        return f'<Track "{self.title}">'
