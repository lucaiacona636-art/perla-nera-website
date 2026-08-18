"use client";

import { Suspense, useLayoutEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { Table3D, type Table3DProps } from "./Table3D";

interface TableCanvasProps {
  table: Table3DProps;
  variant: "dark" | "light";
  interactive?: boolean;
}

// Illuminazione a due varianti coerenti col design system — Documento 8 §5:
// una "scena scura" calda per la Home, una "scena chiara" neutra per il
// configuratore, dove conta la fedeltà cromatica di essenza/resina.
// Direzione di ripresa fissa (stessa inquadratura "di prodotto" di sempre),
// normalizzata a lunghezza 1, applicata a distanza variabile.
const RAW_DIRECTION = [1.7, 1.15, 1.9] as const;
const DIRECTION_LENGTH = Math.sqrt(RAW_DIRECTION[0] ** 2 + RAW_DIRECTION[1] ** 2 + RAW_DIRECTION[2] ** 2);
const CAMERA_DIRECTION = RAW_DIRECTION.map((v) => v / DIRECTION_LENGTH) as [number, number, number];
const FOV_DEG = 42;

// Distanza/inquadratura iniziale approssimata (solo per il primissimo frame,
// prima che <FrameFit> misuri il canvas reale) — evita un pop visibile.
function initialDistance(lengthCm: number, widthCm: number) {
  const maxDimM = Math.max(lengthCm, widthCm) / 100;
  return Math.min(5.6, Math.max(2.0, maxDimM * 0.95 + 0.9));
}

/**
 * Il tavolo non deve mai uscire dall'inquadratura, su nessun rapporto
 * larghezza/altezza del canvas. Sul desktop il pannello di preview è una
 * colonna stretta e alta (non un riquadro quadrato): se la distanza camera
 * si calcola solo dalle dimensioni del tavolo (ignorando l'aspect ratio
 * reale del canvas), un tavolo largo viene tagliato ai lati perché il FOV
 * orizzontale effettivo è più stretto di quello verticale. Qui si misura
 * l'aspect ratio vero (via useThree, che reagisce al resize del container)
 * e si sceglie la distanza che soddisfa sia il vincolo verticale sia quello
 * orizzontale, qualunque sia la forma del riquadro — v. revisione
 * configuratore, bug "render tagliato su desktop".
 */
function FrameFit({
  lengthCm,
  widthCm,
  heightCm,
  controlsRef,
}: {
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}) {
  const { camera, size } = useThree();

  useLayoutEffect(() => {
    const halfLength = lengthCm / 200;
    const halfWidth = widthCm / 200;
    const halfHeight = heightCm / 200;
    const radius = Math.sqrt(halfLength ** 2 + halfWidth ** 2 + halfHeight ** 2);

    const aspect = size.width > 0 && size.height > 0 ? size.width / size.height : 1;
    const vFovHalf = THREE.MathUtils.degToRad(FOV_DEG / 2);
    const hFovHalf = Math.atan(Math.tan(vFovHalf) * aspect);
    const limitingHalfFov = Math.min(vFovHalf, hFovHalf);

    const distance = Math.min(7.5, Math.max(1.6, (radius / Math.sin(limitingHalfFov)) * 1.2 + 0.35));

    camera.position.set(
      CAMERA_DIRECTION[0] * distance,
      CAMERA_DIRECTION[1] * distance,
      CAMERA_DIRECTION[2] * distance
    );
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
    }

    const target = new THREE.Vector3(0, (heightCm / 100) * 0.88, 0);
    camera.lookAt(target);

    const controls = controlsRef.current;
    if (controls) {
      controls.target.copy(target);
      controls.minDistance = distance * 0.55;
      controls.maxDistance = distance * 1.6;
      controls.update();
    }
  }, [lengthCm, widthCm, heightCm, size.width, size.height, camera, controlsRef]);

  return null;
}

export function TableCanvas({ table, variant, interactive = true }: TableCanvasProps) {
  const bg = variant === "dark" ? "#0B0A09" : "#F6F2EB";
  const maxDimM = Math.max(table.lengthCm, table.widthCm) / 100;
  const heightCm = table.heightCm ?? 75;
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const initDist = initialDistance(table.lengthCm, table.widthCm);
  const initialCameraPosition: [number, number, number] = [
    CAMERA_DIRECTION[0] * initDist,
    CAMERA_DIRECTION[1] * initDist,
    CAMERA_DIRECTION[2] * initDist,
  ];

  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: false }}
      onCreated={({ gl }) => gl.setClearColor(bg, 1)}
    >
      <PerspectiveCamera makeDefault position={initialCameraPosition} fov={FOV_DEG} />
      <FrameFit lengthCm={table.lengthCm} widthCm={table.widthCm} heightCm={heightCm} controlsRef={controlsRef} />
      <Suspense fallback={null}>
        <Table3D {...table} autoRotate={interactive && table.autoRotate} />
        {/* Ambiente generato in-scena (Lightformer), niente HDR esterni da
            scaricare — coerente con Documento 9 (self-contained, no terze parti). */}
        <Environment resolution={128}>
          <Lightformer
            intensity={variant === "dark" ? 2.2 : 2.5}
            color={variant === "dark" ? "#F2E4CE" : "#FFFFFF"}
            position={[3, 4, 2]}
            scale={[5, 5, 1]}
          />
          <Lightformer intensity={1.2} color="#FFFFFF" position={[-4, 2, -2]} scale={[4, 4, 1]} />
          <Lightformer
            intensity={0.6}
            color={variant === "dark" ? "#8A7458" : "#FFFFFF"}
            position={[0, -2, 3]}
            scale={[6, 2, 1]}
          />
        </Environment>
        <ContactShadows position={[0, 0, 0]} opacity={variant === "dark" ? 0.5 : 0.35} scale={Math.max(6, maxDimM * 2.3)} blur={2.4} far={1.2} />
      </Suspense>
      <ambientLight intensity={variant === "dark" ? 0.25 : 0.5} />
      <directionalLight
        position={[3, 4, 2]}
        intensity={variant === "dark" ? 1.1 : 1.4}
        color={variant === "dark" ? "#F2E4CE" : "#FFFFFF"}
        castShadow
      />
      {/* Sempre montato (anche quando non interattivo) per puntare la camera
          verso il piano del tavolo — altrimenti la camera guarda -Z di default
          e inquadra solo un angolo della scena. Target/min/maxDistance NON
          passati come prop statiche: sono impostate imperativamente da
          <FrameFit> (che conosce l'aspect ratio reale del canvas) per non
          essere sovrascritte a ogni render con un valore indipendente dal
          contenitore. */}
      <OrbitControls
        ref={controlsRef}
        enabled={interactive}
        enablePan={false}
        enableZoom={interactive}
        minPolarAngle={Math.PI / 3.6}
        maxPolarAngle={Math.PI / 2.1}
        autoRotate={false}
      />
    </Canvas>
  );
}
