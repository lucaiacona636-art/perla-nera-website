"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { LazyMount } from "@/components/ui/LazyMount";
import type { Table3DProps } from "./Table3D";

const TableCanvas = dynamic(() => import("./TableCanvas").then((m) => m.TableCanvas), {
  ssr: false,
  loading: () => null,
});

interface TableSceneProps {
  table: Table3DProps;
  variant: "dark" | "light";
  interactive?: boolean;
  fallback: React.ReactNode;
  className?: string;
}

function supportsWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

// Punto di ingresso pubblico del layer 3D — Documento 8 §4/§6: percorso
// primario 3D live, fallback fotografico se WebGL manca, dispositivo debole,
// o l'utente preferisce ridurre il movimento. Mai nel bundle iniziale.
export function TableScene({ table, variant, interactive = true, fallback, className }: TableSceneProps) {
  const [canRender3D, setCanRender3D] = useState<boolean | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCanRender3D(supportsWebGL() && !reducedMotion);
  }, []);

  if (canRender3D === false) {
    return <div className={className}>{fallback}</div>;
  }

  return (
    <div className={className}>
      <LazyMount fallback={fallback}>
        {canRender3D === null ? (
          fallback
        ) : (
          <TableCanvas table={{ ...table, autoRotate: interactive }} variant={variant} interactive={interactive} />
        )}
      </LazyMount>
    </div>
  );
}
