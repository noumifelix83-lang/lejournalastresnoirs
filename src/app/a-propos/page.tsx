import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE_SLOGAN, CONTACT } from "@/lib/contact";
import { RUBRIQUES } from "@/lib/rubriques";

export const metadata: Metadata = {
  title: "À propos",
  description: "Astres Noirs Actu, média en ligne d'informations générales et continues, une publication des Éditions Astres Noirs.",
};

export default function AProposPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-[760px] mx-auto px-4 sm:px-6 md:px-10 py-10 md:py-14">
        <div className="text-center mb-10 md:mb-14">
          <div className="font-ui font-bold text-[11px] tracking-[0.14em] uppercase text-gold-deep mb-3">
            À propos
          </div>
          <h1 className="font-display font-semibold text-[30px] sm:text-[38px] text-ink">Astres Noirs Actu</h1>
          <p className="font-body italic text-[15px] text-ink/60 mt-3">{SITE_SLOGAN}</p>
        </div>

        <div className="font-body text-[16px] sm:text-[17px] leading-relaxed text-ink/85 space-y-5">
          <p>
            Astres Noirs Actu est un média en ligne d&apos;informations générales et continues, publié par
            les Éditions Astres Noirs depuis Yaoundé, au Cameroun.
          </p>
          <p>
            Le journal couvre l&apos;actualité à travers {RUBRIQUES.length} rubriques —{" "}
            {RUBRIQUES.map((r) => r.label).join(", ")} — avec l&apos;ambition de devenir une référence
            de l&apos;information sur le continent africain.
          </p>
        </div>

        <div className="mt-10 md:mt-14 pt-8 border-t border-rule text-center">
          <p className="font-body text-[15px] text-ink/70 mb-4">
            Découvrez l&apos;équipe qui fait le journal au quotidien.
          </p>
          <Link
            href="/redaction"
            className="inline-block font-ui font-bold text-[13px] tracking-[0.05em] uppercase text-gold-deep border border-gold-deep/40 rounded-full px-6 py-2.5 hover:bg-gold-deep hover:text-paper transition-colors"
          >
            La rédaction
          </Link>
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
