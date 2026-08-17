import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { AssistenzaForm } from "@/components/forms/AssistenzaForm";

export const metadata: Metadata = {
  title: "Assistenza",
  description:
    "Il rapporto non finisce con la consegna: manutenzione, cura del legno e della resina, interventi e assistenza post-vendita per il tuo pezzo Perla Nera.",
  alternates: { canonical: "/assistenza" },
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

const faq = [
  { q: "Quanto costa una valutazione?", a: "La prima valutazione, sulla base delle informazioni e delle foto che ci mandi, non ha costo. Un eventuale sopralluogo o intervento viene sempre concordato prima." },
  { q: "Quanto tempo richiede un intervento?", a: "Dipende dal tipo di lavorazione: una lucidatura può richiedere pochi giorni, un ripristino più articolato anche alcune settimane. Te lo indichiamo dopo la valutazione." },
  { q: "Posso richiedere assistenza anche se il pezzo non è Perla Nera?", a: "Sì, valutiamo anche pezzi in legno massello e resina che non abbiamo realizzato noi, caso per caso." },
  { q: "Come faccio a mostrarvi il problema?", a: "Bastano alcune foto ben illuminate, inviate tramite il modulo qui sotto o via email a info@perlanera.it: aiutano molto a capire di cosa si tratta prima ancora di parlarne." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function AssistenzaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <section className="surface-dark pt-40 pb-24 lg:pt-48 lg:pb-48">
        <div className="container-page">
          <Breadcrumbs items={[{ label: "Assistenza", href: "/assistenza" }]} />
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
        <Reveal>
          <span className="eyebrow text-text-light-muted">Come valutiamo una richiesta</span>
        </Reveal>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {[
            ["01", "Raccontaci il pezzo", "Di che pezzo si tratta e cosa noti — una foto aiuta, ma non è indispensabile per iniziare."],
            ["02", "Valutiamo insieme", "Rispondiamo entro 48 ore con una prima valutazione e, se serve, un sopralluogo."],
            ["03", "Prossimi passi", "Interveniamo direttamente o ti proponiamo la soluzione più sensata per il tuo caso."],
          ].map(([n, title, body]) => (
            <div key={n}>
              <span className="font-mono text-sm text-text-light-muted">{n}</span>
              <p className="mt-2 font-display text-xl">{title}</p>
              <p className="mt-2 text-sm text-text-light-muted">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section surface="dark" className="border-t border-line-dark">
        <Reveal>
          <span className="eyebrow text-text-dark-muted">Domande frequenti</span>
        </Reveal>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {faq.map((item, i) => (
            <Reveal key={item.q} delay={0.06 * i}>
              <div>
                <p className="font-display text-lg">{item.q}</p>
                <p className="mt-2 text-sm text-text-dark-muted">{item.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section surface="light" className="border-t border-line-light">
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
