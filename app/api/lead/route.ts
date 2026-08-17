import { NextResponse } from "next/server";
import { leadPayloadSchema } from "@/lib/lead-schema";

// MVP: valida e logga. Documento 10 §3 — in Fase 1 completa qui si aggancia
// la scrittura su Postgres (Supabase/Neon) e l'email transazionale
// (Resend); l'endpoint esiste già con lo shape di payload definitivo così
// il frontend non cambia quando l'infrastruttura viene collegata.
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

  console.log("[lead]", JSON.stringify({ ...parsed.data, submittedAt: new Date().toISOString() }));

  return NextResponse.json({ ok: true });
}
