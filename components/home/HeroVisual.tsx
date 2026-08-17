import { TableScene } from "@/components/three/TableScene";
import { essences } from "@/content/configurator/essences";
import { resins } from "@/content/configurator/resins";
import { bases } from "@/content/configurator/bases";

const noce = essences.find((e) => e.id === "noce")!;
const resinaNera = resins.find((r) => r.id === "nera")!;
const baseAcciaio = bases.find((b) => b.id === "acciaio-nero")!;

// Il pezzo flagship di Home — oggi un tavolo (categoria più matura, v.
// Documento 0 §1). Funzione narrativa, non decorativa: mostra la materia
// prima ancora del configuratore (Documento 8 §1).
export function HeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-0 top-1/2 hidden h-[60%] w-[58%] -translate-y-[42%] opacity-90 sm:block lg:h-[62%] lg:w-[48%]"
    >
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-ink" />
      <TableScene
        variant="dark"
        interactive={false}
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
          autoRotate: true,
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
