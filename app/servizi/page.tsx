import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Servizi",
  description:
    "Progettazione su misura, complementi d'arredo, sculture e opere, lavorazioni in legno e resina: le competenze dello studio Perla Nera.",
};

const creazioni = [
  { title: "Tavoli e tavolini", body: "La categoria più matura dello studio, oggi interamente configurabile.", href: "/collezione" },
  { title: "Complementi d'arredo", body: "Panche, consolle, credenze, specchi: lo stesso linguaggio materico, altre funzioni.", href: "/progetta" },
  { title: "Sculture e opere", body: "Pezzi dove la materia è il soggetto, non il supporto di una funzione.", href: "/sculture-e-opere" },
  { title: "Oggetti e pezzi unici", body: "Formati piccoli, tirature di uno, senza compromessi sulla cura.", href: "/progetta" },
  { title: "Progetti personalizzati", body: "Non rientra in nessuna categoria? È il punto di partenza più comune.", href: "/progetti-su-misura" },
];

const materia = [
  { title: "Lavorazioni in legno massello", body: "Selezione, taglio, stagionatura, levigatura: ogni fase a mano, dal tronco al pezzo finito." },
  { title: "Lavorazioni e inserti in resina", body: "Colate che seguono crepe, nodi e vuoti del legno invece di nasconderli — trasparente, nera, o su misura." },
];

const perChi = [
  { title: "Privati", body: "Un pezzo per la tua casa, progettato attorno allo spazio in cui vivrà." },
  { title: "Hospitality e attività", body: "Ristoranti, hotel, locali: più pezzi, un'identità coerente.", href: "/collaborazioni" },
  { title: "Architetti e interior designer", body: "Supporto tecnico, campionature, produzione per i tuoi progetti professionali.", href: "/collaborazioni" },
];

export default function ServiziPage() {
  return (
    <>
      <section className="surface-dark pt-40 pb-24 lg:pt-48 lg:pb-48">
        <div className="container-page">
          <Reveal>
            <span className="eyebrow text-text-dark-muted">Servizi</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 max-w-[20ch] text-4xl sm:text-5xl lg:text-6xl">Un atelier, molte competenze.</h1>
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
