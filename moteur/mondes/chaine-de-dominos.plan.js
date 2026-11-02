/* N°09 (soir, histoire) · « Négocier 100 € : 12 000 € sur 10 ans »
   MONDE : la chaîne de dominos. 1 domino = 1 mois. La chaîne de Sarah part d'un tout petit domino (une phrase)
   et finit sur un domino énorme (12 000 €). Tico, lui, pousse ses dominos à la main, un par un.
   Calcul : 100 € × 12 mois × 10 ans = 12 000 €, net avant impôt, hors autres hausses (exemple). */
const D=(()=>{
  const INK='#1c1a17',PAP='#fbf8f2',ACC='#c4552d',CR='#f6f1e8',OR='#f2c46b',MUR='#efe6d6',MUR2='#e4d9c6',BOIS='#b98a5e';
  const cl=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)), L=(a,b,u)=>a+(b-a)*u, f=n=>Math.round(n*10)/10;
  const eo=u=>1-Math.pow(1-cl(u),3), ei=u=>Math.pow(cl(u),3), eio=u=>{u=cl(u);return u<.5?4*u*u*u:1-Math.pow(-2*u+2,3)/2;};
  // la chaîne de Sarah : du tout petit au géant
  const N=26, H=[], W=[], XP=[]; { let x=1300; for(let i=0;i<N;i++){ const h=130*Math.pow(820/130,i/(N-1)), w=i===N-1?460:h*.5; H.push(h); W.push(w); XP.push(x); x+=h*.62+(i===N-2?300:0); } }
  const XL=XP[N-1];                 // le pied du géant
  const X_SP=XL+2600;               // la spirale 3D
  const TP=.35, DUR=4.83;           // début de la poussée après p8, durée de la chute jusqu'au mot « 12 000 »
  const tomb=i=>TP+DUR*Math.pow(i/N,1/1.6);
  // ── un domino : pivot au pied droit (xp,yb), bascule vers la droite ──
  function domino(a,xp,yb,h,w,ang,o={}){ const col=o.col||INK, enc=o.enc||(col===INK?CR:INK), x=xp-w;
    let s=`<g transform="rotate(${f(ang)} ${f(xp)} ${f(yb)})">`;
    s+=a.boite(x,yb,w,h,{couleur:col,prof:w*.2,cote:o.cote||(col===INK?'#3a3530':'#8f3c1e'),dessus:o.dessus||(col===INK?'#4a443d':'#d97a55'),trait:Math.max(3,w*.03),rayon:w*.08});
    s+=`<path d="M${f(x+w*.1)} ${f(yb-h/2)} H${f(xp-w*.1)}" stroke="${enc}" stroke-width="${f(Math.max(3,w*.035))}" stroke-linecap="round" opacity=".85"/>`;
    const r=w*.075; for(const [u,v] of (o.points||[[.3,.14],[.7,.14],[.5,.25],[.3,.36],[.7,.36]])) s+=`<circle cx="${f(x+w*u)}" cy="${f(yb-h*v)}" r="${f(r)}" fill="${enc}"/>`;
    if(o.ic) s+=a.icone(o.ic,x+w/2,yb-h*.75,w*.62,{couleur:enc,ep:w*.05});
    if(o.barre) { const p=cl(o.barre), cx=x+w/2, cy=yb-h*.75, d=w*.42; s+=`<path d="M${f(cx-d)} ${f(cy-d)} L${f(L(cx-d,cx+d,p))} ${f(L(cy-d,cy+d,p))}" stroke="${ACC}" stroke-width="${f(w*.085)}" stroke-linecap="round"/>`; }
    if(o.txt) s+=a.txt(x+w/2,yb-h*.75+(o.taille||w*.2)*.36,o.taille||w*.2,'IS',enc,o.txt);
    return s+'</g>'; }
  // ── angle d'un domino selon le front F : une vague de 3 dominos en train de tomber ──
  const angle=(F,i)=>78*Math.pow(cl((F-i)/3),1.25);
  function chaine(a,t,F,dx=0,i0=0){ let s='';
    for(let i=N-1;i>=i0;i--){ const x=XP[i]+dx, an=angle(F,i), g=i===N-1;
      s+=a.ombre(x-W[i]*.3,a.G+6,W[i]*1.3)+`<g transform="translate(0 ${2*a.G+30}) scale(1 -1)" opacity=".2">`+domino(a,x,a.G,H[i],W[i],an,{col:ACC,enc:CR,points:[]})+'</g>';
      s+=domino(a,x,a.G,H[i],W[i],an,g?{col:ACC,enc:CR,txt:'12 000 €',taille:96,points:[[.25,.13],[.75,.13],[.5,.25],[.25,.37],[.75,.37]]}:{col:ACC,enc:CR}); }
    return s; }
  // la rangée de Tico, derrière : petite, debout, elle tremble quand la chaîne de Sarah passe
  function rangee(a,t,F){ let s=''; const y=a.G-70;
    for(let k=0;k<34;k++){ const x=1120+k*178, near=XP.findIndex(v=>v>x); const dt=near<0?-1:(F-near);
      const wob=dt>0&&dt<4?7*Math.sin(dt*9)*(1-dt/4):0; s+=domino(a,x,y,118,56,wob,{col:INK}); }
    return s; }
  // ── le décor du couloir ──
  function couloir(a,x0,x1){ let s=`<rect x="${x0}" y="${a.G-1250}" width="${x1-x0}" height="1250" fill="${MUR}"/><rect x="${x0}" y="${a.G-240}" width="${x1-x0}" height="240" fill="${MUR2}"/><path d="M${x0} ${a.G-240} H${x1}" stroke="${INK}" stroke-width="7"/>`;
    for(let x=Math.ceil(x0/560)*560;x<x1;x+=560) s+=`<path d="M${x} ${a.G-240} V${a.G}" stroke="${INK}" stroke-width="3" opacity=".22"/>`;
    for(let x=Math.ceil(x0/1400)*1400+200;x<x1;x+=1400) s+=`<rect x="${x}" y="${a.G-820}" width="330" height="330" fill="#dbe7ef" stroke="${INK}" stroke-width="7"/><path d="M${x+165} ${a.G-820} V${a.G-490} M${x} ${a.G-655} H${x+330}" stroke="${INK}" stroke-width="6"/>`;
    s+=`<defs><pattern id="dam" width="480" height="320" patternUnits="userSpaceOnUse"><rect width="480" height="320" fill="#ead9bd"/><rect width="240" height="160" fill="#d9c19c"/><rect x="240" y="160" width="240" height="160" fill="#d9c19c"/></pattern></defs><rect x="${x0}" y="${a.G+14}" width="${x1-x0}" height="1500" fill="url(#dam)"/><rect x="${x0}" y="${a.G+14}" width="${x1-x0}" height="26" fill="${INK}" opacity=".18"/>`;
    return s; }
  // ── la porte du patron : p = ouverture 0 → 1, sec = secousse ──
  function porte(a,x,t,p,sec=0,titre=true){ const y=a.G, w=280,h=640, ou=w*(1-.78*cl(p)); let s='';
    s+=`<rect x="${x-18}" y="${y-h-18}" width="${w+36}" height="${h+18}" fill="${INK}"/><rect x="${x}" y="${y-h}" width="${w}" height="${h}" fill="#f6e3a8"/>`;
    if(p>0) s+=`<path d="M${x+w} ${y} L${f(x+w+260*p)} ${y} L${x+w} ${y-h} Z" fill="#f6e3a8" opacity=".55"/>`;
    s+=`<g transform="translate(${f(sec*Math.sin(t*70))} 0)"><rect x="${x}" y="${y-h}" width="${f(ou)}" height="${h}" fill="${BOIS}" stroke="${INK}" stroke-width="7"/>`;
    if(ou>180){ s+=`<circle cx="${f(x+ou-34)}" cy="${y-h*.45}" r="15" fill="${OR}" stroke="${INK}" stroke-width="5"/>`;
      if(titre) s+=a.etiquette(x+ou/2,y-h+100,'LE PATRON',{taille:Math.min(36,ou*.13),fond:'encre'}); }
    return s+'</g>'; }
  // ── Sarah : même dessin que Tico, un nœud, une teinte ──
  function sarah(a,x,y,t,o={}){ const m=o.marche?Ticket.walk(t*14):{}; const extra=(typeof ACCS!=='undefined'&&ACCS.noeud)||'';
    const q={x,y:y+(o.marche?m.bob*.6:0),scale:.62,fill:'#f4e3d7',mouth:'smile',extra,look:[0,0]}; if(o.marche) Object.assign(q,{footL:m.footL,footR:m.footR,armL:m.armL,armR:m.armR});
    for(const k in o) if(o[k]!==undefined&&k!=='marche') q[k]=o[k]; return Ticket.svg(q); }
  // pièces qui jaillissent d'un point et roulent au sol
  function pluie(a,t,t0,cx,sens=1,n=26,force=1){ let s=''; for(let i=0;i<n;i++){ const d=t-t0-i*.018; if(d<=0) continue;
      const vx=sens*(280+((i*53)%10)*95)*force, vy=-(520+((i*29)%10)*90)*force, tsol=2*(-vy)/1400, tt=Math.min(d,tsol);
      let x=cx+vx*tt, y=a.G-40+vy*tt+700*tt*tt; if(d>tsol){ const r=Math.min(d-tsol,1.4); x+=vx*.3*(r-r*r/2.8); y=a.G-34; }
      s+=a.piece(x,y,34,{tour:d*1.4+i*.13}); } return s; }
  // un tas de pièces qui monte (p de 0 à 1)
  function tas(a,x,p,o={}){ const H0=o.h||420, W0=o.w||420, n=Math.round(14*cl(p)); let s=''; if(p<=0) return s;
    for(let r=0;r<n;r++){ const rr=(1-r/20)*W0, y=a.G-12-r*H0/14; for(let c=0;c<4;c++){ const cx=x-rr/2+rr*(c+.5)/4+((r%2)?rr/16:-rr/16); s+=`<ellipse cx="${f(cx)}" cy="${f(y)}" rx="${f(rr/6.6)}" ry="17" fill="${OR}" stroke="${INK}" stroke-width="5"/>`; } }
    return s; }
  const C=(at,x,Yw,sy,z,o={})=>Object.assign({at,cible:[x,Yw-(sy-960)/z+120],zoom:z},o);
  const CA=(at,sy,z,dx,o={})=>Object.assign({at,cible:'acteur',zoom:z,decal:[dx,-(sy-960)/z]},o);
  return {INK,PAP,ACC,CR,OR,MUR,MUR2,BOIS,cl,L,f,eo,ei,eio,N,H,W,XP,XL,X_SP,TP,DUR,tomb,domino,angle,chaine,rangee,couloir,porte,sarah,pluie,tas,C,CA};
})();

const ICN=['tools-kitchen-2','movie','beer','pizza','shirt','plane','coffee','pizza','movie'];
const RK=i=>1500+i*320;           // les dominos de Tico (scène 2)
const X_S=RK(9)+900, X_T=X_S+620; // les deux tas
const X_G=D.XL-D.XP[14]+1500;     // le géant de la fin

const PLAN={
  format:'histoire',
  source:'CALCUL : 100 € × 12 MOIS × 10 ANS · NET AVANT IMPÔT · EXEMPLE',
  persos:{ gauche:{nom:'Tico'} },
  phrases:[
    "Tu n'as jamais demandé d'augmentation ?",                                        // p1
    "Ce silence peut te coûter 12 000 €.",                                            // p2
    "Regarde Tico. Il bosse dur, il ne dit rien.",                                    // p3
    "Sa collègue Sarah, même poste, même paie, frappe chez le patron.",               // p4
    "Elle demande 100 € de plus par mois. Une seule fois.",                           // p5
    "Le patron dit oui.",                                                             // p6
    "Tico, lui, attend que ça vienne tout seul.",                                     // p7
    "Et chaque mois, chez Sarah, un domino de 100 € tombe.",                          // p8
    "Dix ans plus tard, ça fait 12 000 € d'écart.",                                   // p9  CHIFFRE CHOC
    "Abonne-toi : chaque jour, un chiffre qu'on ne te dit pas au boulot.",            // p10 APPEL 1
    "Sauf que… Tico a un plan.",                                                      // p11 RETOURNEMENT
    "Chaque mois, il met 100 € de côté. Plus de resto.",                              // p12
    "Il pousse ses dominos à la main. 120 fois.",                                     // p13
    "Dix ans plus tard, même tas : 12 000 €.",                                        // p14
    "Égalité ? Regarde mieux.",                                                       // p15
    "Sarah n'a rien changé à sa vie. Elle a parlé une fois.",                         // p16
    "Tico s'est privé 120 fois.",                                                     // p17
    "Même chiffre. Pas le même prix.",                                                // p18
    "Et si ton patron dit non ?",                                                     // p19
    "Ça arrive, personne ne promet le oui.",                                          // p20
    "Un non, ça dure dix secondes. Ton silence, dix ans.",                            // p21
    "Ce soir, regarde ta fiche de paie. Depuis quand elle n'a pas bougé ?",           // p22
    "12 000 € pour une phrase. Tu demandes, ou tu attends ?",                         // p23
    "Envoie-la à ton collègue qui bosse comme un fou et n'ose jamais demander.",      // p24 APPEL 2
  ],
  ancres:{ hook:{mot:'12 000',phrase:'p2'}, frappe:{mot:'frappe',phrase:'p4'}, seule:{mot:'Une',phrase:'p5'}, oui:{mot:'oui',phrase:'p6'},
           choc:{mot:'12 000',phrase:'p9'}, tico:{mot:'Tico',phrase:'p11'}, resto:{mot:'Plus',phrase:'p12'}, cent20:{mot:'120',phrase:'p13'},
           tas:{mot:'12 000',phrase:'p14'}, regarde:{mot:'Regarde',phrase:'p15'}, parle:{mot:'parlé',phrase:'p16'}, pas:{mot:'Pas',phrase:'p18'},
           non:{mot:'non',phrase:'p19'}, ton:{mot:'Ton',phrase:'p21'}, fiche:{mot:'fiche',phrase:'p22'}, depuis:{mot:'Depuis',phrase:'p22'},
           demandes:{mot:'Tu',phrase:'p23'} },
  musique:{nom:'minimal-drifting-piano', coupe:['choc','p11']},
  abonne:'p10',
  question:'p24',

  cartons:[
    {de:'debut', a:'p3-.2', l1:'Augmentation :', l2:'le prix du silence', mot:'silence'},
    {de:'p3', a:'p4-.2', l1:'Tico bosse dur.', l2:'Il ne dit rien.', mot:'rien.'},
    {de:'p4', a:'p5-.2', l1:'Sarah frappe', l2:'chez le patron.', mot:'patron.'},
    {de:'p5', a:'p6-.2', l1:'100 € de plus.', l2:'Une seule fois.', mot:'fois.'},
    {de:'p7', a:'p8-.2', l1:'Tico attend', l2:'que ça vienne.', mot:'attend'},
    {de:'p8', a:'p9-.2', l1:'Chaque mois,', l2:'un domino tombe.', mot:'domino'},
    {de:'choc-.5', a:'p10-.4', l1:'Dix ans plus tard :', l2:"12 000 € d'écart.", mot:'12 000 €'},
    {de:'tico+.6', a:'p12-.2', l1:'Tico a', l2:'un plan.', mot:'plan.'},
    {de:'p12+.12', a:'p13-.2', l1:'100 € de côté.', l2:'Plus de resto.', mot:'resto.'},
    {de:'p13', a:'p14-.2', l1:'À la main :', l2:'120 fois.', mot:'120'},
    {de:'tas-.5', a:'p15-.2', l1:'Même tas :', l2:'12 000 €.', mot:'12 000 €.'},
    {de:'p15', a:'p16-.2', l1:'Égalité ?', l2:'Pas si vite.', mot:'Égalité ?'},
    {de:'p16', a:'parle-.25', l1:"Sarah n'a", l2:'rien changé.', mot:'rien'},
    {de:'p17+.12', a:'p18-.2', l1:'Lui :', l2:'120 privations.', mot:'privations.'},
    {de:'p18', a:'p19-.2', l1:'Même tas.', l2:'Pas la même vie.', mot:'vie.'},
    {de:'p19', a:'p20-.2', l1:"Et s'il dit", l2:'non ?', mot:'non ?'},
    {de:'p20', a:'p21-.2', l1:"Personne ne", l2:'promet le oui.', mot:'oui.'},
    {de:'p21', a:'p22-.2', l1:'Un non : dix secondes.', l2:'Ton silence : dix ans.', mot:'silence'},
    {de:'p22', a:'p23-.2', l1:'Ta paie :', l2:'bloquée depuis quand ?', mot:'paie'},
    {de:'p23', a:'p24-.2', l1:'Demander', l2:'ou attendre ?', mot:'attendre ?'},
    {de:'p24', l1:'Envoie-la à ton collègue', l2:'qui n\'ose jamais demander.', mot:'collègue'},
  ],
  humeurs:[ ['p1','gauche','choque'],['hook','gauche','inquiet'],['p3','gauche','content'],['p3+1.2','gauche','pense'],['p4','gauche','hausse'],['frappe','gauche','surpris'],
            ['oui','gauche','choque'],['p7','gauche','pense'],['p7+1.2','gauche','hausse'],['p8','gauche','surpris'],['p9','gauche','inquiet'],['choc','gauche','choque'],
            ['p10','gauche','triste'],['p10+1.6','gauche','surpris'],['tico','gauche','fier'],['p12','gauche','montre'],['resto','gauche','triste'],['p13','gauche','inquiet'],['cent20','gauche','choque'],
            ['p14','gauche','inquiet'],['tas','gauche','triste'],['p15','gauche','pense'],['p16','gauche','hausse'],['p17','gauche','triste'],['p18','gauche','pense'],['pas','gauche','hausse'],
            ['p19','gauche','inquiet'],['non','gauche','choque'],['p20','gauche','hausse'],['p21','gauche','pense'],['ton','gauche','inquiet'],['p22','gauche','montre'],['depuis','gauche','pense'],
            ['p23','gauche','hausse'],['demandes','gauche','pense'],['p24','gauche','montre'],['p24+2.4','gauche','choque'] ],

  scenes:[
  /* ═══════════ 1 · LA CHAÎNE DE SARAH (p1 → p11) : image 0 = le géant en chute, rembobinage, porte, poussée, spirale, choc ═══════════ */
  { type:'monde', de:'p1', a:'p11', nom:'chaine-de-dominos', largeur:D.X_SP+1500,
    visuels:['dominos','chaîne','porte','patron'],
    acteur:[ {at:'p1',x:D.XL+420,y:1300},
             {at:'p3',x:800,y:1300,mouvement:'teleport'},
             {at:'p8+2.25',x:980,y:1300,mouvement:'marche',depuis:'p8+1.5'},
             {at:'p9+.6',x:D.XL+420,y:1300,mouvement:'teleport'},
             {at:'choc+.02',x:D.XL+1120,y:1300,mouvement:'saut',hauteur:300,duree:.4},
             {at:'p10+1.4',x:D.XL+760,y:1300,mouvement:'marche',depuis:'p10+.4'},
             {at:'p10+2.6',x:D.XL+1300,y:1300,mouvement:'saut',hauteur:220,duree:.6} ],
    cadres:[ D.C('p1',D.XL+40,1300,1160,.86,{zoomFin:.92}),
             D.C('p2',D.XL+250,1150,1040,1.3,{rot:-3,coupe:true}),
             D.C('hook',D.XL+160,1300,1250,1.0,{rot:3,coupe:true}),
             D.C('p2_fin',D.XL-500,1300,1160,.62,{transition:.25}),
             D.C('p3',800,1300,1120,1.25,{transition:.32}),
             D.C('p3+1.1',790,1000,1000,1.5,{coupe:true,rot:-2}),
             D.C('p3+2',1010,1300,1140,.88,{transition:.3}),
             D.C('p4',1320,1300,1140,1.05,{coupe:true}),
             D.C('p4+1.3',860,1300,1150,.95,{transition:.4}),
             D.C('frappe-.25',470,900,1000,1.2,{coupe:true,rot:2}),
             D.C('p5',580,1300,1130,1.0,{coupe:true}),
             D.C('p5+1.3',520,920,860,1.3,{transition:.3}),
             D.C('seule',560,1040,1040,1.55,{coupe:true,rot:-3}),
             D.C('p6',760,1250,1140,1.45,{coupe:true}),
             D.C('p7',840,1300,1120,1.3,{coupe:true}),
             D.C('p7+.95',1030,1120,1070,1.75,{coupe:true,rot:3}),
             D.C('p8-.1',1320,1300,1160,1.5,{coupe:true}),
             D.C('p8+.9',1900,1300,1200,.85,{coupe:true,rot:-3,zoomFin:.72}),
             D.C('p8+1.65',3000,1300,1150,.56,{transition:.45}),
             D.C('p8+2.3',D.X_SP,1100,960,.7,{coupe:true,zoomFin:.8}),
             D.C('p8_fin-.1',D.X_SP,1150,1040,1.05,{coupe:true,rot:-6,zoomFin:.9}),
             D.C('p9+.62',D.XL-200,1300,1170,.62,{coupe:true,zoomFin:.68}),
             D.C('choc',D.XL+380,1300,1180,.8,{coupe:true,rot:-3}),
             D.C('choc+.55',D.XL+920,1280,1150,.72,{transition:.3}),
             D.C('p10',D.XL+900,1300,1180,.82,{coupe:true}),
             D.C('p10+1.3',D.XL+700,1300,1160,1.0,{transition:.4,rot:2}),
             D.C('p10+2.5',D.XL+1320,1300,1180,.85,{coupe:true}) ],
    dessin:(t,a)=>{ const N=D, T=k=>a.T(k), P8=T('p8'), Ti=a.acteur(t); let s='';
      /* contournement (bug moteur noté dans HISTORIQUE) : impact-bass-2 des plans « mot » traîne 2,6 s et passe au-dessus de la voix dans les trous */
      if(window.SFX&&!window._sfxMot){ window._sfxMot=1; window.SFX.forEach(x=>{ if(x[1]==='impact-bass-2'){ x[1]='ecrase-moyen-3'; x[2]=.22; } });
        /* moins de bruitages automatiques (352 → plus proche du tableau) : un whoosh tous les 0,4 s au plus, un pas sur deux */
        const S=window.SFX, g=[]; let tw=-9, np=0; S.slice().sort((p,q)=>p[0]-q[0]).forEach(x=>{ if(x[1].startsWith('whoosh-short')){ if(x[0]-tw<.4) return; tw=x[0]; } if(x[1].startsWith('pas-doux')&&(np++)%2) return; g.push(x); }); S.length=0; g.forEach(x=>S.push(x)); }
      const tRew0=T('p2_fin')+.02, tRew1=T('p3')+.34, tPush=P8+N.TP, tCh=T('choc');
      // le front F : hook (au ralenti), rembobinage, attente, chute, géant à plat
      let F; if(t<tRew0) F=N.N+1.15*N.cl(t/tRew0); else if(t<tRew1) F=N.L(N.N+1.15,0,N.eio((t-tRew0)/(tRew1-tRew0))); else if(t<tPush) F=0; else if(t<tCh) F=N.N*Math.pow((t-tPush)/(tCh-tPush),1.6); else F=N.N+2*N.eo((t-tCh)/.24);
      s+=N.couloir(a,-400,N.X_SP+1400);
      const op=(t>T('p5')-.25)?N.eo((t-(T('p5')-.25))/.35)*(1-N.cl((t-T('p6_fin'))/.4)):0;
      s+=N.porte(a,190,t,op,(t>T('frappe')&&t<T('frappe')+.42)?7:0,t>T('frappe')-.3);
      // bureau de Tico : la pile de dossiers qui monte
      { const dx=800, nb=Math.floor(6+Math.min(10,Math.max(0,t-T('p3'))*3.4));
        if(t>T('p3')&&t<T('p7')) for(let k=0;k<60;k++){ const t0=T('p3')+.2+k*.24, u=(t-t0)/.42; if(u>0&&u<1){ const xx=N.L(1500,895,N.eo(u)), yy=N.L(a.G-760,a.G-226-Math.min(15,6+k)*22,u*u); s+=`<g transform="translate(${N.f(xx)} ${N.f(yy)}) rotate(${N.f((1-u)*(k%2?160:-120))})"><rect x="-90" y="-60" width="180" height="120" rx="6" fill="${N.OR}" stroke="${N.INK}" stroke-width="6"/><path d="M-60 -24 H60 M-60 12 H30" stroke="${N.INK}" stroke-width="6"/></g>`; } }
 s+=a.boite(dx-230,a.G-40,150,180,{couleur:N.BOIS,prof:24,trait:5})+a.boite(dx+70,a.G-40,150,180,{couleur:N.BOIS,prof:24,trait:5})+a.boite(dx-250,a.G-216,490,28,{couleur:N.BOIS,prof:30,trait:5});
        if(t<T('p7')) for(let k=0;k<nb;k++){ const yy=a.G-226-k*22, pop=1, wob=(k%2?5:-5); s+=`<rect x="${N.f(dx+95+wob)}" y="${N.f(yy)}" width="150" height="20" rx="3" fill="${k%3?N.PAP:N.OR}" stroke="${N.INK}" stroke-width="4"/>`; } }
      // la rangée de Tico (derrière), la toile d'araignée, l'horloge qui s'emballe
      s+=N.rangee(a,t,F);
      { const pw=N.cl((t-T('p7'))/1.8); if(pw>0&&t<T('p8')+1){ const xw=1120, yw=a.G-70; for(let r=1;r<=3;r++) s+=`<path d="M${xw-60} ${yw-118} q${N.f(30*r*pw)} ${N.f(6*r*pw)} ${N.f(46*r*pw)} ${N.f(46*r*pw)}" fill="none" stroke="${N.INK}" stroke-width="3" opacity=".65"/>`; s+=`<path d="M${xw-60} ${yw-118} L${N.f(xw-60+130*pw)} ${N.f(yw-118+130*pw)} M${xw-60} ${yw-118} L${N.f(xw-60+160*pw)} ${N.f(yw-118+40*pw)} M${xw-60} ${yw-118} L${N.f(xw-60+40*pw)} ${N.f(yw-118+160*pw)}" stroke="${N.INK}" stroke-width="3" opacity=".65"/>`;
          const ang=(t-T('p7'))*420; s+=`<g transform="translate(1030 ${a.G-400})"><circle r="74" fill="${N.PAP}" stroke="${N.INK}" stroke-width="8"/><path d="M0 0 L${N.f(52*Math.sin(ang*Math.PI/180))} ${N.f(-52*Math.cos(ang*Math.PI/180))}" stroke="${N.ACC}" stroke-width="7" stroke-linecap="round"/><path d="M0 0 L${N.f(32*Math.sin(ang/12*Math.PI/180))} ${N.f(-32*Math.cos(ang/12*Math.PI/180))}" stroke="${N.INK}" stroke-width="10" stroke-linecap="round"/></g>`; } }
      // bulle vide de Tico
      { const pb=a.ressort(t,T('p3')+2.2,.4)*(1-N.cl((t-T('p4'))/.2)); if(pb>0) s+=a.etiquette(Ti.x-60,a.G-340,'…',{taille:90,p:pb,rot:-4}); }
      // la chaîne de Sarah
      s+=N.chaine(a,t,F);
      // Sarah : elle arrive, frappe, revient, pousse
      { const tA=T('p4'), tB=T('frappe')-.2, tR=T('oui')+.1, tP=P8+.15, debout=t<=tA+.1||t>=tB&&t<=tR||t>=tP; let xs=N.L(1560,560,N.eio((t-tA)/(tB-tA))); if(t>tR) xs=N.L(560,1210,N.eio((t-tR)/(tP-tR)));
        const pousse=t>tPush-.25&&t<tPush+.4, frp=t>T('frappe')-.05&&t<T('frappe')+.4;
        if(t>tA-.2&&t<T('p9')) s+=N.sarah(a,xs,a.G,t,{marche:!debout,mouth:t>T('p6')?'grin':'smile',look:t>tR&&t<tP?[.5,0]:(t<tR?[-.8,0]:[.8,0]),armL:frp?[-110,-30+18*Math.sin(t*44)]:undefined,armR:pousse?[N.L(70,120,N.eo((t-tPush+.25)/.25)),-40]:undefined,handR:pousse?'point':undefined});
        const pn=a.ressort(t,T('p4')+.1,.4)*(1-N.cl((t-T('frappe')+.3)/.2)); if(pn>0) s+=a.etiquette(xs,a.G-330,'SARAH',{taille:50,p:pn,rot:3});
        // sa demande et le tampon OUI
        const pd=a.ressort(t,T('p5')+.1,.4)*(1-N.cl((t-T('oui')+.1)/.08)); if(pd>0){ s+=a.etiquette(640,a.G-470,'+ 100 € ?',{taille:84,fond:'acc',p:pd*(1+.05*Math.sin(t*9)),rot:-3+3*Math.sin(t*5)}); if(t<T('oui')) s+=a.piece(640+300*Math.cos(t*4.2),a.G-470+120*Math.sin(t*4.2),64,{tour:t*2,txt:'€'}); }
        const pSe=a.ressort(t,T('seule'),.35)*(1-N.cl((t-T('p6')+.1)/.2)); if(pSe>0) s+=`<g transform="translate(560 ${a.G-340}) scale(${N.f(pSe)})"><path d="M-14 60 V-40 a14 14 0 0 1 28 0 V60" fill="${N.PAP}" stroke="${N.INK}" stroke-width="8"/><rect x="-44" y="30" width="88" height="60" rx="24" fill="${N.PAP}" stroke="${N.INK}" stroke-width="8"/></g>`;
        const tOui=T('oui')-.08; if(t>tOui&&t<T('p7')+.75){ s+=a.tampon(640,a.G-470,'OUI',N.cl((t-tOui)/.14),{taille:120,rot:-8}); if(t<tOui+.5) s+=a.onde(640,a.G-470,300,(t-tOui)/.5); } }
      // l'étiquette sur le front de chute : le chiffre roule
      if(t>tPush&&t<tCh+.1&&F<N.N){ const i=Math.min(N.N-1,Math.floor(F)), x=N.XP[i], y=a.G-N.H[i]-110, v=Math.round(N.L(100,12000,N.cl(F/N.N))/100)*100; s+=a.etiquette(x+50,y,a.fmt(v,'€'),{taille:Math.min(130,70+F*3),fond:'encre',rot:-3}); }
      // le géant s'écrase : onde, éclats, pluie de pièces, grosse pièce qui roule
      if(t>tCh+.16){ s+=a.onde(N.XL+560,a.G-20,700,(t-tCh-.16)/.5)+a.eclats(N.XL+640,a.G-60,t,tCh+.16,{n:20,force:640}); s+=N.pluie(a,t,tCh+.18,N.XL+620,1,30,1.1)+N.pluie(a,t,tCh+.2,N.XL+520,-1,16,.85);
        const dr=t-(T('p10')+.5); if(dr>0){ const xr=N.XL+260+640*dr*.55; s+=a.piece(xr,a.G-90,90,{tour:dr*1.6}); }
        s+=a.txt(N.XL+900,a.G+70,24,'SM','#6b645a','100 € × 12 MOIS × 10 ANS · NET AVANT IMPÔT',{ls:1,op:N.cl((t-T('choc')-.5)/.4)*(1-N.cl((t-T('p10')+.2)/.2))}); }
      if(t<T('p3')) s+=a.eclats(N.XL+200,a.G-20,t,-.1,{n:14,force:380,duree:2.1});
      // ── LA SPIRALE (moment 3D) : la chaîne vue d'au-dessus, elle tourne pendant que le front descend ──
      if(t>P8+2.1&&t<T('p9')+.8){ const cx=N.X_SP, cy=1120, phi=(t-P8)*.95, nb=44, u0=N.cl((t-(P8+2.28))/(T('p9')+.6-(P8+2.28))); const items=[];
        s+=`<ellipse cx="${cx}" cy="${cy}" rx="680" ry="${N.f(680*.46)}" fill="#e6d4b8" stroke="${N.INK}" stroke-width="8"/><ellipse cx="${cx}" cy="${cy+20}" rx="680" ry="${N.f(680*.46)}" fill="none" stroke="${N.INK}" stroke-width="3" opacity=".3"/>`;
        for(let k=0;k<nb;k++){ const u=k/nb, th=u*Math.PI*4.6+phi, r=90+u*540, x=cx+r*Math.cos(th), y=cy+r*.46*Math.sin(th), pr=.72+.28*(y-cy+250)/500, fr=N.cl((u0*nb*1.08-k)/2.2); items.push({k,x,y,pr,fr,th}); }
        items.sort((p,q)=>p.y-q.y);
        for(const d of items){ const h=(150+d.k*2.2)*d.pr, w=58*d.pr, hh=h*Math.cos(d.fr*1.35), sk=d.fr*1.35*Math.sin(d.th)*40;
          s+=`<g transform="translate(${N.f(d.x)} ${N.f(d.y)}) skewX(${N.f(-sk*.6)})">`+a.boite(-w/2,0,w,Math.max(14,hh),{couleur:d.fr>.5?'#a04524':N.ACC,prof:w*.3,cote:'#8f3c1e',dessus:'#d97a55',trait:4})+'</g>'; }
        const v=Math.round(N.L(100,12000,Math.pow(N.cl((t-tPush)/(tCh-tPush)),1.6))/100)*100; s+=a.etiquette(cx,cy-470,a.fmt(v,'€'),{taille:120,fond:'encre',rot:-2}); }
      return s; },
    sons:[['p1','ecrase-lourd-1',.25],['p1+.05','chute-sifflet',.14],['hook','coup-1',.25],['p2_fin','riser',.16],['p3+.2','pouc-1',.2],['p3+.55','papier-glisse',.2],['p3+.85','papier-froisse',.14],['p3+1.15','tape-leger-1',.18],['p3+1.45','tape-leger-2',.18],['p3+1.75','tape-leger-3',.18],['p3+2.05','tape-leger-1',.18],['p3+2.3','pouc-3',.2],
          ['p4+.1','pouc-2',.2],['frappe','coup-1',.28],['frappe+.14','coup-2',.28],['frappe+.28','coup-3',.28],['p5-.1','papier-glisse',.25],['p5+.2','pouc-4',.25],['seule','hop',.2],['oui-.08','tampon',.5],['p7+.3','clic-1',.12],['p7+.7','clic-2',.12],['p7+1.1','clic-3',.12],['p7+1.5','clic-4',.12],
          ['p8+.3','pouc-1',.25],...[...Array(D.N).keys()].filter(i=>i%2===0&&D.tomb(i)<4.3).map(i=>['p8+'+D.tomb(i).toFixed(2),['tape-leger-1','tape-leger-2','tape-leger-3','assiette-legere-1','assiette-legere-2'][i%5],.2]),
          ['p8+2.3','riser',.12],['choc','ecrase-lourd-2',.42],['choc+.05','caisse-ching',.32],['choc+.1','metal-leger-1',.3],['choc+.3','metal-leger-2',.3],['choc+.5','metal-leger-3',.25],['choc+.7','metal-leger-1',.25],['p10+.6','pouc-2',.2],['p10+1.4','metal-leger-2',.2],['p10+2.1','boing',.2]],
    actions:[['p1','p2_fin','le géant bascule au ralenti'],['p2_fin','p3+.4','les dominos se relèvent'],['p3','p4','la pile de dossiers monte'],['p4','frappe+.4','Sarah marche et frappe'],['p5-.25','oui+.5','la porte s\'ouvre, le tampon OUI'],['p7','p8','la toile et l\'horloge'],['p8','choc+.6','la chaîne tombe'],['choc','p11','les pièces pleuvent et roulent']] },

  /* ═══════════ MOT : SAUF QUE ═══════════ */
  { type:'mot', de:'p11', a:'tico+.35', txt:'SAUF<br>QUE.', fond:'encre', entree:'tourne',
    dessin:(t,a)=>{ let s=''; const p=a.sg(t,a.t0,a.t1); for(let k=0;k<11;k++){ const x=100+k*82, fr=a.cl((p*11*1.1-k)/1.6); s+=`<g transform="rotate(${a.f(78*fr)} ${x+52} 1420)">`+a.boite(x,1420,52,150,{couleur:a.ACC,prof:12,cote:'#8f3c1e',dessus:'#d97a55',trait:4})+'</g>'; } return s; } },

  /* ═══════════ 2 · LA COURSE DE TICO (p11 → p19) : il pousse à la main, tas égaux, le vrai prix ═══════════ */
  { type:'monde', de:'tico', a:'p19', nom:'course-de-tico', largeur:X_T+1400, visuels:['course','poussée','icônes barrées'],
    acteur:[ {at:'tico',x:560,y:1300},
             {at:'p12+.45',x:860,y:1300,mouvement:'marche',depuis:'p12+.0'},
             {at:'resto',x:RK(0)-180,y:1300,mouvement:'marche',depuis:'p12+1.5'},
             ...[1,2,3,4,5,6,7,8].map((k,i)=>({at:`p13+${(.18+i*.33).toFixed(2)}`,x:RK(k)-170,y:1300,mouvement:'saut',hauteur:70,duree:.28})),
             {at:'p14',x:X_T,y:-900,mouvement:'teleport'},
             {at:'tas+.1',x:X_T,y:880,mouvement:'chute',depuis:'tas-.5'},
             {at:'p17+.5',x:X_T,y:940,mouvement:'glisse',duree:.5} ],
    cadres:[ D.CA('tico',1050,1.25,60),
             D.C('p11_fin-.5',620,1000,900,1.35,{coupe:true,rot:-3}),
             D.C('p12+.12',920,1300,1100,1.2,{coupe:true}),
             D.C('p12+1.35',1000,1100,960,1.5,{coupe:true,rot:2}),
             D.C('resto-.15',RK(0)-20,1000,960,1.55,{coupe:true}),
             D.CA('p13',1140,1.0,120),
             D.CA('p13+.9',1160,1.3,160,{coupe:true,rot:-4}),
             D.CA('p13+1.7',1150,.72,-260,{coupe:true,rot:3}),
             D.C('p13_fin-.12',RK(8)+180,1300,1150,.8,{coupe:true}),
             D.C('p14',X_S+300,1300,1150,.62,{coupe:true,zoomFin:.66}),
             D.C('p14+1.1',X_T,950,800,.9,{coupe:true}),
             D.C('tas-.1',X_S+310,1300,1180,.72,{coupe:true}),
             D.C('p15',X_S+310,1000,850,1.0,{coupe:true,rot:-2}),
             D.C('regarde',X_S+40,980,950,1.35,{coupe:true}),
             D.C('p16',X_S,920,880,1.45,{coupe:true,rot:2}),
             D.C('p16+1.1',X_S-40,1000,950,1.05,{transition:.35}),
             D.C('p17+.12',X_T,950,840,1.5,{coupe:true,rot:-3}),
             D.C('p17+.85',X_T,900,860,1.0,{coupe:true}),
             D.C('p18',X_S+310,1300,1170,.72,{coupe:true}),
             D.C('pas',X_T-40,1160,1000,1.15,{coupe:true,rot:2}) ],
    dessin:(t,a)=>{ const N=D, T=k=>a.T(k), Ti=a.acteur(t); let s=N.couloir(a,-300,X_T+1400);
      // l'idée : l'ampoule
      const pB=a.ressort(t,T('tico')+.05,.45), uB=N.cl((t-T('p11_fin')+.45)/.7), xB=N.L(560,960,N.eio(uB)), yB=N.L(a.G-470,a.G-200,uB*uB)-140*Math.sin(Math.PI*uB)*(1-uB); if(pB>0&&uB<1){ if(uB<.45) s+=a.icone('bulb',xB,yB,150*pB,{couleur:N.INK,fond:N.OR,ep:8}); else s+=a.piece(xB,yB,62,{tour:uB*2,txt:'€'}); if(t<T('tico')+.8) s+=a.onde(560,a.G-470,240,(t-T('tico'))/.8); }
      // le pot : la pièce de 100 € qui tombe dedans, chaque mois
      s+=a.boite(800,a.G,320,190,{couleur:N.BOIS,prof:50,trait:6});
      for(let k=0;k<4;k++){ const t0=T('p12')+.35+k*.42; if(t>t0-.3&&t<t0+.05){ const u=N.cl((t-t0+.3)/.3); s+=a.piece(960,N.L(a.G-620,a.G-200,u*u),62,{tour:u*2,txt:'€'}); } if(t>t0&&t<t0+.25) s+=a.onde(960,a.G-190,150,(t-t0)/.25); }
      { const pe=a.ressort(t,T('p12')+.2,.4)*(1-N.cl((t-T('resto')+.2)/.2)); if(pe>0) s+=a.etiquette(1180,a.G-430,'100 €',{taille:88,fond:'acc',p:pe,rot:-3}); }
      // ses dominos à lui : un plaisir barré par domino
      for(let k=8;k>=0;k--){ const tk=k===0?T('resto')+.95:T('p13')+.18+(k-1)*.33+.02, fr=N.cl((t-tk)/.2), bar=k===0?N.cl((t-T('resto')-.1)/.25):(t>tk-.8?1:N.cl((t-T('p13')+.3)/.2));
        s+=a.ombre(RK(k)-60,a.G+6,230)+N.domino(a,RK(k),a.G,380,190,78*Math.pow(fr,.8),{col:N.INK,ic:ICN[k],barre:bar}); if(t>tk&&t<tk+.3) s+=a.onde(RK(k)+60,a.G-30,190,(t-tk)/.3,{couleur:N.INK}); }
      if(t>T('p13_fin')-.1) s+=N.pluie(a,t,T('p13_fin')-.1,RK(8)+80,1,30,1.3);
      // le 120 qui suit Tico + gouttes de sueur
      if(t>T('p13')+.1&&t<T('p14')-.05){ const v=Math.round(N.L(1,120,N.cl((t-T('p13'))/(T('cent20')-T('p13'))))); s+=a.etiquette(Ti.x+110,a.G-560,String(v),{taille:130,fond:'acc',rot:-4});
        for(let g=0;g<5;g++){ const d=((t*2.2+g*.2)%1); s+=`<ellipse cx="${N.f(Ti.x-70-d*60-g*14)}" cy="${N.f(a.G-260-g*18+d*d*180)}" rx="10" ry="15" fill="#8fb7d8" stroke="${N.INK}" stroke-width="3" opacity="${N.f(1-d)}"/>`; } }
      // ── les deux tas : ils montent ensemble ──
      const pT=N.eo((t-T('p14')-.15)/(T('tas')-T('p14')-.3));
      if(t>T('p14')-.3){ s+=N.tas(a,X_S,pT)+N.tas(a,X_T,pT);
        for(let k=0;k<20;k++){ const t0=T('p14')+k*.09; if(t>t0&&t<t0+.4){ const u=(t-t0)/.4, xx=k%2?X_S-120+(k*37%240):X_T-120+(k*53%240); s+=a.piece(xx,N.L(120,a.G-30-pT*400,u*u),36,{tour:u*2}); } }
        const yS=a.G-pT*420; const sipp=t>T('p16')-.2&&t<T('parle'), bu=sipp?.5+.5*Math.sin(t*3.2):0;
        s+=N.sarah(a,X_S,yS,t,{mouth:'smile',eyes:bu>.6?'closed':undefined,cheeks:true,look:[.2,-.1],armR:[70,-40-30*bu],handR:'fist'});
        s+=a.icone('coffee',X_S+84,yS-200-30*bu,64,{couleur:N.INK,fond:N.PAP,ep:6});
        if(t>T('tas')-.1&&t<T('p15')+.05){ s+=a.etiquette(X_S,a.G-170,'SARAH',{taille:56,p:.95}); s+=a.etiquette(X_T,a.G-170,'TICO',{taille:56,fond:'encre',p:.95}); }
        // le chiffre qui claque au-dessus des deux tas
        const pC=a.ressort(t,T('tas'),.4)*(1-N.cl((t-T('p15')+.05)/.15)); if(pC>0){ s+=a.etiquette(X_S+310,a.G-640,'12 000 €',{taille:120,fond:'acc',p:pC,rot:-2}); s+=`<path d="M${X_S+40} ${a.G-540} L${X_S+150} ${a.G-580} M${X_T-40} ${a.G-540} L${X_T-150} ${a.G-580}" stroke="${N.INK}" stroke-width="7" opacity="${N.f(pC)}"/>`; }
        for(let k=0;k<24;k++){ const t0=T('p15')+k*.07; if(t>t0&&t<t0+.38){ const u=(t-t0)/.38, xx=k%2?X_S-170+(k*37%340):X_T-170+(k*53%340); s+=a.piece(xx,N.L(380,a.G-30-(.5+.5*((k*17)%10)/10)*400,u*u),46,{tour:u*2}); } }
        // le tampon, puis le doute (la loupe)
        const tEg=T('p15')+.02; if(t>tEg&&t<T('p16')-.15){ if(t<T('regarde')-.02) s+=a.tampon(X_S+310,a.G-560,'ÉGALITÉ ?',N.cl((t-tEg)/.14),{taille:76,rot:-6}); if(t>T('regarde')) s+=a.icone('search',X_S-120+(t-T('regarde'))*320,a.G-420,240,{couleur:N.ACC,fond:'#f2c46b88',ep:9}); }
        // Sarah : la vie qui continue (ses plaisirs tournent, intacts)
        if(t>T('p16')-.1&&t<T('p17')+.1){ ICN.slice(0,5).forEach((ic,k)=>{ const an=t*1.4+k*1.26, xx=X_S+N.cl((t-T('p16'))/.5)*240*Math.cos(an), yy=yS-180+N.cl((t-T('p16'))/.5)*120*Math.sin(an); s+=a.icone(ic,xx,yy,72,{couleur:N.INK,fond:N.PAP,ep:6}); }); }
        // Tico : les plaisirs barrés lui tombent dessus, un par un
        if(t>T('p17')-.1){ for(let k=0;k<18;k++){ const t0=T('p17')+k*.1, d=t-t0; if(d<=0) continue; const xx=X_T-280+(k*97%560), yy=Math.min(a.G-40-N.cl(k/18)*100,180+1500*d*d); const ic=ICN[k%ICN.length]; s+=a.icone(ic,xx,yy,74,{couleur:N.INK,fond:N.PAP,ep:6,rot:(k*47)%30-15})+`<path d="M${xx-34} ${N.f(yy-34)} L${xx+34} ${N.f(yy+34)}" stroke="${N.ACC}" stroke-width="10" stroke-linecap="round"/>`; }
          const pe=a.ressort(t,T('p17')+.5,.4)*(1-N.cl((t-T('p18'))/.2)); if(pe>0) s+=a.etiquette(X_T+175,a.G-430,'120',{taille:110,fond:'acc',p:pe,rot:4}); }
        if(t>T('p19')-.34){ const u=N.cl((t-T('p19')+.34)/.3), yy=N.L(-200,a.G-400,u*u); s+=N.domino(a,X_T+85,yy+400,400,170,0,{col:N.ACC,enc:N.CR,txt:'+ 100 €',taille:38}); }
        // les deux prix qui se balancent
        if(t>T('p18')-.1){ const pt=a.ressort(t,T('p18'),.5), r1=4*Math.sin((t-T('p18'))*3.1), pt2=a.ressort(t,T('pas')-.1,.5), r2=-5*Math.sin((t-T('pas'))*2.8);
          if(t<T('pas')-.1) s+=`<g transform="translate(${X_S} ${a.G-230}) rotate(${N.f(r1)})">`+a.etiquette(0,0,'UNE PHRASE',{taille:64,fond:'acc',p:pt})+'</g>';
          if(pt2>0) s+=`<g transform="translate(${X_T} ${a.G-230}) rotate(${N.f(r2)})">`+a.etiquette(0,0,'120 PRIVATIONS',{taille:64,fond:'encre',p:pt2})+'</g>'; } }
      return s; },
    sons:[['tico','ping',.3],['tico+.1','bong',.22],...[0,1,2,3].map(k=>[`p12+${(.35+k*.42).toFixed(2)}`,`metal-leger-${k%3+1}`,.3]),['resto','erreur',.2],['resto+.1','tampon',.22],['resto+.95','tombe-1',.3],
          ...[1,2,3,4,5,6,7,8].map((k,i)=>[`p13+${(.2+i*.33).toFixed(2)}`,`tombe-${k%4+1}`,.25]),['p14+.1','caisse-ching',.28],['p14+.4','metal-leger-1',.25],['p14+.8','metal-leger-2',.25],['p14+1.2','metal-leger-3',.25],['tas','ecrase-moyen-1',.25],['tas+.02','bong',.25],['p15','tampon',.4],['regarde','whoosh-short',.15],['p16+.3','assiette-legere-1',.2],['p16+.9','assiette-legere-2',.2],['p17+.1','tape-leger-1',.2],['p17+.4','tape-leger-2',.2],['p17+.7','tape-leger-3',.2],['p17+1','tape-leger-1',.2],['p17+1.3','erreur',.18],['p18+.05','papier-glisse',.25],['pas-.1','papier-glisse',.25]],
    actions:[['tico','p12','l\'ampoule s\'allume'],['p12','resto','les pièces tombent dans le pot'],['resto','p13','le plaisir barré, le domino tombe'],['p13','p14','Tico pousse les dominos'],['p14','tas+.3','les deux tas montent'],['p15','p16','tampon et loupe'],['p16','parle','les plaisirs tournent autour de Sarah'],['p17','p18','les plaisirs barrés pleuvent'],['p18','p19','les deux prix se balancent']] },

  /* ═══════════ MOT : UNE FOIS (par-dessus la scène 2) ═══════════ */
  { type:'mot', de:'parle', a:'p16_fin+.3', txt:'UNE<br>FOIS.', fond:'acc', entree:'zoom',
    dessin:(t,a)=>{ const fr=a.eo(a.sg(t,a.t0+.25,a.t1)); return `<g transform="rotate(${a.f(62*fr)} 620 1450)">`+a.boite(460,1450,160,300,{couleur:a.INK,prof:30,cote:'#3a3530',dessus:'#4a443d',trait:5})+'</g>'; } },

  /* ═══════════ 3 · LE NON (p19 → p23) : le tampon, le domino qui tient, le chrono et le calendrier, la fiche de paie ═══════════ */
  { type:'monde', de:'p19', a:'p23', nom:'le-non', largeur:5200, visuels:['tampon NON','calendrier','fiche de paie'],
    acteur:[ {at:'p19',x:1130,y:1300},
             {at:'ton',x:1980,y:1300,mouvement:'marche',depuis:'p21+1.1'},
             {at:'p22',x:2860,y:1300,mouvement:'teleport'},
             {at:'fiche+.1',x:3020,y:1300,mouvement:'marche',depuis:'p22+.05'} ],
    cadres:[ D.C('p19',780,1300,1140,1.0),
             D.C('non-.2',880,1050,1000,1.4,{coupe:true,rot:-3}),
             D.C('p20',960,1300,1150,1.25,{coupe:true}),
             D.C('p20+1',1090,1040,940,1.5,{coupe:true,rot:2}),
             D.C('p21',1550,1300,1150,1.05,{coupe:true}),
             D.C('p21+.9',1880,1300,1180,1.3,{coupe:true,rot:-3}),
             D.C('ton-.05',2350,1300,1150,.72,{coupe:true}),
             D.C('ton+.65',2350,600,800,.62,{transition:.5}),
             D.C('p22',3620,1000,860,.7,{coupe:true}),
             D.C('fiche+.15',3620,820,700,1.0,{coupe:true,rot:2}),
             D.C('depuis-.25',3780,1120,980,1.5,{coupe:true}),
             D.C('depuis+.8',3400,1040,1040,1.1,{coupe:true,rot:-2}) ],
    dessin:(t,a)=>{ const N=D, T=k=>a.T(k), tH=T('non')+.05; let s=N.couloir(a,-300,5400);
      const op=N.cl((t-(T('non')-.6))/.25)*(1-N.cl((t-T('p20'))/.3)); s+=N.porte(a,190,t,op,t>tH&&t<tH+.35?5:0,t<T('p20')-.2&&t>T('p19')+.1);
      // le petit domino de la demande : le tampon le frappe, il vacille, il reste debout
      const dT=t-tH, d0=t-T('p19'), wob=(dT>0?16*Math.sin(dT*9)*Math.exp(-1.25*dT):0)+(d0>0?7*Math.sin(d0*10)*Math.exp(-3*d0):0);
      s+=a.ombre(860,a.G+6,270)+`<g transform="rotate(${N.f(wob)} ${wob>=0?960:790} ${a.G})">`+N.domino(a,960,a.G,400,170,0,{col:N.ACC,enc:N.CR,txt:'+ 100 €',taille:38})+'</g>';
      // le bras du tampon qui sort de la porte
      if(t>T('non')-.55&&t<T('p20')+.2){ const u=N.eio((t-(T('non')-.5))/.5), ret=N.cl((t-tH-.02)/.25), xx=N.L(420,875,u)-ret*420, yy=N.L(860,a.G-410,u)-ret*60;
        s+=`<path d="M380 860 L${N.f(xx)} ${N.f(yy-70)}" stroke="${N.INK}" stroke-width="24" stroke-linecap="round"/>`+a.boite(xx-110,yy,220,70,{couleur:N.INK,cote:'#3a3530',dessus:'#4a443d',prof:26,trait:6})+a.boite(xx-40,yy-70,80,80,{couleur:N.BOIS,prof:18,trait:5}); }
      if(t>tH) s+=a.tampon(875,a.G-470,'NON',N.cl(dT/.12),{taille:100,rot:-10})+a.onde(875,a.G-430,300,dT/.5);
      // le panneau OUI / NON qui ne décide pas
      { const pa=a.ressort(t,T('p20'),.4)*(1-N.cl((t-T('p21'))/.2)); if(pa>0){ const fl=Math.floor((t-T('p20'))*3.3)%2===0; s+=a.etiquette(1160,a.G-560,fl?'OUI ?':'NON ?',{taille:96,fond:fl?'acc':'encre',p:pa,rot:(fl?-4:4)}); } }
      // le chrono de dix secondes qui file, et disparaît
      { const u=(t-(T('p21')+.1))/(T('ton')-T('p21')-.1); if(u>0&&u<1.05){ const xr=N.L(1500,2030,u); s+=a.icone('stopwatch',xr,a.G-230,420,{couleur:N.INK,fond:N.PAP,ep:9,rot:u*520}); } if(t>T('ton')&&t<T('ton')+.5) s+=a.onde(2030,a.G-140,260,(t-T('ton'))/.5,{couleur:N.INK}); }
      // le silence : les pages de calendrier s'empilent très haut
      { const t0=T('ton')+.05; for(let k=0;k<11;k++){ const tk=t0+k*.12, u=N.cl((t-tk)/.2); if(u<=0) continue; const yb=a.G-k*118, dy=(1-u*u)*-800, wob=k%2?-16:16; s+=`<g transform="translate(${2350+wob} ${N.f(yb+dy)}) rotate(${(k%3-1)*2})">`+a.boite(-200,0,400,118,{couleur:k%2?N.PAP:N.CR,prof:34,trait:5})+`<rect x="-200" y="-118" width="400" height="26" fill="${N.ACC}" stroke="${N.INK}" stroke-width="4"/>`+a.icone('calendar',0,-48,62,{couleur:N.INK,ep:6})+'</g>'; } }
      // la fiche de paie : elle arrive, la loupe cherche le net, la toile pousse dessus
      if(t>T('p22')-.2){ const u=N.eo((t-T('p22'))/.45), x0=3180+(1-u)*1500, y0=480, w=880,h=800;
        s+=`<g transform="translate(${N.f(x0)} ${y0}) rotate(${N.f(-2+(1-u)*10+1.6*Math.sin(t*2.6)+78*N.ei((t-T('p23')+.35)/.35))} ${w} ${h})"><rect x="10" y="12" width="${w}" height="${h}" fill="${N.INK}" opacity=".2"/><rect width="${w}" height="${h}" rx="6" fill="${N.PAP}" stroke="${N.INK}" stroke-width="7"/><rect width="${w}" height="66" fill="${N.ACC}" stroke="${N.INK}" stroke-width="7"/>`+(t<T('depuis')-.35?a.txt(w/2,48,44,'SM',N.CR,'FICHE DE PAIE',{ls:3}):'');
        for(let r=0;r<8;r++){ const l=N.eo((t-T('p22')-.2-r*.05)/.3); s+=`<rect x="44" y="${100+r*62}" width="${N.f(460*l)}" height="24" rx="6" fill="#d6ccbb"/><rect x="${w-240}" y="${100+r*62}" width="${N.f(190*l)}" height="24" rx="6" fill="#d6ccbb"/>`; }
        s+=a.txt(w-310,h-62,74,'IS',N.INK,'NET',{a:'end'}); s+=`<rect x="${w-280}" y="${h-120}" width="230" height="70" rx="8" fill="#e6d4b8"/>`;
        const pC=N.cl((t-T('fiche')-.15)/.5); if(pC>0){ s+=`<path d="M${w-310} ${h-90} a150 70 0 1 1 8 40" fill="none" stroke="${N.ACC}" stroke-width="10" stroke-linecap="round" stroke-dasharray="${N.f(760*pC)} 900"/>`; }
        const pW=N.cl((t-T('depuis'))/1.3); if(pW>0){ s+=`<path d="M${w} ${h} L${N.f(w-300*pW)} ${h} M${w} ${h} L${w} ${N.f(h-300*pW)} M${w} ${h} L${N.f(w-250*pW)} ${N.f(h-170*pW)} M${w} ${h} L${N.f(w-160*pW)} ${N.f(h-250*pW)}" stroke="${N.INK}" stroke-width="4" opacity=".75"/>`; for(let r=1;r<=3;r++) s+=`<path d="M${N.f(w-85*r*pW)} ${h} Q${N.f(w-70*r*pW)} ${N.f(h-55*r*pW)} ${N.f(w-55*r*pW)} ${N.f(h-65*r*pW)} Q${N.f(w-30*r*pW)} ${N.f(h-70*r*pW)} ${w} ${N.f(h-85*r*pW)}" fill="none" stroke="${N.INK}" stroke-width="3" opacity=".6"/>`; const ya=h-300*pW+22*Math.sin(t*2); s+=`<path d="M${w-22} ${N.f(h-300*pW-60)} V${N.f(ya)}" stroke="${N.INK}" stroke-width="3"/><ellipse cx="${w-22}" cy="${N.f(ya+12)}" rx="16" ry="20" fill="${N.INK}"/>`; }
        s+='</g>'; const lu=N.eio((t-T('fiche'))/1.1), lx=N.L(3420,3840,lu)+(t>T('fiche')+1.1?110*Math.sin((t-T('fiche')-1.1)*3.2):0), ly=N.L(760,1180,lu); if(t>T('fiche')-.1) s+=a.icone('search',lx,ly,260,{couleur:N.INK,fond:'#f2c46b88',ep:9}); }
      return s; },
    sons:[['p19','ecrase-moyen-1',.3],['p19+.3','pas-bois-1',.2],['non-.5','whoosh',.2],['non+.25','tampon',.35],['non+.1','ecrase-moyen-2',.25],['non+.55','tape-leger-1',.18],['non+.9','tape-leger-2',.16],['non+1.25','tape-leger-3',.14],['p20+.1','boing',.16],['p20+.4','clic-1',.14],['p20+.7','clic-2',.14],['p20+1','clic-3',.14],['p20+1.3','clic-4',.14],
          ['p21+.1','clic-1',.18],['p21+.3','clic-2',.18],['p21+.5','clic-3',.18],['p21+.7','clic-4',.18],['p21+.9','clic-1',.18],['p21+1.2','clic-2',.18],['ton','bong',.2],...[...Array(11).keys()].map(k=>[`ton+${(.25+k*.12).toFixed(2)}`,['tape-leger-1','tape-leger-2','tape-leger-3'][k%3],.2]),
          ['p22+.05','papier-glisse',.35],['p22+.6','papier-froisse',.16],['fiche+.15','clic-1',.2],['fiche+.45','clic-2',.14],['depuis','tape-leger-3',.16],['depuis+.7','pouc-2',.16],['p23-.1','tombe-2',.3]],
    actions:[['p19','non+1.4','le tampon frappe, le domino vacille'],['p20','p21','le panneau hésite'],['p21','ton+.4','le chrono file'],['ton','p22','les pages s\'empilent'],['p22','p23','la fiche arrive, la loupe cherche, la toile pousse']] },

  /* ═══════════ 4 · LES DEUX DOMINOS (p23 → fin) : la bascule, et retour à l'image 0 ═══════════ */
  { type:'monde', de:'p23', nom:'bascule-finale', largeur:X_G+1800, visuels:['bascule','deux camps'],
    acteur:[ {at:'p23',x:640,y:1300},
             {at:'p24+2.35',x:(D.XP[20]-D.XP[14]+1500)+180,y:1300,mouvement:'marche',depuis:'p24+.1'},
             {at:'p24+2.4',x:X_G+420,y:1300,mouvement:'teleport'} ],
    cadres:[ D.C('p23',640,1100,1000,.88),
             D.C('p23+1.2',640,980,860,.9,{coupe:true,rot:3}),
             D.C('demandes',640,1300,1150,.88,{coupe:true}),
             D.C('demandes+.75',990,1000,920,1.2,{coupe:true,rot:-3}),
             D.C('p24',990,1300,1170,1.0,{coupe:true}),
             D.CA('p24+.75',1170,.85,0,{coupe:true}),
             D.CA('p24+1.5',1170,.7,0,{transition:.5}),
             D.C('p24+2.45',X_G-240,1300,1180,.6,{coupe:true}),
             D.C('p24+3.1',X_G+40,1300,1160,.86,{coupe:true,zoomFin:.92}) ],
    dessin:(t,a)=>{ const N=D, T=k=>a.T(k), dx=1500-N.XP[14], Xg=X_G, tB=T('p24')+.25, end=a.K.end, Ti=a.acteur(t); let s=N.couloir(a,-300,Xg+1600);
      const ty=(t-T('p23'))*3.1, bal=t<tB?Math.sin(ty*1.7):0;
      // les deux dominos face à face : ATTENDRE à gauche, DEMANDER à droite (c'est lui qui lance la chaîne)
      const angD=t<tB?(3+7*bal):N.L(10,78,N.eio((t-tB)/.32)); const angA=t<tB?(3-7*bal):3*Math.cos((t-tB)*3);
      s+=a.ombre(290,a.G+6,380)+N.domino(a,460,a.G,560,340,angA,{col:N.INK,txt:'ATTENDRE',taille:58});
      s+=a.ombre(990,a.G+6,380)+N.domino(a,1160,a.G,560,340,angD,{col:N.ACC,enc:N.CR,txt:'DEMANDER',taille:58});
      // 12 000 € pour une phrase : la bulle
      { const p=a.ressort(t,T('p23')+.05,.4)*(1-N.cl((t-T('demandes')+.2)/.2)); if(p>0){ s+=a.etiquette(640,a.G-760,'12 000 €',{taille:104,fond:'acc',p,rot:-2}); s+=a.etiquette(640,a.G-625,'UNE PHRASE',{taille:60,p,rot:2}); } }
      // la chaîne : elle part du domino DEMANDER et finit sur le géant de l'image 0
      const F=t<tB+.2?14:(t<end-1.8?N.L(14,N.N,Math.pow((t-tB-.2)/(end-1.8-tB-.2),1.25)):N.N+1.15*N.cl((t-(end-1.8))/1.8));
      s+=N.chaine(a,t,F,dx,14);
      // Tico, le téléphone
      if(t>T('p24')-.1&&t<T('p24')+2.35){ const b=1+.08*Math.sin(t*9), ta=Ti.x+70; s+=`<g transform="translate(${N.f(ta+40)} ${a.G-330}) scale(${N.f(b)})">`+a.icone('device-mobile',0,0,200,{couleur:N.INK,fond:N.PAP,ep:9})+'</g>'; const pm=((t-T('p24')-.4)%.7)/.7; if(t>T('p24')+.4) s+=a.icone('send',N.L(ta,ta+360,pm),a.G-320-200*pm,110,{couleur:N.ACC,fond:N.OR,ep:6}); }
      if(t>end-1.8) s+=a.eclats(Xg+200,a.G-20,t,end-1.8,{n:14,force:380,duree:1.7});
      // rappel muet + la source, posés au sol
      { const pr=a.ressort(t,end-1.45,.4); if(pr>0) s+=a.etiquette(Xg+60,a.G+100,'+ Abonne-toi',{taille:80,fond:'acc',p:pr*(1+.03*Math.sin(t*7)),rot:-2}); if(t>end-1.45) s+=a.txt(Xg+60,a.G+200,22,'SM','#6b645a','100 € × 12 MOIS × 10 ANS · NET AVANT IMPÔT · EXEMPLE',{ls:1}); }
      return s; },
    sons:[['p23+.1','caisse-ching',.2],['p23+.5','clic-1',.14],['p23+.9','clic-2',.14],['p23+1.3','clic-3',.14],['p23+1.7','clic-4',.14],['p23+2.1','clic-1',.14],['p23+2.5','clic-2',.14],['p23+2.9','clic-3',.14],['p24+.25','tombe-2',.28],['p24+.45','whoosh-short',.12],['p24+.6','tape-leger-1',.2],['p24+1','tape-leger-2',.2],['p24+1.35','tape-leger-3',.2],['p24+1.7','assiette-legere-1',.2],['p24+2','assiette-legere-2',.2],['p24+2.3','tape-leger-1',.2],['p24+2.6','tape-leger-2',.2],['p24+2.9','chute-sifflet',.16],['p24_fin','pop',.2]],
    actions:[['p23','p24+.25','les deux dominos oscillent'],['p24','end','la chaîne repart jusqu\'au géant']] },
  ],
};
