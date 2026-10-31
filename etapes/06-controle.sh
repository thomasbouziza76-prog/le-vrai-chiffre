#!/usr/bin/env bash
# Étape 6 · contrôles du rendu. Usage : bash etapes/06-controle.sh <dossier projet>   (lit renders/video.mp4)
# Sortie courte : à lire en entier. La planche (boards/planche.jpg, une image / 0,5 s) est la SEULE image à regarder.
set -uo pipefail
P="${1:?projet}"; V="$P/renders/video.mp4"; [ -s "$V" ] || { echo "pas de $V"; exit 1; }
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$V"); VO=$(cat "$P/assets/audio/duree.txt" 2>/dev/null || echo "?")
echo "durée vidéo $D s · voix $VO s"
E=$(ffmpeg -v error -i "$V" -f null - 2>&1 | head -3); echo "erreurs décodage : ${E:-aucune}"
echo "noirs :"; ffmpeg -v info -i "$V" -vf blackdetect=d=0.2:pix_th=0.08 -an -f null - 2>&1 | grep -o 'black_start:[0-9.]* black_end:[0-9.]*' || echo "  aucun"
echo "images figées (>0,6 s) :"; ffmpeg -v info -i "$V" -vf freezedetect=n=0.002:d=0.6 -an -f null - 2>&1 | grep -o 'freeze_start: [0-9.]*\|freeze_end: [0-9.]*' | paste - - || echo "  aucune"
echo "son :"; ffmpeg -v info -i "$V" -af ebur128=peak=true -f null - 2>&1 | grep -E '^\s+(I:|Peak:)' | tail -2
mkdir -p "$P/boards"; ffmpeg -v error -y -i "$V" -vf "fps=2,scale=144:256,tile=15x6" -frames:v 1 -q:v 4 "$P/boards/planche.jpg" && echo "planche : $P/boards/planche.jpg"
