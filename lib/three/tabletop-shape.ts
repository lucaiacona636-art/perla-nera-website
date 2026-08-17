import * as THREE from "three";

// Geometria parametrica del piano tavolo — Documento 8 §3 "modello parametrico":
// una manciata di forme base combinate con materiali intercambiabili, invece
// di un modello 3D per ogni combinazione possibile.

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

interface TabletopShapeParams {
  shapeId: ShapeId;
  lengthCm: number;
  widthCm: number;
  edgeId: string;
  seed: number;
}

const CM_TO_M = 1 / 100;

export function buildTabletopShape({ shapeId, lengthCm, widthCm, edgeId, seed }: TabletopShapeParams): THREE.Shape {
  const rand = mulberry32(seed + lengthCm + widthCm);
  const hl = (lengthCm * CM_TO_M) / 2;
  const hw = (widthCm * CM_TO_M) / 2;
  const jitterAmount = edgeId === "vivo" ? 0.022 : edgeId === "mosso" ? 0.032 : 0;
  const jitter = () => (rand() - 0.5) * 2 * jitterAmount;

  const shape = new THREE.Shape();

  if (shapeId === "rectangular") {
    const corners: [number, number][] = [
      [-hl, -hw],
      [hl, -hw],
      [hl, hw],
      [-hl, hw],
    ];
    corners.forEach(([x, y], i) => {
      const px = x + jitter();
      const py = y + jitter();
      if (i === 0) shape.moveTo(px, py);
      else shape.lineTo(px, py);
    });
    shape.closePath();
    return shape;
  }

  const irregular = shapeId === "shaped";
  const segments = 56;
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    const wobble = irregular ? Math.sin(t * 3 + seed) * 0.07 + Math.cos(t * 5 - seed) * 0.03 : 0;
    const r = 1 + wobble;
    const x = Math.cos(t) * hl * r + (irregular ? jitter() : 0);
    const y = Math.sin(t) * hw * r + (irregular ? jitter() : 0);
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
}

export function buildTabletopGeometry(params: TabletopShapeParams, thicknessM = 0.045): THREE.ExtrudeGeometry {
  const shape = buildTabletopShape(params);
  const bevelSize = params.edgeId === "vivo" || params.edgeId === "mosso" ? 0.006 : 0.002;
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: thicknessM,
    bevelEnabled: true,
    bevelThickness: bevelSize,
    bevelSize,
    bevelSegments: 3,
    curveSegments: 32,
  });
  geometry.rotateX(-Math.PI / 2);
  geometry.translate(0, thicknessM, 0);
  return geometry;
}
