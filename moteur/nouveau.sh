#!/usr/bin/env bash
# Usage : bash moteur/nouveau.sh /chemin/du/dossier-de-travail
# Prépare un dossier de production : copie le moteur, les polices et un plan vide.
set -e
M="$(cd "$(dirname "$0")" && pwd)"; D="$1"; [ -z "$D" ] && { echo "usage : nouveau.sh DOSSIER"; exit 1; }
mkdir -p "$D/polices"
cp "$M/moteur.html" "$D/index.html"; cp "$M/moteur.js" "$M/ticket.js" "$M/donnees.js" "$D/"
cp "$M/../polices/InstrumentSans-700.woff2" "$M/../polices/SpaceMono-700.woff2" "$D/polices/"
[ -f "$D/plan.js" ] || cp "$M/exemples/plan-N08.js" "$D/plan.js"
echo "prêt : $D (remplace plan.js, puis lance timing.py)"
