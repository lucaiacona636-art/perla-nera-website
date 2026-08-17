import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Cookie",
  description: "Informativa sui cookie utilizzati dal sito Perla Nera.",
};

const cookieTable = [
  { name: "Cookie tecnici", purpose: "Necessari al funzionamento del sito (es. preferenze di consenso).", duration: "Sessione / 12 mesi", consent: "Non richiesto" },
  { name: "Google Analytics 4", purpose: "Misurazione statistica anonimizzata del traffico.", duration: "Fino a 14 mesi", consent: "Richiesto" },
  { name: "Meta Pixel", purpose: "Remarketing e misurazione campagne.", duration: "Fino a 90 giorni", consent: "Richiesto" },
];

export default function CookiePage() {
  return (
    <>
      <section className="surface-dark pt-40 pb-24 lg:pt-48 lg:pb-48">
        <div className="container-page">
          <span className="eyebrow text-text-dark-muted">Informativa</span>
          <h1 className="mt-5 max-w-[20ch] text-4xl sm:text-5xl">Cookie</h1>
        </div>
      </section>

      <Section surface="light">
        <div className="max-w-[70ch]">
          <p className="border border-line-light bg-ivory-2 p-5 text-sm text-text-light-muted">
            Struttura predisposta secondo Documento 9 (Analytics) — Google
            Consent Mode v2: nessun cookie di misurazione/marketing si attiva
            prima del consenso esplicito qui sotto.
          </p>

          <p className="mt-8 text-text-light-muted">
            Puoi scegliere in qualsiasi momento quali categorie di cookie
            accettare. I cookie tecnici sono sempre attivi perché necessari al
            funzionamento del sito.
          </p>

          <div className="mt-8 overflow-x-auto border border-line-light">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-line-light bg-ivory-2">
                  <th className="p-3.5 font-semibold">Cookie</th>
                  <th className="p-3.5 font-semibold">Finalità</th>
                  <th className="p-3.5 font-semibold">Durata</th>
                  <th className="p-3.5 font-semibold">Consenso</th>
                </tr>
              </thead>
              <tbody>
                {cookieTable.map((row) => (
                  <tr key={row.name} className="border-b border-line-light last:border-0">
                    <td className="p-3.5 font-semibold">{row.name}</td>
                    <td className="p-3.5 text-text-light-muted">{row.purpose}</td>
                    <td className="p-3.5 text-text-light-muted">{row.duration}</td>
                    <td className="p-3.5 text-text-light-muted">{row.consent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <button type="button" className="border border-line-light bg-ink px-6 py-3 text-sm font-semibold text-ivory">
              Accetta tutto
            </button>
            <button type="button" className="border border-line-light bg-ivory-2 px-6 py-3 text-sm font-semibold text-text-light">
              Rifiuta
            </button>
            <button type="button" className="border border-line-light bg-ivory-2 px-6 py-3 text-sm font-semibold text-text-light">
              Personalizza
            </button>
          </div>
          <p className="mt-4 text-xs text-text-light-muted">
            Questi controlli sono un segnaposto visivo: la logica di consenso
            reale si collega al banner cookie sitewide (Documento 9), non
            ancora cablato in questa build.
          </p>
        </div>
      </Section>
    </>
  );
}
