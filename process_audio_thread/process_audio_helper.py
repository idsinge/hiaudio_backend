from sqlalchemy import exc
import logging

from pydub.utils import mediainfo

from audio_analysis import tellifisspeech, getbpmtempo, checkifpercurssion, checkifcopyright, get_first_artist_and_title, getkeyandscale, tellifsilence

logging.basicConfig(filename='processed_audio_logfile.log', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

import sys
import os
from orm import db, Track
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import config
from api.annotation import handle_new_track_annotation
from instrument_recognition import make_instrument_pred, getaudioexcerpt
from annotation_utils import convertmetadata, LOWER_SPEECH_PRED_SCORE, THRESHOLD_SPEECH_PRED_SCORE

def process_audio_file(track, item):    
    try:
        originalpath = os.path.join(config.DATA_BASEDIR, track.path)
        metadata = mediainfo(originalpath)
        metadata.pop("filename", None)       
        converted_metadata = convertmetadata(metadata)
        
        is_silence, rms_db = tellifsilence(originalpath)
        metadata["RMS"] ='{0:.2f} dB'.format(rms_db)
        if is_silence:
            handlegenerictrackannotation('is_silence', str(is_silence).lower(), track.uuid)        
        else:           
            is_speech_pred = tellifisspeech(originalpath)
            handlegenerictrackannotation('is_human_voice_score', '{0:.2f}%'.format(is_speech_pred), track.uuid)
            
            if is_speech_pred < THRESHOLD_SPEECH_PRED_SCORE:
                is_copyrighted, fingerprint = iscopyrightedannotation(originalpath, track.uuid)
                if is_copyrighted:
                    metadata["fingerprint"] = fingerprint
                tempoannotation(originalpath, track.uuid)
                is_percussion = checkifpercurssion(originalpath)
                handlegenerictrackannotation('is_percurssion', str(is_percussion).lower(), track.uuid)            
                if not is_percussion:
                    tonalkeyscaleannotation(originalpath, track.uuid)
                if LOWER_SPEECH_PRED_SCORE <= is_speech_pred:
                    handlegenerictrackannotation('is_human_voice', str(True).lower(), track.uuid)
                
                # TODO: better way to check output from getaudioexcerpt
                processedpath =  getaudioexcerpt(originalpath)
                if processedpath is not None:
                    instrumentannotation(processedpath, track.uuid, is_speech_pred)
                  
            else:
                handlegenerictrackannotation('instrument', 'speech', track.uuid)

        setattr(track, 'file_metadata', converted_metadata)
        db.session.commit()
        set_track_as_processed(track)

    except Exception as e:
        set_track_as_processed(item)
        logging.info(f"{e}, " + f"{originalpath}")


def handlegenerictrackannotation(key_annot, value_annot, track_uuid):
    annot_json = {'key':key_annot, 'value':value_annot}
    result = handle_new_track_annotation(track_uuid, annot_json)
    # TODO: check if every annotation is successful

def tempoannotation(originalpath, track_uuid):
    bpm_tempo = getbpmtempo(originalpath)
    handlegenerictrackannotation('BPM', bpm_tempo, track_uuid)    

def iscopyrightedannotation(originalpath, track_uuid):
    is_copyrighted, fingerprint = checkifcopyright(originalpath)
    if is_copyrighted and len(is_copyrighted['results']) > 0:
        handlegenerictrackannotation('is_copyrighted_score', '{0:.2f}%'.format(is_copyrighted['results'][0]['score']*100), track_uuid)
        recordings = is_copyrighted['results'][0].get('recordings')
        if recordings:
            artist_title =  get_first_artist_and_title(is_copyrighted)
            handlegenerictrackannotation('is_copyrighted_artist', artist_title.get('artist_name'), track_uuid)
            handlegenerictrackannotation('is_copyrighted_title', artist_title.get('title'), track_uuid)
    return is_copyrighted, fingerprint

def tonalkeyscaleannotation(filepath, track_uuid):
    key, scale = getkeyandscale(filepath)
    handlegenerictrackannotation('tonality_key', key, track_uuid)
    handlegenerictrackannotation('tonality_scale', scale, track_uuid)

def instrumentannotation(processedpath, track_uuid, is_speech_pred):
    instrum_label, instrum_score = make_instrument_pred(processedpath, is_speech_pred)
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