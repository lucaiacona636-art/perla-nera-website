"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { categories } from "@/content/categories";

const primaryLinks = [
  { href: "/servizi", label: "Servizi" },
  { href: "/studio", label: "Studio" },
  { href: "/contatti", label: "Contatti" },
];

const mobileLinks = [
  { href: "/collezione", label: "Collezione" },
  { href: "/servizi", label: "Servizi" },
  { href: "/progetti-su-misura", label: "Progetti su misura" },
  { href: "/sculture-e-opere", label: "Sculture & Opere" },
  { href: "/collaborazioni", label: "Collaborazioni" },
  { href: "/studio", label: "Studio" },
  { href: "/assistenza", label: "Assistenza" },
  { href: "/contatti", label: "Contatti" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [collezioneOpen, setCollezioneOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function openCollezione() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setCollezioneOpen(true);
  }
  function scheduleCloseCollezione() {
    closeTimer.current = setTimeout(() => setCollezioneOpen(false), 120);
  }

  return (
    // Header e overlay mobile sono fratelli, non annidati: un discendente
    // `fixed` dentro un antenato anch'esso `fixed` risolve l'altezza in modo
    // inconsistente tra browser — tenerli allo stesso livello evita il bug.
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled || menuOpen || collezioneOpen ? "bg-ink/95 backdrop-blur-sm border-b border-line-dark" : "bg-transparent"
        )}
      >
        <div className="container-page flex h-20 items-center justify-between">
          <Link href="/" className="font-display text-lg tracking-wide text-text-dark" onClick={() => setMenuOpen(false)}>
            Perla Nera
          </Link>

          <nav className="hidden lg:flex items-center gap-9">
            <div className="relative" onMouseEnter={openCollezione} onMouseLeave={scheduleCloseCollezione}>
              <button
                type="button"
                className="font-sans text-[15px] text-text-dark-muted hover:text-text-dark transition-colors"
                aria-expanded={collezioneOpen}
                onClick={() => setCollezioneOpen((v) => !v)}
              >
                Collezione
              </button>
              <AnimatePresence>
                {collezioneOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 top-full mt-3 w-[340px] -translate-x-1/2 border border-line-dark bg-ink p-2"
                  >
                    {categories.map((c) => (
                      <Link
                        key={c.id}
                        href={c.status === "available" ? "/collezione" : "/progetta"}
                        onClick={() => setCollezioneOpen(false)}
                        className="flex items-center justify-between gap-3 px-3 py-2.5 text-sm text-text-dark hover:bg-ink-2 transition-colors"
                      >
                        {c.label}
                        {c.status === "coming-soon" && (
                          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-text-dark-muted">In arrivo</span>
                        )}
                      </Link>
                    ))}
                    <div className="mt-1 border-t border-line-dark pt-2">
                      <Link
                        href="/sculture-e-opere"
                        onClick={() => setCollezioneOpen(false)}
                        className="block px-3 py-2.5 text-sm text-bronze-hi hover:bg-ink-2 transition-colors"
                      >
                        Sculture &amp; Opere →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-[15px] text-text-dark-muted hover:text-text-dark transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/progetta"
              className="inline-flex items-center rounded-sm bg-ivory px-6 py-3 font-sans text-sm font-semibold text-ink transition-colors hover:bg-white"
            >
              Progetta il tuo pezzo
            </Link>
          </nav>

          <button
            type="button"
            className="relative h-10 w-10 lg:hidden text-text-dark"
            aria-label={menuOpen ? "Chiudi il menu" : "Apri il menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className={cn(
                "absolute left-1/2 top-1/2 block h-px w-6 -translate-x-1/2 bg-current transition-transform duration-200",
                menuOpen ? "rotate-45" : "-translate-y-[5px]"
              )}
            />
            <span
              className={cn(
                "absolute left-1/2 top-1/2 block h-px w-6 -translate-x-1/2 bg-current transition-transform duration-200",
                menuOpen ? "-rotate-45" : "translate-y-[5px]"
              )}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-x-0 top-20 bottom-0 z-40 bg-ink overflow-y-auto"
          >
            <div className="container-page flex flex-col gap-1 py-9">
              {mobileLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 * i, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 font-display text-2xl text-text-dark border-b border-line-dark"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/progetta"
                onClick={() => setMenuOpen(false)}
                className="mt-8 inline-flex items-center justify-center rounded-sm bg-ivory px-7 py-4 font-sans font-semibold text-ink"
              >
                Progetta il tuo pezzo
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
