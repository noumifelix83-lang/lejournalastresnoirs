import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  description: "Conditions d'utilisation du site Astres Noirs Actu.",
};

function Section({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="font-display font-semibold text-[19px] text-ink mb-2.5">{titre}</h2>
      <div className="font-body text-[15px] leading-relaxed text-ink/80 space-y-3">{children}</div>
    </section>
  );
}

export default function ConditionsPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-[720px] mx-auto px-4 sm:px-6 md:px-10 py-10 md:py-14">
        <div className="mb-10 md:mb-12">
          <div className="font-ui font-bold text-[11px] tracking-[0.14em] uppercase text-gold-deep mb-3">
            Mentions légales
          </div>
          <h1 className="font-display font-semibold text-[28px] sm:text-[34px] text-ink">
            Conditions d&apos;utilisation
          </h1>
        </div>

        <Section titre="Éditeur du site">
          <p>
            Astres Noirs Actu est édité par les Éditions Astres Noirs, {CONTACT.siege} —{" "}
            {CONTACT.bp}. Directeur de la publication : Tchuisseu Lowé. Contact :{" "}
            <a href={`mailto:${CONTACT.email}`} className="text-gold-deep underline">{CONTACT.email}</a>.
          </p>
        </Section>

        <Section titre="Contenu">
          <p>
            Les articles, images et éléments graphiques publiés sur ce site sont la propriété des
            Éditions Astres Noirs ou de leurs auteurs respectifs, sauf mention contraire. Toute
            reproduction sans autorisation préalable est interdite.
          </p>
        </Section>

        <Section titre="Lettre d'information">
          <p>
            En vous abonnant à la lettre d&apos;information, vous acceptez de recevoir des
            e-mails périodiques d&apos;Astres Noirs Actu. Vous pouvez vous désabonner à tout
            moment en nous contactant à l&apos;adresse ci-dessus. Voir aussi notre{" "}
            <a href="/confidentialite" className="text-gold-deep underline">politique de confidentialité</a>.
          </p>
        </Section>

        <Section titre="Responsabilité">
          <p>
            Astres Noirs Actu s&apos;efforce de publier une information fiable et vérifiée. Le
            site ne saurait toutefois être tenu responsable des erreurs ou omissions, ni de
            l&apos;usage fait des informations publiées.
          </p>
        </Section>

        <Section titre="Contact">
          <p>
            {CONTACT.telephones.join(" / ")}
            <br />
            <a href={`mailto:${CONTACT.email}`} className="text-gold-deep underline">{CONTACT.email}</a>
          </p>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
