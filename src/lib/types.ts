import type { RubriqueSlug } from "./rubriques";

// Ces types décrivent la forme du contenu telle que les composants
// l'attendent. `src/lib/content.ts` les sert aujourd'hui depuis des données
// statiques ; le jour où le CMS (Sanity) est branché, seul ce fichier change
// — les composants et ces types restent identiques.

export interface ArticleImage {
  legende?: string;
  url?: string;
  width?: number;
  height?: number;
}

export interface Article {
  slug: string;
  rubrique: RubriqueSlug;
  titre: string;
  chapo?: string;
  extrait?: string;
  auteur?: string;
  publieIl_y_a: string; // ex. "Il y a 2 heures" — remplacé par une vraie date une fois le CMS branché
  image?: ArticleImage;
  aLaUne?: boolean;
}

export interface PortraitFeature {
  citation: string;
  nom: string;
  role: string;
  extrait: string;
  slug: string;
  image?: ArticleImage;
}

export interface LivreVitrine {
  genre: string;
  titre: string;
}
