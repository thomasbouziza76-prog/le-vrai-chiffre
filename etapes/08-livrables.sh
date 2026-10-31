#!/usr/bin/env bash
# Étape 8 · prépare les livrables. Usage : bash etapes/08-livrables.sh <dossier projet> <numéro, ex. 05> <couverture.html>
# - capture la couverture HTML (1080×1920) en PNG + JPEG, avec une vignette 270 px à regarder
# - compresse la vidéo pour la vidéothèque (< 19 Mo)
# Sorties : <projet>/livrables/couverture.png, N<xx>.jpg, N<xx>.mp4, vignette.jpg
set -euo pipefail
P="${1:?projet}"; N="${2:?numero}"; H="${3:?couverture.html}"
L="$P/livrables"; mkdir -p "$L"; cp "$LVC_REPO"/polices/*.woff2 "$(dirname "$H")/" 2>/dev/null || true
python3 - "$H" "$L" "$N" <<'PY'
import sys, os
from playwright.sync_api import sync_playwright
from PIL import Image
h, out, n = sys.argv[1:4]
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1080, "height": 1920})
    pg.goto("file://" + os.path.abspath(h)); pg.wait_for_timeout(800); pg.screenshot(path=f"{out}/couverture.png"); b.close()
im = Image.open(f"{out}/couverture.png").convert("RGB")
im.save(f"{out}/N{n}.jpg", quality=88); im.resize((270, 480)).save(f"{out}/vignette.jpg", quality=85)
PY
ffmpeg -v error -y -i "$P/renders/video.mp4" -c:v libx264 -preset veryfast -crf 23 -c:a copy -movflags +faststart "$L/N$N.mp4"
S=$(stat -c%s "$L/N$N.mp4"); if [ "$S" -gt 19000000 ]; then ffmpeg -v error -y -i "$P/renders/video.mp4" -c:v libx264 -preset veryfast -crf 26 -c:a copy -movflags +faststart "$L/N$N.mp4"; fi
ls -la "$L"
