/* LE TICKET : le personnage de Le Vrai Chiffre. Un seul dessin pour toutes les vidéos.
   Usage : <script src="../../charte/ticket.js"></script> puis, dans seek(t) :
     svg.innerHTML = Ticket.svg({x:540, y:1500, scale:1, mouth:'smile', armL:[-70,60], ...})
   (x,y) = point AU SOL entre les deux pieds. Toutes les options sont facultatives.
   ── Corps ── scale (1 = 220×340 px), sx / sy (squash & stretch, autour des pieds), rot (degrés),
               fill (couleur du papier), price ('240 €'), lines (true), shadow (true), h (hauteur du corps)
   ── Visage ── look:[dx,dy] (-1..1), blink (0..1), mouth: smile | grin | o | flat | sad | wavy | open,
               brows: none | up | angry | worried, sweat (0..1), cheeks (true/false)
   ── Bras ──  armL / armR : [dx,dy] position de la main depuis l'épaule, bendL / bendR (courbure),
               handL / handR : 'open' | 'fist' | 'point' (doigt)
   ── Jambes ── footL / footR : [dx,dy] position du pied (0,0 = sous la hanche, au sol), leg (longueur 70)
   ── Aide ── Ticket.walk(phase) → {footL, footR, bob, armL, armR} : cycle de marche (phase en radians)
               extra : chaîne SVG ajoutée dans le repère du ticket (accessoires)
   ── Ajouts (librairie d'animations, nov. 2026 ; ne changent rien aux options ci-dessus) ──
               priceSize (46) : taille du montant · lines: n (nombre) : n lignes grises réparties sur la hauteur
               armsFront: true | 'L' | 'R' : bras dessinés DEVANT le corps (bras croisés, main sur la bouche)
               eyes: 'x' (sonné) | 'happy' (^ ^) | 'closed' (traits) · back: true : le DOS du ticket (sans visage),
               avec backLabel ('TOTAL') et le montant en grand (price)                                      */
(function(){
const INK='#1c1a17', PAPER='#fbf8f2', GREY='#d6ccbb', ACC='#c4552d';
const f=n=>Math.round(n*10)/10;
function arm(sx,sy,h,bend,hand,side){
  const ex=sx+h[0], ey=sy+h[1], mx=(sx+ex)/2, my=(sy+ey)/2;
  const dx=ex-sx, dy=ey-sy, L=Math.hypot(dx,dy)||1, nx=-dy/L*side, ny=dx/L*side;
  const cx=mx+nx*bend, cy=my+ny*bend;
  let s=`<path d="M${f(sx)} ${f(sy)} Q${f(cx)} ${f(cy)} ${f(ex)} ${f(ey)}" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`;
  if(hand==='fist') s+=`<circle cx="${f(ex)}" cy="${f(ey)}" r="11" fill="${PAPER}" stroke="${INK}" stroke-width="6"/>`;
  else if(hand==='point'){const a=Math.atan2(ey-cy,ex-cx);s+=`<path d="M${f(ex)} ${f(ey)} l${f(Math.cos(a)*22)} ${f(Math.sin(a)*22)}" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`;}
  else { // main ouverte : 3 petits doigts
    const a=Math.atan2(ey-cy,ex-cx);
    for(const k of[-.6,0,.6]) s+=`<path d="M${f(ex)} ${f(ey)} l${f(Math.cos(a+k)*14)} ${f(Math.sin(a+k)*14)}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`;
  }
  return s;
}
function body(W,top,bot,teeth){ // rectangle + dents de scie en bas
  let d=`M${-W/2} ${top} H${W/2} V${bot}`; const n=teeth, s=W/n;
  for(let i=0;i<n;i++) d+=` L${f(W/2-s*i-s/2)} ${bot+18} L${f(W/2-s*(i+1))} ${bot}`;
  return d+' Z';
}
window.Ticket={
  INK,PAPER,GREY,ACC,
  walk(ph,amp=1){
    const s=Math.sin(ph), c=Math.cos(ph);
    return {footL:[f(s*28*amp),f(-Math.max(0,c)*26*amp)], footR:[f(-s*28*amp),f(-Math.max(0,-c)*26*amp)],
            bob:f(-Math.abs(Math.cos(ph))*10*amp), armL:[-55-s*25*amp,70], armR:[55-s*25*amp,70]};
  },
  svg(o={}){
    const W=220, H=o.h??340, L=o.leg??70, sc=o.scale??1, sx=o.sx??1, sy=o.sy??1;
    const top=-L-H, bot=-L, eyeY=top+H*.22, eyeX=W*.2, r=W*.135;
    const shY=top+H*.42, hipX=W*.2;
    let s=`<g transform="translate(${f(o.x??540)} ${f(o.y??1500)}) rotate(${f(o.rot??0)}) scale(${f(sc*sx)} ${f(sc*sy)})">`;
    if(o.under) s+=o.under;
    // jambes + pieds
    const fl=o.footL??[0,0], fr=o.footR??[0,0];
    s+=`<g fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">`+
       `<path d="M${-hipX} ${bot+8} L${f(-hipX+fl[0])} ${f(fl[1])} h-24"/><path d="M${hipX} ${bot+8} L${f(hipX+fr[0])} ${f(fr[1])} h24"/></g>`;
    // bras derrière le corps
    const aL=o.armL??[-60,70], aR=o.armR??[60,70];
    const af=o.armsFront, fL=af===true||af==='L', fR=af===true||af==='R';
    const AL=arm(-W/2+4,shY,aL,o.bendL??-22,o.handL||'open',-1), AR=arm(W/2-4,shY,aR,o.bendR??22,o.handR||'open',1);
    s+=(fL?'':AL)+(fR?'':AR);
    // corps : ombre décalée + papier
    if(o.shadow!==false) s+=`<path d="${body(W,top,bot,7)}" transform="translate(10 10)" fill="${INK}"/>`;
    s+=`<path d="${body(W,top,bot,7)}" fill="${o.fill||PAPER}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>`;
    if(o.back){ // dos du ticket : pas de visage, montant en grand
      s+=`<text x="0" y="${f(top+H*.3)}" font-family="SM, 'Space Mono', monospace" font-weight="700" font-size="34" letter-spacing="6" text-anchor="middle" fill="${INK}">${o.backLabel??'TOTAL'}</text>`;
      s+=`<path d="M${-W/2+30} ${f(top+H*.38)} H${W/2-30}" stroke="${INK}" stroke-width="5" stroke-dasharray="4 10" stroke-linecap="round"/>`;
      if(o.price) s+=`<text x="0" y="${f(top+H*.62)}" font-family="SM, 'Space Mono', monospace" font-weight="700" font-size="${o.priceSize??64}" text-anchor="middle" fill="${ACC}">${o.price}</text>`;
      s+=`<path d="M${-W/2+30} ${f(top+H*.74)} H${W/2-30}" stroke="${INK}" stroke-width="5" stroke-dasharray="4 10" stroke-linecap="round"/>`;
      s+=(fL?AL:'')+(fR?AR:'');
      if(o.extra) s+=o.extra;
      return s+'</g>';
    }
    if(typeof o.lines==='number'){ const n=o.lines, y0=top+H*.52, y1=bot-(o.price?H*.2:40);
      s+=`<g stroke="${GREY}" stroke-width="9" stroke-linecap="round">`;
      for(let i=0;i<n;i++){const yy=n>1?y0+(y1-y0)*i/(n-1):y0; s+=`<path d="M${-W/2+34} ${f(yy)} H${W/2-(i%3===1?74:34)}"/>`;}
      s+='</g>';
    } else if(o.lines!==false) s+=`<g stroke="${GREY}" stroke-width="9" stroke-linecap="round"><path d="M${-W/2+34} ${f(top+H*.52)} H${W/2-34}"/><path d="M${-W/2+34} ${f(top+H*.61)} H${W/2-74}"/><path d="M${-W/2+34} ${f(top+H*.70)} H${W/2-34}"/></g>`;
    if(o.price) s+=`<text x="0" y="${f(top+H*.9)}" font-family="SM, 'Space Mono', monospace" font-weight="700" font-size="${o.priceSize??46}" text-anchor="middle" fill="${ACC}">${o.price}</text>`;
    // yeux
    const lk=o.look??[0,0], bl=Math.min(1,Math.max(0,o.blink??0));
    if(o.eyes==='x'||o.eyes==='happy'||o.eyes==='closed'){
      for(const sd of[-1,1]){const cx=sd*eyeX, q=r*.62;
        if(o.eyes==='x') s+=`<path d="M${f(cx-q)} ${f(eyeY-q)} L${f(cx+q)} ${f(eyeY+q)} M${f(cx+q)} ${f(eyeY-q)} L${f(cx-q)} ${f(eyeY+q)}" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`;
        else if(o.eyes==='happy') s+=`<path d="M${f(cx-q)} ${f(eyeY+q*.5)} Q${f(cx)} ${f(eyeY-q*1.3)} ${f(cx+q)} ${f(eyeY+q*.5)}" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`;
        else s+=`<path d="M${f(cx-q)} ${f(eyeY+4)} Q${f(cx)} ${f(eyeY+q*.7)} ${f(cx+q)} ${f(eyeY+4)}" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`;}
    } else for(const sd of[-1,1]){
      const cx=sd*eyeX, ry=Math.max(2,r*(1-bl));
      s+=`<ellipse cx="${f(cx)}" cy="${f(eyeY)}" rx="${f(r)}" ry="${f(ry)}" fill="#fff" stroke="${INK}" stroke-width="6"/>`;
      if(bl<.7) s+=`<circle cx="${f(cx+lk[0]*r*.42+3)}" cy="${f(eyeY+lk[1]*r*.42*(1-bl)+3)}" r="${f(r*.42*(1-bl*.6))}" fill="${INK}"/>`;
    }
    // sourcils
    const b=o.brows||'none', by=eyeY-r-14;
    if(b!=='none'){const t={up:[-8,-8],angry:[10,-10],worried:[-12,8]}[b]||[0,0];
      s+=`<g stroke="${INK}" stroke-width="7" stroke-linecap="round"><path d="M${f(-eyeX-22)} ${f(by+t[1])} L${f(-eyeX+22)} ${f(by+t[0])}"/><path d="M${f(eyeX+22)} ${f(by+t[1])} L${f(eyeX-22)} ${f(by+t[0])}"/></g>`;}
    // bouche
    const my=eyeY+r+30, m=o.mouth||'smile';
    const P=`stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"`;
    if(m==='smile') s+=`<path d="M-30 ${f(my)} Q0 ${f(my+26)} 30 ${f(my)}" ${P}/>`;
    else if(m==='sad') s+=`<path d="M-26 ${f(my+16)} Q0 ${f(my-8)} 26 ${f(my+16)}" ${P}/>`;
    else if(m==='flat') s+=`<path d="M-24 ${f(my+6)} H24" ${P}/>`;
    else if(m==='o') s+=`<ellipse cx="0" cy="${f(my+8)}" rx="15" ry="20" fill="${INK}"/>`;
    else if(m==='open') s+=`<path d="M-30 ${f(my)} Q0 ${f(my+50)} 30 ${f(my)} Z" fill="${INK}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`;
    else if(m==='grin') s+=`<path d="M-36 ${f(my-4)} Q0 ${f(my+44)} 36 ${f(my-4)} Z" fill="${INK}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M-26 ${f(my+2)} H26" stroke="#fff" stroke-width="7"/>`;
    else if(m==='wavy') s+=`<path d="M-30 ${f(my+8)} l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8" ${P}/>`;
    if(o.cheeks) s+=`<circle cx="${f(-eyeX-14)}" cy="${f(my-2)}" r="12" fill="${ACC}" opacity=".35"/><circle cx="${f(eyeX+14)}" cy="${f(my-2)}" r="12" fill="${ACC}" opacity=".35"/>`;
    if(o.sweat) s+=`<path d="M${f(W/2-10)} ${f(eyeY-30+o.sweat*40)} q12 18 0 26 q-12 -8 0 -26 Z" fill="#8fb7d8" stroke="${INK}" stroke-width="4" opacity="${f(Math.min(1,o.sweat*3))}"/>`;
    s+=(fL?AL:'')+(fR?AR:'');
    if(o.extra) s+=o.extra;
    return s+'</g>';
  }
};
})();
