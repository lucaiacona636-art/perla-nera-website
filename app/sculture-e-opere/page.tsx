import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Sculture & Opere",
  description:
    "Opere in legno e resina dove la materia è il soggetto, non il supporto di una funzione: pezzi unici, installazioni, oggetti fuori dagli schemi.",
};

const direzioni = [
  {
    title: "Pezzi verticali",
    body: "Sculture da terra pensate per essere viste a 360°: il legno lavorato come massa, non come piano.",
    gradient: "from-wood-noce via-ink-2 to-ink",
  },
  {
    title: "Installazioni a parete",
    body: "Composizioni che occupano una superficie intera — resina e legno come rilievo, non come oggetto isolato.",
    gradient: "from-wood-olmo via-ink-2 to-ink",
  },
  {
    title: "Oggetti scultorei da interno",
    body: "Formato ridotto, stessa intensità: pezzi pensati per un tavolo, una libreria, un vuoto preciso.",
    gradient: "from-wood-rovere via-ink-2 to-ink",
  },
  {
    title: "Progetti site-specific",
    body: "Opere disegnate per uno spazio esatto — una hall, una vetrina, un giardino — non adattate dopo.",
    gradient: "from-wood-ulivo via-ink-2 to-ink",
  },
];

export default function SculturaEOperePage() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="surface-dark relative flex min-h-[86vh] flex-col justify-end overflow-hidden pt-40 pb-16 lg:pb-24">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 60% at 78% 30%, rgba(107,75,52,0.28), transparent 65%), radial-gradient(45% 50% at 20% 70%, rgba(138,116,88,0.16), transparent 70%)",
          }}
        />
        <div className="container-page relative z-10">
          <Reveal>
            <span className="eyebrow text-text-dark-muted">Sculture &amp; Opere</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-[16ch] text-5xl leading-[1.05] sm:text-6xl lg:text-[5.5rem]">
              Oltre la funzione.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-[54ch] text-lg text-text-dark-muted sm:text-xl">
              Non tutto ciò che lavoriamo deve servire a qualcosa. Qui la
              materia — legno e resina — è il soggetto stesso dell&rsquo;opera,
              non il mezzo per arrivare a un mobile.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- STATEMENT ---------------- */}
      <section className="surface-light py-24 lg:py-48">
        <div className="container-page">
          <Reveal>
            <p className="max-w-[26ch] font-display text-3xl leading-snug sm:text-4xl lg:text-[2.75rem]">
              Una scultura non si configura. Si progetta insieme, una volta sola.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[62ch] text-lg text-text-light-muted">
              Per questo le opere non passano dal configuratore: nascono da
              una conversazione, da uno spazio da riempire, da un&rsquo;idea che
              magari non ha ancora una forma precisa. È il punto di partenza
              più libero che offriamo.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- DIREZIONI ---------------- */}
      <div className="surface-dark border-t border-line-dark">
        {direzioni.map((item, i) => (
          <div key={item.title} className="border-b border-line-dark last:border-0">
            <div className="container-page grid gap-8 py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
              <Reveal className={i % 2 === 1 ? "lg:order-2" : undefined}>
                <div className={`aspect-[4/3] bg-gradient-to-br ${item.gradient}`} />
              </Reveal>
              <Reveal delay={0.1} className={i % 2 === 1 ? "lg:order-1" : undefined}>
                <span className="eyebrow text-text-dark-muted">{`0${i + 1}`}</span>
                <h2 className="mt-5 max-w-[16ch] text-3xl sm:text-4xl">{item.title}</h2>
                <p className="mt-5 max-w-[46ch] text-lg text-text-dark-muted">{item.body}</p>
              </Reveal>
            </div>
          </div>
        ))}
      </div>

      {/* ---------------- CTA FINALE ---------------- */}
      <section className="surface-light py-24 lg:py-48">
        <div className="container-page flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <h2 className="max-w-[18ch]">Hai in mente un&rsquo;opera, non un prodotto?</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 max-w-[46ch] text-lg text-text-light-muted">
                Raccontacela così com&rsquo;è oggi — anche solo un&rsquo;intuizione.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.14}>
            <Button href="/richiedi-un-progetto">Richiedi un progetto</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
