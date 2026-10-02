import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Nos services",
  description:
    "Portraits biographiques, reportages et couverture d'événements : la rédaction d'Astres Noirs Actu réalise des contenus journalistiques sur commande.",
};

const SERVICES = [
  {
    titre: "Portrait biographique",
    description:
      "Un portrait fouillé et valorisant de votre parcours, publié dans notre rubrique Portrait ou en article dédié. Idéal pour une personnalité, un entrepreneur, un artiste, une figure culturelle.",
  },
  {
    titre: "Reportage sur commande",
    description:
      "Couverture journalistique approfondie d'un sujet, d'une initiative, d'une activité ou d'une structure, avec texte et photos, publiée sur le journal et partageable sur vos réseaux.",
  },
  {
    titre: "Couverture d'événement",
    description:
      "Notre équipe se déplace pour couvrir votre évènement — cérémonie, festival, conférence, inauguration — et en tire un article illustré, diffusé sur le site et nos canaux de partage.",
  },
  {
    titre: "Interview",
    description:
      "Un entretien structuré avec une personnalité ou un expert, publié dans notre rubrique Interview, pour donner la parole et mettre en avant une expertise ou un engagement.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-[760px] mx-auto px-4 sm:px-6 md:px-10 py-10 md:py-14">
        <div className="text-center mb-10 md:mb-14">
          <div className="font-ui font-bold text-[11px] tracking-[0.14em] uppercase text-gold-deep mb-3">
            Travailler avec nous
          </div>
          <h1 className="font-display font-semibold text-[30px] sm:text-[38px] text-ink">Nos services</h1>
          <p className="font-body text-[15px] text-ink/70 mt-3 max-w-[540px] mx-auto">
            Au-delà de l&apos;actualité culturelle, la rédaction d&apos;Astres Noirs Actu réalise, sur
            commande, des contenus journalistiques professionnels pour les institutions, entreprises et
            particuliers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 pb-10 md:pb-14 border-b border-rule">
          {SERVICES.map((s) => (
            <div key={s.titre}>
              <h2 className="font-display font-semibold text-[19px] text-ink mb-2">{s.titre}</h2>
              <p className="font-body text-[14.5px] leading-relaxed text-ink/75">{s.description}</p>
            </div>
          ))}
        </div>

        <div className="pt-10 md:pt-14">
          <h2 className="font-display font-semibold text-[22px] text-ink mb-5 text-center">Comment ça marche</h2>
          <ol className="space-y-4 max-w-[520px] mx-auto">
            {[
              "Vous nous contactez en décrivant votre besoin (sujet, délai, format souhaité).",
              "Nous vous proposons un devis et une date de publication.",
              "Notre équipe réalise l'entretien, le reportage ou la collecte d'informations nécessaire.",
              "L'article est publié sur le journal et partagé sur nos canaux, avec une version que vous pouvez relayer sur vos propres réseaux.",
            ].map((etape, i) => (
              <li key={i} className="flex gap-3.5">
                <span className="font-ui font-bold text-[13px] text-gold-deep shrink-0">{i + 1}.</span>
                <span className="font-body text-[15px] text-ink/80 leading-relaxed">{etape}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 md:mt-16 pt-8 border-t border-rule text-center">
          <p className="font-body text-[15px] text-ink/70 mb-4">
            Précisez l&apos;objet de votre demande (portrait, reportage, évènement, interview) en nous
            écrivant.
          </p>
          <Link
            href="/contact"
            className="inline-block font-ui font-bold text-[13px] tracking-[0.05em] uppercase text-paper bg-gold-deep rounded-full px-7 py-3 hover:bg-ink transition-colors"
          >
            Nous contacter
          </Link>
          <p className="font-ui text-[13px] text-ink/55 mt-4">
            ou directement par e-mail :{" "}
            <a href={`mailto:${CONTACT.email}`} className="text-gold-deep underline">
              {CONTACT.email}
            </a>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
