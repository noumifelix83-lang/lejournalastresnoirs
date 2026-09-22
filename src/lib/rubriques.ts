// La liste canonique des rubriques du journal, et leur regroupement dans la
// navigation. C'est la source de vérité unique : un composant qui a besoin
// du libellé, du slug ou du cluster d'une rubrique lit ce fichier plutôt que
// de recopier la chaîne en dur.

export type RubriqueSlug =
  | "politique"
  | "economie"
  | "societe"
  | "diplomatie"
  | "sante"
  | "environnement"
  | "developpement-durable"
  | "education"
  | "arts-culture-traditions"
  | "litterature"
  | "portrait";

export interface Rubrique {
  slug: RubriqueSlug;
  label: string;
  /** Regroupement dans la navigation principale. */
  cluster: "flat" | "vivre" | "culture";
}

export const RUBRIQUES: Rubrique[] = [
  { slug: "politique", label: "Politique", cluster: "flat" },
  { slug: "economie", label: "Économie", cluster: "flat" },
  { slug: "societe", label: "Société", cluster: "flat" },
  { slug: "diplomatie", label: "Diplomatie", cluster: "flat" },
  { slug: "sante", label: "Santé", cluster: "vivre" },
  { slug: "environnement", label: "Environnement", cluster: "vivre" },
  { slug: "developpement-durable", label: "Développement durable", cluster: "vivre" },
  { slug: "education", label: "Éducation", cluster: "vivre" },
  { slug: "arts-culture-traditions", label: "Arts, Culture & Traditions", cluster: "culture" },
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
