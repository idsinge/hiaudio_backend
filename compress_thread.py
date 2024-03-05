import time
import datetime
from queue import Empty, Queue
from threading import Thread
from app import app
from orm import db, Track
from sqlalchemy import event
import os
from pydub import AudioSegment
import config

def processfile(item):
    track = db.session.get(Track, item.id)
    needs_compress = item.needs_compress
    if item.needs_compress is None:                                  
        needs_compress = item.path.lower().endswith(('.wav', '.flac'))
        setattr(track, "needs_compress", bool(needs_compress))
        db.session.commit()
    if needs_compress:
        fullpath = os.path.join(config.DATA_BASEDIR, track.path )
        compress_path = os.path.splitext(track.path)[0]+".m4a"
        compressfullpath = os.path.join(config.DATA_BASEDIR, compress_path )
        audio = AudioSegment.from_file(fullpath)                           
        audio.export(compressfullpath, format="ipod", bitrate="128k")
        setattr(track, "compress_path", compress_path)
        db.session.commit()

def producer(queue, tracks):    
    for i in tracks:              
        queue.put(i)

def consumer(queue):
    with app.app_context():
        while True:
            try:
                item = queue.get()
            except Empty:
                continue
            else:
                print(f'Processing item {item}', datetime.datetime.now())
                processfile(item)                
                queue.task_done()
                if queue.qsize() == 0:
                    print('Finish with the queue', datetime.datetime.now())


def main():
    with app.app_context():
        tracks = Track.query.filter(((Track.needs_compress == True) | (Track.needs_compress.is_(None))) & (Track.compress_path.is_(None))).all()   
    if(len(tracks)):
        print("we have the tracks", len(tracks))
    
    queue = Queue()

    producer_thread = Thread(
        target=producer,
        args=(queue,tracks)
    )
    producer_thread.start()
    
    consumer_thread = Thread(
        target=consumer,
        args=(queue,),
        daemon=True
    )
    consumer_thread.start()

    # wait for all tasks to be added to the queue
    producer_thread.join()

    # wait for all tasks on the queue to be completed
    queue.join()

    while True:
        time.sleep(10)
        if queue.qsize() == 0:            
            main()

print('Start Compression process', datetime.datetime.now())
main()