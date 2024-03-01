import time
from queue import Empty, Queue
from threading import Thread
from app import app
from orm import db, Track
from sqlalchemy import event
import os
from pydub import AudioSegment
import config

# Define the event listener function
#def after_insert_listener(mapper, connection, target):
#    print(f"New entry added to {target.__class__.__name__}, ID: {target.id}")

# Attach the event listener to the after_insert event
#@event.listen(Track, 'after_insert', after_insert_listener)

def processfile(item):
    track = db.session.get(Track, item.id)    
    if item.needs_compress is None:                                  
        needs_compress = item.path.lower().endswith(('.wav', '.flac'))
        setattr(track, "needs_compress", bool(needs_compress))
        db.session.commit()
    fullpath = os.path.join(config.DATA_BASEDIR, track.path )
    compress_path = os.path.splitext(track.path)[0]+".mp3"
    compressfullpath = os.path.join(config.DATA_BASEDIR, compress_path )
    audio = AudioSegment.from_file(fullpath)                           
    audio.export(compressfullpath, format="mp3")
    setattr(track, "compress_path", compress_path)
    db.session.commit()

def producer(queue, tracks):    
    for i in tracks:
        #print(f'Inserting item {i} into the queue')        
        queue.put(i)

def consumer(queue):
    with app.app_context():
        while True:
            try:
                item = queue.get()
            except Empty:
                continue
            else:
                #print(f'Processing item {item}')
                processfile(item)                
                queue.task_done()
                #print('Current queue size', queue.qsize())


def main():
    with app.app_context():
        tracks = Track.query.filter(((Track.needs_compress == True) | (Track.needs_compress.is_(None))) & (Track.compress_path.is_(None))).all()   
       
    #print("we have the tracks", len(tracks))
    queue = Queue()

    # create a producer thread and start it
    producer_thread = Thread(
        target=producer,
        args=(queue,tracks)
    )
    producer_thread.start()

    # create a consumer thread and start it
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
            #print('Start process again')
            main()


main()

   
#if __name__ == '__main__':
    #main()