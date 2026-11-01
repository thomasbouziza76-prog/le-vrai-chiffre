/* ════════════════════════════════════════════════════════════════════════════
   MOTEUR « Le Vrai Chiffre » — motion design d'abord, Tico invité.
   Tiré de la N°08 (« Riche ou classe moyenne ? »), validée par Thomas.
   La tâche n'écrit PAS d'animation : elle écrit plan.js (voir moteur/PLAN.md).
   Le moteur garantit : caméra qui bouge (≤ 2,6 s entre deux images clés),
   cartons à fond crème, sous-titres groupés, pastille Abonne-toi, Tico petit,
   transformations de données, bruitages calés sur la voix.
   ════════════════════════════════════════════════════════════════════════════ */
const S=document.getElementById('s');
const INK='#1c1a17',PAP='#fbf8f2',GR='#6b645a',ACC='#c4552d',CR='#f6f1e8',BLEU='#8fb7d8',ROSE='#e9b39d',GRIS='#d6cec2';
const cl=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)), L=(a,b,u)=>a+(b-a)*u, sg=(t,a,b)=>cl((t-a)/(b-a||1e-6));
const eo=u=>1-Math.pow(1-cl(u),3), ei=u=>Math.pow(cl(u),3), eio=u=>{u=cl(u);return u<.5?4*u*u*u:1-Math.pow(-2*u+2,3)/2;};
const bk=u=>{u=cl(u);const c1=1.9,c3=c1+1;return 1+c3*Math.pow(u-1,3)+c1*Math.pow(u-1,2);};
const f=n=>Math.round(n*10)/10;
let CTX; const tw=(s,size,font)=>{CTX.font=`700 ${size}px ${font}`;return CTX.measureText(String(s).replace(/<[^>]+>/g,'')).width;};
function txt(x,y,size,font,fill,s,o={}){
  return `<text data-t="${o.axe?2:1}" x="${f(x)}" y="${f(y)}" font-family="${font}" font-weight="700" font-size="${f(size)}" fill="${fill}" text-anchor="${o.a||'middle'}" letter-spacing="${o.ls??(font==='IS'?-size*.035:0)}" opacity="${f(o.op??1)}" ${o.tr?`transform="${o.tr}"`:''}>${s}</text>`;}
const G=1300;                                  // le sol (monde)
const Y=z=>G-210/z;                            // y caméra pour que le sol tombe à y≈1170 écran (au-dessus des sous-titres)
const fmt=(v,u='€')=>{const s=Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g,' ');return u?s+' '+u:s;};

/* ───── temps : ancres « p3 », « p3+.5 », « p3_fin », « pop », nombre ───── */
const K=TIMING.K;
function T(a,def){ if(a===undefined||a===null) return def; if(typeof a==='number') return a;
  const m=String(a).match(/^([A-Za-z0-9_]+)\s*([+-]\s*[\d.]+)?$/); if(!m||K[m[1]]===undefined) throw new Error('ancre inconnue : '+a);
  return K[m[1]]+(m[2]?parseFloat(m[2].replace(/\s/g,'')):0); }
const PH=Object.keys(K).filter(k=>/^p\d+$/.test(k)).sort((a,b)=>K[a]-K[b]);
const nextPh=t=>{ for(const p of PH) if(K[p]>t+.05) return K[p]; return K.end; };

/* ───── sons et secousses : chaque scène les déclare ───── */
const SFX=[], SHAKES=[];
const son=(t,n,g=.25)=>SFX.push([+t.toFixed(2),n,g]);
const secousse=(t,a=12)=>SHAKES.push([t,a]);

/* ───── personnages ───── */
const ACCS={
  lunettes:`<g transform="translate(0 -335)"><rect x="-82" y="-24" width="74" height="46" rx="16" fill="${INK}"/><rect x="8" y="-24" width="74" height="46" rx="16" fill="${INK}"/><path d="M-8 -8 H8" stroke="${INK}" stroke-width="8"/><path d="M-70 -14 l20 0" stroke="#fff" stroke-width="5" opacity=".5"/></g>`,
  cravate:`<path d="M0 -175 l-22 22 l22 110 l22 -110 Z" fill="${ACC}" stroke="${INK}" stroke-width="5"/>`,
  casquette:`<g transform="translate(0 -430)"><path d="M-110 40 Q-100 -40 0 -45 Q100 -40 110 40 Z" fill="${BLEU}" stroke="${INK}" stroke-width="6"/><path d="M60 40 h110 q10 0 0 14 h-120 Z" fill="${BLEU}" stroke="${INK}" stroke-width="6"/></g>`,
  noeud:`<path d="M-40 -390 l-40 -25 v50 Z M40 -390 l40 -25 v50 Z" fill="${ACC}" stroke="${INK}" stroke-width="5"/><circle cx="0" cy="-390" r="14" fill="${ACC}" stroke="${INK}" stroke-width="5"/>`,
};
const HUMEURS={
  content:{mouth:'smile'}, salut:{mouth:'grin',armR:[60,-110],handR:'open',look:[.6,-.6]},
  surpris:{mouth:'o',brows:'up'}, inquiet:{mouth:'wavy',brows:'worried',sweat:.6}, choque:{mouth:'o',brows:'up',look:[0,1],armL:[-80,-40],armR:[80,-40]},
  fier:{mouth:'grin',cheeks:true,brows:'up',armL:[-70,-100],armR:[70,-100]}, pense:{mouth:'flat',look:[1,-.4]},
  hausse:{mouth:'flat',brows:'up',armL:[-90,-40],armR:[90,-40],look:[0,-.3]}, triste:{mouth:'wavy',brows:'worried',look:[0,1]},
  rit:{mouth:'open',cheeks:true,brows:'up'}, montre:{mouth:'smile',armR:[70,-60],look:[1,0]}, saute:{mouth:'grin',cheeks:true,brows:'up',armL:[-70,-100],armR:[70,-100],saut:1},
};
function humeur(qui,t){ let h='content',t0=-9; for(const [a,q,hh] of (PLAN.humeurs||[])) if(q===qui&&t>=T(a)&&T(a)>=t0){h=hh;t0=T(a);} return [h,t0]; }
function perso(qui,pos,t,extra={}){
  const P=(PLAN.persos||{})[qui]||{}; const [h,t0]=humeur(qui,t); const H=Object.assign({},HUMEURS[h]||HUMEURS.content);
  const o=Object.assign({x:pos.x,y:pos.y,scale:pos.s,fill:P.couleur||undefined,look:[0,-.4]},H,extra);
  if(P.accessoire&&ACCS[P.accessoire]) o.extra=(o.extra||'')+ACCS[P.accessoire];
  if(H.saut){ const u=sg(t,t0,t0+.35); o.y-=70*Math.sin(Math.PI*u); }
  if(h==='inquiet') o.sweat=cl((t-t0)*1.5);
  o.sy=1+.025*Math.sin(t*5+(qui==='droite'?1:0));
  return `<g data-role="perso">${Ticket.svg(o)}</g>`; }

/* ═════════════════════════════ SCÈNES ═════════════════════════════
   Chaque scène : init(sc) → place la scène dans le monde (sc.ox), déclare caméra + sons ;
   monde(t) → SVG dans le monde ; ecran(t) → SVG par-dessus (optionnel) ;
   poser(t,qui) → {x,y,s} où se tient le personnage, ou null.                       */
const SCENES={};

/* ── DUEL : deux personnes, deux chiffres → deux barres (puis morph vers une « vague ») ── */
SCENES.duel={
  init(sc){ sc.t0=T(sc.de,0); sc.t1=T(sc.a); sc.tD=T(sc.droite.at,sc.t0+2); sc.tB=T(sc.barres,sc.tD+2.2);
    const g=sc.gauche,d=sc.droite; sc.kd=720/Math.max(g.valeur,d.valeur); sc.XG=sc.ox+540; sc.XD=sc.ox+2040;
    sc.cams=[[sc.t0,sc.XG,Y(1),1,0],[sc.tD-.3,sc.XG,Y(1.14),1.14,0],[sc.tD+.12,sc.XD,Y(1.02),1.02,0],[sc.tB-.2,sc.XD,Y(1.14),1.14,0],
             [sc.tB+.5,(sc.XG+sc.XD)/2,Y(.55),.55,0],[sc.tB+1.6,(sc.XG+sc.XD)/2,Y(.52),.52,-1.5]];
    (sc.etiquettes||[]).forEach((e,i)=>{ if(i>0) sc.cams.push([T(e.at)+.4,sc.XD-120,640,.78,-3]); });
    if(sc.tampon){ const e2=(sc.etiquettes||[]).slice(-1)[0]; if(e2) sc.cams.push([T(sc.tampon.at)-.5,sc.XD-140,650,.74,-1]); } if(sc.tampon) sc.cams.push([T(sc.tampon.at)-.2,(sc.XG+sc.XD)/2,Y(.55),.55,0],[T(sc.tampon.at)+.6,(sc.XG+sc.XD)/2-50,Y(.5),.5,0]);
    son(sc.t0+.02,'coup-1',.35); son(sc.t0+.05,'pop',.3); son(sc.tD-.15,'whoosh-short',.3); son(sc.tD+.1,'pop',.3); son(sc.tD+.3,'caisse-ching',.25);
    son(sc.tB+.05,'whoosh',.25); son(sc.tB+.2,'clic-1',.3); son(sc.tB+.32,'clic-2',.3); secousse(sc.t0+.2,8); secousse(sc.tD+.25,10);
    (sc.etiquettes||[]).forEach(e=>son(T(e.at)+.25,'papier-froisse',.3)); (sc.bulles||[]).forEach(b=>son(T(b.at)+.2,'pop',.25));
    if(sc.tampon){ son(T(sc.tampon.at)+.15,'tampon',.35); secousse(T(sc.tampon.at)+.05,14); }
    sc.mv=t=>sc.vers?eio(sg(t,sc.t1,sc.t1+1.4)):0; },
  monde(t,sc){ if(t<sc.t0-.3||(sc.vers&&t>sc.t1+1.5)) return ''; let s=''; const g=sc.gauche,d=sc.droite, mv=sc.mv(t), V=sc.vers;
    const n1=t<sc.tB+.6;
    if(n1){ const dd=t<sc.t0+.25?1.12-.12*eo((t-sc.t0)/.25):1, sh=sg(t,sc.tB,sc.tB+.6);
      s+=`<g transform="translate(${sc.XG} ${800+sh*300}) scale(${f(dd*(1-.7*eo(sh)))}) translate(${-sc.XG} -800)">`+txt(sc.XG,870,190,'IS',INK,g.texte||fmt(g.valeur))+(g.label?txt(sc.XG,690,38,'SM',GR,g.label,{ls:3}):'')+'</g>';
      if(t>sc.tD-.15){ const p=bk(sg(t,sc.tD-.15,sc.tD+.25));
        s+=`<g opacity="${f(cl(p*2))}" transform="translate(${sc.XD} ${800+sh*200}) scale(${f(p*(1-.6*eo(sh)))}) translate(${-sc.XD} -800)">`+txt(sc.XD,870,190,'IS',ACC,d.texte||fmt(d.valeur))+(d.label?txt(sc.XD,690,38,'SM',GR,d.label,{ls:3}):'')+'</g>'; } }
    if(t>sc.tB){ for(const [x0,v,c,tx,i0] of [[sc.XG,g.valeur,INK,g.texte||fmt(g.valeur),V?V.iG:0],[sc.XD,d.valeur,ACC,d.texte||fmt(d.valeur),V?V.iD:0]]){
        const hEnd=V?v*V.k:v*sc.kd, h=L(v*sc.kd,hEnd,mv)*bk(sg(t,sc.tB+(c===ACC?.1:0),sc.tB+(c===ACC?.8:.7))), w=L(170,V?V.BW:170,mv), x=V?L(x0,V.BX(i0)+V.BW/2,mv):x0;
        s+=`<rect x="${f(x-w/2)}" y="${f(G-h)}" width="${f(w)}" height="${f(h)}" fill="${c===ACC?ACC:PAP}" stroke="${INK}" stroke-width="${f(L(7,4,mv))}"/>`;
        if(mv<.6) s+=txt(x,G-h-30,64,'IS',INK,tx,{op:1-mv/.6}); }
      const ets=sc.etiquettes||[];
      if(ets.length&&t>T(ets[0].at)&&t<sc.t1){ const yb=G-d.valeur*sc.kd-150; let k=0; for(let i=0;i<ets.length;i++) if(t>=T(ets[i].at)) k=i;
        const tk=T(ets[k].at), fl=k===0?1:sg(t,tk,tk+.35), sy=k===0?1:Math.abs(Math.cos(Math.PI*fl)), lab=(k>0&&fl<.5)?ets[k-1].txt:ets[k].txt;
        const p=bk(sg(t,T(ets[0].at),T(ets[0].at)+.35)), w=tw(lab,62,'IS')+80;
        s+=`<g transform="translate(${sc.XD} ${f(yb)}) scale(${f(p)} ${f(p*sy)})"><rect x="${f(-w/2)}" y="-55" width="${f(w)}" height="110" rx="10" fill="${INK}"/>`+txt(0,22,62,'IS',CR,lab)+`</g>`;
        if(sc.tampon&&t>T(sc.tampon.at)){ const cr=sg(t,T(sc.tampon.at)+.15,T(sc.tampon.at)+.45); s+=`<path d="M${f(sc.XD-w/2-20)} ${f(yb+60)} L${f(sc.XD-w/2-20+(w+40)*cr)} ${f(yb-60)}" stroke="${ACC}" stroke-width="16" stroke-linecap="round"/>`; } }
      for(const b of (sc.bulles||[])){ const t0=T(b.at), t1=T(b.fin,nextPh(t0)+.1); if(t<t0||t>t1) continue; const p=bk(sg(t,t0,t0+.3))*(1-ei(sg(t,t1-.25,t1)));
        const w=tw(b.txt,52,'IS')+70, x=b.qui==='droite'?sc.XD+40:sc.XG+220, y=b.qui==='droite'?G-d.valeur*sc.kd-320:820;
        s+=`<g transform="translate(${f(x)} ${f(y)}) scale(${f(p)})"><rect x="${f(-w/2)}" y="-60" width="${f(w)}" height="100" rx="50" fill="#fff" stroke="${INK}" stroke-width="6"/><circle cx="${f(-w/2+60)}" cy="62" r="16" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="${f(-w/2+38)}" cy="96" r="9" fill="#fff" stroke="${INK}" stroke-width="5"/>`+txt(0,8,52,'IS',INK,b.txt)+'</g>'; }
      if(sc.tampon){ const ta=T(sc.tampon.at); if(t>ta+.15&&t<sc.t1){ const p=sg(t,ta+.15,ta+.3); for(const x of [sc.XG,sc.XD]) s+=`<g transform="translate(${x} ${G-120}) rotate(-12) scale(${f(L(2,1,ei(p)))})" opacity="${f(cl(p*3))}"><rect x="-150" y="-62" width="300" height="104" fill="none" stroke="${ACC}" stroke-width="10"/>`+txt(0,20,72,'SM',ACC,sc.tampon.txt||'FAUX',{ls:6})+'</g>'; } } }
    return s; },
  poser(t,qui,sc){ if(t<sc.t0-.3) return null; if(qui==='droite'&&t<sc.tD-.1) return null; const V=sc.vers, mv=sc.mv(t), v=qui==='gauche'?sc.gauche.valeur:sc.droite.valeur;
    const x0=qui==='gauche'?sc.XG:sc.XD, ax=qui==='gauche'?150:170, p=qui==='droite'?(.6+.4*bk(sg(t,sc.tD-.1,sc.tD+.3))):1;
    if(!V||mv<=0) return {x:x0+ax,y:G,s:.62*p};
    const xE=V.BX(qui==='gauche'?V.iG:V.iD)+V.BW/2, hE=v*V.k;
    return {x:L(x0+ax,xE,mv),y:G-(hE*eo(mv)+180*Math.sin(Math.PI*mv)),s:L(.62,.5,mv)}; },
};

/* ── VAGUE : N barres classées (distribution), repères, seuil, bulle qui éclate ── */
function lognormale(med,moy,n=100){ const sig=Math.sqrt(2*Math.log(moy/med)); const pr=p=>{ // probit (Acklam)
    const a=[-39.69683028665376,220.9460984245205,-275.9285104469687,138.357751867269,-30.66479806614716,2.506628277459239],b=[-54.47609879822406,161.5858368580409,-155.6989798598866,66.80131188771972,-13.28068155288572],c=[-.007784894002430293,-.3223964580411365,-2.400758277161838,-2.549732539343734,4.374664141464968,2.938163982698783],d=[.007784695709041462,.3224671290700398,2.445134137142996,3.754408661907416];
    if(p<.02425){const q=Math.sqrt(-2*Math.log(p));return(((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5])/((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);}
    if(p>1-.02425){const q=Math.sqrt(-2*Math.log(1-p));return-(((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5])/((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);}
    const q=p-.5,r=q*q;return(((((a[0]*r+a[1])*r+a[2])*r+a[3])*r+a[4])*r+a[5])*q/(((((b[0]*r+b[1])*r+b[2])*r+b[3])*r+b[4])*r+1);};
  return Array.from({length:n},(_,i)=>med*Math.exp(sig*pr((i+.5)/n))); }
SCENES.vague={
  init(sc){ sc.t0=T(sc.de); sc.t1=T(sc.a);
    let V=typeof sc.valeurs==='string'?DONNEES[sc.valeurs].slice():Array.isArray(sc.valeurs)?sc.valeurs.slice():lognormale(sc.valeurs.mediane,sc.valeurs.moyenne,sc.valeurs.n||100);
    const P=sc.persos||{}; for(const q in P){ if(P[q].valeur) V[P[q].i]=P[q].valeur; }
    sc.V=V; sc.n=V.length; sc.BW=Math.max(8,Math.round(22*100/sc.n)); sc.STEP=Math.round(sc.BW*30/22); sc.k=1500/Math.max(...V);
    sc.BX=i=>sc.ox+300+i*sc.STEP; sc.iG=P.gauche?P.gauche.i:null; sc.iD=P.droite?P.droite.i:null;
    const xc=(a,b)=>(sc.BX(a)+sc.BX(b))/2, W=sc.BX(sc.n)-sc.BX(0), zFull=Math.min(.55,1000/W);
    sc.cams=[[sc.t0+.6,xc(0,sc.n),Y(zFull),zFull,2],[sc.t0+2.2,xc(sc.n*.6,sc.n),Y(zFull*1.05),zFull*1.05,-2]];
    son(sc.t0+.3,'riser',.15); for(let i=0;i<15;i++) son(sc.t0+.25+i*.12,`clic-${i%4+1}`,.18);
    for(const m of (sc.reperes||[])){ const ta=T(m.at), [a,b]=m.zone||[0,0], xm=xc(a,b);
      if(m.type==='zone'){ sc.cams.push([ta-.3,xm+250,Y(.8),.8,0],[ta+1.2,xm+250,Y(.92),.92,0],[nextPh(ta)-.45,xm+330,Y(.84),.84,1.5]); son(ta+.2,'validation-1',.25); for(let i=0;i<6;i++) son(ta+.6+i*.15,'click-soft',.2); }
      if(m.type==='seuil'){ sc.cams.push([ta+.35,xm,Y(.62),.62,0],[ta+1.9,xm-180,Y(.56),.56,-2]); son(ta-.1,'whoosh-short',.3); son(ta+.3,'sparkle',.2); if(m.tampon){son(ta+.45,'tampon',.38); secousse(ta+.55,12);} }
      if(m.type==='bulle'){ const te=T(m.eclate??(m.at+'+4')), cx=sc.BX((a+b)/2), cy=G-sc.V[Math.round((a+b)/2)]*sc.k;
        sc.cams.push([ta+.6,cx,cy+60,1.5,0],[ta+1.6,cx-80,cy+140,1.22,-3],[ta+2.8,cx+80,cy+40,1.62,2],[te-.6,cx-40,cy+120,1.25,-1],[te+.75,xc(0,sc.n),Y(zFull*.7),zFull*.7,0]);
        son(ta+.45,'squish',.25); son(te,'pop',.45); son(te+.05,'boing',.25); son(te+.1,'whoosh-cinematic',.25); secousse(te,22); } } },
  etat(t,sc){ const R={}; for(const m of (sc.reperes||[])){ const ta=T(m.at); if(m.type==='bulle'){ R.bulle=m; R.tb=ta; R.te=T(m.eclate??(m.at+'+4')); } } return R; },
  monde(t,sc){ if(t<sc.t0) return ''; const R=this.etat(t,sc), orbit=sg(t,sc.t0,sc.t1), dx=18*Math.cos(Math.PI*.9*orbit), dy=-13, dep=eo(sg(t,sc.t0+.2,sc.t0+1.0));
    let s='', side='', top='', front='';
    const zones=(sc.reperes||[]).filter(m=>m.type==='zone'), seuils=(sc.reperes||[]).filter(m=>m.type==='seuil');
    for(let i=0;i<sc.n;i++){ if(sc.vers0&&t<sc.t0+1.5&&(i===sc.iG||i===sc.iD)) continue;
      const d=sc.t0+.25+i*(1.8/sc.n), p=bk(sg(t,d,d+.45)); if(p<=0) continue;
      const h=sc.V[i]*sc.k*p, x=sc.BX(i), y=G-h, ddx=dx*dep, ddy=dy*dep; let c=PAP;
      for(const z of zones){ const g=sg(t,T(z.at)+.5,T(z.at)+1.4); if(i>=z.zone[0]&&i<z.zone[1]&&g>0) c=`rgb(${f(L(251,214,g))},${f(L(248,206,g))},${f(L(242,194,g))})`; }
      for(const z of seuils){ const g=sg(t,T(z.at)+.3,T(z.at)+.9); if(i>=z.zone[0]&&i<z.zone[1]&&g>.5) c=ROSE; }
      if(i===sc.iG||i===sc.iD) c=i===sc.iD?ACC:PAP;
      const sx=ddx>=0?x+sc.BW:x;
      side+=`<path d="M${f(sx)} ${f(y)} l${f(ddx)} ${f(ddy)} V${f(G+ddy)} L${f(sx)} ${G} Z" fill="#d9cfbe"/>`;
      top+=`<path d="M${x} ${f(y)} h${sc.BW} l${f(ddx)} ${f(ddy)} h${-sc.BW} Z" fill="#efe8dc"/>`;
      const fog=(R.bulle&&t>R.tb+.4&&t<R.te)&&(i<R.bulle.zone[0]||i>R.bulle.zone[1])?.18:1;
      front+=`<rect x="${x}" y="${f(y)}" width="${sc.BW}" height="${f(h)}" fill="${c}" stroke="${INK}" stroke-width="3" opacity="${fog}"/>`; }
    s+=`<g stroke="${INK}" stroke-width="2">${side}${top}</g>${front}`;
    for(const z of zones){ const g=sg(t,T(z.at)+.5,T(z.at)+1.4), fin=1-sg(t,nextPh(T(z.at))-.35,nextPh(T(z.at))-.05), xm=(sc.BX(z.zone[0])+sc.BX(z.zone[1]))/2;
      if(g>0&&z.txt) s+=txt(xm,G-sc.V[z.zone[1]-1]*sc.k-260,96,'IS',GR,z.txt,{op:cl(g*2)*fin})+(z.sous?txt(xm,G-sc.V[z.zone[1]-1]*sc.k-180,40,'SM',GR,z.sous,{ls:4,op:cl(g*2)*fin}):''); }
    for(const z of seuils){ const ta=T(z.at), lit=sg(t,ta+.3,ta+.9), fin=(1-sg(t,nextPh(ta)+.6,nextPh(ta)+1))*(TAB!==null&&TAB>ta?1-sg(t,TAB-.45,TAB-.1):1);
      if(lit>0&&z.tampon){ const p=bk(sg(t,ta+.45,ta+.75)), xi=sc.BX(Math.max(0,z.zone[0]-6)), yv=G-sc.V[z.zone[0]]*sc.k-260;
        s+=`<g transform="translate(${f(xi)} ${f(yv)}) rotate(-8) scale(${f(L(2.2,1,cl(p)))})" opacity="${f(cl(p*2)*fin)}"><rect x="${f(-tw(z.tampon,100,'SM')/2-30)}" y="-80" width="${f(tw(z.tampon,100,'SM')+60)}" height="140" fill="none" stroke="${ACC}" stroke-width="12"/>`+txt(0,30,100,'SM',ACC,z.tampon,{ls:4})+'</g>'; }
      if(lit>0&&z.valeur) s+=`<path d="M${sc.BX(z.zone[0])-6} ${f(G-z.valeur*sc.k)} H${sc.BX(z.zone[1])+10}" stroke="${ACC}" stroke-width="6" stroke-dasharray="18 12" opacity="${f(lit)}"/>`; }
    if(R.bulle&&t>R.tb+.4&&t<R.te+.5){ const a=R.bulle.zone[0],b=R.bulle.zone[1], cx=sc.BX((a+b)/2), cy=G-sc.V[Math.round((a+b)/2)]*sc.k-60, p=bk(sg(t,R.tb+.4,R.tb+1.0)), r=300*p;
      if(t<R.te) s+=`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="#cfe3ef" fill-opacity=".28" stroke="${BLEU}" stroke-width="10"/><path d="M${f(cx-r*.55)} ${f(cy-r*.55)} q${f(r*.2)} ${f(-r*.2)} ${f(r*.45)} ${f(-r*.25)}" stroke="#fff" stroke-width="12" stroke-linecap="round" fill="none" opacity=".8"/>`;
      else { const k=sg(t,R.te,R.te+.45); for(let j=0;j<16;j++){const a2=j/16*6.283; s+=`<circle cx="${f(cx+Math.cos(a2)*(260+260*eo(k)))}" cy="${f(cy+Math.sin(a2)*(260+260*eo(k)))}" r="${f(16*(1-k))}" fill="${BLEU}"/>`;} } }
    return s; },
  poser(t,qui,sc){ const i=qui==='gauche'?sc.iG:sc.iD; if(i===null||i===undefined||t<sc.t0) return null;
    if(sc.vers0&&t<sc.t0+1.4) return null; // le duel gère la transition
    const p=sc.vers0?1:bk(sg(t,sc.t0+.6,sc.t0+1.0)); return {x:sc.BX(i)+sc.BW/2,y:G-sc.V[i]*sc.k,s:.5*p}; },
};

/* ── CHIFFRE : un chiffre qui compte, puis devient une barre qui se découpe en parts ── */
SCENES.chiffre={
  init(sc){ sc.t0=T(sc.de); sc.t1=T(sc.a); sc.X=sc.ox+700; sc.kc=900/sc.valeur; sc.tBar=T(sc.barre,sc.t0+1.6); sc.XB=sc.X+200;
    sc.cams=[[sc.t0,sc.X-60,Y(1),1,0],[sc.t0+1.2,sc.X-20,Y(1.12),1.12,-1],[sc.tBar+.4,sc.X+100,Y(.7),.7,0],[sc.tBar+1.8,sc.X+160,Y(.78),.78,2]];
    son(sc.t0+.05,'whoosh-short',.3); son(sc.t0+.1,'pop',.3); son(sc.t0+1.0,'caisse-ching',.25); secousse(sc.t0+.15,10); son(sc.tBar+.1,'whoosh',.25);
    (sc.parts||[]).forEach((p,i)=>{ const ta=T(p.at); sc.cams.push([ta+.3,sc.X+300+(i%2?120:-60),Y(.74+.06*(i%2)),.74+.06*(i%2),i%2?2:-2]); son(ta+.1,'ciseaux-snip',.3); son(ta+.3,'papier-glisse',.25); }); },
  monde(t,sc){ if(t<sc.t0-.2) return ''; let s=''; const cnt=sc.compte===false?1:eo(sg(t,sc.t0,sc.t0+1.0)), shr=eo(sg(t,sc.tBar,sc.tBar+.6));
    const val=sc.valeur*cnt, tx=sc.texte&&cnt>=1?sc.texte:fmt(val,sc.unite??'€');
    if(shr<1){ const p=bk(sg(t,sc.t0,sc.t0+.3)); s+=`<g opacity="${f(1-shr)}" transform="translate(${sc.X} ${f(800+shr*200)}) scale(${f(p*(1-.6*shr))}) translate(${-sc.X} -800)">`+txt(sc.X,870,200,'IS',sc.couleur==='encre'?INK:ACC,tx)+(sc.label?txt(sc.X,690,38,'SM',GR,sc.label,{ls:3}):'')+'</g>'; }
    if(t>sc.tBar){ const H=sc.valeur*sc.kc*bk(sg(t,sc.tBar,sc.tBar+.7)), w=260, x=sc.XB-w/2; let y=G-H, off=0;
      const parts=sc.parts||[]; let reste=H;
      parts.forEach((p,i)=>{ const ta=T(p.at), out=eo(sg(t,ta,ta+.6)), h=p.valeur*sc.kc*bk(sg(t,sc.tBar,sc.tBar+.7)); if(t<ta) return;
        const xo=x+out*(380+i*0), yo=G-h-off*0; reste-=h;
        s+=`<rect x="${f(x+out*420)}" y="${f(G-h)}" width="${w}" height="${f(h)}" fill="${p.couleur==='encre'?INK:p.couleur==='gris'?GRIS:ACC}" stroke="${INK}" stroke-width="6"/>`;
        s+=txt(x+out*420+w/2,G-h-40,60,'IS',INK,p.txt||fmt(p.valeur,sc.unite??'€'),{op:out}); if(p.label) s+=txt(x+out*420+w/2,G-h-110,30,'SM',GR,p.label,{ls:2,op:out});
        off+=h; });
      s+=`<rect x="${f(x)}" y="${f(G-reste)}" width="${w}" height="${f(Math.max(0,reste))}" fill="${PAP}" stroke="${INK}" stroke-width="7"/>`;
      s+=txt(sc.XB,G-Math.max(reste,0)-40,64,'IS',INK,parts.some(p=>t>T(p.at))&&sc.reste?sc.reste:tx); }
    return s; },
  poser(t,qui,sc){ if(t<sc.t0) return null; const p=bk(sg(t,sc.t0+.2,sc.t0+.6)); return qui==='gauche'?{x:sc.X-330,y:G,s:.6*p}:(sc.avecDroite?{x:sc.X+760,y:G,s:.6*p}:null); },
};

/* ── COURBE : une ligne qui se dessine (évolution dans le temps), un point qui compte ── */
SCENES.courbe={
  init(sc){ sc.t0=T(sc.de); sc.t1=T(sc.a); const P=sc.points, n=P.length; sc.W=Math.max(1800,n*160); sc.X0=sc.ox+300;
    const ys=P.map(p=>p[1]), mn=Math.min(0,...ys), mx=Math.max(...ys); sc.kx=sc.W/(n-1); sc.ky=1000/(mx-mn||1); sc.mn=mn;
    sc.px=i=>sc.X0+i*sc.kx; sc.py=v=>G-(v-mn)*sc.ky; sc.tf=T(sc.fin,sc.t1-.5);
    const zf=Math.min(.6,1000/(sc.W+500)); sc.cams=[[sc.t0+.1,sc.X0+sc.W/2,Y(zf),zf,0]];
    const seg=4; for(let k=1;k<=seg;k++){ const tt=L(sc.t0+.3,sc.tf,k/seg), i=(n-1)*k/seg, v=P[Math.round(i)][1]; sc.cams=sc.cams||[]; sc.cams.push([tt,sc.px(i)+150,Math.min(Y(.8),sc.py(v)+250),.8+(k%2)*.12,k%2?2:-2]); }
    sc.cams.push([sc.tf+.6,sc.X0+sc.W/2,Y(.5),.5,0]);
    son(sc.t0+.1,'whoosh',.25); son(sc.t0+.3,'riser',.15); (sc.marques||[]).forEach(m=>{son(T(m.at)+.1,'ping',.25);}); },
  monde(t,sc){ if(t<sc.t0) return ''; const P=sc.points,n=P.length, u=eio(sg(t,sc.t0+.3,sc.tf)), last=(n-1)*u, i0=Math.floor(last), fr=last-i0;
    let s='', gp=`M${f(sc.px(0))} ${f(sc.py(P[0][1]))}`; for(let i=1;i<n;i++) gp+=` L${f(sc.px(i))} ${f(sc.py(P[i][1]))}`;
    const gin=eo(sg(t,sc.t0,sc.t0+.6));
    for(let k=1;k<=4;k++){ const y=G-k*250; s+=`<path d="M${f(sc.X0-120)} ${y} H${f(L(sc.X0-120,sc.X0+sc.W+160,gin))}" stroke="#d6cdbd" stroke-width="4" stroke-dasharray="14 14"/>`; }
    s+=`<path d="${gp}" fill="none" stroke="${GR}" stroke-width="9" stroke-dasharray="4 20" stroke-linecap="round" opacity="${f(.7*gin)}"/>`;
    for(let i=0;i<n;i++) s+=txt(sc.px(i),G+70,32,'SM',GR,P[i][0],{op:i<=last+.01?.9:.25,axe:true});
    let d=`M${f(sc.px(0))} ${f(sc.py(P[0][1]))}`; for(let i=1;i<=i0;i++) d+=` L${f(sc.px(i))} ${f(sc.py(P[i][1]))}`;
    const hx=i0<n-1?L(sc.px(i0),sc.px(i0+1),fr):sc.px(n-1), hv=i0<n-1?L(P[i0][1],P[i0+1][1],fr):P[n-1][1], hy=sc.py(hv); d+=` L${f(hx)} ${f(hy)}`;
    s=`<path d="${d} L${f(hx)} ${G} L${f(sc.px(0))} ${G} Z" fill="${ROSE}" opacity=".45"/>`+s+`<path d="${d}" fill="none" stroke="${ACC}" stroke-width="14" stroke-linejoin="round" stroke-linecap="round"/>`;
    s+=`<circle cx="${f(hx)}" cy="${f(hy)}" r="22" fill="${ACC}" stroke="${INK}" stroke-width="6"/>`+txt(hx,hy-60,72,'IS',INK,fmt(hv,sc.unite??'€'));
    for(const m of (sc.marques||[])){ const ta=T(m.at); if(t<ta) continue; const p=bk(sg(t,ta,ta+.35)); s+=`<g transform="translate(${f(sc.px(m.i))} ${f(sc.py(P[m.i][1])-170)}) scale(${f(p)})"><rect x="${f(-tw(m.txt,46,'IS')/2-30)}" y="-50" width="${f(tw(m.txt,46,'IS')+60)}" height="80" rx="12" fill="${INK}"/>`+txt(0,8,46,'IS',CR,m.txt)+'</g>'; }
    return s; },
  poser(t,qui,sc){ if(qui!=='gauche'||t<sc.t0) return null; return {x:sc.X0-160,y:G,s:.55*bk(sg(t,sc.t0,sc.t0+.4))}; },
};

/* ── CHOIX : la question finale (chiffre + 2 cartes qui se retournent) ── */
SCENES.choix={
  init(sc){ sc.t0=T(sc.de); const ops=sc.options; sc.ta=ops.map(o=>T(o.at)); sc.tou=T(sc.ou,sc.ta[0]+.4);
    const X=sc.ox-800; sc.cams=[[sc.t0,X,Y(.52),.52,0],[sc.t0+1.4,X-130,Y(.6),.6,-2],[K.end-2.4,X-190,Y(.47),.47,1],[K.end,X-300,Y(.38),.38,0]];
    son(sc.t0-.2,'whoosh-short',.28); son(sc.t0+.05,'caisse-ching',.25); son(sc.t0+.4,'hop',.2); sc.ta.forEach(t=>son(t,'papier-glisse',.28)); son(sc.tou,'tape-leger-2',.22); },
  monde(){ return ''; },
  ecran(t,sc){ if(t<sc.t0-.2) return ''; let s=`<rect width="1080" height="1920" fill="${CR}" opacity="${f(eo(sg(t,sc.t0-.2,sc.t0+.25))*.94)}"/>`;
    const p0=bk(sg(t,sc.t0,sc.t0+.35)); s+=`<g transform="translate(540 600) scale(${f(p0)})">`+txt(0,30,180,'IS',ACC,sc.chiffre)+(sc.sur?txt(0,-120,40,'SM',GR,sc.sur,{ls:4}):'')+'</g>';
    sc.options.forEach((o,k)=>{ const x=k===0?290:790, c=k===0?INK:ACC, fl=sg(t,sc.ta[k],sc.ta[k]+.45), sx=-Math.cos(Math.PI*eo(fl)); if(fl<=0) return;
      const front=sx>0, w=390,h=300; s+=`<g transform="translate(${x} 850) scale(${f(Math.abs(sx))} 1)"><rect x="${-w/2+10}" y="${-h/2+10}" width="${w}" height="${h}" rx="22" fill="${INK}"/><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="22" fill="${front?(c===ACC?ACC:PAP):'#e2d8c8'}" stroke="${INK}" stroke-width="7"/>`;
      if(front){ const lines=o.txt.split('<br>'); const sz=Math.min(lines.length===1?96:74, ...lines.map(ln=>74*340/Math.max(340,tw(ln,74,'IS')))); lines.forEach((ln,j)=>{ s+=txt(0,(lines.length===1?28:-10+j*80),sz,'IS',c===ACC?CR:INK,ln); }); }
      s+='</g>'; });
    if(t>sc.tou) s+=txt(540,865,40,'SM',GR,'OU',{ls:6,op:cl(bk(sg(t,sc.tou,sc.tou+.3)))});
    const tp=bk(sg(t,sc.t0+.3,sc.t0+.7)), dis=T(PLAN.question||'end'); if(tp>0) s+=`<g data-role="perso">`+Ticket.svg({x:540,y:1180,scale:.42*tp,mouth:t>dis?'grin':'flat',brows:'up',armL:[-90,-40],armR:[90,-40],look:[0,-.3],cheeks:t>dis})+'</g>';
    if(PLAN.source) s+=txt(540,680,24,'SM',GR,PLAN.source,{ls:1,op:eo(sg(t,sc.t0+.6,sc.t0+1))*.9});
    return s; },
  poser(){ return null; },
};

/* ── LIBRE : une scène écrite à la main (dernier recours) : dessin(t,api) → SVG monde ── */
SCENES.libre={
  init(sc){ sc.t0=T(sc.de); sc.t1=T(sc.a); sc.cams=(sc.cameras||[[sc.de,0,0,.8,0]]).map(c=>[T(c[0]),sc.ox+c[1],c[2]===null?Y(c[3]):G+c[2],c[3],c[4]||0]); (sc.sons||[]).forEach(x=>son(T(x[0]),x[1],x[2]||.25)); },
  monde(t,sc){ return t<sc.t0-.2?'':sc.dessin(t,{sc,T,K,txt,fmt,G,ox:sc.ox,INK,PAP,GR,ACC,CR,BLEU,ROSE,GRIS,eo,ei,eio,bk,sg,L,cl,f}); },
  poser(t,qui,sc){ return sc.poser?sc.poser(t,qui,{T,G,ox:sc.ox,bk,sg}):null; },
};

/* ═════════════════════════════ ASSEMBLAGE ═════════════════════════════ */
const SC=PLAN.scenes.map(x=>Object.assign({},x));
let ox=0; const LARG={vague:3800,courbe:3400,duel:2600,chiffre:2600,libre:2600,choix:0};
SC.forEach((sc,i)=>{ const nx=SC[i+1]; if(sc.ox===undefined) sc.ox=ox;
  if(sc.type==='duel'&&nx&&nx.type==='vague'&&nx.persos){ nx.ox=sc.ox; sc._lie=nx; nx.vers0=true; return; }
  ox=sc.ox+(sc.largeur||LARG[sc.type]); });
SC.forEach(sc=>SCENES[sc.type].init(sc));
SC.forEach(sc=>{ if(sc._lie){ const V=sc._lie; sc.vers={BX:V.BX,BW:V.BW,k:V.k,iG:V.iG,iD:V.iD}; sc.a=V.de; sc.t1=V.t0; } });
const sceneAt=t=>{ let c=SC[0]; for(const sc of SC) if(t>=T(sc.de,0)-.01) c=sc; return c; };

/* ───── caméra : images clés des scènes + remplissage automatique (jamais > 2,6 s sans nouvelle image clé) ───── */
let CK=[];
function camKeys(){ let k=[]; SC.forEach(sc=>(sc.cams||[]).forEach(c=>k.push(c.slice()))); k.sort((a,b)=>a[0]-b[0]);
  const o=[]; for(const c of k){ if(o.length&&c[0]-o[o.length-1][0]<.2) continue; o.push(c); }
  if(!o.length||o[0][0]>0) o.unshift([0,o.length?o[0][1]:540,o.length?o[0][2]:Y(1),o.length?o[0][3]:1,0]);
  if(o[o.length-1][0]<K.end) o.push([K.end,o[o.length-1][1]-120,o[o.length-1][2],o[o.length-1][3]*.92,0]);
  const r=[o[0]]; let flip=1;
  for(let i=1;i<o.length;i++){ const b=o[i]; let a=r[r.length-1];
    while(b[0]-a[0]>2.6){ const gap=b[0]-a[0], tm=a[0]+Math.min(2.2,gap/2), u=(tm-a[0])/gap, z=L(a[3],b[3],u)*.9, sol=Math.abs(a[2]-Y(a[3]))<2&&Math.abs(b[2]-Y(b[3]))<2;
      const m=[tm,L(a[1],b[1],u)+flip*140/z,sol?Y(z):L(a[2],b[2],u),z,flip*2]; r.push(m); a=m; flip=-flip; }
    r.push(b); }
  return r; }
function cam(t){ let a=CK[0],b=CK[CK.length-1];
  if(t>=b[0]) a=b; else for(let i=0;i<CK.length-1;i++) if(t>=CK[i][0]&&t<=CK[i+1][0]){a=CK[i];b=CK[i+1];break;}
  const u=a===b?0:eio((t-a[0])/(b[0]-a[0]));
  const c={x:L(a[1],b[1],u),y:L(a[2],b[2],u),z:L(a[3],b[3],u)*(1+.012*Math.sin(t*.9)),r:L(a[4],b[4],u)};
  let sh=0; for(const [t0,A] of SHAKES) if(t>t0) sh+=A*Math.exp(-(t-t0)*12)*Math.sin((t-t0)*95); c.sh=sh; return c; }

/* ───── décor ───── */
function ground(){ let s=`<rect x="-3000" y="${G}" width="30000" height="14" fill="${INK}"/><rect x="-3000" y="${G+14}" width="30000" height="900" fill="#e8dfd0"/>`;
  for(let i=-50;i<400;i++) s+=`<path d="M${i*60} ${G+14} l-40 300" stroke="#dcd2c1" stroke-width="5"/>`; return s; }
function grid(){ let s=`<g stroke="#ddd3c3" stroke-width="3" opacity=".55">`; for(let x=-1200;x<=ox+5000;x+=120) s+=`<path d="M${x} -1400 V${G}"/>`; for(let y=G;y>=-1400;y-=120) s+=`<path d="M-1200 ${y} H${ox+5000}"/>`; return s+'</g>'; }
function bg(t){ let s=''; for(let i=0;i<14;i++){ const x=(i*173+60)%1080, y=((i*389+200)-t*(18+i*3))%2100, yy=y<-100?y+2100:y;
  s+=txt(x,yy,54+(i%3)*16,'SM',GR,i%2?'€':'%',{op:.07,tr:`rotate(${(i*37)%40-20} ${x} ${f(yy)})`}); } return s; }

/* ───── textes écran : carton (haut) + sous-titres (bas) + pastille Abonne-toi ───── */
function caption(t,t0,t1,l1,l2,key){
  if(t<t0||t>t1+.35) return '';
  const pout=ei(sg(t,t1,t1+.3)); let s=`<g data-role="carton" opacity="${f(1-pout)}" transform="translate(0 ${f(-pout*240)})">`, wi=0; const kw=key?key.split(' '):[];
  const wid=l=>l?l.split(' ').reduce((a,w)=>a+tw(w,82,'IS'),0)+tw(' ',82,'IS')*(l.split(' ').length-1)+20:0;
  const size=Math.min(82,82*900/Math.max(wid(l1),wid(l2))), pin=eo(sg(t,t0,t0+.3));
  [[l1,250],[l2,250+size*1.22]].forEach(([line,y])=>{ if(!line) return; const W=wid(line)*size/82;
    s+=`<rect x="${f(540-W/2-30)}" y="${f(y-size*.92)}" width="${f((W+60)*pin)}" height="${f(size*1.2)}" rx="22" fill="${CR}" opacity=".93"/>`; });
  [[l1,250],[l2,250+size*1.22]].forEach(([line,y])=>{ if(!line) return;
    const words=line.split(' '), ws=words.map(w=>tw(w,size,'IS')), sp=tw(' ',size,'IS'); let x=540-(ws.reduce((a,b)=>a+b,0)+sp*(words.length-1))/2;
    words.forEach((w,j)=>{ const d=t0+wi*.055, p=bk(sg(t,d,d+.32)); wi++; const isK=kw.includes(w);
      if(p>0){ const kp=eo(sg(t,d+.15,d+.45)); let g=`<g opacity="${f(cl(p*2))}" transform="translate(${f(x)} ${f(y+(1-p)*60)}) rotate(${f((1-p)*8)})">`;
        if(isK) g+=`<rect x="-10" y="${f(-size*.83)}" width="${f((ws[j]+20)*kp)}" height="${f(size*1.05)}" fill="${ACC}" transform="rotate(-1.5)"/>`;
        g+=txt(0,0,size,'IS',isK&&kp>.55?CR:INK,w,{a:'start'})+'</g>'; s+=g; }
      x+=ws[j]+sp; }); });
  return s+'</g>'; }
const CART=(PLAN.cartons||[]).map((c,i,arr)=>{ const t0=c.de==='debut'?-1:T(c.de); const nx=arr[i+1]; const t1=c.a!==undefined?T(c.a):(i===arr.length-1?K.end+1:(nx.de==='debut'?0:T(nx.de))-.4); return {t0,t1,l1:c.l1,l2:c.l2,mot:c.mot}; });
function subs(t){ const W=TIMING.words; let i=W.findIndex(w=>t<w.e); if(i<0) return ''; const w=W[i]; if(t<w.s-.25&&(i===0||t>W[i-1].e+.6)) return '';
  const grp=W.filter(x=>x.g===w.g); const size=50, sp=tw(' ',size,'IS');
  const ws=grp.map(x=>tw(x.w,size,'IS')); const totw=ws.reduce((a,b)=>a+b,0)+sp*(grp.length-1); let x=540-totw/2, s=`<g data-role="sous-titre"><rect x="${f(x-24)}" y="1216" width="${f(totw+48)}" height="82" rx="41" fill="${CR}" opacity=".9"/>`;
  grp.forEach((x0,j)=>{ const cur=t>=x0.s&&t<x0.e+.05, said=t>=x0.s;
    if(cur) s+=`<rect x="${f(x-8)}" y="1226" width="${f(ws[j]+16)}" height="62" rx="6" fill="${ACC}"/>`;
    s+=txt(x,1272,size,'IS',cur?CR:(said?INK:'#a69d90'),x0.w,{a:'start'}); x+=ws[j]+sp; });
  return s+'</g>'; }
const TAB=PLAN.abonne?T(PLAN.abonne):null, TAB1=TAB!==null?nextPh(TAB):null;
if(TAB!==null){ son(TAB-.1,'pop',.32); son(TAB+.12,'whoosh-short',.2); son(TAB+1.1,'click',.35); son(TAB+1.15,'validation-2',.25); secousse(TAB+.05,10); }
function pastille(t){ if(TAB===null||t<TAB-.1||t>TAB1) return ''; // GROS bouton « Abonne-toi » : impossible à rater (décision de Thomas, 01/11)
  const p=bk(sg(t,TAB-.1,TAB+.3))*(1-ei(sg(t,TAB1-.3,TAB1))), tap=TAB+1.1, pr=t>tap&&t<tap+.18?.93:1, pul=1+.035*Math.sin((t-TAB)*7)*sg(t,TAB+.3,TAB+.5);
  let s=`<g data-role="pastille" transform="translate(540 400) scale(${f(p*pr*pul*1000)/1000})">`;
  if(t>tap){ const k=sg(t,tap,tap+.6); s+=`<rect x="${f(-470-60*k)}" y="${f(-130-60*k)}" width="${f(940+120*k)}" height="${f(260+120*k)}" rx="${f(130+60*k)}" fill="none" stroke="${ACC}" stroke-width="${f(14*(1-k))}" opacity="${f(1-k)}"/>`; }
  s+=`<rect x="-458" y="-116" width="940" height="260" rx="130" fill="${INK}"/><rect x="-470" y="-130" width="940" height="260" rx="130" fill="${ACC}" stroke="${INK}" stroke-width="8"/>`;
  s+=txt(0,18,118,'IS',CR,'+ Abonne-toi')+txt(0,90,40,'SM',CR,'UN CHIFFRE PAR JOUR',{ls:4});
  // le doigt qui appuie
  const hm=eo(sg(t,TAB+.45,tap)), hx=L(420,250,hm), hy=L(330,60,hm)+(pr<1?12:0);
  if(t>TAB+.45) s+=`<g transform="translate(${f(hx)} ${f(hy)}) rotate(-20)" opacity="${f(cl((t-TAB-.45)*4)*(1-sg(t,tap+.8,tap+1.1)))}"><path d="M0 0 c-14 0 -22 10 -22 24 v80 c-14 -18 -44 -16 -44 8 c0 10 8 22 20 38 l40 52 c10 12 22 18 40 18 h48 c30 0 50 -24 50 -54 v-70 c0 -14 -10 -24 -22 -24 c-6 0 -12 2 -16 8 c-2 -14 -12 -22 -24 -22 c-8 0 -14 4 -18 10 c-2 -12 -12 -20 -24 -20 c-6 0 -12 2 -16 6 v-52 c0 -14 -8 -24 -22 -24 Z" fill="#fff" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/></g>`;
  return s+'</g>'; }
CART.forEach(c=>{ if(c.t0>0) son(c.t0-.05,'whoosh-short',.18); });
(PLAN.humeurs||[]).forEach(([a,q,h],i)=>{ const t=T(a)+.15; if(t>.3) son(t,h==='saute'||h==='fier'?'hop':h==='choque'||h==='surpris'?'boing':`pouc-${i%4+1}`,h==='choque'?.18:.14); });

/* ───── image ───── */
window.seek=function(t){
  const c=cam(t); let s=bg(t), w='', per='';
  for(const sc of SC) w+=SCENES[sc.type].monde(t,sc);
  const cur=sceneAt(t);
  for(const q of ['gauche','droite']){ let pos=null; const dl=SC.find(sc=>sc._lie&&t>=T(sc.de,0)-.3&&t<sc.t1+1.4);
    if(dl) pos=SCENES.duel.poser(t,q,dl); else pos=SCENES[cur.type].poser(t,q,cur);
    if(pos) per+=perso(q,pos,t); }
  s+=`<g transform="translate(${f(540+c.sh)} ${f(960+c.sh*.6)}) rotate(${f(c.r)}) scale(${f(c.z*1000)/1000}) translate(${-f(c.x)} ${-f(c.y)})">`+grid()+ground()+w+per+'</g>';
  for(const sc of SC) if(SCENES[sc.type].ecran) s+=SCENES[sc.type].ecran(t,sc);
  for(const cc of CART) s+=caption(t,cc.t0,cc.t1,cc.l1,cc.l2,cc.mot);
  if(PLAN.source&&(cur.type==='vague'||cur.type==='courbe')){ const t0=T(cur.de,0); s+=txt(540,430,24,'SM',GR,PLAN.source,{ls:2,op:.85*eo(sg(t,t0,t0+.5))*(TAB!==null&&t>TAB-.4&&t<TAB1?0:1)}); }
  s+=pastille(t)+subs(t);
  S.innerHTML=s; };
window.SFX=SFX; window.cam=cam;
Promise.all([document.fonts.load('100px IS'),document.fonts.load('40px SM')]).then(()=>{CTX=document.createElement('canvas').getContext('2d');CK=camKeys();window.CK=CK;window.ready=true;seek(0);});
