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
- À FAIRE : tout chiffre principal ou étiquette posé sur un graphique a un fond papier #f6f1e9 (padding ≥ 12 px) au-dessus de toutes les lignes ; une ligne (moyenne, médiane, grille) qui croise ce cadre est coupée ou masquée.
- À NE PAS FAIRE : laisser une étiquette d'axe se lire derrière une silhouette ou sous un texte ; masquer l'axe quand le plan ne parle pas d'échelle.
- À FAIRE : à l'image 0, un compteur à rouleaux est à sa valeur finale (seul un léger dépassement bouge) : un rouleau à mi-course rend le hook illisible.
- À NE PAS FAIRE : un écran presque vide (un trait seul, moitié haute ou basse vide), surtout entre 3 et 8 s : au moins 60 % de l'image occupée par le sujet.
- À FAIRE : chaque chiffre affiché tient entier dans le cadre (marge ≥ 80 px), vérifié sur la planche contact.
- À FAIRE : au moins un plan qui change vraiment de décor ou d'échelle (pas le même graphique pendant toute la vidéo) + le moment 3D prévu.
- À FAIRE : le périmètre exact du chiffre à l'écran et dans la légende (ex. « secteur privé », source Insee + année).
