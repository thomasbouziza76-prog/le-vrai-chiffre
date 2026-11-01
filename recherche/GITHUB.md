# Recherche GitHub · qualité visuelle (2026-10-31)

Ce qui a été trouvé sur GitHub et ce qu'on en garde. Les liens sont des sources, pas des dépendances : rien n'est
téléchargé pendant la tâche, sauf ce qui est déjà dans la copie HyperFrames ou dans npm.

## 1. Déjà dans notre HyperFrames 0.8.82 (catalogue local, 448 blocs, `npx hyperframes add <nom>` marche hors ligne)
Testé le 31/10 : `add` copie le composant dans `compositions/components/<nom>.html`, à coller dans la composition.
Attention : beaucoup de blocs sont prévus en 1920×1080, adapte-les au 1080×1920 et aux couleurs de la chaîne.

| Besoin | Composants | Effet |
|---|---|---|
| Flou de mouvement | `motion-blur` | Flou « After Effects » : échantillonne la timeline GSAP entre deux images. Mettre `data-hf-motion-blur` sur les objets qui bougent vite |
| Grain, texture | `grain-overlay`, `texture-mask-text` | Grain animé ; texte découpé dans une texture (66 masques) |
| Caméra vivante | `drift-hold`, `push-in`, `camera-shake`, `parallax-zoom` | Respiration continue, poussée lente, tremblement mesuré (à doser très bas), zoom avec parallaxe |
| Profondeur | `camera-rig-depth-stack`, `focus-rack`, `rack-focus` | Plans en profondeur, mise au point qui passe d'un plan à l'autre |
| Chiffres | `number-wheel`, `slot-machine-roll`, `split-flap-board`, `count-up`, `number-pop-in`, `mk-progress-stat` | Compteur à rouleaux, bandit manchot, tableau d'aéroport, compteur avec pulsation, pop |
| Graphiques | `chart-story`, `data-chart`, `animated-bar-chart`, `decline-chart`, `heatmap` | Barres, courbes, donut, qui se construisent dans l'ordre de lecture |
| Main dessinée | `hw-underline`, `hw-arrow`, `hw-callout-circle`, `marker-highlight`, `hw-boil` | Soulignés, flèches, cercles, surligneur, tremblement « dessiné » image par image |
| Papier | `torn-paper-rip`, `paper-collage-reveal`, `ink-bleed-reveal`, `stop-motion-cadence` | Déchirure de papier, collage qui s'envole, encre qui bave, cadence stop-motion |
| Texte cinétique | `headline-slam`, `kinetic-center-build`, `per-word-rise`, `scramble-reveal`, `strikethrough-replace` | Titre qui tombe, phrase qui se construit, mot qui se décode, mot barré remplacé |
| Transitions | `torn-paper-rip`, `match-cut`, `text-match-cut`, `type-match-cut`, `iris-reveal`, `transitions-*` | Coupes avec une cause (objet-pont, raccord de forme) |
| Sous-titres | `caption-editorial-emphasis`, `caption-highlight`, `caption-weight-shift` | Inspirations pour faire évoluer le sous-titre sans changer l'identité |

## 2. Plugins GSAP gratuits (déjà dans le paquet npm gsap 3.14.2, copiés dans `assets/vendor/` par l'étape 1 bis)
`CustomEase`, `CustomWiggle`, `CustomBounce`, `SplitText`, `DrawSVGPlugin`, `MorphSVGPlugin`, `MotionPathPlugin`.
Courbes sur mesure, découpe des mots/lettres, tracés qui se dessinent, morphing de formes, trajectoires.

## 3. Dépôts de référence (idées et recettes, pas de code à importer tel quel)
- **hannan-source/motion-design-patterns** · recettes GSAP tirées des 408 modèles de Jitter. Règles reprises :
  « nerveux » = `back.out(1.7)` ; « premium fluide » = `expo.out` / `power3.out`. Pas de licence affichée : on reprend
  les principes, pas le texte. https://github.com/hannan-source/motion-design-patterns
- **0xS4N4TG/papercut-explainer** (MIT, Remotion) · reels verticaux en papier découpé : grain + bord déchiré + ombre
  portée + ombrage empilé ; 17 mouvements de caméra (crane, pull back, dolly zoom, snap zoom, rack focus, handheld) ;
  10 coupes (whip, zoom-through, page turn, tear away, tape pull, stamp cut, pop-up book…). Idées pour notre style
  papier. https://github.com/0xS4N4TG/papercut-explainer
- **sirioberati/YouTube-AI-Motion-Graphics** (MIT) · 74 tableaux animés HTML + GSAP synchronisés sur Whisper, export
  image par image ; méthode « checks.md » : chaque correction devient une règle À FAIRE / À NE PAS FAIRE que l'IA
  vérifie sur chaque image (repris : `historique/CHECKS.md`). https://github.com/sirioberati/YouTube-AI-Motion-Graphics
- **Vincentwei1021/mg-styles-15** · 15 styles de motion design faits par Claude Opus 5.5 en code (isométrique 2.5D,
  rendu 3D doux, morph de formes, trait…), avec prompts et sources : réservoir de mondes pour la règle n° 1.
  https://github.com/Vincentwei1021/mg-styles-15
- **berker-z/kino** · boîte à outils de motion design pour HyperFrames (effets de matière, animation procédurale).
  https://github.com/topics/video-as-code
- **jqaisystems/visions-recipes** · films HyperFrames avec Three.js, particules. https://github.com/topics/motion-graphics
- **manbust/three-js-toon-shader** · ombrage en aplats + contours encre en post-traitement : pour un moment 3D qui
  reste dans le style « encre sur papier ». https://github.com/manbust/three-js-toon-shader
- **mattdesl/glsl-film-grain** (MIT) · grain réaliste par bruit 3D, atténué selon la luminance (piste si la finition
  ffmpeg ne suffit pas). https://github.com/mattdesl/glsl-film-grain
- **inorganik/countUp.js**, **barvian/number-flow** · références de compteurs (logique d'easing « smart » sur les
  grands nombres) ; chez nous, toujours piloté par la timeline (pas de requestAnimationFrame).
- Listes : **iart-ai/motion-skills**, **zhuyansen/awesome-claude-video-skills**, **imjszhang/awesome-code-video**,
  **flreey/awesome-motion-graphics**.

## Carrousels (recherche du 2026-11-01)
- Hainrixz/open-carrusel (MIT) : Claude écrit chaque slide en HTML/CSS, Puppeteer la photographie en PNG 1080×1350, avec un calque « zone de sécurité ». Même méthode que notre `etapes/09-carrousel.sh` (Playwright) : on n'installe pas l'appli (Next.js), on reprend l'idée de zone de sécurité.
- FranciscoMoretti/carousel-generator (MIT) : éditeur web de carrousels LinkedIn, pas utile pour l'automatisation.
