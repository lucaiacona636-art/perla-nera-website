import type { ShapeOption } from "@/lib/types";

export const shapes: ShapeOption[] = [
  {
    id: "rettangolare",
    label: "Rettangolare",
    active: true,
    order: 1,
    description: "La forma più versatile, per ogni ambiente e numero di posti.",
    geometryId: "rectangular",
    material: { type: "flat-color", baseColor: "#0000" },
    dimensionRules: {
      length: { min: 120, max: 320, default: 220, step: 5 },
      width: { min: 70, max: 130, default: 100, step: 5 },
      height: { min: 70, max: 78, default: 75, step: 1 },
    },
  },
  {
    id: "ovale",
    label: "Ovale",
    active: true,
    order: 2,
    description: "Linee morbide, conviviale, adatta a stanze di passaggio.",
    geometryId: "oval",
    material: { type: "flat-color", baseColor: "#0000" },
    dimensionRules: {
      length: { min: 160, max: 320, default: 220, step: 5 },
      width: { min: 90, max: 130, default: 110, step: 5 },
      height: { min: 70, max: 78, default: 75, step: 1 },
    },
  },
  {
    id: "sagomata",
    label: "Sagomata",
    active: true,
    order: 3,
    description: "Il profilo segue il tronco: nessuna tavola sagomata è uguale a un'altra.",
    geometryId: "shaped",
    material: { type: "flat-color", baseColor: "#0000" },
    dimensionRules: {
      length: { min: 140, max: 300, default: 210, step: 5 },
      width: { min: 70, max: 140, default: 95, step: 5 },
      height: { min: 70, max: 78, default: 75, step: 1 },
    },
  },
];
