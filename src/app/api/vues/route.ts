import { NextResponse } from "next/server";
import { isSanityConfigured } from "@/lib/sanity/env";
import { sanityWriteClient } from "@/lib/sanity/writeClient";

export async function POST(request: Request) {
  if (!isSanityConfigured || !process.env.SANITY_API_TOKEN) {
    return NextResponse.json({ error: "Service indisponible pour le moment." }, { status: 503 });
  }

  let body: { slug?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (!body.slug || typeof body.slug !== "string") {
    return NextResponse.json({ error: "Slug manquant." }, { status: 400 });
  }

  // Incrémente de façon atomique : deux lectures simultanées ne se
  // marchent pas dessus. `setIfMissing` couvre les articles publiés
  // avant l'ajout du champ (jamais encore initialisé à 0).
  const updated = await sanityWriteClient
    .patch({ query: `*[_type == "article" && slug.current == $slug][0]`, params: { slug: body.slug } })
    .setIfMissing({ vues: 0 })
    .inc({ vues: 1 })
    .commit({ returnDocuments: true });

  if (!updated) {
    return NextResponse.json({ error: "Article introuvable." }, { status: 404 });
  }

  return NextResponse.json({ vues: updated.vues as number });
}
