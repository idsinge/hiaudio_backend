from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from sqlalchemy_serializer import SerializerMixin


db = SQLAlchemy()

class User(db.Model, UserMixin, SerializerMixin):

    id = db.Column(db.String(100), primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    profile_pic = db.Column(db.String(100))
    compositions = db.relationship('Composition', backref='user')

    def __repr__(self):
        return f'<User "{self.email}">'



class Composition(db.Model, SerializerMixin):

    serialize_rules = ('-user', )

    id = db.Column(db.Integer, primary_key=True)
    privacy = db.Column(db.Integer, nullable=False, server_default="1")
    title = db.Column(db.String(100))
    tracks = db.relationship('Track', backref='composition')

    user_id = db.Column(db.String(100), db.ForeignKey('user.id'))

    def __repr__(self):
        return f'<Composition "{self.title}">'




class Track(db.Model, SerializerMixin):

    serialize_rules = ('-composition', )

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    path = db.Column(db.String(1024))

    composition_id = db.Column(db.Integer, db.ForeignKey('composition.id'))

    def __repr__(self):
        return f'<Track "{self.title}">'
