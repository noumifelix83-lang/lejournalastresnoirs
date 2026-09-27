import { NextResponse, type NextRequest } from "next/server";

// L'adresse Vercel (web-flame-three-96.vercel.app) reste techniquement
// active — Vercel l'assigne au projet et on ne peut pas la désactiver —
// mais on ne veut plus qu'elle apparaisse dans les résultats de recherche
// maintenant que le vrai domaine est branché. Une redirection permanente
// (308) fait comprendre à Google de ne garder que lejournalastresnoirsactu.cm.
const ANCIEN_HOTE = "web-flame-three-96.vercel.app";
const NOUVEAU_DOMAINE = "https://lejournalastresnoirsactu.cm";

export function middleware(request: NextRequest) {
  const hote = request.headers.get("host");
  if (hote === ANCIEN_HOTE) {
    const url = new URL(request.nextUrl.pathname + request.nextUrl.search, NOUVEAU_DOMAINE);
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
