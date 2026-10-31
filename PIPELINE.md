# Pipeline quotidien · « Le Vrai Chiffre » (vidéo 9:16 de 40-45 s)

Session neuve et éphémère : tout se réinstalle. Travaille seul, sans poser de question. Si une étape échoue deux fois,
livre ce qui existe et écris ce qui manque. Les étapes mécaniques sont des scripts dans `etapes/` : lance-les, ne les
réécris pas, ne relis pas leur code. Garde ta réflexion pour le sujet, le script et la mise en scène.

Racine du dépôt : `$LVC_REPO` (après l'étape 0). Projet du jour : `$P` = sortie de `etapes/01-nouveau-projet.sh`.

## 0. Installer (≈ 1 min)
`bash etapes/00-installer.sh` puis `source ~/.hf-env`. Il installe HyperFrames 0.8.82 et ses skills (copie dans
`hyperframes/`), GSAP local, Whisper et prépare les polices. Lis `~/motion-design-claude-code/AGENTS.md` (jamais
`skills update`, `upgrade`, `feedback`, `publish`, `npx skills add`). Jamais de moteur maison : la vidéo se rend avec
HyperFrames. Seul `HISTORIQUE.md` (7 dernières vidéos) est à lire en entier : `historique/HISTORIQUE.md`.

## 1. Sujet et script (≈ 10 min)
- Sujet : ligne n° ((jours depuis 2026-10-31) mod 60) + 1 de `sujets.md`, règles du fichier comprises (sauter un sujet
  déjà fait). Vérifie chaque chiffre par une recherche web (Insee, Banque de France, AMF, service-public.fr), garde la
  source et la date.
- Script : suis `SCRIPT-HOOKS.md` en entier. 8 hooks sur au moins 4 archétypes, garde le plus fort (archétype différent
  des 2 dernières vidéos), texte d'écran de 3 à 7 mots affiché dès la 1re image. 110 à 120 mots. UN seul appel à
  l'action dit à voix haute, entre 16 et 24 s juste après le chiffre choc, suivi aussitôt d'une relance ; la fin est une
  boucle vers le hook. Passe la grille de contrôle (section 8) et réécris jusqu'à ce que tout passe.
- Tutoiement, zéro jargon non expliqué, éducatif seulement, aucun conseil personnalisé, aucun produit à intérêts
  présenté comme solution, aucune référence religieuse. Chiffres en lettres dans la voix, en chiffres à l'écran.

## 2. Voix (≈ 2 min)
- Écris le texte voix « comme à un pote » avec les balises eleven_v4 : tons (`[serious]`, `[curious]`, `[softly]`,
  `[warmly]`, `[surprised]`…), 3 à 6 sons humains (`[sighs]`, `[chuckles]`, `[exhales]`, `[gasps]`, `[clears throat]`),
  pauses (`[short pause]`, `[pause]`, « … »). Hook net : une balise au plus. Aucune balise de bruitage. Un soupir ou un
  rire n'est jamais un sous-titre.
- ElevenLabs `creative_generate_speech`, model_id `eleven_v4`, voice_id `5l4ttmr4SKNgi0HnOelT` (Paul K), generations_count 1.
  JAMAIS de 2e appel pour « réessayer » (facturé). Échec (« Unusual activity… Free Tier access has been disabled » ou
  téléchargement refusé) : arrête-toi et préviens Thomas avec l'erreur exacte. Attends avec `creative_get_flow_run_status`.
- Voix > 47 s : raccourcis le script et régénère UNE fois.
- `bash etapes/02-voix.sh $P "<media[0].url>" <texte-voix.txt>` : télécharge, minute chaque mot (`mots.txt`,
  `mots.json`), liste les silences (`silences.txt`), écrit la durée (`duree.txt`). Recolle les mots sur le script (l'orthographe
  du script gagne ; les mots à faible confiance viennent de la transcription).

## 3. Direction, monde, storyboard (≈ 15 min)
Même règle n° 1 qu'avant : chaque vidéo est une création NOUVELLE. Identité fixe : palette (papier #f6f1e9, encre
#1a1612, terracotta #c25b28 réservé aux moments qui comptent), polices Instrument Sans + Space Mono, sous-titre mot par mot
en bas (58 px, y 1196, boîte terracotta sur le mot clé), 9:16, finition. Tout le reste change : concept, monde,
objets, caméra, transitions, signatures, effets, bruitages. Interdit de reprendre le monde ou les mécanismes des 7 dernières
vidéos (`HISTORIQUE.md`) : ni frise chronologique, ni glaçon, ni iPhone-banque en fil rouge.
1. Trouve la métaphore du sujet (elle se joue sur le verbe). Propose-toi 3 directions vraiment différentes
   (`hyperframes/templates/DIRECTIONS-TEMPLATE.md`) et garde celle qui ressemble le MOINS aux 7 dernières.
2. Varie la mise en scène avec les outils : au moins 2 blueprints de
   `hyperframes/.claude/skills/hyperframes-animation/blueprints-index.md` différents de ceux des 3 dernières vidéos ;
   règles de mouvement `.../rules/` ; catalogue (`npx hyperframes catalog --tag transition --json`, `camera`,
   `caption-style`) ; runtimes GSAP, Lottie, Three.js, canvas, SVG ; 3 à 5 sortes de transitions « avec une cause ».
3. Écris `frame.md`, `reference/monde.html` (décor du jour, poses `GX_POSES.Knn`) et `STORYBOARD.md` au FORMAT de
   `exemples/storyboard-exemple.md` (format et niveau de détail seulement, jamais le contenu) : 6 à 8 séquences, `src`,
   `type`, `blueprint`, `focal`, `rules`, `handoff_in/out` identiques mot pour mot à chaque couture, 2 à 4 plans par séquence.
   Le CTA du milieu et son petit texte d'écran y ont leur plan.
4. 9:16 : rien de lisible au-dessus de y 168 ni sous y 1330 ; bande 1180-1330 réservée au sous-titre ; rien de lisible à
   x > 940 entre y 700 et 1330 ; sous-titre clair (`.fx-sub.dark`) sur fond sombre. Ids SVG uniques et préfixés.
5. Pose les images clés, un snapshot par image clé (`npx hyperframes snapshot --at <t> --no-end --describe false -o boards/stills`),
   regarde-les (les images clés seulement), compare aux vidéos précédentes décrites dans HISTORIQUE.md.

## 4. Animation (≈ 25 min) : 3 agents au plus
- Paquets : `node .claude/skills/product-launch-video/scripts/frame-packets.mjs --project <slug> --storyboard <slug>/STORYBOARD.md`
  (depuis `~/motion-design-claude-code`).
- Répartis les séquences en 3 agents `general-purpose` au plus (≈ 2-3 séquences chacun), lancés en même temps. Chaque agent ne reçoit
  QUE : ses paquets, le kit `reference/monde.html`, les images clés de ses séquences, la charte et les 4 règles.
  Règles BLOQUANTES : (1) UN SEUL `<script>` par template ; (2) `gsap.timeline({paused:true, onUpdate: render})` ;
  (3) `<script src="assets/vendor/gsap.min.js">`, jamais le CDN ; (4) ids préfixés (`p03-…`) et ids SVG uniques.
  Un agent qui dépasse 35 min : demande-lui de livrer.
- Attends que tous les fichiers de séquence existent.

## 5. Assemblage, son (≈ 15 min)
- `assemble.sh` du projet (réglages : FIRST_FRAME, END_CARD, TOTAL = durée de la voix, LEAK_AT et IRIS_AT vides,
  BED_START 0, BED_END = TOTAL). `npx hyperframes check --json` : zéro erreur.
- Contrôle de l'assemblage : un seul snapshot par couture (à 0) et un par séquence, regroupés en UNE planche ; rien de
  figé, rien de vide, pas de saut.
- Bruitages : `assets/audio/sfx-events.json` (nom, temps, gain) calés sur les gestes, palette sonore propre à la vidéo,
  choisie parmi les 20 sons de `.claude/skills/media-use/audio/assets/sfx/`, différente de la veille. `python3 build-sfx-mix.py`.
- Musique (obligatoire) : pistes CC0 du tableau « The 10 tracks used for film C » de
  `.claude/skills/motion-design/references/music.md` (hôte files.freemusicarchive.org), tension + élan DIFFÉRENTES des 2
  dernières vidéos. Bruit de fond : 12 à 15 dB sous la voix dans les silences, gains ≤ 0,12. Échec de téléchargement : sans
  musique, et dis-le. Relance `assemble.sh`.

## 6. Rendu et contrôle (≈ 8 min)
`npx hyperframes render --quality high --output renders/video.mp4`, puis `bash etapes/06-controle.sh $P`. Regarde la
planche `boards/planche.jpg` en entier. Ne dis jamais que c'est fini avant ces contrôles.

## 7. Historique (avant la livraison)
Ajoute une ligne EN HAUT de `historique/HISTORIQUE.md` du dépôt : date, N°, sujet, hook (archétype + phrase), appel à
l'action ET sa seconde, à approfondir, concept, monde, signatures, blueprints, transitions, effets, palette sonore,
musique, moteur. Garde les 7 dernières lignes détaillées ; condense les plus anciennes en une demi-ligne chacune.
Commit et push dans le dépôt (voir 9).

## 8. Couverture, titre, rangement, livraison
- Couverture : fais un HTML 1080×1920 dans l'identité de la chaîne (modèle de FORMAT : `exemples/couverture-exemple.html`) :
  ligne mono « LE VRAI CHIFFRE … N° xx », hook en très gros (3 à 5 lignes) avec UN mot dans la boîte terracotta, chiffre clé
  ou objet signature, essentiel entre y 240 et y 1650. Puis `bash etapes/08-livrables.sh $P <xx> <couverture.html>`
  (PNG, JPEG, vignette 270 px à REGARDER, vidéo compressée). Titre : 40 à 70 caractères.
- Vidéothèque (artefact slug c0766a03-dabd-41fa-a209-746aadb762e6) : `get_artifact`, `publish_files` (patch) avec
  `videos/N<xx>.mp4` et `covers/N<xx>.jpg` (de `$P/livrables`), puis `edit_version` sur index.html : remplace `/*NEXT*/` par
  `/*NEXT*/` + `{n:"<xx>",date:"AAAA-MM-JJ",titre:"…",sujet:"…",video:"videos/N<xx>.mp4",cover:"covers/N<xx>.jpg",legende:"…"},`.
- Google Sheet (spreadsheetId 1YOZOKiZslJRvTt3Qzekn7JD3qrJvBn6urOq-1ORWoe0, onglet Videos), plus récent en haut :
  `insert_dimension` ROWS 1→2 (sheetId 0, inheritFromBefore false), `update_values` `Videos!A2:J2` (N°xx | date | titre |
  sujet | légende + hashtags | vide | hook | sources | « À publier » | notes), puis `update_formulas` `Videos!F2` :
  `=HYPERLINK("https://claude.ai/artifact/QmS9gdt1rFNDf6hyZSJKKK#N<xx>";"Ouvrir N°<xx>")`. Ne touche jamais aux autres lignes.
  **Colonnes de retour** (K à N, que Thomas remplit à la main 48 h après) : vues | temps moyen | % qui finit | abonnés gagnés.
- Envoie la vidéo ET la couverture (SendUserFile, status proactive) avec : titre, légende (2 lignes + 5 hashtags, mot-clé
  du sujet dès la 1re ligne), sujet, hook et archétype, CTA et sa seconde, concept en une phrase, moteur utilisé, sources,
  défauts restants, lien du Google Sheet. Un seul message final, court, en français.

## 9. Boucle de retour (au début de chaque exécution, 1 minute)
Lis `Videos!A1:N12` du Google Sheet. Si des vidéos ont leurs colonnes K à N remplies : repère les hooks, familles de sujets
et durées qui retiennent le mieux (temps moyen, % qui finit) et ceux qui font gagner des abonnés ; penche vers ce qui
marche (sans jamais répéter la veille) et note la conclusion en une ligne dans l'historique. Vides : ignore.

## 10. Dépôt
`git -C $LVC_REPO add -A && git commit -m "N°xx · sujet" && git push` (le dépôt est attaché avec `add_repo`, access push).
Ne pousse que `historique/` et les fichiers du kit modifiés, jamais `node_modules`, `.env`, vidéos, voix ni rendus.
