import Link from "next/link";
import { LogoMark } from "./Logo";
import { RUBRIQUES } from "@/lib/rubriques";

export function SiteFooter() {
  const moitie = Math.ceil(RUBRIQUES.length / 2);
  const colonne1 = RUBRIQUES.slice(0, moitie);
  const colonne2 = RUBRIQUES.slice(moitie);

  return (
    <footer className="w-full bg-ink-3 pt-10 md:pt-14 pb-8 mt-auto">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-x-6 gap-y-9 md:gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2.5 mb-3.5">
            <LogoMark variant="reversed" className="w-[26px] h-[30px]" />
            <span className="font-ui font-black text-[18px] text-paper tracking-wide">ASTRES NOIRS</span>
          </div>
          <p className="font-body text-[13.5px] text-paper/60 max-w-[280px]">
            Le Journal Astres Noirs est une publication numérique des Éditions Astres Noirs. Qui lira vivra.
          </p>
          <div className="flex gap-4 mt-4">
            {["Facebook", "Instagram", "X"].map((s) => (
              <Link key={s} href="#" className="font-ui font-semibold text-[12px] tracking-[0.04em] uppercase text-paper/55 hover:text-gold">
                {s}
              </Link>
            ))}
          </div>
        </div>

        <FooterColumn titre="Rubriques" items={colonne1.map((r) => ({ label: r.label, href: `/rubrique/${r.slug}` }))} />
        <FooterColumn titre="" items={colonne2.map((r) => ({ label: r.label, href: `/rubrique/${r.slug}` }))} />
        <FooterColumn
          titre="La maison"
          items={[
            { label: "À propos", href: "/a-propos" },
            { label: "La rédaction", href: "/redaction" },
            { label: "Éditions Astres Noirs", href: "https://astresnoirs.example" },
            { label: "Contact", href: "/contact" },
          ]}
        />
      </div>
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-10 mt-8 md:mt-9 pt-5 border-t border-white/10 flex flex-col sm:flex-row gap-1.5 sm:gap-0 justify-between">
        <span className="font-ui text-[12px] text-paper/45">© 2026 Astres Noirs — Tous droits réservés.</span>
        <span className="font-ui text-[12px] text-paper/45">lejournalastresnoirs.cm</span>
      </div>
    </footer>
  );
}

function FooterColumn({ titre, items }: { titre: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <div className="font-ui font-bold text-[11px] tracking-[0.12em] uppercase text-paper/40 mb-4 h-[13px]">
        {titre}
      </div>
      <div className="flex flex-col gap-2.5">
        {items.map((item) => (
          <Link key={item.label} href={item.href} className="font-ui text-[13.5px] text-paper/72 hover:text-gold">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
