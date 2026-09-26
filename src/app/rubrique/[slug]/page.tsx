import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ArticleImage } from "@/components/ArticleImage";
import { getArticlesRubriqueComplete } from "@/lib/content";
import { RUBRIQUES, type RubriqueSlug } from "@/lib/rubriques";

type Props = { params: Promise<{ slug: string }> };

function trouverRubrique(slug: string) {
  return RUBRIQUES.find((r) => r.slug === slug);
}

export function generateStaticParams() {
  return RUBRIQUES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = trouverRubrique(slug);
  if (!r) return {};
  return {
    title: r.label,
    description: `Tous les articles de la rubrique ${r.label} sur Astres Noirs Actu.`,
  };
}

export default async function RubriquePage({ params }: Props) {
  const { slug } = await params;
  const r = trouverRubrique(slug);
  if (!r) return notFound();

  const articles = await getArticlesRubriqueComplete(slug as RubriqueSlug, 30);

  return (
    <>
      <SiteHeader />
      <main className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-10 py-8 md:py-12">
        <div className="pb-6 md:pb-8 mb-8 md:mb-10 border-b-2 border-ink">
          <div className="font-ui font-bold text-[11px] tracking-[0.14em] uppercase text-gold-deep mb-2">
            Rubrique
          </div>
          <h1 className="font-display font-semibold text-[30px] sm:text-[38px] text-ink">{r.label}</h1>
        </div>

        {articles.length === 0 ? (
          <p className="font-body text-[15px] text-ink/60 py-10">
            Aucun article publié dans cette rubrique pour l&apos;instant.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
            {articles.map((article) => (
              <Link key={article.slug} href={`/article/${article.slug}`} className="group">
                <ArticleImage
                  image={article.image}
                  fallbackLegende={`Illustration — ${r.label}`}
                  className="w-full h-[190px]"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
                <h3 className="font-display font-semibold text-[19px] leading-[1.28] text-ink mt-3.5 group-hover:text-gold-deep transition-colors">
                  {article.titre}
                </h3>
                {article.extrait ? (
                  <p className="font-body text-[14px] text-ink/70 mt-1.5">{article.extrait}</p>
                ) : null}
                <div className="font-ui font-semibold text-[11px] tracking-[0.05em] uppercase text-taupe mt-2.5">
                  {article.publieIl_y_a}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
