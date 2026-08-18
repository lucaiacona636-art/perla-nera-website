// Registro dei media del sito — Documento 1 §3 / richiesta esplicita del
// cliente: ogni punto del sito che mostra una foto o un video deve poter
// diventare fotografia/video REALE cambiando SOLO questo file, senza
// toccare la logica dei componenti che li consumano (animazioni, scroll,
// layout restano invariati).
//
// Finché una voce resta `{ kind: "placeholder" }`, il componente che la usa
// mostra un placeholder dichiarato (texture procedurale) — mai una foto
// spacciata per un lavoro reale.
//
// Le voci `{ kind: "image"/"video", generated: true }` sono fotografie e
// video generati con Higgsfield: ASSET TEMPORANEI, coerenti con l'estetica
// del brand ma NON fotografie di lavori realmente realizzati da Perla Nera.
// Il flag `generated` non è mai mostrato nell'interfaccia pubblica — serve
// solo come marcatore interno per sapere quali voci vanno sostituite non
// appena arrivano le fotografie reali dello studio. Per sostituire: cambiare
// la voce in `{ kind: "image", src, alt }` con l'URL/percorso reale — il
// componente che la consuma non richiede alcuna modifica.

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
  /** Asset temporaneo generato (Higgsfield), non una fotografia reale — v. nota in testa al file. */
  generated?: boolean;
}

export interface VideoMedia {
  kind: "video";
  src: string;
  poster: string;
  alt: string;
  generated?: boolean;
}

export type SiteMedia = PlaceholderMedia | ImageMedia | VideoMedia;

function placeholder(label: string, essenceId: string): PlaceholderMedia {
  return { kind: "placeholder", label, essenceId };
}

function generatedImage(src: string, alt: string): ImageMedia {
  return { kind: "image", src, alt, generated: true };
}

function generatedVideo(src: string, poster: string, alt: string): VideoMedia {
  return { kind: "video", src, poster, alt, generated: true };
}

// CDN degli asset generati con Higgsfield in questa fase (Documento 1 §3b).
// URL temporanei del provider di generazione: non garantiti stabili a lungo
// termine, da sostituire con asset reali ospitati su public/ o un CDN dello
// studio appena disponibili.
const GEN = "https://d8j0ntlcm91z4.cloudfront.net/user_37HtEOP4SseIg94VKKFpyBQjzG1/";

export const tavoli: ImageMedia[] = [
  generatedImage(GEN + "hf_20260818_070304_8861fad9-9fe9-4eb6-97c8-1d5535dc552f.png", "Tavolo artigianale in noce massello con bordo vivo, direzione progettuale Perla Nera"),
  generatedImage(GEN + "hf_20260818_070304_d905cf24-02ec-4166-822a-7d32d844f05f.png", "Tavolo in rovere con inserto in resina epossidica blu, direzione progettuale Perla Nera"),
  generatedImage(GEN + "hf_20260818_070304_2b30e75a-c5cb-43df-a90c-344b987b3a0e.png", "Tavolo in ulivo dalla forma sagomata con resina turchese, direzione progettuale Perla Nera"),
  generatedImage(GEN + "hf_20260818_070304_312a0ecf-5ad2-4073-b91c-43071250915b.png", "Tavolo con bordo mosso e resina nera, direzione progettuale Perla Nera"),
  generatedImage(GEN + "hf_20260818_070304_868583ca-4467-4379-aa8c-7de8b25b268f.png", "Tavolo contemporaneo in legno massello senza resina, ambientazione residenziale"),
];

export const complementi: ImageMedia[] = [
  generatedImage(GEN + "hf_20260818_070304_e9993b6e-2310-4f1a-ba8a-eabfa9d07829.png", "Panca in legno massello con dettaglio in resina epossidica"),
  generatedImage(GEN + "hf_20260818_070304_ea9012d4-caaf-47f7-a212-fe381e10f1a3.png", "Consolle in legno con inserto in resina blu"),
  generatedImage(GEN + "hf_20260818_070304_6ab525e3-c6a6-4453-9711-2c08cbc25e26.png", "Mensola scultorea in legno massello"),
  generatedImage(GEN + "hf_20260818_070304_38dfd809-3816-4a56-9ccc-8a53005cf6dd.png", "Tavolino basso ricavato da una sezione di tronco con resina"),
];

export const sculture: ImageMedia[] = [
  generatedImage(GEN + "hf_20260818_070304_1ed39861-06b5-4b25-b65e-4b6f559ff6f8.png", "Scultura verticale contemporanea in legno massello"),
  generatedImage(GEN + "hf_20260818_070304_76583d74-240b-43fb-a6c8-884d10036bea.png", "Installazione scultorea a parete in legno"),
  generatedImage(GEN + "hf_20260818_070304_c46c47a2-53af-42ca-b1e6-9428095d80dc.png", "Scultura in legno e resina blu translucida"),
];

export const pezziUnici: ImageMedia[] = [
  generatedImage(GEN + "hf_20260818_070320_d5d99cf7-c42a-4ae0-8e63-0f67366ff69c.png", "Oggetto scultoreo in legno e resina, pezzo unico"),
  generatedImage(GEN + "hf_20260818_070320_74db2f4a-9e61-4555-bdda-c32c6dd6ee04.png", "Orologio artigianale ricavato da una sezione di legno con resina"),
];

export const media = {
  home: {
    /** Media del Cinematic Hero — il primo elemento visivo della Home. */
    cinematicHero: generatedVideo(
      GEN + "hf_20260818_070240_533eece2-5779-4ce6-8d0f-21a1c6709770.mp4",
      GEN + "hf_20260818_070320_db174ee3-d5fa-4ff1-b9e5-11cfe415427a.png",
      "Macro cinematica di legno massello e resina epossidica, Studio Perla Nera"
    ) as SiteMedia,
  },

  /** Foto rappresentative per categoria — usate da ProjectCard su Home/Collezione. */
  categorie: {
    tavoli: tavoli[0] as SiteMedia,
    complementi: complementi[0] as SiteMedia,
    sculture: sculture[0] as SiteMedia,
    oggetti: pezziUnici[0] as SiteMedia,
  },

  /** Il laboratorio e le fasi di lavorazione (pagina Studio, sezione Processo). */
  laboratorio: {
    ambiente: generatedImage(GEN + "hf_20260818_070320_882dae2b-d989-470c-8248-019bbca4f497.png", "Tavole di legno grezzo nel laboratorio Perla Nera") as SiteMedia,
  },
  processo: {
    selezione: generatedImage(GEN + "hf_20260818_070320_882dae2b-d989-470c-8248-019bbca4f497.png", "Selezione delle tavole di legno grezzo in laboratorio") as SiteMedia,
    lavorazione: generatedImage(GEN + "hf_20260818_070320_4e47a8e2-6d9d-4730-b37b-3e7bf6f6df9b.png", "Taglio e fresatura del legno massello") as SiteMedia,
    resina: generatedImage(GEN + "hf_20260818_070320_83c00bb5-526b-4ea6-9bce-a302cd2b0e53.png", "Colata di resina epossidica pigmentata in uno stampo di legno") as SiteMedia,
    finitura: generatedImage(GEN + "hf_20260818_070320_357e18ac-3ade-49af-8292-3a6fb57242c8.png", "Levigatura a mano della superficie in legno") as SiteMedia,
    video: generatedVideo(
      GEN + "hf_20260818_070248_8f6b1b81-2ddf-4ff7-885f-17384535e85f.mp4",
      GEN + "hf_20260818_070320_357e18ac-3ade-49af-8292-3a6fb57242c8.png",
      "Lavorazione a mano di una superficie in legno massello, laboratorio Perla Nera"
    ) as SiteMedia,
    materiaVideo: generatedVideo(
      GEN + "hf_20260818_070240_396d5951-a774-4bf6-acd5-e8e7b487e253.mp4",
      GEN + "hf_20260818_070320_dfa39815-b062-471e-a87f-f237c4721470.png",
      "Macro di venatura del legno e resina epossidica"
    ) as SiteMedia,
  },

  /** Riferimento visivo per essenza — sostituibile con scan/foto reale del legno (v. Documento 0). */
  materiali: {
    noce: generatedImage(GEN + "hf_20260818_070320_dfa39815-b062-471e-a87f-f237c4721470.png", "Macro della venatura del legno di noce massello") as SiteMedia,
    rovere: generatedImage(GEN + "hf_20260818_070320_b8e733b3-6787-4ab2-8659-4951b5548922.png", "Macro della venatura del legno di rovere massello") as SiteMedia,
    ulivo: generatedImage(GEN + "hf_20260818_070320_30a244ad-99c4-4d77-9c90-2f3d661f0fea.png", "Macro della venatura del legno di ulivo") as SiteMedia,
    // Nessun asset generato dedicato per l'olmo: resta un placeholder procedurale onesto finché non ne genero/riceviamo uno.
    olmo: placeholder("Olmo — venatura in preparazione", "olmo") as SiteMedia,
    resina: generatedImage(GEN + "hf_20260818_070320_db174ee3-d5fa-4ff1-b9e5-11cfe415427a.png", "Macro di resina epossidica trasparente e nera a confronto") as SiteMedia,
  },

  /** Ambientazioni (pezzo installato in uno spazio reale) — per case study, sezione Progetti, Collaborazioni. */
  ambientazioni: {
    generica: generatedImage(GEN + "hf_20260818_070320_637fb56e-269b-4fee-9fe1-2617595b33a4.png", "Interno contemporaneo di una villa italiana con arredo in legno massello") as SiteMedia,
    hospitality: generatedImage(GEN + "hf_20260818_070320_405c70f5-93d7-43aa-854b-3b34c22257f6.png", "Sala di un ristorante contemporaneo con arredo su misura in legno e resina") as SiteMedia,
  },
} as const;

/** Slot per singolo progetto/case study — v. content/case-studies.ts. */
export function caseStudyMediaSlot(slug: string): SiteMedia {
  return placeholder(`Progetto "${slug}" — fotografia in preparazione`, "noce");
}

/** true per un asset temporaneo generato (Higgsfield) — usato dai componenti per mostrare l'etichetta "Direzione progettuale" invece di trattarlo come un progetto realizzato. */
export function isGeneratedMedia(media: SiteMedia): boolean {
  return media.kind !== "placeholder" && media.generated === true;
}
