---
version: 1
name: "Le glaçon dans ta poche · charte 9:16 · la frise des années"
description: >
  Charte du film « Pourquoi ton argent perd de la valeur sur ton compte courant » (44,49 s, 1080×1920, 30 i/s), sur la
  voix assets/audio/voix.mp3 (ElevenLabs, version B du script). Style repris du film modèle
  examples/ligne-du-temps-v8 à la demande de Thomas (captures envoyées le 2026-10-29) : papier chaud, encre, terracotta
  réservé aux moments qui comptent, Instrument Sans pour la voix, Space Mono pour la frise, interfaces épurées aux
  ombres douces, mot clé dans une petite boîte terracotta, sous-titre mot par mot. Le temps est une frise des années
  (2021 → 2029) que la caméra longe ; le compte courant est un iPhone posé dessus ; l'argent qui dort est un glaçon.
unit: 1080×1920 (9:16)
principle: "une frise des années, le solde posé dessus, une idée par image, un geste par transition, le glaçon comme fil rouge"
reference: "reference/monde.html (code commun exécutable : kit caméra 3D en 9:16, frise des années, sol, stations, iPhone banque, glaçon, jean, carte placement, relevés, ticket, carte formule, carte de fin, sous-titre, boîte, trait ; source UNIQUE)"

colors:
  paper: "#f6f1e9"             # LE fond du film (monde clair), dégradé très doux vers #efe7dc aux bords
  paper-light: "#fffdf9"       # cartes, écran de l'app
  ink: "#1a1612"               # traits de la frise, textes
  ink-soft: "rgba(26,22,18,.55)"
  canvas: "#0d0b0a"            # sombre : le pivot (séquence 5) seulement
  ink-on-dark: "#f5efe7"
  accent: "#c25b28"            # terracotta : boîte du mot clé, trait des 4 pics, « −2,4 % », le bloc « LE RESTE », le signet rempli
  ice: "#cfe9f4"               # matière du glaçon seulement (dégradé #eef8fc → #bfe0ee, reflets blancs)
  denim: "#3d5a86"             # matière du jean seulement (trame #34507a, surpiqûres #d9a95b)
  wet: "#243b5e"               # la tache mouillée sur le jean

fonts:
  Instrument Sans: { files: ["assets/fonts/InstrumentSans-400.woff2 (400)", "assets/fonts/InstrumentSans-500.woff2 (500)", "assets/fonts/InstrumentSans-600.woff2 (600)", "assets/fonts/InstrumentSans-700.woff2 (700)"] }
  Space Mono: { files: ["assets/fonts/SpaceMono-400.woff2 (400)", "assets/fonts/SpaceMono-700.woff2 (700)"] }

typography:
  subtitle:  { fontFamily: "Instrument Sans", px: 58, weight: 600, lineHeight: 68, tracking: "-0.015em", note: "la phrase de la voix, centrée, haut de bloc y 1196, 2 lignes au plus (bande y 1180 à 1330), 26 signes au plus par ligne ; mot par mot : gris (encre 35 %) puis encre en 0,2 s ; ombre papier légère. Sur le sombre : #f5efe7" }
  type:      { fontFamily: "Instrument Sans", px: 76, weight: 600, lineHeight: 1.14, tracking: "-0.025em", note: "UN moment typographique : le pivot (séquence 5), centré vers y 760 ; pas de sous-titre en bas pendant ce moment" }
  year:      { fontFamily: "Space Mono", px: 220, weight: 700, note: "« 2024 » sur la frise (unités u), mois en 24 u" }
  micro:     { fontFamily: "Space Mono", px: 18, weight: 400, tracking: "0.2em", upper: true, note: "étiquettes (« COMPTE COURANT », « SOURCE : INSEE, AOÛT 2026 », « SI L’INFLATION RESTE À 2,4 % »)" }
  ui:        { fontFamily: "Instrument Sans", px: 24, weight: 500 }
  amount:    { fontFamily: "Space Mono", px: 64, weight: 700, note: "les montants et pourcentages ; « 1 000 € » s'écrit 1<i class=fx-sp></i>000<i class=fx-sp></i>€" }

components:
  frise:
    summary: "Frise des années : une règle fine (3 u, encre 78 %) en Y 600, plan Z 0 ; une année = 1200 u, de janvier à décembre, X(année) = (année − 2021) × 1200 ; graduations de mois pendues sous la ligne, mois en Space Mono 24 u ; l'année (Space Mono 700 220 u) posée au-dessus de la ligne, à gauche du segment, encre 16 % (on la lit sans qu'elle concurrence la station) ; sol de points pâles (Y 0). Code : fxYearSVG, fxBuildRibbon, fxUpdateRibbon, fxDrawFloor."
  camera:
    summary: "Caméra 3D cam(x, y, z, yaw, pitch, roll), focale 1000 px, centre du cadre (540, 960) ; flou + dof(zf, k, max). Caméra 2D cam2(x, y, s) pour le jean, le pivot, la formule, la fin. Dérive permanente, crans, whips (frame.md du modèle, CAMÉRA). Cadrage de référence frise : cam(X, 740, -1300, 2, -3, 0) met la ligne vers y 1090 px, la station debout au-dessus, la bande sous-titre libre."
  station:
    summary: "Objet POSÉ sur la ligne (pied en Y 600, Z -4), face caméra, ombre de contact : fxStand + fxShadow. Positions : iPhone banque (2021, X 700) ; carte « Ouvrir un placement » (2023, X 2900) ; relevés mensuels (2025, X 4800 + 100 m, m = 0 à 11) ; glaçons de la séquence 6 (2026 à 2029, X 6300 + 1200 i)."
  phone:
    look: "iPhone (coque gradient du modèle, 404 × 840, écran #f4f1ec) avec une app bancaire GÉNÉRIQUE (aucune marque) : barre 9:41, « Mes comptes », carte « COMPTE COURANT » et « 1 000,00 € » (Space Mono 700 54), « Solde disponible » ; sous la carte, la puce « EN POUVOIR D’ACHAT » et sa valeur ; liste « Opérations » : « Frais de tenue de compte · 0,00 € », « Courses · −62,40 € », « Salaire · +1 850,00 € »."
  ice-cube:
    look: "glaçon : cube aux angles arrondis (rayon 18 %), dégradé #eef8fc → #bfe0ee, filet blanc, deux reflets, « 1 000 € » gravé dedans en Space Mono 700 bleu acier #3e87b5 ; il fond = il rétrécit (scale) en perdant des gouttes (#cfe9f4)."
  jean:
    look: "jean vu de face, gros plan : denim #3d5a86 avec trame diagonale fine, poche avant en arc, surpiqûres doubles #d9a95b en pointillé, rivet cuivre ; la tache mouillée #243b5e s'étale depuis la poche (ellipse molle)."
  wait-bar:
    look: "barre hachurée du modèle (.fx-wait) posée sous la ligne de la frise, libellé « SUR LE COMPTE COURANT » ; elle se TEND vers la droite par scaleX."
  form-card:
    look: "carte « Ouvrir un placement » (520 × 640) : champs « Profil de risque », « Allocation », « Horizon », « Frais d’entrée », « Arbitrage », « Support », chacun avec une valeur grise illisible en barre ; bouton « Continuer » gris."
  statement:
    look: "relevé mensuel (180 × 220) : micro « JANV. 2025 », « Solde fin de mois », « 1 000 € » (Space Mono 700 30)."
  receipt:
    look: "ticket de caisse (460 × 700) : papier #fffdf9, bord dentelé, Space Mono : « MÊME PANIER », pointillés, « 2021 ........ 1 000,00 € », « 2026 ........ 1 154,00 € », trait, « + 15 % »."
  formula:
    look: "carte formule (900 × 760) : micro « RENDEMENT RÉEL », ligne 1 « ce que rapporte ton argent », signe « − » terracotta, ligne 2 « l’inflation » ; les lignes deviennent « 0 % » et « 2,4 % » (Space Mono 700 120) ; résultat « = −2,4 % par an » (terracotta)."
  split:
    look: "l'iPhone revient ; sa carte de solde se découpe en trois blocs : « BUDGET DU MOIS » (encre), « RÉSERVE DE SÉCURITÉ » (encre 70 %), « LE RESTE » (contour pointillé puis terracotta)."
  end:
    look: "pas de carte de marque : une carte « Enregistrer » (signet qui se remplit de terracotta) et un champ de commentaire « Ajoute un commentaire… » où s'écrit « RÉEL » ; une pastille « ÉPISODE 2 » (Space Mono 700)."
  ink-box:
    look: "boîte terracotta #c25b28, angles nets (3 px), débord 0,14 em, texte papier ; se trace de gauche à droite (scaleX, 0,16 s power3.out), 0 à 2 images avant le mot."
  stroke:
    look: "trait fin terracotta 4 px sous LE mot-pic, se dessine en 0,3 à 0,5 s power2.out ; 4 pics : « acheter », « rendement réel », « tu perds », « travailler »."
  cursor:
    description: "flèche blanche à contour sombre ; elle arrive d'UN mouvement courbe (0,4 s power3.out) et clique directement : pression 0,85 en 0,06 s, onde terracotta."

negative:
  - "9:16 : rien d'important au-dessus de y 168 ni sous y 1330 ; aucun texte sous la colonne d'icônes de droite (x > 940 entre y 700 et 1330)."
  - "La bande y 1180 à 1330 ne porte que la phrase de la voix."
  - "Aucune marque de banque, aucun logo réel : l'app est générique."
  - "Aucun produit d'épargne ou de placement nommé (ni Livret A, ni assurance vie) : contenu éducatif, audience musulmane, pas de produit à intérêts mis en avant."
  - "Chiffres : 2,4 % = inflation sur un an en août 2026 (Insee) ; « 1 154 € » et « 867 € » = calcul à partir des moyennes annuelles Insee 2021 à 2025, à vérifier ; 977, 954, 931 € = projection illustrative, toujours avec la micro « SI L’INFLATION RESTE À 2,4 % »."
  - "Terracotta seulement : boîte du mot clé, 4 traits, « −2,4 % », « LE RESTE », le signet rempli, l'onde du clic."
  - "Pas d'Inter, Space Grotesk, Geist ; pas d'emoji ; pas d'icône dans une pastille ronde ; pas de dégradé violet."
  - "Pas d'easing élastique ni back.out ; pas de boucle de respiration ; curseur sans hésitation."
  - "Pas de dédoublement : le même glaçon, le même iPhone ne sont jamais deux fois à l'écran."
  - "Typographie française : espace insécable avant « : », espace fine avant « ? » et « ! », apostrophe ’, espace fine dans « 1 000 », jamais de tiret cadratin."

fabrication:
  - "Reprend tels quels les BLOQUANTS du modèle (examples/ligne-du-temps-v8/frame.md, fabrication), avec 1080 × 1920 à la place de 1920 × 1080 et le centre de projection en (540, 960)."
  - "Chemins relatifs à la racine du projet : assets/fonts/..."
---

# Le glaçon dans ta poche · charte

Le film raconte le temps qui passe sur un compte courant. Une frise des années, règle fine sur papier chaud, porte le
film : l'iPhone et son solde de 1 000 € y sont posés en 2021, et la caméra longe les années pendant que le pouvoir
d'achat fond. Le gag change d'échelle : le solde gèle, devient un glaçon, tombe dans la poche d'un jean et fond. La
goutte retombe sur la frise : les trois douleurs y sont posées comme des stations. Au pivot, le noir : « Le vrai
chiffre, ce n'est pas ton solde. » La rature devient un ticket de caisse, le ticket devient la carte formule du
rendement réel. Le résultat « −2,4 % » retombe sur la frise, où quatre glaçons de plus en plus petits riment avec le
gag. L'iPhone revient, son solde se découpe en trois blocs, et « le reste » part vers les années suivantes. Fin :
enregistrer, écrire « RÉEL ».

## CADRAGES DE RÉFÉRENCE (9:16)

- Frise : cam(X, 740, -1300, 2, -3, 0), dof(1300, 8, 16) : ligne vers y 1090 px, station entre y 520 et 1090.
- Gros plan app : cam(700 + 0, 980, -620, 0, -2, 0) : l'écran de l'iPhone remplit 70 % de la largeur.
- Jean (2D) : cam2(540, 900, 1) gros plan poche ; cam2(540, 1100, 0.55) le jean entier.
- Pivot (2D, sombre) : texte centré y 700 à 860, ticket qui naît de la rature.
- Formule (2D) : carte centrée y 560 à 1120.

## TEXTE

Sous-titre centré, haut de bloc y 1196, 58 px, 2 lignes au plus, un morceau à la fois, mot par mot ; une mise en
valeur par phrase [boîte : …] ou [trait : …] (4 traits au total) ; un seul moment typographique (le pivot).

## SON

Voix ElevenLabs telle quelle (pas de montage, Thomas a validé la prise). Musique CC0 à choisir à l'étape 5 : tension
de 0 à 15,64, coupée net sur « Mais » (impact grave), élan à partir de « Ça s'appelle » (19,38). Bruitages calés sur
les gestes (liste dans STORYBOARD.md).
