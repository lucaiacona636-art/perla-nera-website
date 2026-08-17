"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useConfiguratorStore } from "@/lib/store/configurator-store";
import { getCategory } from "@/content/categories";
import { essences } from "@/content/configurator/essences";
import { shapes } from "@/content/configurator/shapes";
import { edges } from "@/content/configurator/edges";
import { resins } from "@/content/configurator/resins";
import { finishes } from "@/content/configurator/finishes";
import { bases } from "@/content/configurator/bases";
import { leadContactSchema, type LeadContactInput } from "@/lib/lead-schema";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { business } from "@/content/business";

function buildTavoliSummary(store: ReturnType<typeof useConfiguratorStore.getState>) {
  const essence = essences.find((e) => e.id === store.essenceId);
  const shape = shapes.find((s) => s.id === store.shapeId);
  const edge = edges.find((e) => e.id === store.edgeId);
  const resin = resins.find((r) => r.id === store.resinId);
  const finish = finishes.find((f) => f.id === store.finishId);
  const base = bases.find((b) => b.id === store.baseId);

  const rows = [
    { label: "Essenza", value: essence?.label },
    { label: "Forma", value: shape?.label },
    { label: "Dimensioni", value: store.dimensions ? `${store.dimensions.length} × ${store.dimensions.width} cm` : undefined },
    { label: "Bordo", value: edge?.label ?? "Da definire insieme" },
    { label: "Resina", value: resin?.label ?? "Da definire insieme" },
    { label: "Finitura", value: finish?.label ?? "Da definire insieme" },
    { label: "Base", value: base?.label ?? "Da definire insieme" },
  ];

  const edgeLabel = edge ? (edge.label.toLowerCase().startsWith("bordo") ? edge.label.toLowerCase() : `bordo ${edge.label.toLowerCase()}`) : "bordo da definire";

  const text = `Tavolo ${shape?.label?.toLowerCase() ?? ""} in ${essence?.label?.toLowerCase() ?? "essenza da definire"}, ${
    store.dimensions ? `${store.dimensions.length}×${store.dimensions.width}cm` : "dimensioni da definire"
  }, ${edgeLabel}, resina ${resin?.label?.toLowerCase() ?? "da definire"}, finitura ${
    finish?.label?.toLowerCase() ?? "da definire"
  }, base ${base?.label?.toLowerCase() ?? "da definire"}.`;

  return { rows, text };
}

export function SummaryForm() {
  const store = useConfiguratorStore();
  const category = getCategory(store.categoryId!);
  const isTavoli = store.categoryId === "tavoli";
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadContactInput>({
    resolver: zodResolver(leadContactSchema),
    defaultValues: { name: "", email: "", phone: "", city: "", notes: "" },
  });

  const summary = isTavoli ? buildTavoliSummary(store) : null;

  async function onSubmit(data: LeadContactInput) {
    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source: "configurator",
          category: store.categoryId,
          configuration: isTavoli
            ? {
                essence: store.essenceId,
                shape: store.shapeId,
                dimensions: store.dimensions,
                edge: store.edgeId,
                resin: store.resinId,
                finish: store.finishId,
                base: store.baseId,
              }
            : null,
          configurationSummaryText: summary?.text,
          freeBrief: isTavoli ? undefined : store.freeBrief,
        }),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
      trackEvent("submit_lead", { form_type: "configurator", category_id: store.categoryId ?? undefined });
      // Il reset avviene quando l'utente lascia la schermata di conferma
      // (v. sotto), non subito: resettare qui farebbe tornare il componente
      // padre allo step 0 prima che "Richiesta ricevuta" sia mai visibile.
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section className="surface-light flex min-h-[calc(100vh-80px)] items-center pt-20">
        <div className="container-page max-w-[560px] py-16">
          <span className="eyebrow text-text-light-muted">Richiesta ricevuta</span>
          <h1 className="mt-5 text-3xl sm:text-4xl">Ti rispondiamo entro 48 ore.</h1>
          <p className="mt-5 text-lg text-text-light-muted">
            Abbiamo ricevuto il tuo progetto con tutti i dettagli. Nel
            frattempo puoi continuare a esplorare la collezione.
          </p>
          <div className="mt-8">
            <Button href="/collezione" variant="secondary" onClick={() => store.reset()}>
              Torna alla collezione
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="surface-light min-h-[calc(100vh-80px)] pt-20 pb-16">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="eyebrow text-text-light-muted">Il tuo progetto</span>
          <h1 className="mt-5 text-3xl sm:text-4xl">Riepilogo</h1>

          {isTavoli && summary ? (
            <dl className="mt-8 divide-y divide-line-light border-y border-line-light">
              {summary.rows.map((row) => (
                <div key={row.label} className="flex justify-between gap-4 py-3.5">
                  <dt className="text-sm text-text-light-muted">{row.label}</dt>
                  <dd className="text-sm font-semibold">{row.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <div className="mt-8 border-y border-line-light py-5">
              <p className="text-sm text-text-light-muted">{category?.label}</p>
              <p className="mt-3 whitespace-pre-wrap text-sm">
                {store.freeBrief || "Nessuna descrizione inserita."}
              </p>
            </div>
          )}

          <p className="mt-6 max-w-[46ch] text-sm text-text-light-muted">
            Ogni progetto è unico: prepariamo un preventivo su misura dopo
            averne parlato insieme — qui sotto ci servono solo i tuoi
            contatti.
          </p>

          <button
            type="button"
            onClick={store.back}
            className="mt-6 font-sans text-sm font-semibold text-text-light-muted hover:text-text-light transition-colors"
          >
            ← Modifica la configurazione
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          {/* Honeypot — invisibile a utenti reali, riempito solo dai bot */}
          <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("honeypot" as never)} />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Nome*" error={errors.name?.message}>
              <input type="text" className={inputClass} {...register("name")} />
            </Field>
            <Field label="Email*" error={errors.email?.message}>
              <input type="email" className={inputClass} {...register("email")} />
            </Field>
            <Field label="Telefono*" error={errors.phone?.message}>
              <input type="tel" className={inputClass} {...register("phone")} />
            </Field>
            <Field label="Città">
              <input type="text" className={inputClass} {...register("city")} />
            </Field>
          </div>

          <Field label="Note">
            <textarea rows={4} className={inputClass} {...register("notes")} placeholder="Eventuali dettagli aggiuntivi sul tuo progetto o sul tuo spazio." />
          </Field>

          <label className="flex items-start gap-3 text-sm text-text-light-muted">
            <input type="checkbox" className="mt-1 accent-bronze" {...register("consent")} />
            <span>
              Accetto l&rsquo;<Link href="/privacy" className="underline hover:text-text-light">informativa privacy</Link> e
              acconsento al trattamento dei dati per essere ricontattato.
            </span>
          </label>
          {errors.consent && <p className="text-sm text-error">{errors.consent.message}</p>}

          {status === "error" && (
            <p className="text-sm text-error">
              Non siamo riusciti a inviare la richiesta. Riprova o scrivici a {business.email}.
            </p>
          )}

          <Button type="submit" className={cn(status === "submitting" && "pointer-events-none opacity-60")}>
            {status === "submitting" ? "Invio in corso…" : "Richiedi il tuo progetto"}
          </Button>
        </form>
      </div>
    </section>
  );
}

const inputClass =
  "w-full border border-line-light bg-ivory-2 px-3.5 py-2.5 text-sm text-text-light placeholder:text-text-light-muted focus-visible:border-bronze";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
}
