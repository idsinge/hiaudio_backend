from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin


db = SQLAlchemy()


class Song(db.Model, SerializerMixin):

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    tracks = db.relationship('Track', backref='song')

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
