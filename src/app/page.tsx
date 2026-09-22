import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { CultureSpotlight } from "@/components/CultureSpotlight";
import { PortraitFeature } from "@/components/PortraitFeature";
import { SectionGrid } from "@/components/SectionGrid";
import { TwoColumnList } from "@/components/TwoColumnList";
import { VivreGrid } from "@/components/VivreGrid";
import { LiteratureShelf } from "@/components/LiteratureShelf";
import { Newsletter } from "@/components/Newsletter";
import { SiteFooter } from "@/components/SiteFooter";
import {
  getArticleALaUne,
  getArticlesSecondaires,
  getArticlesParRubrique,
  getPortraitEnAvant,
  getLivresVitrine,
} from "@/lib/content";
import { RUBRIQUES_VIVRE } from "@/lib/rubriques";

export default async function Home() {
  const [
    articlePrincipal,
    articlesSecondaires,
    articlesCulture,
    articlesPolitique,
    articlesEconomie,
    articlesSociete,
    articlesDiplomatie,
    portrait,
    livres,
    ...articlesVivre
  ] = await Promise.all([
    getArticleALaUne(),
    getArticlesSecondaires(3),
    getArticlesParRubrique("arts-culture-traditions", 4),
    getArticlesParRubrique("politique", 3),
    getArticlesParRubrique("economie", 3),
    getArticlesParRubrique("societe", 3),
    getArticlesParRubrique("diplomatie", 3),
    getPortraitEnAvant(),
    getLivresVitrine(),
    ...RUBRIQUES_VIVRE.map((r) => getArticlesParRubrique(r.slug, 1)),
  ]);

  const articlesParRubriqueVivre = Object.fromEntries(
    RUBRIQUES_VIVRE.map((r, i) => [r.slug, articlesVivre[i]?.[0]])
  );

  return (
    <>
      <SiteHeader />
      <main>
        <Hero principal={articlePrincipal} secondaires={articlesSecondaires} />
        <CultureSpotlight articles={articlesCulture} />
        <PortraitFeature portrait={portrait} />
        <SectionGrid rubriqueSlug="politique" articles={articlesPolitique} />
        <SectionGrid rubriqueSlug="economie" articles={articlesEconomie} />
        <TwoColumnList
          gauche={{ rubriqueSlug: "societe", articles: articlesSociete }}
          droite={{ rubriqueSlug: "diplomatie", articles: articlesDiplomatie }}
        />
        <VivreGrid articlesParRubrique={articlesParRubriqueVivre} />
        <LiteratureShelf livres={livres} />
        <Newsletter />
      </main>
      <SiteFooter />
    </>
  );
}
