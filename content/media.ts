// Registro dei media "reali" del sito — Documento 1 §3 / richiesta esplicita
// del cliente: ogni punto del sito che oggi mostra un placeholder deve poter
// diventare fotografia o video reale cambiando SOLO questo file, senza
// toccare la logica dei componenti che li consumano (animazioni, scroll,
// layout restano invariati).
//
// Finché una voce resta `{ kind: "placeholder" }`, il componente che la usa
// mostra un placeholder dichiarato (texture procedurale o gradiente
// materico) — mai una foto stock o generata da IA spacciata per un lavoro
// reale. Per sostituirla: cambiare la voce in `{ kind: "image", src, alt }`
// o `{ kind: "video", src, poster, alt }` — il componente si adatta da solo.

export interface PlaceholderMedia {
  kind: "placeholder";
  /** Etichetta breve mostrata in piccolo sul placeholder stesso, onesta sul suo stato. */
  label: string;
  /** Essenza usata per il colore/texture procedurale del placeholder (v. content/configurator/essences.ts). */
  essenceId: string;
}

export interface ImageMedia {
  kind: "image";
  src: string;
  alt: string;
}

export interface VideoMedia {
  kind: "video";
  src: string;
  poster: string;
  alt: string;
}

export type SiteMedia = PlaceholderMedia | ImageMedia | VideoMedia;

function placeholder(label: string, essenceId: string): PlaceholderMedia {
  return { kind: "placeholder", label, essenceId };
}

export const media = {
  home: {
    /** Media del Cinematic Hero — il primo elemento visivo della Home. */
    cinematicHero: placeholder("Fotografia in preparazione", "noce") as SiteMedia,
  },

  /** Foto rappresentative per categoria — usate da ProjectCard su Home/Collezione. */
  categorie: {
    tavoli: placeholder("Tavolo — foto in preparazione", "noce") as SiteMedia,
    complementi: placeholder("Complemento — foto in preparazione", "ulivo") as SiteMedia,
    sculture: placeholder("Scultura — foto in preparazione", "rovere") as SiteMedia,
    oggetti: placeholder("Oggetto — foto in preparazione", "olmo") as SiteMedia,
  },

  /** Il laboratorio e le fasi di lavorazione (pagina Studio, sezione Processo). */
  laboratorio: {
    ambiente: placeholder("Laboratorio — foto in preparazione", "rovere") as SiteMedia,
  },
  processo: {
    selezione: placeholder("Selezione del materiale — foto in preparazione", "noce") as SiteMedia,
    lavorazione: placeholder("Lavorazione — foto in preparazione", "olmo") as SiteMedia,
    resina: placeholder("Colata della resina — foto in preparazione", "ulivo") as SiteMedia,
    finitura: placeholder("Finitura — foto in preparazione", "rovere") as SiteMedia,
  },

  /** Riferimento visivo per essenza — sostituibile con scan/foto reale del legno (v. Documento 0). */
  materiali: {
    noce: placeholder("Noce — venatura reale in preparazione", "noce") as SiteMedia,
    rovere: placeholder("Rovere — venatura reale in preparazione", "rovere") as SiteMedia,
    olmo: placeholder("Olmo — venatura reale in preparazione", "olmo") as SiteMedia,
    ulivo: placeholder("Ulivo — venatura reale in preparazione", "ulivo") as SiteMedia,
  },

  /** Ambientazioni (pezzo installato in uno spazio reale) — per case study e sezione Progetti. */
  ambientazioni: {
    generica: placeholder("Ambientazione — foto in preparazione", "noce") as SiteMedia,
  },
} as const;

/** Slot per singolo progetto/case study — v. content/case-studies.ts. */
export function caseStudyMediaSlot(slug: string): SiteMedia {
  return placeholder(`Progetto "${slug}" — fotografia in preparazione`, "noce");
}
