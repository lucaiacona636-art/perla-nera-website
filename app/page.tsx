import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { WoodSwatch } from "@/components/ui/WoodSwatch";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { HeroVisual } from "@/components/home/HeroVisual";
import { categories } from "@/content/categories";
import { essences } from "@/content/configurator/essences";

export default function HomePage() {
  const availableCategories = categories;

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="surface-dark relative overflow-hidden pt-40 pb-24 lg:pt-48 lg:pb-48 min-h-[92vh] flex flex-col justify-center">
        <HeroVisual />
        <div className="container-page relative z-10">
          <Reveal>
            <span className="eyebrow text-text-dark-muted">Studio di artigianato e design — Verona</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 max-w-[14ch] text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-[6rem]">
              Materia. Tempo. Unicità.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-[54ch] text-lg text-text-dark-muted sm:text-xl">
              Tavoli, complementi d&rsquo;arredo e pezzi unici in legno massello e resina,
              progettati a mano attorno al tuo spazio. Verona, Lago di Garda, Nord Italia.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/progetta">Progetta il tuo pezzo</Button>
              <Button href="/studio" variant="secondary">Scopri Perla Nera</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- MANIFESTO ---------------- */}
      <Section surface="dark" className="border-t border-line-dark">
        <Reveal>
          <span className="eyebrow text-text-dark-muted">Il nostro mestiere</span>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-[26ch] text-2xl leading-snug sm:text-3xl lg:text-4xl font-display">
            Ogni pezzo Perla Nera nasce da un blocco di materia, non da un catalogo.
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-8 max-w-[62ch] text-lg text-text-dark-muted">
            Scegliamo il legno prima di sapere che forma avrà. Lo lasciamo stagionare.
            Ne seguiamo le crepe con la resina invece di nasconderle: sono la parte più
            onesta della materia. Il risultato non si ordina a taglia — si progetta
            insieme, per lo spazio in cui vivrà.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 max-w-[62ch] text-lg text-text-dark-muted">
            Non produciamo in serie. Realizziamo pezzi — tavoli, complementi d&rsquo;arredo,
            oggetti e progetti che non rientrano in nessuna categoria ancora scritta.
          </p>
        </Reveal>
      </Section>

      {/* ---------------- CATEGORIE ---------------- */}
      <Section surface="light">
        <Reveal>
          <span className="eyebrow text-text-light-muted">Cosa realizziamo</span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-5 max-w-[30ch]">
            Uno studio, più categorie. Lo stesso sguardo sulla materia.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {availableCategories.map((category, i) => (
            <Reveal key={category.id} delay={0.04 * i}>
              <Link
                href="/collezione"
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
                  {category.status === "available" ? "Scopri la collezione" : "Raccontaci cosa hai in mente"} →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------- CONFIGURATORE ---------------- */}
      <Section surface="dark" className="border-t border-line-dark">
        <div className="grid gap-9 lg:grid-cols-2 lg:items-center">
          <div>
            <Reveal>
              <span className="eyebrow text-text-dark-muted">Progetta il tuo pezzo</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 max-w-[18ch]">Prova a immaginarlo. Noi lo rendiamo reale.</h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[48ch] text-lg text-text-dark-muted">
                Scegli una categoria — un tavolo, un complemento, un pezzo fuori
                catalogo — e guarda il tuo progetto prendere forma prima ancora di
                richiederlo. Due minuti per iniziare qualcosa di vero.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-8">
                <Button href="/progetta">Progetta il tuo pezzo</Button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="order-first lg:order-last">
            <div className="aspect-[4/3] border border-line-dark bg-ink-2 p-8 flex flex-col justify-between">
              <span className="eyebrow text-text-dark-muted">Anteprima — categoria Tavoli</span>
              <div className="grid grid-cols-4 gap-3">
                {essences.map((essence) => (
                  <div key={essence.id} className="aspect-square overflow-hidden border border-line-dark">
                    <WoodSwatch baseColor={essence.material.baseColor} seed={essence.material.grainSeed ?? 1} />
                  </div>
                ))}
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-dark-muted">
                Essenza · Forma · Dimensioni · Bordo · Resina · Finitura · Base
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------------- MATERIA ---------------- */}
      <Section surface="light">
        <Reveal>
          <span className="eyebrow text-text-light-muted">Materia prima</span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-5 max-w-[20ch]">Il legno decide, la resina asseconda.</h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-[58ch] text-lg text-text-light-muted">
            Noce, rovere, olmo, ulivo: ogni essenza ha una venatura, una durezza,
            un carattere diverso. La resina epossidica non copre il legno — ne segue
            le crepe, i nodi, i vuoti, e li rende parte del disegno.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {essences.map((essence, i) => (
            <Reveal key={essence.id} delay={0.05 * i}>
              <div>
                <div className="aspect-square overflow-hidden border border-line-light">
                  <WoodSwatch baseColor={essence.material.baseColor} seed={essence.material.grainSeed ?? 1} />
                </div>
                <p className="mt-3 font-sans font-semibold text-sm">{essence.label}</p>
                <p className="text-xs text-text-light-muted">{essence.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-8 max-w-[50ch] text-sm text-text-light-muted">
            Venature generate come riferimento visivo, in attesa della fotografia
            reale di ogni essenza — l&rsquo;architettura è pronta a sostituirle 1:1.
          </p>
        </Reveal>
      </Section>

      {/* ---------------- PROCESSO ---------------- */}
      <Section surface="dark" className="border-t border-line-dark">
        <div className="grid gap-9 lg:grid-cols-[1fr,1.2fr] lg:items-start">
          <div>
            <Reveal>
              <span className="eyebrow text-text-dark-muted">Dal materiale al pezzo finito</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 max-w-[16ch]">Settimane di lavoro, non ore di produzione.</h2>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-8">
                <Button href="/studio" variant="secondary">Scopri il processo</Button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ol className="space-y-0 divide-surface divide-y border-t border-line-dark">
              {[
                ["01", "Selezione del materiale", "Scegliamo legno ed essenza guardando venatura e destinazione del pezzo."],
                ["02", "Taglio e stagionatura", "Il tempo che non si comprime: mesi, non giorni."],
                ["03", "Progettazione", "Forma, dimensioni e dettagli definiti insieme a te."],
                ["04", "Colata della resina", "Segue le crepe del legno invece di nasconderle."],
                ["05", "Levigatura e finitura", "A mano, passaggio dopo passaggio."],
                ["06", "Consegna e installazione", "Il pezzo arriva pronto per il suo spazio."],
              ].map(([n, title, body]) => (
                <li key={n} className="flex gap-6 py-5">
                  <span className="font-mono text-sm text-text-dark-muted">{n}</span>
                  <div>
                    <p className="font-sans font-semibold">{title}</p>
                    <p className="mt-1 text-sm text-text-dark-muted">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      {/* ---------------- PROGETTI ---------------- */}
      <Section surface="light">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <span className="eyebrow text-text-light-muted">Progetti realizzati</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 max-w-[18ch]">Ogni progetto è una storia diversa.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Button href="/collezione" variant="link">Vedi tutta la collezione →</Button>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Tavolo ovale in noce", place: "Villa privata — Affi (VR)", tags: ["Noce", "Resina nera"], gradientFrom: "from-wood-noce" },
            { title: "Tavolo rettangolare in rovere", place: "Residenza privata — Verona", tags: ["Rovere", "Bordo vivo"], gradientFrom: "from-wood-rovere" },
            { title: "Tavolo sagomato in ulivo", place: "Progetto Lago di Garda", tags: ["Ulivo", "Resina trasparente"], gradientFrom: "from-wood-ulivo" },
          ].map((project, i) => (
            <Reveal key={project.title} delay={0.05 * i}>
              <ProjectCard {...project} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------- CTA FINALE ---------------- */}
      <Section surface="dark" className="border-t border-line-dark">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <h2 className="max-w-[16ch]">Il tuo pezzo comincia da una conversazione.</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 max-w-[46ch] text-lg text-text-dark-muted">
                Raccontaci il tuo spazio: rispondiamo entro 48 ore.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.14}>
            <div className="flex flex-wrap gap-4">
              <Button href="/progetta">Progetta il tuo pezzo</Button>
              <Button href="/richiedi-un-progetto" variant="secondary">Parliamo del tuo spazio</Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
