import type { Article, LivreVitrine, PortraitFeature } from "./types";
import type { RubriqueSlug } from "./rubriques";
import { sanityClient } from "./sanity/client";
import { isSanityConfigured } from "./sanity/env";
import {
  ARTICLES_PAR_RUBRIQUE_QUERY,
  ARTICLES_SECONDAIRES_QUERY,
  ARTICLE_A_LA_UNE_QUERY,
  PORTRAIT_EN_AVANT_QUERY,
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
    slug: "reforme-electorale-grandes-lignes",
    rubrique: "politique",
    titre: "Réforme électorale : les grandes lignes du projet dévoilées à l'Assemblée",
    chapo:
      "Le texte, attendu depuis plusieurs mois, doit être examiné en séance plénière dès la semaine prochaine. Les groupes parlementaires se positionnent déjà.",
    auteur: "Rédaction Politique",
    publieIl_y_a: "Il y a 2 heures",
    image: { legende: "Illustration — Politique" },
    aLaUne: true,
  },
  {
    slug: "franc-cfa-forum-yaounde",
    rubrique: "economie",
    titre: "Le franc CFA au cœur des débats lors du forum régional de Yaoundé",
    publieIl_y_a: "Il y a 3 heures",
    image: { legende: "Illustration — Économie" },
  },
  {
    slug: "sommet-ceeac-feuille-de-route",
    rubrique: "diplomatie",
    titre: "Sommet de la CEEAC : vers une feuille de route commune sur la sécurité",
    publieIl_y_a: "Il y a 3 heures",
    image: { legende: "Illustration — Diplomatie" },
  },
  {
    slug: "mobilite-urbaine-douala",
    rubrique: "societe",
    titre: "Mobilité urbaine : ce que prévoit le nouveau plan pour Douala",
    publieIl_y_a: "Il y a 4 heures",
    image: { legende: "Illustration — Société" },
  },
  {
    slug: "decentralisation-priorites-budgetaires",
    rubrique: "politique",
    titre: "Décentralisation : les régions présentent leurs priorités budgétaires",
    extrait: "Un exercice attendu qui doit clarifier la répartition des moyens pour l'exercice à venir.",
    publieIl_y_a: "Il y a 4 heures",
    image: { legende: "Illustration" },
  },
  {
    slug: "vie-parlementaire-textes-a-surveiller",
    rubrique: "politique",
    titre: "Vie parlementaire : les textes à surveiller cette session",
    extrait: "Tour d'horizon des dossiers qui structureront les débats des prochaines semaines.",
    publieIl_y_a: "Il y a 6 heures",
    image: { legende: "Illustration" },
  },
  {
    slug: "reforme-electorale-opposition",
    rubrique: "politique",
    titre: "Réforme électorale : ce que proposent les partis d'opposition",
    extrait: "Les principales formations détaillent leurs contre-propositions au texte gouvernemental.",
    publieIl_y_a: "Il y a 8 heures",
    image: { legende: "Illustration" },
  },
  {
    slug: "inflation-produits-premiere-necessite",
    rubrique: "economie",
    titre: "Inflation : les prix des produits de première nécessité sous surveillance",
    extrait: "Les autorités annoncent un suivi renforcé sur plusieurs filières sensibles.",
    publieIl_y_a: "Il y a 3 heures",
    image: { legende: "Illustration" },
  },
  {
    slug: "investissements-agro-industriel",
    rubrique: "economie",
    titre: "Investissements : le secteur agro-industriel attire de nouveaux capitaux",
    extrait: "Plusieurs projets d'envergure devraient être annoncés d'ici la fin de l'année.",
    publieIl_y_a: "Il y a 5 heures",
    image: { legende: "Illustration" },
  },
  {
    slug: "pme-fonds-de-garantie",
    rubrique: "economie",
    titre: "PME : un nouveau fonds de garantie pour faciliter l'accès au crédit",
    extrait: "Le dispositif doit cibler en priorité les entreprises de moins de cinq ans.",
    publieIl_y_a: "Il y a 7 heures",
    image: { legende: "Illustration" },
  },
  {
    slug: "education-numerique-ecoles-rurales",
    rubrique: "societe",
    titre: "Éducation numérique : les écoles rurales mieux connectées",
    publieIl_y_a: "Il y a 5 heures",
    image: { legende: "Illustration" },
  },
  {
    slug: "logement-habitat-informel",
    rubrique: "societe",
    titre: "Logement : la question de l'habitat informel refait surface",
    publieIl_y_a: "Il y a 9 heures",
    image: { legende: "Illustration" },
  },
  {
    slug: "jeunesse-emploi-chiffres",
    rubrique: "societe",
    titre: "Jeunesse et emploi : les chiffres du dernier trimestre",
    publieIl_y_a: "Il y a 11 heures",
    image: { legende: "Illustration" },
  },
  {
    slug: "cooperation-regionale-accord-commercial",
    rubrique: "diplomatie",
    titre: "Coopération régionale : un nouvel accord commercial en discussion",
    publieIl_y_a: "Il y a 5 heures",
    image: { legende: "Illustration" },
  },
  {
    slug: "visite-officielle-liens-bilateraux",
    rubrique: "diplomatie",
    titre: "Visite officielle : renforcement des liens bilatéraux annoncé",
    publieIl_y_a: "Il y a 8 heures",
    image: { legende: "Illustration" },
  },
  {
    slug: "organisations-internationales-representation",
    rubrique: "diplomatie",
    titre: "Organisations internationales : le pays plaide pour plus de représentation",
    publieIl_y_a: "Il y a 10 heures",
    image: { legende: "Illustration" },
  },
  {
    slug: "couverture-sante-universelle",
    rubrique: "sante",
    titre: "Couverture santé universelle : où en est la mise en œuvre ?",
    publieIl_y_a: "Il y a 6 heures",
  },
  {
    slug: "reforestation-bassin-congo",
    rubrique: "environnement",
    titre: "Reforestation : un projet pilote dans le bassin du Congo",
    publieIl_y_a: "Il y a 7 heures",
  },
  {
    slug: "energies-renouvelables-collectivites",
    rubrique: "developpement-durable",
    titre: "Énergies renouvelables : les collectivités locales s'organisent",
    publieIl_y_a: "Il y a 9 heures",
  },
  {
    slug: "reforme-programmes-scolaires",
    rubrique: "education",
    titre: "Réforme des programmes scolaires : ce qui change à la rentrée",
    publieIl_y_a: "Il y a 10 heures",
  },
  {
    slug: "renouveau-masques-traditionnels",
    rubrique: "arts-culture-traditions",
    titre: "Le renouveau des masques traditionnels dans l'art contemporain",
    publieIl_y_a: "Il y a 4 heures",
    image: { legende: "Illustration — Culture" },
  },
  {
    slug: "douala-art-fair",
    rubrique: "arts-culture-traditions",
    titre: "Douala Art Fair : la scène artistique ouest-africaine à l'honneur",
    publieIl_y_a: "Il y a 5 heures",
    image: { legende: "Illustration — Culture" },
  },
  {
    slug: "artisans-patrimoine-bamileke",
    rubrique: "arts-culture-traditions",
    titre: "Ces artisans qui font vivre le patrimoine bamiléké",
    publieIl_y_a: "Il y a 1 jour",
    image: { legende: "Illustration — Culture" },
  },
  {
    slug: "musiques-ancestrales-mvet",
    rubrique: "arts-culture-traditions",
    titre: "Musiques ancestrales : sur les traces du Mvet",
    publieIl_y_a: "Il y a 1 jour",
    image: { legende: "Illustration — Culture" },
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
  "Réforme électorale : le texte attendu en plénière",
  "Sommet CEEAC : une feuille de route commune sur la sécurité",
  "Douala Art Fair : la scène ouest-africaine à l'honneur",
];

export async function getArticleALaUne(): Promise<Article> {
  if (isSanityConfigured) {
    const a = await sanityClient.fetch(ARTICLE_A_LA_UNE_QUERY);
    if (a?.slug && a.titre) {
      return {
        slug: a.slug,
        rubrique: a.rubrique as RubriqueSlug,
        titre: a.titre,
        chapo: a.chapo ?? undefined,
        auteur: a.auteur ?? undefined,
        publieIl_y_a: a.publieIl_y_a ? publieIlYA(a.publieIl_y_a) : "",
        image: a.image?.legende ? { legende: a.image.legende } : undefined,
        aLaUne: true,
      };
    }
  }
  return ARTICLES.find((a) => a.aLaUne) ?? ARTICLES[0];
}

export async function getArticlesSecondaires(limit = 3): Promise<Article[]> {
  if (isSanityConfigured) {
    const rows = await sanityClient.fetch(ARTICLES_SECONDAIRES_QUERY, { limit });
    if (rows.length > 0) {
      return rows.map((a) => ({
        slug: a.slug!,
        rubrique: a.rubrique as RubriqueSlug,
        titre: a.titre!,
        publieIl_y_a: a.publieIl_y_a ? publieIlYA(a.publieIl_y_a) : "",
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
    const rows = await sanityClient.fetch(ARTICLES_PAR_RUBRIQUE_QUERY, { rubrique, limit });
    if (rows.length > 0) {
      return rows.map((a) => ({
        slug: a.slug!,
        rubrique: a.rubrique as RubriqueSlug,
        titre: a.titre!,
        extrait: a.extrait ?? undefined,
        publieIl_y_a: a.publieIl_y_a ? publieIlYA(a.publieIl_y_a) : "",
        image: a.image?.legende ? { legende: a.image.legende } : undefined,
      }));
    }
  }
  // L'article à la une a déjà sa place dans le hero : on ne le répète pas
  // dans le module de sa propre rubrique plus bas sur la page.
  return ARTICLES.filter((a) => a.rubrique === rubrique && !a.aLaUne).slice(0, limit);
}

export async function getTickerALaUne(): Promise<string[]> {
  return A_LA_UNE_TICKER;
}

export async function getPortraitEnAvant(): Promise<PortraitFeature> {
  if (isSanityConfigured) {
    const p = await sanityClient.fetch(PORTRAIT_EN_AVANT_QUERY);
    if (p?.slug && p.citation) {
      return {
        citation: p.citation,
        nom: p.nom ?? "",
        role: p.role ?? "",
        extrait: p.extrait ?? "",
        slug: p.slug,
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
