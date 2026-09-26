import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LogoMark } from "@/components/Logo";
import { EDITIONS_NOM, EDITIONS_SLOGAN, EDITIONS_TRAVAUX } from "@/lib/editions";
import { CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Les Éditions Astres Noirs",
  description: "Les Éditions Astres Noirs, maison d'édition mère d'Astres Noirs Actu : édition, distribution et promotion des œuvres littéraires africaines.",
};

export default function EditionsPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-[760px] mx-auto px-4 sm:px-6 md:px-10 py-10 md:py-14">
        <div className="text-center mb-10 md:mb-14">
          <LogoMark className="w-12 h-14 mx-auto mb-4" />
          <div className="font-ui font-bold text-[11px] tracking-[0.14em] uppercase text-gold-deep mb-3">
            La maison d&apos;édition
          </div>
          <h1 className="font-display font-semibold text-[30px] sm:text-[38px] text-ink">{EDITIONS_NOM}</h1>
          <p className="font-body italic text-[15px] text-ink/60 mt-3">{EDITIONS_SLOGAN}</p>
        </div>

        <div className="font-body text-[16px] sm:text-[17px] leading-relaxed text-ink/85 mb-10">
          <p>
            Astres Noirs Actu est une publication numérique des Éditions Astres Noirs, maison
            d&apos;édition basée à Yaoundé, au Cameroun.
          </p>
        </div>

        <div className="pt-8 border-t border-rule">
          <div className="font-ui font-bold text-[11px] tracking-[0.12em] uppercase text-gold-deep mb-5">
            Nos travaux
          </div>
          <ul className="space-y-3.5">
            {EDITIONS_TRAVAUX.map((t) => (
              <li key={t} className="flex gap-3 font-body text-[15px] leading-relaxed text-ink/80">
                <span className="text-gold-deep shrink-0">—</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 md:mt-14 pt-8 border-t border-rule text-center font-ui text-[13px] text-ink/55 leading-relaxed">
          <p>{CONTACT.siege} — {CONTACT.bp}</p>
          <p>{CONTACT.telephones.join(" / ")}</p>
          <a href={`mailto:${CONTACT.email}`} className="hover:text-gold-deep">{CONTACT.email}</a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
