#!/usr/bin/env python3
"""Mix : voix + bruitages calés sur l'image (assets/audio/sfx-events.json : [nom, temps de l'image, gain]).
Chaque bruitage est placé pour que son pic tombe 1 image après le geste (le whoosh : au plus vite du mouvement, +0,12 s ;
le riser : sa crête sur le temps donné). Optionnel : MUSIC=tension.mp3,elan.mp3 (voir le README de la mise en musique)."""
import json, os, subprocess, sys, array
HERE = os.path.dirname(os.path.abspath(__file__)); os.chdir(HERE)
SFX = "../.claude/skills/media-use/audio/assets/sfx"
DUR = float(os.environ.get('DUR', '44.49')); PIVOT = float(os.environ.get('PIVOT', '15.64')); LIGHT = float(os.environ.get('LIGHT', '19.38'))
def pcm(path):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", "8000", "-f", "s16le", "-"], capture_output=True).stdout
    return array.array("h", raw)
def peak_t(path):
    a = pcm(path); i = max(range(len(a)), key=lambda k: abs(a[k])); return i / 8000, len(a) / 8000
ev = json.load(open("assets/audio/sfx-events.json"))
inputs, filt = ["-i", "assets/audio/voix.mp3"], []
for k, (name, t, g) in enumerate(ev):
    f = f"{SFX}/{name}.mp3"; pk, dur = peak_t(f)
    if name == "riser": start = t - dur
    elif name.startswith("whoosh"): start = t + 0.12 - pk
    else: start = t + 1 / 30 - pk
    trim = max(0.0, -start); start = max(0.0, start)
    inputs += ["-i", f]
    filt.append(f"[{k+1}:a]atrim=start={trim:.3f},asetpts=PTS-STARTPTS,volume={g},adelay={int(start*1000)}|{int(start*1000)},aformat=channel_layouts=stereo[s{k}]")
n = len(ev)
music = os.environ.get("MUSIC", "")
mlabel = ""
if music:
    ten, ela = music.split(",")
    inputs += ["-i", f"assets/music/{ten}", "-i", f"assets/music/{ela}"]
    ti, ei = n + 1, n + 2
    tstart = float(os.environ.get("TENSION_START", "0")); estart = float(os.environ.get("ELAN_START", "0"))
    filt.append(f"[{ti}:a]atrim=start={tstart},asetpts=PTS-STARTPTS,atrim=duration={PIVOT},afade=t=out:st={PIVOT-0.08}:d=0.08,volume={os.environ.get('TENSION_GAIN','0.40')},aformat=channel_layouts=stereo[mt]")
    filt.append(f"[{ei}:a]atrim=start={estart},asetpts=PTS-STARTPTS,atrim=duration={DUR-LIGHT},afade=t=out:st={DUR-LIGHT-2.4}:d=2.4,volume={os.environ.get('ELAN_GAIN','0.30')},adelay={int(LIGHT*1000)}|{int(LIGHT*1000)},aformat=channel_layouts=stereo[me]")
    filt.append("[mt][me]amix=inputs=2:normalize=0[mus]")
    filt.append("[0:a]aformat=channel_layouts=stereo,asplit=2[v][vk]")
    filt.append("[mus][vk]sidechaincompress=threshold=0.04:ratio=6:attack=20:release=300[mduck]")
    mlabel = "[mduck]"
else:
    filt.append("[0:a]aformat=channel_layouts=stereo[v]")
filt.append("[v]" + mlabel + "".join(f"[s{k}]" for k in range(n)) + f"amix=inputs={n+1+(1 if mlabel else 0)}:normalize=0,atrim=duration={DUR},loudnorm=I=-16:TP=-2:LRA=11,alimiter=limit=0.79:level=disabled[out]")
out = os.environ.get("OUT", "assets/audio/mix.wav")
subprocess.run(["ffmpeg", "-v", "error", "-y", *inputs, "-filter_complex", ";".join(filt), "-map", "[out]", "-ar", "48000", out], check=True)
print("mix:", out, "bruitages:", n, "musique:", music or "aucune")
