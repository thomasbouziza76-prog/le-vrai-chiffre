# Pipeline quotidien · « Le Vrai Chiffre » (vidéo 9:16 : matin 30 ou 45 s, soir histoire 62 à 75 s ; voir le tableau des durées)

Session neuve et éphémère : tout se réinstalle. Travaille seul, sans poser de question. Si une étape échoue deux fois,
livre ce qui existe et écris ce qui manque. Les étapes mécaniques sont des scripts dans `etapes/` : lance-les, ne les
réécris pas, ne relis pas leur code. Garde ta réflexion pour le sujet, le script et la mise en scène.

Racine du dépôt : `$LVC_REPO` (après l'étape 0). Projet du jour : `$P` = sortie de `etapes/01-nouveau-projet.sh`.

## Ordre de lecture (obligatoire)

| Ordre | Fichier | Pourquoi |
|---|---|---|
| 1 | **`DA.md`** | La direction artistique : motion design d'abord, Tico en invité. **Il prime sur tout.** |
| 2 | `PIPELINE.md` (ce fichier) | Les étapes, dans l'ordre |
| 3 | `SCRIPT-HOOKS.md` | Écrire le script (hook, les deux appels, formats court et histoire) |
| 4 | `MOTION.md` | Couleurs, polices, règles de mouvement des pros |
| 5 | `SONS.md` | Bruitages et niveaux |
| 6 | `historique/CHECKS.md` | Les erreurs déjà faites, à ne pas refaire |

**Si deux fichiers se contredisent : `DA.md` > `historique/CHECKS.md` > `PIPELINE.md` > `SCRIPT-HOOKS.md` > `MOTION.md` > `SONS.md`.**

## Tableau des durées (décision de Thomas du 2026-11-01)

- **Vidéo du MATIN (SLOT 0)** : format court qui ALTERNE avec la vidéo du matin précédente dans `HISTORIQUE.md` : 45 s si
  la précédente faisait 30 s, 30 s si elle faisait 45 s. Le N° ne joue PAS sur la durée.
- **Vidéo du SOIR (SLOT 1)** : format HISTOIRE de 62 à 75 s (au-dessus d'une minute : seules les vidéos de plus d'1 min
  sont rémunérées par TikTok). Structure : `SCRIPT-HOOKS.md` section 12.

| | **30 s** (matin, une fois sur deux) | **45 s** (matin, l'autre fois) | **62-75 s** (soir, histoire) |
|---|---|---|---|
| Mots de la voix | 75 à 85 | 110 à 120 | 170 à 195 |
| Appel « abonne-toi » dit à voix haute | entre 12 et 16 s | entre 16 et 24 s | entre 18 et 28 s |
| Relance | juste après l'appel | juste après l'appel | juste après l'appel |
| Retournement (« Comment c'est possible ? ») | facultatif | facultatif | obligatoire, entre 25 et 35 s |
| Fin : question qui fait réagir et/ou partage ciblé | dernières 3 à 4 s | dernières 3 à 5 s | dernières 5 à 8 s |
| Mouvements de caméra (au moins un toutes les 3 s) | 10 et plus | 15 et plus | 21 et plus |
| Apparitions de Tico (minimum : hook, choc, retournement ou relance, fin) | 4 et plus | 4 et plus | 4 et plus |
| Bruitages | 25 à 40 | 35 à 60 | 60 à 90 |
| Texte d'écran à l'image 0 | 3 à 6 mots | 3 à 6 mots | 3 à 6 mots |

## Les deux textes à l'écran (ne pas confondre)

| | **Carton** (en haut) | **Sous-titre** (en bas) |
|---|---|---|
| Ce que c'est | Le RÉSUMÉ de l'idée, comme dans la référence `exemples/ticket-salaire-median-v2` | La TRANSCRIPTION de la voix, mot par mot |
| Place | entre y 168 et y ~700 | 58 px, y 1196 (bande 1180-1330) |
| Quand | un par scène, 2 lignes max, 3 à 7 mots par ligne | en continu pendant la voix |
| Mot clé | un seul mot encadré terracotta par carton | sa propre boîte terracotta sur le mot clé (identité) |
| Interdit | répéter la voix mot pour mot | — |

## À ne pas répéter (« la veille » = les 2 vidéos précédentes, matin et soir)

| Quoi | Différent de |
|---|---|
| Archétype de hook, musique, CTA, palette sonore | les 2 vidéos précédentes |
| Blueprints HyperFrames | les 3 vidéos précédentes |
| Monde, fil rouge, objet signature | les 7 vidéos précédentes (`HISTORIQUE.md`) |
| Pièce du Studio utilisée telle quelle | les 2 vidéos précédentes |
| **Se réutilisent librement** | le Ticket, son adversaire géant, les transformations de données de `DA.md` section 5 |

## 0. Installer (≈ 1 min)
`bash etapes/00-installer.sh` puis `source ~/.hf-env`. Il installe HyperFrames 0.8.82 et ses skills (copie dans
`hyperframes/`), GSAP local, Whisper et prépare les polices. Lis `~/motion-design-claude-code/AGENTS.md` (jamais
`skills update`, `upgrade`, `feedback`, `publish`, `npx skills add`). Jamais de moteur maison : la vidéo se rend avec
HyperFrames. Seul `HISTORIQUE.md` (7 dernières vidéos) est à lire en entier : `historique/HISTORIQUE.md`.

## 0 bis. Studio, référence et boucle de retour (≈ 4 min, AVANT le sujet)
1. **Studio** : `mcp__claude-code-remote__add_repo` owner **thomasbouziza76-prog**, repo **studio**, access push, puis
   `git clone --depth 1 https://github.com/thomasbouziza76-prog/studio /home/claude/studio` (dépôt PRIVÉ, jamais rendu
   public). Il contient `charte/ticket.js` (le Ticket), `motion/` (pièces prêtes, `catalogue.json`) et la vidéo de
   référence. Si le clone échoue : continue avec `exemples/ticket.js` de ce dépôt et dis-le dans le message final.
2. **Référence** : regarde `exemples/ticket-salaire-median-v2-planche.jpg` et lis `DA.md` section 6.
3. **Boucle de retour** : lis `Videos!A1:W14` du Google Sheet. Les stats sont écrites par la tâche de nuit (22h43) :
   ne les réécris jamais. Si des vidéos ont des stats, repère les hooks, sujets, durées (30 s / 45 s / histoire 62-75 s) et mots-clés qui
   retiennent le mieux (temps moyen, % qui finit, % recherche) et ceux qui font gagner des abonnés. Penche vers ce qui
   marche, sans répéter les 2 vidéos précédentes, et note la conclusion en une ligne dans l'historique. Si une durée
   retient nettement mieux sur au moins 4 vidéos de chaque, dis-le en tête du message final.

## 1. Sujet et script (≈ 10 min)
- Deux vidéos par jour : le prompt de la tâche donne SLOT (0 = matin, 1 = soir). **Sujet : `git pull`, lis `Videos!A2:D12` du Google Sheet (les vidéos déjà faites, même hors dépôt), puis le PREMIER
  sujet de `sujets.md` qui n'a pas ✅**, en partant du haut, règles du fichier comprises. Saute un sujet ⚡ dont la date
  « valable jusqu'au » est passée (coche-le ⚡⏭). Si une grosse actu argent de la semaine (Insee, gouvernement, prix,
  impôts) intéresse plus les gens, tu peux la traiter à la place : ajoute-la en tête avec ⚡. Pour un sujet ⚡, REVÉRIFIE
  chaque chiffre le jour même (WebSearch) : l'actu bouge. Dès le sujet choisi, mets ✅ + date + N° au début de sa ligne,
  commit et push TOUT DE SUITE (l'autre tâche du jour ne doit pas prendre le même). N° de la vidéo = dernier N° de
  l'historique + 1.
- **Quel sujet selon le moment** : le SOIR prend le premier sujet [DROITS] non coché s'il est parmi les 3 premiers sujets
  libres, sinon le premier sujet libre. Le MATIN prend le premier sujet libre qui n'est PAS [DROITS] (les [DROITS] sont
  pour le format histoire du soir).
- **Durée** : voir le tableau des durées en tête de ce fichier (matin court 30/45 s selon le N°, soir histoire 62-75 s).
  On compare les formats dans les stats.
- **Mot-clé de recherche** : choisis le mot que les gens tapent dans TikTok pour ce sujet (épargne, salaire, investir,
  budget, inflation, impôts, crédit, loyer, prix…). Il est PRONONCÉ par la voix dans les 5 premières secondes, écrit dans
  le texte d'écran du hook ou du premier plan, et il ouvre la légende (voir étape 8). Vérifie chaque chiffre par une recherche web (Insee, Banque de France, AMF, service-public.fr), garde la
  source et la date.
- Script : suis `SCRIPT-HOOKS.md` en entier. 8 hooks sur au moins 4 archétypes (le soir aussi, tous portés par Tico et son cas), garde le plus fort (archétype différent
  des 2 dernières vidéos), texte d'écran de 3 à 6 mots affiché dès la 1re image. Nombre de mots et secondes : tableau des durées. Deux appels dits à
  voix haute, et deux seulement (SCRIPT-HOOKS.md section 6) : « abonne-toi » avec une raison, juste après le chiffre choc,
  suivi aussitôt d'une relance ; puis, à la fin, une question qui fait réagir en commentaire et/ou un partage ciblé.
  Passe la grille de contrôle (section 8) et réécris jusqu'à ce que tout passe.
- Tutoiement, zéro jargon non expliqué, éducatif seulement, aucun conseil personnalisé, aucun produit à intérêts
  présenté comme solution, aucune référence religieuse. Chiffres en lettres dans la voix, en chiffres à l'écran.

## 2. Voix (≈ 2 min)
- Écris le texte voix « comme à un pote » avec les balises eleven_v4 : tons (`[serious]`, `[curious]`, `[softly]`,
  `[warmly]`, `[surprised]`…), 3 à 6 sons humains (`[sighs]`, `[chuckles]`, `[exhales]`, `[gasps]`, `[clears throat]`),
  pauses (`[short pause]`, `[pause]`, « … »). **Sigles** : écris-les dans le texte voix comme ils se prononcent (« l'Aspa »
  et jamais « l'ASPA » ; « la Drès » pour la Drees ; « T.A.E.G. » épelé) ; à l'écran, garde l'orthographe officielle. Hook net : une balise au plus. Aucune balise de bruitage. Un soupir ou un
  rire n'est jamais un sous-titre.
- ElevenLabs `creative_generate_speech`, model_id `eleven_v4`, voice_id `5l4ttmr4SKNgi0HnOelT` (Paul K), generations_count 1.
  Attends avec `creative_get_flow_run_status`. Si la génération ÉCHOUE (statut failed, par ex. « Unusual activity…
  Free Tier access has been disabled ») : attends 30 s et relance UNE seule fois, avec le même texte (constaté : la
  2e tentative passe souvent). Jamais de relance après une génération réussie (chaque appel est facturé). Si la 2e
  échoue aussi, si les crédits sont épuisés ou si le téléchargement est refusé : arrête-toi et préviens Thomas avec
  l'erreur exacte.
- Durée de la voix hors cible : matin, plus de 3 s au-dessus de la durée visée → raccourcis et régénère UNE fois ; soir,
  moins de 62 s → rallonge le bloc CONCRET et régénère UNE fois, plus de 75 s → raccourcis et régénère UNE fois.
- `bash etapes/02-voix.sh $P "<media[0].url>" <texte-voix.txt>` : télécharge, minute chaque mot (`mots.txt`,
  `mots.json`), liste les silences (`silences.txt`), écrit la durée (`duree.txt`). Recolle les mots sur le script (l'orthographe
  du script gagne ; les mots à faible confiance viennent de la transcription).

## 3. Direction, monde, storyboard (≈ 15 min)
Règle n° 1 : chaque vidéo est une création NOUVELLE (mais le Ticket, son adversaire et les transformations de `DA.md` se réutilisent). Identité fixe : palette (papier #f6f1e8, encre
#1c1a17, terracotta #c4552d réservé aux moments qui comptent ; détail dans MOTION.md), polices Instrument Sans + Space Mono, sous-titre mot par mot
en bas (58 px, y 1196, boîte terracotta sur le mot clé), 9:16, finition. Tout le reste change : concept, monde,
objets, caméra, transitions, signatures, effets, bruitages. Interdit de reprendre le monde ou les mécanismes des 7 dernières
vidéos (`HISTORIQUE.md`) : « mécanisme » = monde, fil rouge, objet signature (voir le tableau « À ne pas répéter »).
1. Trouve la métaphore du sujet (elle se joue sur le verbe). Propose-toi 3 directions vraiment différentes
   (`hyperframes/templates/DIRECTIONS-TEMPLATE.md`) et garde celle qui ressemble le MOINS aux 7 dernières.
2. Varie la mise en scène avec les outils : au moins 2 blueprints de
   `hyperframes/.claude/skills/hyperframes-animation/blueprints-index.md` différents de ceux des 3 dernières vidéos ;
   règles de mouvement `.../rules/` ; catalogue (`npx hyperframes catalog --tag transition --json`, `camera`,
   `caption-style`) ; runtimes GSAP, Lottie, Three.js, canvas, SVG ; 3 à 5 sortes de transitions « avec une cause ».
3. Écris `frame.md`, `reference/monde.html` (décor du jour, poses `GX_POSES.Knn`) et `STORYBOARD.md` au FORMAT de
   `exemples/storyboard-exemple.md` (format et niveau de détail seulement ; il date d'AVANT `DA.md` : ignore son arc, ses couleurs,
   son CTA final et l'absence de Ticket) : 6 à 8 séquences, `src`,
   `type`, `blueprint`, `focal`, `rules`, `handoff_in/out` identiques mot pour mot à chaque couture, 2 à 4 plans par séquence.
   Les deux appels (abonne-toi après le chiffre choc, question ou partage à la fin) et leur petit texte d'écran y ont leur plan.
4. 9:16 : rien de lisible au-dessus de y 168 ni sous y 1330 ; bande 1180-1330 réservée au sous-titre ; rien de lisible à
   x > 940 entre y 700 et 1330 ; sous-titre clair (`.fx-sub.dark`) sur fond sombre. Ids SVG uniques et préfixés.
5. LES 3 PREMIÈRES SECONDES : dès l'image 0, le texte d'écran du hook est LISIBLE et quelque chose bouge. Pas de fondu
   depuis le blanc, pas d'écran vide, pas de logo, pas de titre qui monte lentement. Le premier bruitage tombe à 0 s.
   **Motion design d'abord** (règles chiffrées de `DA.md` : un mouvement de caméra au moins toutes les 3 s, jamais le
   même cadrage plus de 3 s, au moins 2 transformations de données par séquence, transitions avec une cause) ; **Tico est
   l'invité** (4 moments clés minimum, 25 % de l'image maximum). L'ouverture
   (0 à 2 s) : le chiffre ou l'enjeu en motion design (caméra qui pousse, chiffre qui claque), Tico réagit, bruité geste par geste. Regarde d'abord la vidéo de
   référence `exemples/ticket-salaire-median-v2.html` + `exemples/ticket-salaire-median-v2-planche.jpg`. Le Ticket se
   dessine TOUJOURS avec `ticket.js` (jamais à la main).
   Un snapshot à t = 0 et un à t = 0,3 s doivent déjà montrer le hook : sinon corrige le premier plan.
   **Librairie du Studio d'abord** (cloné à l'étape 0 bis) : lis `motion/catalogue.json` (champ `quand`) et prends 1 à 3 pièces qui servent le sujet :
   copie leur `index.html`, change le `CFG` (textes, chiffres, durées), garde la charte. Jamais la même pièce telle quelle
   deux jours de suite (regarde `utilise_dans`) : modifie-la vraiment ou prends-en une autre. Si le clone échoue, continue sans.
6. Pose les images clés, un snapshot par image clé (`npx hyperframes snapshot --at <t> --no-end --describe false -o boards/stills`),
   regarde-les (les images clés seulement), compare aux vidéos précédentes décrites dans HISTORIQUE.md.

### Qualité visuelle (obligatoire, à inscrire dans frame.md et dans chaque paquet d'agent)
Lis d'abord `DA.md` (la direction artistique, prioritaire), puis `MOTION.md` (la charte de mouvement), puis `recherche/GITHUB.md` (composants du catalogue local, plugins GSAP)
et `historique/CHECKS.md` (règles apprises).
1. **Flou de mouvement** : composant `motion-blur` (`npx hyperframes add motion-blur`), `data-hf-motion-blur` sur tout
   objet qui traverse l'écran ou zoome vite.
2. **Courbes** : jamais `linear` ni `ease` par défaut. Entrées « premium » `expo.out` / `power3.out`, objets qui se
   posent `back.out(1.7)`, sorties `power2.in`. Anticipation (léger recul avant un départ), dépassement puis retour
   sur les chiffres, inertie : les éléments secondaires suivent avec 0,05 à 0,15 s de retard (stagger).
3. **Caméra jamais figée** : dérive lente continue (≈ 1 à 2 % d'échelle ou 10-20 px sur un plan), poussée sur le chiffre
   clé, tremblement seulement sur un impact et très bas.
4. **Profondeur** : 3 plans (fond, milieu, avant) à vitesses différentes ; ombres de papier empilées (contact + douce) ;
   léger flou sur le fond quand l'avant est net ; bords de papier irréguliers (`feTurbulence` + `feDisplacementMap`).
5. **Au moins un moment 3D STYLISÉE par vidéo** (pas de 3D réaliste, mais de la 3D oui : voir MOTION.md ; Three.js, état piloté par la timeline, rendu dans `onUpdate`) : objet clé éclairé ou en
   aplats + contours encre pour rester « papier ».
6. **Chiffres spectaculaires** : compteur à rouleaux (`number-wheel`, `slot-machine-roll`, `split-flap-board`) ou
   compteur avec pulsation, bruitage « clic » sur la valeur finale, toujours une comparaison concrète à l'écran
   (« 1 095 € = 2 mois de courses »), chiffre centré, très gros, hors des zones de l'interface TikTok.
7. **Accents dessinés** : souligné, cercle, flèche, surligneur (`hw-*`, `marker-highlight`) sur le mot ou le chiffre clé.
8. **Rythme** : un changement visuel toutes les 1,5 à 3 s ; chaque geste visuel fort a son bruitage.
9. **Types de plans pour un chiffre** (liste prioritaire : `DA.md` section 5 ; détail ci-dessous ; 3 ou 4 différents par vidéo) :
   - *Morphose de graphique* : les barres s'affinent une à une et deviennent une courbe qui passe par leurs sommets
     (mêmes valeurs, la courbe se DESSINE, point final en terracotta avec son étiquette).
   - *Zoom sur l'indicateur* : 4 crochets terracotta encadrent UNE case d'un tableau, le reste s'assombrit, la case
     grossit depuis sa vraie place jusqu'à remplir l'écran (fantôme pointillé à l'origine).
   - *Avant / après* : la même carte, seule la date (pastille) bascule, le chiffre change.
   - *Grille* : 20 ou 100 tuiles identiques, une seule casse le motif (ex. « 1 sur 10 »).
   - *Appel de note* : un cercle au marqueur se dessine autour d'un détail, puis l'étiquette arrive.
   - *Lettres masquées* : le mot du hook en contour, la couleur monte à l'intérieur des lettres avec un trait-repère.
   - *Pile à ressort* : 3 cartes (offres, cas, mois) qui s'éventaillent, la première dépasse puis se stabilise.
   - *Compteur* : nombre qui monte, calculé dans le code, jamais deviné.

## 4. Animation (≈ 25 min) : 3 agents au plus
- Paquets : `node .claude/skills/product-launch-video/scripts/frame-packets.mjs --project <slug> --storyboard <slug>/STORYBOARD.md`
  (depuis `~/motion-design-claude-code`).
- Répartis les séquences en 3 agents `general-purpose` au plus (≈ 2-3 séquences chacun), lancés en même temps. Chaque agent ne reçoit
  QUE : ses paquets, le kit `reference/monde.html`, les images clés de ses séquences, `DA.md`, `historique/CHECKS.md`, le chemin absolu de `ticket.js` (`/home/claude/studio/charte/ticket.js`,
  sinon `$LVC_REPO/exemples/ticket.js`), `MOTION.md`, `SONS.md`,
  la charte et les 4 règles. Chaque paquet dit quelle transformation de données et quel gag du Ticket la séquence contient.
  Règles BLOQUANTES : (1) UN SEUL `<script>` par template ; (2) `gsap.timeline({paused:true, onUpdate: render})` ;
  (3) `<script src="assets/vendor/gsap.min.js">`, jamais le CDN ; (4) ids préfixés (`p03-…`) et ids SVG uniques.
  Un agent qui dépasse 35 min : demande-lui de livrer.
- Attends que tous les fichiers de séquence existent.

## 5. Assemblage, son (≈ 15 min)
- `assemble.sh` du projet (réglages : FIRST_FRAME, END_CARD, TOTAL = durée de la voix, LEAK_AT et IRIS_AT vides,
  BED_START 0, BED_END = TOTAL). `npx hyperframes check --json` : zéro erreur.
- **Relecture de mise en scène (agent séparé, ≈ 5 min)** : un agent `general-purpose` neuf, qui n'a pas fait l'animation,
  reçoit UNE planche (un snapshot par plan + les coutures) et la grille : rythme, lisibilité sur téléphone, plans vides
  ou figés, effet « cheap » (texte qui apparaît sans mouvement, objets sans ombre, courbes linéaires), respect de
  l'identité, et la grille « Contrôle final DA » de `DA.md` section 9. Il note chaque plan sur 5 et nomme les 2 plus faibles avec la correction précise. Corrige ces 2 plans
  (ou relance l'agent de la séquence), une seule fois. Ajoute à `historique/CHECKS.md` toute règle nouvelle qu'il a
  trouvée (une ligne À FAIRE / À NE PAS FAIRE).
- Contrôle de l'assemblage : un seul snapshot par couture (à 0) et un par séquence, regroupés en UNE planche ; rien de
  figé, rien de vide, pas de saut.
- Bruitages : lis `SONS.md` (bibliothèque de 75 sons, règle « chaque geste a son son », densité, niveaux : SONS.md fait foi). `assets/audio/sfx-events.json` (nom, temps, gain) calés sur les gestes, palette sonore propre à la vidéo,
  choisie parmi les 75 sons (copiés dans `.claude/skills/media-use/audio/assets/sfx/` par l'installation), différente des 2 vidéos précédentes. `python3 build-sfx-mix.py`.
  **Niveaux validés par Thomas (2026-11-01)** : sons glitch (glitch-1, glitch-2, glitch-3) gain **0,065 maximum** ; aucun
  bruitage ne doit passer au-dessus de la voix : écoute/mesure le mix aux secondes où il y a des bruitages et baisse le gain
  de tout son qui dépasse. On garde tous les bruitages, on règle juste leur niveau.
- Musique (obligatoire) : pistes CC0 du tableau « The 10 tracks used for film C » de
  `.claude/skills/motion-design/references/music.md` (hôte files.freemusicarchive.org), tension + élan DIFFÉRENTES des 2
  dernières vidéos. Bruit de fond : 12 à 15 dB sous la voix dans les silences, gains ≤ 0,12. Échec de téléchargement : sans
  musique, et dis-le. Relance `assemble.sh`.

## 6. Rendu et contrôle (≈ 8 min)
`npx hyperframes render --quality high --output renders/video.mp4`, puis la finition commune (grain papier + vignettage
doux) `bash etapes/07-finition.sh $P`, puis `bash etapes/06-controle.sh $P`. Regarde la
planche `boards/planche.jpg` en entier. Ne dis jamais que c'est fini avant ces contrôles.

## 7. Historique (avant la livraison)
Ajoute une ligne EN HAUT de `historique/HISTORIQUE.md` du dépôt : date, N°, sujet, hook (archétype + phrase), format (matin court / soir histoire),
les deux appels (abonne-toi + fin) ET leurs secondes, à approfondir, concept, monde, signatures, blueprints, transitions, effets, palette sonore,
musique, moteur. Garde les 7 dernières lignes détaillées ; condense les plus anciennes en une demi-ligne chacune.
Commit et push dans le dépôt (voir 10), avec `historique/CHECKS.md` s'il a changé.

## 8. Couverture, titre, rangement, livraison
- Couverture : fais un HTML 1080×1920 dans l'identité de la chaîne (modèle de FORMAT : `exemples/couverture-exemple.html`) :
  ligne mono « LE VRAI CHIFFRE … N° xx », hook en très gros (3 à 5 lignes) avec UN mot dans la boîte terracotta, chiffre clé
  ou objet signature, essentiel entre y 240 et y 1650. Puis `bash etapes/08-livrables.sh $P <xx> <couverture.html>`
  (PNG, JPEG, vignette 270 px à REGARDER, vidéo compressée). Titre : 40 à 70 caractères.
- Vidéothèque (artefact slug c0766a03-dabd-41fa-a209-746aadb762e6) : `get_artifact`, `publish_files` (patch) avec
  `videos/N<xx>.mp4` et `covers/N<xx>.jpg` (de `$P/livrables`), puis `edit_version` sur index.html : remplace `/*NEXT*/` par
  `/*NEXT*/` + `{n:"<xx>",date:"AAAA-MM-JJ",titre:"…",sujet:"…",video:"videos/N<xx>.mp4",cover:"covers/N<xx>.jpg",legende:"…"},`.
- Google Sheet (spreadsheetId 1YOZOKiZslJRvTt3Qzekn7JD3qrJvBn6urOq-1ORWoe0, onglet Videos), plus récent en haut :
  `insert_dimension` ROWS 1→2 (sheetId 0, inheritFromBefore false), `update_values` `Videos!A2:P2` (N°xx | date | titre |
  sujet | légende + hashtags | vide | hook | sources | « À publier » | notes | K à N vides (remplies par la tâche de nuit) | durée en
  secondes | mot-clé), puis `update_formulas` `Videos!F2` :
  `=HYPERLINK("https://claude.ai/artifact/QmS9gdt1rFNDf6hyZSJKKK#N<xx>";"Ouvrir N°<xx>")`. Ne touche jamais aux autres lignes.
- Légende : la 1re ligne commence par le mot-clé de recherche ; 5 hashtags dont 3 sur le sujet (#epargne, #salaire,
  #investir… selon la vidéo) et 2 génériques (#argent #financepersonnelle).
- L'envoi se fait à l'étape 11 (tout à la fin), pas ici.

## 8 ter. Carrousel (TikTok mode photo + Instagram), même sujet que la vidéo
Thomas les publie à la main avec la vidéo. Pas de voix : aucun crédit ElevenLabs.
- **Contenu** : le même sujet et les mêmes chiffres vérifiés que la vidéo, mais le carrousel APPORTE PLUS (le détail, un
  exemple chiffré, « ce que ça change pour toi »), pour qu'on ait envie de l'enregistrer.

  **Règles de structure (stats du 2026-11-01 : les gens voient en moyenne 2,7 slides sur 7)** :

  | Slide | Contenu |
  |---|---|
  | 1 | Le hook en très gros : le message complet en une phrase (il doit arrêter le défilement seul) |
  | 2 | LE chiffre clé + sa comparaison concrète |
  | 3 | Ce que ça change pour TOI (exemple chiffré) |
  | 4 | Le détail ou le piège en plus |
  | 5 | Sources + « contenu éducatif, pas un conseil personnalisé » |
  | 6 | Question qui fait réagir en commentaire et/ou partage ciblé (« Envoie-le à… ») + « Abonne-toi » avec une raison ; « Enregistre » en petit si la place le permet |

  - **6 slides MAXIMUM** (5 si le sujet est simple : on retire la slide 4).
  - Tico peut apparaître sur la couverture et le carrousel : toujours avec `ticket.js` (rendu en image), jamais redessiné.
  - **L'essentiel tient dans les slides 1 à 3** : quelqu'un qui s'arrête à la 3 a tout compris.
  - **Chaque slide (sauf la dernière) finit par une relance** qui donne envie de voir la suivante, en bas à droite près
    de la flèche : « Et toi, ça fait combien ? → », « Le pire arrive slide 4 → ». Jamais une phrase qui conclut. Mêmes règles de contenu que la vidéo (sourcé, aucun avis politique, aucune religion,
  aucun produit à intérêts présenté comme solution, gain ET perte pour [INVESTIR]).
- **Format** : un HTML avec des `<section class="slide">` 1080×1350, identité de la chaîne. Modèle de FORMAT VALIDÉ PAR
  THOMAS (2026-11-01) : `exemples/carrousel-exemple.html`, et son rendu `exemples/carrousel-exemple-planche.jpg` à REGARDER (il a 7 slides : garde son STYLE, mais suis la structure en 5 ou 6 slides ci-dessus ; en 5 slides, retire la slide 4)
  avant de commencer : ton carrousel doit avoir le même niveau de vie et de lisibilité (garde la grille, les polices, les couleurs ; change le contenu et ajoute 1 ou 2
  petits dessins propres au sujet, différents à chaque fois). **Zone de sécurité** : tout ce qui compte entre x 80 et
  x 940, y 140 et y 1150 (TikTok pose ses boutons à droite et sa légende en bas). **Tout ce qu'il faut pour comprendre
  est écrit EN GROS** (titres ≥ 96 px, texte ≥ 56 px) : la slide 1 dit le message complet en une phrase géante (date,
  chiffre ou condition compris, ex. « 20 novembre : ton paiement en 4 fois devient un crédit. »). Les petits textes gris
  (bandeau du haut, « glisse ») ne portent JAMAIS une info importante.
  **Vivant, pas une simple affiche** : chaque slide a au moins 1 OBJET DESSINÉ propre au sujet (ticket, contrat, étiquette,
  pièce, calendrier…) + 1 ANNOTATION faite main (flèche, cercle, soulignement, rature, tampon) + des éléments posés de
  travers avec ombre de papier et scotch ; un FIL CONTINU (trait terracotta en bas) sort à droite d'une slide et rentre à
  gauche de la suivante ; points de progression en bas. Le fil et les annotations ne passent JAMAIS sur un texte. Pas de slide
  à moitié vide : le contenu est centré et occupe la slide.
- Phrases courtes, un chiffre ou une idée par slide.
- **Rendu** : `bash etapes/09-carrousel.sh <carrousel.html> $P/livrables <xx>` → `C<xx>-01.png`… + `C<xx>-planche.jpg`.
  REGARDE la planche : texte coupé, faute, chiffre différent de la vidéo, slide vide = corrige avant de livrer.
- **Légende carrousel** : 1re ligne = mot-clé + hook, 2 lignes, 5 hashtags. Les PNG sont envoyés à l'étape 11.

## 8 quater. Page de liens (levraichiffre.github.io) : mise à jour
La page de liens de la chaîne affiche les chiffres clés et les 3 dernières vidéos depuis un fichier `data.json`.
1. `mcp__claude-code-remote__add_repo` owner **levraichiffre**, repo **levraichiffre.github.io**, access push ; puis
   `git clone --depth 1 https://github.com/levraichiffre/levraichiffre.github.io /home/claude/lien-page`.
2. Dans `data.json`, ajoute EN TÊTE de `chiffres` le chiffre clé de la vidéo : `{"n":"<le chiffre, court>","t":"<une phrase
   en tutoiement, 120 caractères max>","s":"<source courte + année>"}` (garde 10 chiffres max, supprime les plus vieux) ;
   ajoute EN TÊTE de `videos` : `{"n":"<xx>","titre":"<titre de la vidéo>","lien":"https://www.tiktok.com/@le_vrai_chiffre"}`
   (garde 3 vidéos). Ne touche à rien d'autre (jamais index.html). Le JSON doit rester valide (`python3 -m json.tool`).
3. Commit + push. Si add_repo ou le push échoue : ne bloque pas la livraison, dis-le en une ligne dans le message final.

## 8 quinquies. Studio (dépôt privé) : archiver la vidéo
Le Studio (`/home/claude/studio`, cloné à l'étape 0 bis) garde tout pour nous : vidéos, couvertures, carrousels, fiches, librairie.
1. `videos/N<xx>/` : `video.mp4` compressée (`ffmpeg -i <rendu> -vf scale=720:-2 -c:v libx264 -preset veryfast -crf 28
   -c:a aac -b:a 96k -movflags +faststart`, moins de 15 Mo, sinon crf 32), `couverture.jpg` (qualité 85), `carrousel/C<xx>-NN.jpg`
   (qualité 85), et `fiche.json` aux MÊMES champs que `videos/N06/fiche.json` (statut « À publier », stats vides,
   `motion_utilises` = clés des pièces de la librairie utilisées).
2. `chiffres/chiffres.json` : ajoute le chiffre clé (mêmes champs, `videos` contient `"<xx>"`).
3. `motion/catalogue.json` : ajoute `"N<xx>"` dans `utilise_dans` des pièces utilisées. Si un plan de la vidéo est nouveau et
   réussi, range-le comme nouvelle pièce : `motion/<nom-court>/index.html` autonome (polices `../../charte/polices/`,
   en-tête « Quand l'utiliser », objet `CFG`, `window.seek(t)`), `apercu.gif` (12 i/s, 270 px de large), et une entrée au
   catalogue (`nom`, `quand`, `duree_s`, `type`, `utilise_dans`). Une pièce au plus par jour, seulement si elle est belle.
4. `python3 outils/tableau.py` (régénère README.md), puis commit + push. Si ça échoue : ne bloque pas la livraison,
   dis-le en une ligne dans le message final.

## 9. Boucle de retour
Déplacée à l'étape 0 bis (au début de chaque exécution).

## 10. Dépôt
`git -C $LVC_REPO add -A && git commit -m "N°xx · sujet" && git push` (le dépôt est attaché avec `add_repo`, access push).
Ne pousse que `historique/` et les fichiers du kit modifiés, jamais `node_modules`, `.env`, vidéos, voix ni rendus.

## 11. Livraison finale (UN seul message, en tout dernier, après 8 quinquies et 10)
Envoie dans l'ordre (SendUserFile, status proactive) : la vidéo, la couverture, puis les slides du carrousel. Dans un seul
message court, en français : titre ; légende vidéo (2 lignes + 5 hashtags, mot-clé dès la 1re ligne, source et périmètre
du chiffre) ; légende carrousel ; sujet ; durée ; hook et archétype ; les deux appels et leurs secondes ; concept en une phrase ; gags du
Ticket et transformations de données utilisés ; pièces du Studio utilisées ; sources ; défauts restants ; lien du Google
Sheet ; et une ligne pour chaque étape qui a échoué (page de liens, Studio, musique…).
