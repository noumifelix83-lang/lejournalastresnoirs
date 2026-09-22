import type { Article, LivreVitrine, PortraitFeature } from "./types";

// -----------------------------------------------------------------------
// Contenu de démonstration.
//
// Tant qu'aucun CMS n'est branché, le site lit ces fonctions. Elles ont la
// forme (async, retour typé) qu'auront leurs équivalentes une fois
// connectées à Sanity — remplacer le corps de chaque fonction par une
// requête GROQ suffira, aucun composant n'aura à changer.
// -----------------------------------------------------------------------

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
  return ARTICLES.find((a) => a.aLaUne) ?? ARTICLES[0];
}

export async function getArticlesSecondaires(limit = 3): Promise<Article[]> {
  return ARTICLES.filter((a) => !a.aLaUne).slice(0, limit);
}

export async function getArticlesParRubrique(
  rubrique: Article["rubrique"],
  limit = 3
): Promise<Article[]> {
  // L'article à la une a déjà sa place dans le hero : on ne le répète pas
  // dans le module de sa propre rubrique plus bas sur la page.
  return ARTICLES.filter((a) => a.rubrique === rubrique && !a.aLaUne).slice(0, limit);
}

export async function getTickerALaUne(): Promise<string[]> {
  return A_LA_UNE_TICKER;
}

export async function getPortraitEnAvant(): Promise<PortraitFeature> {
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
