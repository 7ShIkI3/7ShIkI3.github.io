# Encyclopédie des organisations

Site statique (HTML, CSS et JavaScript, sans build) qui cartographie les sociétés secrètes et initiatiques, les nouveaux mouvements religieux et les religions du monde.

**En ligne :** https://7shiki3.github.io/encyclopedie/

- `index.html` : interface (accueil, index filtrable, arborescence, fiches, bibliothèque, chronologie, méthode)
- `data.js` : les fiches (`window.ORG_DATA`) et les sources générales
- `extra.js`, `extra2.js` : buts, textes de référence, extraits du domaine public, chronologies et documents (`window.ORG_EXTRA`)

## Ajouter une fiche

Ajoutez un objet dans `data.js` avec au minimum `i` (identifiant), `c` (`S`, `M` ou `R`), `t` (type), `n` (nom) et, si besoin, `p` (identifiant du parent). Les autres champs sont décrits en tête du fichier.

## Avertissement

Cartographie de départ, non exhaustive, rédigée sans vérification en ligne : contrôlez les dates et les faits auprès des sources citées avant de les réutiliser. Les extraits proviennent uniquement de textes du domaine public ; les œuvres protégées sont présentées sans extrait.
