import { NextResponse } from "next/server";
import { isSanityConfigured } from "@/lib/sanity/env";
import { sanityWriteClient } from "@/lib/sanity/writeClient";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Vérifie le jeton d'identité Google Identity Services et en extrait l'e-mail. */
async function emailFromGoogleCredential(credential: string): Promise<string | null> {
  const res = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`);
  if (!res.ok) return null;
  const data = (await res.json()) as { email?: string; email_verified?: string | boolean };
  if (!data.email || (data.email_verified !== true && data.email_verified !== "true")) return null;
  return data.email;
}

export async function POST(request: Request) {
  if (!isSanityConfigured || !process.env.SANITY_API_TOKEN) {
    return NextResponse.json({ error: "Service indisponible pour le moment." }, { status: 503 });
  }

  let body: { email?: string; credential?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  let email: string;
  let source: "email" | "google";

  if (body.credential) {
    const googleEmail = await emailFromGoogleCredential(body.credential);
    if (!googleEmail) {
      return NextResponse.json({ error: "Impossible de vérifier le compte Google." }, { status: 400 });
    }
    email = googleEmail;
    source = "google";
  } else if (body.email && EMAIL_RE.test(body.email)) {
    email = body.email.trim().toLowerCase();
    source = "email";
  } else {
    return NextResponse.json({ error: "Adresse e-mail invalide." }, { status: 400 });
  }

  const dejaAbonne = await sanityWriteClient.fetch(
    `count(*[_type == "abonne" && email == $email])`,
    { email }
  );
  if (dejaAbonne > 0) {
    return NextResponse.json({ ok: true, message: "Vous êtes déjà abonné·e." });
  }

  await sanityWriteClient.create({
    _type: "abonne",
    email,
    source,
    dateInscription: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true, message: "Merci, votre inscription est confirmée." });
}
