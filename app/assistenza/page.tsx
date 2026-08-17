import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { AssistenzaForm } from "@/components/forms/AssistenzaForm";

export const metadata: Metadata = {
  title: "Assistenza",
  description:
    "Il rapporto non finisce con la consegna: manutenzione, cura del legno e della resina, interventi e assistenza post-vendita per il tuo pezzo Perla Nera.",
};

const cura = [
  { title: "Cura del legno", body: "Evita l'esposizione diretta e prolungata al sole e alle fonti di calore, che possono seccare la superficie. Per la pulizia quotidiana basta un panno morbido leggermente umido, seguito da uno asciutto." },
  { title: "Cura della resina", body: "La resina epossidica è stabile ma non indistruttibile: evita di appoggiare direttamente pentole calde o oggetti taglienti. Per la pulizia, un panno morbido e detergenti neutri, senza abrasivi." },
];

const interventi = [
  { title: "Manutenzione periodica", body: "Un controllo e una lucidatura possono restituire brillantezza a legno e resina opacizzati dal tempo." },
  { title: "Ripristino e rinnovo", body: "Dove possibile, riportiamo un pezzo esistente a una condizione vicina all'originale — struttura, superficie, finitura." },
  { title: "Valutazione del pezzo", body: "Se non sei sicuro di cosa serva, il primo passo è mostrarcelo: valutiamo insieme la soluzione più sensata." },
];

export default function AssistenzaPage() {
  return (
    <>
      <section className="surface-dark pt-40 pb-24 lg:pt-48 lg:pb-48">
        <div className="container-page">
          <Reveal>
            <span className="eyebrow text-text-dark-muted">Assistenza</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 max-w-[20ch] text-4xl sm:text-5xl lg:text-6xl">
              Il rapporto non finisce con la consegna.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-[58ch] text-lg text-text-dark-muted sm:text-xl">
              Un pezzo in legno massello e resina vive nel tempo, e nel tempo
              può avere bisogno di cura. Siamo qui anche dopo la consegna.
            </p>
          </Reveal>
        </div>
      </section>

      <Section surface="light">
        <Reveal>
          <span className="eyebrow text-text-light-muted">Cura quotidiana</span>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {cura.map((item, i) => (
            <Reveal key={item.title} delay={0.06 * i}>
              <div className="h-full border border-line-light bg-ivory-2 p-7">
                <p className="font-display text-2xl">{item.title}</p>
                <p className="mt-4 text-text-light-muted">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-[56ch] text-sm text-text-light-muted">
            Indicazioni generali: per il tuo pezzo specifico ti forniamo
            istruzioni di cura dedicate al momento della consegna.
          </p>
        </Reveal>
      </Section>

      <Section surface="dark" className="border-t border-line-dark">
        <Reveal>
          <span className="eyebrow text-text-dark-muted">Interventi</span>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {interventi.map((item, i) => (
            <Reveal key={item.title} delay={0.06 * i}>
              <div className="h-full border border-line-dark bg-ink-2 p-6">
                <p className="font-sans font-semibold">{item.title}</p>
                <p className="mt-3 text-sm text-text-dark-muted">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section surface="light">
        <div className="grid gap-9 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="eyebrow text-text-light-muted">Richiedi assistenza</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 max-w-[18ch]">Raccontaci il pezzo e la richiesta.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-[46ch] text-text-light-muted">
                Puoi contattarci anche direttamente — vedi la pagina{" "}
                <a href="/contatti" className="underline">Contatti</a>.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <AssistenzaForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
