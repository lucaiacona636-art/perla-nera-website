// Registro dei media "reali" del sito — Documento 1 §3 / richiesta esplicita
// del cliente: ogni punto del sito che oggi mostra un placeholder deve poter
// diventare fotografia o video reale cambiando SOLO questo file, senza
// toccare la logica dei componenti che li consumano (animazioni, scroll,
// layout restano invariati).
//
// Finché una voce resta `{ kind: "placeholder" }`, il componente che la usa
// mostra un placeholder dichiarato (mai una foto stock finta). Per sostituirla:
// cambiare la voce in `{ kind: "image", src, alt }` o `{ kind: "video", src,
// poster, alt }` — il componente si adatta da solo.

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

interface HomeMedia {
  /** Media del Cinematic Hero — il primo elemento visivo della Home. */
  cinematicHero: SiteMedia;
}

export const media: { home: HomeMedia } = {
  home: {
    cinematicHero: {
      kind: "placeholder",
      label: "Fotografia in preparazione",
      essenceId: "noce",
    },
  },
};
