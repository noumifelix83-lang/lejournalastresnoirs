import Link from "next/link";
import { PlaceholderMedia } from "./PlaceholderMedia";
import { rubrique, type RubriqueSlug } from "@/lib/rubriques";
import type { Article } from "@/lib/types";

function ArrowRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/** Module de rubrique en grille de 3 cartes (Politique, Économie…). */
export function SectionGrid({ rubriqueSlug, articles }: { rubriqueSlug: RubriqueSlug; articles: Article[] }) {
  const r = rubrique(rubriqueSlug);
  return (
    <section id={rubriqueSlug} className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-10 pt-9 md:pt-14">
      <div className="flex items-baseline justify-between mb-5 md:mb-6 pb-3 md:pb-3.5 border-b-2 border-ink">
        <h2 className="font-ui font-black text-[17px] md:text-[21px] tracking-[0.03em] uppercase text-ink">{r.label}</h2>
        <Link
          href={`/rubrique/${rubriqueSlug}`}
          className="font-ui font-bold text-[11px] md:text-[12px] tracking-[0.05em] uppercase text-ink flex items-center gap-1.5"
        >
          Toute la rubrique <ArrowRight />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {articles.map((article) => (
          <Link key={article.slug} href={`/article/${article.slug}`} className="group">
            <PlaceholderMedia legende={article.image?.legende ?? "Illustration"} className="w-full h-[170px] md:h-[180px]" />
            <h3 className="font-display font-semibold text-[16.5px] md:text-[18px] leading-[1.28] text-ink mt-3 group-hover:text-gold-deep transition-colors">
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
    </section>
  );
}
