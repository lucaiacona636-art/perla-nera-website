// Dati reali dello studio — UNICA fonte per contatti, dati legali e
// structured data (footer, Contatti, Privacy, Cookie, JSON-LD). Regola
// ferrea: ogni campo qui è `null` finché non è un dato reale confermato.
// Nessun componente deve mai mostrare un numero/indirizzo/social plausibile
// ma inventato — un placeholder "che sembra vero" è peggio di uno assente,
// perché può essere scambiato per reale da un cliente o indicizzato da
// Google. Quando un dato arriva, va compilato SOLO qui: tutto il sito lo
// eredita automaticamente.

export interface BusinessInfo {
  legalName: string | null;
  vatNumber: string | null;
  address: { street: string | null; postalCode: string | null; city: string; region: string; country: string };
  email: string;
  phone: string | null;
  whatsapp: string | null;
  social: {
    instagram: string | null;
    pinterest: string | null;
    linkedin: string | null;
  };
}

export const business: BusinessInfo = {
  legalName: null,
  vatNumber: null,
  address: {
    street: null,
    postalCode: null,
    // Città/regione/paese confermati dal brief del cliente (Documento 0) —
    // unico gruppo di campi già reale in questo oggetto.
    city: "Verona",
    region: "Veneto",
    country: "IT",
  },
  email: "info@perlanera.it",
  phone: null,
  whatsapp: null,
  social: {
    instagram: null,
    pinterest: null,
    linkedin: null,
  },
};

export const NOT_CONFIGURED_LABEL = "Da confermare";
