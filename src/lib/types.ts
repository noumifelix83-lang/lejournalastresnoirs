import type { RubriqueSlug } from "./rubriques";

// Ces types décrivent la forme du contenu telle que les composants
// l'attendent. `src/lib/content.ts` les sert aujourd'hui depuis des données
// statiques ; le jour où le CMS (Sanity) est branché, seul ce fichier change
// — les composants et ces types restent identiques.

export interface Article {
  slug: string;
  rubrique: RubriqueSlug;
  titre: string;
  chapo?: string;
  extrait?: string;
  auteur?: string;
  publieIl_y_a: string; // ex. "Il y a 2 heures" — remplacé par une vraie date une fois le CMS branché
  image?: { legende: string };
  aLaUne?: boolean;
}

export interface PortraitFeature {
  citation: string;
  nom: string;
  role: string;
  extrait: string;
  slug: string;
}

export interface LivreVitrine {
  genre: string;
  titre: string;
}
