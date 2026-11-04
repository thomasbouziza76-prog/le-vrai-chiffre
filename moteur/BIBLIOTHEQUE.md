# BIBLIOTHEQUE.md · Ressources libres pour inventer un monde par vidéo

> Vérifié le 2026-11-01 : licences lues dans les fichiers LICENSE des dépôts GitHub ou dans les métadonnées npm, installations testées dans `/tmp/test-libs`.
> Contraintes du moteur : rendu hors ligne, seuls npm et GitHub sont joignables, la page est ouverte en `file://`.
> **En `file://`, Chromium bloque les `import` ES modules** : il faut un build UMD (`<script src>`) ou un bundle IIFE fait avec esbuild (voir la fin du fichier).
> Interdit ici : licences non commerciales, « free for personal use », ShareAlike (CC BY-SA) et licences « éthiques » non standard.
> **Déjà branché dans le moteur (04/11)** : cartes Natural Earth, frise, courbes façon GSAP/CustomEase (sans GSAP), alignement WhisperX en option → `moteur/outils/README.md`.

## Les 8 à recommander

| # | Ressource | npm | Licence | Taille | Ce qu'elle apporte à la chaîne |
|---|---|---|---|---|---|
| 1 | Tabler Icons | `@tabler/icons` | MIT | 11 Mo, 5 203 outline + 1 054 filled | Le vocabulaire de base (immeuble, caddie, ascenseur, sablier…) en trait encre. **Déjà embarqué** dans `moteur/icones.js` |
| 2 | Phosphor (duotone) | `@phosphor-icons/core` | MIT | 6,5 Mo, 1 512 icônes × 6 graisses | Le style **duotone** donne pile la DA : trait encre + aplat terracotta (testé, voir plus bas) |
| 3 | Game-icons (via Iconify) | `@iconify-json/game-icons` | CC BY 3.0 (crédit obligatoire) | 6,5 Mo, 4 133 silhouettes | Objets d'action pleins : tirelire, tas de pièces, dominos, échelle, briques, balance |
| 4 | flubber | `flubber` | MIT | 88 Ko (build 56 Ko) | Morphing entre deux formes : la tirelire devient un immeuble, la pièce devient un sablier |
| 5 | matter-js | `matter-js` | MIT | 0,9 Mo (build 84 Ko) | Physique 2D : des pièces qui tombent et s'empilent, des dominos qui s'écroulent, une balance qui penche |
| 6 | Rough.js | `roughjs` | MIT | 170 Ko (build 28 Ko) | Trait « dessiné à la main » qui reste stable grâce à `seed` : des mondes en croquis |
| 7 | simplex-noise + alea | `simplex-noise`, `alea` | MIT, MIT | 110 Ko + 10 Ko | Bruit organique avec graine : flottement, foule qui ondule, fumée, tremblement de caméra |
| 8 | anime.js v4 | `animejs` | MIT | 2,1 Mo | Timelines avec `seek(ms)` vers l'avant ou l'arrière (testé) pour chorégraphier 20 objets sans écrire les courbes à la main |

Testés aussi : `@iconify/utils` (MIT), `@iconify-json/fluent-emoji-flat` (MIT), `perfect-freehand` (MIT), `bezier-easing` (MIT), `lottie-web` (MIT), `@dicebear/open-peeps` (art CC0, code MIT), `esbuild` (MIT).

## 1. Icônes et pictogrammes SVG

| Jeu | npm | Licence (vérifiée) | Volume | Remarque |
|---|---|---|---|---|
| Tabler | `@tabler/icons` | MIT (LICENSE GitHub) | 6 257 | 1 fichier par icône dans `icons/outline/NOM.svg`, trait `currentColor` sur un viewBox de 24 |
| Phosphor | `@phosphor-icons/core` | MIT (LICENSE GitHub) | 1 512 × 6 | `assets/duotone/NOM-duotone.svg` : calque `opacity="0.2"` sur un viewBox de 256 |
| Hugeicons (Iconify) | `@iconify-json/hugeicons` | MIT (Halal Labs) | 6 065 | Trait arrondi, complète Tabler |
| Lucide | `lucide-static` | ISC (LICENSE GitHub) | 1 500+ | Proche de Tabler, paquet lourd (55 Mo), non installé |
| Iconoir | `iconoir` | MIT (LICENSE GitHub) | 1 600+ | Trait fin, élégant |
| Material Icons | `@material-design-icons/svg` | Apache-2.0 | 2 000+ | Formes pleines, très lisibles |
| Fluent System Icons | `@fluentui/svg-icons` | MIT | des milliers | Microsoft, regular et filled |
| Healthicons | `healthicons` | CC0-1.0 | 1 000+ | Santé, pharmacie, hôpital (sujets mutuelle, sécu) |
| Game-icons | `@iconify-json/game-icons` | CC BY 3.0 | 4 133 | Crédit : « Icônes game-icons.net (Lorc, Delapouite et al.), CC BY 3.0 » |

**À éviter :**
- **Remix Icon** : npm affiche encore « Apache-2.0 », mais le dépôt est passé à une licence maison (« Remix Icon License v1.0 », janvier 2026).
- **OpenMoji** et **emojione-v1** : CC BY-SA 4.0. Le ShareAlike contamine les œuvres dérivées.
- **`@iconify/json` complet** : 633 Mo, avec des licences différentes selon les jeux. Installe plutôt chaque jeu `@iconify-json/NOM` à part.

Récupérer une icône par son nom en Node : script testé `/tmp/test-libs/icones.js`, qui sort building, coins et hourglass en encre ou terracotta.

```js
const fs = require('fs'), path = require('path');
const { getIconData, iconToSVG } = require('@iconify/utils');
// Tabler : lire le fichier (le champ "exports" interdit require.resolve('@tabler/icons/package.json'))
const tabler = n => fs.readFileSync(path.join(__dirname, 'node_modules/@tabler/icons/icons/outline', n + '.svg'), 'utf8');
// N'importe quel jeu Iconify : "jeu:nom"
const iconify = (jeu, n) => iconToSVG(getIconData(require(`@iconify-json/${jeu}/icons.json`), n)); // → {attributes:{viewBox}, body}
```

## 2. Illustrations, personnages, objets en couleur

| Ressource | Accès | Licence | Verdict |
|---|---|---|---|
| **Fluent Emoji Flat** (Microsoft) | `@iconify-json/fluent-emoji-flat` (9 Mo, 3 145) | MIT | Objets détaillés en aplats (bank, office-building, money-bag, hourglass-not-done…). Repalettiser les `fill` vers la DA |
| Noto Emoji (Google) | `@iconify-json/noto` (25 Mo, 3 729) | Apache-2.0 | Même usage, style plus rond |
| Twemoji | `@iconify-json/twemoji` | CC BY 4.0 | Possible avec crédit |
| **Open Peeps** (Pablo Stanley) | `@dicebear/open-peeps` (têtes et bustes) ; `react-peeps` (corps entiers, composants React à convertir en SVG au build) | Dessins CC0 1.0, code MIT | Des personnages pour les foules et les files d'attente. **Piège testé** : `@dicebear/open-peeps@9` ne marche qu'avec `@dicebear/core@9` (la v10 plante) et s'importe en ESM (`import * as openPeeps`) |
| Humaaans (Pablo Stanley) | Figma/Sketch seulement ; le paquet npm « humaaans » n'a pas de licence → à éviter | CC BY 4.0 selon webdesignerdepot (site officiel non consultable d'ici) | Utilisable avec crédit, mais à télécharger à la main |
| unDraw | Site seulement, rien sur npm ni GitHub | Licence maison : commercial OK sans crédit, mais interdit de redistribuer en packs, de bâtir un service concurrent, d'entraîner une IA | **Douteux** pour un pipeline automatisé : à éviter |
| Cartes du monde | `world-atlas` (ISC, données Natural Earth) + `topojson-client` + `d3-geo` (ISC) | ISC | Monde « carte » : pays qui se colorent, avion qui traverse |
| Carte de France | GitHub `gregoiredavid/france-geojson` (données IGN Admin Express) | Pas de fichier LICENSE dans le dépôt | Créditer « IGN » ; **licence du dépôt floue** |

## 3. Animation et physique en temps imposé (`seek(t)`, sans horloge)

Règle d'or : chaque image est une **fonction pure de t**. Jamais de `requestAnimationFrame`, de `Runner`, de `Date.now()` ni de `Math.random()` sans graine.

| Lib | npm · licence | Mode « temps imposé » | Test |
|---|---|---|---|
| flubber | `flubber` · MIT | `const m = flubber.interpolate(dA, dB, {maxSegmentLength: 4}); path.d = m(p(t))`. Aussi `toCircle`, `separate`/`combine` (1 forme → N morceaux : l'objet qui se casse) | OK |
| matter-js | `matter-js` · MIT | **Précalcul** : au chargement, `for (k < N) Engine.update(engine, 1000/60)` en stockant `{x, y, angle}` de chaque corps → `seek(t)` lit `frames[Math.round(t*60)]`. Le seek arrière marche, et c'est déterministe (2 simulations identiques au bit près). Ne jamais utiliser `Runner` | OK |
| planck.js | `planck` · MIT (port de Box2D) | Même précalcul ; empilements plus stables (tour de pièces) | non testé |
| simplex-noise | `simplex-noise` v4 · MIT | `const n = createNoise2D(alea('N09'))`, puis `n(i*0.3, t*0.8)`. Paquet ESM seulement → bundle | OK |
| Rough.js | `roughjs` · MIT | `rough.generator().rectangle(x, y, w, h, {seed: 7, roughness: 1.5})` → même tracé à chaque image. Pour un trait qui « bout », changer `seed` toutes les 3 images : `seed: 1 + Math.floor(t*8)` | OK |
| perfect-freehand | `perfect-freehand` · MIT | `getStroke(points.slice(0, n(t)))` : un trait de feutre qui se dessine (flèche, entourage) | OK |
| anime.js v4 | `animejs` · MIT | `const tl = createTimeline({autoplay: false}).add(obj, {...})` ; `tl.seek(t*1000)` marche sur de simples objets JS | OK (avant et arrière) |
| Easings | `bezier-easing` (MIT), `d3-ease` (BSD-3-Clause) | Fonctions pures `e(p)` | OK |
| Courbes et caméra | `d3-shape` (courbes de chemin), `d3-interpolate` (ISC) | `interpolateZoom([cx, cy, w], [cx2, cy2, w2])(p)` : zoom de caméra fluide « van Wijk », idéal pour suivre un objet | non testé |
| Particules | aucune lib | Pas de lib temps réel comme tsParticles : écrire `pos_i(t) = f(t, alea(seed+i))` (20 lignes) | |
| GSAP 3 | `gsap` · « Standard no-charge license » | Gratuit, y compris MorphSVG, et `tl.pause(); tl.seek(t)` marche, **mais propriétaire** avec une clause anti-concurrence Webflow → **douteux**, pas par défaut | |
| Theatre.js | `@theatre/core` Apache-2.0 | `sequence.position = t` ; le studio (éditeur) est AGPL → à éviter | |

## 4. Transitions, effets, Lottie

- **gl-transitions** (`gl-transitions`, MIT, 149 transitions GLSL dont 147 MIT, 1 BSD-3 et 1 BSD-2) : wipe, doorway, cross-zoom, page qui tourne… Il faut du WebGL et deux images en texture. Le plus simple est de s'en servir comme **recettes** à porter en masques SVG.
- **Motion Canvas** (`@motion-canvas/core`, MIT) et **Revideo** (`@revideo/core`, MIT) : moteurs complets. À lire pour leurs transitions (slide, zoom-in) et leurs signaux, pas à intégrer.
- Animations CSS : pour les piloter par seek, mettre `el.getAnimations().forEach(a => { a.pause(); a.currentTime = t*1000 })`. `magic.css` est MIT. **animate.css** est sous Hippocratic License 2.1 (licence éthique non standard) → à éviter.
- **Lottie** :
  - lecteur : `lottie-web` (MIT), avec le build `build/player/lottie_light.min.js` (168 Ko, rendu SVG seulement).
  - **`anim.goToAndStop(frame, true)` est confirmé** dans Chromium (test `/tmp/test-libs/lottie-test.html`) : images 0, 30, 15 puis 7,5 rendues exactement, seek arrière compris.
  - Piège : la frame `== op` (point de sortie) n'est **pas** rendue. Il faut borner à `Math.min(f, op - 0.01)`.
  - Recolorer : remplacer les tableaux `c.k` des calques `fl`/`st` du JSON par la palette de la DA.
- **LottieFiles, licence « Lottie Simple License »** (help.lottiefiles.com) :
  - autorisé : usage commercial, modification, publication dans tes produits, sans crédit obligatoire.
  - interdit : compiler les animations pour un service concurrent, ou ajouter des restrictions comme des DRM.
  - Je n'ai pas pu lire la page officielle de la licence ni vérifier si le téléchargement demande un compte (pages bloquées pendant la recherche).
  - De toute façon, lottiefiles.com n'est **pas joignable depuis la machine de rendu** : il faut télécharger les JSON ailleurs puis les versionner dans le dépôt.
  - Aucune grosse base Lottie sous licence permissive n'existe sur npm ni GitHub (`react-useanimations`, MIT, ne contient que des icônes d'interface).

## 5. Listes de référence (idées de mondes)

- `terkelg/awesome-creative-coding` (CC0) : générativité, shaders, physique, outils.
- `kosmos/awesome-generative-art` (CC0) : artistes et techniques génératives.
- `willianjusten/awesome-svg` : animation SVG, morphing, outils.
- `LottieFiles/awesome-lottie` : lecteurs, outils, sources d'animations.
- `liabru/matter-js`, dossier `examples/` : avalanche, pyramide, berceau de Newton, ponts, chaînes, ragdoll. C'est un catalogue de gags physiques (tour de pièces qui s'effondre, pont qui cède).
- `veltman/flubber`, README et démos : morphing multi-formes (1 → N, N → 1).
- `mattdesl/canvas-sketch` : générativité avec graines et rendu image par image (philosophie identique à `seek`).

## Comment l'utiliser dans le moteur

**Déjà en place.** `moteur/icones.js` contient Tabler outline (5 203). Usage : `a.icone("building", x, y, taille, {couleur, fond, ep, rot, op})`.
Attention : `rotate(r 12 12)` est appliqué **avant** `scale`. Le pivot n'est donc au centre de l'icône que si `taille = 24`.

**1. Installer** (dans un sous-dossier dédié, sans toucher au reste) :

```bash
mkdir -p /home/claude/le-vrai-chiffre/moteur/lib && cd /home/claude/le-vrai-chiffre/moteur/lib && npm init -y
npm i @phosphor-icons/core @iconify/utils @iconify-json/game-icons @iconify-json/fluent-emoji-flat \
      flubber matter-js roughjs simplex-noise alea perfect-freehand bezier-easing animejs lottie-web
npm i -D esbuild
```

**2. Un seul bundle navigateur** (testé : 214 Ko, aucune erreur en `file://`). Écrire `lib/vendor-entry.js` :

```js
export { createNoise2D, createNoise3D } from 'simplex-noise';
export { default as alea } from 'alea';
export { getStroke } from 'perfect-freehand';
export { default as bezier } from 'bezier-easing';
export * as flubber from 'flubber';
export { default as Matter } from 'matter-js';
export { default as rough } from 'roughjs/bundled/rough.esm.js';
export { createTimeline } from 'animejs';
```

Puis `npx esbuild vendor-entry.js --bundle --minify --format=iife --global-name=LIB --outfile=vendor.js`, et dans `index.html` : `<script src="lib/vendor.js"></script>` → `const {flubber, Matter, rough} = LIB;`.
Pour Lottie : `<script src="lib/node_modules/lottie-web/build/player/lottie_light.min.js">`.
Il faudra que `nouveau.sh` copie aussi `lib/vendor.js` (non modifié ici).

**3. Objets recolorés en terracotta/encre** (testé, planche `/tmp/test-libs/planche.png`) : un script Node lancé une fois produit `objets.js`, sur le modèle d'`icones.js`.

```js
const fs = require('fs'), path = require('path');
const { getIconData, iconToSVG, replaceIDs } = require('@iconify/utils');
const ENCRE = '#1c1a17', ACC = '#c4552d', NM = path.join(__dirname, 'node_modules'), out = {};
for (const n of ['piggy-bank', 'hourglass', 'scales', 'buildings', 'elevator']) {    // Phosphor duotone
  const svg = fs.readFileSync(path.join(NM, '@phosphor-icons/core/assets/duotone', n + '-duotone.svg'), 'utf8');
  const inner = svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace(/opacity="0.2"/g, `fill="${ACC}"`);
  out['ph:' + n] = { vb: 256, g: `<g fill="${ENCRE}">${inner}</g>` };              // aplat terracotta + trait encre
}
const gi = require('@iconify-json/game-icons/icons.json');                           // CC BY 3.0 : créditer
for (const n of ['coins-pile', 'domino-tiles', 'ladder'])
  out['gi:' + n] = { vb: 512, g: replaceIDs(iconToSVG(getIconData(gi, n)).body).replace(/currentColor/g, ENCRE) };
fs.writeFileSync('objets.js', 'const OBJETS=' + JSON.stringify(out) + ';');
```

Poser un objet dans la scène (centré, pivot au centre, taille en px) :

```js
const objet = (k, x, y, taille, rot = 0) => { const o = OBJETS[k], s = taille / o.vb;
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s}) translate(${-o.vb/2} ${-o.vb/2})">${o.g}</g>`; };
// ex. : la tirelire tombe et rebondit → objet('ph:piggy-bank', 540, 300 + 900*a.ressort(t, 1.2), 320, 8*Math.sin(t*6))
```

**4. Physique rejouable** (matter-js, précalcul au chargement) :

```js
const E = LIB.Matter.Engine.create(), B = LIB.Matter.Bodies, W = E.world, FPS = 60, N = FPS * 12;
const pieces = [...Array(30)].map((_, i) => B.circle(400 + (i % 5) * 60, -i * 80, 28, {restitution: 0.4}));
LIB.Matter.Composite.add(W, [...pieces, B.rectangle(540, 1500, 900, 40, {isStatic: true})]);
const F = []; for (let k = 0; k < N; k++) { LIB.Matter.Engine.update(E, 1000 / FPS); F.push(pieces.map(p => [p.position.x, p.position.y, p.angle])); }
const etat = t => F[Math.min(N - 1, Math.max(0, Math.round(t * FPS)))];             // à appeler dans seek(t)
```

Crédit à mettre en description si game-icons, Twemoji ou Humaaans sont utilisés : « Icônes : game-icons.net (CC BY 3.0) ».
