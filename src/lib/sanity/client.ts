import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

// N'appelez `sanityClient` que derrière un `if (isSanityConfigured)` : sans
// project ID, le client n'a nulle part où lire.
export const sanityClient = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}
