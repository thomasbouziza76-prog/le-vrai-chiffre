#!/usr/bin/env bash
# Étape 0 · installe ce qu'il faut pour le MOTEUR (≈ 1 à 2 min). Usage : bash etapes/00-installer.sh
# Le rendu se fait avec moteur/ (Playwright + Chromium sont déjà dans la machine). Plus besoin d'HyperFrames.
# Installe : faster-whisper + num2words (Python), le modèle Whisper small (HuggingFace bloqué → npm).
# Écrit ~/.hf-env (LVC_REPO) : fais `source ~/.hf-env` dans chaque shell.
set -euo pipefail
R="$(cd "$(dirname "$0")/.." && pwd)"
cat > "$HOME/.hf-env" <<ENV
export LVC_REPO="$R"
ENV
echo "== Python : faster-whisper, num2words"
pip install -q --break-system-packages faster-whisper num2words >/dev/null 2>&1
echo "== Whisper small (via npm)"
M="$HOME/whisper-small"
if [ ! -s "$M/model.bin" ]; then
  rm -rf /tmp/w && mkdir -p /tmp/w "$M" && cd /tmp/w
  for i in 0 1 2 3; do npm pack -q "@skillninja/shortmovie-telop-model-p$i" >/dev/null; mkdir -p p$i; tar -xzf skillninja-shortmovie-telop-model-p$i-*.tgz -C p$i; done
  cat p0/package/model.bin.part0 p1/package/model.bin.part1 p2/package/model.bin.part2 p3/package/model.bin.part3 > "$M/model.bin"
  cp p0/package/{config.json,preprocessor_config.json,tokenizer.json,vocabulary.json} "$M/"
  rm -rf /tmp/w
fi
python3 -c "import playwright, faster_whisper, num2words" && echo "OK · installation terminée. Projet suivant : bash etapes/01-nouveau-projet.sh <slug>"
