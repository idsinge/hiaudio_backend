from app import app, DATA_BASEDIR, DB_FILE
from orm import db, Song, Track, User
import os

with app.app_context():

    if os.path.exists(DB_FILE):
        print('The file exists')
        os.remove(DB_FILE)
    else:
        print('The file does not exist')       
    
    db.create_all()

    user1 = User(id="123456789", username="superadmin", name="Super Admin", email="gilpanal+2@gmail.com", profile_pic="https://lh3.googleusercontent.com/a/AEdFTp5F-T3LomGACzwOvVRbctIfx84OMUoNqZpLjq_-fg=s96-c")
    db.session.add(user1)
    db.session.commit()

    song1 = Song(title="Live Together", user=user1)

    db.session.add(song1)
    db.session.commit()



    track1 = Track(title="Acoustic", path=f"songs/{song1.id}/acoustic_1-mastered.mp3", song=song1)
    track2 = Track(title="Methronome", path=f"songs/{song1.id}/methronome_110.mp3", song=song1)
    db.session.add_all({track1, track2})
    db.session.commit()
