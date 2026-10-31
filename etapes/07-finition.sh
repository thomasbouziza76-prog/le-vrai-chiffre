#!/usr/bin/env bash
# Étape 7 bis · finition « film » commune à toutes les vidéos (identité de la chaîne) :
# grain de papier animé très léger + vignettage doux. Ne touche pas au son.
# Usage : bash etapes/07-finition.sh <dossier projet>   (renders/video.mp4 -> renders/video.mp4, l'original gardé en video-brut.mp4)
set -euo pipefail
P="${1:?projet}"; V="$P/renders/video.mp4"; B="$P/renders/video-brut.mp4"
[ -s "$V" ] || { echo "pas de $V"; exit 1; }
mv "$V" "$B"
ffmpeg -v error -y -i "$B" -vf "noise=c0s=7:c0f=t+u:c1s=3:c1f=t+u:c2s=3:c2f=t+u,vignette=angle=0.20:mode=forward,format=yuv420p" \
  -c:v libx264 -preset slow -crf 16 -c:a copy -movflags +faststart "$V"
echo "OK · finition appliquée ($V) ; original : $B"
