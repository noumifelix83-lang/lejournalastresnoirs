import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ArticleImage } from "@/components/ArticleImage";
import { ShareBar } from "@/components/ShareBar";
import { EditionsBand } from "@/components/EditionsBand";
import { AuteurByline } from "@/components/AuteurByline";
import { VueCounter } from "@/components/VueCounter";
import { getArticleBySlug } from "@/lib/content";
import { rubrique } from "@/lib/rubriques";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  const description =
    article.chapo || article.extrait || `${rubrique(article.rubrique).label} — ${SITE_NAME}`;
  const url = `${SITE_URL}/article/${article.slug}`;

  // L'image de partage est générée dynamiquement par opengraph-image.tsx
  // (bandeau de marque + vraie photo de l'article) : pas besoin de la
  // redéfinir ici, Next.js la rattache automatiquement.
  return {
    title: article.titre,
    description,
    alternates: { canonical: url },
    openGraph: { title: article.titre, description, url, type: "article" },
    twitter: { card: "summary_large_image", title: article.titre, description },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return notFound();

  const url = `${SITE_URL}/article/${article.slug}`;
  const r = rubrique(article.rubrique);

  return (
    <>
      <SiteHeader />
      <main className="max-w-[820px] mx-auto px-4 sm:px-6 md:px-10 py-8 md:py-12">
        <Link
          href={`/rubrique/${article.rubrique}`}
          className="font-ui font-bold text-[11px] tracking-[0.12em] uppercase text-gold-deep"
        >
          {r.label}
        </Link>

        <h1 className="font-display font-semibold text-[28px] sm:text-[36px] md:text-[44px] leading-[1.12] text-ink mt-3 mb-4">
          {article.titre}
        </h1>

        {article.chapo ? (
          <p className="font-body text-[17px] md:text-[19px] leading-[1.55] text-ink/75 mb-5">
            {article.chapo}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-rule">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-ui font-semibold text-[11px] tracking-[0.05em] uppercase text-taupe">
            <span>
              {article.auteur ? `${article.auteur} · ` : ""}
              {article.publieIl_y_a}
            </span>
            {article.vues !== undefined ? (
              <>
                <span className="text-taupe/40">·</span>
                <VueCounter slug={article.slug} initial={article.vues} />
              </>
            ) : null}
          </div>
          <ShareBar url={url} titre={article.titre} />
        </div>

        {article.video ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            src={article.video}
            poster={article.image?.url}
            controls
            className="w-full h-auto mb-8 bg-ink"
          />
        ) : (
          <ArticleImage
            image={article.image}
            fallbackLegende={`Illustration — ${r.label}`}
            className="w-full h-[280px] sm:h-[400px] md:h-[520px] mb-8"
            sizes="(max-width: 820px) 100vw, 820px"
            fit="contain"
          />
        )}

        {article.corps ? (
          <div className="font-body text-[16px] md:text-[17px] leading-[1.7] text-ink/85 [&>*+*]:mt-5 [&_h2]:font-display [&_h2]:font-semibold [&_h2]:text-[22px] [&_h2]:mt-8 [&_h2]:mb-2 [&_h2]:text-ink [&_a]:underline [&_a]:decoration-gold-deep">
            <PortableText value={article.corps as never} />
          </div>
        ) : article.extrait ? (
          <p className="font-body text-[16px] md:text-[17px] leading-[1.7] text-ink/85">{article.extrait}</p>
        ) : null}

        {article.auteur ? (
          <div className="mt-10">
            <AuteurByline nom={article.auteur} role={article.auteurRole} photo={article.auteurPhoto} />
          </div>
        ) : null}

        <div className={`pt-6 ${article.auteur ? "" : "mt-10 border-t border-rule"}`}>
          <ShareBar url={url} titre={article.titre} />
        </div>
      </main>
      <EditionsBand />
      <SiteFooter />
    </>
  );
}
