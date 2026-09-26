import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez la rédaction d'Astres Noirs Actu.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-[720px] mx-auto px-4 sm:px-6 md:px-10 py-10 md:py-14">
        <div className="text-center mb-10 md:mb-14">
          <div className="font-ui font-bold text-[11px] tracking-[0.14em] uppercase text-gold-deep mb-3">
            Nous joindre
          </div>
          <h1 className="font-display font-semibold text-[30px] sm:text-[38px] text-ink">Contact</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 border-t border-b border-rule py-8 md:py-10">
          <div>
            <div className="font-ui font-bold text-[11px] tracking-[0.12em] uppercase text-gold-deep mb-2">
              Siège social
            </div>
            <p className="font-body text-[15px] text-ink/80 leading-relaxed">
              {CONTACT.siege}
              <br />
              {CONTACT.bp}
            </p>
          </div>
          <div>
            <div className="font-ui font-bold text-[11px] tracking-[0.12em] uppercase text-gold-deep mb-2">
              Téléphone
            </div>
            <p className="font-body text-[15px] text-ink/80 leading-relaxed">
              {CONTACT.telephones.map((tel) => (
                <span key={tel} className="block">{tel}</span>
              ))}
            </p>
          </div>
          <div className="sm:col-span-2">
            <div className="font-ui font-bold text-[11px] tracking-[0.12em] uppercase text-gold-deep mb-2">
              E-mail
            </div>
            <a href={`mailto:${CONTACT.email}`} className="font-body text-[15px] text-ink/80 hover:text-gold-deep underline">
              {CONTACT.email}
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
