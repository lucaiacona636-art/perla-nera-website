import type { ResinOption } from "@/lib/types";

// Sistema pensato per essere esteso con nuove colorazioni senza toccare codice
// (Documento 6 §2) — aggiungere una resina è aggiungere un record qui.
export const resins: ResinOption[] = [
  {
    id: "nessuna",
    label: "Nessuna",
    active: true,
    order: 1,
    description: "Solo legno massello, senza inserti di resina.",
    material: { type: "flat-color", baseColor: "transparent" },
  },
  {
    id: "trasparente",
    label: "Trasparente",
    active: true,
    order: 2,
    description: "Lascia leggere ogni crepa e vuoto del legno, come una lente.",
    material: { type: "transparent", baseColor: "#EDEAE2", roughness: 0.05 },
  },
  {
    id: "nera",
    label: "Nera",
    active: true,
    order: 3,
    description: "Contrasto netto con l'essenza, la firma visiva più riconoscibile di Perla Nera.",
    material: { type: "pbr", baseColor: "#141414", roughness: 0.15 },
  },
  {
    id: "blu",
    label: "Blu",
    active: true,
    order: 4,
    description: "Profondità simile all'acqua, richiama il Lago di Garda.",
    material: { type: "pbr", baseColor: "#1B3A6B", roughness: 0.12 },
  },
  {
    id: "verde",
    label: "Verde",
    active: true,
    order: 5,
    description: "Toni naturali, vicini al muschio e alla foresta.",
    material: { type: "pbr", baseColor: "#1F4D3A", roughness: 0.12 },
  },
  {
    id: "turchese",
    label: "Turchese",
    active: true,
    order: 6,
    description: "Il colore più luminoso della gamma, per un contrasto vivo con il legno.",
    material: { type: "pbr", baseColor: "#1E7A8C", roughness: 0.1 },
  },
  {
    id: "personalizzata",
    label: "Personalizzata",
    active: true,
    order: 7,
    description: "Un colore su misura, definito insieme a te durante il progetto.",
    material: { type: "pbr", baseColor: "#8A7A6B", roughness: 0.15 },
  },
];
