import type { FinishOption } from "@/lib/types";

export const finishes: FinishOption[] = [
  {
    id: "naturale",
    label: "Naturale",
    active: true,
    order: 1,
    description: "Oliata, valorizza il tatto e il colore originale del legno.",
    material: { type: "pbr", baseColor: "#00000000", roughness: 0.6 },
  },
  {
    id: "opaca",
    label: "Opaca",
    active: true,
    order: 2,
    description: "Protezione uniforme, nessun riflesso: la materia resta protagonista.",
    material: { type: "pbr", baseColor: "#00000000", roughness: 0.75 },
  },
  {
    id: "satinata",
    label: "Satinata",
    active: true,
    order: 3,
    description: "Leggera luminosità, via di mezzo tra opaca e lucida.",
    material: { type: "pbr", baseColor: "#00000000", roughness: 0.35 },
  },
];
