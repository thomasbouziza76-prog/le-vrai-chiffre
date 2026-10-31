---
format: 1080x1920
duration: 44.49s
message: "Ton argent qui dort sur ton compte courant perd 2,4 % de pouvoir d'achat par an : regarde le rendement réel, pas le solde."
arc: Accroche → Gag → Douleur (3) → Pivot → Explication → Base → CTA
audience: salariés de 20 à 35 ans en France, audience musulmane, qui veulent mieux gérer leur argent
mode: collaborative
captions: disabled
voice: "assets/audio/voix.mp3 (44.49 s, ElevenLabs, prise validée, sans montage) ; minutage mot par mot dans assets/audio/voix-mots-timings.json"
direction: "La frise des années, dans le style du film modèle examples/ligne-du-temps-v8 (choix de Thomas, 2026-10-29), recomposée en 9:16"
patterns: ../patterns/STORYBOARD-CRAFT.md, ../patterns/PATTERNS.md
---

## Video direction

- **Un seul objet porte le film** : la frise des années de frame.md (2021 → 2029), règle fine sur papier chaud, que la caméra longe ; le compte courant est un iPhone posé dessus ; l'argent qui dort est un glaçon. Code commun : `reference/monde.html` (22 images clés : `pose("K01")` à `pose("K22")`).
- **9:16** : tout ce qui se lit entre y 168 et 1330 ; la bande y 1180 à 1330 ne porte que la phrase de la voix ; rien de lisible sous la colonne d'icônes de droite.
- **Coutures invisibles** : toutes les séquences s'enchaînent en `cut`, la continuité est faite par un objet ou un geste de caméra ; `handoff_out` de N = `handoff_in` de N+1, mot pour mot. Une seule coupe franche : 15.64, « Mais » (pivot sur le noir).
- **Texte** : la phrase de la voix en sous-titre centré (58 px, 2 lignes au plus), mot par mot ; un mot clé par phrase en [boîte : …] terracotta ; 4 pics en [trait : …] ; un seul moment typographique (le pivot). Sur le jean : sous-titre clair (.fx-sub.dark).
- **Chiffres** : 2,4 % (Insee, août 2026, sur un an) ; 867 € et 1 154 € (calcul à partir des moyennes annuelles Insee 2021 à 2025, à vérifier avant export) ; 977, 954, 931 € (projection illustrative, toujours avec « SI L'INFLATION RESTE À 2,4 % »).
- **Négatifs** : aucune banque ni produit d'épargne nommé ; diaporama ; objet dédoublé ; symbole abstrait ; curseur qui hésite.

**MONDE**
- Acte 1 (0 à 15.64) : frise des années ; stations : iPhone banque (2021 X 700 puis glisse avec la caméra jusqu'en 2026 X 6700), barre « SUR LE COMPTE COURANT » (posée sur la ligne de 2021 à 2024), carte « Ouvrir un placement » (2023 X 2950), relevés mensuels (2025, un par mois) ; monde B 2D : le jean (gag).
- Pivot (15.64 à 19.38) : le noir #0d0b0a, la phrase, la rature qui devient un ticket de caisse.
- Acte 2 (19.38 à 40.65) : papier nu (carte formule), retour sur la frise (glaçons de 2026 à 2029, le bloc « LE RESTE »), l'iPhone en gros plan.
- Fin (40.65 à 44.49) : papier, carte « Enregistrer », commentaire « RÉEL ».
- Couleurs de rôle : encre = le monde ; terracotta = mot clé, pics, « −2,4 % », « LE RESTE », signet ; bleu glace = le glaçon ; denim = le jean.

**SIGNATURES**
- Mécanisme 1, « posé sur la frise » : un objet arrive en volant (×1,15, flou 8 → net en 0,16 s expo.out) et se pose sur la ligne avec son ombre : 0.00 iPhone, 8.90 barre, 11.16 carte placement, 13.24 relevés, 32.70 glaçons, 39.30 bloc « LE RESTE » (6 fois).
- Mécanisme 2, « le glaçon » : 3.64 le solde gèle, 5.20 il fond, 32.70 un glaçon par année, de plus en plus petit (rime).
- Rimes : l'iPhone de l'accroche revient à 33.68 ; le glaçon du gag revient sur la frise à 32.70.

**PARTITION CAMÉRA** (temps globaux) : 0.00 dérive sur l'iPhone · 1.16 recul et travelling vers 2026 (l'iPhone glisse avec la caméra) · 2.33 poussée sur les opérations · 3.64 le glaçon jaillit vers la caméra · 4.10 tilt vers le bas jusqu'à la poche · 5.09 zoom macro lent · 6.24 dézoom rapide sur le jean entier · 8.40 la goutte tombe hors cadre (vecteur bas) · 8.77 la goutte retombe sur la frise · 11.00 travelling 2021 → 2023 · 13.10 travelling vers 2025, la caméra tourne (yaw 30°) le long des relevés · 15.64 coupe au noir · 17.92 la rature devient le ticket · 19.38 le ticket grandit et devient la carte formule (objet → monde) · 30.66 recul, « −2,4 % » tombe sur la frise · 33.68 le glaçon du premier plan devient l'iPhone en gros plan · 38.54 le bloc sort de l'iPhone, la caméra le suit sur la frise · 40.65 le bloc devient le signet (morph).

**VOIX** : silences de plus de 0,4 s, chacun écrit comme un plan avec son action : 4.67 à 5.09 (le glaçon s'enfonce) · 8.13 à 8.77 (la goutte tombe) · 10.62 à 11.16 (la carte placement arrive) · 12.74 à 13.14 (la caméra file vers 2025) · 24.01 à 24.41 (la ligne 1 de la formule s'allume) · 37.92 à 38.41 (le bloc « LE RESTE » se remplit) · 38.84 à 39.25 (la pause du « reste… » : le bloc sort de l'iPhone).

**COUPES** (voix narrative, quota 0 à 4) : une seule, 15.64 · « Mais » · changement d'acte (le problème vers la compréhension).

**RYTHME** : accroche et gag (0 à 8.77) 7 plans = 8 plans / 10 s ; douleur 3 plans ; pivot 2 ; explication et fin (19.38 à 44.49) 10 plans = 4 plans / 10 s.

**SON** (CC0, choisi à l'étape 5) : musique de tension de 0 à 15.64, riser de 13.10 à 15.64, impact grave sur « Mais » (15.64), silence jusqu'à 19.38 ; musique d'élan sur « Ça s'appelle » (19.38). Bruitages : pop 0.00 · whoosh 1.16 · clic doux 2.70 · cristal (glaçon) 3.64 · frottement de tissu 4.30 · UNE goutte 5.60 (le gag sonore : tout le reste se tait) · squish 7.70 · goutte qui touche la ligne 8.77 · pop 11.16 · pages 13.24 à 14.40 · impact 15.64 · trait de feutre 17.22 · ticket qui se déroule 17.92 · frappe 20.38 · tic-tic de compteur 27.92 à 29.48 · note grave 31.28 · tintements de glaçons 32.70 à 33.30 · snap 35.52 et 36.80 · whoosh 39.25 · clic + pop 40.65 · frappe 42.46 · whoosh doux 43.50.

## Frame 1 : Le solde

- scene: L'iPhone et son solde de 1 000 € posés sur la frise en 2021 ; la caméra recule et longe les années, l'iPhone glisse avec elle ; son pouvoir d'achat fond de 1 000 à 867 € ; en 2026, gros plan sur « Frais de tenue de compte : 0,00 € »
- duration: 3.30s
- transition_in: cut
- status: animated
- src: compositions/frames/01-solde.html
- type: hook
- blueprint: spatial-pan-stations (Adapt)
- focal: l'iPhone et son solde, puis la ligne des frais
- rules: depth-of-field-blur, counting-dynamic-scale
- voiceover: "Ton compte courant te fait perdre de l'argent. Même sans frais."
- world: light
- handoff_in: aucun (ouverture) ; première image = K01 : papier, frise 2020 à 2022, gxCam(700, 1070, 1.25), l'iPhone posé au pied X 700, solde « 1 000,00 € » lisible
- handoff_out: à 3.30 : gxCam(6700, 1330, 1.8), l'iPhone en gros plan, le solde qui se couvre de givre (opacité du givre 0,4), sous-titre sorti

Word cues: Ton@0.00 compte@0.22 courant@0.48 te@0.80 fait@1.00 perdre@1.16 de@1.42 l'argent@1.64 Même@2.33 sans@2.48 frais@2.70

Scene 1 (0.00 à 1.16 s) : P1, l'accroche
  TEXTE ÉCRAN : « Ton compte courant te fait / [boîte : perdre] de l'argent. »
  ÉTAPES : 0.00 l'iPhone est déjà là (vignette = accroche) ; 0.10 « COMPTE COURANT » s'imprime ; 0.22 le solde « 1 000,00 € » passe de gris à encre ; 0.80 l'ombre du solde frémit.
  PISTE CAMÉRA : dérive z +40 u/s (poussée lente).
  OBJET-PONT ET VECTEUR : l'iPhone, qui glisse avec la caméra.
  SON : pop à 0.00.
  IMAGE CLÉ : 0.45 (K01) : l'iPhone centré sur la frise de 2021, « 1 000,00 € » en gros.

Scene 2 (1.16 à 2.33 s) : P2, les années défilent
  ÉTAPES : 1.16 sur « perdre » : la puce « EN POUVOIR D'ACHAT » sort sous le solde et roule 1 000 → 913 € (2023) → 867 € (2026) ; 1.40 « 2022 », « 2023 », « 2024 » défilent derrière ; le solde, lui, ne bouge pas.
  PISTE CAMÉRA : 1.16 recul 0,4 s power3.out jusqu'à gxCam(2780, 1080, 1.05), puis travelling +3600 u/s vers 2026, l'iPhone glisse avec la caméra.
  SON : whoosh 1.16.
  IMAGE CLÉ : 1.60 (K02) : l'iPhone sur 2023, la puce « 913 € ».

Scene 3 (2.33 à 3.30 s) : P3, même sans frais
  TEXTE ÉCRAN : « Même [boîte : sans frais.] »
  ÉTAPES : 2.33 poussée sur les opérations ; 2.70 la ligne « Frais de tenue de compte · 0,00 € » s'encadre d'encre ; 3.00 le givre commence sur le solde.
  PISTE CAMÉRA : 2.33 cran 0,3 s expo.inOut vers gxCam(6700, 1366, 2.0).
  SON : clic doux 2.70.
  IMAGE CLÉ : 2.80 (K03) : l'écran en gros plan, « ≈ 867 € » en pouvoir d'achat, la ligne « 0,00 € » encadrée.

## Frame 2 : Le glaçon

- scene: Le solde gèle et jaillit en glaçon ; il tombe dans la poche avant d'un jean ; gros plan, il fond sans bruit, une seule goutte ; recul : le jean entier, une grosse tache ; une goutte tombe de l'ourlet
- duration: 5.47s
- transition_in: cut
- status: animated
- src: compositions/frames/02-glacon.html
- type: hook
- blueprint: camera-journey (Adapt)
- focal: le glaçon, puis la poche, puis la tache
- rules: scale-swap-transition, depth-of-field-blur
- voiceover: "C'est un glaçon dans ta poche... il fond sans bruit. Et à la fin, t'as juste le pantalon mouillé."
- world: light
- handoff_in: à 3.30 : gxCam(6700, 1330, 1.8), l'iPhone en gros plan, le solde qui se couvre de givre (opacité du givre 0,4), sous-titre sorti
- handoff_out: à 8.77 : papier vide sous le jean qui sort par le haut (y −400 px/s), une goutte en chute au centre du cadre (x 540, y 900, 2400 px/s vers le bas, flou vertical 6 px)

Word cues: C'est@3.30 un@3.48 glaçon@3.64 dans@3.96 ta@4.14 poche@4.30 il@5.09 fond@5.20 sans@5.42 bruit@5.60 Et@6.24 à@6.32 la@6.44 fin@6.50 t'as@6.96 juste@7.02 le@7.18 pantalon@7.38 mouillé@7.70

Scene 1 (3.30 à 4.30 s) : P4, le glaçon
  TEXTE ÉCRAN : « C'est un [boîte : glaçon] / dans ta poche… »
  ÉTAPES : 3.30 le givre recouvre le solde ; 3.64 le solde se détache et devient un glaçon « 1 000 € » qui jaillit vers la caméra (×3 flou 12 → ×1 net en 0,25 s expo.out), l'iPhone se floute derrière.
  OBJET-PONT ET VECTEUR : le glaçon tombe vers le bas (tilt) dans le jean.
  SON : cristal 3.64.
  IMAGE CLÉ : 3.80 (K04).

Scene 2 (4.30 à 5.09 s) : P5, la poche
  ÉTAPES : 4.10 tilt vers le bas, le jean entre par le bas ; 4.30 le glaçon plonge dans la poche, le panneau avant de la poche passe devant lui ; 4.67 à 5.09 silence : il s'enfonce de 20 px.
  SON : frottement de tissu 4.30.
  IMAGE CLÉ : 4.55 (K05).

Scene 3 (5.09 à 6.24 s) : P6, il fond sans bruit
  TEXTE ÉCRAN : « il fond sans bruit. » (sous-titre clair sur le denim)
  ÉTAPES : 5.20 le glaçon rétrécit (1 → 0,8), trois gouttes perlent l'une après l'autre (0,2 s d'écart) ; 5.60 une seule goutte tombe ; la tache sombre naît sous la poche.
  PISTE CAMÉRA : zoom macro lent (×1,5 → ×2,2).
  SON : la musique se tait ; UNE goutte à 5.60.
  IMAGE CLÉ : 5.70 (K06).

Scene 4 (6.24 à 8.77 s) : P7, le pantalon mouillé
  TEXTE ÉCRAN : « Et à la fin, t'as juste / le pantalon [boîte : mouillé.] »
  ÉTAPES : 6.24 dézoom rapide (0,5 s power3.out) jusqu'au jean entier ; 7.38 la tache s'étale jusqu'au genou ; 7.70 le jean s'affaisse de 6 px (le gag) ; 8.13 à 8.77 silence : une goutte se détache de l'ourlet.
  SON : squish 7.70.
  IMAGE CLÉ : 7.90 (K07).

## Frame 3 : Les trois douleurs

- scene: La goutte tombe sur la ligne en 2021 et s'étale en barre hachurée « SUR LE COMPTE COURANT » qui court vers 2024 ; en 2023, la carte « Ouvrir un placement » se pose, six champs de jargon ; en 2025, un relevé par mois, tous à 1 000 €, un trait plat relie leurs sommets
- duration: 6.87s
- transition_in: cut
- status: animated
- src: compositions/frames/03-douleurs.html
- type: pain_point
- blueprint: spatial-pan-stations (Adapt)
- focal: la barre, puis la carte placement, puis les relevés
- rules: depth-of-field-blur, waterfall-entry
- voiceover: "Tu laisses tout sur ton compte, au cas où. Placer, ça te paraît compliqué. Et chaque mois, t'as l'impression de stagner."
- world: light
- handoff_in: à 8.77 : papier vide sous le jean qui sort par le haut (y −400 px/s), une goutte en chute au centre du cadre (x 540, y 900, 2400 px/s vers le bas, flou vertical 6 px)
- handoff_out: à 15.64 : la frise de 2025 en caméra tournée (cam x 4600, y 780, z −1100, yaw 30), les 12 relevés posés, le trait plat ; tout est coupé au noir sur « Mais »

Word cues: Tu@8.77 laisses@8.82 tout@9.08 sur@9.24 ton@9.44 compte@9.60 au@10.16 cas@10.30 où@10.42 Placer@11.16 ça@11.72 te@11.86 paraît@11.96 compliqué@12.18 Et@13.14 chaque@13.24 mois@13.46 t'as@13.98 l'impression@14.06 de@14.52 stagner@14.78

Scene 1 (8.77 à 11.16 s) : P8, tout sur le compte
  TEXTE ÉCRAN : « Tu laisses [boîte : tout] / sur ton compte, au cas où. »
  ÉTAPES : 8.77 la goutte touche la ligne en janvier 2021 (éclaboussure 0,1 s) ; 8.90 elle s'étale en barre hachurée qui se tend vers la droite (scaleX, 1,6 s power2.out) ; 10.42 le libellé « SUR LE COMPTE COURANT » s'imprime.
  PISTE CAMÉRA : gxCam(1350, 1060, 0.62), travelling +300 u/s.
  SON : goutte 8.77.
  IMAGE CLÉ : 10.50 (K08).

Scene 2 (11.16 à 13.14 s) : P9, placer, c'est compliqué
  TEXTE ÉCRAN : « Placer, ça te paraît / [boîte : compliqué.] »
  ÉTAPES : 11.16 la carte « Ouvrir un placement » se pose en 2023 (signature 1) ; 11.72 à 12.40 ses six champs s'impriment un par un (0,1 s d'écart), chacun avec un « ? » gris ; 12.18 « Étape 1 sur 6 ».
  PISTE CAMÉRA : 11.00 travelling 0,4 s power3.out vers gxCam(2950, 1080, 0.85).
  SON : pop 11.16.
  IMAGE CLÉ : 12.40 (K09).

Scene 3 (13.14 à 15.64 s) : P10, stagner
  TEXTE ÉCRAN : « Et chaque mois, t'as / l'impression de [boîte : stagner.] »
  ÉTAPES : 13.24 un relevé se pose sur chaque mois de 2025 (0,1 s d'écart), tous « 1 000 € » ; 14.78 un trait pointillé plat relie leurs sommets.
  PISTE CAMÉRA : 13.10 la caméra file vers 2025 et tourne (yaw 0 → 30°, 0,6 s power3.inOut) le long de la rangée.
  SON : pages 13.24 à 14.40 ; riser de 13.10 à 15.64.
  IMAGE CLÉ : 14.95 (K10).

## Frame 4 : Le vrai chiffre

- scene: Coupe au noir ; « Le vrai chiffre, ce n'est pas ton solde. » ; « solde. » se barre ; la rature devient le bord d'un ticket de caisse qui se déroule : même panier, 1 000 € en 2021, 1 154 € en 2026, tes 1 000 € en achètent 87 %
- duration: 3.74s
- transition_in: cut
- status: animated
- src: compositions/frames/04-vrai-chiffre.html
- type: pivot
- blueprint: kinetic-type-beats (Adapt)
- focal: la phrase, puis le ticket
- rules: svg-path-draw, kinetic-beat-slam
- voiceover: "Mais le vrai chiffre, ce n'est pas ton solde. C'est ce qu'il peut acheter."
- world: dark
- handoff_in: coupe franche à 15.64 (le noir)
- handoff_out: à 19.38 : le ticket a grandi jusqu'à 140 % du cadre en 0,65 s (power2.inOut), son papier #fffdf9 remplit l'écran : c'est le fond de la carte formule

Word cues: Mais@15.64 le@15.76 vrai@15.88 chiffre@16.04 ce@16.66 n'est@16.74 pas@16.90 ton@17.04 solde@17.22 C'est@17.92 ce@18.10 qu'il@18.24 peut@18.44 acheter@18.60

Scene 1 (15.64 à 17.92 s) : P11, le pivot
  TEXTE ÉCRAN : moment typographique centré (76 px) : « Le vrai chiffre, / ce n'est pas ton solde. », mot par mot ; pas de sous-titre en bas.
  ÉTAPES : 15.64 noir, silence de la musique ; 17.22 un trait papier barre « solde. » (0,3 s power2.out).
  SON : impact grave 15.64 ; trait de feutre 17.22.
  IMAGE CLÉ : 17.55 (K11).

Scene 2 (17.92 à 19.38 s) : P12, ce qu'il peut acheter
  TEXTE ÉCRAN : sous-titre clair « C'est ce qu'il peut [trait : acheter.] »
  ÉTAPES : 17.92 la phrase monte et s'efface, la rature devient le haut du ticket qui se déroule vers le bas (0,5 s) ; 18.44 « 2026 … 1 154,00 € » s'imprime ; 18.60 « 87 % » arrive de la caméra (×3 flou → net).
  SON : ticket 17.92.
  IMAGE CLÉ : 18.80 (K12).

## Frame 5 : Le rendement réel

- scene: Sur le papier, la carte formule : « Rendement réel » ; « ce que rapporte ton argent », « − », « l'inflation » ; puis les chiffres : 0 % (compte courant), 2,4 % (Insee, août 2026)
- duration: 11.28s
- transition_in: cut
- status: animated
- src: compositions/frames/05-rendement.html
- type: solution
- blueprint: dataviz-countup (Adapt)
- focal: la carte formule et ses deux nombres
- rules: counting-dynamic-scale, discrete-text-sequence
- voiceover: "Ça s'appelle le rendement réel. C'est ce que rapporte ton argent, moins l'inflation. Ton compte courant rapporte zéro. L'inflation, elle, est à deux virgule quatre pour cent sur un an."
- world: light
- handoff_in: à 19.38 : le ticket a grandi jusqu'à 140 % du cadre en 0,65 s (power2.inOut), son papier #fffdf9 remplit l'écran : c'est le fond de la carte formule
- handoff_out: à 30.66 : la carte formule (0 %, −, 2,4 %) centrée, les deux nombres glissent l'un vers l'autre (0,3 s power2.in)

Word cues: Ça@19.38 s'appelle@19.54 le@20.22 rendement@20.38 réel@20.70 C'est@21.48 ce@21.70 que@21.90 rapporte@22.02 ton@22.42 argent@22.64 moins@23.26 l'inflation@23.40 Ton@24.41 compte@24.50 courant@24.74 rapporte@25.31 zéro@25.74 L'inflation@26.44 elle@27.24 est@27.65 à@27.80 deux@27.92 virgule@28.12 quatre@28.76 pour@28.86 cent@29.22 sur@29.74 un@29.94 an@30.14

Scene 1 (19.38 à 21.48 s) : P13, le nom
  TEXTE ÉCRAN : « Ça s'appelle / le [trait : rendement réel.] »
  ÉTAPES : 19.38 le papier se resserre en carte (rayon 16 px, ombre) ; 20.38 « Rendement réel » s'écrit à la machine (0,03 s par lettre).
  SON : musique d'élan 19.38 ; frappe 20.38.
  IMAGE CLÉ : 21.00 (K13).

Scene 2 (21.48 à 24.41 s) : P14, la formule
  TEXTE ÉCRAN : « C'est ce que rapporte / ton argent, » puis « [boîte : moins l'inflation.] »
  ÉTAPES : 21.48 le titre monte en micro ; 22.02 « ce que rapporte ton argent » (mot à mot) ; 23.26 le « − » terracotta tombe ; 23.40 « l'inflation » ; 24.01 à 24.41 silence : la ligne 1 s'allume.
  IMAGE CLÉ : 23.85 (K14).

Scene 3 (24.41 à 26.44 s) : P15, zéro
  TEXTE ÉCRAN : « Ton compte courant / rapporte [boîte : zéro.] »
  ÉTAPES : 25.74 la ligne 1 devient « 0 % » (roule de 9 à 0, 0,3 s) ; micro « CE QUE RAPPORTE TON COMPTE COURANT ».
  IMAGE CLÉ : 25.95 (K15).

Scene 4 (26.44 à 30.66 s) : P16, 2,4 %
  TEXTE ÉCRAN : « L'inflation, elle, / est à [boîte : 2,4 %] sur un an. »
  ÉTAPES : 27.92 la ligne 2 devient un compteur 0,0 → 2,4 % (jusqu'à 29.22) ; 29.74 la micro « INFLATION SUR UN AN · SOURCE : INSEE, AOÛT 2026 ».
  SON : tic-tic 27.92 à 29.48.
  IMAGE CLÉ : 29.70 (K16).

## Frame 6 : Ce que tu perds

- scene: Le résultat « = −2,4 % par an » ; la carte recule, « −2,4 % » tombe sur la frise en 2026 ; un glaçon par année, de plus en plus petit : 1 000, 977, 954, 931 € (si l'inflation reste à 2,4 %)
- duration: 3.02s
- transition_in: cut
- status: animated
- src: compositions/frames/06-perds.html
- type: solution
- blueprint: camera-journey (Adapt)
- focal: « −2,4 % », puis les glaçons sur la frise
- rules: kinetic-beat-slam, depth-of-field-blur
- voiceover: "Donc tu perds deux virgule quatre pour cent, chaque année."
- world: light
- handoff_in: à 30.66 : la carte formule (0 %, −, 2,4 %) centrée, les deux nombres glissent l'un vers l'autre (0,3 s power2.in)
- handoff_out: à 33.68 : poussée vers le premier glaçon (1 000 €) qui grandit jusqu'à 120 % du cadre (0,35 s power3.in) ; son reflet blanc devient l'écran de l'iPhone

Word cues: Donc@30.66 tu@30.78 perds@30.98 deux@31.28 virgule@31.34 quatre@32.01 pour@32.12 cent@32.46 chaque@32.70 année@33.00

Scene 1 (30.66 à 32.70 s) : P17, le résultat
  TEXTE ÉCRAN : « Donc [trait : tu perds] 2,4 % / chaque année. »
  ÉTAPES : 30.66 les deux nombres se soustraient ; 31.28 « = −2,4 % » terracotta arrive de la caméra (×4 flou 12 → net, 0,25 s expo.out) ; 31.80 « par an ».
  SON : note grave 31.28.
  IMAGE CLÉ : 31.90 (K17).

Scene 2 (32.70 à 33.68 s) : P18, chaque année
  ÉTAPES : 32.70 la carte recule et tombe sur la frise ; les glaçons se posent sur 2026, 2027, 2028, 2029 (0,12 s d'écart), chacun plus petit ; la micro « SI L'INFLATION RESTE À 2,4 % ».
  PISTE CAMÉRA : recul vers cam(x 5400, y 980, z −2600, yaw 40).
  SON : tintements 32.70 à 33.30.
  IMAGE CLÉ : 33.30 (K18).

## Frame 7 : La base

- scene: L'iPhone en gros plan ; sa carte de solde se découpe en « BUDGET DU MOIS », « RÉSERVE DE SÉCURITÉ », puis un bloc vide « LE RESTE » ; sur « reste », il se remplit de terracotta, sort de l'iPhone et part sur la frise vers les années suivantes
- duration: 6.97s
- transition_in: cut
- status: animated
- src: compositions/frames/07-base.html
- type: solution
- blueprint: device-surface-showcase (Adapt)
- focal: l'iPhone et ses blocs, puis le bloc « LE RESTE »
- rules: card-morph-anchor, depth-of-field-blur
- voiceover: "La base, c'est simple. Garde le budget du mois et une réserve de sécurité. Le reste... apprends à le faire travailler."
- world: light
- handoff_in: à 33.68 : poussée vers le premier glaçon (1 000 €) qui grandit jusqu'à 120 % du cadre (0,35 s power3.in) ; son reflet blanc devient l'écran de l'iPhone
- handoff_out: à 40.65 : le bloc « LE RESTE » en mouvement sur la frise (2027), traînée de deux copies, la caméra le suit ; il se contracte en carré (morph)

Word cues: La@33.68 base@33.78 c'est@34.12 simple@34.24 Garde@35.03 le@35.42 budget@35.52 du@35.82 mois@35.98 et@36.59 une@36.66 réserve@36.80 de@37.18 sécurité@37.30 Le@38.41 reste@38.54 apprends@39.25 à@39.60 le@39.66 faire@39.70 travailler@39.84

Scene 1 (33.68 à 38.41 s) : P19, budget et réserve
  TEXTE ÉCRAN : « La base, c'est simple. » puis « Garde le budget du mois / et une [boîte : réserve de sécurité.] »
  ÉTAPES : 33.68 l'iPhone arrive du reflet du glaçon (land ×1,1 → 1) ; 34.24 la carte de solde se fend en trois ; 35.52 « BUDGET DU MOIS » se clipse (encre) ; 36.80 « RÉSERVE DE SÉCURITÉ » (encre 70 %) ; le troisième bloc reste en pointillé.
  SON : snap 35.52 et 36.80.
  IMAGE CLÉ : 37.60 (K19).

Scene 2 (38.41 à 40.65 s) : P20, le reste au travail
  TEXTE ÉCRAN : « Le reste… apprends / à le faire [trait : travailler.] »
  ÉTAPES : 38.54 « LE RESTE » se remplit de terracotta ; 38.84 à 39.25 la pause : rien ne bouge sauf la caméra ; 39.25 le bloc sort de l'iPhone par la droite et se pose sur la frise en 2027 ; 39.84 il avance vers 2028 (traînée de deux copies à 12 et 25 %).
  PISTE CAMÉRA : 39.25 recul 0,4 s vers gxCam(7250, 1080, 0.85), puis travelling qui suit le bloc.
  SON : whoosh 39.25.
  IMAGE CLÉ : 40.10 (K20).

## Frame 8 : Enregistre

- scene: Le bloc devient le signet de la carte « Enregistrer » ; le curseur arrive et clique, le signet se remplit ; le champ de commentaire : « RÉEL » s'écrit et se publie ; la pastille « ÉPISODE 2 »
- duration: 3.84s
- transition_in: cut
- status: animated
- src: compositions/frames/08-enregistre.html
- type: cta
- blueprint: cta-morph-press (Adapt)
- focal: le signet, puis le commentaire
- rules: cursor-click-ripple, press-release-spring
- voiceover: "Enregistre cette vidéo et écris réel en commentaire pour l'épisode deux."
- world: light
- handoff_in: à 40.65 : le bloc « LE RESTE » en mouvement sur la frise (2027), traînée de deux copies, la caméra le suit ; il se contracte en carré (morph)
- handoff_out: fin du film à 44.49 : la carte commentaire et « ÉPISODE 2 » en tenue vivante (dérive 4 px/s), puis noir sur la dernière image

Word cues: Enregistre@40.65 cette@41.16 vidéo@41.32 et@42.08 écris@42.16 réel@42.46 en@42.74 commentaire@42.84 pour@43.34 l'épisode@43.50 deux@43.90

Scene 1 (40.65 à 42.08 s) : P21, enregistrer
  TEXTE ÉCRAN : « [boîte : Enregistre] cette vidéo, »
  ÉTAPES : 40.65 le bloc se contracte en signet dans la carte « Enregistrer » ; 40.80 le curseur arrive d'un geste courbe (0,4 s power3.out) ; 41.20 clic : le signet se remplit de terracotta, onde.
  SON : clic + pop 41.20.
  IMAGE CLÉ : 41.30 (K21).

Scene 2 (42.08 à 44.49 s) : P22, écris réel
  TEXTE ÉCRAN : « et écris [boîte : réel] en commentaire / pour l'épisode 2. »
  ÉTAPES : 42.08 la carte glisse et devient le champ de commentaire ; 42.46 « RÉEL » s'écrit lettre par lettre puis monte en commentaire publié ; 43.50 la pastille « ÉPISODE 2 » arrive (×1,15 → 1) ; tenue vivante jusqu'à 44.49.
  SON : frappe 42.46 ; whoosh doux 43.50.
  IMAGE CLÉ : 43.95 (K22).
