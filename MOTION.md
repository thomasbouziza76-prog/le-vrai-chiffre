# MOTION.md · la charte de mouvement de « Le Vrai Chiffre »
À lire AVANT d'animer quoi que ce soit (vidéo, carrousel, couverture, page). Idée reprise du pack MIT
charlie947/motion-graphics-skills (« brand-intake ») ; contenu propre à la chaîne.

## Couleurs (rôles)
- Fond papier : #f6f1e8 → #efe8dc → #e6ddce (dégradé radial doux, grain papier par-dessus)
- Surface (cartes, tickets) : #fbf8f2, bord encre 3 px, ombre portée encre décalée (8-10 px)
- Encre (texte, traits) : #1c1a17 · Gris (petits labels seulement) : #6b645a (sur fond clair, jamais pour une info importante)
- Accent : terracotta #c4552d (boîte du mot clé, tampons, fil, chiffre choc) · texte terracotta sur clair : #a3431f
- Rien d'autre : pas de dégradé sur le texte, pas de lueur, pas de néon, pas d'emoji.

## Typo
- Titres et sous-titres : Instrument Sans 700, interlettrage −0,035 em, interligne ~0,98
- Chiffres, labels, tampons : Space Mono 700 (chiffres) / 400 (labels en capitales espacées)
- Le mot clé de la phrase dans la boîte terracotta (légère rotation −1,5°). UN seul par écran.
- Charge les polices AVANT la première image (sinon l'image 0 s'affiche dans une police de secours).

## Mouvement
- Un objet qui CHANGE DE FORME, jamais un fondu d'une image vers une autre (le ticket se coupe en 4, la barre devient
  courbe, la carte s'agrandit depuis sa vraie place).
- Laisse un FANTÔME de l'état de départ (contour pointillé) : l'œil suit le changement.
- Décalage d'un temps (0,05 à 0,15 s) entre éléments d'un groupe ; jamais tout en même temps.
- Les tenues ne sont jamais mortes : un petit détail vit (curseur, barre qui avance, fil qui ondule, pulsation).
- Courbes : entrées expo.out / power3.out, objets qui se posent back.out(1.7), sorties power2.in, ressorts réels
  pour les cartes qui s'empilent (amortissement différent par carte).
- Tout est fonction du temps (timeline GSAP en pause pilotée par HyperFrames) : aucune animation qui tourne seule.
- Remplir le cadre : on met l'effet à l'échelle, jamais une petite vignette au milieu d'un grand vide.

## La référence de mouvement
La N°05 (salaire médian) est la vidéo qui bouge le mieux selon Thomas : caméra qui voyage, objets qui arrivent sans
cesse, rien de figé. Toute vidéo doit bouger AU MOINS autant. La N°06 (paiement en 4 fois) était trop statique.

## Le Ticket, la mascotte de la chaîne
- Un ticket de caisse crème, contour encre, bas en dents de scie, deux gros yeux ronds, une bouche, des bras et des
  jambes en trait d'encre ; son montant en terracotta (Space Mono). Dessin de référence : `exemples/ticket-personnage.png`
  (option 1) ; gag de référence animé : `exemples/ticket-gag-exemple.html` (coupé en 4, écrasé par le tampon CRÉDIT).
- Il EST l'argent : il s'allonge quand la facture monte, se fait plier, couper, tamponner, aplatir ; il marche,
  sautille, sursaute, a peur, est content. Physique de dessin animé : écrasement et étirement, rebonds, anticipation.
- Le gag d'ouverture (0 à 2 s) le met en scène, TOUJOURS lié au sujet, compréhensible sans le son et sans lire.
- Il ne remplace PAS le motion design : après le gag, la vidéo reste un vrai motion design riche (types de plans,
  caméra qui voyage, comme la N°05) ; le Ticket peut revenir 1 ou 2 fois (réaction, CTA, chute finale).
- Chaque geste du Ticket a son bruitage (voir SONS.md).

## Les règles des pros (recherche du 2026-11-01 : Disney, Jorge R. Canedo / Ordinary Folk, Vox, Kurzgesagt)
Les 10 principes du motion design (Jorge R. Canedo, ex-Buck, fondateur d'Ordinary Folk, adaptés des 12 de Disney) :
1. **Timing, espacement, rythme** : les gestes tombent sur le rythme de la voix et de la musique (un geste fort = une
   syllabe forte ou un temps de la musique), jamais au hasard.
2. **Courbes d'accélération** : rien ne bouge à vitesse constante.
3. **Masse et poids** : un objet lourd (tampon, coffre, pile de pièces) part lentement et frappe fort ; un objet léger
   (ticket, billet) flotte et rebondit. Le poids se lit même sur des formes abstraites.
4. **Anticipation** : petit recul dans l'autre sens avant chaque grand mouvement (le Ticket se baisse avant de sauter,
   le tampon remonte un peu avant de tomber).
5. **Trajectoires en arc** : ce qui vole, tombe ou saute suit une courbe, jamais une ligne droite.
6. **Écrasement, étirement, traînée** : à l'impact on écrase, en vitesse on étire ; une traînée (smear) sur les gestes
   très rapides. Le Ticket en papier se déforme beaucoup, une pièce presque pas.
7. **Continuité et chevauchement** : les parties ne démarrent ni ne s'arrêtent ensemble (bras du Ticket en retard sur
   le corps, lettres décalées, rangées décalées).
8. **Exagération** : on pousse plus loin que le réel (temps suspendu en l'air, écrasement énorme), sinon c'est mou.
9. **Animation secondaire** : une couche en plus qui porte du sens (poussière à l'impact, gouttes de sueur, petit
   tremblement de peur, pastille qui pulse derrière un chiffre).
10. **Attrait** : ça doit être beau ET drôle. « Make it fun. »

Vox (art direction de Joey Sendaydiego, techniques documentées) :
- **Un motif fil rouge par vidéo** autour duquel tout le visuel se construit (ex. l'horloge en papier devenue camembert).
- **Les chiffres deviennent des objets** (une horloge, un caddie, une pile) plutôt que des barres abstraites.
- **Fond jamais mort** : une texture qui bouge très lentement derrière les éléments fixes.
- **Transition par recul de caméra** avec un bref flou qui cache la coupe.
- **Images « caméra »** : légère aberration chromatique et flou SEULEMENT sur les bords du cadre.
- **Pas de sur-polissage** : trop parfait, ça fait pub. Intéressant d'abord, propre ensuite.
- **La mesure, c'est la rétention** : on juge une vidéo au temps de visionnage, pas au « c'est joli ».

Kurzgesagt :
- **Des personnages attachants et décalés** sont leur marque : on s'attache à une mitochondrie, donc à notre Ticket.
- **La voix donne le timing** de toute l'animation ; on anime APRÈS la voix, sur ses respirations et ses accents.
- **Chaque métaphore visuelle est esquissée et choisie** avant d'animer (nos 3 directions de l'étape 3).
- **2D + touches de 3D** quand ça sert le propos, pas pour faire joli.

## Les premières secondes
- Image 0 = UNE idée, 6 mots max, énorme, en mouvement, son à 0,0 s, voix qui dit « tu ».
- Si les 3 premières secondes n'arrêteraient pas TON pouce, refais-les avant le reste.

## Vérité
- Chaque chiffre à l'écran vient de la liste des faits sourcés, au caractère près.
- Chiffre d'exemple ou hypothèse : étiquette « exemple » / « hypothèse » visible sur chaque image où il apparaît.
- « une raison », jamais « LA raison » ; « ressemble à », jamais « est » quand la source montre une ressemblance.

## Jamais
Écran à moitié vide · texte coupé au bord · bruitage plus fort que la voix · petit texte qui porte une info importante ·
fondu enchaîné pour changer d'idée · même plan plus de 3 s sans changement · référence religieuse.
