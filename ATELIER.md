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
   e. Livraison au QG : suis la section « Livraison au QG » plus bas.
   f. Studio : range dans `videos/N<xx>/` (crée le dossier s'il manque) `couverture.jpg` ou `carrousel/`, et les verdicts
      dans `agents/` ; commit + push. Si ça échoue, ne bloque pas : dis-le dans `resultat`.
   g. merge commande `statut: faite, fin, resultat` (une phrase pour Thomas : ce qui a changé, la note du relecteur) ;
      journal niveau `ok` ; agent etat `repos`.
   Si une étape échoue deux fois : `statut: échec`, `resultat` = l'erreur exacte, puis **section « En cas de problème »**.
5. Message final (court) : les commandes traitées et leur résultat.

Règles de contenu : celles de la chaîne (aucun avis politique, aucune référence religieuse, aucun produit à intérêts
présenté comme solution, chiffres identiques à la vidéo).

## Livraison au QG (vaut aussi pour l'étape 11 des vidéos du matin et du soir)
Images en 720 px de large, vidéo recompressée (PIPELINE.md étape 11), avec un **nouveau nom** pour une retouche
(`N<xx>-couv-v<k>.jpg`, `N<xx>-C<k>-<i>.jpg`) afin que l'ancienne image ne reste pas en cache.
1. Si `mcp__claude-artifacts__publish_files` existe (ToolSearch) : `get_artifact`, puis publish_files mode **patch**, fichiers
   `media/…` seulement.
2. Sinon (cas normal des tâches automatiques) : **l'outil intégré `Artifact`**, testé le 02/11 : il republie le même artefact
   et GARDE les fichiers qu'on ne liste pas, mais il exige la page. Donc :
   a. `get_artifact` sur le slug 3578fc9b-8c91-4201-9cb5-2ba66773f22e : sa version doit être EXACTEMENT celle écrite dans
      `/home/claude/studio/qg/VERSION` (le manager tient cette copie). Sinon, n'envoie rien : passe au 3.
   b. Appelle `Artifact` sur CE slug (pas un nouvel artefact) avec la page `/home/claude/studio/qg/index.html` telle quelle
      (ne la modifie JAMAIS) et tes fichiers servis sous `media/…`.
   c. Vérifie avec `mcp__claude-artifacts__list_files` que tes fichiers sont là ET que les anciens aussi (media/N05.mp4,
      media/tico.png…). S'il en manque : **En cas de problème**, tout de suite.
   d. Écris la nouvelle version dans `studio/qg/VERSION`, commit + push (pull --rebase avant).
3. Sinon : copie les fichiers dans `studio/depot/N<xx>/` (commit + push), commande en `à déposer` avec `depot: [noms]`, puis
   **En cas de problème** (le manager les mettra en ligne).
Puis `db_get videos/N<xx>` et merge (ifVersion) `media.couv` / `media.carrousel` / `legende_carrousel`… Si la vidéo est déjà
« Publiée », ajoute dans `notes` : « Couverture refaite après publication : à remplacer sur TikTok. »

## En cas de problème (échec, blocage, fichier manquant) : PRÉVENIR, pas seulement noter
Thomas doit le savoir tout de suite, et le manager doit pouvoir réparer. Dans l'ordre :
1. **Journal** : une ligne niveau `bloque` avec l'erreur exacte ; l'agent concerné en `bloque`.
2. **Message dans le chat du QG** : `db_write set chat/<AAAAMMJJ-HHMM>-alerte` avec `{t, de: "manager", alerte: true,
   texte}`. Le texte, en 3 phrases simples : ce qui a coincé, ce qui est déjà fait (ex. « les images sont prêtes dans le
   Studio »), et ce qui va se passer (« le manager s'en occupe ») ou ce que Thomas doit faire, s'il y a quelque chose.
   Commence par « Souci sur la N°xx : ». Pas de jargon.
3. **Réveiller le manager** : `db_get qg/reveil`, puis `mcp__claude-code-remote__fire_trigger` avec son `trigger_id`
   (ToolSearch « select:mcp__claude-code-remote__fire_trigger »). Si ça échoue, ce n'est pas grave : il passe à 8 h 37,
   12 h 37 et 18 h 17.
4. **Ton message final commence par « ⚠ PROBLÈME : »** (Thomas reçoit une notification à la fin de la tâche).
