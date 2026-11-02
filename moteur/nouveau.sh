#!/usr/bin/env bash
# Usage : bash moteur/nouveau.sh /chemin/du/dossier-de-travail
# Prépare un dossier de production : copie le moteur, les polices et un plan vide.
set -e
M="$(cd "$(dirname "$0")" && pwd)"; D="$1"; [ -z "$D" ] && { echo "usage : nouveau.sh DOSSIER"; exit 1; }
mkdir -p "$D/polices"
cp "$M/moteur.html" "$D/index.html"; cp "$M/moteur.js" "$M/ticket.js" "$M/donnees.js" "$M/icones.js" "$D/"
cp "$M/../polices/InstrumentSans-700.woff2" "$M/../polices/SpaceMono-700.woff2" "$D/polices/"
cp "$M/mondes/gare-des-salaires.plan.js" "$D/plan-exemple-monde.js"   # exemple à lire (technique, pas le monde) ; ton plan s'écrit dans plan.js
echo "prêt : $D (lis plan-exemple-monde.js pour la technique, invente TON monde dans plan.js, puis lance timing.py)"
