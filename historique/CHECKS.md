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
