"use client";

import { WoodSwatch } from "@/components/ui/WoodSwatch";
import { cn } from "@/lib/utils";
import { essences } from "@/content/configurator/essences";
import { isGeneratedMedia, type SiteMedia } from "@/content/media";

interface MediaSlotProps {
  media: SiteMedia;
  className?: string;
}

// Badge discreto per gli asset generati (Higgsfield): segnala che si tratta
// di una direzione progettuale/esempio, non di un progetto realizzato — mai
// la dicitura tecnica "immagine AI" in interfaccia (richiesta esplicita del
// cliente), ma comunque onesto sulla natura del contenuto.
function GeneratedBadge() {
  return (
    <span className="pointer-events-none absolute left-3 top-3 z-10 border border-ivory/40 bg-ink/70 px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.08em] text-ivory backdrop-blur-sm">
      Direzione progettuale
    </span>
  );
}

// Renderer unico per un valore di content/media.ts: mostra il placeholder
// dichiarato (texture procedurale) finché la voce resta { kind:
// "placeholder" }, la foto/video reale non appena il registro viene
// aggiornato — nessun componente che lo usa deve cambiare (Documento 1 §3).
export function MediaSlot({ media, className }: MediaSlotProps) {
  if (media.kind === "image") {
    return (
      <div className={cn("relative h-full w-full overflow-hidden", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element -- riempimento assoluto, dimensioni intrinseche non note finché l'asset reale non arriva. */}
        <img src={media.src} alt={media.alt} className="h-full w-full object-cover" />
        {isGeneratedMedia(media) && <GeneratedBadge />}
      </div>
    );
  }

  if (media.kind === "video") {
    return (
      <div className={cn("relative h-full w-full overflow-hidden", className)}>
        <video
          src={media.src}
          poster={media.poster}
          aria-label={media.alt}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
        {isGeneratedMedia(media) && <GeneratedBadge />}
      </div>
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
