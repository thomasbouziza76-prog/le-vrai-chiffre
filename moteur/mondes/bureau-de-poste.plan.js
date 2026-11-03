/* N°11 (soir) · « 11 € de taxe sur GTA 6 » · MONDE : le bureau de poste des Go.
   1 Go = un timbre payé par celui qui envoie. L'étiquette « +11 € » est la rumeur : elle colle à tout, jusqu'à ce qu'on la décolle.
   Boîte de jeu générique (JEU + manette) : aucun visuel, logo ni univers du jeu. */
const PO=(()=>{
  const INK='#1c1a17',PAP='#fbf8f2',ACC='#c4552d',CR='#f6f1e8',OR='#f2c46b',BL='#8fb7d8',KR='#d9b98a',KR2='#c7a36f',MUR='#f1e9db';
  const cl=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)), f=n=>Math.round(n*10)/10;
  const C=(at,x,Yw,sy,z,o={})=>Object.assign({at,cible:[x,Yw-(sy-960)/z+120],zoom:z},o);
  // l'étiquette de prix : la rumeur
  function etiq(a,x,y,o={}){ const s=o.s??1, r=o.rot??-8, tx=o.txt??'+11 €', w=o.w??470, h=o.h??210, tz=o.tz??118;
    let g=`<g transform="translate(${f(x)} ${f(y)}) rotate(${f(r)}) scale(${f(s*(o.sx??1))} ${f(s*(o.sy??1))})" opacity="${f(o.op??1)}">`;
    const P=`M${-w/2+70} ${-h/2} H${w/2} V${h/2} H${-w/2+70} L${-w/2} 0 Z`;
    g+=`<path d="${P}" fill="${INK}" transform="translate(10 12)" opacity=".85"/><path d="${P}" fill="${o.coul||ACC}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>`;
    g+=`<circle cx="${-w/2+62}" cy="0" r="16" fill="${MUR}" stroke="${INK}" stroke-width="6"/>`;
    g+=a.txt(30,tz*.36,tz,'IS',CR,tx)+'</g>'; return g; }
  // un colis
  function colis(a,x,yb,w,h,o={}){ let s=a.boite(x,yb,w,h,{couleur:o.c||KR,cote:KR2,dessus:'#e6cda6',prof:o.prof??46,trait:6});
    s+=`<rect x="${f(x+w/2-w*.07)}" y="${f(yb-h)}" width="${f(w*.14)}" height="${f(h)}" fill="#efe2c8" stroke="${INK}" stroke-width="4"/>`;
    if(o.icone) s+=a.icone(o.icone,x+w/2,yb-h*.62,Math.min(w,h)*.42,{fond:PAP});
    if(o.txt) s+=a.txt(x+w/2,yb-h*.16,o.tz??Math.min(w,h)*.2,'IS',INK,o.txt);
    return s; }
  // une enveloppe
  function env(a,x,y,w,o={}){ const h=w*.62; let g=`<g transform="translate(${f(x)} ${f(y)}) rotate(${f(o.rot||0)}) scale(${f(o.s??1)})">`;
    g+=`<rect x="${f(-w/2+7)}" y="${f(-h/2+9)}" width="${w}" height="${f(h)}" rx="8" fill="${INK}" opacity=".3"/><rect x="${f(-w/2)}" y="${f(-h/2)}" width="${w}" height="${f(h)}" rx="8" fill="${o.c||PAP}" stroke="${INK}" stroke-width="${o.ep??6}"/>`;
    g+=`<path d="M${f(-w/2)} ${f(-h/2)} L0 ${f(h*.08)} L${f(w/2)} ${f(-h/2)}" fill="none" stroke="${INK}" stroke-width="${o.ep??6}"/>`;
    if(o.txt) g+=a.txt(0,h*.34,o.tz??w*.14,'IS',o.ct||INK,o.txt); return g+'</g>'; }
  // un timbre dentelé
  function timbre(a,x,y,w,o={}){ const h=w*1.2, n=8; let d=`M${f(-w/2)} ${f(-h/2)} `;
    for(let i=0;i<n;i++) d+=`q${f(w/n/2)} ${f(w/n*.45)} ${f(w/n)} 0 `; for(let i=0;i<n;i++) d+=`q${f(-w/n*.45)} ${f(h/n/2)} 0 ${f(h/n)} `;
    for(let i=0;i<n;i++) d+=`q${f(-w/n/2)} ${f(-w/n*.45)} ${f(-w/n)} 0 `; for(let i=0;i<n;i++) d+=`q${f(w/n*.45)} ${f(-h/n/2)} 0 ${f(-h/n)} `;
    let g=`<g transform="translate(${f(x)} ${f(y)}) rotate(${f(o.rot||0)}) scale(${f(o.s??1)})"><path d="${d}Z" fill="${o.c||OR}" stroke="${INK}" stroke-width="${o.ep??5}" stroke-linejoin="round"/>`;
    g+=`<rect x="${f(-w*.34)}" y="${f(-h*.36)}" width="${f(w*.68)}" height="${f(h*.72)}" fill="${PAP}" stroke="${INK}" stroke-width="${Math.max(2,w*.018)}"/>`;
    if(o.txt) g+=a.txt(0,h*.08,o.tz??w*.27,'IS',ACC,o.txt)+(o.sous?a.txt(0,h*.26,w*.11,'SM',INK,o.sous):'');
    return g+'</g>'; }
  // le mur du bureau de poste : casiers, câble à enveloppes qui défile, enveloppes qui descendent
  function decor(a,t,x0,x1){ let s=`<rect x="${x0}" y="-1400" width="${x1-x0}" height="2700" fill="${MUR}"/>`;
    for(let x=x0-((x0%150)+150)%150;x<x1;x+=150) s+=`<path d="M${x} -1400 V1300" stroke="#e4d9c6" stroke-width="4"/>`;
    s+=`<rect x="${x0}" y="1120" width="${x1-x0}" height="180" fill="#e0d3bb"/><rect x="${x0}" y="1112" width="${x1-x0}" height="14" fill="${INK}"/>`;
    for(let x=x0-((x0%520)+520)%520;x<x1;x+=520){ s+=`<rect x="${x+70}" y="150" width="340" height="250" rx="6" fill="#e9dfcc" stroke="${INK}" stroke-width="6"/>`;
      for(let i=1;i<4;i++) s+=`<path d="M${x+70+i*85} 150 V400" stroke="${INK}" stroke-width="4"/>`; for(let j=1;j<3;j++) s+=`<path d="M${x+70} ${150+j*83} H${x+410}" stroke="${INK}" stroke-width="4"/>`;
      s+=`<rect x="${x+88}" y="${176}" width="50" height="30" fill="${PAP}" stroke="${INK}" stroke-width="3"/><rect x="${x+258}" y="${262}" width="50" height="30" fill="${OR}" stroke="${INK}" stroke-width="3"/>`; }
    s+=`<path d="M${x0} 70 H${x1}" stroke="${INK}" stroke-width="7"/>`;
    const dec=t*210; for(let x=x0-340;x<x1+340;x+=340){ const X=x+((dec%340)); s+=`<path d="M${f(X)} 70 V102" stroke="${INK}" stroke-width="5"/>`+env(a,X,130,92,{ep:4,rot:3*Math.sin(t*3+x)}); }
    for(let i=0;i<(x1-x0)/260;i++){ const X=x0+i*260+60, P=(t*.09+i*.37)%1, Y=430+P*680; s+=env(a,X+20*Math.sin(t*1.2+i),Y,48,{ep:3,rot:20*Math.sin(t*1.5+i)}); }
    // le sol du bureau (zone sans texte) : carrelage, sacs postaux et colis posés
    for(let r=0;r<7;r++) for(let x=x0-((x0%160)+160)%160+(r%2)*80;x<x1;x+=160) s+=`<rect x="${x+4}" y="${1326+r*92}" width="152" height="84" rx="6" fill="${(Math.round(x/160)+r)%3?'#e6dcc9':'#dccfb8'}" stroke="#c9bca5" stroke-width="3"/>`;
    for(let x=x0-((x0%610)+610)%610+120;x<x1;x+=610){ const k=Math.round(x/610)%3; s+=a.ombre(x+60,1690+k*90,300)+(k===0?a.boite(x-40,1680,190,150,{couleur:KR,cote:KR2,dessus:'#e6cda6',prof:30,trait:5}):k===1?`<path d="M${x-70} ${1780} q-30 -170 90 -190 q-20 -46 50 -50 q60 6 34 54 q110 40 70 186 Z" fill="#c9b48c" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`:env(a,x+50,1860,190,{rot:-12+8*Math.sin(t*.8+x)}));
      s+=env(a,x+330,1500+(k*70),110,{ep:4,rot:18+k*20}); }
    return s; }
  // le colis JEU qui s'écrase sous l'étiquette (scène d'ouverture ET de fin)
  function ouverture(a,t,tI,tf){ let s=''; const G=a.G;
    const e=a.sg(t,tI,tI+.16), r=a.ressort(t,tI+.02,.5), hc=tI<t?a.L(370,175,r):370, wc=tI<t?a.L(400,470,r):400;
    const xc=740-wc/2; s+=a.ombre(740,G+4,wc+60)+colis(a,xc,G,wc,hc,{icone:hc>220?'device-gamepad':null,txt:'JEU',tz:hc>220?72:60});
    const yT=t<tI?a.L(tf,G-hc-105,a.ei(a.sg(t,tI-.32,tI))):G-hc-105+6*Math.sin((t-tI)*8)*Math.exp(-(t-tI)*2), rT=t<tI?-9:a.L(-9,-3,e);
    if(t<tI+.05) for(let i=0;i<5;i++) s+=`<path d="M${500+i*120} ${f(yT-190-(i%2)*60)} v-${120+(i%3)*50}" stroke="${INK}" stroke-width="8" stroke-linecap="round" opacity=".55"/>`;
    s+=etiq(a,750,yT,{rot:rT,s:1.18,sx:t<tI?.96:a.L(1.2,1,r),sy:t<tI?1.05:a.L(.7,1,r)});
    s+=a.onde(740,G-90,720,a.sg(t,tI,tI+.5))+a.eclats(740,G-150,t,tI,{n:18,force:620});
    return s; }
  // Tico en papier « Enzo » : casquette
  function enzo(a,x,y,o={}){ const cas=`<path d="M-58 -292 q58 -52 116 0 l0 10 l44 10 l-160 -2 Z" fill="${BL}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>`;
    return Ticket.svg(Object.assign({x,y,scale:o.scale??.55,mouth:'grin',brows:'up',lines:3,extra:cas,fill:'#e3ecf2'},o)); }
  // un cube en 3D stylisée (colis qui tourne)
  function cube3(a,cx,cyb,S,ang,o={}){ const c=Math.cos(ang),n=Math.sin(ang), Pj=(x,y,z)=>{ const X=x*c-z*n, Z=x*n+z*c, k=1100/(1100+Z); return [cx+X*k, cyb-(y+Z*.32)*k]; };
    const v=[[-1,0,-1],[1,0,-1],[1,0,1],[-1,0,1],[-1,2,-1],[1,2,-1],[1,2,1],[-1,2,1]].map(p=>Pj(p[0]*S,p[1]*S,p[2]*S));
    const faces=[[0,1,5,4,KR],[1,2,6,5,KR2],[2,3,7,6,KR],[3,0,4,7,KR2],[4,5,6,7,'#e6cda6']], zf=[(-1),(c*S>0?1:1)];
    const ord=faces.map(F=>{ const P3=[[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7],[4,5,6,7]]; return F; });
    const depth=F=>{ const xs=[[-1,-1],[1,-1],[1,1],[-1,1]]; const id=F.slice(0,4); const m=[[-1,0,-1],[1,0,-1],[1,0,1],[-1,0,1],[-1,2,-1],[1,2,-1],[1,2,1],[-1,2,1]]; let d=0; for(const i of id){ d+=m[i][0]*n+m[i][2]*c; } return d/4; };
    let s=''; for(const F of [...ord.slice(0,4).sort((A,B)=>depth(B)-depth(A)),ord[4]]){ s+=`<path d="M${F.slice(0,4).map(i=>`${f(v[i][0])} ${f(v[i][1])}`).join(' L')} Z" fill="${F[4]}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>`; }
    return s; }
  return {INK,PAP,ACC,CR,OR,BL,KR,KR2,MUR,cl,f,C,etiq,colis,env,timbre,decor,ouverture,enzo,cube3};
})();
const C_=PO.C;
const TI=.3;   // l'instant où l'étiquette écrase le colis (image 0 = juste avant)

const PLAN={
  format:'histoire',
  source:'CALCUL QUI CIRCULE · AMENDEMENT PLF 2027, PAS UNE LOI',
  persos:{ gauche:{nom:'Tico'} },
  phrases:[
    "Ton pote lit que les titres : il t'annonce 11 € de taxe sur GTA 6.",        // p1
    "L'article, il l'a jamais ouvert.",                                          // p2
    "Enzo balance ça à Tico.",                                                   // p3
    "Et Tico a précommandé le jeu en revendant sa vieille console sur Vinted.",  // p4
    "Le seum.",                                                                  // p5
    "Et là, il fait un truc que personne ne fait : il ouvre le texte.",          // p6
    "Il lit. Vraiment. Avec les yeux.",                                          // p7
    "Les 11 € ? Nulle part.",                                                    // p8
    "GTA 6 ? Même pas cité.",                                                    // p9
    "Abonne-toi : on lit les textes à ta place, et c'est toi qui as raison dans le groupe.", // p10 APPEL 1
    "Sauf que la taxe, elle, existe.",                                           // p11 RETOURNEMENT
    "Dans un amendement au budget : 5,5 centimes par giga.",                     // p12 CHOC
    "Dans le texte, c'est pour l'entreprise qui envoie les données.",            // p13
    "Pas toi, ni ton opérateur.",                                                // p14
    "Les 11 € ? Un calcul qui circule :",                                         // p15
    "ces centimes, fois un poids que Rockstar n'a pas confirmé.",                 // p16
    "Le vote ? 11 contre 10.",                                                   // p17
    "Plus serré que ton compte après le loyer.",                                 // p18
    "Mais ça reste un amendement, pas une loi.",                                 // p19
    "Le vote sur toute la partie recettes peut le faire tomber.",                // p20
    "Tico fonce écrire : « C'est gratuit ! »",                                   // p21
    "Ça non plus, c'est écrit nulle part.",                                      // p22 RETOURNEMENT 2
    "Côté facture : un risque évoqué à l'Assemblée, aucun montant officiel.",    // p23
    "Au prochain 11 € : c'est écrit où ?",                                       // p24
    "Si ça passe : l'entreprise paie, ou elle te la refile ?",                   // p25
    "Envoie ça à celui du groupe qui a déjà annoncé les 11 €.",                  // p26 APPEL 2
  ],
  ancres:{ ouvre:{mot:'ouvre',phrase:'p6'}, vraiment:{mot:'Vraiment',phrase:'p7'}, yeux:{mot:'yeux',phrase:'p7'}, nulle:{mot:'Nulle',phrase:'p8'},
           toi:{mot:'toi',phrase:'p14'}, ni:{mot:'ni',phrase:'p14'}, ces:{mot:'ces',phrase:'p16'}, gratuit:{mot:'gratuit',phrase:'p21'},
           aucun:{mot:'aucun',phrase:'p23'}, celui:{mot:'celui',phrase:'p26'}, annonce:{mot:'annoncé',phrase:'p26'}, raison:{mot:'raison',phrase:'p10'}, revendant:{mot:'revendant',phrase:'p4'} },
  musique:{nom:'elan-back-in-the-80s', drop:'p12+1.5', coupe:['p11'], silences:[['p1_fin','p2_fin'],['p5-.2','p6'],['p11','p12+1.5'],['p22','p23']]},
  abonne:'p10',
  question:'p25',
  cartons:[
    {de:'debut', l1:'11 € de taxe', l2:'GTA VI ?', mot:'11 €'},
    {de:'p3', a:'p4-.4', l1:'Enzo balance', l2:'le chiffre.', mot:'Enzo'},
    {de:'p4', a:'p5-.2', l1:'Tico a déjà', l2:'tout misé dessus.', mot:'misé'},
    {de:'p6',a:'ouvre-.4',l1:'Un truc que',l2:'personne ne fait.',mot:'personne'},{de:'ouvre',a:'p7-.2',l1:'Tico ouvre',l2:'le texte.',mot:'texte.'},
    {de:'p8', a:'p9-.4', l1:'11 € :', l2:'nulle part.', mot:'nulle'},
    {de:'p9', a:'p10-.4', l1:'GTA VI ?', l2:'Même pas cité.', mot:'cité.'},
    {de:'p12', a:'p13-.4', l1:'5,5 c / Go', l2:'dans un amendement', mot:'5,5 c'},
    {de:'p13', a:'p15-.4', l1:"Pour l'entreprise", l2:'qui envoie.', mot:'envoie.'},
    {de:'p15', a:'p17-.4', l1:'11 € =', l2:'un calcul qui circule', mot:'calcul'},
    {de:'p17', a:'p18-.1', l1:'11 contre 10', l2:'en première lecture', mot:'contre'},
    {de:'p19', a:'p21-.4', l1:'Un amendement,', l2:'pas une loi.', mot:'loi.'},
    {de:'p21',a:'p22-.4',l1:'Tico fonce',l2:'écrire.',mot:'fonce'},{de:'p22',a:'p23-.4',l1:"C'est gratuit ?",l2:'Non plus.',mot:'Non'},
    {de:'p23', a:'aucun-.3', l1:'La facture ?', l2:'Un risque évoqué.', mot:'risque'},
    {de:'p24', a:'p25-.4', l1:"C'est écrit", l2:'où ?', mot:'où ?'},
    {de:'p25', a:'p26-.4', l1:"Si ça passe : l'entreprise", l2:'paie, ou te la refile ?', mot:'refile'},
    {de:'p26', l1:'Envoie à celui', l2:'des 11 €.', mot:'11 €.'},
  ],
  humeurs:[ ['p1','gauche','surpris'],['p1+.32','gauche','choque'],['p2','gauche','inquiet'],['p3','gauche','content'],['p3+.8','gauche','fier'],
            ['p4','gauche','fier'],['revendant','gauche','triste'],['p5','gauche','triste'],['p6','gauche','pense'],['ouvre','gauche','surpris'],
            ['p7','gauche','pense'],['p8','gauche','hausse'],['p9','gauche','montre'],['p10','gauche','salut'],['raison','gauche','fier'],
            ['p12','gauche','choque'],['p13','gauche','surpris'],['p14','gauche','content'],['p15','gauche','pense'],['ces','gauche','inquiet'],
            ['p17','gauche','montre'],['p18','gauche','triste'],['p19','gauche','inquiet'],['p20','gauche','choque'],['p21','gauche','rit'],['gratuit','gauche','saute'],
            ['p22','gauche','choque'],['p23','gauche','pense'],['p24','gauche','fier'],['p25','gauche','hausse'],['p26','gauche','salut'],['celui','gauche','rit'] ],
  scenes:[
  /* ═══════════ 1 · LA RUMEUR (p1 → p10) : l'étiquette écrase le colis, Enzo la lance, Tico vend sa console, ouvre la lettre ═══════════ */
  { type:'monde', de:'p1', a:'p11', nom:'bureau-de-poste', largeur:7600, taille:.5,
    visuels:['bureau de poste','colis','timbres','étiquette de prix','pèse-colis'],
    acteur:[ {at:'p1',x:1230,y:1300},
             {at:'p1+.85',x:1560,y:1300,mouvement:'saut',hauteur:300,depuis:'p1+.31'},
             {at:'p3-.01',x:3780,y:1300,mouvement:'teleport'},
             {at:'p3+.75',x:3780,y:1300,mouvement:'saut',hauteur:70,depuis:'p3+.45'},
             {at:'p4-.01',x:4420,y:1300,mouvement:'teleport'},
             {at:'revendant',x:4500,y:1300,mouvement:'marche',depuis:'p4+.3'},
             {at:'p5-.05',x:4590,y:1300,mouvement:'marche',depuis:'revendant+.3'},
             {at:'p6-.01',x:5560,y:1300,mouvement:'teleport'},
             {at:'p6+1.6',x:5680,y:1300,mouvement:'marche',depuis:'p6+.4'},
             {at:'ouvre+.4',x:5620,y:1300,mouvement:'saut',hauteur:120,depuis:'ouvre'},
             {at:'p9+.9',x:6580,y:1300,mouvement:'marche',depuis:'p9+.1'},
             {at:'p10+.4',x:6260,y:1300,mouvement:'teleport'} ],
    cadres:[ C_('p1',800,1300,1180,.92),
             C_('p1+.34',760,1150,1050,1.24,{zoomFin:1.1,coupe:true}),
             C_('p1+1.7',1060,1300,1180,.86,{coupe:true,rot:2}),
             C_('p1+3',1560,1180,1020,1.42,{coupe:true}),
             C_('p2',2320,900,800,.95,{coupe:true}),
             C_('p2+1',2320,900,900,1.0,{zoomFin:1.08,transition:.5}),
             C_('p3',3220,1220,1060,1.02,{coupe:true}),
             C_('p3+.5',3680,1000,1000,.86,{transition:.45,rot:-3}),
             C_('p4',4560,1120,960,1.12,{coupe:true}),
             C_('p4+1.15',4700,1160,1040,.92,{transition:.35}),
             C_('revendant+.7',5240,1240,1090,.86,{coupe:true,rot:2}),
             C_('p5',4640,1130,960,1.25,{coupe:true,zoomFin:1.38}),
             C_('p6',6040,1000,850,.98,{coupe:true}),
             C_('p6+1.4',5980,950,820,1.3,{transition:.35}),
             C_('ouvre+.25',6040,860,800,.74,{zoomFin:.68,coupe:true,rot:-2}),
             C_('p7',6040,780,760,.82,{coupe:true}),
             C_('vraiment',6040,800,760,1.2,{coupe:true}),
             C_('yeux',6040,950,830,.86,{coupe:true,rot:2}),
             C_('p8',6050,800,800,1.06,{coupe:true}),
             C_('nulle',6040,1000,870,.82,{transition:.35}),
             C_('p9',6040,700,750,1.2,{coupe:true}),
             C_('p9+.9',6400,1100,960,.82,{coupe:true}),
             C_('p10',6300,1100,1000,.74,{coupe:true}),
             C_('p10+1.5',6320,1050,960,.9,{transition:.5,rot:-2}),
             C_('p10+3',6440,850,880,.92,{coupe:true}) ],
    dessin:(t,a)=>{ const N=PO,T=k=>a.T(k),G=a.G; let s=N.decor(a,t,-300,7800);
      const tp2=T('p2'),tp3=T('p3'),tp4=T('p4'),trv=T('revendant'),tp5=T('p5'),tp6=T('p6'),tou=T('ouvre'),tp7=T('p7'),tvr=T('vraiment'),tye=T('yeux'),tp8=T('p8'),tnu=T('nulle'),tp9=T('p9'),tp10=T('p10'),tra=T('raison');
      // A · l'ouverture : l'étiquette s'abat
      if(t<tp2+.05){ s+=N.ouverture(a,t,TI,G-630);
        { const SRC='CALCUL QUI CIRCULE · AMENDEMENT AU BUDGET, PAS UNE LOI', t1=T('p1')+1.7; const q=t<.34?[800,474,25]:t<t1?[760,634,19]:null; if(q) s+=a.txt(q[0],q[1],q[2],'SM','#6b645a',SRC,{ls:1}); }
        // après le choc : l'étiquette éjecte une petite copie qui colle au front de Tico
        const P=a.acteur(t), pc=a.sg(t,TI+.05,TI+.8); if(pc>0) s+=N.etiq(a,a.L(800,P.x,a.eio(pc)),a.L(G-300,P.y-262,a.eio(pc))-240*Math.sin(Math.PI*pc),{s:a.L(.4,.28,pc),rot:-14+6*Math.sin(t*6)}); }
      // B · le journal : titre énorme, article scellé, toile d'araignée
      if(t>tp2-.4&&t<tp3+.3){ const u=a.bk(a.sg(t,tp2-.15,tp2+.35)), Y=a.L(-500,G,u), jx=2320;
        s+=a.ombre(jx,G+4,560)+`<g transform="translate(${jx} ${f(Y)}) rotate(${f(a.L(-14,-3,u))})"><rect x="-300" y="-930" width="600" height="930" rx="6" fill="#efe9dc" stroke="${N.INK}" stroke-width="7"/><rect x="-260" y="-890" width="520" height="56" fill="${N.INK}"/><rect x="-260" y="-690" width="520" height="16" fill="${N.INK}" opacity=".35"/><rect x="-260" y="-660" width="360" height="16" fill="${N.INK}" opacity=".35"/>`;
        s+=N.etiq(a,0,-760,{s:.62,rot:-2});
        s+=N.env(a,0,-280,440,{txt:'ARTICLE',tz:62,c:N.PAP}); const w=a.sg(t,tp2+.55,tp2+1.5);
        for(let i=0;i<8;i++){ const an=i/8*6.283, R=250*a.eo(w); s+=`<path d="M0 -280 L${f(Math.cos(an)*R)} ${f(-280+Math.sin(an)*R*.8)}" stroke="#6b645a" stroke-width="3"/>`; }
        for(let k=1;k<4;k++){ let d=''; for(let i=0;i<=8;i++){ const an=i/8*6.283, R=k*80*a.eo(a.sg(t,tp2+.8+k*.15,tp2+1.5+k*.15)); d+=`${i?'L':'M'}${f(Math.cos(an)*R)} ${f(-280+Math.sin(an)*R*.8)} `; } s+=`<path d="${d}" fill="none" stroke="#6b645a" stroke-width="3"/>`; }
        const sp=a.sg(t,tp2+1,tp2+1.7); if(sp>0) s+=`<path d="M170 -530 V${f(-530+160*a.eo(sp))}" stroke="${N.INK}" stroke-width="3"/><circle cx="170" cy="${f(-530+172*a.eo(sp))}" r="14" fill="${N.INK}"/>`;
        s+='</g>'; }
      // C · Enzo lance l'étiquette comme un frisbee ; elle rate Tico et se colle à sa boîte aux lettres
      if(t>tp3-.4&&t<tp4+.2){ const u=a.sg(t,tp3+.2,tp3+1.05), bras=a.sg(t,tp3,tp3+.2);
        s+=a.ombre(3020,G+4,220)+N.enzo(a,3020,G,{armR:u>0?[120,-40]:[a.L(60,-40,bras),a.L(30,-110,bras)],handR:'open'});
        s+=a.boite(4040,G,120,210,{couleur:N.BL,prof:30,trait:6})+a.icone('mailbox',4100,G-130,86,{fond:N.PAP});
        if(u<1) s+=N.etiq(a,a.L(3160,4080,a.eio(u)),a.L(G-170,G-290,u)-180*Math.sin(Math.PI*u),{s:.56,rot:720*u,sy:.72});
        else s+=N.etiq(a,4080,G-290,{s:.56,rot:-9+5*Math.exp(-(t-tp3-1.05)*3)*Math.sin((t-tp3)*18)}); }
      // D · les pièces tombent dans le colis JEU ; la vieille console part sur un chariot, marquée VENDUE
      if(t>tp4-.3&&t<tp6+.2){ const cx=4660; s+=a.ombre(cx+130,G+4,330)+N.colis(a,cx,G,270,270,{icone:'device-gamepad',txt:'JEU',tz:56});
        s+=`<rect x="${cx+80}" y="${G-286}" width="110" height="18" rx="6" fill="${N.INK}"/>`;
        for(let k=0;k<6;k++){ const t0=tp4+.08+k*.28, u=a.sg(t,t0,t0+.42); if(u>0&&u<1) s+=a.piece(cx+135+Math.sin(k*2)*16,a.L(G-780,G-285,u*u),48,{tour:u*2}); }
        const ch=a.sg(t,trv+.2,tp5-.02), xch=a.L(4720,5400,a.ei(ch)*.9+ch*.1), by=G-34;
        if(t>trv-.5){ s+=`<g transform="translate(${f(xch+300)} ${by})"><rect x="-160" y="-34" width="320" height="34" fill="#3a3530" stroke="${N.INK}" stroke-width="5"/>`+[-110,110].map(d=>`<g transform="translate(${d} 8) rotate(${f(xch*.9)})"><circle r="26" fill="#6b645a" stroke="${N.INK}" stroke-width="5"/><path d="M-20 0 H20" stroke="${N.CR}" stroke-width="5"/></g>`).join('')+a.boite(-110,-34,220,140,{couleur:'#9aa3a8',prof:30,trait:6})+a.icone('device-gamepad',0,-104,74,{fond:N.PAP})+'</g>';
          s+=a.etiquette(xch+300,by-250,'VENDUE',{taille:50,fond:'acc',rot:-7,p:a.ressort(t,trv+.1,.4)}); }
        // « Le seum » : un petit nuage personnel qui pleut sur Tico
        const nu=a.bk(a.sg(t,tp5-.1,tp5+.28)); if(nu>0){ const P=a.acteur(t), nx=P.x, ny=P.y-345; s+=`<g transform="translate(${f(nx)} ${f(ny)}) scale(${f(nu)})"><path d="M-110 20 q-40 -70 30 -80 q30 -60 90 -30 q70 -20 80 50 q40 40 -20 60 Z" fill="#6b645a" stroke="${N.INK}" stroke-width="6"/></g>`;
          for(let i=0;i<9;i++){ const u=((t*1.9+i*.37)%1), dx=-90+i*22; s+=`<path d="M${f(nx+dx)} ${f(ny+30+u*210)} v26" stroke="${N.BL}" stroke-width="7" stroke-linecap="round" opacity="${f(nu)}"/>`; } } }
      // E · la lettre : l'enveloppe tombe, se déchire, la lettre se déplie
      if(t>tp6-.3){ const lx=6040, chute=a.bk(a.sg(t,tp6,tp6+.4)), ouv=a.sg(t,tou-.05,tou+.3), dep=a.eo(a.sg(t,tou+.2,tou+1.1));
        const rou=a.ei(a.sg(t,tp10+.4,tra)), topY=330, H=a.L(0,840,dep)*(1-.92*rou), n=6;
        if(t<tou+.4){ const yE=a.L(-400,G-230,chute); s+=a.ombre(lx,G+4,500)+N.env(a,lx,yE,520,{txt:'ARTICLE',tz:72,rot:a.L(-10,-2,chute)+3*Math.sin(t*15)*a.sg(t,tp6+.6,tou)});
          if(t<tou){ for(let i=0;i<8;i++){ if(t>=tp6+.7+i*.28) continue; const an=i/8*6.283; s+=`<path d="M${lx} ${f(yE)} L${f(lx+Math.cos(an)*300)} ${f(yE+Math.sin(an)*180)}" stroke="#6b645a" stroke-width="3" opacity=".7"/>`; } }
          if(ouv>0) s+=a.eclats(lx,yE-140,t,tou,{n:16,force:520}); }
        if(dep>0&&t<tra+.03){ const top=a.L(G-250,topY,dep)+773*rou, W=620; s+=`<g><rect x="${lx-W/2+10}" y="${f(top+12)}" width="${W}" height="${f(H)}" fill="${N.INK}" opacity=".18"/>`;
          for(let i=0;i<n;i++){ const y0=top+H*i/n, y1=top+H*(i+1)/n; s+=`<path d="M${lx-W/2} ${f(y0)} H${lx+W/2} V${f(y1)} H${lx-W/2} Z" fill="${i%2?'#f6efe2':N.PAP}" stroke="${N.INK}" stroke-width="6"/>`; }
          if(dep>.7){ for(let i=0;i<14;i++){ const y=top+60+i*56; if(y<top+H-40){ const on=t>tp7&&((t-tp7)*6)%14>i&&((t-tp7)*6)%14<i+1.5; s+=`<rect x="${lx-W/2+44}" y="${f(y)}" width="${(i%4===3?340:W-88)}" height="16" rx="6" fill="${on?N.ACC:'#b7ad9b'}"/>`; } } }
          s+='</g>'; }
        // les yeux (Il lit. Vraiment. Avec les yeux.)
        const py=a.bk(a.sg(t,tvr-.1,tvr+.25))*(1-a.sg(t,tp8-.15,tp8)); if(py>0){ const dx=70*Math.sin((t-tvr)*7), dy=30*Math.sin((t-tvr)*2.3); for(const q of [-1,1]){ const X=lx+q*130, Y=680; s+=`<g transform="translate(${X} ${Y}) scale(${f(py)})"><ellipse rx="120" ry="150" fill="${N.PAP}" stroke="${N.INK}" stroke-width="9"/><circle cx="${f(dx*.5)}" cy="${f(dy)}" r="56" fill="${N.INK}"/><circle cx="${f(dx*.5+18)}" cy="${f(dy-18)}" r="14" fill="${N.PAP}"/></g>`; } }
        // l'étiquette qui tente de se coller et qui glisse (Nulle part)
        for(const [k,t0] of [[0,tp8],[1,tp8+.78]]){ const u=a.sg(t,t0,t0+.25), g=a.ei(a.sg(t,t0+.32,t0+.95)); if(u>0&&g<1) s+=N.etiq(a,lx+(k?110:-90),a.L(a.L(-100,540,a.bk(u)),G+200,g),{s:.8,rot:a.L(-7,k?44:-46,g)}); }
        // la loupe qui ratisse les lignes : GTA VI introuvable
        const lu=a.sg(t,tp9,tp9+1.2), lo=t>tp9&&t<tp10+.1?1:0; if(lo){ const lxx=lx-240+480*Math.abs(Math.sin(lu*Math.PI*1.5)), lyy=a.L(430,960,lu); s+=a.icone('search',lxx,lyy,250,{fond:'rgba(255,255,255,.35)',ep:5});
          s+=a.etiquette(lx-20,480,'GTA VI',{taille:58,fond:'encre',rot:-3,p:a.bk(a.sg(t,tp9,tp9+.25))}); }
        // la bulle d'Enzo et la lettre-sarbacane (abonne-toi)
        if(t>tp9+.7){ const ex=6780, e0=a.bk(a.sg(t,tp9+.7,tp9+1.1)), tirs=tra+.02, pc=a.sg(t,tirs,tirs+.3), pb=a.sg(t,tirs+.3,tirs+1.2);
          s+=a.ombre(ex,G+4,200)+N.enzo(a,ex,G,{mouth:pb>0?'o':'grin',brows:pb>0?'worried':'up',armR:[50,-70]});
          if(pb<1){ const bx=ex-150+(pb>0?300*Math.sin(pb*20)*pb:0), by=G-560-(pb>0?400*pb+120*Math.cos(pb*17):0), sc=(pb>0?a.L(1,.2,pb):1)*e0; s+=`<g transform="translate(${f(bx)} ${f(by)}) scale(${f(sc)}) rotate(${f(pb*720)})"><path d="M-220 -110 h440 a50 50 0 0 1 50 50 v120 a50 50 0 0 1 -50 50 h-300 l-60 70 l-10 -70 h-70 a50 50 0 0 1 -50 -50 v-120 a50 50 0 0 1 50 -50 Z" fill="${N.PAP}" stroke="${N.INK}" stroke-width="7"/>`+a.txt(0,46,130,'IS',N.ACC,'+11 €')+'</g>'; }
          if(pc>0&&pc<1) s+=`<g transform="translate(${f(a.L(6040,6560,pc))} ${f(a.L(1170,G-560,pc))}) rotate(90)"><rect x="-22" y="-120" width="44" height="240" rx="20" fill="${N.PAP}" stroke="${N.INK}" stroke-width="6"/></g>`;
          s+=a.onde(ex-150,G-560,300,a.sg(t,tirs+.28,tirs+.8))+a.eclats(ex-150,G-560,t,tirs+.28,{n:12}); }
      }
      return s; },
    sons:[['p1','ecrase-lourd-1',.55],['p1+.3','ecrase-lourd-2',.45],['p1+.34','coup-1',.32],['p2_fin+.05','disque-raye',.45],['p2-.05','tombe-1',.34],['p3+.2','papier-glisse',.32],['p3+1.05','tape-leger-1',.3],
          ...[0,1,2,3,4,5].map(k=>[`p4+${(.08+k*.28+.42).toFixed(2)}`,'piece-tombe',.15]),['revendant+.25','papier-glisse',.25],['p5+.75','bebe-pleure',.4],
          ['p6+.05','tombe-2',.34],['p6+1','tape-leger-1',.22],['ouvre','papier-froisse',.4],['ouvre+.3','papier-glisse',.3],['vraiment','pouc-2',.32],['p8+.2','tape-leger-2',.3],['nulle','buzzer-faux',.4],['p8+.95','tape-leger-3',.28],['p9+.1','clic-1',.22],['p9+.6','clic-2',.22],['raison+.3','coup-2',.4]],
    actions:[['p1','p1+.35',"l'étiquette s'abat"],['p1+.3','p2','le colis s\'écrase, l\'étiquette vole sur Tico'],['p2-.1','p3','le journal tombe, la toile se tisse'],['p3','p4','le frisbee vole'],['p4','revendant','les pièces tombent'],['revendant','p5','le chariot part'],['p5','p6','le nuage pleut'],['p6','ouvre','l\'enveloppe tombe, Tico marche'],['ouvre','p7','la lettre se déplie'],['p7','p8','les lignes se lisent, les yeux'],['p8','p9','l\'étiquette glisse'],['p9','p10','la loupe ratisse'],['p10','raison+1.3','bulle d\'Enzo, sarbacane']] },

  { type:'mot', de:'p11', a:'p12', txt:'ELLE<br>EXISTE.', fond:'encre', entree:'machine',
    dessin:(t,a)=>{ const u=a.sg(t,a.t0+1.4,a.t0+1.9); if(u<=0) return ''; return PO.timbre(a,952,a.L(-200,1090,a.bk(u)),84,{rot:-8,c:PO.OR})+a.onde(952,1090,220,a.sg(t,a.t0+1.8,a.t0+2.3))+`<g transform="translate(160 ${1500+60*Math.sin(t*5)})">`+PO.env(a,0,0,160,{c:PO.OR,rot:8})+'</g>'; } },

  /* ═══════════ 2 · LE TIMBRE (p12 → p22) ═══════════ */
  { type:'monde', de:'p12', a:'p23', nom:'guichet-des-timbres', largeur:13200, taille:.5,
    visuels:['guichet','enveloppe À PAYER','casier de tri','trappe'],
    acteur:[ {at:'p12',x:430,y:1300},
             {at:'p13-.01',x:300,y:1300,mouvement:'teleport'},
             {at:'p14-.01',x:3280,y:1300,mouvement:'teleport'},
             {at:'p15-.01',x:4340,y:1300,mouvement:'teleport'},
             {at:'ces-.01',x:5560,y:1300,mouvement:'teleport'},
             {at:'p17-.01',x:6870,y:1300,mouvement:'teleport'},
             {at:'p18-.01',x:8050,y:1300,mouvement:'teleport'},
             {at:'p19-.01',x:9270,y:1300,mouvement:'teleport'},
             {at:'p20-.01',x:10380,y:1300,mouvement:'teleport'},
             {at:'p21-.01',x:11480,y:1300,mouvement:'teleport'},
             {at:'gratuit-.05',x:11960,y:800,mouvement:'saut',hauteur:190,depuis:'gratuit-.7'},
             {at:'p22+.15',x:12100,y:800,mouvement:'glisse',depuis:'p22-.3'},
             {at:'p22+.85',x:12140,y:1300,mouvement:'chute',depuis:'p22+.2'} ],
    cadres:[ C_('p12',820,1120,980,1.15,{zoomFin:1.04}),
             C_('p12+1.5',830,1050,800,2.0,{coupe:true,zoomFin:1.85}), C_('p12+2.5',620,1090,960,1.05,{coupe:true,rot:2}),
             C_('p13',640,1120,980,.82,{coupe:true}),
             C_('p13+1.1',1900,1000,950,.74,{transition:.55}),
             C_('p13+2',2200,1090,1000,.96,{coupe:true}),
             C_('p14',3560,1100,1030,1.2,{coupe:true}),
             C_('ni',3600,1100,1030,1.1,{transition:.3,rot:2}),
             C_('p15',4700,1050,950,.96,{coupe:true}),
             C_('p15+1.3',4720,1000,900,1.3,{coupe:true}),
             C_('ces',5960,1050,1000,.8,{coupe:true}),
             C_('ces+1.4',5960,960,900,1.06,{coupe:true,zoomFin:1.14}), C_('ces+2.2',5960,690,760,1.6,{coupe:true}),
             C_('p17',7230,950,940,.82,{coupe:true}),
             C_('p17+.9',7230,860,880,1.08,{transition:.3}),
             C_('p18',8350,1130,1030,1.18,{coupe:true,zoomFin:1.02}),
             C_('p19',9500,1000,930,.94,{coupe:true}),
             C_('p19+1',9520,1160,1060,1.48,{coupe:true}),
             C_('p20',10700,1170,1040,.85,{coupe:true}),
             C_('p20+1.3',10680,1250,1020,1.1,{coupe:true}),
             C_('p21',11930,1180,1090,.84,{coupe:true}),
             C_('gratuit-.6',12020,860,980,.84,{transition:.5,rot:-2}),
             C_('p22',12120,830,970,1.04,{coupe:true}),
             C_('p22+.35',12130,1190,1040,1.22,{transition:.3}) ],
    dessin:(t,a)=>{ const N=PO,T=k=>a.T(k),G=a.G; let s=N.decor(a,t,-300,13400);
      const tp=k=>T(k), p12=tp('p12'),p13=tp('p13'),p14=tp('p14'),p15=tp('p15'),ces=tp('ces'),p17=tp('p17'),p18=tp('p18'),p19=tp('p19'),p20=tp('p20'),p21=tp('p21'),p22=tp('p22'),p23=tp('p23'),ni=tp('ni'),toi=tp('toi');
      // F · le timbre 5,5 c s'abat sur un mini-colis qui rebondit ; Tico le lèche, il reste collé
      if(t<p13+.2){ const u=a.bk(a.sg(t,p12-.05,p12+.3)), x=820, rb=Math.abs(Math.sin((t-p12)*5.2))*Math.exp(-(t-p12)*1)*90;
        s+=a.ombre(x,G+4,360)+`<g transform="translate(0 ${f(-rb)})">`+N.colis(a,x-210,G,420,370,{txt:'GO',tz:100,icone:null})+N.timbre(a,x+10,a.L(-300,G-250,u),300,{txt:'5,5 c',tz:92,sous:'PAR GO',rot:-5})+'</g>'+a.onde(x,G-120,520,a.sg(t,p12+.25,p12+.7));
        const la=a.sg(t,p12+2.5,p12+2.8); if(la>0){ const P=a.acteur(t); s+=N.timbre(a,P.x+70,P.y-140+6*Math.sin(t*16),74,{rot:10+14*Math.sin(t*9)}); } }
      // G · le colis JEU éclate en mini-colis ; une enveloppe À PAYER file au guichet
      if(t>p13-.3&&t<p14+.2){ const x0=640, e=a.eo(a.sg(t,p13,p13+.55)); if(e<.05) s+=N.colis(a,x0-180,G,360,340,{icone:'device-gamepad',txt:'JEU',tz:60});
        else for(let i=0;i<24;i++){ const c=(i%6)-2.5, r=Math.floor(i/6), xx=x0+c*a.L(30,120,e), yy=G-34-r*a.L(40,92,e)-(e<1?220*Math.sin(e*3.14)*((i*7%5)/5):0); s+=N.colis(a,xx-44,yy+34,88,76,{prof:16})+N.timbre(a,xx,yy-4,26,{ep:3}); }
        const u=a.sg(t,p13+.7,p13+1.75), xE=a.L(860,2240,a.eio(u)), yE=a.L(G-470,G-340,u)-260*Math.sin(Math.PI*u), tilt=Math.cos(Math.PI*u)*-26;
        if(t>p13+.5&&t<p13+1.76) s+=N.env(a,xE,yE,270,{txt:'À PAYER',tz:44,c:N.OR,rot:tilt});
        // le guichet
        const gx=2240; s+=a.boite(gx-330,G,660,430,{couleur:N.PAP,prof:40,trait:6})+`<rect x="${gx-250}" y="${G-790}" width="500" height="360" rx="8" fill="${N.BL}" stroke="${N.INK}" stroke-width="6"/>`;
        s+=a.etiquette(gx,G-720,"L'ENTREPRISE",{taille:66,fond:'encre'})+a.etiquette(gx,G-625,'QUI ENVOIE',{taille:56,fond:'acc',rot:-1});
        if(t>p13+1.75){ const j=a.sg(t,p13+1.75,p13+2.6); s+=N.env(a,gx,G-470,270,{txt:'À PAYER',tz:44,c:N.OR,rot:-3})+a.onde(gx,G-470,300,a.sg(t,p13+1.75,p13+2.1)); for(let k=0;k<Math.floor(j*7);k++) s+=N.timbre(a,gx-280+k*92,G-240,76,{rot:k%2?3:-3}); } }
      // H · Tico et l'opérateur : l'enveloppe les contourne
      if(t>p14-.3&&t<p15+.2){ const xr=3840, bo=a.bk(a.sg(t,p14-.1,p14+.2)); s+=a.boite(xr-110,G,220,150,{couleur:N.PAP,prof:30,trait:6})+a.icone('router',xr,G-92,92,{fond:N.PAP})+a.etiquette(xr,G-250,'OPÉRATEUR',{taille:48,fond:'encre',p:bo});
        const P=a.acteur(t), fer=a.sg(t,toi+.3,toi+.55), wx=P.x+120, wy=P.y-130; s+=`<g transform="translate(${f(wx)} ${f(wy)}) scale(${f(a.L(1.1,.75,fer))})"><rect x="-60" y="-44" width="120" height="${f(a.L(90,70,fer))}" rx="10" fill="#7a5a3a" stroke="${N.INK}" stroke-width="6"/><path d="M-60 -44 Q0 ${f(a.L(-90,-30,fer))} 60 -44" fill="#8f6c49" stroke="${N.INK}" stroke-width="6"/></g>`;
        const u=a.sg(t,p14,p14+1.75), xE=a.L(2880,4300,u), yE=G-300-Math.max(0,240*Math.exp(-Math.pow((xE-P.x)/160,2)))-Math.max(0,300*Math.exp(-Math.pow((xE-xr)/170,2))), rt=-40*Math.exp(-Math.pow((xE-P.x)/160,2))+40*Math.exp(-Math.pow((xE-P.x-170)/120,2));
        if(u>0&&u<1) s+=N.env(a,xE,yE,250,{txt:'À PAYER',tz:40,c:N.OR,rot:rt}); }
      // I · l'étiquette se décolle : dessous, la formule
      if(t>p15-.3&&t<ces+.2){ const cx=4740, pl=a.sg(t,p15+.15,p15+1.6), qu=a.eio(pl); s+=a.ombre(cx,G+4,520)+N.colis(a,cx-300,G,600,600,{});
        s+=`<rect x="${cx-250}" y="${G-510}" width="500" height="250" fill="${N.PAP}" stroke="${N.INK}" stroke-width="6"/>`+a.txt(cx,G-352,84,'IS',N.INK,'5,5 c × ? Go',{op:a.sg(pl,.35,.7)});
        const e=`<g transform="rotate(${f(a.L(0,-68,qu))} ${cx+260} ${G-260})">`+N.etiq(a,cx,G-385,{s:1,rot:0,w:520,h:252,tz:128})+'</g>'; s+=`<g opacity="${f(1-a.sg(pl,.88,1))}">`+e+'</g>';
        const P=a.acteur(t); if(pl>=.9) s+=N.etiq(a,P.x+95,P.y-180,{s:.32,rot:18*Math.sin(t*14)}); }
      // J · le pèse-colis et le colis 3D (moment 3D) : l'aiguille s'affole, ? Go
      if(t>ces-.3&&t<p17+.2){ const cx=5960, an=(t-ces)*3; s+=a.boite(cx-290,G,580,120,{couleur:N.PAP,prof:34,trait:6})+a.boite(cx-190,G-120,380,40,{couleur:'#cfd6dc',prof:24,trait:5})+N.cube3(a,cx,G-160,112,an);
        const dx=cx,dy=G-610,ai=(t-ces)*14*Math.sin((t-ces)*1.8)+Math.sin(t*19)*18, dr=a.bk(a.sg(t,ces,ces+.3)); s+=`<g transform="translate(${dx} ${dy}) scale(${f(dr*.82)})"><circle r="170" fill="${N.PAP}" stroke="${N.INK}" stroke-width="9"/>`;
        for(let i=0;i<12;i++){ const q=i/12*6.283; s+=`<path d="M${f(Math.cos(q)*138)} ${f(Math.sin(q)*138)} L${f(Math.cos(q)*162)} ${f(Math.sin(q)*162)}" stroke="${N.INK}" stroke-width="6"/>`; }
        s+=`<path d="M0 0 L0 -128" stroke="${N.ACC}" stroke-width="11" stroke-linecap="round" transform="rotate(${f(ai*57)})"/><circle r="17" fill="${N.INK}"/>`+a.txt(0,104,64,'IS',N.ACC,'? Go')+'</g>'; }
      // K · le casier de tri : POUR / CONTRE
      if(t>p17-.3&&t<p18+.25){ const cx=7230, rows=11; s+=a.boite(cx-340,G,680,800,{couleur:'#e9dfcc',prof:40,trait:7})+`<path d="M${cx} ${G-800} V${G}" stroke="${N.INK}" stroke-width="7"/>`;
        s+=a.txt(cx-170,G-690,74,'IS',N.INK,'POUR')+a.txt(cx+170,G-690,70,'IS',N.INK,'CONTRE'); for(let i=0;i<rows;i++){ const y=G-650+i*56; s+=`<path d="M${cx-340} ${y} H${cx+340}" stroke="${N.INK}" stroke-width="3"/>`; }
        const dur=1.35; for(let k=0;k<21;k++){ const c=k%2, ind=Math.floor(k/2), t0=p17+k*(dur/21), u=a.sg(t,t0,t0+.2); const y=G-622+ind*56, x=cx+(c?170:-170); if(u>0) s+=N.env(a,a.L(cx+700*(c?1:-1),x,a.eo(u)),a.L(G-950,y,a.eo(u)),96,{ep:3,c:k===20?N.OR:N.PAP,rot:a.L(40,0,u)}); }
        const ps=a.sg(t,p17+.2,p17+.55), pf=a.sg(t,p17+.56,p17+1.1); if(ps>0) s+=N.etiq(a,a.L(cx-880,cx-420,a.eo(ps))+a.L(0,-760,pf),a.L(G-300,G-470,a.eo(ps))-160*Math.sin(pf*3.14),{s:.42,rot:pf*420-8}); }
      // L · le loyer qui écrase ton compte : il reste une pièce qui roule
      if(t>p18-.3&&t<p19+.25){ const cx=8350, u=a.ei(a.sg(t,p18,p18+.4)), rb=a.ressort(t,p18+.42,.4); const hC=a.L(300,70,rb*(u>=1?1:0)), yL=a.L(G-1100,G-hC,u)-(u>=1?a.L(0,0,rb):0);
        s+=a.ombre(cx,G+4,520)+`<g><rect x="${cx-240}" y="${f(G-hC)}" width="480" height="${f(hC)}" rx="12" fill="#7a5a3a" stroke="${N.INK}" stroke-width="7"/>`+(hC>130?a.txt(cx,G-hC/2+24,60,'IS',N.CR,'TON COMPTE'):a.txt(cx,G-hC/2+15,44,'IS',N.CR,'TON COMPTE'))+'</g>';
        s+=a.boite(cx-300,yL,600,290,{couleur:N.ACC,prof:36,trait:7})+a.txt(cx,yL-108,128,'IS',N.CR,'LOYER');
        const rl=a.sg(t,p18+.55,p19); if(rl>0) s+=a.piece(a.L(cx+250,cx+660,rl),G-44-Math.abs(Math.sin(rl*9))*(1-rl)*46,44,{tour:rl*5})+a.onde(cx,G-60,560,a.sg(t,p18+.4,p18+.8)); }
      // M · le tampon LOI qui s'arrête à un cheveu du papier
      if(t>p19-.3&&t<p20+.25){ const cx=9520, u=a.eio(a.sg(t,p19-.15,p19+.95)), Y=a.L(120,G-258,u)+2.5*Math.sin(t*40)*a.sg(t,p19+.95,p19+1.1), P=a.acteur(t);
        s+=a.boite(cx-380,G,760,110,{couleur:'#c8ad80',cote:'#a88a5c',dessus:'#ddc69c',prof:42,trait:7})+`<rect x="${cx-260}" y="${G-168}" width="520" height="58" fill="${N.PAP}" stroke="${N.INK}" stroke-width="5"/>`+a.txt(cx,G-124,40,'IS',N.INK,'AMENDEMENT');
        s+=`<g transform="translate(${cx} ${f(Y)})"><rect x="-44" y="-310" width="88" height="220" rx="24" fill="#5a4a3b" stroke="${N.INK}" stroke-width="7"/><circle cy="-330" r="70" fill="#7a5a3a" stroke="${N.INK}" stroke-width="7"/><rect x="-240" y="-92" width="480" height="58" rx="6" fill="#5a4a3b" stroke="${N.INK}" stroke-width="7"/><rect x="-220" y="-34" width="440" height="90" fill="${N.ACC}" stroke="${N.INK}" stroke-width="6"/>`+a.txt(0,36,84,'IS',N.CR,'LOI')+'</g>';
        if(u>=1) s+=`<path d="M${cx-300} ${G-186} H${cx+300}" stroke="${N.ACC}" stroke-width="5" stroke-dasharray="14 10" opacity="${f(.5+.5*Math.sin(t*12))}"/>`; }
      // N · la trappe : la lettre glisse, Tico la retient du doigt
      if(t>p20-.3&&t<p21+.2){ const cx=10820, o=a.eio(a.sg(t,p20,p20+.8)), W=a.L(0,560,o), gl=a.eio(a.sg(t,p20+.3,p20+2.4)), xl=a.L(10500,10640,gl), ban=a.sg(t,p20+1.4,p20+2.3), P=a.acteur(t);
        s+=`<path d="M${f(cx-W/2)} ${G+8} h${f(W)} l40 88 h${f(-W-80)} Z" fill="${N.INK}"/>`+(o>0?`<path d="M${f(cx-W/2-250*o)} ${G+6} h${f(250*o)} l-30 84 h-${f(200*o)} Z" fill="#c9bca5" stroke="${N.INK}" stroke-width="6"/><path d="M${f(cx+W/2)} ${G+6} h${f(250*o)} l30 84 h-${f(200*o)} Z" fill="#c9bca5" stroke="${N.INK}" stroke-width="6"/>`:'');
        const pen=a.L(0,11,gl)+7*Math.sin(t*9)*ban; s+=`<g transform="translate(${f(xl+380)} ${G}) rotate(${f(pen)})"><rect x="-380" y="-540" width="380" height="540" rx="6" fill="${N.PAP}" stroke="${N.INK}" stroke-width="7"/>`+a.txt(-190,-440,50,'IS',N.INK,'AMENDEMENT');
        for(let i=0;i<7;i++) s+=`<rect x="-340" y="${-380+i*48}" width="${i%3===2?200:300}" height="14" rx="5" fill="#b7ad9b"/>`; s+='</g>'; }
      // O · la bulle « C'EST GRATUIT ! » qui gonfle, Tico monte, marche dessus, tout se dégonfle
      if(t>p21-.3){ const g0=a.sg(t,p21+.1,tp('gratuit')), de=a.sg(t,p22-.05,p22+.6), cx=11960, P=a.acteur(t), sc=a.L(.25,1.12,a.eo(g0))*a.L(1,.12,de); if(de<1){ const bx=cx+(de>0?320*Math.sin(de*18)*de:0), by=(de>0?a.L(1000,420,de):a.L(1140,1000,a.eo(g0))); s+=`<g transform="translate(${f(bx)} ${f(by)}) scale(${f(sc)}) rotate(${f(de*240)})"><ellipse rx="430" ry="190" fill="${N.PAP}" stroke="${N.INK}" stroke-width="8"/>`+a.txt(0,-10,88,'IS',N.INK,"C'EST")+a.txt(0,80,104,'IS',N.ACC,'GRATUIT !')+'</g>'; }
        if(de>=1) s+=`<ellipse cx="12350" cy="${G-14}" rx="${f(a.L(60,190,a.bk(a.sg(t,p22+.7,p22+1))))}" ry="16" fill="${N.PAP}" stroke="${N.INK}" stroke-width="6"/>`;
        for(let i=0;i<9;i++){ const q=((t*1.1+i*.13)%1), on=g0>.6&&de<=0; if(on) s+=N.etiq(a,cx-520+i*130,380+q*420,{s:.12,rot:q*300,w:400,h:190,txt:'',op:.9}); } }
      return s; },
    sons:[['p12+.25','ecrase-moyen-1',.4],['p12+.4','tampon',.28],['p12+2.55','squish',.32],['p13+.02','boom-dramatique',.16],['p13+.1','tombe-3',.32],['p13+1.75','tape-leger-1',.4],['p14+.3','whoosh-short',.24],['toi+.4','pouc-3',.3],['ni+.2','whoosh-short',.22],['p14_fin-.1','ding-juste',.32],
          ['p15+.3','papier-froisse',.34],['ces','metal-leger-1',.3],['ces+.6','tic-tac',.22],['p17+.05','clic-1',.22],['p17+.35','clic-2',.22],['p17+.65','clic-3',.22],['p17+.95','clic-4',.22],['p17+1.3','validation-1',.3],['p18+.38','ecrase-lourd-3',.4],['p18+.55','piece-roule',.4],['p19+.95','metal-leger-2',.3],['p20+.05','metal-leger-3',.3],['p20+1.1','papier-glisse',.3],['p22-.05','boing',.32],['p22+.3','sifflet-chute',.35]],
    actions:[['p12','p13','le timbre, le colis rebondit'],['p13','p14','le colis éclate, l\'enveloppe vole, le guichet'],['p14','p15','l\'enveloppe contourne Tico'],['p15','ces','l\'étiquette se décolle'],['ces','p17','colis 3D, aiguille affolée'],['p17','p18','le casier se remplit'],['p18','p19','le loyer écrase'],['p19','p20','le tampon descend'],['p20','p21','la trappe s\'ouvre'],['p21','p22','la bulle gonfle'],['p22','p23','la bulle se dégonfle']] },

  /* ═══════════ 3 · LES TUBES (p23) : la facture hésite ═══════════ */
  { type:'monde', de:'p23', a:'aucun', nom:'tubes-postaux', largeur:2600, taille:.5, visuels:['tubes postaux'],
    acteur:[ {at:'p23',x:1460,y:1300} ],
    cadres:[ C_('p23',1000,900,900,.8), C_('p23+1.2',1000,850,900,.86,{coupe:true,rot:2}) ],
    dessin:(t,a)=>{ const N=PO,T=k=>a.T(k),G=a.G; let s=N.decor(a,t,-200,2600), p=T('p23'), an=(t-p)*3.1;
      s+=`<path d="M1000 300 V620 Q1000 720 900 760 L460 960 V1200 M1000 620 Q1000 720 1100 760 L1540 960" fill="none" stroke="${N.INK}" stroke-width="86" stroke-linecap="round"/><path d="M1000 300 V620 Q1000 720 900 760 L460 960 V1200 M1000 620 Q1000 720 1100 760 L1540 960" fill="none" stroke="#cfd6dc" stroke-width="66" stroke-linecap="round"/>`;
      s+=a.etiquette(650,1040,'ENTREPRISE',{taille:48,fond:'encre'})+a.etiquette(1350,1040,'TOI',{taille:56,fond:'acc'});
      const fe=a.ressort(t,p+.2,.6), xE=1000+150*Math.sin(an)*fe, yE=560+50*Math.cos(an*1.3); s+=N.env(a,xE,yE,200,{txt:'À PAYER',tz:32,c:N.OR,rot:18*Math.sin(an)});
      const u=a.sg(t,p+.7,T('aucun')+.1), yT=a.L(-140,900,u); if(u>0) s+=N.etiq(a,1000+170*Math.sin(u*9),yT,{s:.5,txt:'+? €',rot:24*Math.sin(u*9),coul:N.CR==='x'?N.ACC:'#6b645a'});
      return s; },
    sons:[['p23+.2','pouc-1',.28],['p23+1.2','whoosh-short',.2]],
    actions:[['p23','aucun','enveloppe qui hésite, étiquette +? qui descend']] },

  { type:'mot', de:'aucun', a:'p24', txt:'AUCUN<br>MONTANT<br>OFFICIEL.', fond:'acc', entree:'monte',
    dessin:(t,a)=>{ const u=a.sg(t,a.t0,a.t1); return PO.etiq(a,880+90*Math.sin(u*7),a.L(150,560,u),{s:.5,txt:'+? €',rot:26*Math.sin(u*7),coul:'#1c1a17'}); } },

  /* ═══════════ 4 · LA FIN (p24 → fin) : la loupe, l'hésitation, puis la boucle ═══════════ */
  { type:'monde', de:'p24', nom:'retour-au-colis', largeur:3800, taille:.5, visuels:['loupe'],
    acteur:[ {at:'p24',x:2600,y:1300},
             {at:'p24+2.2',x:3320,y:1300,mouvement:'marche',depuis:'p24+.2'},
             {at:'p25-.01',x:2150,y:1300,mouvement:'teleport'},
             {at:'p26-.01',x:470,y:1300,mouvement:'teleport'},
             {at:'celui+.3',x:490,y:1300,mouvement:'saut',hauteur:120,depuis:'celui'},
             {at:'end-.62',x:1230,y:1300,mouvement:'teleport'} ],
    cadres:[ C_('p24',2950,1100,1020,1.2), C_('p24+1',3250,1120,1020,1.3,{coupe:true,rot:-2}),
             C_('p25',2150,900,960,.8,{coupe:true}), C_('p25+1.1',2150,900,900,.9,{coupe:true,rot:2}),C_('p25+2.2',2230,1090,1030,.92,{coupe:true}),
             C_('p26',600,1300,1180,.92,{coupe:true,zoomFin:.92}), C_('celui+.1',440,1200,1060,1.14,{coupe:true}), C_('annonce',250,1180,1040,1.5,{coupe:true}), C_('p26_fin',700,1200,1100,.86,{coupe:true,rot:-2}), C_('end-.62',800,1300,1180,.92,{coupe:true}) ],
    dessin:(t,a)=>{ const N=PO,T=k=>a.T(k),G=a.G,E=T('end'),p24=T('p24'),p25=T('p25'),p26=T('p26'),ce=T('celui'); let s=N.decor(a,t,-300,3900);
      // la loupe qui poursuit l'étiquette, qui rétrécit en reculant
      if(t<p25+.2){ const u=a.sg(t,p24,p25), xT=a.L(3000,3560,a.eio(u)), P=a.acteur(t); s+=N.etiq(a,xT+40*Math.sin(t*6),G-260-60*Math.abs(Math.sin(t*5)),{s:a.L(.84,.4,u),rot:-8+18*Math.sin(t*6)});
        s+=a.icone('search',P.x+180,P.y-300,320,{fond:'rgba(255,255,255,.3)',ep:5}); }
      // les tubes : l'enveloppe oscille, jamais de réponse
      if(t>p25-.2&&t<p26+.2){ const off=1150, q=(t-p25)*2.6; s+=`<path d="M${off+1000} 300 V620 Q${off+1000} 720 ${off+900} 760 L${off+460} 960 V1200 M${off+1000} 620 Q${off+1000} 720 ${off+1100} 760 L${off+1540} 960" fill="none" stroke="${N.INK}" stroke-width="86" stroke-linecap="round"/><path d="M${off+1000} 300 V620 Q${off+1000} 720 ${off+900} 760 L${off+460} 960 V1200 M${off+1000} 620 Q${off+1000} 720 ${off+1100} 760 L${off+1540} 960" fill="none" stroke="#cfd6dc" stroke-width="66" stroke-linecap="round"/>`;
        s+=a.etiquette(off+650,1040,'ENTREPRISE',{taille:48,fond:Math.sin(q)<0?'acc':'encre'})+a.etiquette(off+1350,1040,'TOI',{taille:56,fond:Math.sin(q)>0?'acc':'encre'});
        s+=N.env(a,off+1000+250*Math.sin(q),640+30*Math.cos(q*2),230,{txt:'À PAYER',tz:36,c:N.OR,rot:24*Math.sin(q)}); }
      // la boucle : le colis JEU, Enzo écrasé, puis l'étiquette de l'image 0
      if(t>p26-.2){ const tX=ce+.42, u=a.bk(a.sg(t,p26,p26+.3)); s+=a.ombre(740,G+4,450)+N.colis(a,540,G,400,370,{icone:'device-gamepad',txt:'JEU',tz:72});
        const ep=a.ressort(t,tX,.4); if(t<E-.62) s+=a.ombre(230,G+4,220);
        if(t>=E-.62){} else if(t<tX) s+=N.enzo(a,a.L(-140,230,u),G,{mouth:'grin',armR:[70,-90]}); else s+=N.enzo(a,230,G,{sy:a.L(.32,.42,ep),sx:a.L(1.6,1.32,ep),mouth:'sad',brows:'worried',eyes:'x'});
        const yP=t<tX?a.L(120,G-120,a.ei(a.sg(t,tX-.34,tX))):G-120; if(t>tX-.34&&t<E-.62) s+=N.etiq(a,230,t<tX?yP:G-195-8*Math.sin((t-tX)*10)*Math.exp(-(t-tX)*2),{s:.72,rot:-7});
        s+=a.onde(230,G-100,420,a.sg(t,tX,tX+.5))+a.eclats(230,G-120,t,tX,{n:12});
        if(t>tX+.3&&t<E-.62){ for(let i=0;i<5;i++){ const q=(t-tX)*5+i*1.257; s+=a.icone('star',230+150*Math.cos(q),G-350+36*Math.sin(q),64,{fond:N.OR,rot:q*40}); } }
        // la boucle : à la dernière image, l'étiquette est au même endroit qu'à l'image 0
        const yL=a.L(-200,G-630,a.eo(a.sg(t,E-.36,E))); if(t>E-.36){ s+=N.etiq(a,750,yL,{rot:-9,s:1.18,sx:.96,sy:1.05}); for(let i=0;i<5;i++) s+=`<path d="M${500+i*120} ${f(yL-190-(i%2)*60)} v-${120+(i%3)*50}" stroke="${N.INK}" stroke-width="8" stroke-linecap="round" opacity=".55"/>`; } }
      return s; },
    sons:[['p24+.2','clic-1',.2],['p24_fin','grillons',.32],['p25+.2','whoosh-short',.14],['p25+1','whoosh-short',.14],['celui+.42','ecrase-lourd-1',.45],['celui+.5','foule-ooh',.28],['end-.32','whoosh-short',.2]],
    actions:[['p24','p25','la loupe poursuit l\'étiquette'],['p25','p26','l\'enveloppe oscille'],['p26','celui+.8','Enzo entre, Tico esquive, écrasé'],['celui+.8','end','Enzo se tortille, la nouvelle étiquette tombe']] },
  ],
};
