# Studio — back-office éditorial (Sanity)

C'est ici que la rédaction écrira, relira et publiera les articles, une fois
ces quelques étapes faites (à faire une seule fois).

## 1. Créer le projet Sanity (compte gratuit)

1. Allez sur https://www.sanity.io/ → créez un compte (gratuit pour ce volume
   d'usage).
2. Dans ce dossier `studio/`, lancez :
   ```
   npm install
   npx sanity login
   npx sanity init --project-id-only
   ```
   Suivez les invites (« Create new project », nommez-le par ex. « Astres
   Noirs »). Notez le **Project ID** qui s'affiche à la fin.
3. Créez `studio/.env` (copiez `studio/.env.example`) et renseignez :
   ```
   SANITY_STUDIO_PROJECT_ID=le_project_id_obtenu
   SANITY_STUDIO_DATASET=production
   ```

## 2. Lancer le studio en local

```
npm run dev
```

Ouvre le back-office sur http://localhost:3333 — c'est là que la rédaction
créera les auteur·es puis les articles (titre, rubrique, chapô, corps,
image, etc.).

## 3. Mettre le studio en ligne (pour que la rédaction y accède sans votre machine)

```
npm run deploy
```

Sanity vous donne une URL du type `https://astres-noirs.sanity.studio` —
c'est l'adresse à donner à la rédaction.

## 4. Brancher le site sur ce contenu

Dans `web/.env.local` (le dossier du site, pas celui-ci), ajoutez :
```
NEXT_PUBLIC_SANITY_PROJECT_ID=le_même_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

Puis, dans `src/lib/content.ts`, chaque fonction (`getArticleALaUne`,
`getArticlesParRubrique`, etc.) est à remplacer par un appel à
`sanityClient.fetch(...)` avec la requête GROQ correspondante, déjà écrite
dans `src/lib/sanity/queries.ts`. La forme des données ne change pas, donc
aucun composant n'a besoin d'être modifié à cette étape.

## Modèle de contenu actuel

- **`article`** : titre, slug, rubrique (liste fermée alignée sur
  `src/lib/rubriques.ts`), chapô, extrait, corps (texte enrichi + images),
  image principale, auteur·e (référence), date de publication, et une case
  « à la Une » (un seul article à la fois doit la porter — c'est lui qui
  occupe le grand emplacement en haut de la page d'accueil).
- **`auteur`** : nom, fonction, photo, bio courte.
- Le format **Portrait** n'est pas un type à part : c'est un `article` dont
  la rubrique est « Portrait », avec le champ « Citation en exergue » rempli.

Ajouter une rubrique : mettez-la à jour à la fois dans
`studio/schemaTypes/rubriques.ts` (ici) et `web/src/lib/rubriques.ts` (le
site) — c'est la seule chose à synchroniser à la main entre les deux
projets.
