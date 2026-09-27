import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Comment Astres Noirs Actu collecte et utilise vos données personnelles.",
};

function Section({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="font-display font-semibold text-[19px] text-ink mb-2.5">{titre}</h2>
      <div className="font-body text-[15px] leading-relaxed text-ink/80 space-y-3">{children}</div>
    </section>
  );
}

export default function ConfidentialitePage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-[720px] mx-auto px-4 sm:px-6 md:px-10 py-10 md:py-14">
        <div className="mb-10 md:mb-12">
          <div className="font-ui font-bold text-[11px] tracking-[0.14em] uppercase text-gold-deep mb-3">
            Vos données
          </div>
          <h1 className="font-display font-semibold text-[28px] sm:text-[34px] text-ink">
            Politique de confidentialité
          </h1>
        </div>

        <Section titre="Qui sommes-nous">
          <p>
            Astres Noirs Actu est une publication numérique des Éditions Astres Noirs, basée à
            Yaoundé, au Cameroun. Cette page décrit les données que nous collectons via le site
            lejournalastresnoirsactu.cm et l&apos;usage que nous en faisons.
          </p>
        </Section>

        <Section titre="Données collectées">
          <p>
            <strong>Inscription à la lettre d&apos;information :</strong> lorsque vous vous abonnez,
            par e-mail ou via un compte Google, nous enregistrons votre adresse e-mail et la
            méthode d&apos;inscription utilisée. Si vous utilisez Google, nous recevons uniquement
            l&apos;adresse e-mail associée à votre compte — jamais votre mot de passe, vos contacts
            ou d&apos;autres données Google.
          </p>
          <p>
            <strong>Navigation :</strong> comme tout site web, notre hébergeur peut collecter des
            données techniques standard (adresse IP, type de navigateur) à des fins de sécurité et
            de performance.
          </p>
        </Section>

        <Section titre="Utilisation des données">
          <p>
            L&apos;adresse e-mail collectée sert uniquement à vous envoyer la lettre
            d&apos;information d&apos;Astres Noirs Actu. Nous ne vendons ni ne partageons vos
            données avec des tiers à des fins commerciales.
          </p>
        </Section>

        <Section titre="Vos droits">
          <p>
            Vous pouvez demander la suppression de votre adresse e-mail de notre liste
            d&apos;abonnés à tout moment en nous écrivant à{" "}
            <a href={`mailto:${CONTACT.email}`} className="text-gold-deep underline">
              {CONTACT.email}
            </a>
            .
          </p>
        </Section>

        <Section titre="Contact">
          <p>
            {CONTACT.siege} — {CONTACT.bp}
            <br />
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
