import type { EdgeOption } from "@/lib/types";

export const edges: EdgeOption[] = [
  {
    id: "regolare",
    label: "Regolare",
    active: true,
    order: 1,
    description: "Bordo squadrato e pulito, linea contemporanea.",
    material: { type: "flat-color", baseColor: "#0000" },
  },
  {
    id: "naturale",
    label: "Naturale",
    active: true,
    order: 2,
    description: "Segue leggermente il profilo del tronco, ammorbidito.",
    material: { type: "flat-color", baseColor: "#0000" },
  },
  {
    id: "vivo",
    label: "Bordo vivo",
    active: true,
    order: 3,
    description: "Il profilo naturale della corteccia, non tagliato: la firma più riconoscibile del legno massello.",
    material: { type: "flat-color", baseColor: "#0000" },
  },
  {
    id: "mosso",
    label: "Bordo mosso",
    active: true,
    order: 4,
    description: "Ondulazioni pronunciate, scolpite a mano.",
    material: { type: "flat-color", baseColor: "#0000" },
  },
  {
    id: "lavorato",
    label: "Bordo lavorato",
    active: true,
    order: 5,
    description: "Profilo con lavorazione decorativa su disegno.",
    material: { type: "flat-color", baseColor: "#0000" },
  },
];
