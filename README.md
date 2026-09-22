# Le Journal Astres Noirs — site

Le code du journal en ligne **lejournalastresnoirs.cm**, publication
numérique des Éditions Astres Noirs.

## Comment c'est construit, en clair

Deux projets séparés dans ce dépôt :

- **`web/` (ce dossier)** — le site que les lecteurs voient. Construit avec
  [Next.js](https://nextjs.org) : rapide, avec de bonnes performances même
  sur connexion lente, ce qui compte pour une audience qui lit beaucoup depuis
  un téléphone.
- **`studio/`** — le back-office où la rédaction écrit et publie les
  articles, sans toucher au code. Voir [`studio/README.md`](./studio/README.md)
  pour le mettre en place (quelques étapes, à faire une fois).

Tant que le studio n'est pas branché, le site affiche du **contenu de
démonstration** (les articles-exemples qui ont servi à valider la maquette
avec vous). Ils vivent dans [`src/lib/content.ts`](./src/lib/content.ts) et
seront remplacés par le vrai contenu de la rédaction une fois le studio
connecté — voir la dernière section de `studio/README.md`.

## Lancer le site en local

Il faut [Node.js](https://nodejs.org) (version 20 ou plus) installé.

```
npm install
npm run dev
```

Puis ouvrez http://localhost:3000.

## Où se trouve quoi

```
web/
  src/
    app/            → les pages (actuellement : la page d'accueil)
    components/      → les blocs de la page (en-tête, hero, rubriques, pied de page…)
    lib/
      rubriques.ts   → la liste des rubriques du journal (source unique)
      types.ts       → la forme des données (article, portrait, …)
      content.ts      → le contenu actuel (démo) — futur point de bascule vers le CMS
      sanity/         → prêt pour la connexion au CMS (voir studio/README.md)
  studio/            → le back-office éditorial (Sanity) — voir son propre README
```

## Prochaines étapes

1. **Brancher le CMS** : suivre `studio/README.md` pour que la rédaction
   puisse publier elle-même.
2. **Pages de rubrique et d'article** : la page d'accueil est prête ; les
   pages individuelles (`/rubrique/[slug]`, `/article/[slug]`) restent à
   construire une fois le contenu réel disponible.
3. **Hébergement** : pas encore choisi. Le projet est un Next.js standard,
   donc portable — [Vercel](https://vercel.com) (fait par les créateurs de
   Next.js, gratuit pour démarrer) est l'option la plus simple si aucune
   contrainte d'hébergement local n'impose autre chose.

## Identité visuelle

Les couleurs, polices et le sigle (croissant + astre) sont posés dans
`src/app/globals.css` et `src/components/Logo.tsx`, alignés sur le logo
validé avec le PDG.
