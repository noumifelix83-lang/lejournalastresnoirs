interface TreeIconProps {
  className?: string;
}

/** Jujubier — arbre traditionnel au houppier étalé et irrégulier. */
export function JujubeTree({ className }: TreeIconProps) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true">
      <path
        d="M30,58 L30,34"
        stroke="#14100D"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M30,44 L18,38 M30,40 L42,35"
        stroke="#14100D"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M30,10
           C20,10 14,18 16,26
           C8,26 4,34 10,40
           C6,46 12,52 20,49
           C24,54 34,54 38,49
           C46,52 52,45 47,39
           C54,33 49,25 41,26
           C43,17 36,10 30,10 Z"
        fill="#B8863B"
      />
    </svg>
  );
}

/** Arbre de la paix — houppier ample et symétrique, tronc droit. */
export function PeaceTree({ className }: TreeIconProps) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true">
      <path
        d="M30,58 L30,32"
        stroke="#14100D"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M30,42 L20,48 M30,42 L40,48"
        stroke="#14100D"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M30,8
           C42,8 50,18 46,28
           C52,30 54,40 46,44
           C48,50 42,56 30,54
           C18,56 12,50 14,44
           C6,40 8,30 14,28
           C10,18 18,8 30,8 Z"
        fill="#B8863B"
      />
      <circle cx="30" cy="30" r="6" fill="#F2A123" />
    </svg>
  );
}
