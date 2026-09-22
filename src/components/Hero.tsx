import Link from "next/link";
import { ArticleImage } from "./ArticleImage";
import { rubrique } from "@/lib/rubriques";
import type { Article } from "@/lib/types";

export function Hero({ principal, secondaires }: { principal: Article; secondaires: Article[] }) {
  return (
    <section
      id="une"
      className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-10 py-6 md:py-11 grid grid-cols-1 md:grid-cols-[1.7fr_1fr] gap-8 md:gap-11"
    >
      <Link href={`/article/${principal.slug}`} className="block group">
        <ArticleImage
          image={principal.image}
          fallbackLegende={`Illustration — ${rubrique(principal.rubrique).label}`}
          className="w-full h-[220px] sm:h-[300px] md:h-[440px]"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
        <div className="font-ui font-bold text-[11px] tracking-[0.12em] uppercase text-gold-deep mt-4 md:mt-5">
          {rubrique(principal.rubrique).label}
        </div>
        <h1 className="font-display font-semibold text-[26px] sm:text-[32px] md:text-[42px] leading-[1.15] md:leading-[1.12] text-ink mt-2 mb-3 md:mb-3.5 group-hover:text-gold-deep transition-colors">
          {principal.titre}
        </h1>
        {principal.chapo ? (
          <p className="font-body text-[15px] md:text-[16.5px] leading-[1.55] text-ink/70">{principal.chapo}</p>
        ) : null}
        <div className="font-ui font-semibold text-[11px] tracking-[0.05em] uppercase text-taupe mt-3 md:mt-4">
          {principal.auteur ? `${principal.auteur} · ` : ""}
          {principal.publieIl_y_a}
        </div>
      </Link>

      <div className="flex flex-col gap-5 md:gap-6">
        {secondaires.map((article, i) => (
          <div key={article.slug}>
            {i > 0 ? <div className="h-px bg-rule mb-5 md:mb-6" /> : null}
            <Link href={`/article/${article.slug}`} className="flex gap-3 md:gap-4 group">
              <ArticleImage
                image={article.image}
                className="w-[110px] h-[82px] md:w-[150px] md:h-[110px] shrink-0"
                sizes="150px"
              />
              <div>
                <div className="font-ui font-bold text-[10.5px] md:text-[11px] tracking-[0.1em] md:tracking-[0.12em] uppercase text-gold-deep">
                  {rubrique(article.rubrique).label}
                </div>
                <h3 className="font-display font-semibold text-[15px] md:text-[17px] leading-[1.28] text-ink mt-1 md:mt-1.5 group-hover:text-gold-deep transition-colors">
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
