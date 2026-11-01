# SONS.md · la bibliothèque de bruitages
Tous les sons sont utilisables par leur NOM (sans .mp3) dans `assets/audio/sfx-events.json` : l'installeur les copie à
côté des 20 sons de HyperFrames. Licence : Kenney (CC0, `sons/LICENCE-kenney-CC0.txt`) et sons fabriqués en code (à nous).

## Règle d'or : chaque geste a son son (comme dans un dessin animé)
- Chaque PAS du Ticket ou d'un objet qui marche : `pouc-1` à `pouc-4` (en alternance, jamais 2 fois le même de suite) ou
  `pas-doux-1..5`. Un pas = un son, calé sur l'image où le pied touche le sol.
- Ciseaux qui coupent : `ciseaux-snip` (un par coup). Papier qui se plie, se froisse, se déchire : `papier-froisse`,
  `papier-glisse`. Saut : `hop`. Ressort, rebond, tête qui saute : `boing`. Écrasement : `squish` + `ecrase-lourd-*`.
  Tampon : `tampon`. Chute : `chute-sifflet` puis `tombe-*` ou `ecrase-*` à l'arrivée. Pièces, argent qui tombe :
  `metal-leger-*`, `caisse-ching`. Objet posé : `tape-leger-*`, `assiette-legere-*`. Coup : `coup-*`.
  Interface, chiffre qui s'affiche : `clic-*`, `validation-*`, `bong`, `erreur`.
- Densité : une vidéo de 30 s compte 25 à 40 bruitages ; une de 45 s, 35 à 60 ; une histoire de 62 à 75 s, 60 à 90. Jamais 3 s sans aucun son d'action.
- Varie : ne réutilise pas le même fichier deux fois d'affilée (prends -1, -2, -3…).
- Niveaux : aucun bruitage plus fort que la voix ; glitch-1/2/3 gain 0,065 max ; pas et pouc 0,15 à 0,3 ; impacts
  0,25 max pendant la voix, jusqu'à 0,6 dans un vrai silence de la voix (la voix commence à 0,0 s).
