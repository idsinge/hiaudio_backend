from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from sqlalchemy_serializer import SerializerMixin
import enum
from sqlalchemy import Enum

class UserRole(enum.Enum):
    none = 0
    owner = 1
    admin = 2
    member = 3
    guest = 4

db = SQLAlchemy()

class User(db.Model, UserMixin, SerializerMixin):

    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.String(100))
    compositions = db.relationship('Composition', backref='user', cascade="all, delete-orphan")
    userinfo = db.relationship('UserInfo', back_populates='user', cascade="all, delete-orphan")

    def __repr__(self):
        return f'<User "{self.uid}">'

class UserInfo(db.Model, SerializerMixin):

    serialize_rules = ('-user', )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'))
    user = db.relationship('User', back_populates='userinfo')
    name = db.Column(db.String(100))
    profile_pic = db.Column(db.String(100))
    google_uid = db.Column(db.String(100))
    google_name = db.Column(db.String(100))
    google_email = db.Column(db.String(100))
    google_profile_pic = db.Column(db.String(100))   

    def __repr__(self):
        return f'<UserInfo "{self.google_uid}">'

class Composition(db.Model, SerializerMixin):

    serialize_rules = ('-user', )

    id = db.Column(db.Integer, primary_key=True)
    privacy = db.Column(db.Integer, nullable=False, server_default="1")
    title = db.Column(db.String(100))
    tracks = db.relationship('Track', backref='composition', cascade="all, delete-orphan")

    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'))

    contributors = db.relationship('Contributor', backref='composition', cascade="all, delete-orphan")
    opentocontrib = db.Column(db.Boolean, nullable=False, server_default='0')

    def __repr__(self):
        return f'<Composition "{self.title}">'


class Track(db.Model, SerializerMixin):

    serialize_rules = ('-composition', )

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    path = db.Column(db.String(1024))
    user_id = db.Column(db.Integer)
    composition_id = db.Column(db.Integer, db.ForeignKey('composition.id', ondelete='CASCADE'))

    def __repr__(self):
        return f'<Track "{self.title}">'


class Contributor(db.Model, SerializerMixin):

    serialize_rules = ('-composition', )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'))
    user_uid = db.Column(db.String(100))
    composition_id = db.Column(db.Integer, db.ForeignKey('composition.id', ondelete='CASCADE'))
    role = db.Column(Enum(UserRole), nullable=False, default=UserRole.none.value)

    def __repr__(self):
        return f'<Contributor "{self.user_id}">'
