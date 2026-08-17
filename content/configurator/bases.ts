import type { BaseOption } from "@/lib/types";

export const bases: BaseOption[] = [
  {
    id: "acciaio-nero",
    label: "Acciaio nero",
    active: true,
    order: 1,
    category: "acciaio",
    description: "Struttura a slitta o a croce, verniciata opaca. Il contrasto più netto con il legno.",
    material: { type: "pbr", baseColor: "#1B1B1B", roughness: 0.4 },
  },
  {
    id: "acciaio-naturale",
    label: "Acciaio naturale",
    active: true,
    order: 2,
    category: "acciaio",
    description: "Finitura grezza spazzolata, industriale ma calda.",
    material: { type: "pbr", baseColor: "#8A8782", roughness: 0.3 },
  },
  {
    id: "legno-cavalletto",
    label: "Legno a cavalletto",
    active: true,
    order: 3,
    category: "legno",
    description: "Stessa essenza del piano o abbinamento a contrasto, su richiesta.",
    material: { type: "pbr", baseColor: "#4A3324", roughness: 0.6 },
  },
  {
    id: "custom",
    label: "Base custom",
    active: true,
    order: 4,
    category: "custom",
    description: "Disegnata insieme a te — descrivila nelle note del progetto.",
    material: { type: "flat-color", baseColor: "#00000000" },
  },
];
