import os
from flask import Blueprint, jsonify, json
from flask_cors import cross_origin
from api.track import checktrackpermissions
import config
from tempfile import TemporaryDirectory
import essentia
import essentia.streaming as ess
import essentia.standard as es
from essentia.standard import MonoLoader, TensorflowPredictVGGish, TensorflowPredictEffnetDiscogs, TensorflowPredict2D
import numpy as np

signalproc = Blueprint('signalproc', __name__)

@signalproc.route('/analyzetrack/<string:uuid>')
@cross_origin()
def analyzetrack(uuid):

    isok, result = checktrackpermissions(uuid)
    
    if(isok):
        
        fullpath = os.path.join(config.DATA_BASEDIR, result.path)        
        features, features_frames = es.MusicExtractor()(fullpath)    
        temp_dir = TemporaryDirectory()
        results_file = temp_dir.name + '/results.json'

        es.YamlOutput(filename=results_file, format="json")(features)
        data = json.load(open(results_file))
       
        ret = {"ok": True, "features":data}
        return jsonify(ret)
    else:
        return result

@signalproc.route('/istrackspeech/<string:uuid>')
@cross_origin()
def istrackspeech(uuid):

    isok, result = checktrackpermissions(uuid)
    
    if(isok):
        fullpath = os.path.join(config.DATA_BASEDIR, result.path )
        # labels = ['classic', 'dance', 'hip hop', 'jazz', 'pop', 'rnb', 'rock', 'speech']
        sr = 16000
        audio = MonoLoader(filename=fullpath, sampleRate=sr)()
        predictions = TensorflowPredictVGGish(graphFilename='models/genre_rosamerica-vggish-audioset-1.pb')(audio)
        predictions = np.mean(predictions, axis=0)
        ret = {"ok": True, "speech_score":'{:.3f}'.format(predictions[7]*100)}
        return jsonify(ret)
    else:
        return result

@signalproc.route('/tracktempodetection/<string:uuid>')
@cross_origin()
def tracktempodetection(uuid):

    isok, result = checktrackpermissions(uuid)
    
    if(isok):  
        fullpath = os.path.join(config.DATA_BASEDIR, result.path )
        audio = es.MonoLoader(filename=fullpath)()
        rhythm_extractor = es.RhythmExtractor2013(method="multifeature")
        bpm_info = rhythm_extractor(audio)     
        ret = {"ok": True, "bpm":round(bpm_info[0])}       
        return jsonify(ret)
    else:
        return result

@signalproc.route('/tracktonality/<string:uuid>')
@cross_origin()
def tracktonality(uuid):

    isok, result = checktrackpermissions(uuid)
    
    if(isok):
        fullpath = os.path.join(config.DATA_BASEDIR, result.path )
        loader = ess.MonoLoader(filename=fullpath)
        framecutter = ess.FrameCutter(frameSize=4096, hopSize=2048, silentFrames='noise')
        windowing = ess.Windowing(type='blackmanharris62')
        spectrum = ess.Spectrum()
        spectralpeaks = ess.SpectralPeaks(orderBy='magnitude',
                                        magnitudeThreshold=0.00001,
                                        minFrequency=20,
                                        maxFrequency=3500,
                                        maxPeaks=60)

        # Use default HPCP parameters for plots.
        # However we will need higher resolution and custom parameters for better Key estimation.

        hpcp = ess.HPCP()
        hpcp_key = ess.HPCP(size=36, # We will need higher resolution for Key estimation.
                            referenceFrequency=440, # Assume tuning frequency is 44100.
                            bandPreset=False,
                            minFrequency=20,
                            maxFrequency=3500,
                            weightType='cosine',
                            nonLinear=False,
                            windowSize=1.)

        # key = ess.Key(profileType='edma', # Use profile for electronic music.
        key = ess.Key(numHarmonics=4,
                    pcpSize=36,
                    slope=0.6,
                    usePolyphony=True,
                    useThreeChords=True)

        # Use pool to store data.
        pool = essentia.Pool()

        # Connect streaming algorithms.
        loader.audio >> framecutter.signal
        framecutter.frame >> windowing.frame >> spectrum.frame
        spectrum.spectrum >> spectralpeaks.spectrum
        spectralpeaks.magnitudes >> hpcp.magnitudes
        spectralpeaks.frequencies >> hpcp.frequencies
        spectralpeaks.magnitudes >> hpcp_key.magnitudes
        spectralpeaks.frequencies >> hpcp_key.frequencies
        hpcp_key.hpcp >> key.pcp
        hpcp.hpcp >> (pool, 'tonal.hpcp')
        key.key >> (pool, 'tonal.key_key')
        key.scale >> (pool, 'tonal.key_scale')
        key.strength >> (pool, 'tonal.key_strength')

        # Run streaming network.
        essentia.run(loader)       
        ret = {"ok": True, "key":pool['tonal.key_key'], "scale":pool['tonal.key_scale']}       
        return jsonify(ret)
    else:
        return result

@signalproc.route('/guesstrackinstrument/<string:uuid>')
@cross_origin()
def guesstrackinstrument(uuid):

    isok, result = checktrackpermissions(uuid)
    
    if(isok):
        labels = ['accordion', 'acousticbassguitar', 'acousticguitar', 'bass', 'beat', 'bell', 'bongo', 'brass', 'cello', 'clarinet', 'classicalguitar', 'computer', 'doublebass', 'drummachine', 'drums', 'electricguitar', 'electricpiano', 'flute', 'guitar', 'harmonica', 'harp', 'horn', 'keyboard', 'oboe', 'orchestra', 'organ', 'pad', 'percussion', 'piano', 'pipeorgan', 'rhodes', 'sampler', 'saxophone', 'strings', 'synthesizer', 'trombone', 'trumpet', 'viola', 'violin', 'voice']
        fullpath = os.path.join(config.DATA_BASEDIR, result.path )
        audio = MonoLoader(filename=fullpath, sampleRate=16000, resampleQuality=4)()
        embedding_model = TensorflowPredictEffnetDiscogs(graphFilename="models/discogs-effnet-bs64-1.pb", output="PartitionedCall:1")
        embeddings = embedding_model(audio)

        model = TensorflowPredict2D(graphFilename="models/mtg_jamendo_instrument-discogs-effnet-1.pb")
        predictions = model(embeddings)
        # Average predictions over the time axis
        predictions = np.mean(predictions, axis=0)

        order = predictions.argsort()[::-1]
        ret = {'ok': True, 'instruments':{}}
        for i in order:
            # TODO: if the value 
            # print('{}: {:.3f}'.format(labels[i], predictions[i]))
            ret['instruments'][labels[i]] = '{:.3f}'.format(predictions[i])
        
        return jsonify(ret)
    else:
        return result