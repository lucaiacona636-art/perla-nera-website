"use client";

import { trackEvent } from "@/lib/analytics";

interface TrackedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  event: string;
  eventParams?: Record<string, string | number | boolean | undefined>;
}

// Wrapper minimo per link di contatto (mailto/tel/wa.me) che devono anche
// spingere un evento nel dataLayer — Documento 9 §4 (contact_click,
// phone_click, whatsapp_click). Usato dove la pagina che lo contiene è un
// server component (export const metadata) e non può diventare client.
export function TrackedLink({ event, eventParams, onClick, ...rest }: TrackedLinkProps) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        trackEvent(event, eventParams);
        onClick?.(e);
      }}
    />
  );
}
