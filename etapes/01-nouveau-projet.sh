#!/usr/bin/env bash
# Étape 1 bis · crée le dossier de production du jour et y prépare le moteur.
# Usage : bash etapes/01-nouveau-projet.sh <slug>   (slug en kebab-case, ex. n09-negocier-100-euros)
# Sortie : le chemin du dossier ($P). Dedans : index.html + moteur + plan.js (modèle N°08 à remplacer),
# boards/ (planches), renders/ (vidéo), livrables/, agents/ (verdicts des agents).
set -euo pipefail
source "$HOME/.hf-env"
S="${1:?usage: 01-nouveau-projet.sh <slug>}"; P="$HOME/production/$S"
mkdir -p "$P/boards" "$P/renders" "$P/livrables" "$P/agents" "$P/assets/audio"
bash "$LVC_REPO/moteur/nouveau.sh" "$P" >/dev/null
echo "$P"
