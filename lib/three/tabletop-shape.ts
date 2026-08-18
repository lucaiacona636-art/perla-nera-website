import * as THREE from "three";

// Sistema di geometria del piano tavolo — riscritto per generare tre
// famiglie costruttive realmente diverse invece di un'unica sagoma con un
// materiale colorato sopra (v. revisione configuratore):
//
// - "planked"      assi massello affiancate, eventuale canale di resina
//                   tra due assi — la famiglia di default.
// - "river"         due lastre irregolari con un vero canale di resina
//                   scavato tra loro, a tutto spessore.
// - "natural-slab"  una lastra unica dal profilo organico (tipico
//                   dell'ulivo, o di una sagomata a bordo vivo/mosso), con
//                   cavità naturali che la resina può riempire.
//
// La famiglia è determinata dalla combinazione di scelte dell'utente
// (resolveTableFamily), non da un singolo campo: è così che "Noce +
// rettangolare + bordo vivo + resina nera" diventa visivamente un'altra
// composizione rispetto a "Noce + rettangolare + bordo regolare + nessuna
// resina", pur condividendo lo stesso motore.

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type ShapeId = "rectangular" | "oval" | "shaped";
export type TableFamily = "planked" | "river" | "natural-slab";

const CM_TO_M = 1 / 100;

export interface TableGeometryParams {
  shapeId: ShapeId;
  lengthCm: number;
  widthCm: number;
  edgeId: string;
  essenceId: string;
  resinActive: boolean;
  seed: number;
}

/** Decide quale famiglia costruttiva rappresenta al meglio la combinazione scelta — v. Documento "revisione configuratore" §14. */
export function resolveTableFamily({ shapeId, edgeId, essenceId, resinActive }: Pick<TableGeometryParams, "shapeId" | "edgeId" | "essenceId" | "resinActive">): TableFamily {
  const organicEdge = edgeId === "vivo" || edgeId === "mosso";
  // L'ulivo (o una sagomata a bordo naturale/vivo/mosso) ha sempre carattere
  // di lastra naturale: non si comporta come le altre essenze, per scelta
  // esplicita di prodotto — non un default "quando non sappiamo cosa fare".
  if (essenceId === "ulivo" || (shapeId === "shaped" && organicEdge)) return "natural-slab";
  if (resinActive && organicEdge) return "river";
  return "planked";
}

// Inviluppo (mezza-lunghezza in funzione della posizione lungo la larghezza,
// normalizzata -1..1) per le tre forme base — usato sia per il profilo
// esterno sia per stimare l'estensione di ogni singola asse.
function envelopeHalfLength(shapeId: ShapeId, yNorm: number, hl: number, seed: number, organic: boolean): number {
  const clampedY = Math.max(-1, Math.min(1, yNorm));
  const ellipse = Math.sqrt(Math.max(0, 1 - clampedY * clampedY));
  if (shapeId === "rectangular" && !organic) return hl;
  if (shapeId === "oval" || (shapeId === "rectangular" && organic)) {
    const base = shapeId === "oval" ? ellipse : 1;
    const wobble = organic ? 1 + Math.sin(clampedY * 5 + seed) * 0.05 : 1;
    return hl * base * wobble;
  }
  // "shaped" — profilo organico: base quasi ellittica con un'ondulazione
  // marcata, per leggersi come sagoma naturale e non come un'ellisse pulita.
  const wobble = 1 + Math.sin(clampedY * 4.2 + seed) * 0.16 + Math.cos(clampedY * 7.1 - seed) * 0.08;
  return hl * (0.72 + ellipse * 0.4) * wobble;
}

function outerEdgeJitter(edgeId: string, rand: () => number): number {
  if (edgeId === "vivo") return (rand() - 0.5) * 2 * 0.024;
  if (edgeId === "mosso") return (rand() - 0.5) * 2 * 0.036;
  if (edgeId === "naturale") return (rand() - 0.5) * 2 * 0.008;
  return 0; // regolare: bordo tagliato, nessun jitter
}

export interface PlankPiece {
  shape: THREE.Shape;
  /** Seed indipendente per la texture di questa singola asse. */
  grainSeed: number;
  /** Micro-variazione di quota per un aspetto lavorato a mano, non stampato. */
  yJitter: number;
}

export interface ResinPiece {
  shape: THREE.Shape;
  /** true se la resina deve attraversare tutto lo spessore (river/cavità), false per un inserto sottile in superficie. */
  fullDepth: boolean;
}

export interface TableComposition {
  family: TableFamily;
  planks: PlankPiece[];
  resinPieces: ResinPiece[];
  /** Ingombro reale, per l'inquadratura automatica della camera. */
  boundingHalfLength: number;
  boundingHalfWidth: number;
}

function buildPlankedComposition(params: TableGeometryParams): TableComposition {
  const { shapeId, lengthCm, widthCm, edgeId, resinActive, seed } = params;
  const rand = mulberry32(seed + lengthCm + widthCm);
  const hl = (lengthCm * CM_TO_M) / 2;
  const hw = (widthCm * CM_TO_M) / 2;
  const organic = edgeId === "vivo" || edgeId === "mosso" || edgeId === "naturale";

  // Un'asse ogni ~16cm di larghezza, tra 3 e 7 assi: coerente con una vera
  // composizione a doghe invece di un'unica lastra.
  const plankCount = Math.max(3, Math.min(7, Math.round(widthCm / 16)));
  const gap = 0.004; // ~4mm tra le assi
  const resinSeamIndex = resinActive ? 1 + Math.floor(rand() * Math.max(1, plankCount - 2)) : -1;
  const resinSeamWidth = 0.018;

  const planks: PlankPiece[] = [];
  const resinPieces: ResinPiece[] = [];

  // Larghezza di ogni asse leggermente irregolare (vere doghe non sono identiche).
  const rawWidths = Array.from({ length: plankCount }, () => 1 + (rand() - 0.5) * 0.3);
  const totalRaw = rawWidths.reduce((a, b) => a + b, 0);
  const extraForSeam = resinSeamIndex >= 0 ? resinSeamWidth : 0;
  let cursor = -hw;

  for (let i = 0; i < plankCount; i++) {
    const isSeamGap = i === resinSeamIndex;
    const plankSpan = (rawWidths[i]! / totalRaw) * (hw * 2 - gap * (plankCount - 1) - extraForSeam);
    const yStart = cursor;
    const yEnd = cursor + plankSpan;
    const yMid = (yStart + yEnd) / 2;
    const yNormMid = yMid / hw;

    const halfLenAtStart = envelopeHalfLength(shapeId, yStart / hw, hl, seed, organic);
    const halfLenAtEnd = envelopeHalfLength(shapeId, yEnd / hw, hl, seed, organic);
    const jitterStart = outerEdgeJitter(edgeId, rand);
    const jitterEnd = outerEdgeJitter(edgeId, rand);

    const shape = new THREE.Shape();
    shape.moveTo(-halfLenAtStart - jitterStart, yStart);
    shape.lineTo(halfLenAtStart + jitterStart, yStart);
    shape.lineTo(halfLenAtEnd + jitterEnd, yEnd);
    shape.lineTo(-halfLenAtEnd - jitterEnd, yEnd);
    shape.closePath();

    planks.push({
      shape,
      grainSeed: seed * 97 + i * 733 + Math.floor(rand() * 1000),
      yJitter: (rand() - 0.5) * 0.003,
    });

    cursor = yEnd + gap;
    if (isSeamGap) {
      const seamYStart = yEnd;
      const seamYEnd = yEnd + resinSeamWidth;
      const seamHalfLenStart = envelopeHalfLength(shapeId, seamYStart / hw, hl, seed, organic) * 0.94;
      const seamHalfLenEnd = envelopeHalfLength(shapeId, seamYEnd / hw, hl, seed, organic) * 0.94;
      const seamShape = new THREE.Shape();
      seamShape.moveTo(-seamHalfLenStart, seamYStart);
      seamShape.lineTo(seamHalfLenStart, seamYStart);
      seamShape.lineTo(seamHalfLenEnd, seamYEnd);
      seamShape.lineTo(-seamHalfLenEnd, seamYEnd);
      seamShape.closePath();
      resinPieces.push({ shape: seamShape, fullDepth: true });
      cursor = seamYEnd + gap;
    }
    void yNormMid;
  }

  return { family: "planked", planks, resinPieces, boundingHalfLength: hl, boundingHalfWidth: hw };
}

function buildRiverComposition(params: TableGeometryParams): TableComposition {
  const { shapeId, lengthCm, widthCm, edgeId, seed } = params;
  const rand = mulberry32(seed + lengthCm + widthCm + 17);
  const hl = (lengthCm * CM_TO_M) / 2;
  const hw = (widthCm * CM_TO_M) / 2;
  const segments = 24;
  const baseChannelHalf = Math.max(0.05, hl * 0.06);

  const ys: number[] = [];
  const centerXs: number[] = [];
  const channelHalfWidths: number[] = [];
  const outerLeft: number[] = [];
  const outerRight: number[] = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const y = -hw + t * hw * 2;
    const yNorm = y / hw;
    const wobbleSeed = seed * 1.3;
    const centerX = Math.sin(yNorm * 3.1 + wobbleSeed) * hl * 0.05 + Math.sin(yNorm * 7.3 - wobbleSeed) * hl * 0.02;
    const channelHalf = baseChannelHalf * (0.65 + 0.45 * Math.pow(Math.sin(yNorm * 2.3 + wobbleSeed * 1.7), 2));
    const envHalfLen = envelopeHalfLength(shapeId, yNorm, hl, seed, true);
    const edgeJ = outerEdgeJitter(edgeId, rand);

    ys.push(y);
    centerXs.push(centerX);
    channelHalfWidths.push(channelHalf);
    outerLeft.push(-envHalfLen - edgeJ);
    outerRight.push(envHalfLen + edgeJ);
  }

  const leftBoundary = centerXs.map((c, i) => c - channelHalfWidths[i]!);
  const rightBoundary = centerXs.map((c, i) => c + channelHalfWidths[i]!);

  const slabLeft = new THREE.Shape();
  slabLeft.moveTo(outerLeft[0]!, ys[0]!);
  for (let i = 1; i <= segments; i++) slabLeft.lineTo(outerLeft[i]!, ys[i]!);
  for (let i = segments; i >= 0; i--) slabLeft.lineTo(leftBoundary[i]!, ys[i]!);
  slabLeft.closePath();

  const slabRight = new THREE.Shape();
  slabRight.moveTo(rightBoundary[0]!, ys[0]!);
  for (let i = 1; i <= segments; i++) slabRight.lineTo(rightBoundary[i]!, ys[i]!);
  for (let i = segments; i >= 0; i--) slabRight.lineTo(outerRight[i]!, ys[i]!);
  slabRight.closePath();

  const channel = new THREE.Shape();
  channel.moveTo(leftBoundary[0]!, ys[0]!);
  for (let i = 1; i <= segments; i++) channel.lineTo(leftBoundary[i]!, ys[i]!);
  for (let i = segments; i >= 0; i--) channel.lineTo(rightBoundary[i]!, ys[i]!);
  channel.closePath();

  const planks: PlankPiece[] = [
    { shape: slabLeft, grainSeed: seed * 53 + 1, yJitter: (rand() - 0.5) * 0.002 },
    { shape: slabRight, grainSeed: seed * 59 + 2, yJitter: (rand() - 0.5) * 0.002 },
  ];

  return {
    family: "river",
    planks,
    resinPieces: [{ shape: channel, fullDepth: true }],
    boundingHalfLength: hl,
    boundingHalfWidth: hw,
  };
}

function buildNaturalSlabComposition(params: TableGeometryParams): TableComposition {
  const { shapeId, lengthCm, widthCm, edgeId, resinActive, seed } = params;
  const rand = mulberry32(seed + lengthCm + widthCm + 41);
  const hl = (lengthCm * CM_TO_M) / 2;
  const hw = (widthCm * CM_TO_M) / 2;
  const segments = 56;

  const outer = new THREE.Shape();
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    const yNorm = Math.sin(t);
    const envHalfLen = envelopeHalfLength(shapeId, yNorm, hl, seed, true);
    const radialWobble = 1 + Math.sin(t * 5 + seed) * 0.05;
    const x = Math.cos(t) * envHalfLen * radialWobble + outerEdgeJitter(edgeId, rand) * 1.4;
    const y = Math.sin(t) * hw * (1 + Math.sin(t * 3 - seed) * 0.04) + outerEdgeJitter(edgeId, rand) * 1.4;
    if (i === 0) outer.moveTo(x, y);
    else outer.lineTo(x, y);
  }
  outer.closePath();

  const resinPieces: ResinPiece[] = [];

  if (resinActive) {
    // 2-4 fessure/cavità naturali distribuite, non un unico canale centrale:
    // ognuna diventa un vuoto reale nella geometria (Shape.holes) riempito
    // da un pezzo di resina della stessa forma.
    const voidCount = 2 + Math.floor(rand() * 3);
    for (let v = 0; v < voidCount; v++) {
      const angle = rand() * Math.PI * 2;
      const radiusFactor = 0.15 + rand() * 0.45;
      const cx = Math.cos(angle) * hl * radiusFactor;
      const cy = Math.sin(angle) * hw * radiusFactor;
      const voidRadiusX = hl * (0.05 + rand() * 0.07);
      const voidRadiusY = hw * (0.04 + rand() * 0.06);
      const voidSeed = seed + v * 13;
      const voidSegments = 12;
      const holePath = new THREE.Path();
      const points: [number, number][] = [];
      for (let i = 0; i <= voidSegments; i++) {
        const vt = (i / voidSegments) * Math.PI * 2;
        const wobble = 1 + Math.sin(vt * 3 + voidSeed) * 0.28 + Math.cos(vt * 5 - voidSeed) * 0.15;
        const vx = cx + Math.cos(vt) * voidRadiusX * wobble;
        const vy = cy + Math.sin(vt) * voidRadiusY * wobble;
        points.push([vx, vy]);
        if (i === 0) holePath.moveTo(vx, vy);
        else holePath.lineTo(vx, vy);
      }
      holePath.closePath();
      outer.holes.push(holePath);

      const resinShape = new THREE.Shape();
      points.forEach(([px, py], i) => {
        if (i === 0) resinShape.moveTo(px, py);
        else resinShape.lineTo(px, py);
      });
      resinShape.closePath();
      resinPieces.push({ shape: resinShape, fullDepth: true });
    }
  }

  const planks: PlankPiece[] = [{ shape: outer, grainSeed: seed * 31 + 7, yJitter: 0 }];

  return { family: "natural-slab", planks, resinPieces, boundingHalfLength: hl, boundingHalfWidth: hw };
}

/**
 * Ingombro reale (conservativo) del piano a una data posizione Z normalizzata
 * — usato per posizionare le gambe SOTTO il piano vero, non ai vertici del
 * bounding box rettangolare. Per forme non rettangolari (ovale, sagomata) il
 * piano non raggiunge gli angoli del rettangolo d'ingombro: posizionarvi le
 * gambe le fa "galleggiare" fuori dal piano — bug osservato sulla forma
 * Ovale. Il fattore 0.75 sulla "shaped" è un margine di sicurezza che copre
 * il caso peggiore dell'ondulazione casuale (v. envelopeHalfLength).
 */
export function footprintHalfLengthAt(shapeId: ShapeId, zNorm: number, hl: number): number {
  const clampedZ = Math.max(-1, Math.min(1, zNorm));
  const ellipse = Math.sqrt(Math.max(0, 1 - clampedZ * clampedZ));
  if (shapeId === "rectangular") return hl;
  if (shapeId === "oval") return hl * ellipse;
  return hl * (0.72 + ellipse * 0.4) * 0.75;
}

export function buildTableComposition(params: TableGeometryParams): TableComposition {
  const family = resolveTableFamily(params);
  if (family === "river") return buildRiverComposition(params);
  if (family === "natural-slab") return buildNaturalSlabComposition(params);
  return buildPlankedComposition(params);
}

export function extrudePiece(shape: THREE.Shape, thicknessM: number, edgeId: string): THREE.ExtrudeGeometry {
  const organic = edgeId === "vivo" || edgeId === "mosso";
  const bevelSize = organic ? 0.006 : edgeId === "naturale" ? 0.003 : 0.0015;
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: thicknessM,
    bevelEnabled: true,
    bevelThickness: bevelSize,
    bevelSize,
    bevelSegments: organic ? 4 : 2,
    curveSegments: 24,
  });
  geometry.rotateX(-Math.PI / 2);
  return geometry;
}
