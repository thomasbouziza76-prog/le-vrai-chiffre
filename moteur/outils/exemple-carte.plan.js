/* EXEMPLE · bibliothèque optionnelle (moteur/outils/README.md) : carte animée + frise + courbes.
   Ce n'est pas une vidéo à publier : c'est la syntaxe. Test sans voix :
     bash moteur/nouveau.sh /tmp/ex && cp moteur/outils/exemple-carte.plan.js /tmp/ex/plan.js
     python3 moteur/timing.py /tmp/ex --simuler && python3 moteur/planche.py /tmp/ex 1
   Scène 1 : Europe → France → Rouen (zoom pays → région → ville), trajet Paris → Rouen.
   Scène 2 : frise chronologique (dates gravées, curseur, tampon qui claque). */
const PLAN={
  format:'court',
  source:'CARTE : NATURAL EARTH (DOMAINE PUBLIC)',
  persos:{ gauche:{nom:'Tico'} },
  phrases:[
    "Regarde cette carte de l'Europe.",                       // p1
    "On descend sur la France.",                              // p2
    "Puis sur la Normandie, jusqu'à Rouen.",                  // p3
    "Le trajet depuis Paris se trace tout seul.",             // p4
    "Et la frise grave les dates une par une.",               // p5
    "Avec un tampon qui claque à la fin.",                    // p6
    "Dis-le en commentaire.",                                 // p7
  ],
  ancres:{ dis:{mot:'Dis-le',phrase:'p7'} },
  question:'dis',
  cartons:[
    {de:'debut', l1:'Une carte', l2:'qui zoome.', mot:'zoome.'},
    {de:'p4', l1:'Un trajet', l2:'qui se trace.', mot:'trace.'},
    {de:'p5', l1:'Une frise', l2:'qui se grave.', mot:'grave.'},
    {de:'dis', l1:'Dis-le', l2:'en commentaire.', mot:'commentaire.'},
  ],
  humeurs:[ ['p1','gauche','content'],['p3','gauche','surpris'],['p5','gauche','pense'],['p6','gauche','fier'] ],
  scenes:[
    { type:'monde', de:'p1', a:'p5', nom:'carte-exemple', visuels:['carte','trajet'],
      acteur:[ {at:'p1', x:930, y:1300} ],
      cadres:[ {at:'p1', cible:[540,800], zoom:.9, zoomFin:.95}, {at:'p3', cible:[540,780], zoom:1.0, coupe:true}, {at:'p4', cible:[540,800], zoom:.92} ],
      dessin:(t,a)=>a.carte(t,{ carte:'france', x:20, y:250, w:1040, h:1050, style:'papier', rayon:24,
          vues:[ {at:0, centre:'FRA', largeur:3600},                         // l'Europe
                 {at:'p2', centre:'FRA'},                                     // la France, cadrée toute seule
                 {at:'p3', centre:'Rouen', largeur:420, duree:1.1},           // la Normandie / Rouen
                 {at:'p4', centre:[1.7,49.1], largeur:330} ],                 // Paris et Rouen dans le cadre
          pays:[ {code:'FRA', at:'p2+.2', trace:true, remplir:.25} ],
          etiquettes:[ {txt:'FRANCE', lieu:[2.6,46.2], at:'p2+.5', fin:'p3', taille:64, trait:true} ],
          villes:[ {nom:'Rouen', at:'p3+.6', accent:true, trait:true}, {nom:'Paris', at:'p4', taille:36}, {nom:'Le Havre', at:'p3+1', taille:30} ],
          trajets:[ {points:['Paris','Rouen'], de:'p4+.3', a:'p4_fin'} ] }),
      actions:[['p1','p2+1','carte : zoom'],['p2','p3','contour'],['p3','p4','zoom ville'],['p4','p5','trajet']],
      sons:[['p2+.2','whoosh-short',.2],['p3+.6','pop',.25],['p4+.3','whoosh',.18]] },
    { type:'monde', de:'p5', nom:'frise-exemple', visuels:['frise','tampon'],
      acteur:[ {at:'p5', x:960, y:1300} ],
      cadres:[ {at:'p5', cible:[540,800], zoom:.95, zoomFin:1.0}, {at:'p6', cible:[560,860], zoom:1.05, coupe:true} ],
      dessin:(t,a)=>{ const y=a.piste(t,[['p5',0],['p5+.6',1,'expo.out']]);
        return a.frise(t,{ x:200, y:340+40*(1-y), longueur:860, sens:'v', style:'papier', ligne:'p5',
          dates:[ {at:'p5+.4', date:'NOV. 2000', txt:'BUREAU LOUÉ'},
                  {at:'p5+.9', date:'FÉV. 2003', txt:'LE CASSE'},
                  {at:'p5+1.4', date:'2005', txt:'CONDAMNÉ'},
                  {at:'p6', date:"AUJOURD'HUI", txt:'JAMAIS RETROUVÉS', tampon:{txt:'CLASSÉ', at:'p6+.9', decal:[600,-330]}} ] }); },
      actions:[['p5','p6','frise'],['p6','p7','tampon']],
      sons:[['p6+.9','tampon',.35]] },
  ],
};
