"""Usage : python3 moteur/rendu.py DOSSIER [--sortie NOM.mp4]
Rend DOSSIER/index.html en 1080×1920 30 i/s (un processus par cœur), mixe voix + bruitages
(déclarés par le moteur), loudnorm -14 LUFS, encode DOSSIER/video.mp4 (ou --sortie)."""
import sys,os,json,subprocess,multiprocessing as mp
from playwright.sync_api import sync_playwright
D=os.path.abspath(sys.argv[1]); OUT=sys.argv[sys.argv.index('--sortie')+1] if '--sortie' in sys.argv else 'video.mp4'
M=os.path.dirname(os.path.abspath(__file__)); SONS=os.path.join(M,'..','sons')
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
    for x in os.listdir(FR): os.remove(os.path.join(FR,x))
    n=max(1,os.cpu_count() or 1); step=(N+n-1)//n
    with mp.Pool(n) as pool: pool.map(part,[(i,min(N,i+step)) for i in range(0,N,step)])
    with sync_playwright() as p:
        b=p.chromium.launch(); pg=b.new_page(viewport={'width':1080,'height':1920}); pg.goto('file://'+D+'/index.html'); pg.wait_for_function('window.ready===true',timeout=30000)
        SFX=pg.evaluate('window.SFX'); b.close()
    SFX=[x for x in SFX if os.path.exists(os.path.join(SONS,x[1]+'.mp3')) and x[0]<K['end']]
    args=['ffmpeg','-v','error','-y','-i',os.path.join(D,'voix.mp3')]; flt=['[0:a]volume=1.0,apad=whole_dur=%.2f[v]'%K['end']]
    for i,(t,f,g) in enumerate(SFX,1):
        args+=['-i',os.path.join(SONS,f+'.mp3')]; d=int(max(0,t)*1000); flt.append(f'[{i}:a]volume={g},adelay={d}|{d}[a{i}]')
    flt.append('[v]'+''.join(f'[a{i}]' for i in range(1,len(SFX)+1))+f'amix=inputs={len(SFX)+1}:normalize=0,atrim=0:{K["end"]},loudnorm=I=-14:TP=-1.5:LRA=11[out]')
    subprocess.run(args+['-filter_complex',';'.join(flt),'-map','[out]','-ac','2','-ar','48000',os.path.join(D,'mix.wav')],check=True)
    import re as _re
    lo=subprocess.run(['ffmpeg','-i',os.path.join(D,'mix.wav'),'-af','ebur128','-f','null','-'],capture_output=True,text=True).stderr
    I=float(_re.findall(r'I:\s+(-?[\d.]+) LUFS',lo)[-1]); g=-14-I
    subprocess.run(['ffmpeg','-v','error','-y','-i',os.path.join(D,'mix.wav'),'-af',f'volume={g:.2f}dB,alimiter=limit=0.89:level=false','-ar','48000',os.path.join(D,'mix2.wav')],check=True)
    os.replace(os.path.join(D,'mix2.wav'),os.path.join(D,'mix.wav'))
    subprocess.run(['ffmpeg','-v','error','-y','-framerate','30','-i',f'{FR}/%05d.jpg','-i',os.path.join(D,'mix.wav'),'-c:v','libx264','-preset','veryfast','-crf','19','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-shortest','-movflags','+faststart',os.path.join(D,OUT)],check=True)
    if os.path.isdir(os.path.join(D,'renders')): import shutil; shutil.copy(os.path.join(D,OUT),os.path.join(D,'renders','video.mp4'))
    print('vidéo :',os.path.join(D,OUT),'·',N,'images ·',len(SFX),'bruitages')
