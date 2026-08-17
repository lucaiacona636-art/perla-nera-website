// Modello dati del configuratore — Documento 6 (strategy) §1-2.
// Ogni opzione è un record di catalogo, mai un valore hardcoded in un componente.

export type CategoryStatus = "available" | "coming-soon" | "bespoke-only";

export interface ProductCategory {
  id: string;
  label: string;
  status: CategoryStatus;
  schemaId: string;
  shortDescription: string;
}

export type MaterialType = "pbr" | "flat-color" | "transparent";

export interface CatalogOption {
  id: string;
  label: string;
  active: boolean;
  order: number;
  description?: string;
  material: {
    type: MaterialType;
    baseColor: string; // usato da swatch e da fallback 3D
    grainSeed?: number; // per la texture procedurale (Documento 0 §... / risposta utente su essenze)
    roughness?: number;
  };
}

export interface DimensionRule {
  min: number;
  max: number;
  default: number;
  step: number;
}

export interface DimensionRules {
  length: DimensionRule;
  width: DimensionRule;
  height?: DimensionRule;
}

export interface Essence extends CatalogOption {}

export interface ShapeOption extends CatalogOption {
  geometryId: "rectangular" | "oval" | "shaped";
  dimensionRules: DimensionRules;
}

export interface EdgeOption extends CatalogOption {}
export interface ResinOption extends CatalogOption {}
export interface FinishOption extends CatalogOption {}
export interface BaseOption extends CatalogOption {
  category: "acciaio" | "legno" | "custom";
}

export interface TableConfiguration {
  essenceId: string;
  shapeId: string;
  dimensions: { length: number; width: number };
  edgeId: string;
  resinId: string;
  finishId: string;
  baseId: string;
}
