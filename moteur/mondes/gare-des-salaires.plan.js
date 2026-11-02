/* N°08 (test2) · « Il faut gagner combien pour être dans les 10 % les mieux payés ? »
   MONDE : la gare et le train des salaires (stratégie : agents/1-strategie.md).
   Unités : la LONGUEUR du billet = le salaire (1 000 px = 10 000 €, 444 px = 4 441 €, 222 px = la moitié).
   Les wagons = les salariés rangés (wagon 1 = les moins payés, wagon 10 = le top 10 %) : leur taille ne varie JAMAIS. */
const N8=(()=>{
  const INK='#1c1a17',PAP='#fbf8f2',ACC='#c4552d',CR='#f6f1e8',OR='#f2c46b',BL='#8fb7d8',MET='#cfd6dc',BAL='#e2d8c6';
  const cl=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)), L=(a,b,u)=>a+(b-a)*u, sg=(t,a,b)=>cl((t-a)/(b-a||1e-6));
  const f=n=>Math.round(n*10)/10;
  const eo=u=>1-Math.pow(1-cl(u),3), ei=u=>Math.pow(cl(u),3), eio=u=>{u=cl(u);return u<.5?4*u*u*u:1-Math.pow(-2*u+2,3)/2;};
  const prix=v=>Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g,' ')+' €';
  // ── le billet de train : bande crème, bande terracotta, perforations ; longueur = salaire ──
  function billet(a,x0,x1,yc,o={}){
    const h=o.h||110, n=Math.max(2,Math.ceil((x1-x0)/40)), amp=o.onde||0, ph=o.ph||0;
    const w=x=>amp*Math.sin((x-x0)/95-ph)*Math.pow(1-cl((x-x0)/Math.max(1,x1-x0)),.7);
    let top='',bot='';
    for(let i=0;i<=n;i++){ const x=L(x0,x1,i/n); top+=`${i?'L':'M'}${f(x)} ${f(yc-h/2+w(x))} `; }
    for(let i=n;i>=0;i--){ const x=L(x0,x1,i/n); bot+=`L${f(x)} ${f(yc+h/2+w(x))} `; }
    const fond=o.dos?'#e9dfcd':CR;
    let s=`<g opacity="${f(o.op??1)}">`;
    s+=`<path d="${top}${bot}Z" fill="${INK}" transform="translate(9 9)" opacity=".18"/>`;
    s+=`<path d="${top}${bot}Z" fill="${fond}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`;
    if(!o.dos&&x1-x0>60){ const bx=o.bandeDroite?x1-34:x0+6; s+=`<rect x="${f(bx)}" y="${f(yc-h/2+5+w(bx))}" width="28" height="${f(h-10)}" fill="${ACC}"/>`; }
    if(!o.dos&&x1-x0>380&&o.tete!==false) s+=a.txt(x1-30,yc-h/2+30+w(x1-30),22,'SM','#6b645a','SALAIRE NET · PAR MOIS',{a:'end',ls:2});
    if(o.prix&&x1-x0>200) s+=a.txt(x1-26,yc+(x1-x0>380?36:26),o.taillePrix||70,'IS',INK,o.prix,{a:'end'});
    return s+'</g>'; }
  // ── le train (vue de profil) : locomotive x 0-360, wagons k=0..9 à 380+304k (280×300), wagon privé 3420-3580 ──
  const WX=k=>380+k*304, WW=280, WH=300;
  const teinte=k=>{ const c0=[227,220,207], c1=[233,179,157]; const u=k/8; return `rgb(${c0.map((c,i)=>Math.round(L(c,c1[i],u))).join(',')})`; };
  function wagon(a,k,x,yb,o={}){
    const c=k===9?ACC:teinte(k); let s=a.boite(x,yb,WW,WH,{couleur:c,prof:34,trait:6});
    s+=`<rect x="${f(x)}" y="${f(yb-WH+28)}" width="${WW}" height="16" fill="${INK}" opacity=".85"/>`;
    for(let j=0;j<3;j++){ const wx=x+22+j*86, wy=yb-WH+70, lit=o.lumiere?cl(o.lumiere(k,j)):0;
      s+=`<rect x="${f(wx)}" y="${f(wy)}" width="70" height="84" rx="10" fill="${lit>0?'#f6e3a8':BL}" stroke="${INK}" stroke-width="5"/>`;
      if(lit>0) s+=a.icone('users',wx+35,wy+46,lit*58,{ep:5}); }
    s+=`<rect x="${f(x)}" y="${f(yb-70)}" width="${WW}" height="10" fill="${INK}" opacity=".25"/>`;
    return s; }
  function loco(a,x,yb,o={}){
    let s=a.boite(x+70,yb,290,330,{couleur:PAP,prof:34,trait:6});
    s+=`<path d="M${x+72} ${yb-330} Q${x+5} ${yb-300} ${x} ${yb-170} L${x} ${yb} L${x+72} ${yb} Z" fill="${PAP}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`;
    s+=`<rect x="${x+2}" y="${yb-130}" width="358" height="34" fill="${ACC}" stroke="${INK}" stroke-width="5"/>`;
    s+=`<path d="M${x+66} ${yb-300} Q${x+22} ${yb-280} ${x+16} ${yb-205} L${x+130} ${yb-205} L${x+130} ${yb-300} Z" fill="${BL}" stroke="${INK}" stroke-width="5"/>`;
    s+=`<circle cx="${x+18}" cy="${yb-60}" r="18" fill="${OR}" stroke="${INK}" stroke-width="5"/>`;
    if(o.phare) s+=`<circle cx="${x+18}" cy="${yb-60}" r="${f(40+30*o.phare)}" fill="${OR}" opacity="${f(.35*o.phare)}"/>`;
    return s; }
  function roues(a,x,w,yb,ang){ let s=''; for(const cx of [x+50,x+w-50]){ s+=`<g transform="translate(${f(cx)} ${f(yb+30)}) rotate(${f(ang)})"><circle r="30" fill="#3a3530" stroke="${INK}" stroke-width="5"/><path d="M-26 0 H26 M0 -26 V26" stroke="${CR}" stroke-width="5"/></g>`; } return s; }
  function prive(a,x,yb,o={}){   // le wagon privé : petit, doré, une couronne
    let s=a.boite(x,yb,160,230,{couleur:OR,prof:28,trait:6});
    if(o.interieur){ s+=`<rect x="${x+12}" y="${yb-205}" width="136" height="190" rx="8" fill="#fff4d6" stroke="${INK}" stroke-width="5"/>`;
      s+=a.boite(x+30,yb-20,100,70,{couleur:ACC,prof:16,trait:5})+a.boite(x+30,yb-90,26,80,{couleur:ACC,prof:12,trait:5});
      s+=a.icone('crown',x+80,yb-170,54,{couleur:INK,fond:OR,rot:o.rot||0}); }
    else { s+=`<rect x="${x+20}" y="${yb-190}" width="60" height="70" rx="10" fill="${BL}" stroke="${INK}" stroke-width="5"/>`;
      s+=`<rect x="${f(x+96-(o.porte||0)*40)}" y="${yb-200}" width="54" height="190" rx="6" fill="#e0a94a" stroke="${INK}" stroke-width="5"/>`; }
    s+=a.icone('crown',x+90,yb-262,70,{couleur:INK,fond:OR});
    return s; }
  function attelage(x0,x1,yb){ return `<rect x="${f(x0)}" y="${f(yb-92)}" width="${f(Math.max(4,x1-x0))}" height="20" fill="#3a3530" stroke="${INK}" stroke-width="4"/>`; }
  function train(a,dx,yb,o={}){
    let s=''; const off=k=>o.acc?o.acc(k):0;
    s+=loco(a,dx+off(-1),yb,o); let px=dx+off(-1)+360;
    for(let k=0;k<10;k++){ const x=dx+WX(k)+off(k); s+=attelage(px,x,yb); if(o.roues) s+=roues(a,x,WW,yb,o.ang); s+=wagon(a,k,x,yb,o); px=x+WW; }
    const xp=dx+3420+off(10); s+=attelage(px,xp,yb); if(o.roues) s+=roues(a,xp,160,yb,o.ang); s+=prive(a,xp,yb,o.prive||{});
    if(o.roues) s+=roues(a,dx,360,yb,o.ang);
    return s; }
  // le billet tenu au-dessus de la tête, comme une pancarte (centre à 500 px au-dessus des pieds de Tico)
  function pancarte(a,T,len,o={}){ const yc=T.y-(o.haut||500), x0=T.x-len/2+(o.dx||0), x1=x0+len;
    return `<path d="M${f(T.x+30)} ${f(T.y-150)} L${f(T.x+6)} ${f(yc+50)}" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>`+billet(a,x0,x1,yc,o); }
  // cadrage : le point du monde (x, Yw) tombe à la hauteur sy de l'écran, au zoom z
  const C=(at,x,Yw,sy,z,o={})=>Object.assign({at,cible:[x,Yw-(sy-960)/z+120],zoom:z},o);
  const CA=(at,sy,z,dx,o={})=>Object.assign({at,cible:'acteur',zoom:z,decal:[dx,-(sy-960)/z]},o);
  return {INK,PAP,ACC,CR,OR,BL,MET,BAL,cl,L,sg,f,eo,ei,eio,prix,billet,wagon,loco,roues,prive,train,pancarte,WX,WW,WH,attelage,C,CA};
})();

const PLAN={
  format:'court',
  source:'SOURCE : INSEE 2025 · SALARIÉS DU PRIVÉ · NET',
  persos:{ gauche:{nom:'Tico'} },
  phrases:[
    "Tico pense que le top 10 % gagne 10 000 € de salaire par mois.",           // p1
    "Il se trompe de plus de moitié.",                                           // p2
    "Coupe ce qui dépasse…",                                                     // p3
    "Il reste 4 441 €.",                                                         // p4  CHIFFRE CHOC
    "Mais attends. Aligne tous les salaires du privé.",                          // p5
    "La moitié gagne environ deux fois moins.",                                  // p6
    "Le top 10 % commence ici.",                                                 // p7
    "Abonne-toi : chaque jour, un vrai chiffre que personne ne te dit.",         // p8  APPEL 1
    "Et les 10 000 € de Tico ?",                                                 // p9  RELANCE
    "Tout au bout.",                                                             // p10
    "10 000 €, c'est presque le top un pour cent.",                                       // p11
    "On les voit partout… mais ils sont rares.",                                 // p12
    "Le vrai chiffre, c'est 4 441 €.",                                           // p13 RÉVÉLATION
    "Toi, t'aurais dit plus… ou moins ? Dis-le en commentaire.",                 // p14 APPEL 2
  ],
  ancres:{ dixmille:{mot:'10 000',phrase:'p1'}, choc:{mot:'4 441',phrase:'p4'}, aligne:{mot:'Aligne',phrase:'p5'},
           ici:{mot:'ici',phrase:'p7'}, mais:{mot:'mais',phrase:'p12'}, revele:{mot:'4 441',phrase:'p13'}, dis:{mot:'Dis-le',phrase:'p14'} },
  musique:{nom:'complet-feels-good-to-be-alive', drop:'choc', coupe:['choc','revele']},
  abonne:'p8',
  question:'dis',

  cartons:[
    {de:'debut', l1:'Salaire du top 10 % :', l2:'10 000 € ?', mot:'10 000 €'},
    {de:'p2', l1:'Raté de', l2:'plus de moitié.', mot:'moitié.'},
    {de:'p3', l1:'Coupe ce', l2:'qui dépasse…', mot:'dépasse…'},
    {de:'p4', a:'p5-.4', l1:'Le vrai seuil :', l2:'4 441 €.', mot:'4 441 €.'},
    {de:'aligne', l1:'Tous les salariés', l2:'du privé, à bord.', mot:'bord.'},
    {de:'p6', l1:'La moitié gagne', l2:'deux fois moins.', mot:'moitié'},
    {de:'p7', a:'p8-.4', l1:'Le top 10 %', l2:'monte ici.', mot:'ici.'},
    {de:'p9', l1:'Et les 10 000 €', l2:'de Tico ?', mot:'10 000 €'},
    {de:'p10', a:'p11-.2', l1:'10 000 € :', l2:'tout au bout.', mot:'bout.'},
    {de:'p11', a:'p12-.4', l1:'10 000 € :', l2:'presque la couronne.', mot:'presque'},
    {de:'p12', a:'mais-.4', l1:'On les voit', l2:'partout…', mot:'partout…'},
    {de:'p13', a:'p14-.4', l1:'Le vrai chiffre :', l2:'4 441 €.', mot:'4 441 €.'},
    {de:'p14', a:'dis-.4', l1:'Toi, t\'aurais dit', l2:'plus ou moins ?', mot:'moins'},
    {de:'dis', l1:'Dis-le', l2:'en commentaire.', mot:'commentaire.'},
  ],
  humeurs:[ ['p1','gauche','content'],['dixmille','gauche','fier'],['p2','gauche','choque'],['p3','gauche','inquiet'],
            ['choc','gauche','saute'],['p4_fin-.6','gauche','content'],['aligne+.7','gauche','surpris'],['p6','gauche','pense'],
            ['p6+1.3','gauche','hausse'],['p7','gauche','saute'],['ici','gauche','fier'],['p8','gauche','salut'],['p8+2.9','gauche','montre'],
            ['p9','gauche','pense'],['p9+1.1','gauche','fier'],['p10','gauche','saute'],['p11','gauche','inquiet'],['p11+1.45','gauche','rit'],
            ['p12','gauche','surpris'],['p13','gauche','fier'],['revele','gauche','fier'],['p14','gauche','pense'],['dis','gauche','hausse'] ],

  scenes:[
  /* ═══════════ SCÈNE 1 · LE QUAI : le billet trop long, la guillotine, le train qui arrive (p1 → p8) ═══════════ */
  { type:'monde', de:'p1', a:'p8', nom:'gare-du-quai', largeur:6400, taille:.55,
    visuels:['train','wagons','quai','composteur','aiguillage'],
    acteur:[ {at:'p1',x:1080,y:1300},
             {at:'dixmille',x:1990,y:1300,mouvement:'marche',depuis:'p1+.1'},
             {at:'p7+.3',x:2340,y:995,mouvement:'saut',hauteur:200},
             {at:'p7+.6',x:2650,y:995,mouvement:'saut',hauteur:120},
             {at:'p7+.9',x:2950,y:995,mouvement:'saut',hauteur:120},
             {at:'ici',x:3060,y:1300,mouvement:'saut',hauteur:90},
             {at:'p8',x:3200,y:995,mouvement:'saut',hauteur:150,depuis:'ici+.5'} ],
    cadres:[ {at:'p1',cible:[800,1258],zoom:1.3},
             {at:'p1+.8',cible:'acteur',zoom:.95,decal:[-300,-221]},
             {at:'p1+2.9',cible:[1560,1000],zoom:.5,zoomFin:.46},
             {at:'p2',cible:[1600,1180],zoom:.9,coupe:true},
             {at:'p2+.85',cible:[1640,1215],zoom:1.1,transition:.4},
             {at:'p3',cible:[1560,1200],zoom:1.15,rot:-3,coupe:true},
             {at:'p3+.55',cible:[1370,1173],zoom:.75,zoomFin:.7},
             {at:'p4',cible:[1735,1275],zoom:1.45,coupe:true},
             N8.CA('choc+.85',1150,1.0,-150,{rot:2}),
             N8.C('p4_fin-.2',2500,1180,1060,.7,{zoomFin:.64,coupe:true}),
             {at:'aligne-.03',cible:[5400,1000],zoom:1,coupe:true},
             N8.C('aligne+.8',2480,1300,1250,.75,{rot:-4,coupe:true}),
             N8.C('p5_fin-.3',1700,1300,1250,.75,{transition:.7}),
             N8.C('p6',1130,1300,1300,.7,{rot:3,coupe:true}),
             N8.C('p6+1.2',2110,740,960,1.3),
             {at:'p7',cible:'acteur',zoom:.75,decal:[180,-280]},
             {at:'ici-.3',cible:[3020,1237],zoom:1.15,coupe:true},
             N8.CA('ici+.45',1300,.95,40) ],
    dessin:(t,a)=>{ const N=N8, T=k=>a.T(k), Ti=a.acteur(t); let s=''; if(t>T('p8')+.2) return '';
      const tDix=T('dixmille'), tCut=T('p3')+.3, tChoc=T('choc'), tLeve=T('p4_fin')-.6, tAl=T('aligne'), tIn=tAl+.75, tStop=T('p5_fin')+.15, tIci=T('ici');
      // ── décor de la gare (derrière) : auvent, piliers, horloge, panneau des départs ──
      for(let i=0;i<6;i++){ const x0=-600+i*800; s+=`<path d="M${x0} 360 Q${x0+400} -420 ${x0+800} 360" fill="#f3ede2" stroke="${N.INK}" stroke-width="10"/>`;
        for(let k=1;k<4;k++) s+=`<path d="M${x0+k*200} 360 L${x0+400} ${f(-420+780*.5)}" stroke="${N.INK}" stroke-width="4" opacity=".35"/>`; }
      s+=`<rect x="-600" y="360" width="4800" height="44" fill="${N.INK}"/><rect x="-600" y="404" width="4800" height="14" fill="${N.ACC}"/>`;
      for(const px of [250,1250,2250,3250,4150]) s+=a.boite(px,1300,46,896,{couleur:'#e6dccb',prof:16,trait:5});
      if(t<T('p5')){ const cx=1273, cy=780, ang=t*36; s+=`<circle cx="${cx}" cy="${cy}" r="62" fill="${N.PAP}" stroke="${N.INK}" stroke-width="7"/><path d="M${cx} ${cy} L${f(cx+44*Math.sin(ang*Math.PI/180))} ${f(cy-44*Math.cos(ang*Math.PI/180))}" stroke="${N.ACC}" stroke-width="5" stroke-linecap="round"/><path d="M${cx} ${cy} L${cx+26} ${cy-14}" stroke="${N.INK}" stroke-width="8" stroke-linecap="round"/>`; }
      { let g=`<g transform="translate(560 470)"><rect x="-190" y="0" width="380" height="120" rx="10" fill="${N.INK}"/><path d="M-120 0 V-66 M120 0 V-66" stroke="${N.INK}" stroke-width="5"/>`;
        for(let r=0;r<3;r++) for(let c=0;c<10;c++) if((c*7+r*3+Math.floor(t*4))%5) g+=`<rect x="${-160+c*32}" y="${18+r*32}" width="22" height="20" rx="4" fill="${N.OR}" opacity="${(c+r)%3?.9:.4}"/>`;
        s+=g+'</g>'; }
      // panneau « TOP 10 % → » qui se balance
      if(t<tIn){ const r=3.5*Math.sin(t*2.2); s+=`<g transform="translate(2420 430) rotate(${f(r)})"><path d="M-90 0 V150 M90 0 V150" stroke="${N.INK}" stroke-width="5"/>`+a.etiquette(0,190,'TOP 10 % →',{taille:60,fond:'acc'})+'</g>'; }
      // ── le train (derrière le quai) : il arrive pendant « Aligne… », freine, accordéon ──
      if(t>tIn-.05){ const dx=3000*(1-N.eo(N.sg(t,tIn,tStop)));
        const acc=k=>{ const u=t-tStop-(k+1)*.045; return u>0?-46*Math.exp(-5*u)*Math.sin(12*u):0; };
        const lum=(k,j)=>N.sg(t,tStop+.05+k*.04+j*.02,tStop+.2+k*.04+j*.02);
        s+=N.train(a,dx,1300,{acc,lumiere:lum,phare:t<tStop?1:0});
        // étiquette TOP 10 % sur le toit du wagon 10 (p7)
        const pe=a.ressort(t,T('p7')+.15,.5); if(pe>0) s+=a.etiquette(N.WX(9)+140,915,'TOP 10 %',{taille:56,fond:'acc',p:pe,rot:-3});
        // la porte du wagon 10 coulisse au composteur
        const pp=N.eo(N.sg(t,tIci+.15,tIci+.5)); if(pp>0){ const xd=N.WX(9)+190; s+=`<rect x="${xd}" y="1100" width="76" height="190" fill="${N.OR}" stroke="${N.INK}" stroke-width="5"/><rect x="${f(xd+pp*78)}" y="1100" width="76" height="190" fill="${N.ACC}" stroke="${N.INK}" stroke-width="5"/>`; s+=`<circle cx="${xd+38}" cy="1190" r="${f(60+pp*80)}" fill="${N.OR}" opacity="${f(.25*pp)}"/>`; }
        // « LA MOITIÉ » : accolade au-dessus des wagons 1 à 5, petits billets levés
        const pm=N.sg(t,T('p6')+.05,T('p6')+.5), pmo=1-N.sg(t,T('p6')+1.1,T('p6')+1.3);
        if(pm>0){ const x0=N.WX(0), x1=N.WX(4)+N.WW, xe=N.L(x0,x1,N.eo(pm));
          if(pmo>0){ s+=`<path d="M${x0} 790 V760 H${f(xe)} ${pm>=1?`V790`:''}" fill="none" stroke="${N.INK}" stroke-width="9" stroke-linecap="round" opacity="${f(pmo)}"/>`;
          s+=`<g opacity="${f(pmo)}">`+a.etiquette((x0+x1)/2,690,'LA MOITIÉ',{taille:64,fond:'encre',p:a.ressort(t,T('p6')+.35,.5)})+'</g>'; }
          for(let k=0;k<5;k++){ const pb=a.ressort(t,T('p6')+.45+k*.08,.45); if(pb<=0) continue; let bx=N.WX(k)+29, by=948;
            if(k===4){ const ug=N.eio(N.sg(t,T('p6')+1.65,T('p6')+1.95)); bx=N.L(bx,1990,ug); by=N.L(948,672,ug)-90*Math.sin(Math.PI*ug); }
            s+=`<g transform="translate(${f(bx+111)} ${f(by)}) scale(${f(pb)}) translate(${f(-bx-111)} ${f(-by)})">`+N.billet(a,bx,bx+222,by,{h:80,tete:false})+(k===4&&t>T('p6')+1.6?a.txt(bx+125,by+9,22,'SM','#6b645a','LA MOITIÉ',{ls:2}):'')+'</g>'; }
          const pq=N.sg(t,T('p6')+1.95,T('p6')+2.2)*(1-N.sg(t,T('p7')-.1,T('p7')+.1)); if(pq>0) s+=`<g opacity="${f(pq)}" stroke="${N.ACC}" stroke-width="8" stroke-dasharray="14 10"><path d="M1990 610 V870 M2212 610 V870"/></g>`+a.txt(2101,760,64,'IS',N.ACC,'=',{op:pq}); }
      }
      // le quai : bord avec bande d'éveil (devant le train)
      s+=`<rect x="-600" y="1282" width="4800" height="18" fill="${N.PAP}" stroke="${N.INK}" stroke-width="4"/>`;
      for(let x=-580;x<4200;x+=46) s+=`<rect x="${x}" y="1286" width="22" height="10" fill="${N.OR}"/>`;
      s+=`<rect x="-600" y="1314" width="4800" height="210" fill="#ddd2bf"/>`;
      for(let r=0;r<3;r++) for(let x=-600+(r%2)*115;x<4200;x+=230) s+=`<rect x="${x+6}" y="${1322+r*66}" width="218" height="56" rx="6" fill="#e8dfd0" stroke="#c9bca5" stroke-width="4"/>`;
      s+=`<rect x="-600" y="1524" width="4800" height="16" fill="${N.INK}"/><rect x="-600" y="1540" width="4800" height="600" fill="#cfc2ab"/>`;
      for(let x=-600;x<4200;x+=110) s+=`<rect x="${x}" y="1600" width="70" height="26" rx="4" fill="#8c7a64" stroke="${N.INK}" stroke-width="4"/>`;
      // sous la voie (retouche 2 du Juge) : rail, 2e voie, clôture avec herbes, talus jusqu'en bas de l'image
      s+=`<rect x="-600" y="1590" width="4800" height="12" fill="${N.INK}"/><rect x="-600" y="1760" width="4800" height="1900" fill="#d6c8af"/>`;
      for(let x=-560;x<4200;x+=120) s+=`<rect x="${x}" y="1780" width="72" height="24" rx="4" fill="#8c7a64" stroke="${N.INK}" stroke-width="4"/>`;
      s+=`<rect x="-600" y="1768" width="4800" height="14" fill="${N.INK}"/>`;
      for(let x=-580;x<4200;x+=260){ s+=`<rect x="${x}" y="1900" width="22" height="200" fill="#bba98c" stroke="${N.INK}" stroke-width="5"/><path d="M${x+30} 2100 l40 -70 l18 70 l30 -50 l14 50 Z" fill="#b9c79e" stroke="${N.INK}" stroke-width="4"/>`; }
      s+=`<path d="M-600 1940 H4200 M-600 2000 H4200" stroke="${N.INK}" stroke-width="5" opacity=".7"/><rect x="-600" y="2140" width="4800" height="1600" fill="#cfc2ab"/>`;
      for(let i=0;i<60;i++){ const x=-560+((i*397)%4700), y=2220+((i*173)%1300); s+=`<circle cx="${x}" cy="${y}" r="${6+(i%4)*3}" fill="#bfb198"/>`; }
      s+=`<rect x="-600" y="1586" width="4800" height="14" fill="${N.INK}"/>`;
      for(let i=0;i<60;i++) s+=`<circle cx="${-560+i*83}" cy="${1660+(i*37)%90}" r="9" fill="#bfb199"/>`;
      // ── le distributeur de billets ──
      { const sh=t<tDix?2.5*Math.sin(t*60):0;
        const go=N.ei(N.sg(t,tIn,tIn+.5)); s+=`<g transform="translate(${f(sh-900*go)} 0) rotate(${f(-14*go)} 800 1300)">`+a.ombre(800,1302,360)+a.boite(640,1300,300,480,{couleur:N.PAP,prof:56,trait:6});
        s+=`<rect x="660" y="845" width="260" height="110" rx="10" fill="${N.INK}"/>`;
        { const lb=t<T('p3')+.3?Math.max(60,Math.min(1000,Ti.x-40-950)):N.L(1000,444.1,N.eo(N.sg(t,T('p4')+.05,T('choc')))); s+=a.txt(790,920,54,'IS',N.OR,N.prix(Math.round(lb*10/10)*10>=4440&&lb<445?4441:Math.round(lb)*10)); }
        s+=a.txt(790,1185,30,'SM',N.ACC,'BILLETS',{ls:4})+`<rect x="905" y="995" width="44" height="130" rx="8" fill="${N.INK}"/></g>`; }
      // ── LE BILLET de Tico ──
      const S0=950;
      if(t<tCut){ const x1=Math.max(S0+60,Ti.x-40), v=Math.round((x1-S0)*10/10)*10;
        const amp=t>T('p1')+2.4&&t<T('p2')+.3?22*N.sg(t,T('p1')+2.4,T('p1')+2.8):0;
        s+=N.billet(a,S0,x1,1060,{prix:x1-S0>300?N.prix(Math.min(10000,v)):null,onde:amp,ph:t*7});
        // repère MOITIÉ + ligne de coupe qui glisse (p2)
        const pl=N.sg(t,T('p2')+.1,T('p2')+1.35);
        if(t>T('p2')){ s+=`<path d="M1450 1000 V1120" stroke="${N.INK}" stroke-width="5" opacity=".5"/>`+a.txt(1450,985,26,'SM','#6b645a','MOITIÉ',{ls:3});
          const xc=N.L(S0+40,1506,N.eo(pl)); s+=`<path d="M${f(xc)} 975 V1145" stroke="${N.ACC}" stroke-width="7" stroke-dasharray="18 12"/>`+a.icone('scissors',xc,935,72,{couleur:N.ACC,fond:N.PAP,rot:90}); }
      } else {
        // la partie coupée tombe sur le quai… puis le vent du train l'emporte et la colle sur le wagon 3
        const pf=N.sg(t,tCut+.05,tCut+.55), yb=N.L(1060,1238,pf*pf)+(pf>=1?-10*a.ressort(t,tCut+.55,.35)+10:0);
        let px0=S0, py=yb, sc=1, rot=N.L(0,-3,pf);
        if(t>tIn+.3){ const dx=3000*(1-N.eo(N.sg(t,tIn,tStop))), ax=dx+N.WX(2)+20, ay=1150, u=N.eio(N.sg(t,tIn+.3,tIn+.75));
          px0=N.L(S0,ax,u); py=N.L(yb,ay,u)-120*Math.sin(Math.PI*u); sc=N.L(1,.45,u); rot=N.L(-3,8*Math.sin(t*9),u); }
        s+=`<g transform="translate(${f(px0)} ${f(py)}) rotate(${f(rot)}) scale(${f(sc)}) translate(${-S0} -1060)">`+N.billet(a,S0,1506,1060,{tete:false})+'</g>';
        if(t>tCut&&t<tCut+.9) s+=a.eclats(1506,1060,t,tCut,{n:12,force:380});
        // la partie gardée : 4 441 €, tenue par Tico ; levée en pancarte à p4_fin
        const v=N.L(10000,4441,N.eo(N.sg(t,T('p4')+.05,tChoc)));
        const pl=N.eio(N.sg(t,tLeve,tLeve+.4));
        const fold=N.sg(t,T('p6')+1.25,T('p6')+1.6)*(1-N.sg(t,T('p7')-.15,T('p7')+.15));
        if(pl<1){ s+=`<g opacity="${f(1-pl)}">`+N.billet(a,Ti.x-484,Ti.x-40,N.L(1060,900,pl),{prix:N.prix(v)})+'</g>'; }
        if(pl>0){ const len=444, yc=Ti.y-500;
          if(fold<=0) s+=`<g opacity="${f(pl)}">`+N.pancarte(a,Ti,len,{prix:N.prix(v),tete:!(t>T('p6')-.1&&t<T('p6')+1.3)})+'</g>';
          else { // le billet se plie en deux : la moitié gauche se rabat sur la droite
            const cx=Ti.x, k=Math.cos(Math.PI*fold);
            s+=`<path d="M${f(Ti.x+30)} ${f(Ti.y-150)} L${f(Ti.x+6)} ${f(yc+50)}" stroke="${N.INK}" stroke-width="9" stroke-linecap="round"/>`;
            s+=N.billet(a,cx,cx+222,yc,{tete:false,bandeDroite:true,prix:'4 441 €',taillePrix:44});
            s+=`<g transform="translate(${f(cx)} 0) scale(${f(k)} 1) translate(${f(-cx)} 0)">`+N.billet(a,cx-222,cx,yc,{dos:k<0,tete:false})+'</g>'+(k<-.2?a.txt(cx+196,yc+26,44,'IS',N.INK,'4 441 €',{a:'end',op:N.cl((-k-.2)/.4)}):'')+(fold>.9?a.txt(cx+111,yc-24,20,'SM','#6b645a','PLIÉ EN DEUX',{ls:2}):''); }
        }
        if(t>tChoc-.05&&t<tChoc+.7) s+=a.onde(Ti.x-262,1060,420,N.sg(t,tChoc,tChoc+.6));
        // le composteur (top 10 %) qui claque sur le billet
        { const xc=2838, clac=t>tIci?6+16*Math.exp(-(t-tIci)*10):0;
          s+=a.boite(xc-24,1300,48,430,{couleur:'#e6dccb',prof:14,trait:5})+a.boite(xc-60,860+clac,120,110,{couleur:N.OR,prof:20,trait:6});
          s+=`<rect x="${xc-36}" y="${f(830+clac)}" width="72" height="14" rx="5" fill="${N.INK}"/>`;
          s+=a.tampon(Ti.x-140,808,'TOP 10 %',N.sg(t,tIci,tIci+.25),{taille:26,rot:-4});
          if(t>tIci&&t<tIci+.7) s+=a.onde(xc,820,300,N.sg(t,tIci,tIci+.6)); }
      }
      // la guillotine du quai
        const pg=a.ressort(t,T('p3')-.35,.45), up=N.ei(N.sg(t,T('p4')-.25,T('p4')+.15));
        if(pg>0&&up<1){ const oy=-1000*(1-pg)-1100*up, by=N.L(780,1010,N.ei(N.sg(t,T('p3')+.12,tCut)));
          s+=`<g transform="translate(0 ${f(oy)})">`+a.boite(1400,1300,26,560,{couleur:'#8c7a64',prof:12,trait:5})+a.boite(1590,1300,26,560,{couleur:'#8c7a64',prof:12,trait:5});
          s+=`<path d="M1424 ${f(by-70)} H1590 V${f(by+40)} L1424 ${f(by+100)} Z" fill="${N.MET}" stroke="${N.INK}" stroke-width="6" stroke-linejoin="round"/>`;
          s+=a.boite(1394,760,236,40,{couleur:N.INK,prof:14,trait:5})+'</g>'; }
        if(t>tCut-.02&&t<tCut+.6) s+=a.onde(1506,1060,260,N.sg(t,tCut,tCut+.5));
      // ── signal + phare qui approche (fin de p4) ──
      { const pv=N.sg(t,tLeve+.2,tLeve+.35); s+=a.boite(2560,1300,30,380,{couleur:N.INK,prof:10,trait:4})+`<rect x="2540" y="890" width="70" height="120" rx="14" fill="${N.INK}"/><circle cx="2575" cy="925" r="20" fill="${pv>0?'#5d4f43':'#e0553a'}"/><circle cx="2575" cy="975" r="20" fill="${pv>0?'#7fd18b':'#5d4f43'}"/>`;
        const ph=N.sg(t,tLeve+.3,T('p5')); if(ph>0&&t<tIn) s+=`<path d="M3020 ${f(1180-40-60*ph)} L${f(3020-1400*ph)} ${f(1180-220*ph)} L${f(3020-1400*ph)} ${f(1180+160*ph)} L3020 ${f(1180+40+60*ph)} Z" fill="#fff1c2" opacity="${f(.55*ph)}"/><circle cx="3020" cy="1180" r="${f(60+500*ph*ph)}" fill="${N.OR}" opacity="${f(.25+.3*ph)}"/><circle cx="3020" cy="1180" r="${f(30+70*ph)}" fill="#fff6d8"/>`; }
      // ── LE MOMENT 3D : la locomotive arrive du fond, en perspective (pendant « Aligne… ») ──
      if(t>tAl-.3&&t<tAl+1.0){ const VX=5400, VY=720, u=N.sg(t,tAl-.05,tAl+.85);
        s+=`<rect x="4600" y="-500" width="1600" height="2900" fill="#efe8dc"/><path d="M4600 ${VY} H6200 V2400 H4600 Z" fill="${N.BAL}"/>`;
        for(let i=0;i<14;i++){ const d=((i+t*9)%14)/14, y=N.L(VY,2100,d*d), hw=N.L(6,1100,d*d); s+=`<path d="M${f(VX-hw)} ${f(y)} H${f(VX+hw)}" stroke="#8c7a64" stroke-width="${f(N.L(2,26,d*d))}"/>`; }
        s+=`<path d="M${VX-8} ${VY} L${VX-520} 2400 M${VX+8} ${VY} L${VX+520} 2400" stroke="${N.INK}" stroke-width="14"/>`;
        s+=`<path d="M${VX} ${VY} L4600 -200 M${VX} ${VY} L6200 -200 M${VX} ${VY} L4600 300 M${VX} ${VY} L6200 300" stroke="${N.INK}" stroke-width="6" opacity=".35"/>`;
        for(let i=0;i<10;i++){ const an=i/10*6.283+.3, r0=200+((t*1400+i*170)%900); s+=`<path d="M${f(VX+Math.cos(an)*r0)} ${f(VY+Math.sin(an)*r0)} l${f(Math.cos(an)*120)} ${f(Math.sin(an)*120)}" stroke="${N.ACC}" stroke-width="8" stroke-linecap="round" opacity=".55"/>`; }
        const k=N.L(.04,1.9,N.ei(u)), by=VY+1180*k/1.9;
        s+=`<g transform="translate(${VX} ${f(by)}) scale(${f(k*1.25)})"><rect x="-170" y="-430" width="340" height="430" rx="60" fill="${N.PAP}" stroke="${N.INK}" stroke-width="8"/><rect x="-130" y="-390" width="260" height="140" rx="26" fill="${N.BL}" stroke="${N.INK}" stroke-width="7"/><rect x="-170" y="-200" width="340" height="50" fill="${N.ACC}" stroke="${N.INK}" stroke-width="6"/><circle cx="-100" cy="-90" r="34" fill="${N.OR}" stroke="${N.INK}" stroke-width="7"/><circle cx="100" cy="-90" r="34" fill="${N.OR}" stroke="${N.INK}" stroke-width="7"/><circle cx="-100" cy="-90" r="90" fill="${N.OR}" opacity=".3"/><circle cx="100" cy="-90" r="90" fill="${N.OR}" opacity=".3"/><rect x="-150" y="-30" width="70" height="30" fill="${N.INK}"/><rect x="80" y="-30" width="70" height="30" fill="${N.INK}"/></g>`; }
      return s; },
    sons:[['p1','papier-glisse',.3],['p1+.7','papier-glisse',.2],['p1+1.4','papier-glisse',.2],['dixmille','caisse-ching',.3],
          ['p2+.1','key-press',.2],['p2+.7','key-press',.15],['p3-.35','whoosh',.22],['p3+.05','metal-leger-1',.3],['p3+.3','ciseaux-snip',.4],['p3+.36','chute-sifflet',.18],
          ['p3+.85','tombe-2',.3],['p3+.9','papier-froisse',.25],['p4-.2','whoosh-short',.2],['p4+.05','typing',.18],['choc','impact-bass-1',.35],['choc+.02','caisse-ching',.22],
          ['p4_fin-.6','whoosh-short',.2],['p4_fin-.35','bong',.22],['p4_fin','riser',.18],['aligne-.05','whoosh-cinematic',.35],['aligne+.75','whoosh',.3],
          ['p5_fin+.1','metal-leger-1',.3],['p5_fin+.25','metal-leger-2',.28],['p5_fin+.4','metal-leger-3',.25],['p5_fin+.2','papier-glisse',.2],
          ['p6+.1','key-press',.2],['p6+.45','pop',.18],['p6+.53','pop',.18],['p6+.61','pop',.18],['p6+.69','pop',.18],['p6+.77','pop',.18],
          ['p6+1.25','papier-froisse',.3],['p6+1.65','papier-glisse',.22],['p6+1.95','validation-1',.25],['p7+.15','pop',.3],
          ['ici','tampon',.4],['ici+.15','metal-leger-2',.25],['ici+.3','chime',.2]],
    actions:[['p1','dixmille','le billet sort du distributeur et se déroule'],['p1+2.3','p2+.3','le billet ondule, le panneau se balance'],
             ['p2+.1','p2+1.4','la ligne de coupe glisse'],['p3-.35','p3+1.2','la guillotine tombe, le bout coupé tombe'],['p4','choc+.6','le compteur descend'],
             ['p4_fin-.6','p5','le billet est levé, le signal passe au vert, le phare approche'],['aligne-.05','aligne+.9','la locomotive arrive en 3D'],
             ['aligne+.75','p6+.3','le train freine, accordéon, fenêtres'],['p6','p6+1.1','la moitié : accolade, billets levés'],
             ['p6+1.2','p7+.2','le billet se plie en deux'],['p7+.1','p8','étiquette, composteur, porte']] },

  { type:'mot', de:'p5', a:'aligne-.03', txt:'MAIS<br>ATTENDS.', fond:'acc' },

  /* ═══════════ SCÈNE 2 · LE VOYAGE : le train roule, le bout de billet revient, le wagon privé (p8 → p14) ═══════════ */
  { type:'monde', de:'p8', a:'p14', nom:'train-qui-roule', largeur:5200, taille:.55,
    visuels:['locomotive','voyage','wagon privé'],
    acteur:[ {at:'p8',x:3200,y:938},
             {at:'p10+.5',x:3390,y:938,mouvement:'glisse',depuis:'p10'},
             {at:'p11',x:3700,y:1215,mouvement:'saut',hauteur:110},
             {at:'p11+1.0',x:3560,y:1215,mouvement:'marche',depuis:'p11+.8'},
             {at:'p11+1.45',x:3680,y:1212,mouvement:'saut',hauteur:60,depuis:'p11+1.1'},
             {at:'revele-.45',x:3700,y:1215,mouvement:'saut',hauteur:120,depuis:'revele-.85'} ],
    cadres:[ N8.CA('p8',1120,.85,-200),
             N8.C('p8+1.55',1150,1300,1330,.82,{zoomFin:.76,coupe:true}),
             N8.CA('p8+2.95',1150,1.15,-120,{coupe:true}),
             N8.C('p9-.1',1130,1090,1000,1.0,{coupe:true}),
             N8.C('p9+.1',2400,800,1000,.7,{transition:.7}),
             N8.CA('p9+.95',1000,.9,-300),
             N8.CA('p10',900,.9,150,{transition:.2}),
             N8.C('p10+.48',3560,1300,1170,1.0,{coupe:true}),
             N8.C('p11+.1',3560,1215,1100,1.4),
             N8.C('p11+1.4',3560,1130,1100,1.3,{rot:3,coupe:true}),
             N8.C('p12',2300,1300,1170,.62,{zoomFin:.58,coupe:true}),
             N8.C('p12_fin-.05',2950,1300,1250,.55,{zoomFin:.7,coupe:true}),
             N8.C('revele-.55',3700,1215,1150,1.2,{zoomFin:1.25,coupe:true}),
             N8.C('revele+1.1',4100,750,900,.85,{transition:.7}) ],
    dessin:(t,a)=>{ const N=N8, T=k=>a.T(k), Ti=a.acteur(t); let s=''; if(t>T('p14')+.2) return '';
      const t0=T('p8'), r1=1.2, V=1500, tb=T('p13'), r2=Math.max(.5,T('revele')-.1-tb);
      const D=tt=>{ if(tt<t0) return 0; const u=tt-t0; if(u<r1) return V*u*u/(2*r1); const D1=V*r1/2+V*(Math.min(tt,tb)-t0-r1); if(tt<=tb) return D1; const w=Math.min(tt-tb,r2); return D1+V*(w-w*w/(2*r2)); };
      const d=D(t), vit=t<t0?0:(t<t0+r1?(t-t0)/r1:(t<tb?1:1-N.sg(t,tb,tb+r2)));
      // ciel : nuages (très lent), grandes collines (lent), poteaux (moyen)
      for(let i=0;i<10;i++){ const x=((i*730-d*.08-t*30)%7300+7300)%7300-1500, y=120+((i*137)%260);
        s+=`<path d="M${f(x)} ${y} q30 -70 100 -50 q40 -60 110 -10 q70 -10 70 60 Z" fill="${N.PAP}" stroke="${N.INK}" stroke-width="6" stroke-linejoin="round"/>`; }
      for(let i=-2;i<8;i++){ const x=((i*1300-d*.12)%10400+10400)%10400-2000; s+=`<path d="M${f(x)} 1300 L${f(x+650)} ${560+((i+2)%3)*90} L${f(x+1300)} 1300 Z" fill="#d9ccb4" stroke="${N.INK}" stroke-width="6" stroke-linejoin="round"/><path d="M${f(x+520)} ${f(560+((i+2)%3)*90+130)} L${f(x+650)} ${560+((i+2)%3)*90} L${f(x+780)} ${f(560+((i+2)%3)*90+130)} l-60 30 l-70 -30 l-60 30 Z" fill="${N.PAP}" stroke="${N.INK}" stroke-width="5" stroke-linejoin="round"/>`; }
      for(let i=-2;i<9;i++){ const x=((i*900-d*.18)%9900+9900)%9900-1500; s+=`<path d="M${f(x)} 1300 Q${f(x+260)} ${f(850-(((i%3)+3)%3)*90)} ${f(x+520)} 1060 Q${f(x+700)} 960 ${f(x+900)} 1300 Z" fill="#e3d6c0" stroke="${N.INK}" stroke-width="5" opacity=".9"/>`; }
      for(let i=-2;i<14;i++){ const x=((i*520-d*.7)%7280+7280)%7280-1200; s+=`<rect x="${f(x)}" y="560" width="22" height="740" fill="#cbbfa9" stroke="${N.INK}" stroke-width="4"/><path d="M${f(x-60)} 600 H${f(x+82)}" stroke="${N.INK}" stroke-width="6"/>`;
        if(((i%3)+3)%3===0) s+=a.icone('tree',x+250,1180,190,{couleur:N.INK,fond:'#cfdcb6',ep:5}); }
      s+=`<path d="M-1500 610 H5600" stroke="${N.INK}" stroke-width="3" opacity=".5"/>`;
      // les panneaux de pub « €€€ » qui poussent le long de la voie (p12)
      if(t>T('p12')-.1&&t<T('p13')){ const objs=['car','sailboat','diamond','home'];
        for(let i=0;i<4;i++){ const tp=T('p12')+.12+i*.3, pp=a.ressort(t,tp,.45); if(pp<=0) continue; const x=1750+i*470-(d-D(T('p12')))*.3;
          s+=`<g transform="translate(${f(x)} 1300) scale(${f(pp*(i%2?1.0:1.2))}) translate(${f(-x)} -1300)">`+a.boite(x-12,1300,24,420,{couleur:'#cbbfa9',prof:8,trait:4})+a.boite(x-170,900,340,230,{couleur:N.PAP,prof:20,trait:6})+a.icone(objs[i],x,770,120,{couleur:N.INK,fond:N.OR,ep:6})+a.txt(x,875,52,'IS',N.ACC,'€€€')+'</g>'; } }
      // voie : ballast, traverses qui défilent, rail
      s+=`<rect x="-1500" y="1300" width="7200" height="500" fill="${N.BAL}"/>`;
      for(let i=0;i<70;i++){ const x=((i*110-d)%7700+7700)%7700-1500; s+=`<rect x="${f(x)}" y="1300" width="64" height="20" rx="4" fill="#8c7a64" stroke="${N.INK}" stroke-width="3"/>`; if(i%2) s+=`<circle cx="${f(x+30)}" cy="${1360+(i%5)*22}" r="7" fill="#c9bca5"/>`; }
      s+=`<rect x="-1500" y="1290" width="7200" height="12" fill="${N.INK}"/>`;
      s+=`<rect x="-1500" y="1440" width="7200" height="900" fill="#d6c8af"/>`;
      for(let i=0;i<70;i++){ const x=((i*120-d*1.35)%8400+8400)%8400-1500; s+=`<rect x="${f(x)}" y="1462" width="70" height="24" rx="4" fill="#8c7a64" stroke="${N.INK}" stroke-width="4"/>`; }
      s+=`<rect x="-1500" y="1450" width="7200" height="14" fill="${N.INK}"/>`;
      for(let i=0;i<40;i++){ const x=((i*260-d*1.8)%10400+10400)%10400-1500; s+=`<rect x="${f(x)}" y="1560" width="22" height="200" fill="#bba98c" stroke="${N.INK}" stroke-width="5"/>`;
        s+=`<path d="M${f(x+30)} 1760 l40 -70 l18 70 l30 -50 l14 50 Z" fill="#b9c79e" stroke="${N.INK}" stroke-width="4"/>`; }
      s+=`<path d="M-1500 1600 H5700 M-1500 1660 H5700" stroke="${N.INK}" stroke-width="5" opacity=".7"/>`;
      // le train (il roule : roues qui tournent, petit tangage)
      const ins=false;
      s+=`<g transform="translate(0 ${f(vit*2*Math.sin(t*30))})">`+N.train(a,0,1240,{roues:true,ang:-d/30*57.3,lumiere:(k,j)=>1,prive:{interieur:ins,porte:N.sg(t,T('p11')+.85,T('p11')+1.0)*(ins?0:1),rot:t*120}})+'</g>';
      // traînées de vent
      if(vit>.3) for(let i=0;i<6;i++){ const x=((i*700-d*1.6)%4200+4200)%4200-200; s+=`<path d="M${f(x)} ${720+i*70} h${f(160*vit)}" stroke="${N.INK}" stroke-width="5" stroke-linecap="round" opacity="${f(.25*vit)}"/>`; }
      // à l'arrivée (p13) : la gare d'arrivée glisse depuis la droite
      if(t>tb){ const x=4600-(d-D(tb)); s+=a.boite(x,1300,1200,60,{couleur:N.PAP,prof:30,trait:6})+a.boite(x+200,1240,40,600,{couleur:'#e6dccb',prof:12,trait:5})+a.boite(x+700,1240,40,600,{couleur:'#e6dccb',prof:12,trait:5})+`<rect x="${f(x+120)}" y="600" width="760" height="40" fill="${N.INK}"/>`; }
      // le fauteuil doré du balcon (Tico s'y affale à p11+1.45) et la couronne qui tourne au-dessus de lui
      { const ps=a.ressort(t,T('p11')+1.45,.4), sq=ps>0&&ps<1?1+.12*Math.sin(Math.PI*ps):1;
        s+=`<g transform="translate(3690 1212) scale(${f(1/sq)} ${f(sq)}) translate(-3690 -1212)">`+a.boite(3628,1212,124,190,{couleur:N.OR,prof:18,trait:5})+a.boite(3618,1212,144,58,{couleur:N.ACC,prof:18,trait:5})+'</g>';
        const pc=a.ressort(t,T('p11')+1.55,.45); if(pc>0&&t<T('revele')-.8) s+=`<g transform="translate(${f(Ti.x)} ${f(Ti.y-300-20*Math.sin(t*5))}) scale(${f(pc)}) scale(${f(Math.cos(t*4))} 1)">`+a.icone('crown',0,0,90,{couleur:N.INK,fond:N.OR,ep:6})+'</g>'; }
      // le balcon arrière du wagon privé, la jauge et le lecteur de billet
      s+=`<rect x="3580" y="1212" width="200" height="22" fill="#8c7a64" stroke="${N.INK}" stroke-width="5"/><path d="M3590 1212 V1110 H3770 V1212 M3650 1110 V1212 M3710 1110 V1212" fill="none" stroke="${N.INK}" stroke-width="6"/>`;
      { const g=t<T('p11')+.2?0:Math.min(.8,N.eo(N.sg(t,T('p11')+.2,T('p11')+.75))*.8)+(t>T('p11')+.75&&t<T('p11')+1.2?.012*Math.sin(t*60):0);
        const pj=a.ressort(t,T('p10')+.3,.45); if(pj>0){ s+=`<g transform="translate(3475 1222) scale(${f(pj)}) translate(-3475 -1222)"><rect x="3430" y="962" width="90" height="260" rx="45" fill="${N.PAP}" stroke="${N.INK}" stroke-width="7"/><rect x="3444" y="${f(1208-238*g)}" width="62" height="${f(238*g)}" rx="31" fill="${N.ACC}"/><path d="M3420 ${f(1208-238*.98)} h110" stroke="${N.INK}" stroke-width="6" stroke-dasharray="10 7"/>`+a.icone('crown',3430,840,90,{couleur:N.INK,fond:N.OR,ep:6})+`</g>`; }
        const rouge=t>T('p11')+.75&&t<T('p11')+1.45&&Math.floor(t*8)%2===0; s+=`<circle cx="3610" cy="1080" r="16" fill="${rouge?'#e0553a':'#5d4f43'}" stroke="${N.INK}" stroke-width="4"/>`; }
      // le bout coupé : collé sur le wagon 3, il claque au vent… puis revient se recoller (p9)
      const tR=T('p9'), tA=T('p9')+1.05, tPart=T('revele')-.3;
      { const ax=N.WX(2)+20, ay=1090; let px=ax, py=ay, sc=.7, rot=8*Math.sin(t*9), op=1;
        if(t>tR&&t<tA){ const u=N.eio(N.sg(t,tR,tA)), xT=Ti.x-222-556, yT=Ti.y-310; px=N.L(ax,xT,u); py=N.L(ay,yT,u)-120*Math.sin(Math.PI*u); sc=N.L(.7,1,u); rot=N.L(rot,0,u)+20*Math.sin(Math.PI*u); }
        if(t>=tPart){ const u=N.sg(t,tPart,tPart+.9); px=Ti.x-778-300*u; py=Ti.y-310-1100*u; sc=1-.4*u; rot=-90*u; op=1-u; }
        if(op>0&&!(t>=tA&&t<tPart)) s+=`<g opacity="${f(op)}" transform="translate(${f(px)} ${f(py)}) rotate(${f(rot)}) scale(${f(sc)}) translate(-950 -1060)">`+N.billet(a,950,1506,1060,{tete:false})+'</g>'; }
      // la pancarte de Tico (4 441 € → 10 000 € → avalée par le lecteur → ressort → 4 441 €)
      const ua=N.ei(N.sg(t,T('revele')+1.1,T('p14'))), sw=t>T('revele')+.45?7*Math.sin((t-T('revele')-.45)*8)*(1-ua):0;
      const asp=`translate(${f(1400*ua)} ${f(-260*ua)}) rotate(${f(sw+25*ua)} ${f(Ti.x)} ${f(Ti.y-310)})`;
      { const avale=N.sg(t,T('p11')+.15,T('p11')+.6), ressort=N.sg(t,T('revele')-.6,T('revele')-.35);
        let v=4441; if(t>tA) v=N.L(4441,10000,N.eo(N.sg(t,tA,tA+.4))); if(t>tPart) v=N.L(10000,4441,N.eo(N.sg(t,tPart,T('revele'))));
        const cache=t>T('p11')+.6&&t<T('revele')-.6;
        if(!cache){ const k=t<T('p11')+.15?1:(t<T('revele')-.6?1-avale:N.eo(ressort));
          if(k>0){ const len=t>=tA&&t<tPart?1000:444, dx=len===1000?-278:0;
            const tr=k<1?`translate(${f(N.L(3610,Ti.x,k))} ${f(N.L(1080,Ti.y-310,k))}) scale(${f(k)}) translate(${f(-Ti.x)} ${f(-(Ti.y-310))})`:'';
            s+=`<g transform="${asp}"><g transform="${tr}">`+N.pancarte(a,Ti,len,{prix:N.prix(v),dx,haut:310})+(len===1000?`<rect x="${f(Ti.x-240)}" y="${f(Ti.y-370)}" width="36" height="120" fill="${N.BL}" opacity=".7" stroke="${N.INK}" stroke-width="3"/>`:'')+'</g></g>'; } } }
      if(t>tA-.05&&t<tA+.6) s+=a.onde(Ti.x-222,Ti.y-310,280,N.sg(t,tA,tA+.5));
      s+=`<g transform="${asp}">`+a.tampon(Ti.x,Ti.y-425,'LE VRAI CHIFFRE',N.sg(t,T('revele'),T('revele')+.25),{taille:34,rot:-5})+'</g>';
      if(ua>0) for(let i=0;i<5;i++) s+=`<path d="M${f(Ti.x+1400*ua-260-i*70)} ${f(Ti.y-420+i*50-260*ua)} h${f(-160*ua)}" stroke="${N.INK}" stroke-width="6" stroke-linecap="round" opacity="${f(.4*Math.min(1,ua*4))}"/>`;
      if(t>T('revele')-.05&&t<T('revele')+.7) s+=a.onde(Ti.x,Ti.y-310,460,N.sg(t,T('revele'),T('revele')+.6));
      return s; },
    sons:[['p8','whoosh',.2],['p8+.6','metal-leger-1',.12],['p8+1.0','tape-leger-1',.15],['p8+1.15','tape-leger-2',.15],['p8+1.9','tape-leger-1',.15],['p8+2.05','tape-leger-2',.15],
          ['p8+2.8','tape-leger-3',.15],['p8+2.95','tape-leger-1',.15],['p8+3.7','tape-leger-2',.15],['p9','whoosh-short',.25],['p9+.5','papier-glisse',.2],['p9+1.05','squish',.3],['p9+1.1','typing',.15],
          ['p10','whoosh-short',.25],['p11+.15','papier-glisse',.25],['p11+.25','typing',.15],['p11+.75','erreur',.22],['p11+.9','metal-leger-1',.2],['p11+1.15','squish',.25],
          ['p11+1.45','pouc-2',.3],['p11+1.6','sparkle',.2],['p11+2.2','tape-leger-1',.15],['p11+2.35','tape-leger-2',.15],
          ['p12+.15','pop',.25],['p12+.43','pop',.25],['p12+.71','pop',.25],['p12+.99','pop',.25],['p13+.2','metal-leger-3',.2],['p13+.7','metal-leger-2',.15],
          ['revele-.6','papier-glisse',.25],['revele-.3','whoosh-short',.25],['revele','tampon',.4],['revele+.03','impact-bass-2',.25],['revele+1.1','riser',.15],['p14-.35','whoosh',.25]],
    actions:[['p8','revele','le train roule, le décor défile, les roues tournent'],['p9','p9+1.5','le bout de billet revient se recoller'],
             ['p11','p11+1.5','la jauge monte, la porte coince Tico'],['p12','mais','les panneaux de pub poussent'],['revele-.6','revele+.6','le billet ressort, le bout s\'envole, le tampon'],
             ['revele+.45','p14','la pancarte tamponnée se balance puis est aspirée vers la droite'],['p11+1.1','p11+1.9','Tico s\'affale dans le fauteuil, la couronne tourne']] },

  { type:'mot', de:'mais', a:'p12_fin', txt:'RARES.', fond:'encre',
    // un mini-train traverse « RARES. » : 4 wagons bondés… et un seul tout petit wagon doré en queue
    dessin:(t,a)=>{ const u=a.sg(t,a.t0+.1,a.t1+.2), x0=a.L(-760,1180,u), y=620, j=3*Math.sin(t*40); let s=`<g transform="translate(${a.f(x0)} ${a.f(y+j)})">`;
      s+=`<rect x="560" y="-90" width="110" height="90" rx="14" fill="${a.CR}" stroke="${a.CR}" stroke-width="4"/><rect x="565" y="-40" width="100" height="14" fill="${a.ACC}"/>`;
      for(let k=0;k<4;k++){ const wx=k*135; s+=`<rect x="${wx}" y="-80" width="120" height="80" rx="6" fill="${a.CR}" opacity=".9"/>`; for(let w=0;w<3;w++) s+=`<rect x="${wx+12+w*36}" y="-66" width="26" height="26" rx="4" fill="#f6e3a8"/>`; }
      s+=`<rect x="-80" y="-56" width="66" height="56" rx="6" fill="#f2c46b"/><path d="M-66 -64 l8 -16 l9 10 l9 -14 l9 14 l9 -10 l8 16 Z" fill="#f2c46b"/>`;
      for(let k=-1;k<6;k++) s+=`<circle cx="${k*135+30}" cy="8" r="13" fill="${a.INK}" stroke="${a.CR}" stroke-width="4"/>`;
      return s+`</g><path d="M0 ${y+22} H1080" stroke="${a.CR}" stroke-width="6" opacity=".6"/>`; } },

  /* ═══════════ SCÈNE 3 · L'AIGUILLAGE : PLUS ou MOINS ? (p14 → fin) ═══════════ */
  { type:'monde', de:'p14', nom:'aiguillage', largeur:4000, taille:.55,
    visuels:['draisine','bifurcation'],
    acteur:[ {at:'p14',x:900,y:1110}, {at:'p14+1.45',x:1300,y:1110,mouvement:'glisse',depuis:'p14+.05'} ],
    cadres:[ N8.C('p14',1650,1150,1130,.56,{zoomFin:.6,coupe:true}),
             N8.C('p14+1.66',1450,1150,1120,1.15),
             N8.C('dis',1880,1150,1150,.71,{zoomFin:.77,coupe:true}) ],
    dessin:(t,a)=>{ const N=N8, T=k=>a.T(k), Ti=a.acteur(t); let s=''; if(t<T('p14')-.02) return '';
      const t1=T('p14')+1.75; const flips=[t1,t1+.3,t1+.6];
      let etat=1; for(const x of flips) if(t>x) etat=-etat;            // +1 = PLUS, -1 = MOINS
      const osc=t>T('dis')?Math.sin((t-T('dis'))*5.5):etat; const ang=t>T('dis')?N.L(-34,6,(osc+1)/2):(etat>0?-34:6);
      // ciel : nuages qui passent
      for(let i=0;i<5;i++){ const x=-200+i*700+((t*40)%700), y=180+((i*137)%220); s+=`<path d="M${f(x)} ${y} q30 -70 100 -50 q40 -60 110 -10 q70 -10 70 60 Z" fill="${N.PAP}" stroke="${N.INK}" stroke-width="6" stroke-linejoin="round"/>`; }
      // sol et avant-plan
      s+=`<rect x="-1200" y="1300" width="5600" height="1100" fill="#d6c8af"/>`;
      for(let x=-1200;x<4400;x+=260){ s+=`<rect x="${x}" y="1340" width="22" height="160" fill="#bba98c" stroke="${N.INK}" stroke-width="5"/><path d="M${x+40} 1500 l40 -70 l18 70 l30 -50 l14 50 Z" fill="#b9c79e" stroke="${N.INK}" stroke-width="4"/>`; }
      s+=`<path d="M-1200 1380 H4400 M-1200 1440 H4400" stroke="${N.INK}" stroke-width="5" opacity=".7"/><rect x="-1200" y="1510" width="5600" height="14" fill="${N.INK}"/>`;
      for(let r=0;r<6;r++) for(let x=-1200+(r%2)*115;x<4400;x+=230) s+=`<rect x="${x+6}" y="${1532+r*66}" width="218" height="56" rx="6" fill="#e8dfd0" stroke="#c9bca5" stroke-width="4"/>`;
      // talus + voie principale (y 1150) et les deux branches : PLUS monte, MOINS descend
      s+=`<path d="M-1200 1300 L-1200 1150 L1500 1150 L2300 600 L4400 600 L4400 1300 Z" fill="#e3d6c0" stroke="${N.INK}" stroke-width="6"/>`;
      for(let x=-1160;x<1500;x+=90) s+=`<rect x="${x}" y="1150" width="52" height="16" rx="3" fill="#8c7a64"/>`;
      s+=`<path d="M-1200 1146 H1500 L2300 596 H4400" fill="none" stroke="${N.INK}" stroke-width="12"/>`;
      s+=`<path d="M1500 1146 L2300 1286 H4400" fill="none" stroke="${N.INK}" stroke-width="12"/>`;
      // l'aiguille (claque PLUS / MOINS)
      s+=`<g transform="translate(1500 1146) rotate(${f(ang)})"><rect x="0" y="-10" width="300" height="20" rx="6" fill="${N.ACC}" stroke="${N.INK}" stroke-width="5"/></g>`;
      // panneaux qui s'allument
      const onP=(t>T('dis')?osc>0:etat>0), blink=t>T('dis')?(Math.floor(t*3.3)%2===0):true;
      s+=a.boite(2240,600,24,220,{couleur:'#cbbfa9',prof:8,trait:4})+a.etiquette(2252,420,'PLUS',{taille:100,fond:onP&&blink?'acc':undefined,rot:-4,p:1+.06*(onP?1:0)})+a.icone('trending-up',2410,330,90,{couleur:onP?N.ACC:N.INK,ep:7});
      s+=a.boite(2240,1277,24,200,{couleur:'#cbbfa9',prof:8,trait:4})+a.etiquette(2252,1030,'MOINS',{taille:100,fond:!onP&&blink?'acc':undefined,rot:3,p:1+.06*(onP?0:1)})+a.icone('trending-down',2440,1140,90,{couleur:!onP?N.ACC:N.INK,ep:7});
      // le portique : le vrai chiffre suspendu au-dessus de la bifurcation (il se balance)
      { const r=2.5*Math.sin(t*2.4); s+=a.boite(1230,1150,30,640,{couleur:N.INK,prof:10,trait:4})+a.boite(1740,1150,30,640,{couleur:N.INK,prof:10,trait:4})+a.boite(1220,510,560,30,{couleur:N.INK,prof:10,trait:4});
        s+=a.txt(1500,470,26,'SM','#6b645a','SOURCE : INSEE 2025 · PRIVÉ · NET',{ls:2})+`<g transform="rotate(${f(r)} 1500 525)">`;
        const ub=N.eo(N.sg(t,T('p14')-.05,T('p14')+.4)), lb=a.ressort(t,T('p14')+.4,.5), bx=N.L(-1500,0,ub), by=N.L(-420,0,ub)-(ub<1?140*Math.sin(Math.PI*ub):0)+(ub>=1?-26*(1-lb):0);
        if(ub>=1) s+=`<path d="M1340 525 V${f(590-30*(1-lb))} M1660 525 V${f(590-30*(1-lb))}" stroke="${N.INK}" stroke-width="5"/>`;
        s+=`<g transform="translate(${f(bx)} ${f(by)}) rotate(${f(25*(1-ub))} 1500 640)">`+N.billet(a,1278,1722,640,{prix:'4 441 €',tete:true})+a.tampon(1500,748,'LE VRAI CHIFFRE',1,{taille:26,rot:-4})+'</g></g>';
        if(t>T('p14')+.38&&t<T('p14')+1) s+=a.onde(1500,640,300,N.sg(t,T('p14')+.4,T('p14')+.9)); }
      // le levier
      { const lv=t>t1-.1?(etat>0?-35:35):-35; s+=a.boite(1400,1150,60,40,{couleur:N.INK,prof:10,trait:4})+`<path d="M1430 1115 l${f(110*Math.sin(lv*Math.PI/180))} ${f(-110*Math.cos(lv*Math.PI/180))}" stroke="${N.INK}" stroke-width="12" stroke-linecap="round"/><circle cx="${f(1430+110*Math.sin(lv*Math.PI/180))}" cy="${f(1115-110*Math.cos(lv*Math.PI/180))}" r="16" fill="${N.ACC}" stroke="${N.INK}" stroke-width="5"/>`; }
      // la draisine sous Tico (le balancier pompe)
      { const x=Ti.x, pm=t<T('p14')+1.45?Math.sin(t*14)*22:Math.sin(t*3)*4;
        s+=a.boite(x-130,1132,260,28,{couleur:'#8c7a64',prof:14,trait:5})+N.roues(a,x-130,260,1102,-t*400)+`<path d="M${x+60} 1105 V1000" stroke="${N.INK}" stroke-width="10"/><g transform="translate(${x+60} 1000) rotate(${f(pm)})"><path d="M-80 0 H80" stroke="${N.INK}" stroke-width="12" stroke-linecap="round"/></g>`; }
      if(t>t1&&t<t1+1.3) for(const x of flips) if(t>x&&t<x+.4) s+=a.onde(1500,1146,160,N.sg(t,x,x+.35));
      return s; },
    sons:[['p14+.4','pouc-2',.3],['p14+.42','papier-glisse',.2],['p14','tape-leger-1',.18],['p14+.3','tape-leger-2',.18],['p14+.6','tape-leger-3',.18],['p14+.9','tape-leger-1',.18],['p14+1.2','tape-leger-2',.18],
          ['p14+1.75','clic-1',.3],['p14+1.77','metal-leger-1',.25],['p14+2.05','clic-2',.3],['p14+2.07','metal-leger-2',.25],['p14+2.35','clic-3',.3],['p14+2.37','metal-leger-3',.25],
          ['dis+.3','click-soft',.2],['dis+.9','click-soft',.2],['dis+1.5','click-soft',.2],['dis+2.1','click-soft',.2]],
    actions:[['p14','p14+1.5','la draisine roule'],['p14-.05','p14+.9','le billet tamponné arrive et tombe sur le portique'],['p14+1.6','dis','le levier, l\'aiguille claque PLUS / MOINS'],['dis','end','l\'aiguille hésite, les feux clignotent']] },
  ],
};
