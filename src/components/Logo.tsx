const SUN_PATH =
  "M200.0,152.0 L209.8,211.0 L241.3,160.2 L227.8,218.4 L276.4,183.6 L241.6,232.2 L299.8,218.7 L249.0,250.2 L308.0,260.0 L249.0,269.8 L299.8,301.3 L241.6,287.8 L276.4,336.4 L227.8,301.6 L241.3,359.8 L209.8,309.0 L200.0,368.0 L190.2,309.0 L158.7,359.8 L172.2,301.6 L123.6,336.4 L158.4,287.8 L100.2,301.3 L151.0,269.8 L92.0,260.0 L151.0,250.2 L100.2,218.7 L158.4,232.2 L123.6,183.6 L172.2,218.4 L158.7,160.2 L190.2,211.0 Z";
const CRESCENT_PATH =
  "M60,190 A140,140 0 0 1 340,190 A197.9,197.9 0 0 0 60,190 Z";

interface LogoMarkProps {
  className?: string;
  /** "ink" pour fond clair, "reversed" pour fond sombre. */
  variant?: "ink" | "reversed";
}

/** Le sigle seul — le croissant et l'astre. */
export function LogoMark({ className, variant = "ink" }: LogoMarkProps) {
  const crescentFill = variant === "ink" ? "#14100D" : "#F5F3EF";
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true">
      <path d={CRESCENT_PATH} fill={crescentFill} />
      <path d={SUN_PATH} fill="#F2A123" />
    </svg>
  );
}

interface WordmarkProps {
  className?: string;
  variant?: "ink" | "reversed";
}

/** Le nom complet, tel qu'utilisé dans le masthead et le pied de page. */
export function Wordmark({ className, variant = "ink" }: WordmarkProps) {
  const color = variant === "ink" ? "text-ink" : "text-paper";
  return (
    <span className={`font-ui font-black tracking-tight ${color} ${className ?? ""}`}>
      ASTRES NOIRS ACTU
    </span>
  );
}
