#!/usr/bin/env bash
# Atelier · rend UNE couverture sans toucher à la vidéo. Usage : bash etapes/10-couverture-seule.sh <couverture.html> <dossier de sortie> <numéro, ex. 09>
# Sorties : N<xx>-couv.png (1080×1920), N<xx>-couv.jpg (1080×1920 qualité 90, pour le QG), N<xx>-vignette.jpg (270 px, à REGARDER),
#           N<xx>-grille.jpg (la couverture coupée comme dans la grille du profil TikTok, à REGARDER aussi)
set -euo pipefail
H="${1:?couverture.html}"; O="${2:?sortie}"; N="${3:?numero}"
mkdir -p "$O"; cp "${LVC_REPO:-/home/claude/le-vrai-chiffre}"/polices/*.woff2 "$(dirname "$H")/" 2>/dev/null || true
python3 - "$H" "$O" "$N" <<'PY'
import sys, os
from playwright.sync_api import sync_playwright
from PIL import Image
h, out, n = sys.argv[1:4]
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1080, "height": 1920})
    pg.goto("file://" + os.path.abspath(h)); pg.wait_for_timeout(900); pg.screenshot(path=f"{out}/N{n}-couv.png"); b.close()
im = Image.open(f"{out}/N{n}-couv.png").convert("RGB")
im.convert("RGB").save(f"{out}/N{n}-couv.jpg", quality=90)
im.resize((270, 480)).save(f"{out}/N{n}-vignette.jpg", quality=85)
# grille du profil : TikTok montre environ la zone y 240 à 1680 en vignette 3:4
im.crop((0, 240, 1080, 1680)).resize((270, 360)).save(f"{out}/N{n}-grille.jpg", quality=85)
print("couverture →", out)
PY
