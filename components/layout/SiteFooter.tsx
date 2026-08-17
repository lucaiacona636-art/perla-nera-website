import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="surface-dark border-t border-line-dark">
      <div className="container-page py-32 lg:py-48">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <p className="font-display text-lg text-text-dark">Perla Nera</p>
            <p className="mt-3 max-w-[32ch] text-sm text-text-dark-muted">
              Studio di artigianato e design. Legno massello e resina epossidica, lavorati a Verona.
            </p>
          </div>

          <div>
            <p className="eyebrow text-text-dark-muted">Creazioni</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link className="text-text-dark-muted hover:text-text-dark transition-colors" href="/collezione">Collezione</Link></li>
              <li><Link className="text-text-dark-muted hover:text-text-dark transition-colors" href="/sculture-e-opere">Sculture &amp; Opere</Link></li>
              <li><Link className="text-text-dark-muted hover:text-text-dark transition-colors" href="/progetta">Progetta il tuo pezzo</Link></li>
              <li><Link className="text-text-dark-muted hover:text-text-dark transition-colors" href="/progetti-su-misura">Progetti su misura</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-text-dark-muted">Studio</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link className="text-text-dark-muted hover:text-text-dark transition-colors" href="/studio">Chi siamo</Link></li>
              <li><Link className="text-text-dark-muted hover:text-text-dark transition-colors" href="/servizi">Servizi</Link></li>
              <li><Link className="text-text-dark-muted hover:text-text-dark transition-colors" href="/collaborazioni">Collaborazioni</Link></li>
              <li><Link className="text-text-dark-muted hover:text-text-dark transition-colors" href="/assistenza">Assistenza</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-text-dark-muted">Contatti</p>
            <ul className="mt-4 space-y-2.5 text-sm text-text-dark-muted">
              <li>Verona, Italia</li>
              <li><a className="hover:text-text-dark transition-colors" href="mailto:info@perlanera.it">info@perlanera.it</a></li>
              <li><a className="hover:text-text-dark transition-colors" href="tel:+390000000000">+39 000 000 0000</a></li>
              <li><Link className="hover:text-text-dark transition-colors" href="/contatti">Modulo di contatto →</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-text-dark-muted">Richiedi</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link className="text-text-dark-muted hover:text-text-dark transition-colors" href="/richiedi-un-progetto">Richiedi un progetto</Link></li>
              <li><Link className="text-text-dark-muted hover:text-text-dark transition-colors" href="/assistenza">Richiedi assistenza</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line-dark pt-6 text-xs text-text-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Perla Nera. Tutti i diritti riservati.</p>
          <div className="flex gap-5">
            <Link className="hover:text-text-dark transition-colors" href="/privacy">Privacy</Link>
            <Link className="hover:text-text-dark transition-colors" href="/cookie">Cookie</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
