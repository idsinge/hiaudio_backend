import json
import numpy as np
import essentia
import essentia.streaming as ess
import essentia.standard as es
from six.moves import urllib
from essentia.standard import MonoLoader, TensorflowPredictVGGish, TensorflowPredictMusiCNN, TensorflowPredict2D, TensorflowPredictEffnetDiscogs
from dotenv import load_dotenv

# Load .env file
load_dotenv()
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

ACOUSTIC_ID_API_KEY = os.environ.get("ACOUSTIC_ID_API_KEY")
sr_16 = 16000
sr_44 = 44100

# Hide logging messages from Essentia
essentia.log.infoActive = False

model_genre_rosamerica = TensorflowPredictVGGish(graphFilename='models/genre_rosamerica-vggish-audioset-1.pb')
model_msd_musicnn = TensorflowPredictMusiCNN(graphFilename='models/msd-musicnn-1.pb', output="model/dense/BiasAdd")
model_fs_loop_ds_msd = TensorflowPredict2D(graphFilename="models/fs_loop_ds-msd-musicnn-1.pb", input="serving_default_model_Placeholder", output="PartitionedCall")

def tellifsilence(fullpath):
    audio_loader = MonoLoader()
    audio_loader.configure(filename=fullpath)
    audio = audio_loader()
    rms = es.RMS()(audio)
    rms_db = 20 * np.log10(rms + 1e-10) # Add small epsilon to avoid log(0)
    # Check if the RMS value is below the threshold
    #if rms < 0.01:
    # Other possible value : -40 dB
    if rms_db < -38:
        return True, rms_db
    else:
        return False, rms_db

def tellifisspeech(fullpath):
    audio_sr16_loader = MonoLoader()
    audio_sr16_loader.configure(filename=fullpath, sampleRate=sr_16, resampleQuality=4)
    audio_sr16 = audio_sr16_loader()
    predictions = model_genre_rosamerica(audio_sr16)
    predictions = np.mean(predictions, axis=0)
    if isinstance(predictions,np.ndarray):
        return predictions[7]*100
    else:
        return 0
    
def checkifpercurssion(fullpath):
    audio_sr16_loader = MonoLoader()
    audio_sr16_loader.configure(filename=fullpath, sampleRate=sr_16, resampleQuality=4)
    audio_sr16 = audio_sr16_loader()
    msd_labels = ['bass', 'chords', 'fx', 'melody', 'percussion']
    embeddings = model_msd_musicnn(audio_sr16)
    if not len(embeddings):
        return False
    else:
        predictions = model_fs_loop_ds_msd(embeddings)
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

def getbpmtempo(fullpath):
    audio_sr44_loader = MonoLoader()
    audio_sr44_loader.configure(filename=fullpath, sampleRate=sr_44)
    audio_sr44 = audio_sr44_loader()
    rhythm_extractor = es.RhythmExtractor2013(method="multifeature")
    bpm_info = rhythm_extractor(audio_sr44)
    return round(bpm_info[0])

def checkifcopyright(fullpath):   
    
    if not ACOUSTIC_ID_API_KEY:
        print('an API key needs to be set')
        return None
    else:
        audio_sr44_loader = MonoLoader()
        audio_sr44_loader.configure(filename=fullpath, sampleRate=sr_44)
        audio_sr44 = audio_sr44_loader()
        client = ACOUSTIC_ID_API_KEY
        fingerprint = es.Chromaprinter()(audio_sr44)
        duration = len(audio_sr44) / sr_44 
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

def guessmusicalinstrument(fullpath):
    
    audio = MonoLoader(filename=fullpath, sampleRate=16000, resampleQuality=4)()
    embedding_model = TensorflowPredictEffnetDiscogs(graphFilename="models/discogs-effnet-bs64-1.pb", output="PartitionedCall:1")
    embeddings = embedding_model(audio)

    # OPTION 1: fails with guitar
    #labels = ['accordion', 'acousticbassguitar', 'acousticguitar', 'bass', 'beat', 'bell', 'bongo', 'brass', 'cello', 'clarinet', 'classicalguitar', 'computer', 'doublebass', 'drummachine', 'drums', 'electricguitar', 'electricpiano', 'flute', 'guitar', 'harmonica', 'harp', 'horn', 'keyboard', 'oboe', 'orchestra', 'organ', 'pad', 'percussion', 'piano', 'pipeorgan', 'rhodes', 'sampler', 'saxophone', 'strings', 'synthesizer', 'trombone', 'trumpet', 'viola', 'violin', 'voice']
    #model = TensorflowPredict2D(graphFilename="models/mtg_jamendo_instrument-discogs-effnet-1.pb")

    # OPTION 2: fails with flute
    labels = ['mallet', 'string', 'reed', 'guitar', 'synth_lead', 'vocal', 'bass', 'flute', 'keyboard', 'brass', 'organ']
    model = TensorflowPredict2D(graphFilename="models/nsynth_instrument-discogs-effnet-1.pb", output="model/Softmax")
    predictions = model(embeddings)
    # Average predictions over the time axis
    predictions = np.mean(predictions, axis=0)

    max_index = np.argmax(predictions)
    # Get the label and the maximum value formatted to three decimal places
    max_label = labels[max_index]
    max_value = predictions[max_index]
    formatted_max_value = float('{:.3f}'.format(max_value))

    # Return the label with the highest value
    result = {max_label: formatted_max_value}
    # order = predictions.argsort()[::-1]
    # ret = {"instruments":{}}
    # for i in order:
    #     # TODO: if the value 
    #     # print('{}: {:.3f}'.format(labels[i], predictions[i]))
    #     ret["instruments"][labels[i]] = '{:.3f}'.format(predictions[i])
    print(result)
    return max_label