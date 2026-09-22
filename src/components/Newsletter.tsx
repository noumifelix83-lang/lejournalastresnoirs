export function Newsletter() {
  return (
    <section className="w-full bg-ink py-14 mt-14">
      <div className="max-w-[760px] mx-auto px-10 text-center">
        <h2 className="font-display font-semibold text-[28px] text-paper mb-3">
          Recevez l&apos;essentiel de l&apos;actualité chaque matin
        </h2>
        <p className="font-body text-[15px] text-paper/70 mb-6">
          Une sélection quotidienne, par la rédaction d&apos;Astres Noirs. Sans spam, désabonnement en un clic.
        </p>
        <form className="flex gap-3 justify-center flex-wrap">
          <label htmlFor="nl-email" className="sr-only">
            Adresse e-mail
          </label>
          <input
            id="nl-email"
            type="email"
            required
            placeholder="votre@email.com"
            className="font-body text-[15px] px-4 py-3.5 border-[1.5px] border-paper/35 bg-transparent text-paper placeholder:text-paper/55 rounded-sm w-[320px]"
          />
          <button
            type="submit"
            className="font-ui font-bold text-[13px] tracking-[0.04em] uppercase px-6 py-3.5 rounded-sm bg-gold text-ink cursor-pointer hover:bg-gold-deep transition-colors"
          >
            S&apos;abonner
          </button>
        </form>
      </div>
    </section>
  );
}
