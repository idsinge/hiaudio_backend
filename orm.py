from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
import enum
from sqlalchemy import Enum
import shortuuid
from datetime import datetime
from sqlalchemy.sql import func

class UserRole(enum.Enum):
    none = 0
    owner = 1
    admin = 2
    member = 3
    guest = 4

class LevelPrivacy(enum.Enum):
    public = 1
    onlyreg = 2
    private = 3

db = SQLAlchemy()

class User(db.Model, SerializerMixin):

    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.String(100))
    is_admin = db.Column(db.Boolean(), default=False)
    terms_accepted = db.Column(db.Boolean(), default=False)
    compositions = db.relationship('Composition', backref='user', cascade="all, delete-orphan")
    collections = db.relationship('Collection', backref='user', cascade="all, delete-orphan")
    userinfo = db.relationship('UserInfo', back_populates='user', cascade="all, delete-orphan")
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)

    def __repr__(self):
        return f'<User "{self.uid}">'

class UserInfo(db.Model, SerializerMixin):

    serialize_rules = ('-user', )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'))
    user = db.relationship('User', back_populates='userinfo')
    name = db.Column(db.String(100), unique=True, nullable=False)
    profile_pic = db.Column(db.String(100))
    user_uid = db.Column(db.String(100), unique=True, nullable=False)   
    user_email = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)

    def __repr__(self):
        return f'<UserInfo "{self.user_uid}">'

class Collection(db.Model, SerializerMixin):

    serialize_rules = ('-user', )

    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.String(22), nullable=False, unique=True, default=shortuuid.uuid())
    privacy = db.Column(Enum(LevelPrivacy), nullable=False, default=LevelPrivacy.public.value)
    title = db.Column(db.String(100))
    description = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey('collection.id', ondelete='CASCADE'), nullable=True)
    compositions = db.relationship('Composition', backref='collection', cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Collection "{self.title}">'

class Composition(db.Model, SerializerMixin):

    serialize_rules = ('-user', )

    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.String(22), nullable=False, unique=True, default=shortuuid.uuid())
    privacy = db.Column(Enum(LevelPrivacy), nullable=False, default=LevelPrivacy.public.value)
    title = db.Column(db.String(100))
    description = db.Column(db.Text)
    tracks = db.relationship('Track', backref='composition', cascade="all, delete-orphan")
    annotations = db.relationship('CompAnnotation', backref='composition', cascade="all, delete-orphan")
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'))
    collection_id = db.Column(db.Integer, db.ForeignKey('collection.id', ondelete='CASCADE'), nullable=True)
    contributors = db.relationship('Contributor', backref='composition', cascade="all, delete-orphan")
    opentocontrib = db.Column(db.Boolean, nullable=False, server_default='0')
    is_template = db.Column(db.Boolean, nullable=False, server_default='0')
    cloned_from = db.Column(db.String(22))

    def __repr__(self):
        return f'<Composition "{self.title}">'

class CompAnnotation(db.Model, SerializerMixin):

    serialize_rules = ('-composition', )

    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.String(22), nullable=False, unique=True, default=shortuuid.uuid())
    key = db.Column(db.String(100))
    value = db.Column(db.String(1024))
    composition_uid = db.Column(db.String(22), db.ForeignKey('composition.uuid', ondelete='CASCADE'))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    custom_added = db.Column(db.Boolean, nullable=False, server_default='0')

    def __repr__(self):
        return f'<CompAnnotation "{self.key}">'


class Track(db.Model, SerializerMixin):

    serialize_rules = ('-composition', )

    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.String(22), nullable=False, unique=True, default=shortuuid.uuid())
    title = db.Column(db.String(100))
    path = db.Column(db.String(1024))
    compress_path = db.Column(db.String(1024))
    needs_compress = db.Column(db.Boolean())
    is_audio_processed = db.Column(db.Boolean(), default=False, nullable=False)
    user_id = db.Column(db.Integer)
    user_uid = db.Column(db.String(22))
    composition_id = db.Column(db.Integer, db.ForeignKey('composition.id', ondelete='CASCADE'))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    annotations = db.relationship('TrackAnnotation', backref='track', cascade="all, delete-orphan")
    cloned_from = db.Column(db.String(22))
    file_metadata = db.Column(db.JSON)

    def __repr__(self):
        return f'<Track "{self.title}">'

class TrackAnnotation(db.Model, SerializerMixin):

    serialize_rules = ('-track', )

    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.String(22), nullable=False, unique=True, default=shortuuid.uuid())
    key = db.Column(db.String(100))
    value = db.Column(db.String(1024))
    track_uid = db.Column(db.String(22), db.ForeignKey('track.uuid', ondelete='CASCADE'))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    custom_added = db.Column(db.Boolean, nullable=False, server_default='0')

    def __repr__(self):
        return f'<TrackAnnotation "{self.key}">'


class Contributor(db.Model, SerializerMixin):

    serialize_rules = ('-composition', )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'))
    user_uid = db.Column(db.String(100))
    composition_id = db.Column(db.Integer, db.ForeignKey('composition.id', ondelete='CASCADE'))
    role = db.Column(Enum(UserRole), nullable=False, default=UserRole.none.value)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)

    def __repr__(self):
        return f'<Contributor "{self.user_id}">'

class VerificationCode(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    code = db.Column(db.String(6), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    attempts = db.Column(db.Integer, default=0, nullable=False)

class InvitationEmail(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    refusal_code = db.Column(db.String(100), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    attempts = db.Column(db.Integer, default=0, nullable=False)
    invited_by = db.Column(db.Integer)