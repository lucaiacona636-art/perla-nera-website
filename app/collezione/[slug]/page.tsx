import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Button } from "@/components/ui/Button";
import { caseStudies, getCaseStudy } from "@/content/case-studies";

// Template per vere pagine progetto — Documento 1 "case study". Oggi
// `caseStudies` è vuoto: nessuna pagina viene generata finché non c'è un
// progetto reale da pubblicare (v. content/case-studies.ts). Aggiungere un
// progetto lì basta a far comparire questa pagina, senza altre modifiche.
export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) return {};
  return {
    title: project.nome,
    description: project.concept,
    alternates: { canonical: `/collezione/${slug}` },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) notFound();

  const specs = [
    ["Categoria", project.categoria],
    ["Essenza", project.essenza],
    ["Dimensioni", project.dimensioni],
    ["Resina", project.resina],
    ["Finitura", project.finitura],
    ["Installazione", project.installazione],
  ].filter(([, value]) => value) as [string, string][];

  return (
    <>
      <section className="surface-dark pt-40 pb-24 lg:pt-48 lg:pb-48">
        <div className="container-page">
          <Breadcrumbs
            items={[
              { label: "Collezione", href: "/collezione" },
              { label: project.nome, href: `/collezione/${slug}` },
            ]}
          />
          <Reveal>
            <span className="eyebrow text-text-dark-muted">{project.categoria}</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 max-w-[20ch] text-4xl sm:text-5xl lg:text-6xl">{project.nome}</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-[58ch] text-lg text-text-dark-muted sm:text-xl">{project.concept}</p>
          </Reveal>
        </div>
      </section>

      {project.fotografie.length > 0 && (
        <Section surface="light">
          <div className="grid gap-5 sm:grid-cols-2">
            {project.fotografie.map((photo, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <div className="aspect-[4/3] overflow-hidden border border-line-light">
                  <MediaSlot media={photo} />
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {specs.length > 0 && (
        <Section surface="dark" className="border-t border-line-dark">
          <Reveal>
            <span className="eyebrow text-text-dark-muted">Scheda progetto</span>
          </Reveal>
          <dl className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {specs.map(([label, value]) => (
              <div key={label}>
                <dt className="text-sm text-text-dark-muted">{label}</dt>
                <dd className="mt-1 font-display text-lg">{value}</dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {project.processo && project.processo.length > 0 && (
        <Section surface="light">
          <Reveal>
            <span className="eyebrow text-text-light-muted">Il processo</span>
          </Reveal>
          <ol className="mt-8 space-y-4">
            {project.processo.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-mono text-sm text-text-light-muted">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-text-light-muted">{step}</p>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {project.risultato && (
        <Section surface="dark" className="border-t border-line-dark">
          <Reveal>
            <span className="eyebrow text-text-dark-muted">Risultato</span>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-5 max-w-[62ch] text-lg text-text-dark-muted">{project.risultato}</p>
          </Reveal>
        </Section>
      )}

      <Section surface="light">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <h2 className="max-w-[18ch]">Un progetto simile per il tuo spazio?</h2>
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
