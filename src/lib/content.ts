import type { Article, LivreVitrine, PortraitFeature } from "./types";
import type { RubriqueSlug } from "./rubriques";
import { sanityClient } from "./sanity/client";
import { isSanityConfigured } from "./sanity/env";
import {
  ARTICLES_PAR_RUBRIQUE_QUERY,
  ARTICLES_RUBRIQUE_COMPLETE_QUERY,
  ARTICLES_SECONDAIRES_QUERY,
  ARTICLE_A_LA_UNE_QUERY,
  ARTICLE_BY_SLUG_QUERY,
  PORTRAIT_EN_AVANT_QUERY,
  TOUS_LES_SLUGS_QUERY,
} from "./sanity/queries";

// -----------------------------------------------------------------------
// Couche de contenu : Sanity d'abord, contenu de démonstration en repli.
//
// Le projet Sanity est branché (voir sanity/env.ts), mais tant que la
// rédaction n'a pas publié de vrais articles, chaque fonction retombe sur
// le contenu de démonstration ci-dessous plutôt que d'afficher une page
// vide. Publiez un article dans le Studio (avec « Mettre à la Une » coché
// pour au moins un) et il remplacera automatiquement l'exemple
// correspondant, sans rien changer ici.
// -----------------------------------------------------------------------

// Le site est généré statiquement à la construction : sans ceci, une
// publication dans le Studio n'apparaîtrait qu'après un redéploiement.
// Avec `revalidate`, Next.js revérifie Sanity au plus toutes les 60
// secondes et régénère la page si le contenu a changé — pas besoin de
// redéployer à chaque article.
const REVALIDATE = { next: { revalidate: 60 } };

/** Normalise la projection GROQ d'une image en `ArticleImage`, ou `undefined` si l'article n'en a pas. */
function mapImage(img: { legende?: string | null; url?: string | null; width?: number | null; height?: number | null } | null | undefined) {
  if (!img?.url) return img?.legende ? { legende: img.legende } : undefined;
  return {
    legende: img.legende ?? undefined,
    url: img.url,
    width: img.width ?? undefined,
    height: img.height ?? undefined,
  };
}

/** "Il y a 3 heures" / "Il y a 2 jours", à partir d'une date ISO Sanity. */
function publieIlYA(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffH = Math.round(diffMs / 3_600_000);
  if (diffH < 1) return "À l'instant";
  if (diffH < 24) return `Il y a ${diffH} heure${diffH > 1 ? "s" : ""}`;
  const diffJ = Math.round(diffH / 24);
  return `Il y a ${diffJ} jour${diffJ > 1 ? "s" : ""}`;
}

const ARTICLES: Article[] = [
  {
    slug: "festival-panafricain-arts-culture",
    rubrique: "actualite",
    titre: "Retour sur le Festival panafricain des arts et de la culture",
    chapo:
      "L'évènement a rassemblé artistes, artisans et conteurs venus de tout le continent pour célébrer la richesse du patrimoine culturel africain.",
    auteur: "Rédaction",
    publieIl_y_a: "Il y a 2 heures",
    image: { legende: "Illustration — Actualité" },
    aLaUne: true,
  },
  {
    slug: "semaine-du-patrimoine-temps-forts",
    rubrique: "actualite",
    titre: "Semaine du patrimoine : les temps forts à ne pas manquer",
    publieIl_y_a: "Il y a 4 heures",
    image: { legende: "Illustration — Actualité" },
  },
  {
    slug: "musee-des-civilisations-nouvelle-exposition",
    rubrique: "actualite",
    titre: "Le musée des civilisations inaugure une nouvelle exposition permanente",
    publieIl_y_a: "Il y a 6 heures",
    image: { legende: "Illustration — Actualité" },
  },
  {
    slug: "prix-litteraire-panafricain-lauréats",
    rubrique: "actualite",
    titre: "Prix littéraire panafricain : la liste des lauréats dévoilée",
    publieIl_y_a: "Il y a 9 heures",
    image: { legende: "Illustration — Actualité" },
  },
  {
    slug: "reforme-electorale-grandes-lignes",
    rubrique: "politique",
    titre: "Réforme électorale : les grandes lignes du projet dévoilées à l'Assemblée",
    extrait: "Le texte, attendu depuis plusieurs mois, doit être examiné en séance plénière dès la semaine prochaine.",
    publieIl_y_a: "Il y a 3 heures",
    image: { legende: "Illustration — Politique" },
  },
  {
    slug: "decentralisation-priorites-budgetaires",
    rubrique: "politique",
    titre: "Décentralisation : les régions présentent leurs priorités budgétaires",
    publieIl_y_a: "Il y a 7 heures",
    image: { legende: "Illustration — Politique" },
  },
  {
    slug: "vie-parlementaire-textes-a-surveiller",
    rubrique: "politique",
    titre: "Vie parlementaire : les textes à surveiller cette session",
    publieIl_y_a: "Il y a 1 jour",
    image: { legende: "Illustration — Politique" },
  },
  {
    slug: "nollywood-nouveaux-publics",
    rubrique: "cinema",
    titre: "Nollywood à l'honneur : le cinéma nigérian conquiert de nouveaux publics",
    publieIl_y_a: "Il y a 3 heures",
    image: { legende: "Illustration — Cinéma" },
  },
  {
    slug: "cinema-camerounais-nouvelle-generation",
    rubrique: "cinema",
    titre: "Cinéma camerounais : une nouvelle génération de réalisateurs émerge",
    publieIl_y_a: "Il y a 5 heures",
    image: { legende: "Illustration — Cinéma" },
  },
  {
    slug: "retrospective-classiques-cinema-africain",
    rubrique: "cinema",
    titre: "Rétrospective : les classiques du cinéma africain à redécouvrir",
    publieIl_y_a: "Il y a 8 heures",
    image: { legende: "Illustration — Cinéma" },
  },
  {
    slug: "entretien-conteuse-transmission-orale",
    rubrique: "interview",
    titre: "Entretien avec une conteuse traditionnelle sur la transmission orale",
    extrait: "Elle raconte comment les récits se transmettent encore aujourd'hui, de génération en génération.",
    publieIl_y_a: "Il y a 3 heures",
    image: { legende: "Illustration — Interview" },
  },
  {
    slug: "rencontre-sculpteur-grassfields",
    rubrique: "interview",
    titre: "Rencontre avec un sculpteur sur bois des Grassfields",
    extrait: "Un artisan revient sur des décennies de pratique et sur l'avenir de son art.",
    publieIl_y_a: "Il y a 7 heures",
    image: { legende: "Illustration — Interview" },
  },
  {
    slug: "historien-royaumes-precoloniaux",
    rubrique: "interview",
    titre: "Un historien revient sur les royaumes précoloniaux d'Afrique centrale",
    publieIl_y_a: "Il y a 10 heures",
    image: { legende: "Illustration — Interview" },
  },
  {
    slug: "vannerie-traditionnelle-savoir-faire",
    rubrique: "artisanat",
    titre: "Vannerie traditionnelle : un savoir-faire transmis de génération en génération",
    publieIl_y_a: "Il y a 4 heures",
    image: { legende: "Illustration — Artisanat" },
  },
  {
    slug: "poterie-ancestrale-tradition-modernite",
    rubrique: "artisanat",
    titre: "La poterie ancestrale, entre tradition et modernité",
    publieIl_y_a: "Il y a 6 heures",
    image: { legende: "Illustration — Artisanat" },
  },
  {
    slug: "bijoux-perles-savoir-faire-local",
    rubrique: "artisanat",
    titre: "Bijoux de perles : un savoir-faire local qui s'exporte",
    publieIl_y_a: "Il y a 9 heures",
    image: { legende: "Illustration — Artisanat" },
  },
  {
    slug: "intelligence-artificielle-langues-africaines",
    rubrique: "high-tech",
    titre: "Ces start-up qui entraînent l'intelligence artificielle sur les langues africaines",
    publieIl_y_a: "Il y a 3 heures",
    image: { legende: "Illustration — High Tech" },
  },
  {
    slug: "applications-patrimoine-numerique",
    rubrique: "high-tech",
    titre: "Des applications pour numériser et préserver le patrimoine culturel",
    publieIl_y_a: "Il y a 6 heures",
    image: { legende: "Illustration — High Tech" },
  },
  {
    slug: "fintech-afrique-revolution-paiements",
    rubrique: "high-tech",
    titre: "Fintech : la révolution des paiements mobiles continue de s'accélérer",
    publieIl_y_a: "Il y a 9 heures",
    image: { legende: "Illustration — High Tech" },
  },
  {
    slug: "mvet-epopee-chantee",
    rubrique: "musiques-folkloriques",
    titre: "Le Mvet, épopée chantée des peuples fang et béti",
    publieIl_y_a: "Il y a 5 heures",
  },
  {
    slug: "bikutsi-nouvelle-jeunesse",
    rubrique: "musiques-folkloriques",
    titre: "Les rythmes du Bikutsi retrouvent une nouvelle jeunesse",
    publieIl_y_a: "Il y a 8 heures",
  },
  {
    slug: "balafon-tambours-instruments-ceremonies",
    rubrique: "musiques-folkloriques",
    titre: "Balafon et tambours : les instruments qui rythment les cérémonies",
    publieIl_y_a: "Il y a 1 jour",
  },
  {
    slug: "ndole-plat-emblematique",
    rubrique: "art-culinaire",
    titre: "Le ndolé, plat emblématique du patrimoine culinaire camerounais",
    publieIl_y_a: "Il y a 6 heures",
  },
  {
    slug: "cuisine-de-rue-africaine-saveurs",
    rubrique: "art-culinaire",
    titre: "Cuisine de rue africaine : des saveurs qui voyagent",
    publieIl_y_a: "Il y a 9 heures",
  },
  {
    slug: "recettes-grand-mere-sauvegarder-traditions",
    rubrique: "art-culinaire",
    titre: "Recettes de grand-mère : sauvegarder les traditions culinaires",
    publieIl_y_a: "Il y a 1 jour",
  },
  {
    slug: "chefferie-bandjoun-patrimoine-bamileke",
    rubrique: "decouverte",
    titre: "Visite de la chefferie Bandjoun, joyau du patrimoine bamiléké",
    publieIl_y_a: "Il y a 7 heures",
  },
  {
    slug: "sites-sacres-foret-du-dja",
    rubrique: "decouverte",
    titre: "Sur les traces des sites sacrés de la forêt du Dja",
    publieIl_y_a: "Il y a 10 heures",
  },
  {
    slug: "palais-royal-foumban-visiteurs",
    rubrique: "decouverte",
    titre: "Le palais royal de Foumban ouvre ses portes aux visiteurs",
    publieIl_y_a: "Il y a 1 jour",
  },
  {
    slug: "diaspora-transmission-culturelle",
    rubrique: "diaspora",
    titre: "La diaspora africaine et la transmission culturelle à l'étranger",
    publieIl_y_a: "Il y a 5 heures",
  },
  {
    slug: "artistes-diaspora-rayonnement-afrique",
    rubrique: "diaspora",
    titre: "Ces artistes de la diaspora qui font rayonner l'Afrique",
    publieIl_y_a: "Il y a 8 heures",
  },
  {
    slug: "retour-aux-sources-diaspora-traditions",
    rubrique: "diaspora",
    titre: "Retour aux sources : quand la diaspora renoue avec ses traditions",
    publieIl_y_a: "Il y a 1 jour",
  },
  {
    slug: "rites-initiatiques-patrimoine-immateriel",
    rubrique: "arts-culture-traditions",
    titre: "Les rites initiatiques, un patrimoine immatériel à préserver",
    publieIl_y_a: "Il y a 4 heures",
    image: { legende: "Illustration — Traditions" },
  },
  {
    slug: "chefferies-gardiennes-memoire-collective",
    rubrique: "arts-culture-traditions",
    titre: "Chefferies traditionnelles : gardiennes de la mémoire collective",
    publieIl_y_a: "Il y a 5 heures",
    image: { legende: "Illustration — Traditions" },
  },
  {
    slug: "symbolique-pagne-afrique-centrale",
    rubrique: "arts-culture-traditions",
    titre: "La symbolique du pagne dans les traditions d'Afrique centrale",
    publieIl_y_a: "Il y a 1 jour",
    image: { legende: "Illustration — Traditions" },
  },
  {
    slug: "ceremonies-ancestrales-transmission-adaptation",
    rubrique: "arts-culture-traditions",
    titre: "Cérémonies ancestrales : entre transmission et adaptation",
    publieIl_y_a: "Il y a 1 jour",
    image: { legende: "Illustration — Traditions" },
  },
];

const PORTRAIT: PortraitFeature = {
  citation: "Écrire, c'est refuser d'oublier",
  nom: "[Nom de l'invité·e]",
  role: "écrivaine et gardienne de mémoire",
  extrait:
    "Rencontre avec [Nom de l'invité·e], écrivaine et gardienne de mémoire, dont l'œuvre explore la mémoire collective à travers la fiction.",
  slug: "portrait-nom-invitee",
};

const LIVRES: LivreVitrine[] = [
  { genre: "Roman", titre: "Nouveautés de la rentrée littéraire" },
  { genre: "Poésie", titre: "Voix nouvelles" },
  { genre: "Essai", titre: "Regards sur le continent" },
  { genre: "Nouvelles", titre: "Recueils courts, grandes voix" },
  { genre: "BD & jeunesse", titre: "À lire en famille" },
];

const A_LA_UNE_TICKER = [
  "Festival panafricain des arts et de la culture : retour sur l'évènement",
  "Masques d'Afrique : la fabrication en perte de vitesse",
  "Chefferie Bandjoun : joyau du patrimoine bamiléké",
];

export async function getArticleALaUne(): Promise<Article> {
  if (isSanityConfigured) {
    const a = await sanityClient.fetch(ARTICLE_A_LA_UNE_QUERY, {}, REVALIDATE);
    if (a?.slug && a.titre) {
      return {
        slug: a.slug,
        rubrique: a.rubrique as RubriqueSlug,
        titre: a.titre,
        chapo: a.chapo ?? undefined,
        auteur: a.auteur ?? undefined,
        publieIl_y_a: a.publieIl_y_a ? publieIlYA(a.publieIl_y_a) : "",
        image: mapImage(a.image),
        aLaUne: true,
      };
    }
  }
  return ARTICLES.find((a) => a.aLaUne) ?? ARTICLES[0];
}

export async function getArticlesSecondaires(limit = 3): Promise<Article[]> {
  if (isSanityConfigured) {
    const rows = await sanityClient.fetch(ARTICLES_SECONDAIRES_QUERY, { limit }, REVALIDATE);
    if (rows.length > 0) {
      return rows.map((a) => ({
        slug: a.slug!,
        rubrique: a.rubrique as RubriqueSlug,
        titre: a.titre!,
        publieIl_y_a: a.publieIl_y_a ? publieIlYA(a.publieIl_y_a) : "",
        image: mapImage(a.image),
      }));
    }
  }
  return ARTICLES.filter((a) => !a.aLaUne).slice(0, limit);
}

export async function getArticlesParRubrique(
  rubrique: Article["rubrique"],
  limit = 3
): Promise<Article[]> {
  if (isSanityConfigured) {
    const rows = await sanityClient.fetch(ARTICLES_PAR_RUBRIQUE_QUERY, { rubrique, limit }, REVALIDATE);
    if (rows.length > 0) {
      return rows.map((a) => ({
        slug: a.slug!,
        rubrique: a.rubrique as RubriqueSlug,
        titre: a.titre!,
        extrait: a.extrait ?? undefined,
        publieIl_y_a: a.publieIl_y_a ? publieIlYA(a.publieIl_y_a) : "",
        image: mapImage(a.image),
      }));
    }
  }
  // L'article à la une a déjà sa place dans le hero : on ne le répète pas
  // dans le module de sa propre rubrique plus bas sur la page.
  return ARTICLES.filter((a) => a.rubrique === rubrique && !a.aLaUne).slice(0, limit);
}

/** Tous les articles d'une rubrique, pour sa page dédiée (contrairement au
 * module de la Une, on n'exclut pas l'article éventuellement à la Une). */
export async function getArticlesRubriqueComplete(
  rubrique: Article["rubrique"],
  limit = 30
): Promise<Article[]> {
  if (isSanityConfigured) {
    const rows = await sanityClient.fetch(ARTICLES_RUBRIQUE_COMPLETE_QUERY, { rubrique, limit }, REVALIDATE);
    if (rows.length > 0) {
      return rows.map((a) => ({
        slug: a.slug!,
        rubrique: a.rubrique as RubriqueSlug,
        titre: a.titre!,
        extrait: a.extrait ?? undefined,
        chapo: a.chapo ?? undefined,
        publieIl_y_a: a.publieIl_y_a ? publieIlYA(a.publieIl_y_a) : "",
        image: mapImage(a.image),
      }));
    }
  }
  return ARTICLES.filter((a) => a.rubrique === rubrique).slice(0, limit);
}

/** Slugs (et date de publication) de tous les articles, pour `sitemap.xml`. */
export async function getTousLesArticles(): Promise<{ slug: string; publieLe?: string }[]> {
  if (isSanityConfigured) {
    const rows = await sanityClient.fetch(TOUS_LES_SLUGS_QUERY, {}, REVALIDATE);
    if (rows.length > 0) {
      return rows.map((a) => ({ slug: a.slug!, publieLe: a.publieLe ?? undefined }));
    }
  }
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function getTickerALaUne(): Promise<string[]> {
  return A_LA_UNE_TICKER;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (isSanityConfigured) {
    const a = await sanityClient.fetch(ARTICLE_BY_SLUG_QUERY, { slug }, REVALIDATE);
    if (a?.slug && a.titre) {
      return {
        slug: a.slug,
        rubrique: a.rubrique as RubriqueSlug,
        titre: a.titre,
        chapo: a.chapo ?? undefined,
        extrait: a.extrait ?? undefined,
        corps: a.corps ?? undefined,
        auteur: a.auteur ?? undefined,
        auteurRole: a.auteurRole ?? undefined,
        auteurPhoto: mapImage(a.auteurPhoto),
        publieIl_y_a: a.publieIl_y_a ? publieIlYA(a.publieIl_y_a) : "",
        image: mapImage(a.image),
        aLaUne: a.aLaUne ?? undefined,
        vues: a.vues ?? 0,
      };
    }
  }
  return ARTICLES.find((a) => a.slug === slug) ?? null;
}

export async function getPortraitEnAvant(): Promise<PortraitFeature> {
  if (isSanityConfigured) {
    const p = await sanityClient.fetch(PORTRAIT_EN_AVANT_QUERY, {}, REVALIDATE);
    if (p?.slug && p.citation) {
      return {
        citation: p.citation,
        nom: p.nom ?? "",
        role: p.role ?? "",
        extrait: p.extrait ?? "",
        slug: p.slug,
        image: mapImage(p.image),
      };
    }
  }
  return PORTRAIT;
}

export async function getLivresVitrine(): Promise<LivreVitrine[]> {
  return LIVRES;
}

export async function getDateEdition(): Promise<string> {
  const d = new Date();
  const formatte = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
  return formatte.charAt(0).toUpperCase() + formatte.slice(1);
}
