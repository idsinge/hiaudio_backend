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

    user1 = User(id="123456789", username="josema", name="Jose Ma", email="gilpanal+2@gmail.com", profile_pic="https://myserver.com/user+josema&profilepicture.jpg")
    db.session.add(user1)
    db.session.commit()

    song1 = Song(title="David & bunchofsongsbot", user=user1)

    db.session.add(song1)
    db.session.commit()



    track1 = Track(title="Never Too Much (Spen & Thommy's Club Anthem Mix)", path=f"songs/{song1.id}/file_2129", song=song1)
    track2 = Track(title="track2", path=f"songs/{song1.id}/file_2130", song=song1)
    track3 = Track(title="track3", path=f"songs/{song1.id}/file_2131", song=song1)

    db.session.add_all({track1, track2, track3})
    db.session.commit()
