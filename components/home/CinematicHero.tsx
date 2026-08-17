"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { WoodSwatch } from "@/components/ui/WoodSwatch";
import { cn } from "@/lib/utils";
import { media, type SiteMedia } from "@/content/media";
import { essences } from "@/content/configurator/essences";

// Cinematic Hero — apertura narrativa della Home (Documento 8 §1 esteso).
// Il media parte contenuto e si espande seguendo lo SCROLL NATIVO della
// pagina: nessun wheel/touch hijack, nessun preventDefault, nessun
// window.scrollTo forzato. GSAP ScrollTrigger legge soltanto la posizione
// di scroll (stesso pattern già in uso per la rotazione 3D altrove nel
// sito) e la mappa su transform/border-radius/opacity — mai su width o
// height, per restare sul compositor e non causare reflow.
//
// Il posizionamento "sticky" (non GSAP pin) tiene il contenuto fermo nel
// viewport mentre la sezione-contenitore, più alta, scorre sotto: lo scroll
// del documento avanza sempre normalmente, la pagina non si blocca mai.

const CONTAINED_SCALE = 0.5;
const CONTAINED_RADIUS = 28;
const TEXT_FADE_THRESHOLD = 0.6;

function resolvePlaceholderEssence(essenceId: string) {
  return essences.find((e) => e.id === essenceId) ?? essences[0]!;
}

function HeroMediaFill({ media: heroMedia }: { media: SiteMedia }) {
  if (heroMedia.kind === "image") {
    // eslint-disable-next-line @next/next/no-img-element -- riempimento assoluto dietro overlay animati; next/image gestito quando arriva l'asset reale.
    return <img src={heroMedia.src} alt={heroMedia.alt} className="absolute inset-0 h-full w-full object-cover" />;
  }

  if (heroMedia.kind === "video") {
    return (
      <video
        src={heroMedia.src}
        poster={heroMedia.poster}
        aria-label={heroMedia.alt}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }

  const essence = resolvePlaceholderEssence(heroMedia.essenceId);
  return (
    <div className="absolute inset-0 h-full w-full bg-ink-2">
      <WoodSwatch baseColor={essence.material.baseColor} seed={essence.material.grainSeed ?? 1} className="opacity-60" />
      <span className="absolute bottom-4 left-4 hidden font-mono text-[10px] uppercase tracking-[0.08em] text-text-dark-muted/80 sm:block">
        {heroMedia.label} — placeholder temporaneo
      </span>
    </div>
  );
}

export function CinematicHero() {
  const wrapperRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [reducedMotionResolved, setReducedMotionResolved] = useState(false);
  const [textDismissed, setTextDismissed] = useState(false);

  const heroMedia = media.home.cinematicHero;

  useLayoutEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    setReducedMotionResolved(true);
    const onChange = () => setReducedMotion(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const wrapper = wrapperRef.current;
    const mediaEl = mediaRef.current;
    const textEl = textRef.current;
    const overlayEl = overlayRef.current;
    if (!wrapper || !mediaEl || !textEl || !overlayEl) return;

    let cancelled = false;
    let trigger: import("gsap/ScrollTrigger").ScrollTrigger | undefined;

    // GSAP/ScrollTrigger caricato dinamicamente: fuori dal bundle critico
    // della Home, come per la rotazione 3D (Documento 9).
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
          onUpdate: (self) => setTextDismissed(self.progress > TEXT_FADE_THRESHOLD),
        },
      });

      tl.to(mediaEl, { scale: 1, borderRadius: 0, ease: "none", duration: 0.7 }, 0);
      tl.to(textEl, { opacity: 0, y: -24, ease: "none", duration: 0.4 }, 0.1);
      tl.to(overlayEl, { opacity: 0.5, ease: "none", duration: 0.3 }, 0.65);

      trigger = tl.scrollTrigger;
    });

    return () => {
      cancelled = true;
      trigger?.kill();
    };
  }, [reducedMotion]);

  // Video: play/pause legato alla visibilità (LazyMount pattern, Documento 8
  // §4) — logica indipendente dall'animazione di scroll, così quando il
  // media diventa un video reale non serve toccare l'espansione.
  useEffect(() => {
    if (heroMedia.kind !== "video" || !videoRef.current) return;
    const el = videoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [heroMedia.kind]);

  const staticFallback = !reducedMotionResolved || reducedMotion;

  return (
    <section
      ref={wrapperRef}
      className={cn(
        "surface-dark relative",
        staticFallback ? "min-h-[92vh]" : "h-[150vh] sm:h-[170vh] lg:h-[195vh]"
      )}
    >
      <div className={cn("sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden", staticFallback && "static min-h-[92vh]")}>
        <div
          ref={mediaRef}
          className="absolute inset-0 overflow-hidden"
          style={
            staticFallback
              ? { borderRadius: 0 }
              : { transform: `scale(${CONTAINED_SCALE})`, borderRadius: CONTAINED_RADIUS }
          }
        >
          <HeroMediaFill media={heroMedia} />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/25 to-ink/70" />
        </div>

        <div
          ref={textRef}
          inert={textDismissed || undefined}
          className={cn(
            "container-page relative z-10 flex flex-col items-center px-5 text-center transition-[opacity] duration-300",
            textDismissed && "opacity-0"
          )}
        >
          <span className="eyebrow text-text-dark-muted">Studio di artigianato e design — Verona</span>
          <h1 className="mt-5 max-w-[16ch] text-[2.5rem] leading-[1.05] sm:text-6xl lg:text-[5.5rem]">
            Materia. Tempo. Unicità.
          </h1>
          <p className="mt-6 max-w-[54ch] text-lg text-text-dark-muted sm:text-xl">
            Legno massello e resina epossidica, lavorati a mano in pezzi
            unici — tavoli, complementi d&rsquo;arredo, sculture e progetti
            su misura, pensati attorno al tuo spazio.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Button href="/progetta">Progetta il tuo pezzo</Button>
            <Button href="/studio" variant="secondary">Scopri Perla Nera</Button>
          </div>
        </div>

        <div ref={overlayRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 bg-ink opacity-0" />
      </div>
    </section>
  );
}
