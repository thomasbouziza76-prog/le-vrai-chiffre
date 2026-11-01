# Règles apprises (À FAIRE / À NE PAS FAIRE)

Chaque correction devient une règle courte. La relecture de mise en scène vérifie chaque plan contre cette liste.
Une ligne par règle ; ne garde que les règles encore utiles (≤ 40 lignes).

- À NE PAS FAIRE : deux `<script>` dans un template de séquence (la séquence reste figée une fois assemblée).
- À NE PAS FAIRE : GSAP depuis le CDN (bloqué) : toujours `assets/vendor/gsap.min.js`.
- À NE PAS FAIRE : des ids SVG non préfixés (motifs, filtres, dégradés) : un objet devient invisible dans le film assemblé.
- À FAIRE : sous-titre clair (`.fx-sub.dark`) sur tout fond sombre ou texturé.
- À FAIRE : la fonction `render` branchée sur `gsap.timeline({paused:true, onUpdate: render})`.
- À NE PAS FAIRE : un texte qui apparaît d'un coup sans mouvement ni bruitage.
- À NE PAS FAIRE : un plan de plus de 3 s sans aucun changement visuel.
- À FAIRE : le hook lisible à t = 0 (pas de fondu d'entrée).
- À FAIRE : tout chiffre principal ou étiquette posé sur un graphique a un fond papier #f6f1e8 (padding ≥ 12 px) au-dessus de toutes les lignes ; une ligne (moyenne, médiane, grille) qui croise ce cadre est coupée ou masquée.
- À NE PAS FAIRE : laisser une étiquette d'axe se lire derrière une silhouette ou sous un texte ; masquer l'axe quand le plan ne parle pas d'échelle.
- À FAIRE : à l'image 0, un compteur à rouleaux est à sa valeur finale (seul un léger dépassement bouge) : un rouleau à mi-course rend le hook illisible.
- À NE PAS FAIRE : un écran presque vide (un trait seul, moitié haute ou basse vide), surtout entre 3 et 8 s : au moins 60 % de l'image occupée par le sujet.
- À FAIRE : chaque chiffre affiché tient entier dans le cadre (marge ≥ 80 px), vérifié sur la planche contact.
- À FAIRE : au moins un plan qui change vraiment de décor ou d'échelle (pas le même graphique pendant toute la vidéo) + le moment 3D prévu.
- À FAIRE : le périmètre exact du chiffre à l'écran et dans la légende (ex. « secteur privé », source Insee + année).
- À FAIRE : glitch-1/2/3 à gain 0,065 maximum ; aucun bruitage plus fort que la voix (vérifié à l'écoute/mesure aux secondes des bruitages).
- À FAIRE (N°06 : la moitié des gens partent à 0:01) : la 1re seconde = UNE seule idée, 6 mots max à l'écran, en énorme, rien d'autre (pas de calendrier + tampon + petit texte en même temps ; le Ticket mascotte, lui, est là) ; un mouvement fort dès l'image 0 (punch-in, objet qui tombe, chiffre qui claque) + un son à 0,0 s ; la voix commence à 0,0 s et parle au spectateur (« Tu… ? », « Imagine : tu… »). Le détail arrive à partir de 1,5 s.

## DA du 2026-11-01 (démo salaire médian v1 → v2)
- À NE PAS FAIRE : tout le mouvement sur le Ticket pendant que les chiffres ne font qu'apparaître (retour de Thomas sur la v1).
- À FAIRE : les données se transforment autant que le Ticket bouge (fissure, barres → courbe, coupe en deux, compteur).
- À FAIRE : texte d'écran mot par mot ; le mot clé encadré passe en blanc seulement quand l'encadré est derrière lui.
- À NE PAS FAIRE : le Ticket ou un drapeau qui cache un chiffre à lire ; deux cartons de texte superposés pendant une transition.
- À NE PAS FAIRE : une couture où l'objet clé disparaît et où la séquence suivante démarre sur un décor vide qui se construit : la séquence N+1 s'ouvre sur un plan déjà rempli où l'objet de N est encore là (N°07, relecture).
- À FAIRE : un personnage qui sort en réaction a quitté le cadre avant qu'une étiquette chiffrée apparaisse sur son trajet ; les étiquettes chiffrées restent au premier plan, jamais posées sur un personnage (N°07).
- À FAIRE : animation en SVG piloté par le temps : déclencher le rendu par une propriété-fonction tweenée (proxy.clock(v)), pas seulement par onUpdate (le seek peut supprimer les événements) ; jamais « </script> » dans un code inliné (N°07).
- À NE PAS FAIRE : glitch-1/2/3 (2,6 à 3,5 s de bruit continu) et riser (10 s) en version longue : ils font un fond sonore qui gêne (retour de Thomas sur la N°07 à 21 s). Utiliser des versions coupées (glitch 0,4 s, riser 2,5 s) et contrôler le niveau du mix dans chaque silence de la voix.
