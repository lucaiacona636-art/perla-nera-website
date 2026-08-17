import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Progetti su misura",
  description:
    "Non scegli semplicemente un prodotto: lo costruiamo insieme. Il percorso di un progetto su misura Perla Nera, dall'idea alla consegna.",
};

const fasi = [
  { n: "01", title: "Idea", body: "Un'esigenza, uno spazio vuoto, una foto salvata, un'intuizione ancora vaga: da qui si parte sempre." },
  { n: "02", title: "Confronto", body: "Ne parliamo insieme — di persona, a Verona, o da remoto se la distanza lo richiede. Ascoltiamo prima di proporre." },
  { n: "03", title: "Progettazione", body: "Forma, dimensioni, dettagli tecnici: il progetto prende una direzione precisa, verificata sul tuo spazio reale." },
  { n: "04", title: "Scelta dei materiali", body: "Selezioniamo insieme l'essenza e, se prevista, la resina — spesso partendo da un blocco di legno già disponibile in laboratorio." },
  { n: "05", title: "Realizzazione", body: "Taglio, stagionatura, colata, assemblaggio: il tempo che serve, non quello che converrebbe." },
  { n: "06", title: "Finitura", body: "Levigatura e trattamento finale a mano, passaggio dopo passaggio." },
  { n: "07", title: "Consegna e installazione", body: "Il pezzo arriva pronto per il suo spazio — non solo consegnato: posizionato." },
];

export default function ProgettiSuMisuraPage() {
  return (
    <>
      <section className="surface-dark pt-40 pb-24 lg:pt-48 lg:pb-48">
        <div className="container-page">
          <Reveal>
            <span className="eyebrow text-text-dark-muted">Progetti su misura</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 max-w-[20ch] text-4xl sm:text-5xl lg:text-6xl">
              Non scegli un prodotto. Lo costruiamo insieme.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-[58ch] text-lg text-text-dark-muted sm:text-xl">
              Puoi partire da un&rsquo;idea precisa, da una necessità pratica, da
              una foto d&rsquo;ispirazione o semplicemente da uno spazio che vuoi
              riempire. Il percorso è lo stesso.
            </p>
          </Reveal>
        </div>
      </section>

      <Section surface="light">
        <ol className="divide-y divide-line-light border-y border-line-light">
          {fasi.map((fase, i) => (
            <Reveal key={fase.n} delay={0.03 * i}>
              <li className="grid gap-2 py-8 sm:grid-cols-[100px,1fr] sm:gap-8">
                <span className="font-mono text-sm text-text-light-muted">{fase.n}</span>
                <div>
                  <p className="font-display text-2xl">{fase.title}</p>
                  <p className="mt-2 max-w-[56ch] text-text-light-muted">{fase.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section surface="dark" className="border-t border-line-dark">
        <div className="grid gap-9 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="eyebrow text-text-dark-muted">Da dove puoi partire</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 max-w-[18ch]">Non serve avere già le idee chiare.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ul className="space-y-5 text-lg text-text-dark-muted">
              <li><strong className="text-text-dark">Un&rsquo;idea precisa</strong> — sai già cosa vuoi: essenza, forma, dove andrà.</li>
              <li><strong className="text-text-dark">Una necessità</strong> — ti serve un pezzo per uno spazio o un uso specifico, ma non sai ancora come.</li>
              <li><strong className="text-text-dark">Una foto o un riferimento</strong> — hai visto qualcosa che ti ha colpito e vuoi partire da lì.</li>
              <li><strong className="text-text-dark">Uno spazio vuoto</strong> — sai dove, non sai ancora cosa: partiamo da un sopralluogo.</li>
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section surface="light">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <h2 className="max-w-[18ch]">Iniziamo dal punto in cui sei.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.08}>
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
