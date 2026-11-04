"""Usage : python3 moteur/timing.py DOSSIER [--whisperx]
Lit DOSSIER/voix.mp3 et DOSSIER/plan.js (PLAN.phrases), transcrit la voix (Whisper local),
aligne chaque mot affiché sur la voix et écrit DOSSIER/timing.js + DOSSIER/mots.json.
Ancres créées : p1…pN (début de chaque phrase), p1_fin…pN_fin, + PLAN.ancres {nom:{mot, phrase}}.
--whisperx (option) : refait mots.json avec WhisperX (alignement forcé, CPU) si installé ; voir moteur/outils/README.md."""
import sys,os,json,re,difflib,unicodedata,subprocess
import numpy as np
from num2words import num2words
D=sys.argv[1]; M=os.path.dirname(os.path.abspath(__file__))
if not os.path.exists(os.path.join(D,'plan.js')): sys.exit('ERREUR : pas de plan.js dans '+D+' (écris-le d\'abord, modèle : plan-modele-N08.js)')
P=json.loads(subprocess.run(['node',os.path.join(M,'lireplan.js'),os.path.join(D,'plan.js')],capture_output=True,text=True,check=True).stdout)
import shutil
if '--simuler' in sys.argv:   # test sans voix : 2,7 mots/s, 0,35 s entre les phrases (aucune transcription)
    W=[]; t=0.0
    def _toks(x): return [w for w in re.sub(r'(\d)\s(\d{3})',r'\1\2',x).replace(' €','€').replace(' %','%').split() if re.search(r'\w',w)]
    for ph in P['phrases']:
        for w in _toks(ph): d=max(.22,len(w)*.055); W.append({'w':w,'s':round(t,2),'e':round(t+d,2)}); t+=d+.08
        t+=.35
    json.dump(W,open(os.path.join(D,'mots.json'),'w'),ensure_ascii=False)
    subprocess.run(['ffmpeg','-v','error','-y','-f','lavfi','-i',f'anullsrc=r=48000:cl=stereo','-t',str(t+.2),os.path.join(D,'voix.mp3')],check=True)
    os.utime(os.path.join(D,'mots.json'))
if not os.path.exists(os.path.join(D,'voix.mp3')) and os.path.exists(os.path.join(D,'assets','audio','voix.mp3')): shutil.copy(os.path.join(D,'assets','audio','voix.mp3'),os.path.join(D,'voix.mp3'))
mots=os.path.join(D,'mots.json')
# OPTION --whisperx (bibliothèque moteur/outils, pilote NC-001) : alignement forcé wav2vec2, plus précis sur les débuts de mots.
# Seulement si WhisperX est installé (venv) ; sinon, ou en cas d'échec, l'alignement habituel ci-dessous reste le défaut.
if '--whisperx' in sys.argv and '--simuler' not in sys.argv and os.path.exists(os.path.join(D,'voix.mp3')):
    import importlib.util
    PYX=os.environ.get('LVC_WHISPERX_PY') or (sys.executable if importlib.util.find_spec('whisperx') else '/home/claude/outils-video/venv-whisperx/bin/python')
    if os.path.exists(PYX):
        tmp=mots+'.whisperx'; r=subprocess.run([PYX,os.path.join(M,'outils','aligne_whisperx.py'),os.path.join(D,'voix.mp3'),tmp])
        if r.returncode==0 and os.path.exists(tmp): os.replace(tmp,mots); print('alignement : WhisperX (wav2vec2, CPU)')
        else: print('WhisperX a échoué : alignement habituel (faster-whisper)')
    else: print('WhisperX non installé (LVC_WHISPERX_PY) : alignement habituel (faster-whisper)')
if not os.path.exists(mots) or os.path.getmtime(mots)<os.path.getmtime(os.path.join(D,'voix.mp3')):
    from faster_whisper import WhisperModel
    raw=subprocess.run(['ffmpeg','-v','error','-i',os.path.join(D,'voix.mp3'),'-ac','1','-ar','16000','-f','f32le','-'],capture_output=True,check=True).stdout
    m=WhisperModel(os.path.expanduser('~/whisper-small'),device='cpu',compute_type='int8')
    segs,_=m.transcribe(np.frombuffer(raw,np.float32),language='fr',word_timestamps=True,beam_size=5)
    json.dump([{'w':w.word.strip(),'s':round(w.start,2),'e':round(w.end,2)} for s in segs for w in s.words],open(mots,'w'),ensure_ascii=False)
W=json.load(open(mots))
def deacc(w): return ''.join(c for c in unicodedata.normalize('NFD',w.lower()) if unicodedata.category(c)!='Mn')
def units(w):
    """mot affiché ou entendu → liste d'unités comparables (nombres en lettres)"""
    w=w.replace(' ',' ').replace('\xa0',' ')
    w=re.sub(r'(\d)\s(?=\d{3}\b)',r'\1',w)            # 2 200 → 2200
    out=[]
    for tok in re.findall(r"\d+(?:[.,]\d+)?|[A-Za-zÀ-ÿœŒ]+|€|%",w):
        if re.match(r'\d',tok):
            try: out+=deacc(num2words(float(tok.replace(',','.')) if re.search('[.,]',tok) else int(tok),lang='fr')).replace('-',' ').split()
            except Exception: out.append(tok)
        elif tok=='€': out.append('euros')
        elif tok=='%': out+=['pour','cent']
        else: out.append(deacc(tok))
    return [re.sub('[^a-z0-9]','',u) for u in out if re.sub('[^a-z0-9]','',u)]
# mots entendus : on recolle « -toi », « 'en »…
WW=[]
for w in W:
    if WW and w['w'][:1] in "-'’?": WW[-1]={'w':WW[-1]['w']+w['w'],'s':WW[-1]['s'],'e':w['e']}
    else: WW.append(dict(w))
wu=[(j,u) for j,w in enumerate(WW) for u in units(w['w'])]
# mots affichés : on garde « 2 200 € », « 10 % », « « », « ? » collés
def toks(t):
    t=re.sub(r'(\d)\s(\d{3})',r'\1 \2',t); t=re.sub(r'(\d)\s(€|%)',r'\1 \2',t)
    t=t.replace('« ','« ').replace(' »',' »').replace(' :',' :').replace(' ?',' ?').replace(' !',' !')
    return [x.replace('\u00a0',' ') for x in t.split(' ') if x]
D_=[]
for k,txt in enumerate(P['phrases'],1):
    for w in toks(txt): D_.append({'w':w,'p':'p%d'%k})
du=[(i,u) for i,d in enumerate(D_) for u in units(d['w'])]
sm=difflib.SequenceMatcher(None,[u for _,u in du],[u for _,u in wu],autojunk=False)
S=[None]*len(D_); E=[None]*len(D_)
for a,b,n in sm.get_matching_blocks():
    for q in range(n):
        i=du[a+q][0]; j=wu[b+q][0]
        S[i]=WW[j]['s'] if S[i] is None else min(S[i],WW[j]['s']); E[i]=WW[j]['e'] if E[i] is None else max(E[i],WW[j]['e'])
miss=[D_[i]['w'] for i in range(len(D_)) if S[i] is None]
for i in range(len(D_)):
    if S[i] is None:
        p=max([k for k in range(i) if E[k] is not None],default=None); n=min([k for k in range(i+1,len(D_)) if S[k] is not None],default=None)
        a=E[p] if p is not None else 0; b=S[n] if n is not None else a+.3; S[i]=a; E[i]=max(a,b)
words=[]; g=-1; cnt=0; prevp=None
for i,d in enumerate(D_):
    last=words[-1]['w'] if words else ''
    if d['p']!=prevp or cnt>=5 or re.search(r"[.…?!»]$",last) or (cnt>=3 and re.search(r"[,:]$",last)): g+=1; cnt=0
    prevp=d['p']; cnt+=1; words.append({'w':d['w'],'s':round(S[i],2),'e':round(E[i],2),'g':g})
K={}
for i,d in enumerate(D_):
    K.setdefault(d['p'],words[i]['s']); K[d['p']+'_fin']=words[i]['e']
K['p1']=0.0
for nom,a in P['ancres'].items():
    ph=a.get('phrase'); cible=units(a['mot']); occ=a.get('n',1); c=0; ok=False
    for i,d in enumerate(D_):
        if (ph is None or d['p']==ph) and units(d['w'])[:len(cible)]==cible:
            c+=1
            if c==occ: K[nom]=words[i]['s']; ok=True; break
    if not ok: sys.exit(f'ANCRE INTROUVABLE : {nom} = {a}')
voix=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',os.path.join(D,'voix.mp3')],capture_output=True,text=True).stdout)
K['end']=round(max(voix,max(w['e'] for w in words))+1.2,2)
json.dump(K,open(os.path.join(D,'K.json'),'w'))
open(os.path.join(D,'timing.js'),'w').write('const TIMING='+json.dumps({'K':K,'words':words},ensure_ascii=False)+';')
print('mots non retrouvés dans la voix :',miss if miss else 'aucun')
print('durée :',K['end'],'s ·',len(P['phrases']),'phrases')
print(json.dumps({k:v for k,v in K.items() if not k.endswith('_fin')},ensure_ascii=False))
