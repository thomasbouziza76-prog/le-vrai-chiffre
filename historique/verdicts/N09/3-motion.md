VERDICT : À CORRIGER
NOTE : 6,5/10 · MOTION DESIGN OU VIDÉO ANIMÉE : motion design. Les objets agissent, la caméra les suit, le monde est neuf et la boucle sur le géant marche. Mais plusieurs gestes clés ne se lisent pas : OUI, NON, le chrono, le partage. Corrections estimées sur le code, sans nouveau rendu : à revérifier sur la planche.

BLOQUANTS :

1. n° 9 et 5 — à t = 15,06 s (« Le patron dit oui ») — le tampon OUI, terracotta, frappe exactement sur l'étiquette « + 100 € ? », terracotta elle aussi : on lit une bouillie, et le oui, payoff de la scène, disparaît.
   Correction, plan.js ligne 207 : multiplier `pd` par `(1-N.cl((t-T('oui')+.1)/.08))` pour que l'étiquette parte juste avant la frappe. Le tampon reste ligne 209, sur le mur clair.

2. n° 2 et 9 — à t = 20,4 s, puis vers 22,9 s — le compteur recule. La chaîne affiche environ 2 800 €, la spirale repart à 100 € (600 € à 20,5 s), monte à 12 000 € à 22,44 s, puis la chaîne reprend à environ 8 700 €. Le chiffre censé grossir repart en arrière, deux fois.
   Correction, ligne 224 : remplacer `N.L(100,12000,u0)` par `N.L(100,12000,Math.pow(N.cl((t-tPush)/(tCh-tPush)),1.6))`, la même progression que le front de la ligne 211. Le compteur devient continu d'un plan à l'autre.

3. n° 9 et 6 — à t = 51,3 s (« …dit non ? ») — le tampon NON, terracotta, se pose sur la tête du tampon, terracotta aussi, qui reste dessus jusqu'à environ 51,8 s : le mot est illisible au moment où il est dit. Tico, en `choque`, est coupé en deux par le bord droit (planches 50,5 et 51,5 s).
   Corrections :
   - ligne 333 : tête `couleur:N.ACC` → `couleur:N.INK` ;
   - ligne 332 : `ret=N.cl((t-tH-.2)/.5)` → `ret=N.cl((t-tH-.02)/.25)` ;
   - ligne 310 : acteur à p19 `x:1260` → `x:1130`.

4. n° 5 et 1 — à t = 54,1 → 55 s (« Un non, ça dure dix… ») — le chrono démarre à x = 1100 et passe derrière Tico : à 54,5 s il est caché (seul un petit bout dépasse) et on voit un mur vide, à plus de 40 %. À 55,5 s il reste trop petit pour remplir le plan.
   Correction, ligne 338 : `N.L(1100,2030,u)` → `N.L(1500,2030,u)`, icône `230` → `420`, `a.G-140` → `a.G-230`.

5. n° 5 — à t = 62 → 63,8 s — l'étiquette « UNE PHRASE » est à la même hauteur que les textes des dominos : on lit « ATTENDR », et « DEMANDER » est touché. Le code ne contrôle que les cartons, donc il n'a rien vu.
   Corrections :
   - ligne 375 : « 12 000 € » `a.G-610` → `a.G-760`, « UNE PHRASE » `a.G-440` → `a.G-625` ;
   - ligne 360 : `D.C('p23+1.2',640,980,860,1.0,…)` → zoom `.9`, pour garder l'étiquette sous le carton.

6. n° 9 et 6 — à t = 65,74 → 68,5 s (« Envoie-la à ton collègue… ») — la caméra quitte Tico et son téléphone à p24+.75 : le geste de partage ne dure que 0,75 s, et l'icône d'envoi ne décolle que 0,35 s avant la coupe. Tico est absent des planches 66,5 à 68,5 s, alors que le partage est la priorité n° 1 (0 partage sur les N°05 et N°08).
   Corrections :
   - ligne 358 : ajouter, avant le téléport, `{at:'p24+2.35',x:2840,y:1300,mouvement:'marche',depuis:'p24'}` : Tico court le long de la chaîne, téléphone en main ;
   - ligne 377 : téléphone `120` → `200` ; `pm=((t-T('p24')-.4)%.7)/.7`, pour que les envois se répètent, avec `pm>0&&t>T('p24')+.4`.

7. n° 3 et 1 bis — à t = 37,2 s, 50,28 s et 61,9 s — trois changements n'ont pas de cause. Les dominos de Tico disparaissent et le tas vient du ciel ; « 120 PRIVATIONS » coupe sur la porte ; la fiche de paie coupe sur les deux dominos. La fiche (58,5 à 61,5 s) est aussi le passage le plus proche d'une caméra sur un objet fixe.
   Corrections :
   - 37,2 s, après la ligne 273 : `if(t>T('p13_fin')-.1) s+=N.pluie(a,t,T('p13_fin')-.1,RK(8)+80,1,30,1.3);` : le dernier domino éclate en pièces qui filent vers les tas ;
   - 50,28 s, après la ligne 298 : à partir de `p19-.3`, le domino « + 100 € » tombe du haut du cadre sur le tas de Tico ; coupe sur l'impact à p19. Le domino qui vacille (ligne 329) devient la suite du choc, à faire partir de p19. Ajouter `['p19','ecrase-moyen-1',.3]` aux sons de la scène 3 ;
   - 61,9 s, ligne 343 : ajouter à la rotation `+78*N.ei((t-T('p23')+.35)/.35)` : la fiche bascule comme un domino sur la dernière phrase avant p23. Ajouter le son `['p23-.1','tombe-2',.3]`. Sa chute lance le balancement des deux dominos.

Grille :
- OK : n° 0 (3 règles d'or : aucun cadrage de plus de 3 s, objets qui agissent, monde neuf), 4 (spirale 3D), 7 (hook : le géant en chute, sujet compris sans le son), 8, 10.
- n° 9 bis, non bloquant comme demandé : `moteur/musiques.json` confirme que les morceaux à temps fort sont `bright` ou ceux des N°07 et N°08 (d'après l'historique), et calés sur le choc (23,32 s) ils démarreraient tous après le hook. Rien de faux dans ce choix : le ton sombre colle au problème, et ce sont les coupes et `ecrase-lourd-2` qui portent le choc. La grille reste théoriquement non remplie (pas de `drop`), c'est un écart accepté, pas une conformité.

À AMÉLIORER :
1. Plans `mot` trop courts pour qu'on les savoure. « SAUF QUE. » dure 0,8 s, dont seulement 0,3 s à l'arrêt avant le fondu, alors que `PLAN.md` dit 1 à 2 s et que Thomas aime ces écrans.
   - ligne 233 : `a:'tico'` → `a:'tico+.35'` ;
   - ligne 121 : carton `de:'tico+.25'` → `de:'tico+.6'` ;
   - ligne 305 : `a:'p16_fin+.12'` → `a:'p16_fin+.3'`.
2. À 29,2 → 30,9 s, seuls Tico et son ampoule agissent : c'est le plan le moins motion de la vidéo. Ligne 266 : à p11_fin, l'ampoule tombe, devient la 1re pièce de 100 € et entre dans le pot (960, a.G-200). L'idée devient alors littéralement l'argent mis de côté.

---

## TOUR 2

VERDICT : À CORRIGER
NOTE : 7,5/10 · MOTION DESIGN OU VIDÉO ANIMÉE : motion design. Le tour 1 est levé à 5 bloquants sur 7, et la vidéo tient sa boucle sur le géant. Restent 3 corrections de 1 ligne chacune, dont le partage, priorité n° 1 de Thomas. Vu sur les planches, plus des images intermédiaires rendues depuis le plan (fichiers de travail dans /tmp/critique-motion2/).

ÉTAT DES 7 BLOQUANTS DU TOUR 1 :
- 1 (OUI, 15,5 s) : levé. L'étiquette est partie, le tampon se lit sur le mur.
- 2 (compteur) : levé. 100, 1 100, 3 000, 5 700, puis 12 000 €, sans retour en arrière.
- 3 (NON, 51,3 à 51,5 s) : levé. Tête du tampon noire qui se retire, NON lisible, Tico entier.
- 4 (chrono, 54,3 à 55,5 s) : levé. Le chrono est au centre et ne passe plus derrière Tico.
- 5 (UNE PHRASE, 62,5 à 63,5 s) : levé. ATTENDRE et DEMANDER se lisent en entier.
- 6 (partage, 65,74 à 68,5 s) : NON LEVÉ, voir le bloquant 1 ci-dessous. La correction est dans le code mais ne se voit pas à l'image.
- 7 (transitions) : 50,28 s levé (le domino + 100 € tombe du ciel sur le tas) ; 61,9 s levé (la fiche bascule) ; 37,2 s NON LEVÉ à l'image, voir le bloquant 3 ci-dessous.

BLOQUANTS :

1. n° 9 et 6 — à t = 66,55 → 68,1 s (« Envoie-la à ton collègue… ») — le téléphone et l'icône d'envoi sont dessinés AVANT la chaîne, donc les dominos les recouvrent. Après la coupe de p24+.75, Tico court bien le long de la chaîne, mais les mains vides : de 67,1 à 68,15 s, plus de téléphone ni d'icône. Le geste de partage reste lisible 0,75 s, comme au tour 1.
   Correction, plan.js : déplacer le bloc de la ligne 380 (« Tico, le téléphone ») APRÈS la ligne 383 (`s+=N.chaine(a,t,F,dx,14);`).

2. n° 6 et règle Thomas « personnages qui flottent » (01/11) — NOUVEAU, non relevé au tour 1 — à t = 37,2 → 38,6 s (« Dix ans plus tard, même tas ») — Tico reste immobile en l'air à y = 300, loin au-dessus de son tas, pendant 1,4 s, collé au carton « 12 000 € » à 37,9 et 38,3 s. Il ne tombe qu'à 38,62 s, et il a alors la tête coupée par le haut du cadre, au-dessus du carton, à 38,7 s (planche 38,5 s).
   Correction, ligne 242 : `{at:'p14',x:X_T,y:300,mouvement:'teleport'}` → `y:-900`. Il attend hors champ, puis la chute de la ligne 243 le fait entrer. À revérifier sur la planche.

3. n° 3, 1 bis et 5 — à t = 36,9 → 37,2 s — la chute en pièces de la ligne 274 sort du cadre. Sans cadre prévu entre p13+1.7 et p14, on voit un mur vide avec quelques pièces dans le coin bas gauche, à plus de 40 % de vide, et le domino qui éclate ne se voit pas. La cause demandée au tour 1 existe donc dans le code, mais pas à l'image.
   Correction, entre les lignes 252 et 253 : ajouter `D.C('p13_fin-.05',RK(8)+80,1300,1100,.85,{transition:.15}),`. Valeurs estimées, à revérifier sur la planche.

Grille :
- OK : n° 0, 1, 2, 4, 7, 8, 10 ; n° 6 hors bloquants 1 et 2 ; n° 9 hors bloquant 1.
- n° 9 bis : pas de `drop`, écart déjà accepté, non bloquant.

À AMÉLIORER :
1. À 39,5 s, l'étiquette « 12 000 € » couvre une partie de Sarah et le bras de Tico. Ligne 287 : `a.G-640` → `a.G-800`.
2. À 59,5 s, le sous-titre « de paie. » coupe le mot NET de la fiche. Ligne 325 : `D.C('fiche+.15',3620,820,780,1.1,…)` → `860` à la place de `780`, à vérifier sur la planche.
