#!/usr/bin/env bash
# Étape 1 bis · crée le projet du jour dans ~/motion-design-claude-code/<slug> (slug en kebab-case, ex. n05-interets-composes)
# Usage : bash etapes/01-nouveau-projet.sh <slug>
set -euo pipefail
source "$HOME/.hf-env"
S="${1:?usage: 01-nouveau-projet.sh <slug>}"
cd "$LVC_HF" && bash .claude/skills/motion-design/scripts/new-project.sh "$S" >/dev/null
P="$LVC_HF/$S"
mkdir -p "$P/assets/vendor" "$P/boards" "$P/renders" "$P/livrables"
cp "$HOME/gsap.min.js" "$P/assets/vendor/gsap.min.js"
cp "$LVC_REPO"/polices/InstrumentSans-*.woff2 "$LVC_REPO"/polices/SpaceMono-*.woff2 "$P/assets/fonts/"
cp "$LVC_REPO/outils/assemble.sh" "$LVC_REPO/outils/build-sfx-mix.py" "$P/"
echo "$P"
