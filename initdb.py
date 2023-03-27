from app import app, DB_FILE
from orm import db, Composition, Track, User, Contributor
import os

with app.app_context():

    if os.path.exists(DB_FILE):
        print('The file exists')
        os.remove(DB_FILE)
    else:
        print('The file does not exist')       
    
    db.create_all()

    user1 = User(id="123456789", name="Super Admin", email="gilpanal+2@gmail.com", profile_pic="https://lh3.googleusercontent.com/a/AEdFTp5F-T3LomGACzwOvVRbctIfx84OMUoNqZpLjq_-fg=s96-c")
    db.session.add(user1)

    user2 = User(id="987654321", name="Guest", email="fandroide+2@gmail.com", profile_pic="https://lh3.googleusercontent.com/a/AGNmyxbgM4HGdV5vo3K20I8UtDU1gQqorx94Vn_0n3-5=s96-c")
    db.session.add(user2)

    db.session.commit()

    composition1 = Composition(title="ADASP", user=user1, privacy=3)

    db.session.add(composition1)
    db.session.commit()

    track1 = Track(title="Acoustic", path=f"compositions/{composition1.id}/acoustic_1-mastered.mp3", composition=composition1, user_id=user1.id)
    track2 = Track(title="Methronome", path=f"compositions/{composition1.id}/methronome_110.mp3", composition=composition1, user_id=user1.id)

    db.session.add_all({track1, track2})
    db.session.commit()

    contributor1 = Contributor(role=4, user_id=user2.id, composition=composition1)
    db.session.add(contributor1)
    db.session.commit()