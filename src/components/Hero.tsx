import Link from "next/link";
import { PlaceholderMedia } from "./PlaceholderMedia";
import { rubrique } from "@/lib/rubriques";
import type { Article } from "@/lib/types";

export function Hero({ principal, secondaires }: { principal: Article; secondaires: Article[] }) {
  return (
    <section id="une" className="max-w-[1320px] mx-auto px-10 py-11 grid grid-cols-[1.7fr_1fr] gap-11">
      <Link href={`/article/${principal.slug}`} className="block group">
        <PlaceholderMedia legende={principal.image?.legende} className="w-full h-[440px]" />
        <div className="font-ui font-bold text-[11px] tracking-[0.12em] uppercase text-gold-deep mt-5">
          {rubrique(principal.rubrique).label}
        </div>
        <h1 className="font-display font-semibold text-[42px] leading-[1.12] text-ink mt-2.5 mb-3.5 group-hover:text-gold-deep transition-colors">
          {principal.titre}
        </h1>
        {principal.chapo ? (
          <p className="font-body text-[16.5px] leading-[1.55] text-ink/70">{principal.chapo}</p>
        ) : null}
        <div className="font-ui font-semibold text-[11px] tracking-[0.05em] uppercase text-taupe mt-4">
          {principal.auteur ? `${principal.auteur} · ` : ""}
          {principal.publieIl_y_a}
        </div>
      </Link>

      <div className="flex flex-col gap-6">
        {secondaires.map((article, i) => (
          <div key={article.slug}>
            {i > 0 ? <div className="h-px bg-rule mb-6" /> : null}
            <Link href={`/article/${article.slug}`} className="flex gap-4 group">
              <PlaceholderMedia className="w-[150px] h-[110px] shrink-0" />
              <div>
                <div className="font-ui font-bold text-[11px] tracking-[0.12em] uppercase text-gold-deep">
                  {rubrique(article.rubrique).label}
                </div>
                <h3 className="font-display font-semibold text-[17px] leading-[1.28] text-ink mt-1.5 group-hover:text-gold-deep transition-colors">
                  {article.titre}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
