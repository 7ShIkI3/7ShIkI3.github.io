# Textes sacrés et initiatiques

Un fichier par tradition. Chaque fichier ajoute ses entrées à `window.SACRED_TEXTS` et doit être chargé par une balise `<script>` dans `index.html`, après `data.js`.

Champs d’une entrée :

- `trad` : identifiant de la fiche de rattachement dans `data.js` (ex. `islam`, `fm`).
- `t` : titre ; `alt` : autre nom ou titre original (facultatif).
- `d` : datation ; `lang` : langue d’origine.
- `but` : à quoi sert le texte, pour ceux qui le lisent.
- `ctx` : contexte historique (auteur, rédaction, usage, traductions anciennes).
- `links` : liens vers le texte intégral. Soit `{n:"Nom", u:"https://…"}` pour un lien direct, soit une recherche : `{ws:"…"}` Wikisource, `{gb:"…"}` Gutenberg, `{ga:"…"}` Gallica, `{ia:"…"}` Internet Archive.

Règles : textes du domaine public ou consultables librement, présentation factuelle, pas de citation longue.
