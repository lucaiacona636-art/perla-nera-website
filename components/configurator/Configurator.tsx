"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useConfiguratorStore } from "@/lib/store/configurator-store";
import { categories, getCategory } from "@/content/categories";
import { essences } from "@/content/configurator/essences";
import { shapes } from "@/content/configurator/shapes";
import { edges } from "@/content/configurator/edges";
import { resins } from "@/content/configurator/resins";
import { finishes } from "@/content/configurator/finishes";
import { bases } from "@/content/configurator/bases";
import { OptionPicker } from "./OptionPicker";
import { DimensionSlider } from "./DimensionsControl";
import { ConfiguratorPreview } from "./ConfiguratorPreview";
import { SummaryForm } from "./SummaryForm";
import { WoodSwatch } from "@/components/ui/WoodSwatch";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

interface StepDef {
  id: string;
  title: string;
  subtitle?: string;
  required: boolean;
}

const tavoliSteps: StepDef[] = [
  { id: "essenza", title: "Scegli il legno", subtitle: "L'essenza determina venatura, durezza e carattere del pezzo.", required: true },
  { id: "forma", title: "Scegli la forma", required: true },
  { id: "dimensioni", title: "Definisci le misure", required: true },
  { id: "bordo", title: "Scegli il bordo", subtitle: "Il bordo definisce il carattere del tavolo.", required: false },
  { id: "resina", title: "Scegli la resina", subtitle: "Dalla trasparenza al contrasto deciso: la resina diventa parte della composizione.", required: false },
  { id: "finitura", title: "Scegli la finitura", subtitle: "La finitura decide come la luce incontra il legno.", required: false },
  { id: "base", title: "Scegli la base", subtitle: "La base completa la composizione, in equilibrio con il piano.", required: false },
];

const freeBriefSteps: StepDef[] = [
  { id: "brief", title: "Raccontaci il tuo progetto", subtitle: "Descrivi l'idea, anche se non è ancora definita.", required: true },
];

export function Configurator() {
  const store = useConfiguratorStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const isTavoli = store.categoryId === "tavoli";
  const steps = store.categoryId ? (isTavoli ? tavoliSteps : freeBriefSteps) : [];
  const summaryScreen = steps.length + 1;
  const currentStepDef = store.screen >= 1 && store.screen <= steps.length ? steps[store.screen - 1] : null;

  useEffect(() => {
    if (!hydrated) return;
    if (store.screen === 0) return;
    if (store.categoryId) {
      trackEvent("configurator_step", { category_id: store.categoryId, screen: store.screen });
    }
  }, [store.screen, store.categoryId, hydrated]);

  // Su mobile/tablet ogni step può richiedere scroll per essere letto per
  // intero: senza reset, avanzando allo step successivo la pagina resta
  // alla posizione di scroll precedente e il titolo/le prime opzioni del
  // nuovo step restano nascoste sotto l'header fisso — bug osservato a
  // 768px, dove il pulsante "Rettangolare" risultava parzialmente sotto
  // l'header subito dopo "Continua".
  useEffect(() => {
    if (!hydrated) return;
    window.scrollTo(0, 0);
  }, [store.screen, hydrated]);

  if (!hydrated) return <div className="min-h-[70vh] surface-light" />;

  const canContinue = (() => {
    if (!currentStepDef) return true;
    if (!currentStepDef.required) return true;
    switch (currentStepDef.id) {
      case "essenza":
        return !!store.essenceId;
      case "forma":
        return !!store.shapeId;
      case "dimensioni":
        return !!store.dimensions;
      case "brief":
        return store.freeBrief.trim().length > 0;
      default:
        return true;
    }
  })();

  function handleSelectCategory(id: string) {
    store.setCategory(id);
    trackEvent("start_configurator", { category_id: id, entry_point: "configurator" });
  }

  function handleContinue() {
    if (store.screen === summaryScreen) return;
    store.next();
    if (store.screen + 1 === summaryScreen) {
      trackEvent("complete_configurator", { category_id: store.categoryId ?? undefined });
    }
  }

  // ---------------- SCREEN 0 — CATEGORIA ----------------
  if (store.screen === 0) {
    return (
      <section className="surface-dark min-h-[calc(100vh-80px)] pt-32 pb-16 lg:pt-40">
        <div className="container-page">
          <span className="eyebrow text-text-dark-muted">Progetta il tuo pezzo</span>
          <h1 className="mt-5 max-w-[18ch] text-4xl sm:text-5xl">Che pezzo vuoi progettare?</h1>
          <p className="mt-5 max-w-[52ch] text-lg text-text-dark-muted">
            Scegli una categoria per iniziare. Se non la trovi, raccontacela lo stesso.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => handleSelectCategory(category.id)}
                className="group text-left border border-line-dark bg-ink-2 p-6 transition-colors hover:border-bronze-hi"
              >
                <p className="font-display text-xl">{category.label}</p>
                <p className="mt-3 text-sm text-text-dark-muted">{category.shortDescription}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-text-dark border-b border-bronze-hi pb-0.5 group-hover:gap-3 transition-all">
                  Inizia →
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ---------------- SCHERMATA RIEPILOGO ----------------
  if (store.screen === summaryScreen) {
    return <SummaryForm />;
  }

  // ---------------- STEP ----------------
  const category = getCategory(store.categoryId!);
  const progress = Math.round((store.screen / (summaryScreen)) * 100);

  return (
    <section className="surface-light min-h-[calc(100vh-80px)] pt-20">
      <div className="grid lg:grid-cols-2">
        <div className="order-2 flex flex-col px-5 py-10 sm:px-8 lg:order-1 lg:justify-center lg:px-16 lg:py-16">
          <div className="mx-auto w-full max-w-[480px]">
            <div className="h-px w-full bg-line-light">
              <div className="h-px bg-bronze transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-text-light-muted">
              {category?.label} · Passo {store.screen} di {steps.length}
            </p>

            <h2 className="mt-4 text-2xl sm:text-3xl">{currentStepDef?.title}</h2>
            {currentStepDef?.subtitle && (
              <p className="mt-2 text-sm text-text-light-muted">{currentStepDef.subtitle}</p>
            )}

            <div className="mt-8">
              {currentStepDef?.id === "essenza" && (
                <OptionPicker
                  options={essences}
                  selectedId={store.essenceId}
                  onSelect={store.setEssence}
                  renderSwatch={(o) => <WoodSwatch baseColor={o.material.baseColor} seed={o.material.grainSeed ?? 1} />}
                />
              )}

              {currentStepDef?.id === "forma" && (
                <OptionPicker options={shapes} selectedId={store.shapeId} onSelect={store.setShape} showSwatch={false} />
              )}

              {currentStepDef?.id === "dimensioni" && (
                (() => {
                  const shape = shapes.find((s) => s.id === store.shapeId) ?? shapes[0]!;
                  const heightRule = shape.dimensionRules.height ?? { min: 70, max: 78, default: 75, step: 1 };
                  const dims = store.dimensions ?? {
                    length: shape.dimensionRules.length.default,
                    width: shape.dimensionRules.width.default,
                    height: heightRule.default,
                  };
                  return (
                    <div className="space-y-8">
                      <DimensionSlider
                        label="Lunghezza"
                        rule={shape.dimensionRules.length}
                        value={dims.length}
                        onChange={(v) => store.setDimensions({ ...dims, length: v })}
                      />
                      <DimensionSlider
                        label="Larghezza"
                        rule={shape.dimensionRules.width}
                        value={dims.width}
                        onChange={(v) => store.setDimensions({ ...dims, width: v })}
                      />
                      <DimensionSlider
                        label="Altezza"
                        rule={heightRule}
                        value={dims.height}
                        onChange={(v) => store.setDimensions({ ...dims, height: v })}
                      />
                      <p className="text-xs text-text-light-muted">
                        Misure speciali? Puoi indicarle nelle note del riepilogo finale.
                      </p>
                    </div>
                  );
                })()
              )}

              {currentStepDef?.id === "bordo" && (
                <OptionPicker options={edges} selectedId={store.edgeId} onSelect={store.setEdge} showSwatch={false} />
              )}

              {currentStepDef?.id === "resina" && (
                <OptionPicker options={resins} selectedId={store.resinId} onSelect={store.setResin} />
              )}

              {currentStepDef?.id === "finitura" && (
                <OptionPicker options={finishes} selectedId={store.finishId} onSelect={store.setFinish} showSwatch={false} />
              )}

              {currentStepDef?.id === "base" && (
                <OptionPicker options={bases} selectedId={store.baseId} onSelect={store.setBase} />
              )}

              {currentStepDef?.id === "brief" && (
                <div>
                  <textarea
                    value={store.freeBrief}
                    onChange={(e) => store.setFreeBrief(e.target.value)}
                    rows={8}
                    placeholder="Racconta lo spazio, le dimensioni indicative, i materiali a cui pensi..."
                    className="w-full border border-line-light bg-ivory-2 p-4 text-sm text-text-light placeholder:text-text-light-muted focus-visible:border-bronze"
                  />
                </div>
              )}
            </div>

            <div className="mt-10 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={store.back}
                className="font-sans text-sm font-semibold text-text-light-muted hover:text-text-light transition-colors"
              >
                ← Indietro
              </button>
              <div className="flex items-center gap-4">
                {!currentStepDef?.required && (
                  <button
                    type="button"
                    onClick={handleContinue}
                    className="font-sans text-sm text-text-light-muted hover:text-text-light transition-colors"
                  >
                    Decido dopo
                  </button>
                )}
                <Button
                  onClick={handleContinue}
                  className={cn(!canContinue && "pointer-events-none opacity-40")}
                >
                  Continua
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 aspect-[4/3] lg:order-2 lg:aspect-auto lg:sticky lg:top-20 lg:self-start lg:h-[calc(100vh-80px)]">
          <ConfiguratorPreview />
        </div>
      </div>
    </section>
  );
}
