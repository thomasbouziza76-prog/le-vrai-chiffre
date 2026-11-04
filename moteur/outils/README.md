# moteur/outils · bibliothèque OPTIONNELLE (cartes, frise, courbes, WhisperX)

Briques validées sur le pilote Non Classée **NC-001** (casse d'Anvers, `casse-anvers/v3/OUTILS.md`), réécrites pour le moteur commun.
**Rien ne change pour un plan qui ne les appelle pas** (preuve du 04/11 : 5 images de la N°10 identiques au bit près avant/après, `verifier.py` 20/20 identique, `timing.py` identique).

Tout est dans le dépôt : aucune requête réseau au rendu. `nouveau.sh` copie ces fichiers dans `DOSSIER/outils/` et `index.html` les charge avant `plan.js`. Les fonctions arrivent dans la boîte `a` des dessins (`monde`, `libre`, `mot`) ; les outils du moteur gardent la priorité en cas de nom identique.

| Fichier | Rôle | Langage |
|---|---|---|
| `courbes.js` | Courbes d'accélération façon GSAP / CustomEase, tweens, pistes | JS (plans) |
| `carte.js` | Carte animée : zoom pays → région → ville, contour tracé, villes, trajet, zones | JS (plans) |
| `frise.js` | Frise chronologique : ligne qui se lève, dates gravées, curseur, tampons qui claquent | JS (plans) |
| `cartes.js` | Données des cartes prêtes : `europe`, `france` (1:10 M + départements), `monde` (Equal Earth) | données (678 Ko) |
| `prepa_carte.py` | Prépare une carte pour un sujet (pays, région, villes) depuis Natural Earth | Python (avant le rendu) |
| `aligne_whisperx.py` | Alignement mot à mot WhisperX, appelé par `timing.py --whisperx` | Python (venv WhisperX) |
| `exemple-carte.plan.js` | Exemple complet : carte qui zoome + trajet, puis frise + tampon | plan |

## Quand l'utiliser

- **Le Vrai Chiffre** : une **carte** pour un sujet d'actu localisé (une ville, une région, « en Normandie… ») ou une **comparaison entre pays** (salaire minimum, prix de l'essence, âge de la retraite : les pays s'allument l'un après l'autre). Style `papier`. Ça reste un objet du monde de la vidéo (règle d'or 3) : Tico peut marcher dessus, la carte peut se plier, sortir d'une enveloppe… La frise sert rarement (une loi, une date d'entrée en vigueur).
- **Non Classée** : **cartes et frises d'enquête** (lieu du fait, trajet des suspects, chronologie gravée avec tampons « CLASSÉ », « JAMAIS RETROUVÉS »). Style `nuit`.
- **Courbes** : dès qu'un geste doit claquer (`'frappe'` pour un tampon, `'back.out(1.6)'` pour un objet qui se pose, `'expo.inOut'` pour un zoom) ; `a.piste` pour chorégraphier une valeur sur plusieurs ancres.
- Pas pour : afficher une carte « pour faire joli » (une carte = un lieu ou une comparaison dits par la voix).

## Courbes (`courbes.js`)

Code écrit pour le moteur (formules classiques), **aucune ligne de GSAP embarquée**. Noms identiques à GSAP pour recopier une timeline validée ; écart mesuré avec GSAP 3.15 : 0 (power, back, elastic, bounce, sine, circ), < 0,4 % (expo), < 0,08 % (`frappe`, `grave`).

```js
a.ease('expo.inOut')(u)                 // fonction pure u → valeur ; aussi 'power1'…'power4', 'sine', 'circ', 'back(1.7)', 'elastic(1,0.3)', 'bounce', 'steps(5)', '.in'/'.out'/'.inOut'
a.ease('frappe')(u)                     // courbes maison NC-001 : 'frappe' (tampon), 'grave' (burin), 'souffle'
a.tween(t,'p3',.6,'back.out(1.6)')      // 0 → 1 courbé, commence à p3, dure 0,6 s
a.piste(t,[['p3',0],['p4',1,'expo.inOut'],['p6',.5,'power2.in',.3]])   // valeur qui ARRIVE à chaque ancre (ou dure 0,3 s si 4e terme)
a.customEase('M0,0 C0.2,0 0.35,0.62 0.5,1.12 0.62,0.94 0.76,1.03 1,1')  // format CustomEase
a.cubicBezier(.42,0,.58,1)              // comme en CSS
```

## Carte (`carte.js` + `cartes.js`)

```js
dessin:(t,a)=>a.carte(t,{ carte:'france', x:20, y:250, w:1040, h:1050, style:'papier', rayon:24,   // cadre dans le monde ; style 'nuit' pour Non Classée
  vues:[ {at:0, centre:'FRA', largeur:3600},                 // l'Europe (largeur en km)
         {at:'p2', centre:'FRA'},                            // un code pays seul = le pays cadré avec une marge
         {at:'p3', centre:'Rouen', largeur:420, duree:1.1},  // zoom (logarithmique) vers une ville ; ease:'expo.inOut' par défaut
         {at:'p4', centre:[1.7,49.1], largeur:330} ],        // [lon, lat]
  pays:[ {code:'FRA', at:'p2+.2', trace:true, remplir:.25} ],          // contour au feutre puis remplissage (codes ADM0 : FRA, BEL, DEU…)
  villes:[ {nom:'Rouen', at:'p3+.6', accent:true, trait:true}, {nom:'Paris', at:'p4', taille:36} ],   // point + nom gravé
  etiquettes:[ {txt:'FRANCE', lieu:[2.6,46.2], at:'p2+.5', fin:'p3', taille:64} ],
  trajets:[ {points:['Paris','Rouen'], de:'p4+.3', a:'p4_fin', courbe:.18} ],
  zones:[ {centre:'Rouen', rayon:25, at:'p4'} ] })
```
- Le niveau de détail change tout seul : pays en 1:50 M de loin, 1:10 M et limites des départements quand on zoome dans la boîte de détail.
- `a.carteXY(t, options, 'Rouen')` donne la position à l'écran d'un lieu (pour y poser Tico, une flèche, un tampon). `a.carteVue(t, options)` donne la vue courante.
- Pense à déclarer les moments dans `actions` / `sons` de la scène (contrôle « l'image agit »).
- Villes disponibles : voir `CARTES.france.villes` etc. Il en manque une ? Prépare une carte pour le sujet :

```bash
python3 moteur/outils/prepa_carte.py --nom anvers --centre 51.21,4.42 --large=-12,35,30,62 --detail=1,49,8,53 \
   --admin1 BEL --villes "Anvers=Antwerpen,Bruxelles=Brussels,Diamond Centre=51.2143:4.4187" --sortie $DOSSIER/outils/cartes.js
python3 moteur/outils/prepa_carte.py --nom monde --projection monde --villes "Paris,Pékin=Beijing" --sortie $DOSSIER/outils/cartes.js
```
`--villes` : nom Natural Earth, `Nom français=Nom NE`, ou `Nom=lat:lon`. Une ligne par carte dans le fichier (remplacée si le nom existe). Pour changer les cartes livrées à toutes les vidéos, écrire dans `moteur/outils/cartes.js` (commandes de fabrication : voir l'historique git du commit).

## Frise (`frise.js`)

```js
dessin:(t,a)=>a.frise(t,{ x:200, y:340, longueur:860, sens:'v', style:'papier', ligne:'p5',   // sens 'h' : horizontale (3-4 dates max)
  dates:[ {at:'p5+.4', date:'NOV. 2000', txt:'BUREAU LOUÉ'},
          {at:'p5+.9', date:'FÉV. 2003', txt:'LE CASSE'},
          {at:'p6', date:"AUJOURD'HUI", txt:'JAMAIS RETROUVÉS', tampon:{txt:'CLASSÉ', at:'p6+.9', decal:[600,-330]}} ],
  fin:'p7' })
```
Aussi : `a.tamponFrappe(x,y,['10 ANS'],a.ease('frappe')(u))` (tampon seul), `a.grave(x,y,'TEXTE',p,{taille,style})` (texte gravé au burin), `a.friseMoments(options)` (les temps à déclarer en `actions`).

## Alignement WhisperX (`timing.py --whisperx`)

```bash
python3 moteur/timing.py $DOSSIER --whisperx
```
Transcription faster-whisper + **alignement forcé wav2vec2 français** (CPU, ~3-4 min pour 57 s de voix, modèles déjà en cache). Python utilisé : `$LVC_WHISPERX_PY`, sinon `/home/claude/outils-video/venv-whisperx/bin/python`. Pas installé ou échec → message et **alignement habituel** (le défaut ne change pas).
Mesure sur la N°10 (04/11) : ancres décalées de 0,15 s en moyenne (max 0,98 s) par rapport au défaut, mais **7 mots non retrouvés** (WhisperX transcrit moins fidèlement certains mots) → à garder pour les cas où le défaut cale mal un mot ; relire la liste « mots non retrouvés ».

## Licences

- **Natural Earth** : domaine public (`natural-earth-vector/LICENSE.md` : « Everything here is public domain »). Crédit facultatif ; on peut écrire « Carte : Natural Earth ».
- **GSAP** (vérifié le 04/11 dans le clone, v3.15.0) : `package.json` → « Standard 'no charge' license: https://gsap.com/standard-license », README : « Copyright (c) 2008-2026, GreenSock. All rights reserved. » Gratuite mais **propriétaire** (pas une licence libre ; clause sur les outils concurrents de Webflow). **Rien de GSAP n'est copié ici** : seuls les noms de courbes et les tracés CustomEase du pilote (nos données) sont repris ; GSAP n'est ni embarqué ni requis.
- **WhisperX** (BSD-2-Clause), faster-whisper (MIT), wav2vec2 VoxPopuli (torchaudio) : outils d'alignement, rien n'est intégré à la vidéo.
- motion-canvas-camera, OpenMontage (AGPL) : idées seulement (zoom logarithmique, caméra qui dérive ; check-list de montage), aucun code repris.
- **Pas d'Audiocraft / AudioGen** (licence non commerciale).
