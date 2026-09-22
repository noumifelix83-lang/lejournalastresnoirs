import Link from "next/link";
import { PlaceholderMedia } from "./PlaceholderMedia";
import type { LivreVitrine } from "@/lib/types";

function ArrowRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function LiteratureShelf({ livres }: { livres: LivreVitrine[] }) {
  return (
    <section id="litterature" className="max-w-[1320px] mx-auto pt-9 md:pt-14">
      <div className="px-4 sm:px-6 md:px-10 flex items-baseline justify-between mb-5 md:mb-6 pb-3 md:pb-3.5 border-b-2 border-ink">
        <h2 className="font-ui font-black text-[17px] md:text-[21px] tracking-[0.03em] uppercase text-ink">Littérature</h2>
        <Link
          href="/rubrique/litterature"
          className="font-ui font-bold text-[11px] md:text-[12px] tracking-[0.05em] uppercase text-ink flex items-center gap-1.5"
        >
          Toute la rubrique <ArrowRight />
        </Link>
      </div>
      {/* Étagère : défilement tactile horizontal sur mobile, grille sur desktop */}
      <div className="flex md:grid md:grid-cols-5 gap-4 md:gap-5 overflow-x-auto md:overflow-visible px-4 sm:px-6 md:px-10 pb-2 md:pb-0 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {livres.map((livre) => (
          <div key={livre.titre} className="w-[140px] sm:w-[160px] md:w-auto shrink-0 snap-start">
            <PlaceholderMedia legende={livre.genre} className="w-full h-[190px] sm:h-[210px]" />
            <h3 className="font-display font-semibold text-[14px] md:text-[14.5px] leading-[1.3] text-ink mt-2.5">
              {livre.titre}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
