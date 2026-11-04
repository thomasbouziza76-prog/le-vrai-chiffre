# Le moteur : tu écris un PLAN, pas une animation

> **Règle n° 1 de la production vidéo.** Tu n'écris plus d'animation HTML à la main.
> Tu écris `plan.js` (environ 40 lignes) et le moteur fabrique la vidéo.
> Le moteur s'occupe déjà, sans que tu puisses les rater :
> - la caméra (un mouvement au moins toutes les 2,6 s, whip pans entre scènes) ;
> - les cartons à fond crème, les sous-titres groupés et la pastille « + Abonne-toi » ;
> - Tico petit (moins de 25 % de l'image) ;
> - les transformations de données ;
> - les bruitages calés sur la voix.
>
> Exemple complet de la technique actuelle : `moteur/mondes/gare-des-salaires.plan.js` (copié dans ton dossier sous le nom `plan-exemple-monde.js`). **Lis-le avant d'écrire un plan** pour la syntaxe des scènes `monde` et `mot` ; n'en recopie pas le monde (règle d'or 3). `moteur/exemples/plan-N08.js` = ancien style avec barres, à ne plus imiter.

## ⚠️ Les 3 règles d'or (Thomas, 01/11) — à relire avant chaque plan
1. **L'image bouge, la caméra suit** : ce sont les objets (et Tico) qui agissent ; la caméra suit l'action.
2. **Un nouveau plan toutes les 1 à 3 s** : un plan = un cadrage + une action. On passe au suivant par l'action ou par une coupe.
3. **Chaque vidéo invente son monde** : utilise la scène **`monde`** (ci-dessous) avec une métaphore propre au sujet. Les scènes toutes faites (`duel`, `vague`, `chiffre`, `courbe`, `parcours`) dessinent des barres ou des courbes : elles sont refusées par le contrôle « monde nouveau » si ces visuels sont dans les 5 dernières vidéos.

## La scène `monde` : la façon normale de faire une vidéo

Tu dessines le monde de CETTE vidéo ; le moteur s'occupe de faire suivre la caméra, de découper en plans, des sons de mouvement, des textes et des contrôles.

```js
{ type:'monde', de:'p1', a:'p14', nom:'immeuble-des-salaires', visuels:['immeuble','ascenseur','étages'],
  // Tico : un point par moment. Il ARRIVE au point à « at » (le mouvement commence juste avant, ou à « depuis »).
  acteur:[ {at:'p1', x:200, y:1300},                                   // y = 1300 : le sol (G)
           {at:'p3', x:700, y:1300, mouvement:'marche'},               // marche | saut | chute | glisse | vol | ascenseur | teleport
           {at:'p5', x:700, y:500,  mouvement:'ascenseur', depuis:'p4'},
           {at:'p6+.5', x:1100, y:900, mouvement:'chute'} ],
  // les PLANS : un cadrage par moment ; la caméra suit sa cible ('acteur' ou [x,y]) ; coupe:true = changement de plan sec
  cadres:[ {at:'p1', cible:'acteur', zoom:1.15},
           {at:'p2', cible:[700,800], zoom:.6, coupe:true},
           {at:'p3', cible:'acteur', zoom:1.0, decal:[120,-150]},
           {at:'p5', cible:'acteur', zoom:1.3, zoomFin:1.0} ],
  // le monde, dessiné en SVG, en coordonnées locales (x de 0 à ~3 000, sol à y = 1300). t = temps ; a = boîte à outils.
  dessin:(t,a)=>{ let s='';
    const p=a.sg(t,a.T('p4'),a.T('p5'));                                  // 0 → 1 pendant la montée
    for(let k=0;k<10;k++) s+=a.boite(560,a.G-k*120,300,120,{couleur:k===9?a.ACC:a.PAP});
    s+=a.piece(900,a.G-40,50,{tour:t});  s+=a.tampon(900,600,'TOP 10 %',a.sg(t,a.T('p7'),a.T('p7+.3')));
    return s; },
  sons:[['p4','riser',.15],['p7','tampon',.35]],          // en plus des sons automatiques (pas, chute, saut, plans)
  actions:[['p4','p5','ascenseur']] }                      // ce qui bouge dans TON dessin (pour le contrôle « l'image agit »)
```

- **`visuels`** : 2 à 5 mots qui décrivent ce qu'on voit (« immeuble », « ascenseur »…). Ils sont comparés aux 5 dernières vidéos : s'ils se répètent, le contrôle refuse. Note-les dans HISTORIQUE.md (« VISUELS : … »).
- **Plans** : prévois un `cadres` toutes les 1 à 3 s. Alterne gros plan (zoom 1.1 à 1.5), plan moyen (0.8 à 1) et plan large (0.4 à 0.6). `zoomFin` fait une poussée ou un recul pendant le plan.
- **L'image agit** : dans `dessin`, fais bouger les objets en fonction de `t` (avec `a.sg`, `a.eo`, `a.ressort`…), et déclare-les dans `actions`. Jamais plus de 1,6 s sans que rien ne bouge.
- **Tico** est dessiné par le moteur à la position de `acteur` (`a.acteur(t)` te la donne, par exemple pour qu'une plateforme le porte). Ses humeurs suivent `humeurs`.
- **Transition par l'action** : fais commencer un plan sur le mouvement du précédent (Tico saute hors du cadre → le plan suivant le cadre en l'air → il atterrit).

### Boîte à outils `a` (dans `dessin`)
| Outil | Ce que ça dessine |
|---|---|
| `a.boite(x,y,w,h,{couleur,prof,op})` | Une boîte en volume (immeuble, étage, caisse, marche, bloc). (x,y) = coin bas-gauche |
| `a.piece(x,y,r,{tour,txt})` | Une pièce qui peut tourner (`tour` : 0 → 1 = un tour) |
| `a.billet(x,y,w,{rot,txt})` | Un billet |
| `a.etiquette(x,y,'texte',{taille,fond:'acc'/'encre',rot,p})` | Une étiquette (p = échelle, pour l'apparition) |
| `a.tampon(x,y,'TEXTE',p)` | Un tampon qui claque (p de 0 à 1) |
| `a.compteur(t,t0,t1,v0,v1,x,y,taille)` | Un nombre qui compte |
| `a.onde(x,y,r,p)` / `a.eclats(x,y,t,t0)` | Onde de choc / éclats qui partent |
| `a.fleche(x1,y1,x2,y2,p)` | Une flèche qui se trace |
| `a.ombre(x,y,largeur)` | Ombre de contact au sol |
| `a.ressort(t,t0)` | 0 → 1 avec rebond (un objet qui se pose) |
| `a.txt(x,y,taille,'IS'/'SM',couleur,'texte',{a:'start'})` | Un texte dans le monde |
| `a.sg(t,t0,t1)`, `a.eo`, `a.eio`, `a.bk`, `a.L`, `a.T('p5+.3')`, `a.G` | Temps et courbes |
| `a.icone('nom',x,y,taille,{couleur})` | Une icône de la bibliothèque (voir `moteur/BIBLIOTHEQUE.md`) |
| Couleurs | `a.INK` (encre), `a.PAP` (papier), `a.ACC` (terracotta), `a.GR` (gris), `a.CR` (crème) |
| `a.carte`, `a.frise`, `a.ease`, `a.tween`, `a.piste`… | **Bibliothèque optionnelle** (cartes animées, frise chronologique, courbes façon GSAP, `timing.py --whisperx`) : voir `moteur/outils/README.md` |

### La scène `mot` : un plan plein écran
`{type:'mot', de:'p5', a:'p5_fin', txt:'MAIS<br>ATTENDS.', fond:'acc'}` : un mot qui claque sur un aplat (1 à 2 s). À utiliser 1 ou 2 fois par vidéo, sur un retournement. Pas de carton pendant ce plan. **Validé par Thomas le 02/11** (« MAIS ATTENDS. » et « RARES. » dans la gare des salaires). Les lettres tombent toutes seules ; ajoute `dessin:(t,a)=>svg` pour un petit geste propre au sujet (ex. un mini-train qui traverse « RARES. »). `fond:'acc'` (terracotta) ou `fond:'encre'` (noir) : alterne les deux. Cale-le sur le mot dit par la voix (pas avant). **Entrée des lettres à changer à chaque vidéo** (`entree:` `'tombe'` · `'monte'` · `'zoom'` · `'glisse'` · `'tourne'` · `'machine'`) : regarde dans `historique/HISTORIQUE.md` celle des 2 dernières vidéos et prends-en une autre ; note-la dans ta ligne d'historique (« mot : entrée zoom »). Thomas, 02/11 : « quand les motion sont nouveaux, c'est bien ».

## Les commandes, dans l'ordre

```bash
bash moteur/nouveau.sh $DOSSIER                 # prépare le dossier (copie le moteur ; plan-exemple-monde.js = l'exemple à lire)
# … écris $DOSSIER/plan.js, puis mets la voix dans $DOSSIER/voix.mp3 …
python3 moteur/timing.py $DOSSIER               # transcrit la voix, cale chaque mot → timing.js (+ ancres p1, p2…)
python3 controles/verifier.py $DOSSIER          # CONTRÔLES BLOQUANTS (environ 10 s). Échec → corrige le plan, relance.
python3 moteur/planche.py $DOSSIER 1            # planche du plan (1 image/s) → $DOSSIER/planche-*.jpg → Critique motion
python3 moteur/rendu.py $DOSSIER                # rendu + mix + encodage → $DOSSIER/video.mp4 (environ 5 min)
python3 controles/verifier.py $DOSSIER --video  # contrôles de la vidéo finale (durée, image, son -14 LUFS)
python3 moteur/planche.py $DOSSIER 1.5 --video  # planche de la vidéo → Juge final
```

- `timing.py` affiche « mots non retrouvés dans la voix ». La liste doit être **vide** (la ponctuation seule ne compte pas).
- Si un mot manque, c'est que le texte de `phrases` ne correspond pas exactement à ce que dit la voix : corrige `phrases`.

## Le fichier `plan.js`

```js
const PLAN={
  format:'court',            // 'court' = matin 30-66 s · 'histoire' = soir 62-75 s
  source:'SOURCE : INSEE 2024 · SALARIÉS DU PRIVÉ · NET',   // affichée pendant les données et sur l'écran final
  persos:{ gauche:{nom:'Tico'}, droite:{nom:'Karim',couleur:'#f4e3d7',accessoire:'cravate'} },
  phrases:[ … ],             // le texte voix, phrase par phrase (voir ci-dessous)
  ancres:{ … },              // repères sur un mot précis
  musique:{nom:'tension-cyber-anxiety', drop:'p6', coupe:['p5'], silences:[['p1_fin','p3'],['p9','p10']]},  // voir « musique » plus bas
  abonne:'p6',               // la phrase « Abonne-toi… »
  question:'dis',            // l'ancre de l'appel final
  cartons:[ … ], humeurs:[ … ], scenes:[ … ],
};
```

### `phrases` : le texte voix, une phrase par ligne
- C'est **exactement** le texte envoyé à ElevenLabs, mais **sans les balises** (`[curious]`…) et **avec les chiffres en chiffres** (« 2 200 € », « 10 % »). Dans le texte envoyé à ElevenLabs, les chiffres restent en lettres.
- Le début de chaque phrase devient une **ancre** : `p1`, `p2`, `p3`… Sa fin devient `p3_fin`.
- Une phrase dure entre 1,5 et 5 s, jamais plus de 6 s (contrôle). Ce sont tes changements de rythme.

### Les ancres : tous les temps s'écrivent en ancres, jamais en secondes
- `'p3'` : début de la phrase 3. `'p3+.5'` : 0,5 s après. `'p3-.4'` : 0,4 s avant. `'p3_fin'` : fin de la phrase 3.
- `ancres:{ pop:{mot:'Jamais',phrase:'p12'} }` crée l'ancre `pop` sur le mot « Jamais » de la phrase 12. Ajoute `n:2` pour viser la 2e occurrence.
- `'debut'` (uniquement pour le 1er carton) : affiché dès la première image. C'est le hook.

### `musique` : la musique de fond au bon moment (obligatoire)
```js
musique:{nom:'tension-cyber-anxiety', drop:'p6', coupe:['p5']},
```
- `nom` : un morceau de `moteur/musiques.json` (CC0, téléchargé tout seul au rendu). Prends un **ton différent des 2 vidéos précédentes** (HISTORIQUE.md).
- `drop` : l'ancre où doit tomber le **temps fort** du morceau (colonne « Temps fort ») : le **chiffre choc** ou la révélation. Le moteur décale le morceau pour que ça tombe pile. Pour un morceau « none (bass at X s) », le `drop` vise l'entrée de la basse ; pour un morceau « none » sans basse, ne mets pas de `drop`.
- `coupe` : les ancres où la musique **se tait 0,5 s juste avant**, pour un silence dramatique avant une révélation (« Et là… »). Une ou deux au maximum.
- **`silences` (OBLIGATOIRE depuis le 03/11, Thomas : « au début tu mettais une musique, après tu l'arrêtais, et ça c'était bien ; dans la dernière vidéo elle était tout le temps ») : la musique ne joue PAS en continu.** Liste de paires d'ancres `[début, fin]` où elle se coupe net puis repart : `silences:[['p1_fin','p3'],['p6','p8'],['p13','p14_fin']]`. Au moins 2 silences de 1,5 à 4 s par vidéo : sur la vanne d'ouverture (la musique part juste après « Normal. »), sur le chiffre choc, et sur la chute ; la musique revient pour l'énergie (les étapes, l'appel). Un bruitage mème tombe souvent pile dans le silence : c'est ce qui rend la vanne drôle.
- La musique est très basse et se baisse toute seule quand la voix parle : tu n'as pas de volume à régler.
- Pour réécouter un changement de musique sans refaire les images : `python3 moteur/rendu.py $P --son-seul` (environ 1 min).

| Nom | Morceau | BPM | Temps fort | Ton |
|---|---|---|---|---|
| `tension-time-attack-research` | Action Time Attack Research, Komiku | 120 | none | dark |
| `tension-waiting-tttt` | Waiting TTTT, Loyalty Freak Music | 160 | none (bass at 11.9 s) | medium |
| `tension-cyber-anxiety` | Cyber Anxiety, HoliznaCC0 | 160 | none (bass at 9.0 s) | medium |
| `elan-dear-mr-super-computer` | Dear Mr Super Computer, HoliznaCC0 | 130 | 5.59 s | bright |
| `elan-back-in-the-80s` | Back In The 80s, HoliznaCC0 | 120 | 7.93 s | bright |
| `complet-machines-with-feelings` | Machines With Feelings, HoliznaCC0 | 100 | 19.14 s | bright |
| `complet-retro-synths` | Retro Synths, HoliznaCC0 | 120 | 15.92 s | bright |
| `complet-feels-good-to-be-alive` | It feels good to be alive too, Loyalty Freak Music | 140 | 13.64 s | bright |
| `minimal-drifting-piano` | Drifting Piano, HoliznaCC0 | 100 | none | dark |
| `minimal-ambiant-hope` | Ambiant Hope, Komiku | 133 | none | medium |

### `cartons` : le texte en haut de l'écran
- Format : `{de:'p5', l1:'Et là… les deux', l2:'ont tort.', mot:'tort.'}`.
- 2 lignes courtes, **une seule idée**, un **mot-clé** encadré (il doit être écrit exactement comme dans `l1`/`l2`, ponctuation comprise).
- Fin automatique : 0,4 s avant le carton suivant. Sinon, ajoute `a:'p9-.4'`.
- **Pas de carton pendant la phrase « abonne-toi »** : la pastille prend sa place. Termine le carton précédent avec `a:'pX-.4'`.
- Le dernier carton porte l'appel final : `{de:'dis', l1:'Dis-le', l2:'en commentaire.', mot:'commentaire.'}`.

### `humeurs` : les expressions des personnages
- Format : `[ancre, 'gauche'|'droite', humeur]`.
- Humeurs possibles : `content`, `salut`, `surpris`, `inquiet`, `choque`, `fier`, `pense`, `hausse`, `triste`, `rit`, `montre`, `saute`.
- Change d'humeur à chaque phrase où le personnage est visible : c'est ce qui le rend vivant.
- `persos.droite.accessoire` : `lunettes`, `cravate`, `casquette` ou `noeud`. `couleur` est une teinte de papier : `#f4e3d7`, `#e3ecf2` ou `#efe6c8`.

## Les scènes toutes faites (bibliothèque : seulement si leurs visuels ne sont pas dans les 5 dernières vidéos)

Enchaîne **2 à 4 scènes**. Chaque scène commence à `de` et finit au début de la suivante. Choisis la scène qui **transforme** ton chiffre, pas celle qui l'affiche.

| Scène | Ce qu'elle fait (motion design) | Pour quel sujet |
|---|---|---|
| `duel` | 2 grands chiffres → 2 barres, étiquette qui bascule, bulles de pensée, tampon FAUX. Si une `vague` suit avec `persos`, les deux barres **glissent** dans la vague. | Comparer 2 personnes, 2 salaires, 2 situations |
| `vague` | N barres classées qui poussent en vague 3D. Repères : `zone` (grise une partie + texte), `seuil` (colore le haut, ligne en pointillés, tampon), `bulle` (zoom, brouillard, la bulle éclate) | « Où tu te situes », répartition, classement |
| `chiffre` | Un chiffre qui compte → devient une barre → la barre se **découpe** en parts qui glissent (« ce qui part en impôts », « ce qu'il te reste ») | Décomposer un montant (salaire brut → net, prix → taxes…) |
| `courbe` | Une ligne qui se dessine dans le temps, un point qui compte, des marques | Évolution (prix, loyers, inflation…) |
| `choix` | Écran final : le chiffre + 2 cartes qui se retournent (« RICHE » / « CLASSE MOYENNE ») | La question de débat (fin) |
| `libre` | Tu dessines toi-même (fonction `dessin(t,api)`). **Dernier recours** : justifie-le dans HISTORIQUE.md | Un gag ou une image qu'aucune scène ne fait |

### `duel`
```js
{ type:'duel', de:'p1',
  gauche:{valeur:2200, label:'SALAIRE DE TICO · NET'},          // texte:'2 200 €' si tu veux un autre format
  droite:{valeur:4400, label:'SALAIRE DE YANIS · NET', at:'p2'},// at = quand le 2e chiffre arrive
  barres:'p3',                                                  // quand les chiffres deviennent des barres
  etiquettes:[{at:'p3+1',txt:'RICHE ?'},{at:'p4+.2',txt:'CLASSE MOYENNE ?'}],  // au-dessus de la barre de droite
  bulles:[{at:'p3+.2',qui:'gauche',txt:'« Yanis, il est riche. »'}],
  tampon:{at:'p5',txt:'FAUX'} }                                 // barre l'étiquette + tamponne les deux
```

### `vague`
```js
{ type:'vague', de:'p6', a:'p13',
  valeurs:'salaires-prive-2025',            // jeu prêt (moteur/donnees.js : 2025 = le plus récent), OU un tableau, OU {mediane:2238, moyenne:2797, n:100}
  persos:{gauche:{i:50}, droite:{i:90,valeur:4500}},   // sur quelle barre chacun se tient (i = rang, de 0 à n-1) ; en 2025, la barre 90 = 1re du top 10 % (> 4 441 €)
  reperes:[
    {type:'zone',  at:'p7',  zone:[0,50],  txt:'LA MOITIÉ', sous:'GAGNENT MOINS'},
    {type:'seuil', at:'p8',  zone:[90,100], valeur:4441, tampon:'TOP 10 %'},
    {type:'bulle', at:'p10', zone:[84,95], eclate:'pop'} ] }
```

### `chiffre`
```js
{ type:'chiffre', de:'p4', valeur:2800, label:'SALAIRE BRUT · PAR MOIS', barre:'p5',
  parts:[ {at:'p6',valeur:616,label:'COTISATIONS',couleur:'gris'} ], reste:'2 184 €' }
```
Couleurs : `'acc'` (terracotta, par défaut), `'gris'` ou `'encre'`.

### `courbe`
```js
{ type:'courbe', de:'p4', fin:'p8',
  points:[['2015',580],['2018',610],['2021',650],['2024',720]], unite:'€',
  marques:[{at:'p6',i:2,txt:'+12 %'}] }
```

### `choix`
```js
{ type:'choix', de:'p13', chiffre:'4 400 €', sur:'PAR MOIS, NET', ou:'ou',
  options:[{txt:'RICHE',at:'riche'},{txt:'CLASSE<br>MOYENNE',at:'classe'}] }
```

### `libre` (dernier recours)
```js
{ type:'libre', de:'p7', largeur:2600,
  dessin:(t,a)=>{ /* renvoie du SVG dans le monde ; a.ox = début de ta zone, a.G = le sol (y=1300), a.T('p8') = temps */ return ''; },
  cameras:[['p7',600,null,.8,0],['p8',900,null,.9,2]],   // [ancre, x dans ta zone, y (null = cadré sur le sol), zoom, rotation]
  sons:[['p7+.2','pop',.3]] }
```

## Ce que les contrôles vérifient (`controles/verifier.py`)

- Durée selon le format.
- 3 chiffres distincts maximum **à l'écran** (années et source exclues) et 4 maximum dans la voix.
- « Abonne-toi » une seule fois, entre 25 % et 70 % de la durée, et un appel final.
- Un carton dès la 1re image.
- Aucune erreur JavaScript.
- **Bruitages « mème » (décision de Thomas du 03/11)** : en plus des sons de mouvement, des sons drôles qui RÉAGISSENT à
  la phrase, déclarés dans `sons` juste après le mot (`['p3+.1','disque-raye',.45]`) : `disque-raye` (après la vanne
  d'ouverture), `oh-surprise` (un chiffre choquant), `piece-roule` (la galère, le peu d'argent), `pompe-clac` (essence,
  coupure net), `grillons` (silence gênant), `chasse-eau` (toilettes, argent jeté), `trompette-triste` (l'échec),
  `bebe-pleure` / `bebe-pleure-2` (le seum), `rires`, `applaudissements`, `piece-tombe` (une pièce qui tombe : « t'as plus rien »), `ba-dum-tss` (après une vanne), `buzzer-faux` (une idée reçue fausse), `ding-juste` (la bonne réponse), `boom-dramatique` (un chiffre choc, à utiliser rarement), `foule-ooh` (surprise), `rire-moqueur` (on se moque gentiment), `foule-decue` (« aww »), `sifflet-chute` (Tico qui tombe, l'argent qui chute), `tic-tac` (le temps presse, « avant la fin du mois »). Un toutes les 6 à 8 s au plus, jamais sur un
  chiffre dit, 0,3 à 0,5 de gain. Sources et licences : `sons/LICENCE-memes.txt`. Jamais un son de mème connu
  (« bruh », boom de Vine, violon triste de film) : souvent protégé, TikTok peut couper le son.
- **L'image agit en permanence** : jamais plus de 1,6 s sans action déclarée ni geste bruité.
- **Un nouveau plan toutes les 1 à 3 s** (changement net de cadrage, plan plein écran ou carte qui se retourne).
- **Monde nouveau** : `visuels` présents et aucun mot en commun avec les « VISUELS » des 5 dernières vidéos.
- Pas de carton pendant un plan plein écran (`mot`).
- Aucun chevauchement entre carton, pastille et sous-titres.
- **Aucun texte coupé par le bord** : les textes d'écran jamais, ceux du monde pas plus de 0,8 s hors whip pan.
- Tico : 25 % de l'image maximum, et présent au hook, au milieu, à « abonne-toi » et à la fin.
- Aucune phrase de plus de 6 s.
- Avec `--video` : 1080×1920 avec son, durée exacte, -14 LUFS.

**Un contrôle en échec bloque la livraison.** Corrige le **plan**, pas le moteur. Si c'est le moteur qui est en cause (un bug), ne le modifie pas pendant une production : note-le dans HISTORIQUE.md avec la planche, et Thomas tranchera.

## Pièges connus (test du 01/11)
- **Après chaque modification de `plan.js` qui touche `phrases` ou `ancres`, relance `timing.py`** : sinon la page ne démarre pas (le contrôle le dit : « ancre inconnue »).
- **Toujours vérifier la date des chiffres** : une étude plus récente peut être sortie (exemple : Insee 2025, publiée le 22/10/2026). Le jeu de données du moteur porte l'année dans son nom.
- **Les contrôles ne voient pas tout** (un texte caché derrière un carton, Tico devant un chiffre, un écran à moitié vide) : regarde toujours la planche toi-même avant la porte 3.
- **Une scène `monde` n'est plus dessinée 0,6 s après sa fin** (`a`). Pour qu'un décor reste visible pendant la scène suivante (rare), mets `persiste:true`.
- **Tampons** : `a.tampon()` élargit maintenant son cadre selon l'espacement des lettres ; pas besoin d'ajouter des espaces au texte.
- **Le contrôle « Le dessin bouge vraiment » est MESURÉ** (02/11) : la caméra est figée, les textes cachés, et on compare les pixels toutes les 0,25 s. Déclarer une action dans `actions` ne suffit plus : il faut qu'elle soit dessinée. Un plan `mot` immobile, ou un décor arrêté où seule la caméra bouge, échoue. Remède : faire vivre le plan `mot` (lettres qui tombent, mot qui se fissure, fond qui se remplit) et faire agir un objet ou Tico dans chaque plan.
