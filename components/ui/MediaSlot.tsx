"use client";

import { WoodSwatch } from "@/components/ui/WoodSwatch";
import { cn } from "@/lib/utils";
import { essences } from "@/content/configurator/essences";
import type { SiteMedia } from "@/content/media";

interface MediaSlotProps {
  media: SiteMedia;
  className?: string;
}

// Renderer unico per un valore di content/media.ts: mostra il placeholder
// dichiarato (texture procedurale) finché la voce resta { kind:
// "placeholder" }, la foto/video reale non appena il registro viene
// aggiornato — nessun componente che lo usa deve cambiare (Documento 1 §3).
export function MediaSlot({ media, className }: MediaSlotProps) {
  if (media.kind === "image") {
    // eslint-disable-next-line @next/next/no-img-element -- riempimento assoluto, dimensioni intrinseche non note finché l'asset reale non arriva.
    return <img src={media.src} alt={media.alt} className={cn("h-full w-full object-cover", className)} />;
  }

  if (media.kind === "video") {
    return (
      <video
        src={media.src}
        poster={media.poster}
        aria-label={media.alt}
        muted
        loop
        playsInline
        preload="metadata"
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }

  const essence = essences.find((e) => e.id === media.essenceId) ?? essences[0]!;
  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-ink-2", className)}>
      <WoodSwatch baseColor={essence.material.baseColor} seed={essence.material.grainSeed ?? 1} className="opacity-70" />
      <span className="absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-[0.06em] text-text-dark-muted/80">
        {media.label}
      </span>
    </div>
  );
}
