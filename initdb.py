from app import app, DB_FILE
from orm import db, Composition, Track, User
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
    db.session.commit()

    composition1 = Composition(title="ADASP", user=user1)

    db.session.add(composition1)
    db.session.commit()



    track1 = Track(title="Acoustic", path=f"compositions/{composition1.id}/acoustic_1-mastered.mp3", composition=composition1)
    track2 = Track(title="Methronome", path=f"compositions/{composition1.id}/methronome_110.mp3", composition=composition1)
    db.session.add_all({track1, track2})
    db.session.commit()
