# L'équipe d'agents : qui fait quoi, et quand

> La session de la tâche est le **réalisateur** : il écrit le script, la voix, le plan et lance le rendu.
> Aux 4 étapes stratégiques, il fait appel à un **agent spécialisé et neuf** (outil `Agent`, type `general-purpose`).
> Un agent qui n'a pas fait le travail voit les erreurs que l'auteur ne voit plus.
> Chaque agent n'a que sa fiche, les fichiers qu'on lui donne et son verdict à écrire.

## INTERNET : SANS DEMANDER (décision de Thomas, 03/11)
Les agents vont sur Internet quand ils en ont besoin, sur n'importe quel site, SANS jamais attendre une autorisation (Thomas
n'est pas là pour cliquer, et une tâche ne doit jamais s'arrêter pour ça). Chercher : `WebSearch`. Lire une page :
**`curl` dans le terminal** (le réseau des tâches est ouvert à tous les domaines), PAS `WebFetch`, qui demande une
autorisation à Thomas pour chaque nouveau site. Exemple :
`curl -sL --max-time 30 -A "Mozilla/5.0" "<url>" | python3 -c "import sys,html,re;t=sys.stdin.read();t=re.sub(r'(?s)<(script|style).*?</\1>','',t);print(html.unescape(re.sub(r'<[^>]+>',' ',t))[:20000])"`
(PDF : `curl -sL -o /tmp/f.pdf <url> && pdftotext /tmp/f.pdf - | head -400`). Une page qui refuse : prends une autre source
officielle. À écrire dans CHAQUE brief d'agent.

## Les portes de chaque vidéo (4 + la porte 1 bis du Vérificateur)

| # | Quand | Agent (fiche) | Il reçoit | Il écrit |
|---|---|---|---|---|
| 1 | Avant d'écrire le script | **Stratège** (`stratege.md`) | `sujets.md`, `historique/HISTORIQUE.md`, les stats du Sheet (tu les lui colles), `agents/savoir-tiktok.md` | `$P/agents/1-strategie.md` : sujet, angle, personnage, hook, question de débat, mot-clé |
| 1 bis | Sujet et angle fixés, AVANT d'écrire le script | **Vérificateur** (`verificateur.md`) | `$P/agents/1-strategie.md`, la ligne du sujet de `sujets.md` | `$P/agents/1b-chiffres.md` : chaque chiffre avec valeur, périmètre, source, formulation sûre |
| 2 | Script + texte voix écrits, AVANT la voix | **Critique script** (`critique-script.md`) | `$P/script.md` (texte voix avec balises + phrases + cartons), `1-strategie.md`, `1b-chiffres.md` | `$P/agents/2-script.md` |
| 3 | Plan écrit, contrôles verts, AVANT le rendu | **Critique motion** (`critique-motion.md`) | `$P/boards/planche-plan-*.jpg` (1 image/s), `$P/plan.js`, `$P/rapport-controles.json` | `$P/agents/3-motion.md` |
| 4 | Vidéo rendue, AVANT de livrer à Thomas | **Juge final** (`juge-final.md`) | `$P/boards/planche-video-*.jpg`, `$P/script.md`, `$P/mots.json` (ce que dit la voix), `$P/rapport-controles.json`, `$P/agents/1b-chiffres.md` | `$P/agents/4-juge.md` |

## Le Graphiste (02/11) : couverture et carrousel
Après la porte 4, pour les étapes 8 et 8 ter, le réalisateur ne fait plus la couverture et le carrousel lui-même :
il lance le **Graphiste** (`graphiste.md`, mode FABRIQUER) avec le script, les chiffres, le hook et la légende, puis un
**Graphiste neuf** en mode RELIRE. Même boucle : 2 tours maximum. Le même agent sert à l'**atelier** (`ATELIER.md`)
quand Thomas demande une retouche depuis le QG.

## Les postes de nuit (02/11) : tâche « Veille, marché et audit · chaque nuit » (23 h 23, après les stats)
| Poste (fiche) | Quand | Ce qu'il écrit |
|---|---|---|
| **Veilleur** (`veilleur.md`) | Chaque nuit | `recherche/veille/<date>.md` ; la tâche recopie jusqu'à 3 sujets dans le QG (`sujets/v…`, etat « propose ») ; Thomas choisit, `sujets.md` n'est jamais modifié |
| **Auditeur d'erreurs** (`auditeur.md`) | Chaque nuit, pour les vidéos publiées il y a 2 jours (ou plus, jamais auditées) | Studio `videos/N<xx>/audit.md` + leçons proposées dans le QG (`lecons/a…`, statut « proposée ») |
| **Analyste marché** (`analyste-marche.md`) | La nuit du dimanche | `recherche/marche/<date>.md` ; la tâche recopie ses principes dans le QG (`lecons/m…`, statut « proposée ») |

Ces trois postes **proposent** : aucun ne modifie `DA.md`, `PIPELINE.md`, `SCRIPT-HOOKS.md`, `retours-thomas.md` ni les fiches.
Le manager (passage de 8 h 37) lit les leçons « proposée » : il applique celles qui sont justes et vérifiables (dans le bon
fichier, avec la date et la source) et les passe à « appliquée », ou les passe à « écartée » avec la raison. Thomas choisit les sujets.

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

## Si un agent ne répond plus (02/11)
Un agent qui a beaucoup travaillé peut ne plus pouvoir être relancé (historique trop lourd). Ce n'est pas grave si **le journal du projet (`$P/journal.md`) est tenu à chaque étape** : on lance un nouvel agent avec le même rôle, on lui donne le journal, le plan, le dernier verdict et ce qui a changé depuis, et il reprend là où l'autre s'est arrêté. D'où la règle : chaque agent note chaque étape dans le journal, avec l'heure et le résultat.

## Leçons du test de la nuit du 02/11
- **Un agent par porte, des missions courtes.** Un agent qui enchaîne toutes les étapes finit avec un historique trop lourd et ne peut plus être relancé. Mieux : un réalisateur jusqu'à la porte 3, un nouveau (avec le journal) jusqu'à la porte 4, un autre pour les livrables.
- **Dans chaque brief : « personne ne peut approuver d'action »** (pas de réseau, pas d'installation, fichiers de travail dans /tmp/<nom>/). Deux agents se sont bloqués cette nuit en attendant une approbation que personne ne pouvait donner.
- **Les relecteurs à froid font leur travail** : le Critique motion a trouvé à l'image tous les défauts que le coordinateur avait vus, et d'autres ; il a aussi révélé deux trous dans les contrôles (actions déclarées mais pas dessinées, sous-titres). Les contrôles ont été renforcés en conséquence (dessin qui bouge mesuré en pixels, bruitages jamais plus forts que la voix).
