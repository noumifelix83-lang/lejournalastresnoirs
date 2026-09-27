import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AbonnementForm } from "@/components/AbonnementForm";

export const metadata: Metadata = {
  title: "S'abonner à la lettre",
  description: "Recevez l'essentiel de l'actualité d'Astres Noirs Actu chaque matin, par e-mail.",
};

export default function AbonnementPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-[620px] mx-auto px-4 sm:px-6 md:px-10 py-14 md:py-20 text-center">
        <div className="font-ui font-bold text-[11px] tracking-[0.14em] uppercase text-gold-deep mb-3">
          La lettre
        </div>
        <h1 className="font-display font-semibold text-[28px] sm:text-[34px] text-ink mb-4">
          Recevez l&apos;essentiel de l&apos;actualité chaque matin
        </h1>
        <p className="font-body text-[15px] text-ink/70 mb-8">
          Une sélection quotidienne, par la rédaction d&apos;Astres Noirs Actu. Sans spam,
          désabonnement en un clic.
        </p>
        <AbonnementForm variant="light" />
      </main>
      <SiteFooter />
    </>
  );
}
