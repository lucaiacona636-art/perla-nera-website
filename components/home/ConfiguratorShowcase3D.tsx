"use client";

import { TableScene } from "@/components/three/TableScene";
import { essences } from "@/content/configurator/essences";
import { resins } from "@/content/configurator/resins";
import { bases } from "@/content/configurator/bases";

const ulivo = essences.find((e) => e.id === "ulivo")!;
const resinaTurchese = resins.find((r) => r.id === "turchese")!;
const baseLegno = bases.find((b) => b.id === "legno-cavalletto")!;

// Anteprima 3D dal vivo per la sezione "Progetta il tuo tavolo" della Home
// (Documento 7/8): stesso layer 3D del configuratore, una configurazione
// diversa da quella della sezione Materia per mostrare varietà reale, non
// una griglia statica di swatch.
export function ConfiguratorShowcase3D() {
  return (
    <div
      aria-hidden="true"
      className="aspect-square w-full overflow-hidden border border-line-light bg-ivory-2 sm:aspect-[4/3]"
    >
      <TableScene
        variant="light"
        interactive
        className="h-full w-full"
        table={{
          essence: { baseColor: ulivo.material.baseColor, grainSeed: ulivo.material.grainSeed ?? 1, roughness: ulivo.material.roughness ?? 0.55, essenceId: ulivo.id },
          shapeId: "oval",
          lengthCm: 220,
          widthCm: 110,
          heightCm: 75,
          edgeId: "naturale",
          resin: { active: true, baseColor: resinaTurchese.material.baseColor, transparent: false, roughness: resinaTurchese.material.roughness ?? 0.1 },
          finishRoughness: 0.35,
          base: { baseColor: baseLegno.material.baseColor, roughness: baseLegno.material.roughness ?? 0.6, category: "legno", id: baseLegno.id },
        }}
        fallback={
          <div
            className="h-full w-full"
            style={{
              background:
                "radial-gradient(60% 60% at 35% 45%, rgba(30,122,140,0.18), transparent 70%), radial-gradient(45% 50% at 75% 65%, rgba(138,116,88,0.25), transparent 70%)",
            }}
          />
        }
      />
    </div>
  );
}
