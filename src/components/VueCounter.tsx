"use client";

import { useEffect, useState } from "react";

function EyeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function formatVues(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`;
  return String(n);
}

/** Affiche le nombre de lectures et l'incrémente une fois par visite de page. */
export function VueCounter({ slug, initial }: { slug: string; initial: number }) {
  const [vues, setVues] = useState(initial);

  useEffect(() => {
    let annule = false;
    fetch("/api/vues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!annule && data?.vues) setVues(data.vues);
      })
      .catch(() => {});
    return () => {
      annule = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <span className="inline-flex items-center gap-1.5 font-ui font-semibold text-[11px] tracking-[0.05em] uppercase text-taupe">
      <EyeIcon />
      {formatVues(vues)} vue{vues > 1 ? "s" : ""}
    </span>
  );
}
