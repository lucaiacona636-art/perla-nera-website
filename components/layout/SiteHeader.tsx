"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/collezione", label: "Collezione" },
  { href: "/studio", label: "Studio" },
  { href: "/richiedi-un-progetto", label: "Richiedi un progetto" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    // Header e overlay mobile sono fratelli, non annidati: un discendente
    // `fixed` dentro un antenato anch'esso `fixed` risolve l'altezza in modo
    // inconsistente tra browser — tenerli allo stesso livello evita il bug.
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled || menuOpen ? "bg-ink/95 backdrop-blur-sm border-b border-line-dark" : "bg-transparent"
        )}
      >
        <div className="container-page flex h-20 items-center justify-between">
          <Link href="/" className="font-display text-lg tracking-wide text-text-dark" onClick={() => setMenuOpen(false)}>
            Perla Nera
          </Link>

          <nav className="hidden lg:flex items-center gap-9">
            {navLinks.map((link) => (
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
            <div className="container-page flex flex-col gap-2 py-9">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-4 font-display text-3xl text-text-dark border-b border-line-dark"
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
