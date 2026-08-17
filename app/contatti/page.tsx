import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ContattiForm } from "@/components/forms/ContattiForm";

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Contatta l'atelier Perla Nera a Verona: richiedi informazioni, un progetto o una collaborazione. Rispondiamo entro 48 ore.",
};

export default function ContattiPage() {
  return (
    <>
      <section className="surface-dark pt-40 pb-24 lg:pt-48 lg:pb-48">
        <div className="container-page">
          <Reveal>
            <span className="eyebrow text-text-dark-muted">Contatti</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 max-w-[20ch] text-4xl sm:text-5xl lg:text-6xl">Raccontaci il tuo progetto.</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-[58ch] text-lg text-text-dark-muted sm:text-xl">
              Richiesta informazioni, richiesta progetto, assistenza o una
              collaborazione: scrivici, rispondiamo entro 48 ore.
            </p>
          </Reveal>
        </div>
      </section>

      <Section surface="light">
        <div className="grid gap-12 lg:grid-cols-[1fr,1.3fr] lg:gap-16">
          <div>
            <Reveal>
              <span className="eyebrow text-text-light-muted">Contatti diretti</span>
            </Reveal>
            <Reveal delay={0.06}>
              <dl className="mt-6 space-y-5 text-lg">
                <div>
                  <dt className="text-sm text-text-light-muted">Laboratorio</dt>
                  <dd>Verona, Italia — Veneto, Lago di Garda, Nord Italia</dd>
                </div>
                <div>
                  <dt className="text-sm text-text-light-muted">Email</dt>
                  <dd><a href="mailto:info@perlanera.it" className="underline">info@perlanera.it</a></dd>
                </div>
                <div>
                  <dt className="text-sm text-text-light-muted">Telefono</dt>
                  <dd><a href="tel:+390000000000" className="underline">+39 000 000 0000</a></dd>
                </div>
                <div>
                  <dt className="text-sm text-text-light-muted">WhatsApp</dt>
                  <dd><a href="https://wa.me/390000000000" className="underline">Scrivici su WhatsApp</a></dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-10">
                <span className="eyebrow text-text-light-muted">Percorsi rapidi</span>
                <ul className="mt-4 space-y-2 text-sm">
                  <li><a href="/progetta" className="underline">Progetta il tuo pezzo →</a></li>
                  <li><a href="/richiedi-un-progetto" className="underline">Richiedi un progetto →</a></li>
                  <li><a href="/assistenza" className="underline">Richiedi assistenza →</a></li>
                  <li><a href="/collaborazioni" className="underline">Parliamo di una collaborazione →</a></li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-10">
                <span className="eyebrow text-text-light-muted">Social</span>
                <ul className="mt-4 flex gap-5 text-sm">
                  <li><a href="#" className="underline">Instagram</a></li>
                  <li><a href="#" className="underline">Pinterest</a></li>
                </ul>
                <p className="mt-2 text-xs text-text-light-muted">Link social da collegare ai profili reali.</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ContattiForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
