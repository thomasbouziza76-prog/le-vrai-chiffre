/* ════════════════════════════════════════════════════════════════════════════
   BIBLIOTHÈQUE OPTIONNELLE · CARTE ANIMÉE (Natural Earth, domaine public)
   Repris du pilote Non Classée NC-001 (carte.py / couches.py, skia) et réécrit en SVG pour le moteur.
   Données : CARTES[nom], préparées une fois par moteur/outils/prepa_carte.py (cartes livrées : europe, france, monde).
   Dans un plan (scène monde, libre ou mot) :
     s += a.carte(t,{carte:'france', x:0,y:200,w:1080,h:1000, style:'papier',
            vues:[{at:'p2',centre:'FRA'}, {at:'p4',centre:'Rouen',largeur:160}],      // zoom pays → région → ville
            pays:[{code:'FRA',at:'p2+.3',trace:true}], villes:[{nom:'Rouen',at:'p4+.5'}],
            trajets:[{points:['Paris','Rouen'],de:'p5',a:'p6'}] });
   Les temps sont des ancres ('p3+.5') ou des secondes. Aucune requête réseau : tout est dans la page.
   ════════════════════════════════════════════════════════════════════════════ */
(function(){
const B=window.BIBLI=window.BIBLI||{};
const INK='#1c1a17',PAP='#fbf8f2',ACC='#c4552d',GR='#6b645a';
B.STYLES_CARTE={
  // Le Vrai Chiffre : papier crème, trait encre, accent terracotta
  papier:{mer:'#e6ddcd',terre:PAP,trait:INK,frontiere:GR,texte:INK,fondTexte:PAP,accent:ACC,ville:INK,police:'IS',grille:'#d3c7b3'},
  // Non Classée : nuit bleu-vert, traits fins, rouge d'enquête
  nuit:{mer:'#080d0f',terre:'#192528',trait:'#8fa49e',frontiere:'#5f7671',texte:'#d6d8d4',fondTexte:'#080d0f',accent:'#d23c2c',ville:'#d6d8d4',police:'SM',grille:'#22312f'},
};
const cl=(u,a=0,b=1)=>Math.max(a,Math.min(b,u)), L=(a,b,u)=>a+(b-a)*u, r1=n=>Math.round(n*100)/100;
const ease=n=>B.ease?B.ease(n):(u=>u);
const tps=x=>B.tps?B.tps(x):x;
let CTX=null; const largeurTexte=(s,size,font)=>{ if(!CTX) CTX=document.createElement('canvas').getContext('2d'); CTX.font=`700 ${size}px ${font}`; return CTX.measureText(String(s)).width; };
B._n=B._n||0; const uid=p=>p+(++B._n);
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');

// projection identique à prepa_carte.py (km, y vers le bas)
B.carteProj=function(C,lon,lat){ const R=6371, P=C.proj, rad=Math.PI/180;
  if(P.type==='monde'){ const A1=1.340264,A2=-0.081106,A3=0.000893,A4=0.003796,M=Math.sqrt(3)/2;
    let dl=lon-P.lon0; if(dl>180) dl-=360; else if(dl<-180) dl+=360; const l=dl*rad, th=Math.asin(M*Math.sin(lat*rad)), t2=th*th, t6=t2*t2*t2;
    return [R*2*Math.sqrt(3)*l*Math.cos(th)/(3*(9*A4*t6*t2+7*A3*t6+3*A2*t2+A1)), -R*(A4*t6*t2*th+A3*t6*th+A2*t2*th+A1*th)]; }
  const p0=P.lat0*rad,l0=P.lon0*rad,p=lat*rad,l=lon*rad, k=Math.sqrt(2/Math.max(1e-9,1+Math.sin(p0)*Math.sin(p)+Math.cos(p0)*Math.cos(p)*Math.cos(l-l0)));
  return [R*k*Math.cos(p)*Math.sin(l-l0), -R*k*(Math.cos(p0)*Math.sin(p)-Math.sin(p0)*Math.cos(p)*Math.cos(l-l0))]; };
const carteDe=o=>{ const C=(window.CARTES||{})[o.carte||'france']; if(!C) throw new Error('carte inconnue : '+(o.carte||'france')+' (prépare-la avec moteur/outils/prepa_carte.py)'); return C; };
// un lieu → [x,y] en km : nom de ville de la carte, code pays (FRA, BEL…), [lon,lat], ou {km:[x,y]}
B.carteLieu=function(C,p){
  if(Array.isArray(p)) return B.carteProj(C,p[0],p[1]);
  if(p&&p.km) return p.km;
  if(C.villes&&C.villes[p]) return C.villes[p].slice(0,2);
  if(C.centres&&C.centres[p]) return C.centres[p];
  throw new Error('lieu inconnu sur la carte '+C.nom+' : '+JSON.stringify(p)); };
// vue → {cx,cy,larg} ; un code pays sans largeur = le pays cadré avec une marge
const vueKm=(C,v,o)=>{ let cx,cy,larg=v.largeur;
  if(typeof v.centre==='string'&&C.boites&&C.boites[v.centre]&&!(C.villes&&C.villes[v.centre])){ const b=C.boites[v.centre], m=v.marge??1.25;
    cx=(b[0]+b[2])/2; cy=(b[1]+b[3])/2; if(!larg) larg=Math.max(b[2]-b[0], (b[3]-b[1])*o.w/o.h)*m; }
  else { [cx,cy]=B.carteLieu(C,v.centre??[C.proj.lon0,C.proj.lat0]); }
  if(v.decal){ cx+=v.decal[0]; cy+=v.decal[1]; }
  return {cx,cy,larg:larg||1200}; };
// la caméra de la carte à l'instant t : on passe d'une vue à la suivante en « at » pendant « duree » (zoom en logarithme,
// le point visé glisse vers le centre en même temps que le zoom : esprit motion-canvas-camera du pilote)
B.carteVue=function(t,o){ const C=carteDe(o); o=Object.assign({x:0,y:0,w:1080,h:1920},o);
  const V=(o.vues&&o.vues.length?o.vues:[{at:0,centre:o.centre,largeur:o.largeur}]).map(v=>Object.assign({},v,{t:tps(v.at??0)},vueKm(C,v,o)));
  let a=V[0], res={cx:a.cx,cy:a.cy,larg:a.larg};
  for(let k=1;k<V.length;k++){ const b=V[k], d=b.duree??.9; if(t<=b.t) break; const u=ease(b.ease||'expo.inOut')(cl((t-b.t)/d)), p=V[k-1];
    const w0=res.larg, w1=b.larg, c0=[res.cx,res.cy], w=Math.exp(L(Math.log(w0),Math.log(w1),u));
    const g=Math.abs(Math.log(w1/w0))>.05?(w-w1)/(w0-w1):1-u;
    res={cx:b.cx+(c0[0]-b.cx)*g, cy:b.cy+(c0[1]-b.cy)*g, larg:w}; }
  // dérive lente (la caméra ne s'arrête jamais) : o.derive = % de la largeur par seconde (défaut 0,6 %)
  const dr=(o.derive??.006)*res.larg; res.cx+=dr*Math.sin(t*.37); res.cy+=dr*.6*Math.cos(t*.29);
  res.s=o.w/res.larg; return res; };
// position à l'écran (coordonnées du dessin) d'un lieu à l'instant t : pour y poser Tico, une flèche, une étiquette…
B.carteXY=function(t,o,lieu){ const C=carteDe(o), v=B.carteVue(t,o), q=B.carteLieu(C,lieu), x0=o.x??0, y0=o.y??0;
  return [x0+(o.w??1080)/2+(q[0]-v.cx)*v.s, y0+(o.h??1920)/2+(q[1]-v.cy)*v.s]; };

// texte gravé (révélé de gauche à droite au burin), en coordonnées du dessin
B.grave=function(x,y,s,p,o={}){ if(p<=0) return ''; const S=B.STYLES_CARTE[o.style||'papier']||B.STYLES_CARTE.papier, size=o.taille||40, font=o.police||S.police,
  ls=o.espace??(font==='SM'?size*.08:size*.02), w=largeurTexte(s,size,font)+ls*String(s).length, x0=o.align==='c'?x-w/2:o.align==='r'?x-w:x, id=uid('gv'),
  edge=x0-size*.3+(w+size*.6)*cl(p), col=o.couleur||S.texte;
  let r=`<clipPath id="${id}"><rect x="${r1(x0-size)}" y="${r1(y-size*1.4)}" width="${r1(Math.max(0,edge-x0+size))}" height="${r1(size*2.2)}"/></clipPath>`+
    `<g clip-path="url(#${id})" opacity="${r1(o.op??1)}"><text data-t="1" x="${r1(x0)}" y="${r1(y)}" font-family="${font}" font-weight="700" font-size="${r1(size)}" letter-spacing="${r1(ls)}" fill="${col}" stroke="${o.halo||S.fondTexte}" stroke-width="${r1(size*.16)}" stroke-linejoin="round" paint-order="stroke">${esc(s)}</text>`;
  if(o.trait) r+=`<rect x="${r1(x0)}" y="${r1(y+size*.22)}" width="${r1(w)}" height="${r1(Math.max(2,size*.06))}" fill="${S.accent}"/>`;
  r+='</g>'; if(p>.02&&p<.98) r+=`<circle cx="${r1(edge)}" cy="${r1(y-size*.3)}" r="${r1(size*.1)}" fill="${o.etincelle||S.accent}" opacity=".7"/>`; return r; };

B.carte=function(t,o){
  const C=carteDe(o); o=Object.assign({x:0,y:0,w:1080,h:1920,style:'papier'},o);
  const S=Object.assign({},B.STYLES_CARTE[o.style]||B.STYLES_CARTE.papier,o.couleurs||{});
  const fin=o.fin!==undefined?tps(o.fin):Infinity, deb=o.debut!==undefined?tps(o.debut):-Infinity;
  const op=(o.op??1)*cl((t-deb)/.35+1e-9)*cl((fin-t)/.35+1e-9); if(op<=.003) return '';
  const v=B.carteVue(t,o), s=v.s, px=n=>r1(n/s), id=uid('ct');
  const X=q=>o.x+o.w/2+(q[0]-v.cx)*s, Y=q=>o.y+o.h/2+(q[1]-v.cy)*s;
  let out=`<g opacity="${r1(op)}"><clipPath id="${id}"><rect x="${o.x}" y="${o.y}" width="${o.w}" height="${o.h}" rx="${o.rayon??0}"/></clipPath><g clip-path="url(#${id})">`+
    `<rect x="${o.x}" y="${o.y}" width="${o.w}" height="${o.h}" fill="${S.mer}"/>`;
  out+=`<g transform="translate(${r1(o.x+o.w/2)} ${r1(o.y+o.h/2)}) scale(${s.toFixed(5)}) translate(${r1(-v.cx)} ${r1(-v.cy)})">`;
  // niveau de détail : la couche 1:10 M apparaît quand on zoome dans sa boîte
  const dw=C.boiteDetail?C.boiteDetail[2]-C.boiteDetail[0]:0, ad=C.detail&&dw?cl((1.6*dw-v.larg)/(.6*dw)):0;
  const lw=o.epaisseur||2.2;
  for(const k in C.large){ if(ad>=1&&C.detail[k]) continue; const a=(C.detail&&C.detail[k])?1-ad:1;
    out+=`<path d="${C.large[k].d}" fill="${S.terre}" fill-opacity="${r1(a)}" stroke="${S.frontiere}" stroke-opacity="${r1(a)}" stroke-width="${px(lw)}" stroke-linejoin="round"/>`; }
  if(ad>0) for(const k in C.detail) out+=`<path d="${C.detail[k].d}" fill="${S.terre}" fill-opacity="${r1(ad)}" stroke="${S.frontiere}" stroke-opacity="${r1(ad)}" stroke-width="${px(lw)}" stroke-linejoin="round"/>`;
  if(C.admin1&&ad>0){ const aa=ad*cl((.9*dw-v.larg)/(.4*dw)); if(aa>.01) out+=`<path d="${C.admin1}" fill="none" stroke="${S.frontiere}" stroke-opacity="${r1(.55*aa)}" stroke-width="${px(lw*.6)}" stroke-dasharray="${px(7)} ${px(5)}"/>`; }
  // pays mis en avant : contour tracé au feutre puis remplissage
  for(const p of o.pays||[]){ const t0=tps(p.at??0); if(t<t0) continue; const g=(ad>0&&C.detail&&C.detail[p.code])?C.detail[p.code]:C.large[p.code]; if(!g) continue;
    const col=p.couleur||S.accent, tr=p.trace?ease('power2.inOut')(cl((t-t0)/(p.duree??.9))):1, fi=cl((t-t0-(p.trace?(p.duree??.9)*.6:0))/.5)*(p.remplir??.85);
    const pf=p.fin!==undefined?cl((tps(p.fin)-t)/.4):1;
    if(fi>0) out+=`<path d="${g.d}" fill="${col}" fill-opacity="${r1(fi*pf)}"/>`;
    out+=`<path d="${g.d}" fill="none" stroke="${col}" stroke-width="${px(p.ep||5)}" stroke-linejoin="round" pathLength="1" stroke-dasharray="${tr>=.999?'none':tr.toFixed(4)+' 2'}" opacity="${r1(pf)}"/>`; }
  // zones (cercle en pointillés autour d'un lieu, rayon en km)
  for(const z of o.zones||[]){ const t0=tps(z.at??0); if(t<t0) continue; const q=B.carteLieu(C,z.centre), u=ease('back.out(1.8)')(cl((t-t0)/.45));
    out+=`<circle cx="${r1(q[0])}" cy="${r1(q[1])}" r="${r1((z.rayon||20)*u)}" fill="${z.couleur||S.accent}" fill-opacity=".12" stroke="${z.couleur||S.accent}" stroke-width="${px(4)}" stroke-dasharray="${px(12)} ${px(9)}"/>`; }
  // trajets : un trait qui se trace d'un lieu à l'autre (courbe légère), tête ronde qui avance
  const tetes=[];
  for(const tj of o.trajets||[]){ const t0=tps(tj.de), t1=tps(tj.a??(t0+1.2)); if(t<t0) continue; const u=ease(tj.ease||'power1.inOut')(cl((t-t0)/(t1-t0||1e-6)));
    const P=tj.points.map(q=>B.carteLieu(C,q)); let d=`M${r1(P[0][0])} ${r1(P[0][1])}`; const segs=[];
    for(let i=1;i<P.length;i++){ const a=P[i-1], b=P[i], dx=b[0]-a[0], dy=b[1]-a[1], k=tj.courbe??.18, c=[(a[0]+b[0])/2-dy*k,(a[1]+b[1])/2+dx*k]; segs.push([a,c,b]); d+=` Q${r1(c[0])} ${r1(c[1])} ${r1(b[0])} ${r1(b[1])}`; }
    const col=tj.couleur||S.accent;
    out+=`<path d="${d}" fill="none" stroke="${col}" stroke-width="${px(tj.ep||7)}" stroke-linecap="round" pathLength="1" stroke-dasharray="${u>=.999?'none':u.toFixed(4)+' 2'}"/>`;
    if(u>0&&u<1){ const f=u*segs.length, i=Math.min(segs.length-1,Math.floor(f)), w=f-i, [a,c,b]=segs[i];
      tetes.push([(1-w)*(1-w)*a[0]+2*w*(1-w)*c[0]+w*w*b[0],(1-w)*(1-w)*a[1]+2*w*(1-w)*c[1]+w*w*b[1],col]); } }
  out+='</g>';
  for(const h of tetes) out+=`<circle cx="${r1(X(h))}" cy="${r1(Y(h))}" r="13" fill="${h[2]}" stroke="${S.fondTexte}" stroke-width="4"/>`;
  // villes : point qui se pose + nom gravé (taille écran constante)
  for(const vi of o.villes||[]){ const t0=tps(vi.at??0); if(t<t0) continue; const q=B.carteLieu(C,vi.lieu??vi.nom), x=X(q), y=Y(q), u=ease('back.out(2.2)')(cl((t-t0)/.4));
    const pf=vi.fin!==undefined?cl((tps(vi.fin)-t)/.4):1; if(pf<=0) continue; const col=vi.couleur||(vi.accent?S.accent:S.ville);
    if(vi.onde!==false){ const w=cl((t-t0)/.9); if(w<1) out+=`<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(14+70*w)}" fill="none" stroke="${col}" stroke-width="${r1(6*(1-w))}" opacity="${r1((1-w)*pf)}"/>`; }
    out+=`<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(12*u)}" fill="${col}" stroke="${S.fondTexte}" stroke-width="4" opacity="${r1(pf)}"/>`;
    const lab=vi.txt??String(vi.nom).toUpperCase(), tl=vi.taille||40, dx=vi.cote==='g'?-26:26;
    out+=B.grave(x+dx,y+tl*.36,lab,ease('grave')(cl((t-t0-.12)/.55)),{taille:tl,style:o.style,align:vi.cote==='g'?'r':'l',op:pf,trait:vi.trait}); }
  // étiquettes libres (nom de pays, de mer…) gravées à un lieu
  for(const e of o.etiquettes||[]){ const t0=tps(e.at??0); if(t<t0) continue; const q=B.carteLieu(C,e.lieu), pf=e.fin!==undefined?cl((tps(e.fin)-t)/.4):1; if(pf<=0) continue;
    out+=B.grave(X(q)+(e.decal?.[0]||0),Y(q)+(e.decal?.[1]||0),e.txt,ease('grave')(cl((t-t0)/.6)),{taille:e.taille||46,style:o.style,align:'c',op:pf,trait:e.trait,couleur:e.couleur}); }
  out+='</g>';
  if(o.cadre!==false) out+=`<rect x="${o.x}" y="${o.y}" width="${o.w}" height="${o.h}" rx="${o.rayon??0}" fill="none" stroke="${S.trait}" stroke-width="${o.cadre??6}"/>`;
  return out+'</g>';
};
})();
