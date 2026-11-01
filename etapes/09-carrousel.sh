#!/usr/bin/env bash
# Étape 8 ter · carrousel. Usage : bash etapes/09-carrousel.sh <carrousel.html> <dossier de sortie> <numéro, ex. 06>
# Le HTML contient des <section class="slide"> de 1080×1350 (format 4:5, accepté par Instagram ET TikTok mode photo).
# Sorties : C<xx>-01.png… (une image par slide) + C<xx>-planche.jpg (planche à REGARDER avant de livrer).
set -euo pipefail
H="${1:?carrousel.html}"; O="${2:?sortie}"; N="${3:?numero}"
mkdir -p "$O"; cp "$LVC_REPO"/polices/*.woff2 "$(dirname "$H")/" 2>/dev/null || true
python3 - "$H" "$O" "$N" <<'PY'
import sys, os
from playwright.sync_api import sync_playwright
from PIL import Image
h, out, n = sys.argv[1:4]; files = []
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1080, "height": 1350})
    pg.goto("file://" + os.path.abspath(h)); pg.wait_for_timeout(800)
    for i, el in enumerate(pg.query_selector_all("section.slide"), 1):
        f = f"{out}/C{n}-{i:02d}.png"; el.screenshot(path=f); files.append(f)
    b.close()
if not 5 <= len(files) <= 6: sys.exit(f"ERREUR : {len(files)} slides (il en faut 5 ou 6)")
th = [Image.open(f).convert("RGB").resize((270, 338)) for f in files]
sheet = Image.new("RGB", (270 * min(5, len(th)), 338 * ((len(th) + 4) // 5)), "white")
for i, t in enumerate(th): sheet.paste(t, ((i % 5) * 270, (i // 5) * 338))
sheet.save(f"{out}/C{n}-planche.jpg", quality=85); print(len(files), "slides →", out)
PY
