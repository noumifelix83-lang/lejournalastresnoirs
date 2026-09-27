import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { RUBRIQUES } from "@/lib/rubriques";
import { getTousLesArticles } from "@/lib/content";

const PAGES_STATIQUES = [
  "",
  "/a-propos",
  "/redaction",
  "/contact",
  "/editions-astres-noirs",
  "/abonnement",
  "/confidentialite",
  "/conditions-utilisation",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getTousLesArticles();

  const pages = PAGES_STATIQUES.map((chemin) => ({
    url: `${SITE_URL}${chemin}`,
    changeFrequency: (chemin === "" ? "hourly" : "monthly") as "hourly" | "monthly",
    priority: chemin === "" ? 1 : 0.5,
  }));

  const rubriques = RUBRIQUES.map((r) => ({
    url: `${SITE_URL}/rubrique/${r.slug}`,
    changeFrequency: "hourly" as const,
    priority: 0.7,
  }));

  const articlesEntries = articles.map((a) => ({
    url: `${SITE_URL}/article/${a.slug}`,
    lastModified: a.publieLe ? new Date(a.publieLe) : undefined,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  return [...pages, ...rubriques, ...articlesEntries];
}
