import { Resend } from "resend";
import type { LeadPayload } from "./lead-schema";

// Infrastruttura lead reale (Documento 10 §3, Fase 1): email transazionale
// via Resend + webhook opzionale verso strumenti esterni (Zapier, Make,
// Google Sheets, CRM...). Nessuna credenziale è inventata qui — tutto
// arriva da variabili d'ambiente che lo studio configura (v. .env.example).
// Se non configurate, l'endpoint continua a funzionare e a loggare la
// richiesta: nessun lead viene perso, solo non recapitato via email finché
// l'infrastruttura non è collegata.

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM = process.env.RESEND_FROM_EMAIL || "Perla Nera <onboarding@resend.dev>";
const NOTIFICATION_TO = process.env.LEAD_NOTIFICATION_EMAIL || "info@perlanera.it";
const WEBHOOK_URL = process.env.LEAD_WEBHOOK_URL;

const sourceLabels: Record<LeadPayload["source"], string> = {
  configurator: "Configuratore",
  "richiesta-progetto": "Richiedi un progetto",
  assistenza: "Assistenza",
  contatti: "Contatti",
};

type LeadRecord = LeadPayload & { submittedAt: string };

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderLeadEmailHtml(lead: LeadRecord): string {
  const rows: Array<[string, string]> = [
    ["Provenienza", sourceLabels[lead.source]],
    ["Nome", lead.name],
    ["Email", lead.email],
    ["Telefono", lead.phone],
    ["Città", lead.city || "—"],
    ["Categoria", lead.category || "—"],
  ];

  if (lead.configurationSummaryText) {
    rows.push(["Configurazione", lead.configurationSummaryText]);
  }
  if (lead.freeBrief) {
    rows.push(["Descrizione progetto", lead.freeBrief]);
  }
  if (lead.notes) {
    rows.push(["Note", lead.notes]);
  }
  rows.push(["Ricevuto il", new Date(lead.submittedAt).toLocaleString("it-IT", { dateStyle: "long", timeStyle: "short" })]);

  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 16px 8px 0;color:#6B6153;font-size:13px;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:8px 0;font-size:14px;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  return `<div style="font-family:sans-serif;max-width:560px;margin:0 auto">
    <h2 style="font-size:18px;margin:0 0 16px">Nuova richiesta da perlanera.it</h2>
    <table style="width:100%;border-collapse:collapse">${rowsHtml}</table>
  </div>`;
}

async function forwardToWebhook(lead: LeadRecord): Promise<void> {
  if (!WEBHOOK_URL) return;
  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
  } catch (err) {
    console.error("[lead] webhook forward failed", err instanceof Error ? err.message : err);
  }
}

export interface NotifyResult {
  emailDelivered: boolean;
  emailError?: string;
}

export async function notifyNewLead(lead: LeadRecord): Promise<NotifyResult> {
  // Best-effort: il webhook non deve mai bloccare o far fallire la risposta.
  void forwardToWebhook(lead);

  if (!resend) {
    return { emailDelivered: false, emailError: "RESEND_API_KEY non configurata" };
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: NOTIFICATION_TO,
      replyTo: lead.email,
      subject: `Nuova richiesta — ${sourceLabels[lead.source]} — ${lead.name}`,
      html: renderLeadEmailHtml(lead),
    });
    if (error) {
      return { emailDelivered: false, emailError: error.message };
    }
    return { emailDelivered: true };
  } catch (err) {
    return { emailDelivered: false, emailError: err instanceof Error ? err.message : "unknown_error" };
  }
}
