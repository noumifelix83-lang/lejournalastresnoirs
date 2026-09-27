import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

// Client d'écriture, réservé aux routes serveur (API routes) : jamais
// importé depuis un composant client, le jeton ne doit pas fuiter au
// navigateur. Nécessite `SANITY_API_TOKEN` (rôle "Editor" ou supérieur),
// à ajouter dans les variables d'environnement Vercel.
export const sanityWriteClient = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
