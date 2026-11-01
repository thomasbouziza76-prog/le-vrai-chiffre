"""CONTRÔLES AUTOMATIQUES BLOQUANTS — à lancer sur le dossier de production.
Usage : python3 controles/verifier.py DOSSIER            (le plan, avant le rendu : caméra, textes, chiffres, appels, Tico)
        python3 controles/verifier.py DOSSIER --video    (en plus : la vidéo finale — durée, image, son)
Écrit DOSSIER/rapport-controles.json. Code de sortie 1 si un contrôle ÉCHOUE : on corrige le plan et on relance.
Ces contrôles traduisent en code les retours de Thomas (DA.md, historique/CHECKS.md) : ils ne s'oublient pas."""
import sys,os,json,re,subprocess
from playwright.sync_api import sync_playwright
D=os.path.abspath(sys.argv[1]); VIDEO='--video' in sys.argv; R=os.path.dirname(os.path.abspath(__file__))
M=os.path.join(R,'..','moteur')
P=json.loads(subprocess.run(['node',os.path.join(M,'lireplan.js'),os.path.join(D,'plan.js')],capture_output=True,text=True,check=True).stdout)
K=json.load(open(os.path.join(D,'K.json')))
res=[]
def ok(nom,passe,detail=''): res.append({'controle':nom,'ok':bool(passe),'detail':detail})

# 1. durée selon le format
fmt=P.get('format','court'); dur=K['end']; bornes={'court':(28,48),'histoire':(61,78)}[fmt]
ok('Durée',bornes[0]<=dur<=bornes[1],f'{dur:.1f} s pour le format « {fmt} » (attendu {bornes[0]}–{bornes[1]} s)')

# 2. chiffres affichés : 1 principal + 2 secondaires maximum
def nums(s):
    s=re.sub(r'<[^>]+>',' ',str(s)); s=re.sub(r'(\d)[\s\u00a0\u202f](?=\d{3}\b)',r'\1',s)
    return [n.replace(',','.') for n in re.findall(r'\d+(?:[.,]\d+)?',s) if not re.fullmatch(r'(19|20)\d\d',n)]
aff=[]
for c in P['cartons']: aff+=nums(c.get('l1',''))+nums(c.get('l2',''))
for sc in P['scenes']:
    t=sc['type']
    if t=='duel':
        for q in ('gauche','droite'): aff+=nums(sc[q].get('texte',sc[q]['valeur'])); aff+=nums(sc[q].get('label',''))
        for e in sc.get('etiquettes',[]): aff+=nums(e['txt'])
        for b in sc.get('bulles',[]): aff+=nums(b['txt'])
    if t=='vague':
        for m in sc.get('reperes',[]): aff+=nums(m.get('txt',''))+nums(m.get('sous',''))+nums(m.get('tampon',''))
    if t=='chiffre':
        aff+=nums(sc.get('texte',sc['valeur'])); aff+=nums(sc.get('label',''))
        for p in sc.get('parts',[]): aff+=nums(p.get('txt',p['valeur']))
    if t=='courbe': aff+=nums(sc['points'][-1][1])+[x for m in sc.get('marques',[]) for x in nums(m['txt'])]
    if t=='choix': aff+=nums(sc['chiffre'])+[x for o in sc['options'] for x in nums(o['txt'])]
dist=sorted(set(float(x) for x in aff))
ok('Chiffres à l\'écran (≤ 3)',len(dist)<=3,'distincts : '+', '.join(f'{x:g}' for x in dist))
voix=sorted(set(float(x) for p in P['phrases'] for x in nums(p)))
ok('Chiffres dans la voix (≤ 4)',len(voix)<=4,'distincts : '+', '.join(f'{x:g}' for x in voix))

# 3. exactement deux appels : « abonne-toi » au milieu, question/partage à la fin
ab=[i for i,p in enumerate(P['phrases']) if re.search(r'abonne',p,re.I)]
fin=P['phrases'][-1]; appel_fin=bool(re.search(r'\?|commentaire|envoie|partage',fin,re.I))
ok('Appel « abonne-toi » : une seule fois, au milieu',len(ab)==1 and P.get('abonne')=='p%d'%(ab[0]+1) if ab else False,f'phrases avec « abonne » : {[i+1 for i in ab]} ; PLAN.abonne = {P.get("abonne")}')
if ab:
    t_ab=K['p%d'%(ab[0]+1)]; ok('« Abonne-toi » placé entre 25 % et 70 % de la vidéo',.25*dur<=t_ab<=.7*dur,f'à {t_ab:.1f} s sur {dur:.1f} s')
ok('Appel final (question de débat ou partage ciblé)',appel_fin,fin)
MU=P.get('musique'); MU={'nom':MU} if isinstance(MU,str) else (MU or {})
CATM=json.load(open(os.path.join(M,'musiques.json')))
ok('Musique choisie et calée (nom connu + temps fort sur une ancre)',MU.get('nom') in CATM and (bool(MU.get('drop')) or 'none' in CATM.get(MU.get('nom'),{}).get('drop','')),f"musique : {MU}")
ok('Hook : carton dès la 1re image',any(c.get('de')=='debut' for c in P['cartons']),'')

# 4. image par image : caméra, débordements, chevauchements, taille de Tico, présence de Tico
JS="""(t)=>{seek(t); const R=e=>{const r=e.getBoundingClientRect();return [r.left,r.top,r.right,r.bottom]};
 const out={cam:(()=>{const c=cam(t);return [c.x,c.y,c.z,c.r]})(),roles:{},textes:[]};
 for(const role of ['carton','pastille','sous-titre','perso']) out.roles[role]=[...document.querySelectorAll('[data-role="'+role+'"]')].map(R);
 for(const e of document.querySelectorAll('text[data-t="1"]')){ const op=+(e.getAttribute('opacity')||1); let a=e, o=op; while(a&&a.tagName!=='svg'){ if(a.getAttribute&&a.getAttribute('opacity')) o*= (a===e?1:+a.getAttribute('opacity')); a=a.parentNode; }
   if(o<.3||!e.textContent.trim()) continue; const ecr=!!e.closest('[data-role]')||!e.closest('g[transform^="translate"][transform*="scale"]'); out.textes.push([e.textContent.trim(),R(e),e.closest('[data-role]')?e.closest('[data-role]').dataset.role:'monde']); }
 return out;}"""
pas=.1; N=int(dur/pas); fr=[]; errs=[]
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1080,'height':1920}); pg.on('pageerror',lambda x:errs.append(str(x)))
    pg.goto('file://'+D+'/index.html')
    try: pg.wait_for_function('window.ready===true',timeout=15000)
    except Exception: sys.exit('ERREUR : la page ne démarre pas. Erreurs JavaScript : '+('; '.join(errs) or 'aucune')+' → si une « ancre inconnue » est citée, relance moteur/timing.py après avoir modifié plan.js')
    for i in range(N+1): fr.append(pg.evaluate(JS,round(i*pas,2)))
    ACTS=pg.evaluate('window.ACTIONS||[]'); SFXS=pg.evaluate('window.SFX||[]'); MOTS=pg.evaluate("SC.filter(s=>s.type==='mot').map(s=>[s.t0,s.t1])"); EXTRA=pg.evaluate('window.PLANS_EXTRA||[]')
    b.close()
ok('Aucune erreur JavaScript',not errs,'; '.join(errs[:3]))
# 1) L'IMAGE BOUGE, LA CAMÉRA SUIT (règle de Thomas, 01/11) : à chaque instant, quelque chose AGIT à l'écran
#    (une action déclarée par le moteur, ou un geste bruité). Pas de trou de plus de 1,6 s.
ev=[(a,b) for a,b,_ in ACTS]+[(t-.35,t+.35) for t,_,_ in SFXS]
trous=[]; t=0.0
while t<dur-.5:
    if not any(a<=t<=b for a,b in ev):
        t0=t
        while t<dur and not any(a<=t<=b for a,b in ev): t+=.1
        if t-t0>1.6: trous.append(f'{t0:.1f}-{t:.1f} s')
    t+=.1
ok("L'image agit en permanence (pas plus de 1,6 s sans action)",not trous,('rien ne se passe : '+', '.join(trous[:6])) if trous else 'OK')
# 2) UN NOUVEAU PLAN TOUTES LES 1 À 3 S : changement net de cadrage (zoom ×1,2, 300 px à l'écran ou 3°), plan plein écran, ou début de scène
cuts=[0.0]+[a for a,b in MOTS]+[x for x in EXTRA if x]
for i in range(len(fr)):
    a=fr[i]['cam']
    for k in range(i+1,min(len(fr),i+5)):
        c=fr[k]['cam']; pan=((c[0]-a[0])**2+(c[1]-a[1])**2)**.5*min(a[2],c[2])
        if max(a[2],c[2])/min(a[2],c[2])>=1.2 or pan>=300 or abs(c[3]-a[3])>=3: cuts.append(round(i*pas,1)); break
cuts=sorted(set(cuts))+[dur]; long=[f'{a:.1f}-{b:.1f} s' for a,b in zip(cuts,cuts[1:]) if b-a>3.3]
ok('Un nouveau plan toutes les 1 à 3 s',not long,('plans trop longs : '+', '.join(long[:6])) if long else f'{len(cuts)-1} changements de plan')
# 3) CHAQUE VIDÉO EST UNIQUE : ses visuels ne reprennent pas ceux des 5 vidéos précédentes (historique/HISTORIQUE.md, « VISUELS : … »)
import unicodedata
def mots(x): return {unicodedata.normalize('NFD',w.lower()).encode('ascii','ignore').decode() for w in re.findall(r"[\wéèêàâçîôû]+",x) if len(w)>3}
vis=[]; 
for sc in P['scenes']:
    vis+=sc.get('visuels',[]) or []
    vis+={'duel':['barres'],'vague':['barres','graphique'],'chiffre':['barre'],'courbe':['courbe','graphique'],'parcours':['barres']}.get(sc['type'],[])
H=open(os.path.join(R,'..','historique','HISTORIQUE.md')).read().split('\n')
recents=[l for l in H if l.startswith('- 20')][:5]
deja=set()
for l in recents:
    m=re.search(r'VISUELS : ([^·]+)',l)
    if m: deja|=mots(m.group(1))
pris=mots(' '.join(vis)); comm=sorted(pris&deja)
ok('Monde nouveau (visuels différents des 5 dernières vidéos)',bool(vis) and not comm,(f'déjà vus récemment : {comm}' if comm else ('PLAN.scenes[].visuels manquant' if not vis else 'visuels : '+', '.join(vis))))
def inter(a,b): return max(0,min(a[2],b[2])-max(a[0],b[0]))*max(0,min(a[3],b[3])-max(a[1],b[1]))
SCR=1080*1920; chev=[]; deb={}; grand=[]; tico_t=[]
for i,f in enumerate(fr):
    t=round(i*pas,1); ro=f['roles']
    for a in ro['carton']:
        for b in ro['pastille']:
            if inter(a,b)>2000: chev.append(f'{t}s carton/pastille')
    if ro.get('mot') and ro['carton']: chev.append(f'{t}s carton sur un plan plein écran')
    for a in ro['carton']+ro['pastille']:
        for b in ro['sous-titre']:
            if inter(a,b)>2000: chev.append(f'{t}s carton/sous-titre')
    if i>0:
        c0,c1=fr[i-1]['cam'],f['cam']; vit=((c1[0]-c0[0])**2+(c1[1]-c0[1])**2)**.5*c1[2]/pas+abs(c1[2]/c0[2]-1)/pas*1000
    else: vit=0
    for txt,(l,tp,r,bt),role in f['textes']:
        if role=='monde' and vit>1500: continue   # pendant un mouvement rapide (whip pan), un texte du monde peut traverser le bord
        visible=r>0 and l<1080 and bt>0 and tp<1920; coupe=visible and (l<-4 or r>1084 or tp<-4 or bt>1924)
        if coupe and role!='monde': deb.setdefault((txt,role),[]).append(t)
        elif coupe: deb.setdefault((txt,'monde'),[]).append(t)
    if ro['perso']:
        tico_t.append(t); aire=sum(max(0,min(r,1080)-max(l,0))*max(0,min(b,1920)-max(tp,0)) for l,tp,r,b in ro['perso'])
        if aire>.25*SCR: grand.append(f'{t}s ({aire/SCR:.0%})')
ok('Aucun chevauchement carton / pastille / sous-titres',not chev,', '.join(chev[:8]))
coupes=[]
for (txt,role),ts in deb.items():
    ts=sorted(set(ts)); run=1; best=1
    for a,b2 in zip(ts,ts[1:]): run=run+1 if round(b2-a,1)<=pas+.01 else 1; best=max(best,run)
    lim=1 if role!='monde' else int(.8/pas)   # texte écran : jamais coupé ; texte du monde : pas plus de 0,8 s
    if best>=lim and not (role=='monde' and best*pas<.8): coupes.append(f'« {txt[:28]} » ({role}, {best*pas:.1f} s dès {ts[0]} s)')
ok('Aucun texte coupé par le bord de l\'écran',not coupes,'; '.join(coupes[:8]))
ok('Tico : 25 % de l\'image maximum',not grand,', '.join(grand[:8]))
moments={'hook (0-3 s)':(0,3),'milieu':(.4*dur,.6*dur),'fin (5 dernières s)':(dur-5,dur)}
if ab: moments['abonne-toi']=(t_ab-1,t_ab+3)
manque=[m for m,(a,b) in moments.items() if not any(a<=t<=b for t in tico_t)]
ok('Tico présent aux moments clés',not manque,'absent : '+', '.join(manque) if manque else 'hook, milieu, abonne-toi, fin')
# rythme : un changement visuel (nouveau carton, scène, repère…) toutes les 2-3 s → mesuré par les ancres
ev=sorted([K[k] for k in K if re.fullmatch(r'p\d+',k)]); trous=[round(b2-a,1) for a,b2 in zip(ev,ev[1:]) if b2-a>6]
ok('Rythme : pas de phrase de plus de 6 s',not trous,'phrases trop longues : '+', '.join(map(str,trous)) if trous else '')

# 5. la vidéo finale
if VIDEO:
    v=os.path.join(D,'video.mp4')
    pr=json.loads(subprocess.run(['ffprobe','-v','error','-show_entries','stream=codec_type,width,height:format=duration','-of','json',v],capture_output=True,text=True).stdout)
    vs=[s for s in pr['streams'] if s['codec_type']=='video'][0]; au=[s for s in pr['streams'] if s['codec_type']=='audio']
    ok('Vidéo 1080×1920 avec son',vs['width']==1080 and vs['height']==1920 and bool(au),f"{vs['width']}×{vs['height']}, pistes audio : {len(au)}")
    dv=float(pr['format']['duration']); ok('Durée vidéo = durée prévue',abs(dv-dur)<.6,f'{dv:.1f} s / {dur:.1f} s')
    lo=subprocess.run(['ffmpeg','-i',v,'-af','ebur128','-f','null','-'],capture_output=True,text=True).stderr
    m=re.findall(r'I:\s+(-?[\d.]+) LUFS',lo); I=float(m[-1]) if m else 0
    ok('Son à -14 LUFS (± 1,5)',abs(I+14)<=1.5,f'{I} LUFS')
json.dump(res,open(os.path.join(D,'rapport-controles.json'),'w'),ensure_ascii=False,indent=1)
ko=[r for r in res if not r['ok']]
for r in res: print(('OK   ' if r['ok'] else 'ÉCHEC'),r['controle'],'—',r['detail'])
print(f"\n{len(res)-len(ko)}/{len(res)} contrôles OK" + ("" if not ko else " → CORRIGE LE PLAN ET RELANCE (rien n'est livré tant qu'un contrôle échoue)"))
sys.exit(1 if ko else 0)
