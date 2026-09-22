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

function Column({ rubriqueSlug, articles }: { rubriqueSlug: RubriqueSlug; articles: Article[] }) {
  const r = rubrique(rubriqueSlug);
  return (
    <div id={rubriqueSlug}>
      <div className="flex items-baseline justify-between mb-5 md:mb-6 pb-3 md:pb-3.5 border-b-2 border-ink">
        <h2 className="font-ui font-black text-[17px] md:text-[21px] tracking-[0.03em] uppercase text-ink">{r.label}</h2>
        <Link
          href={`/rubrique/${rubriqueSlug}`}
          className="font-ui font-bold text-[11px] md:text-[12px] tracking-[0.05em] uppercase text-ink flex items-center gap-1.5"
        >
          Tout voir <ArrowRight />
        </Link>
      </div>
      <div className="flex flex-col gap-4 md:gap-5">
        {articles.map((article, i) => (
          <div key={article.slug}>
            {i > 0 ? <div className="h-px bg-rule mb-4 md:mb-5" /> : null}
            <Link href={`/article/${article.slug}`} className="flex gap-3 md:gap-4 group">
              <PlaceholderMedia className="w-[110px] h-[82px] md:w-[130px] md:h-[96px] shrink-0" />
              <h3 className="font-display font-semibold text-[15px] md:text-[16px] leading-[1.3] text-ink group-hover:text-gold-deep transition-colors">
                {article.titre}
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Société et Diplomatie côte à côte sur grand écran, empilées sur mobile. */
export function TwoColumnList({
  gauche,
  droite,
}: {
  gauche: { rubriqueSlug: RubriqueSlug; articles: Article[] };
  droite: { rubriqueSlug: RubriqueSlug; articles: Article[] };
}) {
  return (
    <section className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-10 pt-9 md:pt-14 grid grid-cols-1 md:grid-cols-2 gap-9 md:gap-14">
      <Column {...gauche} />
      <Column {...droite} />
    </section>
  );
}
