import { NextResponse } from "next/server";
import { leadPayloadSchema } from "@/lib/lead-schema";
import { notifyNewLead } from "@/lib/lead-notify";

// Documento 10 §3 — riceve tutte le richieste (Configuratore, Richiedi un
// progetto, Assistenza, Contatti) sotto un unico schema. Valida e logga
// sempre (nessun lead va perso anche se l'email non è configurata), poi
// prova a notificare lo studio via email/webhook — v. lib/lead-notify.ts
// e .env.example per la configurazione richiesta.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = leadPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  }

  // Honeypot: bot compilano anche i campi nascosti. Rispondiamo comunque 200
  // per non rivelare la logica anti-spam a chi sta testando il form.
  if (parsed.data.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const record = { ...parsed.data, submittedAt: new Date().toISOString() };

  // Il log resta la rete di sicurezza: la richiesta è comunque tracciata
  // nei log del server anche se la consegna email fallisce o non è ancora
  // configurata.
  console.log("[lead]", JSON.stringify(record));

  const result = await notifyNewLead(record);
  if (!result.emailDelivered) {
    console.warn("[lead] email non consegnata:", result.emailError);
  }

  return NextResponse.json({ ok: true, emailDelivered: result.emailDelivered });
}
