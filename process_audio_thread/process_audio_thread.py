import logging
import datetime
from queue import Empty, Queue
from threading import Thread
import signal

from process_audio_helper import process_audio_file

logging.basicConfig(filename='processed_audio_logfile.log', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

import sys
import os
from orm import db, Track

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import app

class SignalHandler:
    shutdown_requested = False

    def __init__(self, queue):
        self._queue = queue
        signal.signal(signal.SIGINT, self.request_shutdown)
        signal.signal(signal.SIGTERM, self.request_shutdown)

    def request_shutdown(self, *args):
        logging.info('Request to shutdown received, stopping')
        print('Request to shutdown received')
        self.shutdown_requested = True
        self._queue.put(None)

    def can_run(self):
        return not self.shutdown_requested

def processfile(item):
    with app.app_context():
        track = db.session.get(Track, item.id)
        if track is not None:
            is_processed = track.is_processed
            if is_processed is False:
               process_audio_file(track, item)

def getpendingtracks(queue):    
    with app.app_context():
        tracks = Track.query.filter((Track.is_processed == False)).all()
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
                if item is None:
                    return
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

    signal_handler = SignalHandler(queue)

    consumer_thread.join()

logging.info('Start Signal Processing process ' +  f"{datetime.datetime.now()}")
main()