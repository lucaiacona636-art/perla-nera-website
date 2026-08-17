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
];
