"""Alignement mot à mot WhisperX (CPU), en option de moteur/timing.py (--whisperx). Repris du pilote Non Classée NC-001.
Transcription faster-whisper (modèle local ~/whisper-small) + alignement forcé wav2vec2 français (VoxPopuli, déjà en cache
dans ~/.cache/torch). Environ 1 à 2 min pour 80 s de voix. Aucun téléchargement si les modèles sont en cache.
  PYTHON_WHISPERX moteur/outils/aligne_whisperx.py VOIX.mp3 SORTIE.json [--modele DOSSIER]
Sortie : [{"w": mot, "s": début, "e": fin}, …] — même format que mots.json de timing.py."""
import sys, os, json, time
voix, sortie = sys.argv[1], sys.argv[2]
modele = sys.argv[sys.argv.index('--modele') + 1] if '--modele' in sys.argv else os.path.expanduser('~/whisper-small')
import whisperx
t0 = time.time()
audio = whisperx.load_audio(voix)
m = whisperx.load_model(modele, device='cpu', compute_type='int8', language='fr')
res = m.transcribe(audio, batch_size=4, language='fr')
am, meta = whisperx.load_align_model(language_code='fr', device='cpu')
al = whisperx.align(res['segments'], am, meta, audio, 'cpu', return_char_alignments=False)
W = []
for s in al['segments']:
    for w in s.get('words', []):
        W.append({'w': w['word'].strip(), 's': w.get('start'), 'e': w.get('end')})
# mots sans temps (nombres, sigles que wav2vec2 n'aligne pas) : bornés par leurs voisins
for i, w in enumerate(W):
    if w['s'] is None:
        a = next((W[k]['e'] for k in range(i - 1, -1, -1) if W[k]['e'] is not None), 0.0)
        b = next((W[k]['s'] for k in range(i + 1, len(W)) if W[k]['s'] is not None), a + 0.3)
        w['s'], w['e'] = a, max(a, b)
    w['s'], w['e'] = round(w['s'], 2), round(w['e'] if w['e'] is not None else w['s'] + 0.2, 2)
json.dump(W, open(sortie, 'w'), ensure_ascii=False)
print('WhisperX : %d mots alignés en %.0f s' % (len(W), time.time() - t0))
