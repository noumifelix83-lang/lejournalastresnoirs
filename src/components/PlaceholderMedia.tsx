interface PlaceholderMediaProps {
  legende?: string;
  className?: string;
  /** Version claire (fond ivoire) ou sombre (pour les sections à fond noir). */
  dark?: boolean;
}

/**
 * Emplacement d'image tant qu'aucune photo réelle n'est fournie par la
 * rédaction. Une fois le CMS branché, remplacer par un <Image> Next.js
 * pointant sur l'image réelle de l'article.
 */
export function PlaceholderMedia({ legende, className, dark = false }: PlaceholderMediaProps) {
  return (
    <div
      className={`relative flex items-end overflow-hidden border ${
        dark ? "bg-ink-2 border-white/10" : "bg-paper-alt border-black/[0.08]"
      } ${className ?? ""}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={dark ? "#F5F3EF" : "#14100D"}
        strokeWidth={1.4}
        className="absolute left-1/2 top-[44%] w-10 h-10 -translate-x-1/2 -translate-y-1/2 opacity-15"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="14" rx="1.5" />
        <circle cx="9" cy="10.5" r="1.6" />
        <path d="M21 16l-5.5-5-4 4-2.5-2.5L3 17" />
      </svg>
      {legende ? (
        <span
          className={`font-ui font-semibold text-[10px] tracking-[0.08em] uppercase px-2.5 py-2 ${
            dark ? "text-paper/55" : "text-taupe"
          }`}
        >
          {legende}
        </span>
      ) : null}
    </div>
  );
}
