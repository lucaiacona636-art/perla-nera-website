"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { leadContactSchema } from "@/lib/lead-schema";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

const assistanceSchema = leadContactSchema.extend({
  pieceDescription: z.string().min(5, "Descrivi brevemente il pezzo (es. tavolo in noce, acquistato circa...)"),
  issueDescription: z.string().min(10, "Descrivi il problema o la richiesta"),
});

type AssistanceInput = z.infer<typeof assistanceSchema>;

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

export function AssistenzaForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AssistanceInput>({
    resolver: zodResolver(assistanceSchema),
    defaultValues: { name: "", email: "", phone: "", city: "", notes: "", pieceDescription: "", issueDescription: "" },
  });

  async function onSubmit(data: AssistanceInput) {
    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source: "assistenza",
          freeBrief: `Pezzo: ${data.pieceDescription}\n\nRichiesta: ${data.issueDescription}`,
        }),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
      trackEvent("submit_lead", { form_type: "assistenza" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-line-light bg-ivory-2 p-8">
        <span className="eyebrow text-text-light-muted">Richiesta ricevuta</span>
        <h3 className="mt-4 font-display text-2xl">Ti rispondiamo entro 48 ore.</h3>
        <p className="mt-3 text-text-light-muted">
          Abbiamo ricevuto la tua richiesta di assistenza. Valutiamo il caso
          e ti proponiamo i prossimi passi.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
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

      <Field label="Di che pezzo si tratta?*" error={errors.pieceDescription?.message}>
        <input type="text" className={inputClass} placeholder="Es. tavolo in noce e resina nera, consegnato circa 2 anni fa" {...register("pieceDescription")} />
      </Field>

      <Field label="Descrivi la richiesta*" error={errors.issueDescription?.message}>
        <textarea rows={5} className={inputClass} placeholder="Manutenzione, un danno, una domanda sulla cura del pezzo — raccontaci il contesto." {...register("issueDescription")} />
      </Field>

      <p className="text-xs text-text-light-muted">
        Hai foto del pezzo o del problema da mostrarci? Scrivici direttamente a{" "}
        <a href="mailto:info@perlanera.it" className="underline">info@perlanera.it</a> allegandole alla mail — ci aiutano a valutare la richiesta più velocemente.
      </p>

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
          Non siamo riusciti a inviare la richiesta. Riprova o scrivici a info@perlanera.it.
        </p>
      )}

      <Button type="submit" className={cn(status === "submitting" && "pointer-events-none opacity-60")}>
        {status === "submitting" ? "Invio in corso…" : "Richiedi assistenza"}
      </Button>
    </form>
  );
}
