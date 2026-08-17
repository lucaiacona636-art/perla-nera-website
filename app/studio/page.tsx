import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Chi siamo e come lavoriamo: uno studio italiano che progetta e realizza pezzi unici in legno massello e resina epossidica, a Verona.",
  alternates: { canonical: "/studio" },
};

const values = [
  {
    title: "Materia",
    body: "Non partiamo mai da un disegno chiuso. Partiamo da un blocco di legno reale, con le sue crepe, i suoi nodi, la sua venatura — e progettiamo intorno a quello che c'è, non a quello che vorremmo ci fosse.",
  },
  {
    title: "Tempo",
    body: "La stagionatura del legno non si accelera. La resina ha un suo tempo di polimerizzazione. Ogni fase del lavoro ha una durata che rispettiamo anche quando costa una consegna più lunga.",
  },
  {
    title: "Unicità",
    body: "Due tavoli nello stesso legno non sono mai identici, perché il legno non lo è. Non lo consideriamo un limite da correggere: è la prova che il pezzo è stato davvero lavorato, non stampato.",
  },
];

export default function StudioPage() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="surface-dark pt-40 pb-24 lg:pt-48 lg:pb-48">
        <div className="container-page">
          <Breadcrumbs items={[{ label: "Studio", href: "/studio" }]} />
          <Reveal>
            <span className="eyebrow text-text-dark-muted">Studio</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 max-w-[18ch] text-4xl sm:text-5xl lg:text-6xl">
              Non vendiamo tavoli. Lavoriamo la materia.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-[58ch] text-lg text-text-dark-muted sm:text-xl">
              Perla Nera è uno studio di artigianato e design a Verona. Lavoriamo
              legno massello e resina epossidica per progettare pezzi unici —
              tavoli, complementi d&rsquo;arredo, oggetti di design, e tutto ciò
              che non rientra ancora in nessuna categoria scritta.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- STORIA ---------------- */}
      <Section surface="light">
        <div className="grid gap-9 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="eyebrow text-text-light-muted">Il punto di partenza</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 max-w-[16ch]">Da un tronco, non da un&rsquo;idea di prodotto.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="space-y-5 text-lg text-text-light-muted">
              <p>
                Perla Nera nasce da una domanda semplice: cosa succede se è il
                legno, e non un disegno chiuso, a decidere la forma? Da lì è
                nato prima un metodo, poi un catalogo — mai il contrario.
              </p>
              <p>
                Il metodo è rimasto lo stesso da quando lavoravamo un solo
                tavolo alla volta: selezionare la materia con cura, rispettarne
                i tempi, costruire il progetto intorno a quello che quel
                legno può realmente offrire. Oggi lo stesso sguardo si
                applica a categorie diverse — non perché il tavolo sia meno
                centrale, ma perché il metodo non gli appartiene in
                esclusiva.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------------- VALORI ---------------- */}
      <Section surface="dark" className="border-t border-line-dark">
        <Reveal>
          <span className="eyebrow text-text-dark-muted">Cosa ci guida</span>
        </Reveal>
        <div className="mt-10 grid gap-px overflow-hidden border border-line-dark sm:grid-cols-3 bg-line-dark">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={0.06 * i}>
              <div className="h-full bg-ink p-7">
                <p className="font-display text-2xl">{value.title}</p>
                <p className="mt-4 text-sm text-text-dark-muted">{value.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------- IL LABORATORIO ---------------- */}
      <Section surface="light">
        <div className="grid gap-9 lg:grid-cols-2 lg:items-center">
          <div>
            <Reveal>
              <span className="eyebrow text-text-light-muted">Dove lavoriamo</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 max-w-[18ch]">Verona, per scelta — non per caso.</h2>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-6 space-y-4 text-lg text-text-light-muted">
                <p>
                  Il laboratorio è a Verona. Da qui seguiamo progetti in tutto
                  il Veneto, sul Lago di Garda e nel Nord Italia — restando
                  vicini a chi il pezzo lo vivrà, dal sopralluogo alla
                  consegna.
                </p>
                <p>
                  Essere vicini non è solo una questione logistica: significa
                  poter vedere lo spazio prima di disegnare il progetto, non
                  dopo.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="aspect-[4/3] border border-line-light bg-gradient-to-br from-wood-rovere via-ivory-2 to-wood-noce/40" />
          </Reveal>
        </div>
      </Section>

      {/* ---------------- IL MESTIERE ---------------- */}
      <Section surface="dark" className="border-t border-line-dark">
        <div className="grid gap-9 lg:grid-cols-[1fr,1.3fr] lg:items-start">
          <div>
            <Reveal>
              <span className="eyebrow text-text-dark-muted">Il mestiere</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 max-w-[16ch]">Le stesse mani, dal legno alla consegna.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="space-y-5 text-lg text-text-dark-muted">
              <p>
                Ogni pezzo passa attraverso lo stesso studio dalla selezione
                del materiale fino all&rsquo;installazione. Non è una scelta
                stilistica: è l&rsquo;unico modo che conosciamo per garantire
                che l&rsquo;ultima fase risponda davvero a chi ha pensato la
                prima.
              </p>
              <p>
                Per questo non prendiamo più progetti di quanti riusciamo a
                seguire con questa attenzione — anche quando significa far
                aspettare.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------------- CTA FINALE ---------------- */}
      <Section surface="light">
        <div className="flex flex-col items-start gap-8 border border-line-light bg-ivory-2 p-8 lg:flex-row lg:items-center lg:justify-between lg:p-12">
          <div>
            <Reveal>
              <h2 className="max-w-[18ch]">Raccontaci il tuo spazio.</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-3 max-w-[46ch] text-text-light-muted">
                Che tu abbia già un&rsquo;idea precisa o solo un&rsquo;intuizione, il
                punto di partenza è lo stesso.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.14}>
            <div className="flex flex-wrap gap-4">
              <Button href="/progetta">Progetta il tuo pezzo</Button>
              <Button href="/richiedi-un-progetto" variant="secondary">Parliamo del tuo spazio</Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
