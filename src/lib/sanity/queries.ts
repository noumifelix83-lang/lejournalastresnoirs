// Requêtes GROQ prêtes à l'emploi, miroir des fonctions de
// `src/lib/content.ts`. Une fois `isSanityConfigured` vrai, chaque fonction
// de `content.ts` peut être remplacée par un `sanityClient.fetch(...)` avec
// la requête correspondante ci-dessous — la forme des données retournées a
// été gardée identique aux types de `src/lib/types.ts` pour que les
// composants n'aient rien à changer.

export const ARTICLE_A_LA_UNE = /* groq */ `
  *[_type == "article" && aLaUne == true] | order(publieLe desc) [0] {
    "slug": slug.current,
    rubrique,
    titre,
    chapo,
    "auteur": auteur->nom,
    "publieIl_y_a": publieLe,
    "image": { "legende": imagePrincipale.legende },
    aLaUne
  }
`;

export const ARTICLES_SECONDAIRES = /* groq */ `
  *[_type == "article" && aLaUne != true] | order(publieLe desc) [0...$limit] {
    "slug": slug.current, rubrique, titre, "publieIl_y_a": publieLe
  }
`;

export const ARTICLES_PAR_RUBRIQUE = /* groq */ `
  *[_type == "article" && rubrique == $rubrique && aLaUne != true]
    | order(publieLe desc) [0...$limit] {
    "slug": slug.current, rubrique, titre, extrait,
    "publieIl_y_a": publieLe,
    "image": { "legende": imagePrincipale.legende }
  }
`;

export const PORTRAIT_EN_AVANT = /* groq */ `
  *[_type == "article" && rubrique == "portrait"] | order(publieLe desc) [0] {
    citation,
    "nom": auteur->nom,
    "role": auteur->role,
    extrait,
    "slug": slug.current
  }
`;
