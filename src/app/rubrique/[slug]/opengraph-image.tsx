import { ImageResponse } from "next/og";
import { getArticlesRubriqueComplete } from "@/lib/content";
import type { RubriqueSlug } from "@/lib/rubriques";
import { brandedOgImage, OG_IMAGE_SIZE } from "@/lib/ogImage";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const articles = await getArticlesRubriqueComplete(slug as RubriqueSlug, 1);
  return new ImageResponse(brandedOgImage(articles[0]?.image?.url), size);
}
