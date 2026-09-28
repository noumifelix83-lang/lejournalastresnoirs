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
    articlesActualite,
    articlesCinema,
    articlesInterview,
    articlesArtisanat,
    portrait,
    livres,
    ...articlesVivre
  ] = await Promise.all([
    getArticleALaUne(),
    getArticlesSecondaires(3),
    getArticlesParRubrique("traditions-ancestrales", 4),
    getArticlesParRubrique("actualite", 3),
    getArticlesParRubrique("cinema", 3),
    getArticlesParRubrique("interview", 3),
    getArticlesParRubrique("artisanat", 3),
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
        <SectionGrid rubriqueSlug="actualite" articles={articlesActualite} />
        <SectionGrid rubriqueSlug="cinema" articles={articlesCinema} />
        <TwoColumnList
          gauche={{ rubriqueSlug: "interview", articles: articlesInterview }}
          droite={{ rubriqueSlug: "artisanat", articles: articlesArtisanat }}
        />
        <VivreGrid articlesParRubrique={articlesParRubriqueVivre} />
        <LiteratureShelf livres={livres} />
        <Newsletter />
      </main>
      <SiteFooter />
    </>
  );
}
