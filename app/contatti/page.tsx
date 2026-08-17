import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContattiForm } from "@/components/forms/ContattiForm";
import { business } from "@/content/business";

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Contatta l'atelier Perla Nera a Verona: richiedi informazioni, un progetto o una collaborazione. Rispondiamo entro 48 ore.",
  alternates: { canonical: "/contatti" },
};

export default function ContattiPage() {
  return (
    <>
      <section className="surface-dark pt-40 pb-24 lg:pt-48 lg:pb-48">
        <div className="container-page">
          <Breadcrumbs items={[{ label: "Contatti", href: "/contatti" }]} />
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
                  <dd>{business.address.city}, Italia — Veneto, Lago di Garda, Nord Italia</dd>
                </div>
                <div>
                  <dt className="text-sm text-text-light-muted">Email</dt>
                  <dd>
                    <TrackedLink
                      href={`mailto:${business.email}`}
                      className="underline"
                      event="contact_click"
                      eventParams={{ channel: "email", placement: "contatti" }}
                    >
                      {business.email}
                    </TrackedLink>
                  </dd>
                </div>
                {business.phone && (
                  <div>
                    <dt className="text-sm text-text-light-muted">Telefono</dt>
                    <dd>
                      <TrackedLink href={`tel:${business.phone}`} className="underline" event="phone_click" eventParams={{ placement: "contatti" }}>
                        {business.phone}
                      </TrackedLink>
                    </dd>
                  </div>
                )}
                {business.whatsapp && (
                  <div>
                    <dt className="text-sm text-text-light-muted">WhatsApp</dt>
                    <dd>
                      <TrackedLink
                        href={`https://wa.me/${business.whatsapp}`}
                        className="underline"
                        event="whatsapp_click"
                        eventParams={{ placement: "contatti" }}
                      >
                        Scrivici su WhatsApp
                      </TrackedLink>
                    </dd>
                  </div>
                )}
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

            {(business.social.instagram || business.social.pinterest || business.social.linkedin) && (
              <Reveal delay={0.16}>
                <div className="mt-10">
                  <span className="eyebrow text-text-light-muted">Social</span>
                  <ul className="mt-4 flex gap-5 text-sm">
                    {business.social.instagram && <li><a href={business.social.instagram} className="underline">Instagram</a></li>}
                    {business.social.pinterest && <li><a href={business.social.pinterest} className="underline">Pinterest</a></li>}
                    {business.social.linkedin && <li><a href={business.social.linkedin} className="underline">LinkedIn</a></li>}
                  </ul>
                </div>
              </Reveal>
            )}
          </div>

          <Reveal delay={0.1}>
            <ContattiForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
