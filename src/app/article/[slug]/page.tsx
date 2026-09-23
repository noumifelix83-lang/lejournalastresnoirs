import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ArticleImage } from "@/components/ArticleImage";
import { ShareBar } from "@/components/ShareBar";
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
  // Next.js ne fusionne pas `openGraph.images` avec celui du layout racine
  // dès qu'une page définit son propre `openGraph` : on retombe donc
  // explicitement sur l'image par défaut tant que l'article n'a pas de photo.
  const image = article.image?.url
    ? [{ url: article.image.url, width: article.image.width, height: article.image.height }]
    : [{ url: "/og-default.png", width: 1200, height: 630 }];

  return {
    title: article.titre,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: article.titre,
      description,
      url,
      type: "article",
      images: image,
    },
    twitter: {
      card: "summary_large_image",
      title: article.titre,
      description,
      images: image?.map((i) => i.url),
    },
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
          <div className="font-ui font-semibold text-[11px] tracking-[0.05em] uppercase text-taupe">
            {article.auteur ? `${article.auteur} · ` : ""}
            {article.publieIl_y_a}
          </div>
          <ShareBar url={url} titre={article.titre} />
        </div>

        <ArticleImage
          image={article.image}
          fallbackLegende={`Illustration — ${r.label}`}
          className="w-full h-[220px] sm:h-[320px] md:h-[440px] mb-8"
          sizes="(max-width: 820px) 100vw, 820px"
        />

        {article.corps ? (
          <div className="font-body text-[16px] md:text-[17px] leading-[1.7] text-ink/85 [&>*+*]:mt-5 [&_h2]:font-display [&_h2]:font-semibold [&_h2]:text-[22px] [&_h2]:mt-8 [&_h2]:mb-2 [&_h2]:text-ink [&_a]:underline [&_a]:decoration-gold-deep">
            <PortableText value={article.corps as never} />
          </div>
        ) : article.extrait ? (
          <p className="font-body text-[16px] md:text-[17px] leading-[1.7] text-ink/85">{article.extrait}</p>
        ) : null}

        <div className="mt-10 pt-6 border-t border-rule">
          <ShareBar url={url} titre={article.titre} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
