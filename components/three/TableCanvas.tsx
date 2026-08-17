"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Table3D, type Table3DProps } from "./Table3D";

interface TableCanvasProps {
  table: Table3DProps;
  variant: "dark" | "light";
  interactive?: boolean;
}

// Illuminazione a due varianti coerenti col design system — Documento 8 §5:
// una "scena scura" calda per la Home, una "scena chiara" neutra per il
// configuratore, dove conta la fedeltà cromatica di essenza/resina.
export function TableCanvas({ table, variant, interactive = true }: TableCanvasProps) {
  const bg = variant === "dark" ? "#0B0A09" : "#F6F2EB";

  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: false }}
      onCreated={({ gl }) => gl.setClearColor(bg, 1)}
    >
      <PerspectiveCamera makeDefault position={[1.7, 1.15, 1.9]} fov={42} />
      <Suspense fallback={null}>
        <Table3D {...table} autoRotate={interactive && table.autoRotate} />
        {/* Ambiente generato in-scena (Lightformer), niente HDR esterni da
            scaricare — coerente con Documento 9 (self-contained, no terze parti). */}
        <Environment resolution={128}>
          <Lightformer
            intensity={variant === "dark" ? 2.2 : 3.5}
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
        <ContactShadows position={[0, 0, 0]} opacity={variant === "dark" ? 0.5 : 0.35} scale={6} blur={2.4} far={1.2} />
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
          e inquadra solo un angolo della scena. */}
      <OrbitControls
        enabled={interactive}
        target={[0, 0.66, 0]}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3.4}
        maxPolarAngle={Math.PI / 2.15}
        autoRotate={false}
      />
    </Canvas>
  );
}
