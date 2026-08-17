"use client";

import { useEffect, useRef } from "react";
import { paintWoodGrain } from "@/lib/wood-texture";
import { cn } from "@/lib/utils";

interface WoodSwatchProps {
  baseColor: string;
  seed: number;
  className?: string;
}

export function WoodSwatch({ baseColor, seed, className }: WoodSwatchProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = canvas.clientWidth || 128;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    paintWoodGrain(ctx, size, size, baseColor, seed);
  }, [baseColor, seed]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-hidden="true"
      className={cn("block h-full w-full", className)}
    />
  );
}
