import Link from "next/link";
import { RUBRIQUES_VIVRE } from "@/lib/rubriques";
import type { Article } from "@/lib/types";

/** Un article par rubrique du cluster "Vivre", en bandeau compact. */
export function VivreGrid({ articlesParRubrique }: { articlesParRubrique: Record<string, Article | undefined> }) {
  return (
    <section id="vivre" className="w-full bg-paper-alt border-y border-rule py-12 mt-14">
      <div className="max-w-[1320px] mx-auto px-10">
        <h2 className="font-ui font-black text-[21px] tracking-[0.03em] uppercase text-ink mb-7 pb-3.5 border-b-2 border-rule-2">
          Vivre — Santé · Environnement · Développement durable · Éducation
        </h2>
        <div className="grid grid-cols-4 gap-6">
          {RUBRIQUES_VIVRE.map((r) => {
            const article = articlesParRubrique[r.slug];
            if (!article) return null;
            return (
              <Link key={r.slug} id={r.slug} href={`/article/${article.slug}`} className="group">
                <div className="font-ui font-bold text-[11px] tracking-[0.12em] uppercase text-gold-deep">
                  {r.label}
                </div>
                <h3 className="font-display font-semibold text-[16px] leading-[1.3] text-ink mt-2 group-hover:text-gold-deep transition-colors">
                  {article.titre}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
