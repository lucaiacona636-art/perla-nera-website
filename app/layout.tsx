import type { Metadata } from "next";
import { fraunces, inter, plexMono } from "./fonts";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.perlanera.it"),
  title: {
    default: "Perla Nera — Studio di artigianato e design, Verona",
    template: "%s | Perla Nera",
  },
  description:
    "Tavoli, complementi d'arredo e pezzi unici in legno massello e resina epossidica, progettati a mano a Verona.",
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "Perla Nera",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-ivory focus:px-4 focus:py-2 focus:text-ink"
        >
          Vai al contenuto
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
