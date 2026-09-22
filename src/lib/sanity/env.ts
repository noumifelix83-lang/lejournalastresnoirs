// Renseignées dans `.env.local` (voir `.env.local.example`). Tant qu'elles
// sont absentes, `isSanityConfigured` reste faux et le site continue de
// servir le contenu de démonstration de `src/lib/content.ts`.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
// Date figée volontairement (convention Sanity) : ne pas la faire suivre
// automatiquement la date du jour, seulement l'avancer à dessein.
export const apiVersion = "2026-09-22";

export const isSanityConfigured = Boolean(projectId);
