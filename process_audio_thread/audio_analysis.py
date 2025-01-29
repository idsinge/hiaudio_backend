import json
import numpy as np
import essentia
import essentia.streaming as ess
import essentia.standard as es
from six.moves import urllib
from essentia.standard import TensorflowPredictVGGish, TensorflowPredictMusiCNN, TensorflowPredict2D
from dotenv import load_dotenv

# Load .env file
load_dotenv()
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

ACOUSTIC_ID_API_KEY = os.environ.get("ACOUSTIC_ID_API_KEY")

# Hide logging messages from Essentia
essentia.log.infoActive = False

def tellifisspeech(audio_sr16):
    predictions = TensorflowPredictVGGish(graphFilename='models/genre_rosamerica-vggish-audioset-1.pb')(audio_sr16)
    predictions = np.mean(predictions, axis=0)
    if isinstance(predictions,np.ndarray):
        return predictions[7]*100
    else:
        return 0
    
def checkifpercurssion(audio_sr16):
    msd_labels = ['bass', 'chords', 'fx', 'melody', 'percussion']
    embedding_model = TensorflowPredictMusiCNN(graphFilename='models/msd-musicnn-1.pb', output="model/dense/BiasAdd")
    embeddings = embedding_model(audio_sr16)
    if not len(embeddings):
        return False
    else:
        model = TensorflowPredict2D(graphFilename="models/fs_loop_ds-msd-musicnn-1.pb", input="serving_default_model_Placeholder", output="PartitionedCall")
        predictions = model(embeddings)
        top_n = 1

        # The shape of the predictions matrix is [n_patches, n_labels]
        # Take advantage of NumPy to average them over the time axis
        averaged_predictions = np.mean(predictions, axis=0)

        # Sort the predictions and get the top N
        for i, l in enumerate(averaged_predictions.argsort()[-top_n:][::-1], 1):
            inst_role = msd_labels[l]
            if inst_role == 'percussion': 
                return True
            else:
                return False

def getkeyandscale(fullpath):
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
    
    return pool['tonal.key_key'], pool['tonal.key_scale']

def get_first_artist_and_title(data):

    if not data.get("results") or len(data["results"]) == 0:
        return None

    recordings = data["results"][0].get("recordings", [])
    
    for recording in recordings:
        artists = recording.get("artists", [])
        title = recording.get("title")     
        
        if artists and title:
            return {
                "artist_name": artists[0].get("name"),
                "title": title
            }
            
    return None

def getbpmtempo(audio_sr44):
    rhythm_extractor = es.RhythmExtractor2013(method="multifeature")
    bpm_info = rhythm_extractor(audio_sr44)
    return round(bpm_info[0])

def checkifcopyright(audio_sr44, samplerate):   
    
    if not ACOUSTIC_ID_API_KEY:
        print('an API key needs to be set')
        return None
    else:
        client = ACOUSTIC_ID_API_KEY
        fingerprint = es.Chromaprinter()(audio_sr44)
        duration = len(audio_sr44) / samplerate 
        # TODO: avoid making a request to acousticid service if we know the size does not fit by:
        # if len(fingerprint) <= 7958:
        # TODO: check the correct value instead of 7958
        # Composing a query asking for the fields: recordings, releasegroups and compress.
        query = 'http://api.acoustid.org/v2/lookup?client=%s&meta=recordings+releasegroups+compress&duration=%i&fingerprint=%s' \
        %(client, duration, fingerprint)
        try:
            page = urllib.request.urlopen(query)
            string = page.read().decode('utf-8')
            json_obj = json.loads(string)
            return json_obj
        except Exception as e:
            return None