"""Usage : python3 moteur/rendu.py DOSSIER [--sortie NOM.mp4]
Rend DOSSIER/index.html en 1080×1920 30 i/s (un processus par cœur), mixe voix + bruitages
(déclarés par le moteur), loudnorm -14 LUFS, encode DOSSIER/video.mp4 (ou --sortie).
       python3 moteur/rendu.py DOSSIER --audio-sur VIDEO.mp4 : retouche de son express (images gardées, 1-2 min).
       python3 moteur/rendu.py DOSSIER --plage A B --sur VIDEO.mp4 [--remix] : retouche d'image express (seules les images
       entre A et B s sont refaites et posées sur la vidéo ; --remix refait aussi le son)."""
import sys,os,json,subprocess,multiprocessing as mp
from playwright.sync_api import sync_playwright
D=os.path.abspath(sys.argv[1]); OUT=sys.argv[sys.argv.index('--sortie')+1] if '--sortie' in sys.argv else 'video.mp4'
M=os.path.dirname(os.path.abspath(__file__))
FIN=os.path.join(D,OUT)
def cible(src):
    """Si la sortie est le fichier même que ffmpeg lit (--sur / --audio-sur = video.mp4), écrire d'abord à côté puis remplacer :
    sinon ffmpeg écrase l'entrée pendant qu'il la lit (vidéo détruite)."""
    return FIN+'.tmp.mp4' if src and os.path.realpath(src)==os.path.realpath(FIN) else FIN
def pose(tmp):
    if tmp!=FIN: os.replace(tmp,FIN)
SONS_DIRS=[os.path.join(M,'..','sons'),os.path.join(M,'..','hyperframes','.claude','skills','media-use','audio','assets','sfx')]
def SON(n):
    for d in SONS_DIRS:
        f=os.path.join(d,n+'.mp3')
        if os.path.exists(f): return f
    return None
K=json.load(open(os.path.join(D,'K.json'))); FPS=30; N=int(K['end']*FPS); FR=os.path.join(D,'_images')
def part(a):
    lo,hi=a
    with sync_playwright() as p:
        b=p.chromium.launch(); pg=b.new_page(viewport={'width':1080,'height':1920})
        pg.goto('file://'+D+'/index.html'); pg.wait_for_function('window.ready===true',timeout=30000)
        for i in range(lo,hi):
            pg.evaluate(f'seek({i/FPS})'); pg.screenshot(path=f'{FR}/{i:05d}.jpg',type='jpeg',quality=93)
        b.close()
if __name__=='__main__':
    os.makedirs(FR,exist_ok=True)
    # RETOUCHE EXPRESS (Thomas, 03/11 : 40 min pour baisser un son, c'est non) : --audio-sur VIDEO.mp4 garde les images de la
    # vidéo déjà faite, refait seulement le mixage et remet le son dessus (-c:v copy) : 1 à 2 min, jamais de rendu d'images.
    AS=sys.argv[sys.argv.index('--audio-sur')+1] if '--audio-sur' in sys.argv else None
    # RETOUCHE D'IMAGE EXPRESS : --plage A B --sur VIDEO.mp4 refait SEULEMENT les images entre A et B secondes et les pose
    # sur la vidéo déjà faite (le reste est gardé tel quel) ; --remix refait aussi le son, sinon le son d'origine est gardé.
    PG=None
    if '--plage' in sys.argv:
        k=sys.argv.index('--plage'); PG=(max(0.0,float(sys.argv[k+1])),min(K['end'],float(sys.argv[k+2])))
        SUR=os.path.abspath(sys.argv[sys.argv.index('--sur')+1])
    if AS: print('retouche express : images de',AS,'gardées, je refais seulement le son')
    elif PG:
        for x in os.listdir(FR): os.remove(os.path.join(FR,x))
        lo,hi=int(PG[0]*FPS),min(N,int(PG[1]*FPS)+1); n=max(1,min(os.cpu_count() or 1,hi-lo)); step=(hi-lo+n-1)//n
        with mp.Pool(n) as pool: pool.map(part,[(i,min(hi,i+step)) for i in range(lo,hi,step)])
        print('retouche express : images refaites seulement de %.2f à %.2f s (%d images)'%(PG[0],PG[1],hi-lo))
        if '--remix' not in sys.argv:
            tmp=cible(SUR); subprocess.run(['ffmpeg','-v','error','-y','-i',SUR,'-framerate',str(FPS),'-start_number',str(lo),'-i',f'{FR}/%05d.jpg',
              '-filter_complex',f"[1:v]setpts=PTS-STARTPTS+{lo/FPS:.4f}/TB[n];[0:v][n]overlay=eof_action=pass:enable='between(t,{lo/FPS:.4f},{(hi-1)/FPS:.4f})'[v]",
              '-map','[v]','-map','0:a?','-c:v','libx264','-preset','veryfast','-crf','19','-pix_fmt','yuv420p','-c:a','copy','-movflags','+faststart',tmp],check=True); pose(tmp)
            print('vidéo (images retouchées sur la plage, son gardé) :',os.path.join(D,OUT)); sys.exit(0)
    elif '--son-seul' in sys.argv and len(os.listdir(FR))==N: print('images déjà rendues : je refais seulement le son')
    else:
        for x in os.listdir(FR): os.remove(os.path.join(FR,x))
        n=max(1,os.cpu_count() or 1); step=(N+n-1)//n
        with mp.Pool(n) as pool: pool.map(part,[(i,min(N,i+step)) for i in range(0,N,step)])
    with sync_playwright() as p:
        b=p.chromium.launch(); pg=b.new_page(viewport={'width':1080,'height':1920}); pg.goto('file://'+D+'/index.html'); pg.wait_for_function('window.ready===true',timeout=30000)
        SFX=pg.evaluate('window.SFX'); b.close()
    manq=sorted({x[1] for x in SFX if not SON(x[1])})
    if manq: print('BRUITAGES INTROUVABLES (ignorés) :',manq)
    SFX=[x for x in SFX if SON(x[1]) and x[0]<K['end']]
    args=['ffmpeg','-v','error','-y','-i',os.path.join(D,'voix.mp3')]; flt=['[0:a]volume=1.0,apad=whole_dur=%.2f[v]'%K['end']]
    for i,(t,f,g) in enumerate(SFX,1):
        args+=['-i',SON(f)]; d=int(max(0,t)*1000); flt.append(f'[{i}:a]volume={g},adelay={d}|{d}[a{i}]')
    # BRUITAGES sur un bus à part, plafonnés : jamais plus forts que la voix (DA règle 9). Le juge du 02/11 a mesuré
    # des whooshs 6-8 dB au-dessus de la voix : c'était le loudnorm dynamique qui remontait les trous de voix → supprimé
    # (le volume final est réglé en 2e passe par un simple gain + limiteur). SFX_PLAFOND = crête max du bus, en linéaire.
    SFX_PLAFOND=float(os.environ.get('LVC_SFX_PLAFOND','0.35'))
    if SFX: flt.append(''.join(f'[a{i}]' for i in range(1,len(SFX)+1))+f'amix=inputs={len(SFX)}:normalize=0,acompressor=threshold=0.12:ratio=4:attack=3:release=120,alimiter=limit={SFX_PLAFOND}:level=false[sx]')
    flt.append('[v]'+('[sx]' if SFX else '')+f'amix=inputs={2 if SFX else 1}:normalize=0,atrim=0:{K["end"]}[out]')
    # MUSIQUE (PLAN.musique = nom de moteur/musiques.json) : très basse, et elle se baisse toute seule quand la voix parle
    PL=json.loads(subprocess.run(['node',os.path.join(M,'lireplan.js'),os.path.join(D,'plan.js')],capture_output=True,text=True).stdout or '{}')
    import re as _r
    def ancre(a):
        if isinstance(a,(int,float)): return float(a)
        m=_r.match(r'^([A-Za-z0-9_]+)\s*([+-]\s*[\d.]+)?$',str(a)); return K[m.group(1)]+(float(m.group(2).replace(' ','')) if m.group(2) else 0)
    MU=PL.get('musique'); MU={'nom':MU} if isinstance(MU,str) else (MU or {}); mus=MU.get('nom'); mfile=None
    if mus:
        CAT=json.load(open(os.path.join(M,'musiques.json'))); cache=os.path.expanduser('~/.cache/lvc-musique'); os.makedirs(cache,exist_ok=True)
        if mus in CAT:
            mfile=os.path.join(cache,mus+'.mp3')
            if not os.path.exists(mfile) and subprocess.run(['curl','-sSfL','-m','90','-o',mfile,CAT[mus]['url']]).returncode!=0:
                print('MUSIQUE : téléchargement impossible → vidéo sans musique'); mfile=None
        else: print('MUSIQUE : nom inconnu', mus)
    if mfile:
        # le temps fort (« drop ») du morceau tombe sur l'ancre MU['drop'] (le chiffre choc) ; sinon le morceau démarre à 0
        dr=_r.search(r'([\d.]+) s',CAT[mus]['drop']); st=0.0; dl=0.0
        if MU.get('drop') and dr:
            off=float(dr.group(1))-ancre(MU['drop'])
            if off>=0: st=off
            else: dl=-off
        e=K['end']; args+=['-ss',f'{st:.2f}','-i',mfile]; mi=len(SFX)+1
        # coupures : la musique se tait 0,5 s juste avant une révélation (MU['coupe'] = liste d'ancres)
        cut=''.join(f'*(1-between(t,{ancre(c)-.5:.2f},{ancre(c):.2f}))' for c in MU.get('coupe',[]))
        # silences (Thomas, 03/11 : la musique ne joue pas en continu) : la musique se coupe net entre deux ancres, puis repart
        cut+=''.join(f'*(1-between(t,{ancre(a):.2f},{ancre(b):.2f}))' for a,b in MU.get('silences',[]))
        flt[0]='[0:a]volume=1.0,apad=whole_dur=%.2f,asplit=2[v][vk]'%e
        flt.append(f"[{mi}:a]adelay={int(dl*1000)}|{int(dl*1000)},atrim=0:{e},volume='0.16{cut}':eval=frame,afade=t=in:d=0.4,afade=t=out:st={e-1.6:.2f}:d=1.6[m0];[m0][vk]sidechaincompress=threshold=0.03:ratio=8:attack=20:release=350[mus]")
        flt[-2],flt[-1]=flt[-1],flt[-2]   # garde le amix en dernier
        flt[-1]=flt[-1].replace(f'amix=inputs={2 if SFX else 1}',f'[mus]amix=inputs={3 if SFX else 2}')
    subprocess.run(args+['-filter_complex',';'.join(flt),'-map','[out]','-ac','2','-ar','48000',os.path.join(D,'mix.wav')],check=True)
    if mfile: print('musique :',mus)
    import re as _re
    lo=subprocess.run(['ffmpeg','-i',os.path.join(D,'mix.wav'),'-af','ebur128','-f','null','-'],capture_output=True,text=True).stderr
    I=float(_re.findall(r'I:\s+(-?[\d.]+) LUFS',lo)[-1]); g=-14-I
    subprocess.run(['ffmpeg','-v','error','-y','-i',os.path.join(D,'mix.wav'),'-af',f'volume={g:.2f}dB,alimiter=limit=0.89:level=false','-ar','48000',os.path.join(D,'mix2.wav')],check=True)
    os.replace(os.path.join(D,'mix2.wav'),os.path.join(D,'mix.wav'))
    if PG:
        lo,hi=int(PG[0]*FPS),min(N,int(PG[1]*FPS)+1)
        tmp=cible(SUR); subprocess.run(['ffmpeg','-v','error','-y','-i',SUR,'-framerate',str(FPS),'-start_number',str(lo),'-i',f'{FR}/%05d.jpg','-i',os.path.join(D,'mix.wav'),
          '-filter_complex',f"[1:v]setpts=PTS-STARTPTS+{lo/FPS:.4f}/TB[n];[0:v][n]overlay=eof_action=pass:enable='between(t,{lo/FPS:.4f},{(hi-1)/FPS:.4f})'[v]",
          '-map','[v]','-map','2:a','-c:v','libx264','-preset','veryfast','-crf','19','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-shortest','-movflags','+faststart',tmp],check=True); pose(tmp)
        print('vidéo (images retouchées sur la plage + son refait) :',os.path.join(D,OUT)); sys.exit(0)
    if AS:
        tmp=cible(AS); subprocess.run(['ffmpeg','-v','error','-y','-i',os.path.abspath(AS),'-i',os.path.join(D,'mix.wav'),'-map','0:v:0','-map','1:a:0','-c:v','copy','-c:a','aac','-b:a','192k','-shortest','-movflags','+faststart',tmp],check=True); pose(tmp)
        print('vidéo (son refait, images gardées) :',os.path.join(D,OUT),'·',len(SFX),'bruitages'); sys.exit(0)
    subprocess.run(['ffmpeg','-v','error','-y','-framerate','30','-i',f'{FR}/%05d.jpg','-i',os.path.join(D,'mix.wav'),'-c:v','libx264','-preset','veryfast','-crf','19','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-shortest','-movflags','+faststart',os.path.join(D,OUT)],check=True)
    if os.path.isdir(os.path.join(D,'renders')): import shutil; shutil.copy(os.path.join(D,OUT),os.path.join(D,'renders','video.mp4'))
    print('vidéo :',os.path.join(D,OUT),'·',N,'images ·',len(SFX),'bruitages')
