import { defineQuery } from "next-sanity";

// Requêtes GROQ prêtes à l'emploi, miroir des fonctions de
// `src/lib/content.ts`. Une fois `isSanityConfigured` vrai (voir `env.ts`),
// chaque fonction de `content.ts` peut être remplacée par un
// `sanityClient.fetch(...)` avec la requête correspondante ci-dessous — la
// forme des données retournées a été gardée identique aux types de
// `src/lib/types.ts` pour que les composants n'aient rien à changer.
// `defineQuery` permet à TypeGen (voir studio/README.md) de générer les
// types de retour automatiquement.

// Fragment réutilisé partout où une image d'article est affichée : l'URL de
// l'asset et ses dimensions réelles (pour éviter le "layout shift"), plus la
// légende saisie dans le Studio.
const IMAGE_PROJECTION = `imagePrincipale{
    "legende": legende,
    "url": asset->url,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height
  }`;

export const ARTICLE_A_LA_UNE_QUERY = defineQuery(`
  *[_type == "article" && aLaUne == true] | order(publieLe desc) [0] {
    "slug": slug.current,
    rubrique,
    titre,
    chapo,
    "auteur": auteur->nom,
    "publieIl_y_a": publieLe,
    "image": ${IMAGE_PROJECTION},
    aLaUne
  }
`);

export const ARTICLES_SECONDAIRES_QUERY = defineQuery(`
  *[_type == "article" && aLaUne != true] | order(publieLe desc) [0...$limit] {
    "slug": slug.current, rubrique, titre, "publieIl_y_a": publieLe,
    "image": ${IMAGE_PROJECTION}
  }
`);

export const ARTICLES_PAR_RUBRIQUE_QUERY = defineQuery(`
  *[_type == "article" && rubrique == $rubrique && aLaUne != true]
    | order(publieLe desc) [0...$limit] {
    "slug": slug.current, rubrique, titre, extrait,
    "publieIl_y_a": publieLe,
    "image": ${IMAGE_PROJECTION}
  }
`);

export const PORTRAIT_EN_AVANT_QUERY = defineQuery(`
  *[_type == "article" && rubrique == "portrait"] | order(publieLe desc) [0] {
    citation,
    "nom": auteur->nom,
    "role": auteur->role,
    extrait,
    "slug": slug.current,
    "image": ${IMAGE_PROJECTION}
  }
`);
