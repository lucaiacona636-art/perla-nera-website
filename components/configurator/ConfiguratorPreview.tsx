"use client";

import { useConfiguratorStore } from "@/lib/store/configurator-store";
import { essences } from "@/content/configurator/essences";
import { shapes } from "@/content/configurator/shapes";
import { edges } from "@/content/configurator/edges";
import { resins } from "@/content/configurator/resins";
import { finishes } from "@/content/configurator/finishes";
import { bases } from "@/content/configurator/bases";
import { TableScene } from "@/components/three/TableScene";
import { WoodSwatch } from "@/components/ui/WoodSwatch";

// Consuma lo stato del configuratore ed emette la preview — Documento 7 §5.
// La UI degli step non disegna nulla direttamente: qui si risolvono gli id
// di catalogo in oggetti materiale/geometria per il layer 3D.
export function ConfiguratorPreview() {
  const { categoryId, essenceId, shapeId, dimensions, edgeId, resinId, finishId, baseId } = useConfiguratorStore();

  if (categoryId && categoryId !== "tavoli") {
    const essence = essences[0]!;
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-ivory-2 p-8 text-center">
        <div className="h-24 w-24 overflow-hidden border border-line-light">
          <WoodSwatch baseColor={essence.material.baseColor} seed={essence.material.grainSeed ?? 1} />
        </div>
        <p className="font-display text-xl text-text-light">Progetto su misura</p>
        <p className="max-w-[32ch] text-sm text-text-light-muted">
          Per questa categoria non esiste ancora un&rsquo;anteprima visiva —
          raccontaci l&rsquo;idea nelle note qui accanto e ne parliamo insieme.
        </p>
      </div>
    );
  }

  const essence = essences.find((e) => e.id === essenceId) ?? essences[0]!;
  const shape = shapes.find((s) => s.id === shapeId) ?? shapes[0]!;
  const edge = edges.find((e) => e.id === edgeId) ?? edges[0]!;
  const resin = resins.find((r) => r.id === resinId) ?? resins[0]!;
  const finish = finishes.find((f) => f.id === finishId) ?? finishes[0]!;
  const base = bases.find((b) => b.id === baseId) ?? bases[0]!;
  const dims = dimensions ?? { length: shape.dimensionRules.length.default, width: shape.dimensionRules.width.default };

  return (
    <TableScene
      variant="light"
      className="h-full w-full"
      table={{
        essence: {
          baseColor: essence.material.baseColor,
          grainSeed: essence.material.grainSeed ?? 1,
          roughness: essence.material.roughness ?? 0.55,
        },
        shapeId: shape.geometryId,
        lengthCm: dims.length,
        widthCm: dims.width,
        edgeId: edge.id,
        resin: {
          active: resin.id !== "nessuna",
          baseColor: resin.material.baseColor,
          transparent: resin.material.type === "transparent",
          roughness: resin.material.roughness ?? 0.15,
        },
        finishRoughness: finish.material.roughness ?? 0.5,
        base: {
          baseColor: base.material.baseColor,
          roughness: base.material.roughness ?? 0.4,
          category: base.category,
        },
        autoRotate: false,
      }}
      fallback={
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-ivory-2 p-8">
          <div className="h-32 w-32 overflow-hidden border border-line-light">
            <WoodSwatch baseColor={essence.material.baseColor} seed={essence.material.grainSeed ?? 1} />
          </div>
          <p className="text-center text-sm text-text-light-muted">
            {essence.label} · {shape.label} · {dims.length}&times;{dims.width}cm
          </p>
        </div>
      }
    />
  );
}
