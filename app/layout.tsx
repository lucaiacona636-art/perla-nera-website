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
    "Studio di artigianato e design a Verona: legno massello e resina epossidica lavorati a mano in pezzi unici — tavoli, complementi d'arredo, sculture e progetti su misura.",
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "Perla Nera",
  },
};

// Dati minimi e reali (nome, sede, email) — niente telefono o social
// finché non sono quelli veri: un dato falso nello structured data verrebbe
// indicizzato da Google, un placeholder visibile no.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Perla Nera",
  url: "https://www.perlanera.it",
  description:
    "Studio di artigianato e design a Verona: legno massello e resina epossidica lavorati a mano in pezzi unici — tavoli, complementi d'arredo, sculture e progetti su misura.",
  email: "info@perlanera.it",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Verona",
    addressRegion: "Veneto",
    addressCountry: "IT",
  },
  areaServed: ["Verona", "Lago di Garda", "Nord Italia"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
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
