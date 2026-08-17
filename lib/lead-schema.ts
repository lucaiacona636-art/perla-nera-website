import { z } from "zod";

// Schema condiviso client/server — Documento 10 §2. Stesso schema per la
// validazione nel form (React Hook Form) e nel Route Handler (/api/lead).
export const leadContactSchema = z.object({
  name: z.string().min(2, "Inserisci il tuo nome"),
  email: z.string().email("Inserisci un'email valida"),
  phone: z.string().min(6, "Inserisci un numero di telefono"),
  city: z.string().optional(),
  notes: z.string().optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Devi accettare l'informativa privacy" }) }),
  honeypot: z.string().max(0).optional(),
});

export const leadPayloadSchema = leadContactSchema.extend({
  source: z.enum(["configurator", "richiesta-progetto"]),
  category: z.string().nullable().optional(),
  configuration: z.record(z.string(), z.unknown()).nullable().optional(),
  configurationSummaryText: z.string().optional(),
  freeBrief: z.string().optional(),
  attachmentNames: z.array(z.string()).optional(),
});

export type LeadContactInput = z.infer<typeof leadContactSchema>;
export type LeadPayload = z.infer<typeof leadPayloadSchema>;
