import Link from "next/link";
import { LogoMark } from "./Logo";
import { RUBRIQUES_VIVRE, RUBRIQUES_CULTURE } from "@/lib/rubriques";
import { getDateEdition, getTickerALaUne } from "@/lib/content";

function ChevronDown() {
  return (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.2" y2="16.2" />
    </svg>
  );
}

function NavDropdown({ label, items, gold = false }: { label: string; items: { slug: string; label: string }[]; gold?: boolean }) {
  return (
    <div className="relative group">
      <Link
        href={`/rubrique/${items[0]?.slug ?? ""}`}
        className={`font-ui font-bold text-[13px] tracking-[0.04em] uppercase py-4 flex items-center gap-1.5 border-b-2 border-transparent group-hover:border-gold group-hover:text-gold transition-colors ${
          gold ? "text-gold" : "text-paper"
        }`}
      >
        {label}
        <ChevronDown />
      </Link>
      <div className="absolute top-full left-0 min-w-[250px] bg-ink py-2 shadow-2xl opacity-0 invisible -translate-y-1.5 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all z-20">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/rubrique/${item.slug}`}
            className="block px-5 py-2.5 font-ui font-semibold text-[13px] tracking-[0.03em] uppercase text-paper/80 hover:text-gold hover:bg-white/5"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function SiteHeader() {
  const [dateEdition, ticker] = await Promise.all([getDateEdition(), getTickerALaUne()]);

  return (
    <header>
      {/* Barre utilitaire */}
      <div className="w-full bg-ink">
        <div className="max-w-[1320px] mx-auto px-10 h-[42px] flex items-center justify-between">
          <div className="font-ui font-semibold text-[11.5px] tracking-[0.05em] uppercase text-paper/65">
            {dateEdition} — Édition numérique
          </div>
          <div className="flex items-center gap-5">
            <Link
              href="/abonnement"
              className="font-ui font-semibold text-[11.5px] tracking-[0.05em] uppercase text-paper/65 hover:text-gold"
            >
              S&apos;abonner à la lettre
            </Link>
            <Link href="/recherche" aria-label="Rechercher" className="text-paper/85 hover:text-gold">
              <SearchIcon />
            </Link>
          </div>
        </div>
      </div>

      {/* Masthead */}
      <div className="max-w-[1320px] mx-auto px-10 pt-9 pb-6 flex flex-col items-center">
        <Link href="/" aria-label="Astres Noirs — accueil">
          <LogoMark className="w-[54px] h-[61px] mb-3" />
        </Link>
        <div className="font-ui font-bold text-[11px] tracking-[0.12em] uppercase text-gold-deep mb-1.5">
          Le Journal
        </div>
        <div className="font-ui font-black text-[56px] leading-none tracking-tight text-ink">
          ASTRES NOIRS
        </div>
      </div>

      {/* Navigation */}
      <nav className="w-full bg-ink">
        <div className="max-w-[1320px] mx-auto px-10 flex items-center justify-center gap-9">
          <Link href="/" className="font-ui font-bold text-[13px] tracking-[0.04em] uppercase text-gold py-4 border-b-2 border-gold">
            Une
          </Link>
          <Link href="/rubrique/politique" className="font-ui font-bold text-[13px] tracking-[0.04em] uppercase text-paper py-4 border-b-2 border-transparent hover:border-gold hover:text-gold transition-colors">
            Politique
          </Link>
          <Link href="/rubrique/economie" className="font-ui font-bold text-[13px] tracking-[0.04em] uppercase text-paper py-4 border-b-2 border-transparent hover:border-gold hover:text-gold transition-colors">
            Économie
          </Link>
          <Link href="/rubrique/societe" className="font-ui font-bold text-[13px] tracking-[0.04em] uppercase text-paper py-4 border-b-2 border-transparent hover:border-gold hover:text-gold transition-colors">
            Société
          </Link>
          <Link href="/rubrique/diplomatie" className="font-ui font-bold text-[13px] tracking-[0.04em] uppercase text-paper py-4 border-b-2 border-transparent hover:border-gold hover:text-gold transition-colors">
            Diplomatie
          </Link>
          <NavDropdown label="Vivre" items={RUBRIQUES_VIVRE} />
          <NavDropdown label="Culture" items={RUBRIQUES_CULTURE} gold />
        </div>
      </nav>

      {/* Bandeau à la une */}
      <div className="w-full bg-gold">
        <div className="max-w-[1320px] mx-auto px-10 h-[38px] flex items-center gap-4 overflow-hidden">
          <span className="font-ui font-black text-[11px] tracking-[0.08em] uppercase bg-ink text-gold px-2.5 py-1 shrink-0">
            À la une
          </span>
          {ticker.map((item, i) => (
            <span key={item} className="flex items-center gap-4 shrink-0">
              {i > 0 ? <span className="text-ink/40">•</span> : null}
              <span className="font-ui font-semibold text-[12.5px] text-ink">{item}</span>
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
