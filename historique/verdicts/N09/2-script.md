VERDICT : À CORRIGER
NOTE : 8/10
BLOQUANTS :
- n° 2 — Le carton du hook « Jamais demandé / d'augmentation ? » répète la voix mot pour mot (« Tu n'as jamais demandé d'augmentation ? »). Correction exacte, image 0 : « Augmentation : / le prix du silence » (mot encadré : silence). Le domino porte « 12 000 € » : sans le son, on lit « le prix du silence : 12 000 € ».
- n° 4 — Le carton p9 écrit « 10 ans » : c'est un 4e chiffre distinct à l'écran, et `controles/verifier.py` échouera (il compte tout nombre de carton, sauf les années 19xx et 20xx). Correction exacte, p9 : « Dix ans plus tard : / 12 000 € d'écart. » (mot encadré : 12 000 €). Retirer aussi la note « NB » de cette ligne. Ligne p21 à réduire à : « Un non : dix secondes. / Ton silence : dix ans. » (mot encadré : silence), sans le « 10 secondes » de brouillon.

À AMÉLIORER :
1. p22 « Elle bouge encore ? » est flou (on entend « elle est encore vivante ? ») et ne fait pas se situer le spectateur. Voix et phrases : « Ce soir, regarde ta fiche de paie. Depuis quand elle n'a pas bougé ? » Carton p22 : « Ta paie : / bloquée depuis quand ? » (mot encadré : paie). Le script passe à 212 mots.
2. Les cartons de la fin recopient la voix, ce que DA section 7 et PIPELINE interdisent. p17 : « Lui : 120 privations. » (privations). p18 : « Même tas. / Pas la même vie. » (vie.). p23 : « Demander / ou attendre ? » (attendre ?).

HOOK PROPOSÉ (si note < 8) : non requis, on garde « Tu n'as jamais demandé d'augmentation ? Ce silence peut te coûter douze mille euros. »

GRILLE :
1 Hook OK (« tu » au 1er mot, tension, mot-clé dit à ~1 s ; ~4 s en voix, un peu long, acceptable car la 1re phrase tient en 1,6 s et le 12 000 € est à l'image dès 0 s).
2 BLOQUANT (voir plus haut).
3 Ton OK. Modèles à garder tels quels : « Même chiffre. Pas le même prix. » et « Un non, ça dure dix secondes. Ton silence, dix ans. »
4 BLOQUANT à l'écran (voir plus haut). Voix OK : 4 chiffres distincts (12 000, 100, 120, dix). 12 000 € est un calcul : la mention « net avant impôt, hors autres hausses » doit figurer dans `source` ou la légende.
5 OK (« jamais demandé » ; renforcé par la correction de p22).
6 OK : abonne-toi avec raison à ~25 s (~38 % de la durée, fenêtre 18-28 s), différent des N°07 et N°08 ; débat à deux camps « Tu demandes, ou tu attends ? » ; partage ciblé sur le collègue ; pas de 3e appel (p22 relève du bloc CONCRET de la section 12).
7 OK : « Sauf que… Tico a un plan. », aussi retournement, à ~29-30 s (fenêtre 25-35 s).
8 OK : 209 mots voix, ~67 s à 3,1 mots/s (cadre 62-75 s, 200-230 mots) ; 212 après correction.
9 OK : aucun avis politique, produit ni jargon, « personne ne promet le oui » reste honnête.
10 OK : chiffres en lettres, une balise sur le hook, 1 son humain ([sighs]).
11 OK : `phrases` conformes au texte voix (seule différence : chiffres en chiffres, « dix » gardé en lettres comme convenu) ; phrase la plus longue 14 mots (p24).
12 OK : « n'ose jamais demander » reboucle sur « jamais demandé » du hook ; la dernière image rejoint l'image 0.

Choc p9 à ~21 s, légèrement après le repère 15-20 s de la section 12 : sans conséquence, l'appel reste dans sa fenêtre.
Si `plan.js` affiche les compteurs 100 → 12 000 et 1 → 120, seules les valeurs finales doivent rester à l'écran (voir 1-strategie, À VÉRIFIER n° 5).

## TOUR 2
VERDICT : VALIDÉ
NOTE : 8/10
BLOQUANTS : (aucun)
- n° 2 levé : le carton image 0 est « Augmentation : / le prix du silence » (mot : silence), il tient en 5 mots et ne répète plus la voix.
- n° 4 levé : p9 est « Dix ans plus tard : / 12 000 € d'écart. », sans « NB » ; p21 est « Un non : dix secondes. / Ton silence : dix ans. ». Comptage sur le texte des cartons : 3 chiffres distincts (12 000, 100, 120).
- Rien de neuf de bloquant : `phrases` identiques au texte voix une fois les chiffres remis en lettres, phrase la plus longue 14 mots, aucun chiffre écrit en chiffres dans la voix, 1 balise sur le hook, 1 son humain. Voix : 219 mots au comptage par espaces (ponctuation isolée incluse), ~71 s à 3,1 mots/s, dans le cadre 200-230 mots et 62-75 s.
À AMÉLIORER : les 2 points du tour 1 sont repris (p22, p17, p18, p23). Non bloquant : p12 « Plus de resto. » recopie encore la voix, à remplacer par « 100 € de côté. / Adieu le resto. » (resto.).
PORTÉE : contre-vérification limitée aux 2 bloquants et aux changements ; `controles/verifier.py` n'a pas été lancé, et les valeurs intermédiaires des compteurs de `plan.js` restent à contrôler (tour 1).
