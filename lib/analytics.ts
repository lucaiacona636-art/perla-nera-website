// Helper unico verso il dataLayer — Documento 9 §3: mai chiamate dirette
// sparse nel codice ai SDK dei singoli tool (GA4/Meta), sempre attraverso
// GTM. Nessun dato personale nei parametri (Documento 9 §5).

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
}
