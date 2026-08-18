"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { buildTableComposition, extrudePiece, footprintHalfLengthAt, type ShapeId } from "@/lib/three/tabletop-shape";
import { createWoodCanvas } from "@/lib/wood-texture";

export interface Table3DProps {
  essence: { baseColor: string; grainSeed: number; roughness: number; essenceId?: string };
  shapeId: ShapeId;
  lengthCm: number;
  widthCm: number;
  /** Altezza del piano da terra, in cm — opzionale, default 75 (misura standard da pranzo). */
  heightCm?: number;
  edgeId: string;
  resin: { active: boolean; baseColor: string; transparent: boolean; roughness: number };
  finishRoughness: number;
  base: { baseColor: string; roughness: number; category: "acciaio" | "legno" | "custom"; id?: string };
  autoRotate?: boolean;
  /** Rif. mutabile 0→1 aggiornato da GSAP ScrollTrigger (Documento 8): se
   * presente, la rotazione segue lo scroll invece di ruotare in autonomia —
   * letto ogni frame senza passare da React, per non ricreare la scena a
   * ogni scroll event. */
  scrollProgress?: { current: number };
}

const CM_TO_M = 1 / 100;
const THICKNESS_M = 0.045;

export function Table3D({
  essence,
  shapeId,
  lengthCm,
  widthCm,
  heightCm = 75,
  edgeId,
  resin,
  finishRoughness,
  base,
  autoRotate = true,
  scrollProgress,
}: Table3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Ricostruita solo quando cambia una scelta reale — ogni combinazione
  // produce una composizione diversa (famiglia, numero di assi, canali di
  // resina), non solo un colore diverso sullo stesso solido.
  const composition = useMemo(
    () =>
      buildTableComposition({
        shapeId,
        lengthCm,
        widthCm,
        edgeId,
        essenceId: essence.essenceId ?? "",
        resinActive: resin.active,
        seed: essence.grainSeed,
      }),
    [shapeId, lengthCm, widthCm, edgeId, essence.essenceId, essence.grainSeed, resin.active]
  );

  const plankGeometries = useMemo(
    () => composition.planks.map((p) => extrudePiece(p.shape, THICKNESS_M, edgeId)),
    [composition, edgeId]
  );

  const resinGeometries = useMemo(
    () => composition.resinPieces.map((r) => extrudePiece(r.shape, THICKNESS_M + 0.006, "regolare")),
    [composition]
  );

  const plankTextures = useMemo(() => {
    if (typeof document === "undefined") return [];
    return composition.planks.map((p) => {
      const canvas = createWoodCanvas(essence.baseColor, p.grainSeed, 384, essence.essenceId);
      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1.4, 1.4);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    });
  }, [composition, essence.baseColor, essence.essenceId]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (scrollProgress) {
      // Rotazione cinematica legata allo scroll dell'hero (0 → ~130°),
      // con un leggero smorzamento verso il valore target per restare fluida.
      const target = scrollProgress.current * Math.PI * 0.72;
      groupRef.current.rotation.y += (target - groupRef.current.rotation.y) * Math.min(delta * 4, 1);
    } else if (autoRotate) {
      groupRef.current.rotation.y += delta * 0.12;
    }
  });

  const halfLength = composition.boundingHalfLength;
  const halfWidth = composition.boundingHalfWidth;
  const legInset = Math.min(0.08, halfLength * 0.06 + 0.03);
  const legHeight = heightCm * CM_TO_M - THICKNESS_M;
  const tableTopY = legHeight;
  const legRadius = Math.max(0.018, Math.min(0.03, halfLength * 0.012));

  // Le gambe vanno posizionate sotto il piano REALE, non ai vertici del
  // rettangolo d'ingombro: per forme non rettangolari (ovale, sagomata) il
  // piano non raggiunge quegli angoli, e le gambe "galleggerebbero" fuori
  // dal piano — bug osservato sulla forma Ovale, v. footprintHalfLengthAt.
  const legZ = halfWidth - legInset;
  const legHalfLengthAtZ = footprintHalfLengthAt(shapeId, legZ / halfWidth, halfLength);
  const legX = Math.max(legInset, legHalfLengthAtZ - legInset);

  const legPositions: [number, number, number][] = [
    [-legX, 0, -legZ],
    [legX, 0, -legZ],
    [legX, 0, legZ],
    [-legX, 0, legZ],
  ];

  // La struttura (gambe/base) deve cambiare davvero forma, non solo colore:
  // "Acciaio nero" → telaio a croce per lato (come una slitta/hairpin);
  // "Acciaio naturale" → quattro tondini sottili;
  // "Legno a cavalletto" → quattro gambe in legno unite da una traversa per
  // lato, come un vero cavalletto; "Base custom" → gambe squadrate semplici,
  // in attesa del disegno definitivo concordato col cliente.
  const structure: "cross" | "rods" | "trestle" | "block" =
    base.id === "acciaio-nero"
      ? "cross"
      : base.id === "acciaio-naturale"
        ? "rods"
        : base.id === "legno-cavalletto"
          ? "trestle"
          : base.category === "acciaio"
            ? "rods"
            : "block";

  const barThickness = Math.max(0.022, legRadius * 1.3);
  const crossbarHeight = Math.max(0.035, legRadius * 2.2);
  const crossBarLength = Math.sqrt(legHeight * legHeight + (2 * legZ) * (2 * legZ));
  const crossBarAngle = Math.atan2(2 * legZ, legHeight);
  const trestleSplay = 0.12; // ~7°: gambe leggermente svasate, sagoma da vero cavalletto

  return (
    <group ref={groupRef}>
      <group position={[0, tableTopY, 0]}>
        {plankGeometries.map((geometry, i) => (
          <mesh key={i} geometry={geometry} position={[0, composition.planks[i]!.yJitter, 0]} castShadow receiveShadow>
            <meshStandardMaterial
              map={plankTextures[i] ?? undefined}
              color={plankTextures[i] ? "#ffffff" : essence.baseColor}
              roughness={finishRoughness}
              metalness={0.02}
            />
          </mesh>
        ))}

        {resin.active &&
          resinGeometries.map((geometry, i) => (
            <mesh key={i} geometry={geometry} position={[0, -0.003, 0]}>
              {/* Roughness alta sui colori pieni: a bassa roughness il lobo
                  speculare (governato da luci/IBL, non dal colore base)
                  domina la resa visiva e anche una resina "Nera" (#141414)
                  legge come grigio medio — v. revisione configuratore, bug
                  "resina non si vede nera". La resina trasparente resta a
                  bassa roughness: lì l'effetto voluto è la trasmissione
                  (vetro), non il colore pieno. */}
              <meshPhysicalMaterial
                color={resin.baseColor}
                roughness={resin.transparent ? resin.roughness : 0.78}
                metalness={0}
                transparent={resin.transparent}
                opacity={resin.transparent ? 0.62 : 1}
                transmission={resin.transparent ? 0.65 : 0}
                thickness={resin.transparent ? THICKNESS_M * 2 : 0}
                clearcoat={resin.transparent ? 0.5 : 0.15}
                clearcoatRoughness={resin.transparent ? 0.1 : 0.3}
                envMapIntensity={resin.transparent ? 0.4 : 0.08}
                ior={1.5}
              />
            </mesh>
          ))}
      </group>

      {structure === "cross" &&
        [-legX, legX].map((x, endIdx) => (
          <group key={endIdx}>
            <mesh position={[x, legHeight / 2, 0]} rotation={[crossBarAngle, 0, 0]} castShadow>
              <boxGeometry args={[barThickness, crossBarLength, barThickness]} />
              <meshStandardMaterial color={base.baseColor} roughness={base.roughness} metalness={0.75} />
            </mesh>
            <mesh position={[x, legHeight / 2, 0]} rotation={[-crossBarAngle, 0, 0]} castShadow>
              <boxGeometry args={[barThickness, crossBarLength, barThickness]} />
              <meshStandardMaterial color={base.baseColor} roughness={base.roughness} metalness={0.75} />
            </mesh>
          </group>
        ))}

      {structure === "rods" &&
        legPositions.map((pos, i) => (
          <mesh key={i} position={[pos[0], legHeight / 2, pos[2]]} castShadow>
            <cylinderGeometry args={[legRadius * 0.55, legRadius * 0.55, legHeight, 16]} />
            <meshStandardMaterial color={base.baseColor} roughness={base.roughness} metalness={0.7} />
          </mesh>
        ))}

      {structure === "trestle" && (
        <>
          {legPositions.map((pos, i) => (
            <mesh
              key={i}
              position={[pos[0], legHeight / 2, pos[2]]}
              rotation={[pos[2] < 0 ? trestleSplay : -trestleSplay, 0, 0]}
              castShadow
            >
              <boxGeometry args={[legRadius * 2, legHeight, legRadius * 2]} />
              <meshStandardMaterial color={base.baseColor} roughness={base.roughness} metalness={0.05} />
            </mesh>
          ))}
          {/* Traversa orizzontale per lato, leggermente più larga del piano
              alle estremità — la sagoma che rende riconoscibile un vero
              cavalletto, non solo quattro gambe dritte. */}
          {[-legX, legX].map((x, endIdx) => (
            <mesh key={endIdx} position={[x, legHeight * 0.88, 0]} castShadow>
              <boxGeometry args={[barThickness, crossbarHeight, 2 * legZ + 0.05]} />
              <meshStandardMaterial color={base.baseColor} roughness={base.roughness} metalness={0.05} />
            </mesh>
          ))}
        </>
      )}

      {structure === "block" &&
        legPositions.map((pos, i) => (
          <mesh key={i} position={[pos[0], legHeight / 2, pos[2]]} castShadow>
            <boxGeometry args={[legRadius * 2, legHeight, legRadius * 2]} />
            <meshStandardMaterial color={base.baseColor} roughness={base.roughness} metalness={0.05} />
          </mesh>
        ))}
    </group>
  );
}
