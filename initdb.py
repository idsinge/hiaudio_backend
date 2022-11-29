from app import app, DATA_BASEDIR, DB_FILE
from orm import db, Song, Track
import os

with app.app_context():

    os.remove(DB_FILE)
    db.create_all()

    song1 = Song(title="David & bunchofsongsbot")

    db.session.add(song1)
    db.session.commit()



    track1 = Track(title="Never Too Much (Spen & Thommy's Club Anthem Mix)", path=f"songs/{song1.id}/file_2129", song=song1)
    track2 = Track(title="track2", path=f"songs/{song1.id}/file_2130", song=song1)
    track3 = Track(title="track3", path=f"songs/{song1.id}/file_2131", song=song1)

    db.session.add_all({track1, track2, track3})
    db.session.commit()
