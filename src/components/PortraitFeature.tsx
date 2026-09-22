import Link from "next/link";
import { ArticleImage } from "./ArticleImage";
import type { PortraitFeature as PortraitFeatureData } from "@/lib/types";

function ArrowRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function PortraitFeature({ portrait }: { portrait: PortraitFeatureData }) {
  return (
    <section id="portrait" className="w-full bg-ink py-10 md:py-16">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-10 grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-6 md:gap-14 items-center">
        <ArticleImage
          image={portrait.image}
          fallbackLegende="Portrait"
          dark
          className="w-full h-[220px] sm:h-[300px] md:h-[380px]"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
        <div>
          <div className="font-ui font-bold text-[11px] tracking-[0.12em] uppercase text-gold mb-3 md:mb-4">
            Portrait
          </div>
          <h2 className="font-display italic font-semibold text-[24px] md:text-[34px] leading-[1.28] text-paper mb-4 md:mb-5">
            « {portrait.citation} »
          </h2>
          <p className="font-body text-[14.5px] md:text-[16px] text-paper/75 mb-4 md:mb-5">{portrait.extrait}</p>
          <Link
            href={`/article/${portrait.slug}`}
            className="font-ui font-bold text-[12px] tracking-[0.05em] uppercase text-gold flex items-center gap-1.5 w-fit"
          >
            Lire le portrait <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
