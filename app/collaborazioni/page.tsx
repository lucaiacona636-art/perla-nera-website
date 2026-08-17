import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Collaborazioni",
  description:
    "Perla Nera collabora con architetti, interior designer, studi di progettazione, ristoranti, hotel e attività: progettazione custom, campioni, produzione, installazione.",
};

const ragioni = [
  "Progettazione custom sul tuo progetto, non su un catalogo chiuso",
  "Campionature di essenze e resine da mostrare al cliente finale",
  "Supporto tecnico in fase di progettazione e capitolato",
  "Produzione con tempi comunicati in anticipo, senza sorprese",
  "Gestione del progetto da un unico referente in studio",
  "Consegna e installazione, anche per forniture multiple",
];

export default function CollaborazioniPage() {
  return (
    <>
      <section className="surface-dark pt-40 pb-24 lg:pt-48 lg:pb-48">
        <div className="container-page">
          <Reveal>
            <span className="eyebrow text-text-dark-muted">Collaborazioni</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 max-w-[20ch] text-4xl sm:text-5xl lg:text-6xl">Parliamo di una collaborazione.</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-[58ch] text-lg text-text-dark-muted sm:text-xl">
              Lavoriamo con architetti, interior designer, studi di
              progettazione, ristoranti, hotel, locali e aziende che vogliono
              inserire un pezzo unico — o più pezzi coerenti — in un progetto
              più ampio.
            </p>
          </Reveal>
        </div>
      </section>

      <Section surface="light">
        <div className="grid gap-9 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="eyebrow text-text-light-muted">Perché collaborare con noi</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 max-w-[18ch]">Un referente unico, dal progetto alla posa.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ul className="space-y-4">
              {ragioni.map((r) => (
                <li key={r} className="flex gap-3 text-lg text-text-light-muted">
                  <span className="mt-3 h-1 w-1 shrink-0 rounded-full bg-bronze" />
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section surface="dark" className="border-t border-line-dark">
        <div className="grid gap-5 sm:grid-cols-2">
          <Reveal>
            <div className="h-full border border-line-dark bg-ink-2 p-7">
              <span className="eyebrow text-text-dark-muted">Progettazione</span>
              <p className="mt-4 font-display text-2xl">Architetti &amp; interior designer</p>
              <p className="mt-4 text-text-dark-muted">
                Entriamo nel tuo progetto con la stessa cura di un pezzo su
                commissione diretta: campioni per il cliente, disegni tecnici,
                tempi di produzione chiari, un solo referente dall&rsquo;inizio
                alla consegna.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full border border-line-dark bg-ink-2 p-7">
              <span className="eyebrow text-text-dark-muted">Hospitality</span>
              <p className="mt-4 font-display text-2xl">Ristoranti, hotel, locali, aziende</p>
              <p className="mt-4 text-text-dark-muted">
                Sappiamo gestire forniture multiple mantenendo qualità e
                identità coerenti tra i pezzi — la sfida tipica di un
                ambiente che deve raccontare un&rsquo;unica storia in più punti.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section surface="light">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <h2 className="max-w-[18ch]">Raccontaci il tuo progetto.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <Button href="/richiedi-un-progetto">Parliamo di una collaborazione</Button>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
