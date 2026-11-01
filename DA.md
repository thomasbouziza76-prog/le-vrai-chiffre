# DA.md · La direction artistique de « Le Vrai Chiffre »

> **À lire en PREMIER, avant tout autre fichier.**
> Validée par Thomas le 2026-11-01. Si un autre fichier contredit celui-ci, **c'est DA.md qui gagne**.
> **Cette DA est définitive** (décision de Thomas) : on ne la change pas, même plus tard. On améliore l'exécution, jamais le style.
> **Mise à jour du 2026-11-01 soir (décision de Thomas) : MOTION DESIGN EN PREMIER, Tico est l'INVITÉ.** Leçon de la N°07 :
> avec Tico au centre, la vidéo devenait un dessin animé sur une scène fixe, sans motion design.

---

## 1. La DA en une phrase

**Du motion design d'abord (caméra qui voyage, chiffres et formes qui se transforment, texte qui bouge), avec Tico en invité qui réagit aux moments clés.**

---

## 2. Les 3 couches, à l'écran en même temps, tout le temps

| Couche | Ce que c'est | Ce qu'elle fait |
|---|---|---|
| **1. Le motion design (le personnage principal, ~75 % de l'image)** | La caméra, le chiffre, le graphique, la courbe, la grille, le compteur, les formes | La **caméra voyage** (zoom, panoramique, plongée, rotation) et les données **se transforment** : se fissurent, fondent en courbe, se coupent en deux, se remplissent, roulent. Jamais une simple apparition, jamais un plan fixe. |
| **2. Le texte** | Le carton (2 lignes max) | Il **arrive mot par mot** (chaque mot monte avec une petite rotation) ; le mot clé reçoit un encadré terracotta qui pousse depuis la gauche. |
| **3. Tico (l'invité, 25 % de l'image maximum)** | La mascotte (ticket de caisse avec yeux, bras, jambes) | Il **subit et commente** le motion design aux moments clés : se fait écraser par le chiffre, glisse sur la courbe, sursaute au choc, pose la question de la fin. Il ne porte jamais un plan à lui seul. |

**Le test** : à n'importe quelle seconde, mets la vidéo en pause : la CAMÉRA ou les DONNÉES sont en train de bouger. Si seul Tico bouge, c'est raté.

---

## 3. Les règles chiffrées (toutes obligatoires)

| # | Règle | Mesure |
|---|---|---|
| 1 | Caméra | **Un mouvement de caméra au moins toutes les 3 s** (zoom ≥ 15 %, panoramique, plongée, rotation, ou coupe vers un NOUVEAU cadrage). **Jamais le même cadrage plus de 3 s.** Poussée sur le chiffre clé, petit tremblement sur les impacts |
| 2 | Tico, l'invité | **Au minimum aux 4 moments clés** (hook, chiffre choc, retournement ou relance, fin), avec son bruitage ; il peut réagir entre-temps. **25 % de l'image maximum**, jamais le sujet principal d'un plan |
| 3 | Les données se transforment | **Au moins 2 transformations par scène** (scène = une séquence du STORYBOARD ; liste section 5) |
| 4 | Transitions avec une cause | L'objet d'une scène **devient** l'objet de la suivante (le chiffre éclate → les morceaux deviennent des barres → les barres fondent en courbe) |
| 5 | 3D stylisée | **Au moins 1 vrai moment 3D par vidéo** (barres extrudées + caméra qui tourne, ticket qui se retourne, avion en papier en profondeur). **3D réaliste interdite** |
| 6 | Rythme | Un changement de motion design (mouvement de caméra OU transformation de données) toutes les 2 à 3 s, comme la N°05 |
| 7 | Fond vivant | Jamais un aplat mort : quadrillage qui apparaît, symboles € et % qui dérivent très lentement |
| 8 | Écran rempli | Jamais plus de 40 % de vide ; tout chiffre entièrement dans le cadre (marge ≥ 80 px). Sous le sol (zone de l'interface TikTok, y > 1330) : pas de texte, mais du DÉCOR sans texte (sol, ombres, objets posés, reflets) pour que l'image ne paraisse jamais vide en bas |
| 9 | Son | Chaque geste a son bruitage (`SONS.md`) ; jamais 3 s sans un son d'action ; aucun bruitage plus fort que la voix |
| 10 | Image 0 | Carton du hook de 3 à 6 mots lisible, le chiffre et la caméra bougent déjà (Tico peut être là), un son ET la voix commencent à 0,0 s |
| 11 | Chiffres | UN chiffre principal + 2 secondaires maximum (`SCRIPT-HOOKS.md`) |

---

## 4. Le Ticket

### Toujours le même dessin
- **Ne redessine jamais le Ticket.** Utilise le module `ticket.js` :
  - dans le Studio : `/home/claude/studio/charte/ticket.js` (version de référence) ;
  - copie de secours dans ce dépôt : `exemples/ticket.js`.
- Appel : `Ticket.svg({x, y, scale, mouth, brows, look, armL, armR, footL, footR, sx, sy, rot, ...})` (options en tête du fichier).
- **Animations prêtes à l'emploi** : `motion/ticket-*` dans le Studio (marche, course, saut, pousser, tirer, se faire écraser, avion en papier 3D, se retourner comme une carte…). Liste et usage : `motion/catalogue.json` (`"type": "ticket"`).

### Son nom : **Tico**
- La mascotte s'appelle **Tico**, toujours, dans toutes les vidéos (choix de Thomas du 2026-11-01). Un nom fixe = on le
  reconnaît, on s'y attache, les commentaires le citent.
- À chaque vidéo, Tico **joue un rôle** différent, avec son cas chiffré : « Imaginons que Tico gagne 1 800 € net… ». Son
  âge et son salaire changent selon l'histoire, comme un personnage de dessin animé.
- Les **autres personnages** (le pote, le patron, le géant, les parents) ont des prénoms variés et courants en France,
  différents d'une vidéo à l'autre. Jamais « Julie ». Un adversaire-institution porte son étiquette (« L'ÉTAT »,
  « LA BANQUE »), pas de prénom.
- Dans ces fichiers, « le Ticket » = Tico (nom technique du dessin). Dans la voix, les cartons, les sous-titres, les
  légendes, la couverture et le carrousel, on dit toujours « Tico ».

### Son rôle
- Tico est **l'invité** du motion design : il réagit, subit, commente. Il représente **toi / ton argent** : la voix dit « tu », Tico le vit.
- Il a souvent un **adversaire** : un Ticket géant (les très gros salaires, la banque, l'inflation, l'État…), un tampon, un chiffre qui lui tombe dessus. Même dessin, plus grand, avec son montant.
- Physique de dessin animé : anticipation, écrasement et étirement, rebonds, sueur, sursauts.
- Taille : 25 % de l'image au maximum ; lisible (yeux visibles) mais jamais le sujet principal du plan.

---

## 5. Les transformations de données (en prendre au moins 2 par scène)

| Transformation | Exemple |
|---|---|
| **Fissure / éclatement** | Le gros chiffre se fissure sur le mot qui dérange, puis éclate en morceaux |
| **Barres 3D → courbe** | Les barres extrudées fondent en une courbe continue |
| **Coupe en deux** | Une ligne (médiane, seuil) coupe la courbe ; une moitié se remplit en terracotta, « 50 % » compte |
| **Compteur** | Le chiffre roule d'une valeur à l'autre (2 733 → 2 190), calculé dans le code |
| **Drapeau qui glisse** | Un repère (moyenne, prix, taux) est tiré ou poussé le long d'un axe |
| **Grille de 100** | 100 tuiles, une partie change de couleur |
| **Zoom sur l'indicateur** | Une case grossit depuis sa vraie place |
| **Remplissage / vidange** | Une jauge, un bocal, une barre qui se vide pendant que le Ticket s'y accroche |
| **Pile à ressort** | Des cartes (dépenses, offres) tombent et s'empilent sur le Ticket |

Pièces prêtes : `motion/` du Studio (`catalogue.json`, champ `quand`).

---

## 6. La vidéo de référence (à regarder AVANT de faire le storyboard)

- Code : `exemples/ticket-salaire-median-v2.html` (16 s, fonction `seek(t)`).
- Images clés : `exemples/ticket-salaire-median-v2-planche.jpg`.
- Vidéo : Studio, `exemples/ticket-salaire-median-v2.mp4`.
- **On s'inspire du NIVEAU de mouvement et de la façon dont les 3 couches s'emboîtent. On ne copie jamais le contenu.**
- La référence est une démo SANS voix : une vraie vidéo ajoute la voix (dès 0,0 s) et le sous-titre en bas (voir PIPELINE, « Les deux textes à l'écran »).
- **Défauts connus de la référence, à ne pas reproduire** : à 7,6 s et 10,2 s le Ticket cache l'étiquette « MOYENNE 2 733 € » ;
  le montant du géant est coupé au bord droit ; vers 5,4 s la barre du 1 % touche le carton de texte.

| Temps | Données (couche 1) | Ticket (couche 2) | Texte (couche 3) |
|---|---|---|---|
| 0–2,4 s | « 2 733 € » énorme, se fissure | Arrive en marchant, voit le chiffre, sursaute | « Ce chiffre te **ment.** » tamponné |
| 2,4–5,6 s | Le chiffre éclate ; barres 3D qui montent, caméra qui tourne ; la barre du 1 % jaillit | Soulevé par une barre comme un ascenseur, saute de barre en barre | « Range les salaires… » mot par mot |
| 5,6–7 s | Les barres fondent en courbe (calée sur les vrais chiffres Insee) | Porté par la surface, puis toboggan sur la courbe | « Relie-les : voilà la **courbe**… » |
| 7–9 s | Le géant tombe sur la queue de la courbe, qui tremble ; le drapeau MOYENNE glisse à 2 733 € | Catapulté, retombe, fâché | « Ces gros salaires tirent la **moyenne.** » |
| 9–12 s | Le drapeau ne bouge pas | Pousse de toutes ses forces, glisse, tombe, a une idée | « Tu peux pousser : elle ne **bouge pas.** » |
| 12–12,6 s | Drapeau MÉDIANE planté ; la moitié gauche se remplit, « 50 % » compte | Sursaute, puis fier | « Le vrai milieu, c'est la **médiane.** » |
| 12,7–16 s | Compteur 2 733 → 2 190 € ; « Le vrai chiffre. » | S'assoit essoufflé, se relève et montre le chiffre | Source en petit |

---

## 7. Le texte dans cette DA (voix + écran)

- **La voix raconte, le Ticket joue, l'écran résume.** Jamais la voix qui lit le texte d'écran mot pour mot.
- **Écris le script en pensant aux gags** : chaque phrase doit pouvoir être JOUÉE par le Ticket ou par les données. Si une phrase ne donne aucune image, réécris-la.
- **Ton** : complice, un peu taquin envers le chiffre ou l'adversaire, jamais envers le spectateur. Le chiffre « ment », la moyenne « ne bouge pas », le crédit « tamponne ».
- **Phrases courtes** : une idée par phrase, souvent avec un verbe d'action (pousser, tirer, tomber, couper, glisser, écraser).
- **Carton (texte d'écran du haut)** : 2 lignes maximum, 3 à 7 mots par ligne (3 à 6 mots à l'image 0), **un seul mot clé encadré** par carton. Le sous-titre du bas transcrit la voix ; le carton la résume.
- Exemples dans la DA :
  - « Ce chiffre te **ment.** »
  - « Ces gros salaires tirent la **moyenne.** »
  - « Tu peux pousser : elle ne **bouge pas.** »
  - « Le vrai milieu, c'est la **médiane.** »
- Les règles de `SCRIPT-HOOKS.md` (hook, les deux appels de la section 6, formats, mots) restent valables ; cette section dit **comment** les écrire.
- La fin pose une question qui fait réagir (« Tu trouves ça juste ? ») et/ou demande un partage ciblé : Tico la « pose » à l'écran (il se tourne vers nous, hausse les épaules).

---

## 8. Interdits

- Le Ticket seul qui bouge pendant que les données et la caméra restent figées (erreurs de la démo v1 et de la N°07).
- Le même cadrage plus de 3 s, une vidéo qui ressemble à un dessin animé sur une scène fixe.
- Un chiffre ou un graphique qui « apparaît » sans se transformer.
- Le Ticket redessiné à la main (il changerait de tête).
- La 3D réaliste, les images générées par IA, les photos.
- Le Ticket qui cache un chiffre ou un texte à lire.
- Un logo ou le nom de la chaîne en signature. (La phrase « Le vrai chiffre. » est permise quand elle conclut la révélation, comme dans la référence.)

---

## 9. Contrôle final DA (à cocher sur la planche avant de dire que c'est fini)

- [ ] Jamais le même cadrage plus de 3 s (vérifie la planche : deux images à 3 s d'écart ne doivent jamais avoir le même cadrage).
- [ ] Tico aux 4 moments clés, jamais plus de 25 % de l'image, jamais seul à bouger.
- [ ] UN chiffre principal + 2 secondaires maximum.
- [ ] Chaque scène a au moins 2 transformations de données.
- [ ] Chaque transition a une cause (l'objet devient le suivant).
- [ ] Au moins un moment 3D stylisée.
- [ ] Texte d'écran mot par mot, un mot clé encadré, 2 lignes max.
- [ ] Pause à n'importe quelle seconde : données ET Ticket en mouvement.
- [ ] Aucun chiffre caché par le Ticket ; aucun écran à moitié vide.
