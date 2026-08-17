"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { leadContactSchema } from "@/lib/lead-schema";
import { categories } from "@/content/categories";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

const requestSchema = leadContactSchema.extend({
  category: z.string().optional(),
  description: z.string().min(10, "Raccontaci qualcosa in più sul tuo progetto"),
  desiredDimensions: z.string().optional(),
});

type RequestInput = z.infer<typeof requestSchema>;

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

export function RichiediProgettoForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestInput>({
    resolver: zodResolver(requestSchema),
    defaultValues: { name: "", email: "", phone: "", city: "", notes: "", category: "", description: "", desiredDimensions: "" },
  });

  async function onSubmit(data: RequestInput) {
    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source: "richiesta-progetto",
          category: data.category || null,
          freeBrief: `${data.description}${data.desiredDimensions ? `\n\nDimensioni desiderate: ${data.desiredDimensions}` : ""}`,
        }),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
      trackEvent("submit_lead", { form_type: "richiesta-progetto", category_id: data.category || undefined });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section className="surface-light flex min-h-[80vh] items-center pt-20">
        <div className="container-page max-w-[560px] py-16">
          <span className="eyebrow text-text-light-muted">Richiesta ricevuta</span>
          <h1 className="mt-5 text-3xl sm:text-4xl">Ti rispondiamo entro 48 ore.</h1>
          <p className="mt-5 text-lg text-text-light-muted">
            Abbiamo ricevuto la tua richiesta. Nel frattempo puoi continuare
            a esplorare la collezione o provare il configuratore.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/collezione" variant="secondary">Torna alla collezione</Button>
            <Button href="/progetta">Progetta il tuo pezzo</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="surface-dark pt-40 pb-9 lg:pt-48 lg:pb-12">
        <div className="container-page">
          <Reveal>
            <span className="eyebrow text-text-dark-muted">Richiedi un progetto</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 max-w-[18ch] text-4xl sm:text-5xl lg:text-6xl">Raccontaci cosa hai in mente.</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-[56ch] text-lg text-text-dark-muted sm:text-xl">
              Che tu abbia già le idee chiare o solo un&rsquo;intuizione, è il
              modo più diretto per iniziare — utile soprattutto se il tuo
              progetto non rientra ancora in una categoria configurabile.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="surface-light py-24 lg:py-48">
        <div className="container-page max-w-[720px]">
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

            <Field label="Categoria">
              <select className={inputClass} {...register("category")}>
                <option value="">Non sono sicuro / altro</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </Field>

            <Field label="Dimensioni desiderate">
              <input type="text" className={inputClass} placeholder="Es. circa 220 × 100 cm, oppure 'da valutare insieme'" {...register("desiredDimensions")} />
            </Field>

            <Field label="Raccontaci il progetto*" error={errors.description?.message}>
              <textarea
                rows={6}
                className={inputClass}
                placeholder="Lo spazio in cui vivrà il pezzo, lo stile a cui pensi, eventuali riferimenti."
                {...register("description")}
              />
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
                Non siamo riusciti a inviare la richiesta. Riprova o scrivici a info@perlanera.it.
              </p>
            )}

            <Button type="submit" className={cn(status === "submitting" && "pointer-events-none opacity-60")}>
              {status === "submitting" ? "Invio in corso…" : "Invia richiesta"}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
