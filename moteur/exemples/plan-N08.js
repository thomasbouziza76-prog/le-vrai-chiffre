/* PLAN DE RÉFÉRENCE — N°08 « Riche ou classe moyenne ? » (validée par Thomas, 01/11/2026).
   Toute la vidéo tient dans ce fichier : le moteur fait la caméra, les cartons, les sous-titres,
   la pastille, les personnages et les bruitages. Voir moteur/PLAN.md pour chaque champ. */
const PLAN={
  format:'court',                       // 'court' (30-45 s, matin) ou 'histoire' (62-75 s, soir)
  source:'SOURCE : INSEE 2024 · SALARIÉS DU PRIVÉ · NET',
  persos:{ gauche:{nom:'Tico'}, droite:{nom:'Yanis',couleur:'#f4e3d7',accessoire:'lunettes'} },

  // 1 phrase = 1 ligne du texte voix, SANS balises ElevenLabs, chiffres en chiffres (« 2 200 € »).
  // Leurs débuts deviennent les ancres p1, p2, p3…
  phrases:[
    "Tico gagne 2 200 € par mois.",                                            // p1
    "Son pote Yanis… 4 400.",                                                   // p2
    "Tico se dit : « Yanis, il est riche. »",                                   // p3
    "Yanis, lui, se dit : « Moi ? Je suis classe moyenne. »",                   // p4
    "Et là… les deux ont tort.",                                                // p5
    "Range tous les salariés du privé, du plus petit salaire au plus gros.",    // p6
    "Tico est pile au milieu. La moitié gagne moins que lui.",                  // p7
    "Et Yanis ? Il est dans les 10 % les mieux payés.",                         // p8
    "Abonne-toi : chaque jour, un chiffre qui change ta façon de voir ton salaire.", // p9
    "Le pire ? Yanis n'en sait rien.",                                          // p10
    "Parce qu'autour de lui, tout le monde gagne pareil.",                      // p11
    "On se compare à nos potes… Jamais à la France entière.",                   // p12
    "Alors, 4 400 € par mois… C'est riche, ou classe moyenne ? Dis-le en commentaire.", // p13
  ],
  // ancres supplémentaires sur un mot précis (dans une phrase donnée)
  ancres:{ pop:{mot:'Jamais',phrase:'p12'}, riche:{mot:'riche',phrase:'p13'}, ou:{mot:'ou',phrase:'p13'}, classe:{mot:'classe',phrase:'p13'}, dis:{mot:'Dis-le',phrase:'p13'} },
  musique:{nom:'tension-cyber-anxiety', drop:'p6', coupe:['p5']},   // le temps fort tombe sur « Range tous les salariés… », silence juste avant « Et là… »
  abonne:'p9',          // la pastille « + Abonne-toi » pendant cette phrase (pas de carton à ce moment-là)
  question:'dis',       // Tico sourit à partir de là (appel final)

  // cartons (haut de l'écran) : 2 lignes courtes, 1 mot-clé encadré. Fin auto = carton suivant − 0,4 s.
  cartons:[
    {de:'debut',a:'p3-.4',l1:'Riche, ou',l2:'classe moyenne ?',mot:'Riche,'},
    {de:'p5',l1:'Et là… les deux',l2:'ont tort.',mot:'tort.'},
    {de:'p6',l1:'Tous les salariés,',l2:'du plus petit au plus gros.',mot:'gros.'},
    {de:'p7',l1:'La moitié gagne',l2:'moins que Tico.',mot:'moitié'},
    {de:'p8',a:'p9-.4',l1:'Yanis : dans les',l2:'10 % les mieux payés.',mot:'10 %'},
    {de:'p10',l1:'Le pire ?',l2:'Il n\'en sait rien.',mot:'rien.'},
    {de:'p11',l1:'Autour de lui,',l2:'tout le monde gagne pareil.',mot:'pareil.'},
    {de:'p12',a:'p13-.45',l1:'On se compare',l2:'à nos potes.',mot:'potes.'},
    {de:'dis',l1:'Dis-le',l2:'en commentaire.',mot:'commentaire.'},
  ],
  // expressions des personnages : [ancre, qui, humeur] (content, salut, surpris, inquiet, choque, fier, pense, hausse, triste, rit, montre, saute)
  humeurs:[ ['p1','gauche','salut'],['p2','gauche','surpris'],['p3','gauche','pense'],['p4','gauche','pense'],['p5','gauche','inquiet'],
            ['p6','gauche','choque'],['p7','gauche','saute'],['p8','gauche','content'],
            ['p4','droite','hausse'],['p5','droite','surpris'],['p8','droite','surpris'],['p11','droite','fier'],['pop','droite','choque'] ],

  scenes:[
    { type:'duel', de:'p1',
      gauche:{valeur:2200, label:'SALAIRE DE TICO · NET'},
      droite:{valeur:4400, label:'SALAIRE DE YANIS · NET', at:'p2'},
      barres:'p3',                                            // les chiffres deviennent des barres
      etiquettes:[{at:'p3+1',txt:'RICHE ?'},{at:'p4+.2',txt:'CLASSE MOYENNE ?'}],
      bulles:[{at:'p3+.2',qui:'gauche',txt:'« Yanis, il est riche. »'},{at:'p4+.1',qui:'droite',txt:'« Moi ? Classe moyenne. »'}],
      tampon:{at:'p5',txt:'FAUX'} },
    { type:'vague', de:'p6', a:'p13', valeurs:'salaires-prive-2024',
      persos:{gauche:{i:50}, droite:{i:90,valeur:4400}},     // les barres des deux personnages
      reperes:[
        {type:'zone', at:'p7', zone:[0,50], txt:'LA MOITIÉ', sous:'GAGNENT MOINS'},
        {type:'seuil', at:'p8', zone:[90,100], valeur:4334, tampon:'TOP 10 %'},
        {type:'bulle', at:'p10', zone:[84,95], eclate:'pop'},
      ] },
    { type:'choix', de:'p13', chiffre:'4 400 €', sur:'PAR MOIS, NET', ou:'ou',
      options:[{txt:'RICHE',at:'riche'},{txt:'CLASSE<br>MOYENNE',at:'classe'}] },
  ],
};
