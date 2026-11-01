"""Usage : python3 moteur/planche.py DOSSIER [pas_en_s=1] [--video]
Planche de contrôle : une image toutes les `pas` secondes, 6 par ligne, horodatées → DOSSIER/planche*.jpg.
Sans --video : depuis index.html (le PLAN, avant rendu). Avec --video : depuis DOSSIER/video.mp4."""
import sys,os,json,subprocess
from PIL import Image,ImageDraw
D=os.path.abspath(sys.argv[1]); pas=float(sys.argv[2]) if len(sys.argv)>2 and not sys.argv[2].startswith('--') else 1.0
K=json.load(open(os.path.join(D,'K.json'))); ts=[round(.5+i*pas,2) for i in range(int((K['end']-.5)/pas)+1)]
ims=[]
if '--video' in sys.argv:
    for t in ts:
        subprocess.run(['ffmpeg','-v','error','-y','-ss',str(t),'-i',os.path.join(D,'video.mp4'),'-frames:v','1','/tmp/_pl.jpg'],check=True); ims.append(Image.open('/tmp/_pl.jpg').convert('RGB'))
else:
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        b=p.chromium.launch(); pg=b.new_page(viewport={'width':1080,'height':1920}); e=[]; pg.on('pageerror',lambda x:e.append(str(x)))
        pg.goto('file://'+D+'/index.html'); pg.wait_for_function('window.ready===true',timeout=30000)
        for t in ts: pg.evaluate(f'seek({t})'); pg.screenshot(path='/tmp/_pl.png'); ims.append(Image.open('/tmp/_pl.png').convert('RGB'))
        b.close()
        if e: print('ERREURS JS :',e)
per=24; out=[]
for k in range(0,len(ims),per):
    part=ims[k:k+per]; rows=(len(part)+5)//6; W=Image.new('RGB',(6*270,rows*500),'white'); d=ImageDraw.Draw(W)
    for i,im in enumerate(part):
        x,y=(i%6)*270,(i//6)*500; W.paste(im.resize((270,480)),(x,y)); d.text((x+6,y+482),f'{ts[k+i]:.1f} s',fill='black')
    B=os.path.join(D,'boards') if os.path.isdir(os.path.join(D,'boards')) else D
    nm=os.path.join(B,f'planche-{"video" if "--video" in sys.argv else "plan"}-{k//per+1}.jpg'); W.save(nm,quality=85); out.append(nm)
print('\n'.join(out))
