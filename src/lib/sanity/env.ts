// Renseignées une fois le projet Sanity créé (voir studio/README.md).
// Tant qu'elles sont absentes, `isSanityConfigured` reste faux et le site
// continue de servir le contenu de démonstration de `src/lib/content.ts`.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2024-01-01";

export const isSanityConfigured = Boolean(projectId);
