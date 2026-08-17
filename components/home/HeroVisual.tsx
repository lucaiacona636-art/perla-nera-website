"use client";

import { useEffect, useRef } from "react";
import { TableScene } from "@/components/three/TableScene";
import { essences } from "@/content/configurator/essences";
import { resins } from "@/content/configurator/resins";
import { bases } from "@/content/configurator/bases";

const noce = essences.find((e) => e.id === "noce")!;
const resinaNera = resins.find((r) => r.id === "nera")!;
const baseAcciaio = bases.find((b) => b.id === "acciaio-nero")!;

// Il pezzo flagship di Home — oggi un tavolo (categoria più matura, v.
// Documento 0 §1). Funzione narrativa, non decorativa: mostra la materia
// prima ancora del configuratore (Documento 8 §1). La rotazione è legata
// allo scroll dell'hero (GSAP ScrollTrigger) invece che autonoma, per dare
// la sensazione di "entrare" nel pezzo scendendo lungo la pagina.
export function HeroVisual() {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = rootRef.current?.closest("section");
    if (!section) return;

    let trigger: import("gsap/ScrollTrigger").ScrollTrigger | undefined;
    let cancelled = false;

    // GSAP/ScrollTrigger caricato dinamicamente: tenerlo fuori dal bundle
    // critico della Home mantiene il First Load JS basso (Documento 9).
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 0.4,
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
        },
      });
    });

    return () => {
      cancelled = true;
      trigger?.kill();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute right-0 top-1/2 hidden h-[55vh] w-[58%] -translate-y-[42%] opacity-90 sm:block lg:h-[58vh] lg:w-[48%]"
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
          scrollProgress,
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
