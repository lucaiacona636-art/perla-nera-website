import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
  title: "Servizi",
  description:
    "Progettazione su misura, complementi d'arredo, sculture e opere, lavorazioni in legno e resina: le competenze dello studio Perla Nera.",
  alternates: { canonical: "/servizi" },
};

const creazioni = [
  { title: "Tavoli e tavolini", body: "Configurabili passo dopo passo: essenza, forma, resina, finitura, base.", href: "/collezione" },
  { title: "Complementi d'arredo", body: "Panche, consolle, credenze, specchi: lo stesso linguaggio materico, altre funzioni.", href: "/progetta" },
  { title: "Sculture e opere", body: "Pezzi dove la materia è il soggetto, non il supporto di una funzione.", href: "/sculture-e-opere" },
  { title: "Oggetti e pezzi unici", body: "Formati piccoli, tirature di uno, senza compromessi sulla cura.", href: "/progetta" },
  { title: "Progetti su misura e consulenza", body: "Non rientra in nessuna categoria? Ne parliamo insieme prima di ogni impegno, anche solo per valutare fattibilità.", href: "/progetti-su-misura" },
];

const materia = [
  { title: "Lavorazioni in legno massello", body: "Selezione, taglio, stagionatura, levigatura: ogni fase a mano, dal tronco al pezzo finito." },
  { title: "Lavorazioni e inserti in resina", body: "Colate che seguono crepe, nodi e vuoti del legno invece di nasconderli — trasparente, nera, o su misura." },
];

// Structured data — un Service per macro-area, coerente con le sezioni
// sotto (Documento 6 §5). Nessun prezzo indicato: ogni progetto è su
// misura, indicarne uno sarebbe fuorviante.
const servicesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    "Tavoli e tavolini su misura",
    "Complementi d'arredo su misura",
    "Sculture e opere",
    "Progetti su misura e consulenza progettuale",
    "Restauro e ripristino",
    "Manutenzione e rifinitura",
  ].map((name) => ({
    "@type": "Service",
    name,
    provider: { "@id": "https://www.perlanera.it/#business" },
    areaServed: ["Verona", "Lago di Garda", "Nord Italia"],
    url: "https://www.perlanera.it/servizi",
  })),
};

const curaNelTempo = [
  { title: "Manutenzione periodica", problema: "La superficie si è opacizzata col tempo.", soluzione: "Un controllo e una lucidatura restituiscono brillantezza a legno e resina." },
  { title: "Restauro e ripristino", problema: "Un pezzo esistente ha segni, danni, o va recuperato.", soluzione: "Riportiamo struttura e superficie a una condizione vicina all'originale." },
  { title: "Rifinitura", problema: "Vuoi cambiare la finitura di un pezzo che hai già.", soluzione: "Nuova levigatura e trattamento, con lo stesso metodo della prima lavorazione." },
  { title: "Valutazione e consulenza", problema: "Non sei sicuro di cosa serva al tuo pezzo.", soluzione: "Il primo passo è mostrarcelo: valutiamo insieme la soluzione più sensata." },
];

const perChi = [
  { title: "Privati", body: "Un pezzo per la tua casa, progettato attorno allo spazio in cui vivrà." },
  { title: "Hospitality e attività", body: "Ristoranti, hotel, locali: più pezzi, un'identità coerente.", href: "/collaborazioni" },
  { title: "Architetti e interior designer", body: "Supporto tecnico, campionature, produzione per i tuoi progetti professionali.", href: "/collaborazioni" },
];

export default function ServiziPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }} />
      <section className="surface-dark pt-40 pb-24 lg:pt-48 lg:pb-48">
        <div className="container-page">
          <Breadcrumbs items={[{ label: "Servizi", href: "/servizi" }]} />
          <Reveal>
            <span className="eyebrow text-text-dark-muted">Servizi</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 max-w-[20ch] text-4xl sm:text-5xl lg:text-6xl">Stesso metodo, categorie diverse.</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-[58ch] text-lg text-text-dark-muted sm:text-xl">
              Non lavoriamo solo tavoli: legno massello e resina prendono
              forma in ogni categoria dello studio — per privati, per
              hospitality, in collaborazione con architetti e interior
              designer.
            </p>
          </Reveal>
        </div>
      </section>

      <Section surface="light">
        <Reveal>
          <span className="eyebrow text-text-light-muted">Cosa realizziamo</span>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {creazioni.map((item, i) => (
            <Reveal key={item.title} delay={0.04 * i}>
              <Link href={item.href} className="group block h-full border border-line-light bg-ivory-2 p-6 transition-colors hover:border-bronze">
                <h3 className="text-xl">{item.title}</h3>
                <p className="mt-3 text-sm text-text-light-muted">{item.body}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold border-b border-bronze pb-0.5 group-hover:gap-3 transition-all">
                  Scopri →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section surface="dark" className="border-t border-line-dark">
        <Reveal>
          <span className="eyebrow text-text-dark-muted">La materia</span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-5 max-w-[20ch]">Due lavorazioni, un solo metodo.</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {materia.map((item, i) => (
            <Reveal key={item.title} delay={0.06 * i}>
              <div className="h-full border border-line-dark bg-ink-2 p-7">
                <p className="font-display text-2xl">{item.title}</p>
                <p className="mt-4 text-sm text-text-dark-muted">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section surface="dark" className="border-t border-line-dark">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <span className="eyebrow text-text-dark-muted">Cura nel tempo</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 max-w-[20ch]">Il rapporto continua dopo la consegna.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Button href="/assistenza" variant="link">Vedi il servizio di assistenza completo →</Button>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {curaNelTempo.map((item, i) => (
            <Reveal key={item.title} delay={0.05 * i}>
              <div className="h-full border border-line-dark bg-ink-2 p-6">
                <h3 className="text-lg">{item.title}</h3>
                <p className="mt-3 text-sm text-text-dark-muted">{item.problema}</p>
                <p className="mt-2 text-sm font-semibold text-text-dark">{item.soluzione}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section surface="light">
        <Reveal>
          <span className="eyebrow text-text-light-muted">Per chi lavoriamo</span>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {perChi.map((item, i) => (
            <Reveal key={item.title} delay={0.05 * i}>
              {item.href ? (
                <Link href={item.href} className="group block h-full border border-line-light bg-ivory-2 p-6 transition-colors hover:border-bronze">
                  <h3 className="text-xl">{item.title}</h3>
                  <p className="mt-3 text-sm text-text-light-muted">{item.body}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold border-b border-bronze pb-0.5 group-hover:gap-3 transition-all">
                    Scopri di più →
                  </span>
                </Link>
              ) : (
                <div className="h-full border border-line-light bg-ivory-2 p-6">
                  <h3 className="text-xl">{item.title}</h3>
                  <p className="mt-3 text-sm text-text-light-muted">{item.body}</p>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </Section>

      <Section surface="dark" className="border-t border-line-dark">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <h2 className="max-w-[18ch]">Non sai da dove iniziare?</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 max-w-[46ch] text-lg text-text-dark-muted">
                Il configuratore è pensato proprio per questo: due minuti per
                trasformare un&rsquo;idea in un progetto vero.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.14}>
            <div className="flex flex-wrap gap-4">
              <Button href="/progetta">Progetta il tuo pezzo</Button>
              <Button href="/richiedi-un-progetto" variant="secondary">Richiedi un progetto</Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
