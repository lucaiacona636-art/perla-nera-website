import type { Metadata } from "next";
import Script from "next/script";
import { fraunces, inter, plexMono } from "./fonts";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { business } from "@/content/business";
import "./globals.css";

// Nessuno di questi tag si carica finché l'ID reale non è impostato
// nell'ambiente di deploy — Documento 9 §2/§6: niente ID inventati, niente
// tracking finto in produzione prima della configurazione dello studio.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

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
  twitter: {
    card: "summary_large_image",
  },
  ...(GSC_VERIFICATION ? { verification: { google: GSC_VERIFICATION } } : {}),
};

// Solo dati reali confermati (v. content/business.ts): telefono/social
// restano fuori dallo structured data finché non sono quelli veri — un dato
// falso qui verrebbe indicizzato da Google, un placeholder visibile no.
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.perlanera.it/#business",
  name: business.legalName ?? "Perla Nera",
  url: "https://www.perlanera.it",
  description:
    "Studio di artigianato e design a Verona: legno massello e resina epossidica lavorati a mano in pezzi unici — tavoli, complementi d'arredo, sculture e progetti su misura.",
  email: business.email,
  ...(business.phone ? { telephone: business.phone } : {}),
  address: {
    "@type": "PostalAddress",
    ...(business.address.street ? { streetAddress: business.address.street } : {}),
    ...(business.address.postalCode ? { postalCode: business.address.postalCode } : {}),
    addressLocality: business.address.city,
    addressRegion: business.address.region,
    addressCountry: business.address.country,
  },
  areaServed: ["Verona", "Lago di Garda", "Nord Italia"],
  sameAs: [business.social.instagram, business.social.pinterest, business.social.linkedin].filter(
    (v): v is string => Boolean(v)
  ),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {GTM_ID && (
          <>
            <Script id="gtm" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
            </Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
                title="Google Tag Manager"
              />
            </noscript>
          </>
        )}
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
