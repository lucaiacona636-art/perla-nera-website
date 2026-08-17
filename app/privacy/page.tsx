import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Informativa sul trattamento dei dati personali di Perla Nera.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="surface-dark pt-40 pb-24 lg:pt-48 lg:pb-48">
        <div className="container-page">
          <span className="eyebrow text-text-dark-muted">Informativa</span>
          <h1 className="mt-5 max-w-[20ch] text-4xl sm:text-5xl">Privacy</h1>
        </div>
      </section>

      <Section surface="light">
        <div className="max-w-[70ch] space-y-8 text-text-light-muted">
          <p className="border border-line-light bg-ivory-2 p-5 text-sm">
            Questa pagina è una bozza strutturale, non ancora un&rsquo;informativa
            legalmente valida: i campi tra parentesi quadre vanno completati
            con i dati reali dello studio e il testo va rivisto da un
            consulente privacy prima della pubblicazione definitiva.
          </p>

          <div>
            <h2 className="text-2xl text-text-light">Titolare del trattamento</h2>
            <p className="mt-3">
              [Ragione sociale] — [Indirizzo sede] — P.IVA [numero] — email:{" "}
              <a href="mailto:info@perlanera.it" className="underline">info@perlanera.it</a>
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-text-light">Dati raccolti e finalità</h2>
            <p className="mt-3">
              Attraverso i moduli del sito (configuratore, richiesta progetto,
              contatti) raccogliamo nome, email, telefono, città, dettagli del
              progetto ed eventuali allegati, con la sola finalità di
              rispondere alla richiesta e gestire il rapporto precontrattuale.
              Non utilizziamo questi dati per finalità di marketing senza un
              consenso separato.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-text-light">Base giuridica e conservazione</h2>
            <p className="mt-3">
              Il trattamento si basa sul consenso prestato in fase di invio
              del modulo e sull&rsquo;esecuzione di misure precontrattuali. I dati
              sono conservati per il tempo necessario a gestire la richiesta e,
              in caso di rapporto commerciale, per gli obblighi di legge
              successivi.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-text-light">Diritti dell&rsquo;interessato</h2>
            <p className="mt-3">
              In qualsiasi momento puoi richiedere accesso, rettifica,
              cancellazione o limitazione del trattamento dei tuoi dati
              scrivendo a{" "}
              <a href="mailto:info@perlanera.it" className="underline">info@perlanera.it</a>.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-text-light">Cookie</h2>
            <p className="mt-3">
              Per i dettagli su cookie e strumenti di misurazione utilizzati,
              consulta la <a href="/cookie" className="underline">pagina Cookie</a>.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
