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
      <div className="flex items-baseline justify-between mb-6 pb-3.5 border-b-2 border-ink">
        <h2 className="font-ui font-black text-[21px] tracking-[0.03em] uppercase text-ink">{r.label}</h2>
        <Link
          href={`/rubrique/${rubriqueSlug}`}
          className="font-ui font-bold text-[12px] tracking-[0.05em] uppercase text-ink flex items-center gap-1.5"
        >
          Tout voir <ArrowRight />
        </Link>
      </div>
      <div className="flex flex-col gap-5">
        {articles.map((article, i) => (
          <div key={article.slug}>
            {i > 0 ? <div className="h-px bg-rule mb-5" /> : null}
            <Link href={`/article/${article.slug}`} className="flex gap-4 group">
              <PlaceholderMedia className="w-[130px] h-[96px] shrink-0" />
              <h3 className="font-display font-semibold text-[16px] leading-[1.3] text-ink group-hover:text-gold-deep transition-colors">
                {article.titre}
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Société et Diplomatie côte à côte, en colonnes compactes. */
export function TwoColumnList({
  gauche,
  droite,
}: {
  gauche: { rubriqueSlug: RubriqueSlug; articles: Article[] };
  droite: { rubriqueSlug: RubriqueSlug; articles: Article[] };
}) {
  return (
    <section className="max-w-[1320px] mx-auto px-10 pt-14 grid grid-cols-2 gap-14">
      <Column {...gauche} />
      <Column {...droite} />
    </section>
  );
}
