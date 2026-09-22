import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

// Ces deux valeurs viennent de votre projet Sanity (voir studio/README.md
// pour les obtenir). Tant qu'elles ne sont pas renseignées, le studio ne
// peut pas démarrer.
const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "VOTRE_PROJECT_ID";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";

export default defineConfig({
  name: "astres-noirs",
  title: "Astres Noirs — Le Journal",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
