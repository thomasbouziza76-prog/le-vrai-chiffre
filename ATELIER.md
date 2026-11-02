# L'atelier : les retouches demandées par Thomas, à tout moment

Thomas parle au manager dans le QG (« refais la couverture de la N°09, le texte est trop petit »). Le manager dépose une
**commande** dans le QG et déclenche la tâche **Atelier**. L'atelier appelle le bon agent, fait relire, remplace le fichier
dans le QG, écrit chaque étape au journal et marque la commande « faite ».

## Les commandes (base du QG, slug 3578fc9b-8c91-4201-9cb5-2ba66773f22e)
`commandes/<id>` : `{t, type, video, demande, statut, par, debut, fin, resultat}`
- `type` : `couverture` · `carrousel` · `texte` (titre, légende, hashtags) · `autre`
- `statut` : `en attente` → `en cours` → `faite` | `à déposer` (fichiers prêts, le manager les met en ligne) | `échec` | `à confirmer`
- `demande` : les mots de Thomas, tels quels. C'est ce qui compte le plus.

## Qui fait quoi
| Type | Fabrique | Relit (agent neuf) |
|---|---|---|
| couverture, carrousel | Graphiste (`agents/graphiste.md`, mode FABRIQUER) | Graphiste neuf (mode RELIRE) |
| texte | l'atelier lui-même, avec SCRIPT-HOOKS.md (légende) | Critique script (`agents/critique-script.md`), sur le texte seul |
| autre | l'atelier juge : si c'est faisable sans voix ni rendu complet, il le fait avec l'agent du métier ; sinon `à confirmer` |

**Coûts** : jamais de voix ElevenLabs ni de vidéo refaite depuis l'atelier sans `confirme: true` dans la commande (Thomas
l'a confirmé dans le chat). Sinon : statut `à confirmer` et `resultat` explique ce que ça coûterait.

## Procédure (une exécution de la tâche Atelier)
1. Outils : ToolSearch « select:mcp__claude-code-remote__add_repo » ; add_repo le-vrai-chiffre ET studio (owner
   thomasbouziza76-prog, access push). Clone les deux (`--depth 1`) dans /home/claude/. `export LVC_REPO=/home/claude/le-vrai-chiffre`.
2. Outils du QG : ToolSearch « select:mcp__claude-artifacts__db_list,mcp__claude-artifacts__db_get,mcp__claude-artifacts__db_write,mcp__claude-artifacts__get_artifact,mcp__claude-artifacts__publish_files ».
3. `db_list commandes` : prends les commandes `en attente`, la plus ancienne d'abord, **3 au maximum**. Aucune : arrête-toi
   (message final « Rien à faire »).
4. Pour chaque commande :
   a. merge `statut: en cours, debut` (ifVersion) ; journal : « Atelier : commande reçue (<type> N°xx) : <demande> » ;
      `agents/graphiste` (ou l'agent du métier) etat `travaille`, tache « <type> N°xx ».
   b. Rassemble : `videos/N<xx>` (titre, hook, sujet, sources, legende, notes), la ligne de la vidéo dans
      `historique/HISTORIQUE.md`, et le Studio `videos/N<xx>/` s'il existe (plan.js, ancienne couverture).
   c. Lance l'agent qui fabrique (outil Agent, general-purpose, au premier plan) avec sa fiche, la demande de Thomas mot
      pour mot, les infos de la vidéo et le dossier de travail `/tmp/atelier/N<xx>/`. Journal : une ligne quand il a fini.
   d. Lance l'agent qui relit (neuf). À CORRIGER → corrections → nouvelle relecture. **2 tours maximum.** Journal : une
      ligne par verdict, une ligne par correction faite.
   e. Livraison au QG (images en 720 px de large, avec un **nouveau nom** pour ne pas garder l'ancienne image en cache :
      `N<xx>-couv-v<k>.jpg`, `N<xx>-C<k>-<i>.jpg`). Trois chemins, dans cet ordre :
      1. **`mcp__claude-artifacts__publish_files`** s'il existe (ToolSearch) : `get_artifact`, puis publish_files mode **patch**,
         fichiers `media/…`, JAMAIS index.html.
      2. Sinon, **l'outil `Artifact`** de la session, SEULEMENT si les 3 conditions sont vraies : (a) `get_artifact` sur le
         slug donne exactement la version écrite dans `/home/claude/studio/qg/VERSION` ; (b) la description de l'outil
         garantit qu'il republie CE MÊME artefact en gardant les fichiers non listés (pas de remplacement complet) ;
         (c) tu passes comme page `file_path=/home/claude/studio/qg/index.html` (copie exacte de la page en ligne, tenue
         par le manager), sans la modifier, et tes images en fichiers `media/…`. Après, écris la nouvelle version dans
         `studio/qg/VERSION` (commit + push).
      3. Sinon : **dépôt pour le manager**. Copie les images dans `studio/depot/N<xx>/` (commit + push) et, dans la commande,
         `statut: à déposer`, `depot: ["N09-couv-v2.jpg", …]`. Le manager les publie à son passage (ou plus tôt s'il est là).
         Ne change pas `videos/N<xx>.media` dans ce cas : le manager le fait en publiant.
      Puis, si les fichiers sont en ligne : `db_get videos/N<xx>` et merge (ifVersion) `media.couv` / `media.carrousel` /
      `legende_carrousel`… Si la vidéo est déjà « Publiée », ajoute dans `notes` : « Couverture refaite après publication :
      à remplacer sur TikTok. »
   f. Studio : range dans `videos/N<xx>/` (crée le dossier s'il manque) `couverture.jpg` ou `carrousel/`, et les verdicts
      dans `agents/` ; commit + push. Si ça échoue, ne bloque pas : dis-le dans `resultat`.
   g. merge commande `statut: faite, fin, resultat` (une phrase pour Thomas : ce qui a changé, la note du relecteur) ;
      journal niveau `ok` ; agent etat `repos`.
   Si une étape échoue deux fois : `statut: échec`, `resultat` = l'erreur exacte, journal niveau `bloque`.
5. Message final (court) : les commandes traitées et leur résultat.

Règles de contenu : celles de la chaîne (aucun avis politique, aucune référence religieuse, aucun produit à intérêts
présenté comme solution, chiffres identiques à la vidéo).
