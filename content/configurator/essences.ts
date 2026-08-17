import type { Essence } from "@/lib/types";

// Colori/seed allineati alla palette "wood" del design system (Documento 3 §1.2).
// grainSeed alimenta il generatore di texture procedurale (lib/wood-texture.ts) —
// sostituibile 1:1 con una foto/scan reale (albedoMapUrl) senza cambiare lo schema.
export const essences: Essence[] = [
  {
    id: "noce",
    label: "Noce",
    active: true,
    order: 1,
    description: "Venatura scura e decisa, tono caldo bruno. L'essenza più richiesta per i pezzi importanti.",
    material: { type: "pbr", baseColor: "#6B4B34", grainSeed: 11, roughness: 0.55 },
  },
  {
    id: "rovere",
    label: "Rovere",
    active: true,
    order: 2,
    description: "Venatura ampia e regolare, tono chiaro dorato. Robusto, luminoso negli ambienti chiari.",
    material: { type: "pbr", baseColor: "#B08D5B", grainSeed: 23, roughness: 0.6 },
  },
  {
    id: "olmo",
    label: "Olmo",
    active: true,
    order: 3,
    description: "Venatura mossa e imprevedibile, tono grigio-bruno. Carattere rustico e contemporaneo insieme.",
    material: { type: "pbr", baseColor: "#8C7355", grainSeed: 37, roughness: 0.58 },
  },
  {
    id: "ulivo",
    label: "Ulivo",
    active: true,
    order: 4,
    description: "Venatura fitta e nodosa, tono chiaro con striature scure. Ogni tavola è irripetibile.",
    material: { type: "pbr", baseColor: "#A99461", grainSeed: 47, roughness: 0.5 },
  },
];
