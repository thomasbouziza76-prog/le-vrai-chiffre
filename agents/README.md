# L'équipe d'agents : qui fait quoi, et quand

> La session de la tâche est le **réalisateur** : il écrit le script, la voix, le plan et lance le rendu.
> Aux 4 étapes stratégiques, il fait appel à un **agent spécialisé et neuf** (outil `Agent`, type `general-purpose`).
> Un agent qui n'a pas fait le travail voit les erreurs que l'auteur ne voit plus.
> Chaque agent n'a que sa fiche, les fichiers qu'on lui donne et son verdict à écrire.

## Les 4 portes

| # | Quand | Agent (fiche) | Il reçoit | Il écrit |
|---|---|---|---|---|
| 1 | Avant d'écrire le script | **Stratège** (`stratege.md`) | `sujets.md`, `historique/HISTORIQUE.md`, les stats du Sheet (tu les lui colles), `agents/savoir-tiktok.md` | `$P/agents/1-strategie.md` : sujet, angle, personnage, hook, question de débat, mot-clé |
| 2 | Script + texte voix écrits, AVANT la voix | **Critique script** (`critique-script.md`) | `$P/script.md` (texte voix avec balises + phrases + cartons), `1-strategie.md` | `$P/agents/2-script.md` |
| 3 | Plan écrit, contrôles verts, AVANT le rendu | **Critique motion** (`critique-motion.md`) | `$P/boards/planche-plan-*.jpg` (1 image/s), `$P/plan.js`, `$P/rapport-controles.json` | `$P/agents/3-motion.md` |
| 4 | Vidéo rendue, AVANT de livrer à Thomas | **Juge final** (`juge-final.md`) | `$P/boards/planche-video-*.jpg`, `$P/script.md`, `$P/mots.json` (ce que dit la voix), `$P/rapport-controles.json` | `$P/agents/4-juge.md` |

## Comment lancer un agent (modèle de message)

Outil `Agent`, `subagent_type: general-purpose`, **au premier plan** (`run_in_background: false`), avec ce message rempli :

```
Tu es le <RÔLE> de la chaîne TikTok « Le Vrai Chiffre ».
Lis d'abord, dans cet ordre : <REPO>/agents/<fiche>.md, <REPO>/agents/retours-thomas.md, <REPO>/DA.md (sections 1 à 3).
Puis évalue : <liste des chemins absolus>.
Écris ton verdict dans <P>/agents/<n>-<nom>.md au format de ta fiche. Tu ne modifies AUCUN autre fichier.
Réponds en 5 lignes maximum : verdict, note, les 2 corrections les plus importantes.
```

## Les règles de la boucle
- **VALIDÉ** : tu continues.
- **À CORRIGER** : tu appliques les corrections demandées (toutes celles marquées BLOQUANT, et les autres si elles sont rapides), puis tu relances le **même** agent, **neuf**, avec la nouvelle version et son premier verdict.
- **2 tours maximum par porte.** Après le 2e « À CORRIGER », tu continues quand même et tu écris les réserves dans le message final à Thomas : le rythme de publication passe avant la perfection (décision de Thomas).
- Un agent ne remplace jamais `controles/verifier.py` : les contrôles en code passent **d'abord**, l'agent juge ce que le code ne voit pas (l'intérêt, le ton, le motion design).
- **Si l'outil `Agent` n'existe pas dans la session** : fais la relecture toi-même, mais **à froid**. Relis la fiche, écris le verdict dans le fichier **avant** de corriger quoi que ce soit, et signale-le dans HISTORIQUE.md.
- Chaque verdict reste dans `$P/agents/` et est archivé avec la vidéo dans le Studio (`videos/Nxx/agents/`) : Thomas peut tout relire.

## Ce que chaque agent sait
- `savoir-tiktok.md` : ce qui marche sur TikTok d'après les sources (officielles, études, créateurs), avec le niveau de preuve.
- `retours-thomas.md` : les critiques de Thomas sur les vraies vidéos, avec le pourquoi. **C'est le plus important.**
- `DA.md`, `SCRIPT-HOOKS.md` : les règles de la chaîne.
- Les stats réelles des vidéos (Google Sheet, colonnes vues, % qui finit, abonnés gagnés) : la meilleure source sur ce qui marche **pour cette chaîne**. Si elles contredisent `savoir-tiktok.md`, ce sont les stats qui gagnent.

**En cas de contradiction : `DA.md` > `retours-thomas.md` > `PIPELINE.md` > `savoir-tiktok.md`.** Par exemple, `savoir-tiktok.md` conseille 61 à 75 s, mais le matin reste au format court (30-45 s) de `PIPELINE.md`.
