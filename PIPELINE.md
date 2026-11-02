# Pipeline quotidien · « Le Vrai Chiffre » (vidéo 9:16 : matin 30 ou 45 s, soir histoire 62 à 75 s ; voir le tableau des durées)

Session neuve et éphémère : tout se réinstalle. Travaille seul, sans poser de question. Si une étape échoue deux fois,
livre ce qui existe et écris ce qui manque. Les étapes mécaniques sont des scripts dans `etapes/` et `moteur/` : lance-les, ne les
réécris pas, ne relis pas leur code. Garde ta réflexion pour le sujet, le script et le plan.

> **Depuis le 01/11/2026 (décision de Thomas) : MOTEUR + CONTRÔLES + AGENTS.**
> - **Moteur** : tu n'écris plus d'animation à la main. Tu écris `plan.js` (`moteur/PLAN.md`) et le moteur fabrique la vidéo au niveau de la N°08.
> - **Contrôles** : `controles/verifier.py` vérifie en code les règles de la DA. Un contrôle en échec bloque la livraison.
> - **Agents** : des agents neufs aux étapes stratégiques (`agents/README.md`) : Stratège → Vérificateur (porte 1 bis) → Critique script → Critique motion → Juge final, puis le Graphiste (couverture, carrousel).
> - **Durée visée d'une production complète : 45 à 60 min.**

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
| 7 | **`moteur/PLAN.md`** + `moteur/mondes/` (README + `gare-des-salaires.plan.js`) | Comment écrire le plan de la vidéo : la scène `monde` en vrai (le moteur fait le reste) |
| 8 | **`agents/README.md`** + `agents/retours-thomas.md` | L'équipe d'agents et les retours de Thomas |

**Si deux fichiers se contredisent : `DA.md` > `historique/CHECKS.md` > `PIPELINE.md` > `SCRIPT-HOOKS.md` > `MOTION.md` > `SONS.md`.**

## Tableau des durées (décision de Thomas du 2026-11-01)

- **Vidéo du MATIN (SLOT 0)** : format court qui ALTERNE avec la vidéo du matin précédente dans `HISTORIQUE.md` : 45 s si
  la précédente faisait 30 s, 30 s si elle faisait 45 s. Le N° ne joue PAS sur la durée.
- **Vidéo du SOIR (SLOT 1)** : format HISTOIRE de 62 à 75 s (au-dessus d'une minute : seules les vidéos de plus d'1 min
  sont rémunérées par TikTok). Structure : `SCRIPT-HOOKS.md` section 12.

| | **30 s** (matin, une fois sur deux) | **45 s** (matin, l'autre fois) | **62-75 s** (soir, histoire) |
|---|---|---|---|
| Mots de la voix (Paul K, stabilité Creative ≈ 3,1 mots/s, mesuré le 01/11) | 90 à 100 | 135 à 145 | 200 à 230 |
| Appel « abonne-toi » dit à voix haute | entre 12 et 16 s | entre 16 et 24 s | entre 18 et 28 s |
| Relance | juste après l'appel | juste après l'appel | juste après l'appel |
| Retournement (« Comment c'est possible ? ») | facultatif | facultatif | obligatoire, entre 25 et 35 s |
| Fin : question qui fait réagir et/ou partage ciblé | dernières 3 à 4 s | dernières 3 à 5 s | dernières 5 à 8 s |
| Mouvements de caméra (au moins un toutes les 3 s) | 10 et plus | 15 et plus | 21 et plus |
| Apparitions de Tico (minimum : hook, choc, retournement ou relance, fin) | 4 et plus | 4 et plus | 4 et plus |
| Bruitages (indicatif : le moteur en pose souvent plus, ne perds pas de temps à viser ce nombre) | 25 à 40 | 35 à 60 | 60 à 90 |
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
| Archétype de hook, question finale, 2e personnage (prénom) | les 2 vidéos précédentes |
| Enchaînement de scènes du moteur (ex. `duel → vague → choix`) | la vidéo précédente (varie au moins une scène ou les repères) |
| **Se réutilisent librement** | Tico, le moteur et ses scènes, les transformations de données de `DA.md` section 5 |

## 0. Installer (≈ 1 à 2 min)
`bash etapes/00-installer.sh` puis `source ~/.hf-env`. Il installe Whisper (avec son modèle local) et num2words, et définit `$LVC_REPO`. Playwright et Chromium sont déjà là. **HyperFrames n'est plus utilisé** : la vidéo se rend avec `moteur/`. Seul `historique/HISTORIQUE.md` (les 7 dernières vidéos) est à lire en entier.

## 0 bis. Studio, référence et boucle de retour (≈ 4 min, AVANT le sujet)
1. **Studio** : charge d'abord l'outil avec ToolSearch (« select:mcp__claude-code-remote__add_repo » ; sans ça il paraît absent et le clone du dépôt privé est refusé, vu le 02/11), puis `mcp__claude-code-remote__add_repo` owner **thomasbouziza76-prog**, repo **studio**, access push, puis
   `git clone --depth 1 https://github.com/thomasbouziza76-prog/studio /home/claude/studio` (dépôt PRIVÉ, jamais rendu
   public). Il contient `charte/ticket.js` (le Ticket), `motion/` (pièces prêtes, `catalogue.json`) et la vidéo de
   référence. Si le clone échoue : continue avec `exemples/ticket.js` de ce dépôt et dis-le dans le message final.
2. **Référence** : relis les 3 règles d'or en tête de `DA.md` (image qui agit, nouveau plan toutes les 1 à 3 s, monde unique). La N°08 n'est plus une référence visuelle.
3. **Boucle de retour** : lis `Videos!A1:W200` du Google Sheet. Les stats sont écrites par la tâche de nuit (22h43) :
   ne les réécris jamais. Si des vidéos ont des stats, repère les hooks, sujets, durées (30 s / 45 s / histoire 62-75 s) et mots-clés qui
   retiennent le mieux (temps moyen, % qui finit, % recherche) et ceux qui font gagner des abonnés. Penche vers ce qui
   marche, sans répéter les 2 vidéos précédentes, et note la conclusion en une ligne dans l'historique. Si une durée
   retient nettement mieux sur au moins 4 vidéos de chaque, dis-le en tête du message final.

## 1. Sujet et script (≈ 12 min), avec 2 agents
- Crée d'abord le dossier : `P=$(bash etapes/01-nouveau-projet.sh nXX-slug)` (slug provisoire, tu peux le garder même si le sujet change).
- **PORTE 1 · Stratège** (`agents/stratege.md`) : lance-le **avant** de choisir le sujet. Donne-lui le SLOT, la règle de sujet ci-dessous, les stats du Sheet (colle-les) et les chemins. Il écrit `$P/agents/1-strategie.md`. Suis sa stratégie (sujet, angle, personnages, hook, question de débat, mot-clé, scènes). Tu peux t'en écarter **seulement si une règle de ce fichier l'impose** : écris pourquoi dans HISTORIQUE.md.
- Deux vidéos par jour : le prompt de la tâche donne SLOT (0 = matin, 1 = soir). **Sujet : `git pull`, lis `Videos!A2:D200` du Google Sheet (les vidéos déjà faites, même hors dépôt), puis le PREMIER
  sujet de `sujets.md` qui n'a pas ✅**, en partant du haut, règles du fichier comprises. Saute un sujet ⚡ dont la date
  « valable jusqu'au » est passée (coche-le ⚡⏭). Si une grosse actu argent de la semaine (Insee, gouvernement, prix,
  impôts) intéresse plus les gens, tu peux la traiter à la place : ajoute-la en tête avec ⚡. Pour un sujet ⚡, REVÉRIFIE
  chaque chiffre le jour même (WebSearch) : l'actu bouge. Dès le sujet choisi, mets ✅ + date + N° au début de sa ligne,
  commit et push TOUT DE SUITE (l'autre tâche du jour ne doit pas prendre le même). N° de la vidéo = 1 + le PLUS GRAND N° trouvé dans
  HISTORIQUE.md, les ✅ de sujets.md, le Sheet (colonne A) et le QG (`db_list videos`) : une tâche qui a planté a pu
  cocher un N° sans écrire l'historique. Si `videos/N<xx>` existe déjà dans le QG avec un autre sujet, prends le suivant.
- **QG ↔ sujets.md** : quand tu prends un sujet O, passe aussi à « fait » le document `sujets/` du QG qui a le même `code`
  (db_list sujets). Si le sujet choisi par Thomas (`pdg/choix`) est déjà dans le Sheet : vide `pdg/choix.sujet`, passe le sujet en
  « fait » et écris-le au journal. Coche toujours la ligne correspondante de sujets.md (son code O).
- **Sujets OUTIL d'abord (décision de Thomas, 02/11)** : matin et soir prennent le premier sujet O libre de `sujets.md`
  (bloc en tête), sauf un ⚡ qui expire dans les 7 jours. Le script suit SCRIPT-HOOKS.md section 0 ter.
- **Quel sujet selon le moment** (pour le reste de la liste) : le SOIR prend le premier sujet [DROITS] non coché s'il est parmi les 3 premiers sujets
  libres, sinon le premier sujet libre. Le MATIN prend le premier sujet libre qui n'est PAS [DROITS] (les [DROITS] sont
  pour le format histoire du soir).
- **Durée** : voir le tableau des durées en tête de ce fichier (matin court : 30 ou 45 s en alternance avec la vidéo du matin précédente de l'historique ; soir histoire 62-75 s).
  On compare les formats dans les stats.
- **Mot-clé de recherche** : choisis le mot que les gens tapent dans TikTok pour ce sujet (épargne, salaire, investir,
  budget, inflation, impôts, crédit, loyer, prix…). Il est PRONONCÉ par la voix dans les 5 premières secondes, écrit dans
  le texte d'écran du hook ou du premier plan, et il ouvre la légende (voir étape 8). Les chiffres sont vérifiés par le Vérificateur (porte 1 bis) : sources et dates dans `$P/agents/1b-chiffres.md`.
- **PORTE 1 bis · Vérificateur** (`agents/verificateur.md`, 02/11) : dès que le sujet et l'angle sont fixés, AVANT d'écrire
  le script. Donne-lui `$P/agents/1-strategie.md`, la ligne du sujet de `sujets.md` et les chemins. Il vérifie chaque chiffre
  et chaque condition à la source officielle et écrit `$P/agents/1b-chiffres.md` (valeur, périmètre, source, « formulation
  sûre »). Le script, la légende et le carrousel n'utilisent QUE ses chiffres, dits avec ses formulations. À CORRIGER → change
  le chiffre ou l'angle et relance-le (2 tours) ; si le chiffre principal est introuvable à la source, change de sujet.
- Script : suis `SCRIPT-HOOKS.md` en entier. Pars des 3 hooks du Stratège ; complète jusqu'à 8 hooks sur au moins 4 archétypes (le soir aussi, tous portés par Tico et son cas), garde le plus fort (archétype différent
  des 2 dernières vidéos), texte d'écran de 3 à 6 mots affiché dès la 1re image. Nombre de mots et secondes : tableau des durées. Deux appels dits à
  voix haute, et deux seulement (SCRIPT-HOOKS.md section 6) : « abonne-toi » avec une raison, juste après le chiffre choc,
  suivi aussitôt d'une relance ; puis, à la fin, une question qui fait réagir en commentaire et/ou un partage ciblé.
  Passe la grille de contrôle (section 8) et réécris jusqu'à ce que tout passe.
- Écris `$P/script.md` : le texte voix ElevenLabs (avec balises, chiffres en lettres), puis la liste `phrases` du plan (sans balises, chiffres en chiffres) et les cartons.
- **PORTE 2 · Critique script** (`agents/critique-script.md`) : **avant de générer la voix** (chaque voix coûte des crédits). Il écrit `$P/agents/2-script.md`. À CORRIGER → corrige puis relance-le (2 tours maximum, voir `agents/README.md`).
- Tutoiement, zéro jargon non expliqué, éducatif seulement, aucun conseil personnalisé, aucun produit à intérêts
  présenté comme solution, aucune référence religieuse. Chiffres en lettres dans la voix, en chiffres à l'écran.

## 2. Voix (≈ 2 min)
- Écris le texte voix « comme à un pote » avec les balises eleven_v4 : tons (`[serious]`, `[curious]`, `[softly]`,
  `[warmly]`, `[surprised]`…), 0 à 2 sons humains maximum (`[sighs]`, `[exhales]` ; jamais de rire forcé) : le ton est celui d'un conteur posé
  (`SCRIPT-HOOKS.md`, « Le ton : raconter comme un conteur »),
  pauses (`[short pause]`, `[pause]`, « … »). **Sigles** : écris-les dans le texte voix comme ils se prononcent (« l'Aspa »
  et jamais « l'ASPA » ; « la Drès » pour la Drees ; « T.A.E.G. » épelé) ; à l'écran, garde l'orthographe officielle. Hook net : une balise au plus. Aucune balise de bruitage. Un soupir ou un
  rire n'est jamais un sous-titre.
- Réglage voix (choisi par Thomas le 01/11, N°08) : model_id `eleven_v4`, voice_id `5l4ttmr4SKNgi0HnOelT` (Paul K),
  **stabilité « Creative » = 0.0**, similarité **inchangée** (valeur par défaut, au milieu), langue `fr`. Référence : la voix
  de la N°08 (`exemples/` du Studio).
  Méthode : `creative_add_flow_node` (node_type `tts`, model_id `eleven_v4`, voice_id ci-dessus, prompt = texte voix,
  model_parameters `{"language_code":"fr","voice_settings":{"stability":0.0}}`), puis `creative_run_flow_nodes` sur ce nœud
  avec generations_count 1. Si `add_flow_node` refuse `voice_settings` (erreur de validation, rien n'est facturé) :
  rabats-toi sur `creative_generate_speech` (model_id `eleven_v4`, même voix, generations_count 1) et note-le dans HISTORIQUE.md.
  Attends avec `creative_get_flow_run_status`. Si la génération ÉCHOUE (statut failed, par ex. « Unusual activity…
  Free Tier access has been disabled ») : attends 30 s et relance UNE seule fois, avec le même texte (constaté : la
  2e tentative passe souvent). Jamais de relance après une génération réussie (chaque appel est facturé). Si la 2e
  échoue aussi, si les crédits sont épuisés ou si le téléchargement est refusé : arrête-toi et préviens Thomas avec
  l'erreur exacte.
- Durée de la voix hors cible : matin, plus de 3 s au-dessus ou plus de 6 s en dessous de la durée visée → ajuste le texte et régénère UNE fois ; soir,
  moins de 62 s → rallonge le bloc CONCRET et régénère UNE fois (sous 1 min, TikTok ne rémunère pas), plus de 75 s → raccourcis et régénère UNE fois.
- `bash etapes/02-voix.sh $P "<media[0].url>" <texte-voix.txt>` (le moteur relit `$P/assets/audio/voix.mp3` tout seul) : télécharge, minute chaque mot (`mots.txt`,
  `mots.json`), liste les silences (`silences.txt`), écrit la durée (`duree.txt`). Recolle les mots sur le script (l'orthographe
  du script gagne ; les mots à faible confiance viennent de la transcription).

## 3. Le plan de la vidéo (≈ 10 min) : moteur + contrôles + Critique motion
**Règle n° 1 : le moteur fait la caméra, les plans, les textes et les sons ; toi, tu inventes le MONDE de cette vidéo** dans `$P/plan.js` avec la scène `monde` (`moteur/PLAN.md`, section « La scène `monde` »), à partir du monde et des plans choisis par le Stratège. Exemple complet de la technique : `moteur/mondes/gare-des-salaires.plan.js` (3 scènes `monde`, 2 plans `mot`, Juge 7/10) ; ne copie PAS son monde (la gare), seulement la façon d'écrire. `moteur/exemples/plan-N08.js` est l'ancien style (barres) : à ne plus imiter.
1. **Écris `$P/plan.js`** :
   - `phrases` = le texte voix exact (sans balises, chiffres en chiffres) ;
   - les cartons (hook dès `'debut'`, 1 idée et 1 mot-clé chacun, aucun pendant « abonne-toi ») ;
   - les humeurs (une par phrase où un personnage est visible) ;
   - une scène **`monde`** (le monde de cette vidéo : `nom`, `visuels`, `acteur`, `cadres` toutes les 1 à 3 s, `dessin`, `actions`), éventuellement 1 ou 2 plans `mot`, puis `choix` pour la question finale ;
   - `abonne`, `question`, `source`, `format`, `musique`.

   Les scènes toutes faites (`duel`, `vague`, `chiffre`, `courbe`, `parcours`) ne s'utilisent que si leurs visuels ne sont pas dans les 5 dernières vidéos (le contrôle « monde nouveau » le vérifie). Note les `visuels` dans HISTORIQUE.md (« VISUELS : … »).
   **Range ton monde** : s'il est réussi, copie `plan.js` dans `moteur/mondes/<nom>.js` (bibliothèque des mondes, pour s'en inspirer plus tard, jamais pour le recopier tel quel).
2. `python3 moteur/timing.py $P` : la liste « mots non retrouvés » doit être vide (sinon, aligne `phrases` sur ce que dit la voix).
3. **`python3 controles/verifier.py $P`** : tout doit être OK. En cas d'échec, corrige le **plan** et relance (environ 10 s par essai). Tu ne passes pas à la suite avec un échec.
   - Si l'échec vient d'un bug du moteur (et pas du plan), ne modifie pas le moteur : contourne-le dans le plan, ou note le bug dans HISTORIQUE.md avec le rapport.
4. `python3 moteur/planche.py $P 1` → `$P/boards/planche-plan-*.jpg`. Regarde-les toi aussi.
5. **PORTE 3 · Critique motion** (`agents/critique-motion.md`) : il juge si c'est du motion design ou « une vidéo animée ». Il écrit `$P/agents/3-motion.md`.
   - À CORRIGER → corrige `plan.js`, relance les contrôles et la planche, puis relance un Critique motion neuf (2 tours maximum).

## 4. Rendu (≈ 3 à 5 min)
`python3 moteur/rendu.py $P` : images (un processus par cœur), bruitages déclarés par le moteur, niveau à -14 LUFS, encodage → `$P/video.mp4` (copiée dans `$P/renders/video.mp4`).
Puis **`python3 controles/verifier.py $P --video`** (tout OK) et `bash etapes/06-controle.sh $P` (noirs, images figées, son).

## 5. Juge final (≈ 4 min) : PORTE 4
`python3 moteur/planche.py $P 1.5 --video` → `$P/boards/planche-video-*.jpg`, puis le **Juge final** (`agents/juge-final.md`). Il écrit `$P/agents/4-juge.md`.
- **VALIDÉ (7/10 et plus)** : tu passes à la suite.
- **À CORRIGER** : applique ses corrections dans le plan, relance l'étape 3 (contrôles) et l'étape 4 (rendu), puis un Juge neuf. **Un seul nouveau rendu.**
- **Une voix fausse est toujours bloquante** : régénère la voix une fois (étape 2), puis timing → contrôles → rendu.
- Après 2 tours, livre quand même, en recopiant ses réserves.

La ligne « POUR THOMAS » du Juge est recopiée dans le message final, avec sa note.

## 6. Ce qui change avec le moteur (rappel)
- Plus de `frame.md`, de `STORYBOARD.md`, d'agents d'animation, d'`assemble.sh` ni de HyperFrames : c'était la cause des 2 h de production et des erreurs qui revenaient.
- Le moteur garantit l'identité (palette, polices, cartons, sous-titres, Tico, grain papier). **Ta créativité va dans le plan** : l'angle, les scènes choisies, les repères, les humeurs et les cartons.
- **Musique (obligatoire, décision de Thomas du 01/11)** : `PLAN.musique` (`moteur/PLAN.md`). Un morceau CC0 de `moteur/musiques.json`, d'un ton différent des 2 vidéos précédentes, avec son temps fort calé sur le chiffre choc (`drop`) et un silence juste avant la révélation (`coupe`). Elle est très basse et se baisse toute seule sous la voix. Si le téléchargement échoue, le rendu continue sans musique : dis-le dans le message final.

## 7. Historique (avant la livraison)
Ajoute une ligne EN HAUT de `historique/HISTORIQUE.md` du dépôt : date, N°, sujet, hook (archétype + phrase), format (matin court / soir histoire),
les deux appels (abonne-toi + fin) ET leurs secondes, à approfondir, concept, monde, signatures, blueprints, transitions, effets, palette sonore,
scènes du moteur utilisées, notes des 4 agents (script, motion, juge) et nombre de tours, durée totale de la production. Garde les 7 dernières lignes détaillées ; condense les plus anciennes en une demi-ligne chacune.
**Vidéo du MATIN seulement : réécris aussi la 1re ligne en gras** : `**Prochaine vidéo du MATIN : <30 si tu viens de faire 45 s, 45 si tu viens de faire 30 s> s** (dernière vidéo du matin : N°xx, <durée> s)`. Sans ça, l'alternance 30/45 s s'arrête.
Commit et push dans le dépôt (voir 10), avec `historique/CHECKS.md` s'il a changé.

## 8. Couverture, titre, rangement, livraison
- **Depuis le 02/11, la couverture et le carrousel (8 ter) sont faits par le Graphiste** (`agents/graphiste.md`), puis relus par un
  Graphiste neuf (agents/README.md). Les règles ci-dessous sont les siennes.
- Couverture : fais un HTML 1080×1920 dans l'identité de la chaîne (modèle de FORMAT : `exemples/couverture-exemple.html`) :
  ligne mono « LE VRAI CHIFFRE … N° xx », hook en très gros (3 à 5 lignes) avec UN mot dans la boîte terracotta, chiffre clé
  ou objet signature, essentiel entre y 420 et y 1650 (la grille du profil coupe le haut et le bas de la couverture, et le badge « Épinglé » cache la zone y 240-400 : retour de Thomas du 02/11, titres coupés sur les vidéos épinglées). Rien d'important au-dessus de y 420. Puis `bash etapes/08-livrables.sh $P <xx> <couverture.html>`
  (PNG, JPEG, vignette 270 px à REGARDER, vidéo compressée). Titre : 40 à 70 caractères.
- Vidéothèque (ancien artefact c0766a03) : **ABANDONNÉE le 02/11**. Les tâches ne peuvent pas la mettre à jour et le QG la
  remplace. Ne la touche pas et n'en fais jamais une alerte.
- Google Sheet (spreadsheetId 1YOZOKiZslJRvTt3Qzekn7JD3qrJvBn6urOq-1ORWoe0, onglet Videos), plus récent en haut :
  `insert_dimension` ROWS 1→2 (sheetId 0, inheritFromBefore false), `update_values` `Videos!A2:P2` (N°xx | date | titre |
  sujet | légende + hashtags | vide | hook | sources | « À contrôler » (le manager passe à « À publier » après son contrôle) | notes | K à N vides (remplies par la tâche de nuit) | durée en
  secondes | mot-clé), puis `update_formulas` `Videos!F2` :
  `=HYPERLINK("https://claude.ai/artifact/7byaSuEjPnhcQQnQeT3sbb";"Ouvrir N°<xx>")`. Ne touche jamais aux autres lignes.
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

## 8 quater. Page de liens (levraichiffre.github.io) : RIEN À FAIRE (02/11)
La page est tenue à jour chaque nuit par la tâche « Stats et liens » à partir du Google Sheet : les 3 dernières vidéos
**publiées** et un chiffre clé sourcé par vidéo (tiré de la légende E et des sources H). Ton seul travail : une légende et
des sources exactes dans le Sheet (étape 8). Ne clone pas la page et ne pousse rien dedans (deux écrivains = conflits ;
c'est ce qui l'a figée sur la N°06 du 01/11 au 02/11).

## 8 quinquies. Studio (dépôt privé) : archiver la vidéo
Le Studio (`/home/claude/studio`, cloné à l'étape 0 bis) garde tout pour nous : vidéos, couvertures, carrousels, fiches, librairie.
1. `videos/N<xx>/` : `video.mp4` compressée (`ffmpeg -i <rendu> -vf scale=720:-2 -c:v libx264 -preset veryfast -crf 28
   -c:a aac -b:a 96k -movflags +faststart`, moins de 15 Mo, sinon crf 32), `couverture.jpg` (qualité 85), `carrousel/C<xx>-NN.jpg`
   (qualité 85), `plan.js` (le plan de la vidéo, réutilisable), `agents/` (tous les verdicts, copie de `$P/agents/`), et `fiche.json` aux MÊMES champs que `videos/N06/fiche.json` (statut « À contrôler », stats vides,
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
**Avant CHAQUE push, dans les deux dépôts : `git pull --rebase`** (le manager et l'atelier poussent aussi pendant la journée).
`git -C $LVC_REPO add -A && git commit -m "N°xx · sujet" && git push` (le dépôt est attaché avec `add_repo`, access push).
Ne pousse que `historique/` et les fichiers du kit modifiés, jamais `node_modules`, `.env`, vidéos, voix ni rendus.

## 11. Livraison finale : DÉPÔT AU QG (pas d'envoi direct à Thomas)
- **Qualité (décision du 02/11, Thomas télécharge depuis le QG pour publier)** : JAMAIS de réduction en 720p pour le QG.
  Vidéo = `$P/livrables/N<xx>.mp4` de `08-livrables.sh` telle quelle (1080×1920, 19 Mo maximum) ; couverture = le JPEG
  1080×1920 (qualité 90) ; slides du carrousel = les PNG convertis en JPEG pleine taille (qualité 90). Seule l'archive du
  Studio (8 quinquies) est réduite en 720p.
- Suis la section « Livraison au QG » de `ATELIER.md`, puis le point (d) de la consigne de la tâche (fiche `videos/N<xx>`,
  ligne de journal, état du réalisateur). Le manager contrôle la vidéo et la passe « À publier ».
- SendUserFile seulement si le QG reste injoignable après 2 essais, avec la mention « QG injoignable ».
- **Étapes BLOQUANTES** (si l'une échoue deux fois → « En cas de problème » d'ATELIER.md : alerte dans le chat, réveil du
  manager, « ⚠ PROBLÈME » en tête du message final) : voix, contrôles `verifier.py`, rendu, livraison au QG, fiche
  `videos/N<xx>`. **Toutes les autres** (page de liens, Studio, Sheet, sujets.md, historique) : une ligne de journal niveau
  « alerte », on continue, pas de message d'alerte ni de réveil.
