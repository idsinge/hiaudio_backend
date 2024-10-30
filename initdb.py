from app import app, DB_FILE
from orm import db, Composition, Track, User, UserInfo, Contributor, UserRole, LevelPrivacy, Collection, CompAnnotation, TrackAnnotation
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

    user1 = User(uid="123456789", terms_accepted=True)
    db.session.add(user1)

    user2 = User(uid="987654321", terms_accepted=True)
    db.session.add(user2)

    db.session.commit()

    userinfo1 = UserInfo(user=user1, user_uid="123456789", user_email="gilpanal+2@gmail.com", name="Super Admin", profile_pic="https://raw.githubusercontent.com/gilpanal/beatbytebot_webapp/master/src/img/agp.png")
    db.session.add(userinfo1)

    userinfo2 = UserInfo(user=user2, user_uid="987654321", user_email="fandroide+2@gmail.com", name="Guest", profile_pic="https://raw.githubusercontent.com/gilpanal/beatbytebot_webapp/master/src/img/agp.png")
    db.session.add(userinfo2)

    db.session.commit()

    collection1 = Collection(title="Collection1", description="Description of the Coll 1", user=user1, privacy=LevelPrivacy.private, uuid=shortuuid.uuid())

    db.session.add(collection1)
    db.session.commit()

    collection2 = Collection(title="Collection2", user=user1, privacy=LevelPrivacy.private, uuid=shortuuid.uuid(), parent_id=collection1.id)

    db.session.add(collection2)
    db.session.commit()

    comp_uuid_1 = shortuuid.uuid()
    composition1 = Composition(title="ADASP", description="", user=user1, privacy=LevelPrivacy.private, opentocontrib=0, uuid=comp_uuid_1, collection=collection1, is_template=True)

    compannotation1 = CompAnnotation(key="bpm", value="120", composition=composition1, uuid=shortuuid.uuid())

    db.session.add_all({composition1, compannotation1})
    db.session.commit()

    track1 = Track(title="Acoustic", path=f"compositions/{composition1.id}/acoustic_1-mastered.mp3", composition=composition1, user_id=user1.id, user_uid=user1.uid, uuid=shortuuid.uuid())
    track2 = Track(title="Methronome", path=f"compositions/{composition1.id}/methronome_110.mp3", composition=composition1, user_id=user1.id, user_uid=user1.uid, uuid=shortuuid.uuid())

    track1annotation1 = TrackAnnotation(key="performer", value="IDS", track=track1, uuid=shortuuid.uuid())
    track2annotation1 = TrackAnnotation(key="recorded_at", value="5th floor", track=track2, uuid=shortuuid.uuid())
    track2annotation2 = TrackAnnotation(key="comment", value="recorded using shure", track=track2, uuid=shortuuid.uuid())

    db.session.add_all({track1, track2, track1annotation1, track2annotation1, track2annotation2})
    db.session.commit()

    contributor1 = Contributor(role=UserRole.guest, user_id=user2.id, user_uid=user2.uid, composition=composition1)
    db.session.add(contributor1)
    db.session.commit()

    comp_uuid_2 = shortuuid.uuid()
    composition2 = Composition(title="Clone ADASP", description="clone adasp", user=user2, privacy=LevelPrivacy.private, opentocontrib=0, uuid=comp_uuid_2, collection=collection1, cloned_from=composition1.uuid)
    db.session.add(composition2)
    db.session.commit()

    track3 = Track(title="Acoustic clone", path=f"compositions/{composition1.id}/acoustic_1-mastered.mp3", composition=composition2,  user_id=user2.id, user_uid=user2.uid, uuid=shortuuid.uuid(), cloned_from=track1.uuid)
    db.session.add(track3)
    db.session.commit()