from app import app, DB_FILE
from orm import db, Composition, Track, User, UserInfo, Contributor, UserRole, LevelPrivacy, Collection
import os
import shortuuid

with app.app_context():

    if DB_FILE is not None and os.path.exists(DB_FILE):
        print('The file exists')
        os.remove(DB_FILE)
    else:
        print('The file does not exist')       
    
    db.drop_all()
    db.create_all()

    user1 = User(uid="123456789")
    db.session.add(user1)

    user2 = User(uid="987654321")
    db.session.add(user2)

    db.session.commit()

    userinfo1 = UserInfo(user=user1, google_uid="123456789", google_name="Google User 1", google_profile_pic="https://lh3.googleusercontent.com/a/AEdFTp5F-T3LomGACzwOvVRbctIfx84OMUoNqZpLjq_-fg=s96-c", google_email="gilpanal+2@gmail.com", name="Super Admin", profile_pic="https://raw.githubusercontent.com/gilpanal/beatbytebot_webapp/master/src/img/agp.png")
    db.session.add(userinfo1)

    userinfo2 = UserInfo(user=user2, google_uid="987654321", google_name="Google User 2", google_profile_pic="https://lh3.googleusercontent.com/a/AGNmyxbgM4HGdV5vo3K20I8UtDU1gQqorx94Vn_0n3-5=s96-c", google_email="fandroide+2@gmail.com", name="Guest", profile_pic="https://raw.githubusercontent.com/gilpanal/beatbytebot_webapp/master/src/img/agp.png")
    db.session.add(userinfo2)

    db.session.commit()

    collection1 = Collection(title="Collection1", user=user1, privacy=LevelPrivacy.private, uuid=shortuuid.uuid())

    db.session.add(collection1)
    db.session.commit()

    collection2 = Collection(title="Collection2", user=user1, privacy=LevelPrivacy.private, uuid=shortuuid.uuid(), parent_id=collection1.id)

    db.session.add(collection2)
    db.session.commit()

    comp_uuid = shortuuid.uuid()
    composition1 = Composition(title="ADASP", user=user1, privacy=LevelPrivacy.private, opentocontrib=0, uuid=comp_uuid, collection=collection1, latency=0)

    db.session.add(composition1)
    db.session.commit()

    track1 = Track(title="Acoustic", path=f"compositions/{composition1.id}/acoustic_1-mastered.mp3", composition=composition1, user_id=user1.id, uuid=shortuuid.uuid(), latency=0)
    track2 = Track(title="Methronome", path=f"compositions/{composition1.id}/methronome_110.mp3", composition=composition1, user_id=user1.id, uuid=shortuuid.uuid(), latency=0)

    db.session.add_all({track1, track2})
    db.session.commit()

    contributor1 = Contributor(role=UserRole.guest, user_id=user2.id, user_uid=user2.uid, composition=composition1)
    db.session.add(contributor1)
    db.session.commit()