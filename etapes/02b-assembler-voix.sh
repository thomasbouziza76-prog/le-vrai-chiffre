#!/usr/bin/env bash
# Étape 2 bis · assemble une voix générée EN MORCEAUX (méthode validée par Thomas le 03/11, N°10 : la voix garde son peps).
# Usage : bash etapes/02b-assembler-voix.sh <sortie.mp3> <morceau1.mp3|url> <morceau2.mp3|url> ...
# Chaque morceau est ramené au même volume (-16 LUFS), puis ils sont collés avec 0,35 s de silence entre eux.
# Ensuite : bash etapes/02-voix.sh $P <sortie.mp3> <texte-voix.txt> (le fichier local est accepté).
set -euo pipefail
OUT="${1:?sortie.mp3}"; shift; [ $# -ge 2 ] || { echo "il faut au moins 2 morceaux"; exit 1; }
T=$(mktemp -d); i=0; LISTE="$T/liste.txt"; : > "$LISTE"
ffmpeg -v error -y -f lavfi -i anullsrc=r=44100:cl=mono -t 0.35 -c:a pcm_s16le "$T/pause.wav"
for M in "$@"; do i=$((i+1))
  if [ -f "$M" ]; then cp "$M" "$T/m$i.src"; else curl -sSfL -o "$T/m$i.src" "$M" || { echo "ÉCHEC téléchargement morceau $i"; exit 2; }; fi
  ffmpeg -v error -y -i "$T/m$i.src" -af "loudnorm=I=-16:TP=-1.5:LRA=11,aresample=44100" -ac 1 -c:a pcm_s16le "$T/m$i.wav"
  [ $i -gt 1 ] && echo "file '$T/pause.wav'" >> "$LISTE"; echo "file '$T/m$i.wav'" >> "$LISTE"
done
ffmpeg -v error -y -f concat -safe 0 -i "$LISTE" -c:a libmp3lame -b:a 192k "$OUT"
echo "OK · $i morceaux → $OUT ($(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT") s)"; rm -rf "$T"
