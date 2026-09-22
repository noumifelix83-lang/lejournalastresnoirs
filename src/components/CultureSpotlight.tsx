import Link from "next/link";
import { PlaceholderMedia } from "./PlaceholderMedia";
import type { Article } from "@/lib/types";

function ArrowRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/**
 * "Arts, Culture & Traditions" — désignée comme rubrique essentielle : elle a
 * son propre bandeau, juste après le hero, plutôt que d'être une rubrique
 * comme les autres plus bas dans la page.
 */
export function CultureSpotlight({ articles }: { articles: Article[] }) {
  return (
    <section
      id="arts-culture-traditions"
      className="w-full bg-paper-alt border-y border-rule py-8 md:py-14"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 md:mb-8">
          <div>
            <div className="font-ui font-bold text-[11px] tracking-[0.12em] uppercase text-gold-deep mb-2">
              Rubrique phare
            </div>
            <h2 className="font-display font-bold text-[24px] md:text-[32px] text-ink">Arts, Culture &amp; Traditions</h2>
            <p className="font-body text-[14px] md:text-[15px] text-ink/70 mt-2 max-w-[560px]">
              Le patrimoine vivant, les scènes artistiques et les mémoires qui façonnent le continent.
            </p>
          </div>
          <Link
            href="/rubrique/arts-culture-traditions"
            className="font-ui font-bold text-[12px] tracking-[0.05em] uppercase text-ink flex items-center gap-1.5 shrink-0"
          >
            Toute la rubrique <ArrowRight />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {articles.map((article) => (
            <Link key={article.slug} href={`/article/${article.slug}`} className="group">
              <PlaceholderMedia legende={article.image?.legende} className="w-full h-[130px] sm:h-[160px] md:h-[200px]" />
              <h3 className="font-display font-semibold text-[15px] md:text-[18px] leading-[1.28] text-ink mt-2.5 md:mt-3 group-hover:text-gold-deep transition-colors">
                {article.titre}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
