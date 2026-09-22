"use client";

import { useState } from "react";
import Link from "next/link";
import type { Rubrique } from "@/lib/rubriques";

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}

export function MobileNav({
  flat,
  vivre,
  culture,
}: {
  flat: Rubrique[];
  vivre: Rubrique[];
  culture: Rubrique[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
        aria-expanded={open}
        className="text-paper p-2 -mr-2"
      >
        <MenuIcon />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 bg-ink flex flex-col">
          <div className="flex items-center justify-between px-4 h-14 border-b border-white/10 shrink-0">
            <span className="font-ui font-black text-[15px] tracking-wide text-paper">MENU</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer le menu"
              className="text-paper p-2 -mr-2"
            >
              <CloseIcon />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-4 py-4">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="block py-3 font-ui font-bold text-[17px] tracking-[0.02em] uppercase text-gold border-b border-white/10"
            >
              Une
            </Link>
            {flat.map((r) => (
              <Link
                key={r.slug}
                href={`/rubrique/${r.slug}`}
                onClick={() => setOpen(false)}
                className="block py-3 font-ui font-bold text-[17px] tracking-[0.02em] uppercase text-paper border-b border-white/10"
              >
                {r.label}
              </Link>
            ))}

            <div className="font-ui font-bold text-[11px] tracking-[0.14em] uppercase text-taupe pt-6 pb-2">
              Vivre
            </div>
            {vivre.map((r) => (
              <Link
                key={r.slug}
                href={`/rubrique/${r.slug}`}
                onClick={() => setOpen(false)}
                className="block py-3 font-ui font-semibold text-[16px] text-paper/85 border-b border-white/10"
              >
                {r.label}
              </Link>
            ))}

            <div className="font-ui font-bold text-[11px] tracking-[0.14em] uppercase text-gold pt-6 pb-2">
              Culture
            </div>
            {culture.map((r) => (
              <Link
                key={r.slug}
                href={`/rubrique/${r.slug}`}
                onClick={() => setOpen(false)}
                className="block py-3 font-ui font-semibold text-[16px] text-paper/85 border-b border-white/10"
              >
                {r.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
