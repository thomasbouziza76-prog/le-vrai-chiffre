#!/usr/bin/env bash
# Étape 0 · installe tout ce qu'il faut (≈ 4 min). Usage : bash etapes/00-installer.sh
# - HyperFrames 0.8.82 + skills (copie du dépôt cblain100-prog/motion-design-claude-code dans hyperframes/) -> ~/motion-design-claude-code
# - GSAP local (le CDN jsdelivr est bloqué), polices de la chaîne, Whisper small (HuggingFace bloqué -> npm)
# Écrit ~/.hf-env (variables HyperFrames) : fais `source ~/.hf-env` dans chaque shell qui lance npx hyperframes.
set -euo pipefail
R="$(cd "$(dirname "$0")/.." && pwd)"
W="$HOME/motion-design-claude-code"
echo "== HyperFrames"
rm -rf "$W" && cp -r "$R/hyperframes" "$W"
cd "$W" && npm ci --no-audit --no-fund --loglevel=error >/dev/null
BR=$(ls /opt/pw-browsers/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell 2>/dev/null | head -1)
cat > "$HOME/.hf-env" <<ENV
export HYPERFRAMES_NO_TELEMETRY=1 DO_NOT_TRACK=1 HYPERFRAMES_SKIP_SKILLS=1 HYPERFRAMES_NO_UPDATE_CHECK=1
export HYPERFRAMES_BROWSER_PATH="$BR"
export LVC_REPO="$R" LVC_HF="$W"
ENV
source "$HOME/.hf-env"; npx hyperframes telemetry disable >/dev/null 2>&1 || true
echo "== GSAP local"
mkdir -p /tmp/g && cd /tmp/g && npm i --silent gsap@3.14.2 >/dev/null && cp node_modules/gsap/dist/gsap.min.js "$HOME/gsap.min.js"
mkdir -p "$HOME/gsap-plugins" && for f in CustomEase CustomWiggle CustomBounce SplitText DrawSVGPlugin MorphSVGPlugin MotionPathPlugin; do cp "node_modules/gsap/dist/$f.min.js" "$HOME/gsap-plugins/"; done
echo "== Whisper (faster-whisper + modèle small via npm)"
pip install -q --break-system-packages faster-whisper >/dev/null 2>&1
M="$HOME/whisper-small"
if [ ! -s "$M/model.bin" ]; then
  rm -rf /tmp/w && mkdir -p /tmp/w "$M" && cd /tmp/w
  for i in 0 1 2 3; do npm pack -q "@skillninja/shortmovie-telop-model-p$i" >/dev/null; mkdir -p p$i; tar -xzf skillninja-shortmovie-telop-model-p$i-*.tgz -C p$i; done
  cat p0/package/model.bin.part0 p1/package/model.bin.part1 p2/package/model.bin.part2 p3/package/model.bin.part3 > "$M/model.bin"
  cp p0/package/{config.json,preprocessor_config.json,tokenizer.json,vocabulary.json} "$M/"
  ( cd "$M" && grep -o '[0-9a-f]\{64\}' /tmp/w/p0/package/model.sha256 | head -1 > /tmp/w/expected && test "$(sha256sum model.bin | cut -d' ' -f1)" = "$(cat /tmp/w/expected)" ) && echo "   modèle vérifié" || echo "   ATTENTION : somme de contrôle du modèle différente"
  rm -rf /tmp/w
fi
echo "OK · installation terminée. Projet suivant : bash etapes/01-nouveau-projet.sh <slug>"
