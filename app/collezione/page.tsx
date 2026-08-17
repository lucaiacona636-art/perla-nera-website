import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { categories } from "@/content/categories";

export const metadata: Metadata = {
  title: "Collezione",
  description:
    "Sfoglia la collezione Perla Nera per categoria: tavoli su misura, complementi d'arredo, oggetti di design, pezzi scultorei.",
};

const tavoliProjects = [
  { title: "Tavolo ovale in noce", place: "Villa privata — Affi (VR)", tags: ["Noce", "Resina nera", "Bordo vivo"], gradientFrom: "from-wood-noce" },
  { title: "Tavolo rettangolare in rovere", place: "Residenza privata — Verona", tags: ["Rovere", "Bordo vivo"], gradientFrom: "from-wood-rovere" },
  { title: "Tavolo sagomato in ulivo", place: "Progetto Lago di Garda", tags: ["Ulivo", "Resina trasparente"], gradientFrom: "from-wood-ulivo" },
  { title: "Tavolo rettangolare in olmo", place: "Residenza privata — Bardolino (VR)", tags: ["Olmo", "Finitura opaca"], gradientFrom: "from-wood-olmo" },
  { title: "Tavolo ovale in noce", place: "Progetto Verona centro", tags: ["Noce", "Resina trasparente"], gradientFrom: "from-wood-noce" },
  { title: "Tavolo sagomato in rovere", place: "Villa privata — Lazise (VR)", tags: ["Rovere", "Bordo mosso"], gradientFrom: "from-wood-rovere" },
];

export default function CollezionePage() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="surface-dark pt-40 pb-24 lg:pt-48 lg:pb-48">
        <div className="container-page">
          <Reveal>
            <span className="eyebrow text-text-dark-muted">Collezione</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 max-w-[16ch] text-4xl sm:text-5xl lg:text-6xl">
              Ogni progetto è una storia diversa.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-[58ch] text-lg text-text-dark-muted sm:text-xl">
              Sfoglia per categoria. Tavoli è oggi la più matura — le altre
              crescono con lo stesso metodo, un progetto alla volta.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- CATEGORIE ---------------- */}
      <Section surface="light">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => (
            <Reveal key={category.id} delay={0.04 * i}>
              <Link
                href={category.status === "available" ? "#tavoli" : "/progetta"}
                className="group block h-full border border-line-light bg-ivory-2 p-6 transition-colors hover:border-bronze"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl">{category.label}</h3>
                  {category.status === "coming-soon" && (
                    <span className="eyebrow shrink-0 text-[10px] text-text-light-muted">In arrivo</span>
                  )}
                </div>
                <p className="mt-3 text-sm text-text-light-muted">{category.shortDescription}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-text-light border-b border-bronze pb-0.5 group-hover:gap-3 transition-all">
                  {category.status === "available" ? "Sfoglia i progetti" : "Raccontaci cosa hai in mente"} →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------- TAVOLI ---------------- */}
      <Section surface="light" id="tavoli" className="pt-0">
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-line-light pt-24">
          <div>
            <Reveal>
              <span className="eyebrow text-text-light-muted">Categoria</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 max-w-[16ch]">Tavoli</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Button href="/progetta" variant="link">Progetta il tuo tavolo →</Button>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tavoliProjects.map((project, i) => (
            <Reveal key={`${project.title}-${i}`} delay={0.04 * i}>
              <ProjectCard {...project} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-8 max-w-[52ch] text-sm text-text-light-muted">
            Immagini rappresentative in attesa della fotografia reale di ogni
            progetto — v. Documento 1, Fase 1b.
          </p>
        </Reveal>
      </Section>

      {/* ---------------- CTA FINALE ---------------- */}
      <Section surface="dark" className="border-t border-line-dark">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <h2 className="max-w-[18ch]">Non trovi la tua categoria?</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 max-w-[46ch] text-lg text-text-dark-muted">
                Il progetto speciale su misura è sempre il punto di partenza
                più comune. Raccontacelo.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.14}>
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
