"use client";

import Link from "next/link";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { trackEvent } from "@/lib/analytics";
import type { SiteMedia } from "@/content/media";

interface ProjectCardProps {
  title: string;
  place: string;
  tags: string[];
  gradientFrom?: string;
  /** Media dal registro (content/media.ts) — se assente, usa il gradiente legacy. */
  media?: SiteMedia;
  /** Etichetta di categoria opzionale (es. "Sculture & Opere") — utile nelle
   * viste che mescolano più categorie, per non far leggere la vetrina come
   * "solo tavoli" (v. Documento 0 §1). */
  category?: string;
  /** Se presente, la card diventa un link a una vera pagina progetto
   * (v. content/case-studies.ts) e traccia view_project al click. */
  href?: string;
}

// Placeholder materico (gradiente o texture procedurale), non una foto finta
// — in attesa della fotografia reale di ogni progetto (Fase 1b, Documento 1 §3).
export function ProjectCard({ title, place, tags, gradientFrom = "from-wood-noce", media, category, href }: ProjectCardProps) {
  const body = (
    <>
      <div className="aspect-[4/3] overflow-hidden">
        {media ? <MediaSlot media={media} /> : <div className={`h-full w-full bg-gradient-to-br ${gradientFrom} to-ink-2`} />}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-text-light-muted">{place}</p>
          {category && (
            <span className="shrink-0 font-mono text-[10.5px] uppercase tracking-[0.08em] text-text-light">{category}</span>
          )}
        </div>
        <p className="mt-2 font-display text-xl">{title}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10.5px] uppercase tracking-[0.06em] border border-line-light px-2.5 py-1 text-text-light-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group block border border-line-light bg-ivory-2 transition-colors hover:border-bronze"
        onClick={() => trackEvent("view_project", { title, category })}
      >
        {body}
      </Link>
    );
  }

  return <div className="border border-line-light bg-ivory-2">{body}</div>;
}
