#!/usr/bin/env bash
# Étape 2 · récupère la voix ElevenLabs et la minute.
# Usage : bash etapes/02-voix.sh <dossier projet> "<url ElevenLabs ou fichier local>" <fichier texte-voix.txt>
# Produit dans <projet>/assets/audio/ : voix.mp3, mots.json (mot, début, fin, confiance), silences.txt, duree.txt
# Le texte voix peut contenir les balises [sighs] etc. : elles sont retirées pour guider la transcription.
set -euo pipefail
P="${1:?projet}"; URL="${2:?url}"; TXT="${3:?texte}"
A="$P/assets/audio"; mkdir -p "$A"
if [ -f "$URL" ]; then cp "$URL" "$A/voix.mp3"; else curl -sSfL -o "$A/voix.mp3" "$URL" || { echo "ÉCHEC téléchargement voix (domaine bloqué ?)"; exit 2; }; fi
ffmpeg -v error -y -i "$A/voix.mp3" -ar 16000 -ac 1 "$A/audio.wav"
ffprobe -v error -show_entries format=duration -of csv=p=0 "$A/voix.mp3" | tee "$A/duree.txt"
sed -E 's/\[[^]]*\]//g; s/  +/ /g' "$TXT" > "$A/texte-sans-balises.txt"
python3 -I "$(dirname "$0")/../outils/transcribe.py" "$HOME/whisper-small" "$A/audio.wav" "$A/mots.json" "$A/texte-sans-balises.txt" > "$A/mots.txt"
ffmpeg -v info -i "$A/voix.mp3" -af silencedetect=noise=-38dB:d=0.12 -f null - 2>&1 | grep -o 'silence_[a-z]*: [0-9.]*' > "$A/silences.txt" || true
echo "OK · $(wc -l < "$A/mots.txt") mots ; durée $(cat "$A/duree.txt") s ; voir mots.txt et silences.txt"
