# Les retours de Thomas : le « pourquoi » derrière les règles

> Chaque agent lit ce fichier **en entier** avant de travailler.
> Ce sont les critiques que Thomas a faites sur les vraies vidéos, avec la raison et ce qu'il faut vérifier.
> Une règle de DA.md sans son pourquoi s'applique mal ; ici, il y a le pourquoi.
> Ajoute un retour (daté) à chaque nouvelle critique de Thomas.

## Ce qui marche (à reproduire)
- **N°05 « salaire médian »** : la meilleure vidéo, sur TikTok, Instagram et YouTube.
  - Pourquoi : un chiffre que tout le monde veut comparer au sien (« et moi, je suis où ? »), des données qui **bougent** (barres, vague, curseur) et une caméra qui se déplace à gauche et à droite.
  - À reproduire : le spectateur **se compare**.
- **N°08 « Riche ou classe moyenne ? »** (01/11/2026) : la référence du moteur.
  - Ton conteur (« Tico gagne 2 200 €… son pote Yanis 4 400 »).
  - 3 chiffres seulement.
  - Une question de débat qui oppose deux camps.
  - Le motion design porte l'histoire : chiffres → barres → vague → bulle qui éclate.
- **Les vidéos concurrentes qui marchent** : « Thomas a travaillé 43 ans au SMIC… ». Ce qui accroche : **une personne, une situation, un chiffre**, racontés comme une histoire.

## Ce qui n'a pas marché (à ne jamais refaire)

| Date | Vidéo | Ce que Thomas a dit | Pourquoi c'est grave | Ce qu'on vérifie maintenant |
|---|---|---|---|---|
| 31/10 | N°07 ASPA | « Ils ont pas l'âge » : sujet sur les retraités | La cible sur TikTok a 20-35 ans : elle ne se sent pas concernée, la vidéo ne décolle pas | Stratège : le spectateur de 20-35 ans doit **se reconnaître** dans le personnage |
| 31/10 | N°07 | « Trop de chiffres, j'étais perdu dès le début » (11 chiffres) | Au-delà de 3 chiffres, on décroche dès les 3 premières secondes | Contrôle automatique : 3 chiffres à l'écran au maximum |
| 31/10 | N°07 | « Pendant 15 s, exactement le même angle, la caméra n'a pas bougé » | Une image figée = on swipe | Contrôle automatique : mouvement de caméra dans chaque fenêtre de 3 s |
| 31/10 | N°07 | « On dirait une vidéo animée, plus du motion design » | Le personnage avait pris toute la place, les données ne bougeaient plus | Critique motion : les **données** bougent et se transforment ; Tico est l'invité (25 % maximum) |
| 31/10 | N°07 | « La façon de parler, j'aime pas » ; « les hooks pas bons, le script non plus » | Le ton « prof » ou « pub » ne retient pas : le ton conteur, si | Critique script : une personne + une situation + un chiffre, raconté comme à un pote |
| 30/10 | démo v1 | « Le motion design tourne autour du ticket, c'est juste des apparitions de chiffres » | Faire apparaître un chiffre n'est pas du motion design | Critique motion : au moins 2 **transformations** de données par scène |
| 01/11 | N°08 v1 | Chiffre coupé, superpositions de cartons, personnages qui flottent, pastille sur le carton, sous-titres mélangés | Une vidéo qui paraît bâclée perd la confiance | Contrôles automatiques : textes coupés, chevauchements |
| 01/11 | N°08 | « Le abonne-toi, il est tout petit, faut qu'il soit en beaucoup plus gros, qu'il puisse pas le rater » | Un appel seulement auditif se rate (beaucoup regardent sans le son) | Le moteur affiche un GROS bouton « + Abonne-toi » (presque toute la largeur) avec un doigt qui appuie ; ne le réduis jamais |
| 01/11 | moteur | « Il faut des musiques, au bon moment, comme les bruitages » | La musique porte l'émotion et le rythme ; sans elle la vidéo paraît vide | `PLAN.musique` obligatoire (contrôle), avec son temps fort calé sur le chiffre choc et un silence avant la révélation |
| 01/11 23 h | N°08 + test | « Ça fait plus vidéo que motion design. C'est la caméra qui bouge, mais le fond, les images, en soi, ça bouge pas vraiment. La caméra est censée SUIVRE. » | Un décor fixe parcouru par la caméra = une vidéo animée, pas du motion design | Règle d'or 1 : les objets agissent, la caméra suit. Contrôle « l'image agit en permanence » |
| 01/11 23 h | N°08 + test | « En motion design t'es jamais sur le même plan, à chaque seconde le plan change, pam pam pam ; entre chaque plan, des transitions qui font que la caméra le suit » (exemple : Tico tombe, la caméra le suit) | Un seul long plan endort l'œil | Règle d'or 2 : nouveau plan toutes les 1 à 3 s, transitions par l'action. Contrôle « nouveau plan » |
| 01/11 23 h | toutes | « Pourquoi toutes les vidéos doivent se ressembler ? Les graphiques qui montent… Chaque vidéo doit être unique » | Le moteur à scènes toutes faites recopiait la N°05 (barres) | Règle d'or 3 : chaque vidéo invente son monde (scène `monde`), visuels interdits s'ils sont dans les 5 dernières vidéos. Contrôle « monde nouveau » |
| 01/11 | tâches | « On améliore le prompt mais les vidéos sont pas meilleures, à chaque fois un truc qui respecte pas » | Les règles écrites s'oublient | D'où le moteur, les contrôles en code et les agents relecteurs |
| 30/10 | — | « J'aime pas le prénom Julie » | Choix de Thomas | Jamais « Julie ». Tico est fixe ; les autres prénoms varient (Yanis, Karim, Inès, Lucas, Sarah…) |

## Les décisions de Thomas (définitives)
- **« Motion design en premier. En premier. »** Tico est l'invité.
- **« Notre DA, on va pas la changer, même plus tard. »**
- **La question de débat est voulue** (« Tu trouves ça juste ? »). La page ne donne **jamais son propre avis** politique, mais elle fait débattre.
- **Priorités** : partages et commentaires d'abord, puis abonnements, puis likes.
- **Exactement 2 appels dits à voix haute** : « abonne-toi » au milieu, puis une question et/ou un partage ciblé à la fin.
- **Voix** : ElevenLabs v4, Paul K, stabilité « Creative ». Ton conteur, posé.
- **Musique** : niveau et calage validés par Thomas sur la N°08 v3 (01/11) : morceau CC0 très bas, baissé sous la voix, temps fort sur le chiffre choc, silence avant la révélation. Ne change pas les niveaux du moteur.
- **Garder le rythme de publication** : 2 vidéos par jour. Une vidéo moyenne publiée vaut mieux qu'aucune vidéo.
- **VALIDÉ PAR THOMAS (02/11, 7 h 19) : « Voilà, ça c'est une vraie vidéo motion design ! »** sur la N°08 « gare des salaires » (`moteur/mondes/gare-des-salaires.plan.js`). C'est le niveau minimum à atteindre : un monde inventé pour le sujet, des objets qui agissent (billet qui se déroule, guillotine, train qui roule), la caméra qui les suit, un plan toutes les 1 à 2 s. Inspire-toi de la technique, jamais du monde (règle d'or 3).
- **Thomas aime (02/11)** : « tout est motion design », « on change souvent de plan », et **les écrans plein écran « MAIS ATTENDS. » et « RARES. »** (scène `mot`, lettres qui tombent, mot qui vit). → Mets 1 ou 2 plans `mot` par vidéo, sur les tournants (retournement, chiffre rare, relance), jamais plus de 2 pour qu'ils gardent leur effet.
- **Thomas (02/11) : « quand les motion sont nouveaux, c'est bien. »** La nouveauté visuelle compte autant que le rythme : nouveau monde, nouveaux gestes, nouvelle façon de faire entrer les mots (`entree` de la scène `mot`). Ce qui a déjà servi dans les 2-5 dernières vidéos se remplace.
