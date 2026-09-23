"use client";

import { useState } from "react";

function LinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
      <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L11.5 4.5" />
      <path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07L12.5 19.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/**
 * Boutons de partage vers les réseaux les plus utilisés par nos lecteurs
 * (WhatsApp en tête). Chaque bouton partage le LIEN de l'article — c'est la
 * plateforme (WhatsApp, Facebook, X…) qui affiche ensuite la carte avec
 * l'image et le résumé, générée automatiquement à partir des balises Open
 * Graph de la page.
 */
export function ShareBar({ url, titre }: { url: string; titre: string }) {
  const [copie, setCopie] = useState(false);

  const texte = `${titre} — ${url}`;
  const liens = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(texte)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(titre)}&url=${encodeURIComponent(url)}`,
  };

  async function copier() {
    try {
      await navigator.clipboard.writeText(url);
      setCopie(true);
      setTimeout(() => setCopie(false), 2000);
    } catch {
      // Presse-papiers indisponible (permissions, contexte non sécurisé…) : rien de grave à faire ici.
    }
  }

  const pill =
    "font-ui font-bold text-[12px] tracking-[0.04em] uppercase px-4 py-2.5 rounded-full border border-ink/15 text-ink hover:bg-ink hover:text-paper hover:border-ink transition-colors";

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="font-ui font-semibold text-[11px] tracking-[0.05em] uppercase text-taupe mr-1">
        Partager
      </span>
      <a href={liens.whatsapp} target="_blank" rel="noopener noreferrer" className={pill}>
        WhatsApp
      </a>
      <a href={liens.facebook} target="_blank" rel="noopener noreferrer" className={pill}>
        Facebook
      </a>
      <a href={liens.x} target="_blank" rel="noopener noreferrer" className={pill}>
        X
      </a>
      <button type="button" onClick={copier} className={`${pill} flex items-center gap-1.5 cursor-pointer`}>
        {copie ? <CheckIcon /> : <LinkIcon />}
        {copie ? "Copié" : "Copier le lien"}
      </button>
    </div>
  );
}
