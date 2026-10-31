# Usage : python3 -I transcribe.py <dossier modèle> <audio.wav 16 kHz mono> <sortie mots.json> [texte du script pour guider]
import sys, json, wave, numpy as np
from faster_whisper import WhisperModel
m = WhisperModel(sys.argv[1], device="cpu", compute_type="int8")
prompt = open(sys.argv[4], encoding="utf-8").read()[:800] if len(sys.argv) > 4 else None
with wave.open(sys.argv[2]) as w:
    audio = np.frombuffer(w.readframes(w.getnframes()), dtype="int16").astype("float32") / 32768.0
segs, _ = m.transcribe(audio, language="fr", word_timestamps=True, beam_size=5, initial_prompt=prompt, vad_filter=False)
out = [{"w": x.word.strip(), "s": round(x.start, 2), "e": round(x.end, 2), "p": round(x.probability, 2)} for s in segs for x in s.words]
json.dump(out, open(sys.argv[3], "w"), ensure_ascii=False, indent=0)
for o in out: print(f'{o["s"]:6.2f} {o["e"]:6.2f} {o["p"]:.2f} {o["w"]}')
