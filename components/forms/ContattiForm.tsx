"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { leadContactSchema } from "@/lib/lead-schema";
import { categories } from "@/content/categories";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { business } from "@/content/business";

const budgetRanges = [
  { value: "", label: "Preferisco dirlo a voce" },
  { value: "under-3k", label: "Fino a 3.000 €" },
  { value: "3k-8k", label: "3.000 – 8.000 €" },
  { value: "8k-15k", label: "8.000 – 15.000 €" },
  { value: "over-15k", label: "Oltre 15.000 €" },
];

const contactSchema = leadContactSchema.extend({
  projectType: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Scrivi qualche riga sulla tua richiesta"),
});

type ContactInput = z.infer<typeof contactSchema>;

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

export function ContattiForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", city: "", notes: "", projectType: "", budget: "", message: "" },
  });

  async function onSubmit(data: ContactInput) {
    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source: "contatti",
          category: data.projectType || null,
          freeBrief: `${data.message}${data.budget ? `\n\nBudget indicativo: ${budgetRanges.find((b) => b.value === data.budget)?.label}` : ""}`,
        }),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
      trackEvent("submit_lead", { form_type: "contatti", category_id: data.projectType || undefined });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-line-light bg-ivory-2 p-8">
        <span className="eyebrow text-text-light-muted">Messaggio ricevuto</span>
        <h3 className="mt-4 font-display text-2xl">Ti rispondiamo entro 48 ore.</h3>
        <p className="mt-3 text-text-light-muted">Grazie per averci scritto.</p>
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

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Tipologia di progetto">
          <select className={inputClass} {...register("projectType")}>
            <option value="">Non sono sicuro / altro</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Budget indicativo">
          <select className={inputClass} {...register("budget")}>
            {budgetRanges.map((b) => (
              <option key={b.value} value={b.value}>{b.label}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Messaggio*" error={errors.message?.message}>
        <textarea rows={5} className={inputClass} placeholder="Raccontaci la tua richiesta — un progetto, un'informazione, una collaborazione." {...register("message")} />
      </Field>

      <p className="text-xs text-text-light-muted">
        Hai immagini o ispirazioni da mostrarci? Scrivici direttamente a{" "}
        <a href={`mailto:${business.email}`} className="underline">{business.email}</a> allegandole alla mail.
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
          Non siamo riusciti a inviare il messaggio. Riprova o scrivici a {business.email}.
        </p>
      )}

      <Button type="submit" className={cn(status === "submitting" && "pointer-events-none opacity-60")}>
        {status === "submitting" ? "Invio in corso…" : "Invia messaggio"}
      </Button>
    </form>
  );
}
