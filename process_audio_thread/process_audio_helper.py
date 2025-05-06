from sqlalchemy import exc
import logging
import essentia.standard as es

from pydub.utils import mediainfo

from audio_analysis import tellifisspeech, getbpmtempo, checkifpercurssion, checkifcopyright, get_first_artist_and_title, getkeyandscale, tellifsilence

logging.basicConfig(filename='processed_audio_logfile.log', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

import sys
import os
from orm import db, Track
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import config
from api.annotation import handle_new_track_annotation
from instrument_recognition import make_instrument_pred
from instrument_filtered_labels import percussion_instruments
from annotation_utils import convertmetadata

def process_audio_file(track, item):    
    try:
        fullpath = os.path.join(config.DATA_BASEDIR, track.path)
        metadata = mediainfo(fullpath)
        metadata.pop("filename", None)
        converted_metadata = convertmetadata(metadata)
        is_silence, rms_db = tellifsilence(fullpath)
        metadata["RMS"] ='{0:.2f} dB'.format(rms_db)
        if is_silence:
            handlegenerictrackannotation('is_silence', str(is_silence).lower(), track.uuid)      
        
        if not is_silence:        
            is_speech_pred = tellifisspeech(fullpath)
            handlegenerictrackannotation('is_speech_score', '{0:.2f}%'.format(is_speech_pred), track.uuid)
            if is_speech_pred < 50:
                is_copyrighted, fingerprint = iscopyrightedannotation(fullpath, track.uuid)
                if is_copyrighted:
                    metadata["fingerprint"] = fingerprint
                tempoannotation(fullpath, track.uuid)
                is_percussion = checkifpercurssion(fullpath)
                handlegenerictrackannotation('is_percurssion', str(is_percussion).lower(), track.uuid)            
                if not is_percussion:
                    tonalkeyscaleannotation(fullpath, track.uuid)
                if 1.8 <= is_speech_pred < 50:
                    handlegenerictrackannotation('instrument', 'voice', track.uuid)
                else:
                    instrumentannotation(fullpath, track.uuid, is_percussion)
                  
            else:
                handlegenerictrackannotation('instrument', 'speech', track.uuid)

        setattr(track, 'file_metadata', converted_metadata)
        db.session.commit()
        set_track_as_processed(track)

    except Exception as e:
        set_track_as_processed(item)
        logging.info(f"{e}, " + f"{fullpath}")


def handlegenerictrackannotation(key_annot, value_annot, track_uuid):
    annot_json = {'key':key_annot, 'value':value_annot}
    result = handle_new_track_annotation(track_uuid, annot_json)
    # TODO: check if every annotation is successful

def tempoannotation(fullpath, track_uuid):
    bpm_tempo = getbpmtempo(fullpath)
    handlegenerictrackannotation('BPM', bpm_tempo, track_uuid)    

def iscopyrightedannotation(fullpath, track_uuid):
    is_copyrighted, fingerprint = checkifcopyright(fullpath)
    if is_copyrighted and len(is_copyrighted['results']) > 0:
        handlegenerictrackannotation('is_copyrighted_score', '{0:.2f}%'.format(is_copyrighted['results'][0]['score']*100), track_uuid)
        recordings = is_copyrighted['results'][0].get('recordings')
        if recordings:
            artist_title =  get_first_artist_and_title(is_copyrighted)
            handlegenerictrackannotation('is_copyrighted_artist', artist_title.get('artist_name'), track_uuid)
            handlegenerictrackannotation('is_copyrighted_title', artist_title.get('title'), track_uuid)
    return is_copyrighted, fingerprint

def tonalkeyscaleannotation(fullpath, track_uuid):
    key, scale = getkeyandscale(fullpath)
    handlegenerictrackannotation('tonality_key', key, track_uuid)
    handlegenerictrackannotation('tonality_scale', scale, track_uuid)

def instrumentannotation(fullpath, track_uuid, is_percussion):
    instrum_label, instrum_score = make_instrument_pred(fullpath)
    if is_percussion and (instrum_label not in percussion_instruments):
        instrum_label = ''
        instrum_score = 0
    handlegenerictrackannotation('instrument', str(instrum_label).lower(), track_uuid)
    handlegenerictrackannotation('instrument_score', '{0:.2f}%'.format(instrum_score*100), track_uuid)
    

def set_track_as_processed(item):
    try:
        # Objective: check if track was deleted before was processed
        track = db.session.get(Track, item.id)
        if track is not None:
            setattr(track, "is_audio_processed", True)
            db.session.commit()
    except exc.SQLAlchemyError as e:
        db.session.rollback()
        logging.info(f"{type(e)}")