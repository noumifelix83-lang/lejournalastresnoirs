# Astres Noirs Actu — site

Le code du journal en ligne **lejournalastresnoirsactu.cm**, publication
numérique des Éditions Astres Noirs.

## Comment c'est construit, en clair

Ce dépôt (`web/`) est le site que les lecteurs voient — construit avec
[Next.js](https://nextjs.org) : rapide, avec de bonnes performances même
sur connexion lente, ce qui compte pour une audience qui lit beaucoup depuis
un téléphone.

À côté (pas dans ce dépôt), un projet **frère** :

```
lejournalastresnoirs/            ← dossier parent
├── web/                          ← ce dépôt (le site, sur GitHub)
└── studio-lejournalastresnoirs/  ← le back-office éditorial (Sanity)
```

`studio-lejournalastresnoirs/` est le back-office où la rédaction écrit et
publie les articles, sans toucher au code. Voir son propre
`README.md` pour le lancer ou le déployer. Le projet Sanity
(`lejournalastresnoirs`, id `of59z492`) est déjà connecté à ce site — voir
`.env.local`.

Tant que le studio n'a pas de vrai contenu, le site affiche du **contenu de
démonstration** (les articles-exemples qui ont servi à valider la maquette
avec vous). Ils vivent dans [`src/lib/content.ts`](./src/lib/content.ts) et
seront remplacés par le vrai contenu de la rédaction une fois branchés —
voir la fin de `studio-lejournalastresnoirs/README.md`.

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
      sanity/         → client Sanity (next-sanity) et requêtes GROQ, prêts à brancher
  sanity.types.ts    → types générés automatiquement à partir du schéma Sanity (TypeGen)
```

## Prochaines étapes

1. **Ajouter du vrai contenu** dans le studio, puis brancher
   `src/lib/content.ts` dessus (détails dans
   `studio-lejournalastresnoirs/README.md`).
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
