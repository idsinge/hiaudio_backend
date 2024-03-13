import time
import logging
import datetime
from queue import Empty, Queue
from threading import Thread
from app import app
from orm import db, Track
import os
from pydub import AudioSegment
import config
import signal


logging.basicConfig(filename='compression_logfile.log', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class SignalHandler:
    shutdown_requested = False

    def __init__(self):
        signal.signal(signal.SIGINT, self.request_shutdown)
        signal.signal(signal.SIGTERM, self.request_shutdown)

    def request_shutdown(self, *args):
        logging.info('Request to shutdown received, stopping')
        print('Request to shutdown received')
        self.shutdown_requested = True

    def can_run(self):
        return not self.shutdown_requested

signal_handler = SignalHandler()

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

def getpendingtracks(queue):    
    with app.app_context():
        tracks = Track.query.filter(((Track.needs_compress == True) | (Track.needs_compress.is_(None))) & (Track.compress_path.is_(None))).all()
    if(len(tracks)):        
        logging.info("we have " + f"{len(tracks)}" + " tracks")
        for i in tracks:              
            queue.put(i)

def consumer(queue):
    with app.app_context():
        while True:
            try:
                item = queue.get(block=True, timeout=10)
            except Empty:
                getpendingtracks(queue)                
            else:
                logging.info(f'Processing item {item}, ' + f'{datetime.datetime.now()}' )
                processfile(item)                  
                queue.task_done()
                if queue.qsize() == 0:
                    logging.info('Finish with the queue ' + f"{datetime.datetime.now()}")


def main():
    
    queue = Queue()
    
    consumer_thread = Thread(
        target=consumer,
        args=(queue,),
        daemon=True
    )
    consumer_thread.start()

    # wait for all tasks on the queue to be completed
    queue.join()

    while signal_handler.can_run():
        continue

logging.info('Start Compression process ' +  f"{datetime.datetime.now()}")
main()