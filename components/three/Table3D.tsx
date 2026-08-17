"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { buildTabletopGeometry, type ShapeId } from "@/lib/three/tabletop-shape";
import { createWoodCanvas } from "@/lib/wood-texture";

export interface Table3DProps {
  essence: { baseColor: string; grainSeed: number; roughness: number };
  shapeId: ShapeId;
  lengthCm: number;
  widthCm: number;
  edgeId: string;
  resin: { active: boolean; baseColor: string; transparent: boolean; roughness: number };
  finishRoughness: number;
  base: { baseColor: string; roughness: number; category: "acciaio" | "legno" | "custom" };
  autoRotate?: boolean;
}

const CM_TO_M = 1 / 100;

export function Table3D({
  essence,
  shapeId,
  lengthCm,
  widthCm,
  edgeId,
  resin,
  finishRoughness,
  base,
  autoRotate = true,
}: Table3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  const geometry = useMemo(
    () => buildTabletopGeometry({ shapeId, lengthCm, widthCm, edgeId, seed: essence.grainSeed }),
    [shapeId, lengthCm, widthCm, edgeId, essence.grainSeed]
  );

  const woodTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = createWoodCanvas(essence.baseColor, essence.grainSeed, 512);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1.6, 1.6);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, [essence.baseColor, essence.grainSeed]);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }
  });

  const thicknessM = 0.045;
  const halfLength = (lengthCm * CM_TO_M) / 2;
  const halfWidth = (widthCm * CM_TO_M) / 2;
  const legInset = 0.06;
  const legHeight = 0.72;
  const tableTopY = legHeight;

  const legPositions: [number, number, number][] = [
    [-(halfLength - legInset), 0, -(halfWidth - legInset)],
    [halfLength - legInset, 0, -(halfWidth - legInset)],
    [halfLength - legInset, 0, halfWidth - legInset],
    [-(halfLength - legInset), 0, halfWidth - legInset],
  ];

  return (
    <group ref={groupRef}>
      <group position={[0, tableTopY, 0]}>
        <mesh geometry={geometry} castShadow receiveShadow>
          <meshStandardMaterial
            map={woodTexture ?? undefined}
            color={woodTexture ? "#ffffff" : essence.baseColor}
            roughness={finishRoughness}
            metalness={0.02}
          />
        </mesh>

        {resin.active && (
          <mesh position={[0, thicknessM / 2 + 0.001, 0]}>
            <boxGeometry args={[Math.min(halfLength * 0.5, 0.5), thicknessM + 0.004, halfWidth * 1.7]} />
            <meshPhysicalMaterial
              color={resin.baseColor}
              roughness={resin.roughness}
              metalness={0}
              transparent={resin.transparent}
              opacity={resin.transparent ? 0.55 : 1}
              transmission={resin.transparent ? 0.6 : 0}
              thickness={resin.transparent ? 0.4 : 0}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          </mesh>
        )}
      </group>

      {legPositions.map((pos, i) => (
        <mesh key={i} position={[pos[0], legHeight / 2, pos[2]]} castShadow>
          {base.category === "acciaio" ? (
            <cylinderGeometry args={[0.02, 0.02, legHeight, 16]} />
          ) : (
            <boxGeometry args={[0.06, legHeight, 0.06]} />
          )}
          <meshStandardMaterial color={base.baseColor} roughness={base.roughness} metalness={base.category === "acciaio" ? 0.7 : 0.05} />
        </mesh>
      ))}
    </group>
  );
}
