// La liste canonique des rubriques du journal, et leur regroupement dans la
// navigation. C'est la source de vérité unique : un composant qui a besoin
// du libellé, du slug ou du cluster d'une rubrique lit ce fichier plutôt que
// de recopier la chaîne en dur.
//
// Ligne éditoriale (2026-09-28, décision du PDG) : le journal devient un
// média spécialisé dans l'art, la culture et les traditions africaines.

export type RubriqueSlug =
  | "actualite"
  | "cinema"
  | "interview"
  | "artisanat"
  | "high-tech"
  | "musiques-folkloriques"
  | "art-culinaire"
  | "decouverte"
  | "diaspora"
  | "traditions-ancestrales"
  | "litterature"
  | "portrait";

export interface Rubrique {
  slug: RubriqueSlug;
  label: string;
  /** Regroupement dans la navigation principale. */
  cluster: "flat" | "vivre" | "culture";
}

export const RUBRIQUES: Rubrique[] = [
  { slug: "actualite", label: "Actualité", cluster: "flat" },
  { slug: "cinema", label: "Cinéma", cluster: "flat" },
  { slug: "interview", label: "Interview", cluster: "flat" },
  { slug: "artisanat", label: "Artisanat", cluster: "flat" },
  { slug: "high-tech", label: "High Tech", cluster: "flat" },
  { slug: "musiques-folkloriques", label: "Musiques folkloriques", cluster: "vivre" },
  { slug: "art-culinaire", label: "Art culinaire", cluster: "vivre" },
  { slug: "decouverte", label: "Découverte", cluster: "vivre" },
  { slug: "diaspora", label: "Diaspora", cluster: "vivre" },
  { slug: "traditions-ancestrales", label: "Traditions ancestrales", cluster: "culture" },
  { slug: "litterature", label: "Littérature", cluster: "culture" },
  { slug: "portrait", label: "Portraits", cluster: "culture" },
];

export function rubrique(slug: RubriqueSlug): Rubrique {
  const found = RUBRIQUES.find((r) => r.slug === slug);
  if (!found) throw new Error(`Rubrique inconnue : ${slug}`);
  return found;
}

export const RUBRIQUES_FLAT = RUBRIQUES.filter((r) => r.cluster === "flat");
export const RUBRIQUES_VIVRE = RUBRIQUES.filter((r) => r.cluster === "vivre");
export const RUBRIQUES_CULTURE = RUBRIQUES.filter((r) => r.cluster === "culture");
