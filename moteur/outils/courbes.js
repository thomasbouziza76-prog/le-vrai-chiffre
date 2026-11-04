/* ════════════════════════════════════════════════════════════════════════════
   BIBLIOTHÈQUE OPTIONNELLE · COURBES D'ACCÉLÉRATION (façon GSAP / CustomEase)
   Fonctions pures u ∈ [0,1] → valeur (peut dépasser 1 : back, elastic, CustomEase).
   Code écrit pour le moteur (formules classiques de Robert Penner, domaine public d'usage) :
   AUCUNE ligne de GSAP n'est embarquée, aucune dépendance, aucun réseau.
   Noms identiques à GSAP pour pouvoir recopier une timeline validée (pilote Non Classée NC-001) :
     'power1'…'power4', 'quad', 'cubic', 'quart', 'quint', 'sine', 'expo', 'circ', 'back(1.7)', 'elastic(1,0.3)',
     'bounce', 'steps(5)', 'none'/'linear', suffixe '.in' / '.out' / '.inOut' (sans suffixe = '.out', comme GSAP).
   Courbes maison du pilote : 'frappe' (tampon : chute, écrasement, rebond), 'grave' (burin : attaque nette, fin lente),
   'souffle'. Et BIBLI.customEase('M0,0 C…') pour en créer une à partir d'un tracé (format CustomEase).
   Utilisation dans un plan : a.ease('expo.inOut')(u) · a.tween(t,'p3',.6,'back.out(1.6)') · a.piste(t,[['p3',0],['p4',1,'expo.inOut']])
   ════════════════════════════════════════════════════════════════════════════ */
(function(){
const B=window.BIBLI=window.BIBLI||{};
const cl=u=>u<0?0:u>1?1:u;
// temps : un nombre (secondes) ou une ancre du plan ('p3+.5') résolue par le moteur (fonction T de moteur.js)
B.tps=x=>typeof x==='number'?x:(typeof T==='function'?T(x):0);

// ── formes de base (version « in ») ──
const IN={
  none:u=>u, linear:u=>u,
  power0:u=>u, power1:u=>u*u, power2:u=>u*u*u, power3:u=>u*u*u*u, power4:u=>u*u*u*u*u,
  sine:u=>1-Math.cos(u*Math.PI/2),
  expo:u=>u<=0?0:Math.pow(2,10*(u-1)),
  circ:u=>1-Math.sqrt(Math.max(0,1-u*u)),
};
IN.quad=IN.power1; IN.cubic=IN.power2; IN.quart=IN.power3; IN.quint=IN.power4; IN.strong=IN.power4;
const backIn=s=>u=>u*u*((s+1)*u-s);
const bounceOut=u=>{ const n=7.5625,d=2.75;
  if(u<1/d) return n*u*u; if(u<2/d) return n*(u-=1.5/d)*u+.75; if(u<2.5/d) return n*(u-=2.25/d)*u+.9375; return n*(u-=2.625/d)*u+.984375; };
const elasticOut=(amp,per)=>{ const a=Math.max(1,amp), s=per/(2*Math.PI)*Math.asin(1/a);
  return u=>u<=0?0:u>=1?1:a*Math.pow(2,-10*u)*Math.sin((u-s)*(2*Math.PI)/per)+1; };
const mk={  // « in » → in / out / inOut
  in:f=>u=>f(cl(u)), out:f=>u=>1-f(1-cl(u)), inOut:f=>u=>{u=cl(u);return u<.5?f(2*u)/2:1-f(2*(1-u))/2;} };
const CACHE={};
// a.ease('expo.inOut') → fonction ; accepte aussi une fonction (renvoyée telle quelle)
B.ease=function(nom){
  if(typeof nom==='function') return nom; if(!nom) nom='power1.out';
  if(CACHE[nom]) return CACHE[nom];
  if(B.CUSTOM[nom]) return CACHE[nom]=B.CUSTOM[nom];
  const m=String(nom).match(/^([a-zA-Z0-9]+)(?:\.(in|out|inOut))?(?:\(([^)]*)\))?$/); if(!m) throw new Error('courbe inconnue : '+nom);
  const base=m[1], type=m[2]||'out', args=(m[3]||'').split(',').filter(x=>x.trim()!=='').map(Number);
  let fin;
  if(base==='back') fin=backIn(args[0]??1.70158);
  else if(base==='bounce') fin=u=>1-bounceOut(1-u);
  else if(base==='elastic'){ const eo=elasticOut(args[0]??1,args[1]??.3); fin=u=>1-eo(1-u); }
  else if(base==='steps'){ const n=Math.max(1,args[0]||1); return CACHE[nom]=u=>Math.min(1,Math.floor(cl(u)*n)/n); }
  else fin=IN[base];
  if(!fin) throw new Error('courbe inconnue : '+nom);
  return CACHE[nom]=mk[type](fin);
};
// courbe de Bézier cubique CSS (x1,y1,x2,y2) : résolution de x par Newton puis dichotomie
B.cubicBezier=function(x1,y1,x2,y2){
  const bz=(a,b,u)=>3*a*u*(1-u)*(1-u)+3*b*u*u*(1-u)+u*u*u, dbz=(a,b,u)=>3*a*(1-u)*(1-u)+6*(b-a)*u*(1-u)+3*(1-b)*u*u;
  return x=>{ x=cl(x); let u=x; for(let i=0;i<8;i++){ const e=bz(x1,x2,u)-x, d=dbz(x1,x2,u); if(Math.abs(e)<1e-6) return bz(y1,y2,u); if(Math.abs(d)<1e-6) break; u-=e/d; }
    let lo=0,hi=1; u=x; for(let i=0;i<40;i++){ const v=bz(x1,x2,u); if(Math.abs(v-x)<1e-6) break; if(v<x) lo=u; else hi=u; u=(lo+hi)/2; } return bz(y1,y2,u); };
};
// CustomEase : tracé SVG normalisé (M0,0 … 1,1), commandes M/L/C (absolues ou relatives). Échantillonné une fois, puis lu.
B.customEase=function(d){
  const tok=String(d).match(/[MLCmlc]|-?\d*\.?\d+(?:e[-+]?\d+)?/g)||[]; const pts=[]; let i=0, cmd='M', x=0, y=0;
  const num=()=>parseFloat(tok[i++]);
  while(i<tok.length){ if(/[MLCmlc]/.test(tok[i])) cmd=tok[i++];
    const rel=cmd===cmd.toLowerCase(), C=cmd.toUpperCase(), ox=rel?x:0, oy=rel?y:0;
    if(C==='M'||C==='L'){ x=ox+num(); y=oy+num(); if(C==='M'&&!pts.length) pts.push([x,y]); else { const p=pts[pts.length-1]; for(let k=1;k<=8;k++) pts.push([p[0]+(x-p[0])*k/8,p[1]+(y-p[1])*k/8]); } if(C==='M') cmd=rel?'l':'L'; }
    else if(C==='C'){ const p0=[x,y], p1=[ox+num(),oy+num()], p2=[ox+num(),oy+num()], p3=[ox+num(),oy+num()];
      for(let k=1;k<=120;k++){ const u=k/120, a=(1-u)**3, b=3*u*(1-u)**2, c=3*u*u*(1-u), e=u**3; pts.push([a*p0[0]+b*p1[0]+c*p2[0]+e*p3[0], a*p0[1]+b*p1[1]+c*p2[1]+e*p3[1]]); }
      x=p3[0]; y=p3[1]; }
    else i++; }
  // lecture : y en fonction de x (x croissant le long du tracé)
  for(let k=1;k<pts.length;k++) if(pts[k][0]<pts[k-1][0]) pts[k][0]=pts[k-1][0];
  return u=>{ u=cl(u); let lo=0,hi=pts.length-1; while(hi-lo>1){ const m=(lo+hi)>>1; if(pts[m][0]<=u) lo=m; else hi=m; }
    const a=pts[lo], b=pts[hi], w=b[0]-a[0]; return w<1e-9?b[1]:a[1]+(b[1]-a[1])*(u-a[0])/w; };
};
// courbes maison validées sur NC-001 (mêmes tracés que anim/timeline.cjs du pilote)
B.CUSTOM={
  frappe:B.customEase('M0,0 C0.2,0 0.35,0.62 0.5,1.12 0.62,0.94 0.76,1.03 1,1'),   // tampon : chute, écrasement, rebond
  grave:B.customEase('M0,0 C0.12,0.02 0.22,0.7 0.48,0.9 0.7,1 0.84,1 1,1'),        // burin : attaque nette, fin lente
  souffle:B.customEase('M0,0 C0.4,0 0.3,1 1,1'),
};
// un tween : progression 0 → 1 (courbée) qui commence à « at » et dure « duree » secondes
B.tween=function(t,at,duree,ease){ const t0=B.tps(at); return B.ease(ease||'power2.out')(cl((t-t0)/(duree||1e-6))); };
// une piste à la GSAP (paramètre de position) : cles = [[at, valeur], [at, valeur, ease, duree?], …]
// la valeur part de la clé précédente et ARRIVE à « at » (ou commence à « at » et dure « duree » si duree est donné)
B.piste=function(t,cles){
  if(!cles||!cles.length) return 0; let v=cles[0][1];
  for(let k=1;k<cles.length;k++){ const c=cles[k], v0=cles[k-1][1], fin=B.tps(c[0]), deb=c[3]!==undefined?fin:B.tps(cles[k-1][0]), dur=c[3]!==undefined?c[3]:fin-deb;
    if(t<=deb) break; const u=dur<=0?1:cl((t-deb)/dur); v=v0+(c[1]-v0)*B.ease(c[2]||'power2.inOut')(u); }
  return v;
};
})();
