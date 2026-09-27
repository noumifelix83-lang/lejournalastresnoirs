import { AbonnementForm } from "./AbonnementForm";

export function Newsletter() {
  return (
    <section className="w-full bg-ink py-10 md:py-14 mt-9 md:mt-14">
      <div className="max-w-[760px] mx-auto px-4 sm:px-6 md:px-10 text-center">
        <h2 className="font-display font-semibold text-[22px] md:text-[28px] text-paper mb-3">
          Recevez l&apos;essentiel de l&apos;actualité chaque matin
        </h2>
        <p className="font-body text-[14px] md:text-[15px] text-paper/70 mb-6">
          Une sélection quotidienne, par la rédaction d&apos;Astres Noirs Actu. Sans spam, désabonnement en un clic.
        </p>
        <AbonnementForm variant="dark" />
      </div>
    </section>
  );
}
