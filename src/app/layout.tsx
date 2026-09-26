import type { Metadata } from "next";
import { Fraunces, Source_Serif_4, Archivo } from "next/font/google";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700", "900"],
  style: ["normal", "italic"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "900"],
});

const DESCRIPTION =
  "Astres Noirs Actu : actualité, économie, société, diplomatie, arts et culture. Qui lira vivra.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — Le Journal`, template: `%s — ${SITE_NAME}` },
  description: DESCRIPTION,
  openGraph: {
    siteName: `${SITE_NAME} — Le Journal`,
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${sourceSerif.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">{children}</body>
    </html>
  );
}
