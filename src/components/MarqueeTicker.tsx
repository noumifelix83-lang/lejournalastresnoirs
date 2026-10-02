function Items({ items }: { items: string[] }) {
  return (
    <div className="flex items-center gap-3 md:gap-4 shrink-0 pr-3 md:pr-4">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-3 md:gap-4 shrink-0">
          {i > 0 ? <span className="text-ink/40">•</span> : null}
          <span className="font-ui font-semibold text-[11.5px] md:text-[12.5px] text-ink whitespace-nowrap">
            {item}
          </span>
        </span>
      ))}
      <span className="text-ink/40">•</span>
    </div>
  );
}

/** Bandeau "À la une" défilant en continu, en pause au survol. */
export function MarqueeTicker({ items }: { items: string[] }) {
  if (items.length === 0) return null;

  return (
    <div className="w-full bg-gold">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-10 h-9 md:h-[38px] flex items-center gap-3 md:gap-4">
        <span className="font-ui font-black text-[10px] md:text-[11px] tracking-[0.08em] uppercase bg-ink text-gold px-2 md:px-2.5 py-1 shrink-0 z-10">
          À la une
        </span>
        <div className="flex-1 overflow-hidden">
          <div className="marquee-track flex w-max">
            <Items items={items} />
            <div aria-hidden="true" className="flex">
              <Items items={items} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
