"use client";

import { TableScene } from "@/components/three/TableScene";
import { essences } from "@/content/configurator/essences";
import { resins } from "@/content/configurator/resins";
import { bases } from "@/content/configurator/bases";

const noce = essences.find((e) => e.id === "noce")!;
const resinaNera = resins.find((r) => r.id === "nera")!;
const baseAcciaio = bases.find((b) => b.id === "acciaio-nero")!;

// Il pezzo 3D dal vivo, spostato fuori dall'hero (Documento 8 §1, revisione
// "Cinematic Hero"): qui ha un momento proprio, dedicato alla materia, senza
// competere con l'apertura fotografica della Home. Rotazione autonoma (non
// legata allo scroll) e orbit manuale — stesso layer 3D del configuratore,
// variante scura perché la sezione "Materia prima" qui è a superficie scura.
export function MaterialShowcase3D() {
  return (
    <div
      aria-hidden="true"
      className="aspect-square w-full overflow-hidden border border-line-dark bg-ink-2 sm:aspect-[4/3]"
    >
      <TableScene
        variant="dark"
        interactive
        className="h-full w-full"
        table={{
          essence: { baseColor: noce.material.baseColor, grainSeed: noce.material.grainSeed ?? 1, roughness: noce.material.roughness ?? 0.55 },
          shapeId: "rectangular",
          lengthCm: 220,
          widthCm: 100,
          edgeId: "vivo",
          resin: { active: true, baseColor: resinaNera.material.baseColor, transparent: false, roughness: resinaNera.material.roughness ?? 0.15 },
          finishRoughness: 0.5,
          base: { baseColor: baseAcciaio.material.baseColor, roughness: baseAcciaio.material.roughness ?? 0.4, category: "acciaio" },
        }}
        fallback={
          <div
            className="h-full w-full"
            style={{
              background:
                "radial-gradient(60% 60% at 65% 45%, rgba(107,75,52,0.35), transparent 70%), radial-gradient(40% 50% at 80% 60%, rgba(20,20,20,0.6), transparent 70%)",
            }}
          />
        }
      />
    </div>
  );
}
