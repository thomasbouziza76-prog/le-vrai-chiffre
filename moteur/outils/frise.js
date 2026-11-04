/* ════════════════════════════════════════════════════════════════════════════
   BIBLIOTHÈQUE OPTIONNELLE · FRISE CHRONOLOGIQUE (dates gravées au burin, curseur, tampons qui claquent)
   Reprise du pilote Non Classée NC-001 (frise.py, skia + timeline GSAP) et réécrite en SVG pour le moteur.
   Dans un plan :
     s += a.frise(t,{x:150,y:380,longueur:820,sens:'v',style:'papier', ligne:'p8',
            dates:[{at:'p8+.3',date:'NOV. 2000',txt:'BUREAU LOUÉ'},
                   {at:'p9',date:'2003',txt:'LE CASSE',tampon:{txt:'10 ANS',at:'p10'}}] });
   Courbes : 'expo.inOut' (la ligne), 'grave' (les dates), 'back.out' (les points), 'frappe' (les tampons), 'power3.inOut' (le curseur).
   ════════════════════════════════════════════════════════════════════════════ */
(function(){
const B=window.BIBLI=window.BIBLI||{};
const cl=(u,a=0,b=1)=>Math.max(a,Math.min(b,u)), L=(a,b,u)=>a+(b-a)*u, r1=n=>Math.round(n*100)/100;
const ease=n=>B.ease?B.ease(n):(u=>u), tps=x=>B.tps?B.tps(x):x;
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
B._n=B._n||0;
const ST={ papier:{ligne:'#1c1a17',texte:'#1c1a17',sous:'#6b645a',accent:'#c4552d',fond:'#fbf8f2',police:'IS',sousPolice:'SM'},
           nuit:{ligne:'#8fa49e',texte:'#d6d8d4',sous:'#8fa49e',accent:'#d23c2c',fond:'#080d0f',police:'SM',sousPolice:'SM'} };
B.STYLES_FRISE=ST;
let CTX=null; const lt=(s,size,font)=>{ if(!CTX) CTX=document.createElement('canvas').getContext('2d'); CTX.font=`700 ${size}px ${font}`; return CTX.measureText(String(s)).width; };

// un tampon qui claque (courbe « frappe » : chute, écrasement, rebond), double cadre, légèrement de travers
B.tamponFrappe=function(x,y,lignes,p,o={}){ if(p<=.001) return ''; lignes=[].concat(lignes); const size=o.taille||54, col=o.couleur||ST[o.style||'papier'].accent;
  const W=Math.max(...lignes.map(s=>lt(s,size,'SM')+size*.08*String(s).length))+size*.8, H=lignes.length*size*.98+size*.5, sc=1.9-.9*p, al=Math.min(1,p*2.5);
  let r=`<g transform="translate(${r1(x)} ${r1(y)}) rotate(${o.rot??-8}) scale(${r1(sc)})" opacity="${r1(al*(o.op??1))}">`+
    `<rect x="${r1(-W/2)}" y="${r1(-H/2)}" width="${r1(W)}" height="${r1(H)}" rx="${r1(size*.08)}" fill="none" stroke="${col}" stroke-width="${r1(size*.09)}"/>`+
    `<rect x="${r1(-W/2+size*.14)}" y="${r1(-H/2+size*.14)}" width="${r1(W-size*.28)}" height="${r1(H-size*.28)}" rx="${r1(size*.05)}" fill="none" stroke="${col}" stroke-width="${r1(size*.03)}"/>`;
  lignes.forEach((s,i)=>{ r+=`<text data-t="1" x="0" y="${r1(-H/2+size*.25+size*.8+i*size*.98)}" text-anchor="middle" font-family="SM" font-weight="700" font-size="${size}" letter-spacing="${r1(size*.08)}" fill="${col}">${esc(s)}</text>`; });
  return r+'</g>'; };

B.frise=function(t,o){
  o=Object.assign({x:150,y:380,longueur:820,sens:'v',style:'papier',taille:58},o);
  const S=Object.assign({},ST[o.style]||ST.papier,o.couleurs||{}), D=o.dates||[], n=D.length; if(!n) return '';
  const tl=tps(o.ligne??(tps(D[0].at)-.5)), fin=o.fin!==undefined?tps(o.fin):Infinity;
  const ouvre=ease('expo.inOut')(cl((t-tl)/(o.duree??.6))), op=cl((fin-t)/.4)*(o.op??1); if(ouvre<=0||op<=0) return '';
  const V=o.sens!=='h', pos=i=>{ const k=D[i].pos??(n===1?0:i/(n-1)), d=o.marge??60; return d+k*(o.longueur-2*d); };
  const P=i=>V?[o.x,o.y+pos(i)]:[o.x+pos(i),o.y];
  let r=`<g opacity="${r1(op)}">`;
  // la ligne qui se lève
  const e=[V?o.x:o.x+o.longueur*ouvre, V?o.y+o.longueur*ouvre:o.y];
  r+=`<path d="M${o.x} ${o.y} L${r1(e[0])} ${r1(e[1])}" stroke="${S.ligne}" stroke-width="${o.ep||6}" stroke-linecap="round"/>`;
  // graduations fines
  for(let k=0;k<=20;k++){ const f=k/20; if(f>ouvre) break; const q=V?[o.x,o.y+o.longueur*f]:[o.x+o.longueur*f,o.y], g=k%5?10:18;
    r+=`<path d="M${r1(q[0]-(V?g:0))} ${r1(q[1]-(V?0:g))} L${r1(q[0]+(V?g:0))} ${r1(q[1]+(V?0:g))}" stroke="${S.ligne}" stroke-width="2" opacity=".5"/>`; }
  // curseur : glisse jusqu'à la dernière date apparue
  let cur=-1; D.forEach((d,i)=>{ if(t>=tps(d.at)) cur=i; });
  if(o.curseur!==false&&cur>=0){ let c=pos(0); for(let i=1;i<=cur;i++){ const t0=tps(D[i].at)-.15; c=L(c,pos(i),ease('power3.inOut')(cl((t-t0)/.5))); }
    const q=V?[o.x,o.y+c]:[o.x+c,o.y];
    r+=V?`<path d="M${r1(q[0]-34)} ${r1(q[1]-16)} L${r1(q[0]-12)} ${r1(q[1])} L${r1(q[0]-34)} ${r1(q[1]+16)} Z" fill="${S.accent}"/>`
        :`<path d="M${r1(q[0]-16)} ${r1(q[1]-34)} L${r1(q[0])} ${r1(q[1]-12)} L${r1(q[0]+16)} ${r1(q[1]-34)} Z" fill="${S.accent}"/>`; }
  D.forEach((d,i)=>{ const t0=tps(d.at); if(t<t0) return; const q=P(i), u=ease('back.out(2.2)')(cl((t-t0)/.35)), g=ease('grave')(cl((t-t0-.08)/(d.duree??.5)));
    r+=`<circle cx="${r1(q[0])}" cy="${r1(q[1])}" r="${r1(16*u)}" fill="${i===cur?S.accent:S.fond}" stroke="${S.ligne}" stroke-width="5"/>`;
    const ts=d.taille||o.taille, sz=Math.round(ts*.62);
    if(V){ r+=B.grave(q[0]+50,q[1]+ts*.12,d.date,g,{taille:ts,style:o.style,police:S.police,couleur:i===cur?S.accent:S.texte});
           if(d.txt) r+=B.grave(q[0]+52,q[1]+ts*.12+sz*1.25,d.txt,ease('grave')(cl((t-t0-.3)/.5)),{taille:sz,style:o.style,police:S.sousPolice,couleur:S.sous,espace:sz*.08}); }
    else { r+=B.grave(q[0],q[1]-40,d.date,g,{taille:ts,style:o.style,police:S.police,align:'c',couleur:i===cur?S.accent:S.texte});
           if(d.txt) r+=B.grave(q[0],q[1]+40+sz,d.txt,ease('grave')(cl((t-t0-.3)/.5)),{taille:sz,style:o.style,police:S.sousPolice,align:'c',couleur:S.sous,espace:sz*.08}); }
    if(d.tampon){ const tp=typeof d.tampon==='string'?{txt:d.tampon}:d.tampon, ta=tps(tp.at??(t0+.6));
      if(t>=ta){ const dx=tp.decal?.[0]??(V?600:0), dy=tp.decal?.[1]??(V?-20:170);   // decal:[dx,dy] pour le déplacer
        r+=B.tamponFrappe(q[0]+dx,q[1]+dy,tp.txt.split('\n'),ease('frappe')(cl((t-ta)/(tp.duree??.18))),{taille:tp.taille||52,style:o.style,rot:tp.rot}); } } });
  return r+'</g>';
};
// les temps où il se passe quelque chose (à déclarer dans « actions » / « sons » de la scène)
B.friseMoments=function(o){ const m=[]; (o.dates||[]).forEach(d=>{ m.push(tps(d.at)); if(d.tampon) m.push(tps((typeof d.tampon==='object'&&d.tampon.at)||(tps(d.at)+.6))); }); return m; };
})();
