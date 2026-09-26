import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PDG, EQUIPE, type MembreEquipe } from "@/lib/equipe";

export const metadata: Metadata = {
  title: "La rédaction",
  description: "L'équipe d'Astres Noirs Actu : direction, rédaction et réalisation du journal.",
};

function Tags({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {items.map((d) => (
        <span
          key={d}
          className="font-ui font-semibold text-[11px] tracking-[0.05em] uppercase text-gold-deep border border-gold-deep/30 rounded-full px-3 py-1"
        >
          {d}
        </span>
      ))}
    </div>
  );
}

function CarteMembre({ membre }: { membre: MembreEquipe }) {
  return (
    <div>
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-paper-alt">
        <Image src={membre.photo} alt={membre.nom} fill sizes="(max-width: 640px) 100vw, 380px" className="object-cover" />
      </div>
      <h3 className="font-display font-semibold text-[20px] text-ink mt-4">{membre.nom}</h3>
      <div className="font-ui font-bold text-[12px] tracking-[0.05em] uppercase text-gold-deep mt-1">{membre.role}</div>
      {membre.descriptifs ? <Tags items={membre.descriptifs} /> : null}
    </div>
  );
}

export default function RedactionPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-[960px] mx-auto px-4 sm:px-6 md:px-10 py-10 md:py-14">
        <div className="text-center mb-12 md:mb-16">
          <div className="font-ui font-bold text-[11px] tracking-[0.14em] uppercase text-gold-deep mb-3">
            L&apos;équipe
          </div>
          <h1 className="font-display font-semibold text-[30px] sm:text-[38px] text-ink">La rédaction</h1>
          <p className="font-body text-[15px] text-ink/70 mt-3 max-w-[560px] mx-auto">
            Les personnes qui font Astres Noirs Actu, de la direction à la réalisation du journal.
          </p>
        </div>

        {/* Direction : le PDG en premier, mis en avant */}
        <section className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-6 sm:gap-10 items-center pb-12 md:pb-16 mb-12 md:mb-16 border-b border-rule">
          <div className="relative w-full max-w-[220px] mx-auto sm:mx-0 aspect-[4/5] overflow-hidden bg-paper-alt">
            <Image src={PDG.photo} alt={PDG.nom} fill sizes="220px" className="object-cover" />
          </div>
          <div className="text-center sm:text-left">
            <div className="font-ui font-bold text-[11px] tracking-[0.14em] uppercase text-gold mb-2">
              Direction
            </div>
            <h2 className="font-display font-semibold text-[26px] sm:text-[30px] text-ink">{PDG.nom}</h2>
            <div className="font-ui font-bold text-[13px] tracking-[0.04em] uppercase text-gold-deep mt-1.5">
              {PDG.role}
            </div>
            {PDG.descriptifs ? (
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3.5">
                {PDG.descriptifs.map((d) => (
                  <span
                    key={d}
                    className="font-ui font-semibold text-[11px] tracking-[0.05em] uppercase text-gold-deep border border-gold-deep/30 rounded-full px-3 py-1"
                  >
                    {d}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        {/* Reste de l'équipe */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-8">
          {EQUIPE.map((membre) => (
            <CarteMembre key={membre.nom} membre={membre} />
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
