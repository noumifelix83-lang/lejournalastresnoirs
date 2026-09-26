import Link from "next/link";
import { LogoMark } from "./Logo";
import { EDITIONS_NOM, EDITIONS_SLOGAN } from "@/lib/editions";

/**
 * La bande numérique des Éditions Astres Noirs : rappelle sur chaque page,
 * et à nouveau à la fin de chaque article, que le journal est une
 * publication de la maison d'édition mère.
 */
export function EditionsBand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="w-full bg-ink-2">
      <div
        className={`max-w-[1320px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-5 ${
          compact ? "py-4" : "py-6 md:py-7"
        }`}
      >
        <LogoMark variant="reversed" className="w-8 h-9 md:w-10 md:h-11 shrink-0" />
        <div className="text-center sm:text-left flex-1">
          <div className="font-ui font-black text-[13px] md:text-[14px] tracking-[0.04em] uppercase text-paper">
            {EDITIONS_NOM}
          </div>
          <div className="font-body italic text-[12.5px] md:text-[13px] text-paper/55">
            {EDITIONS_SLOGAN} — édition, distribution et promotion des œuvres littéraires africaines.
          </div>
        </div>
        <Link
          href="/editions-astres-noirs"
          className="shrink-0 font-ui font-bold text-[11.5px] tracking-[0.05em] uppercase text-gold border border-gold/40 rounded-full px-4 py-2 hover:bg-gold hover:text-ink transition-colors"
        >
          Découvrir la maison d&apos;édition
        </Link>
      </div>
    </div>
  );
}
