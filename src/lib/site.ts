// L'adresse publique du site, utilisée pour construire les liens absolus
// (cartes de partage Open Graph, URL canonique). Pointe vers le domaine
// Vercel tant que lejournalastresnoirs.cm n'est pas branché — il suffira de
// changer cette seule variable d'environnement le jour venu.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://web-flame-three-96.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Astres Noirs";
