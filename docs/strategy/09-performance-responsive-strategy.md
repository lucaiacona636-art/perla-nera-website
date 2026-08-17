# Performance & Responsive Strategy

> Documento 10 di 12. La performance è un requisito di prodotto, non un'ottimizzazione finale — condiziona SEO (Documento 6), percezione di qualità del brand (Documento 0) e usabilità del configuratore/3D (Documenti 7-8).

## 1. Target Core Web Vitals (soglie di accettazione, non aspirazionali)

| Metrica | Target | Pagine critiche |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.0s (target interno, sotto la soglia "good" di 2.5s) | Home, Tavoli su misura, Configuratore |
| CLS (Cumulative Layout Shift) | < 0.05 | Tutte — critico dove ci sono immagini/gallerie |
| INP (Interaction to Next Paint) | < 200ms | Configuratore (ogni cambio step deve sentirsi istantaneo) |
| TTFB | < 600ms | Tutte (dipende anche da hosting, v. Documento 11) |

Verifica in CI (Lighthouse CI su ogni PR verso le pagine principali) + monitoraggio reale via Search Console/GA4 (Documento 9 §6) — due fonti, laboratorio e campo, perché divergono spesso.

## 2. Immagini

- **Formato**: AVIF con fallback WebP (gestito automaticamente da `next/image`), mai JPEG/PNG serviti direttamente in produzione.
- **Responsive images**: `srcset`/`sizes` generati automaticamente per ogni breakpoint (Documento 3 §9) — nessuna immagine a piena risoluzione desktop scaricata su mobile.
- **Dimensioni dichiarate sempre** (`width`/`height` o `fill` con container proporzionato) — zero CLS da immagini.
- **Lazy loading** di default su tutto tranne l'immagine LCP di ogni pagina (hero), che è invece precaricata (`priority`/`fetchpriority="high"`) per non penalizzare proprio la metrica che più conta.
- **Pipeline di origine**: le foto prodotto (che saranno il vero contenuto pregiato del sito) vengono ottimizzate alla fonte — risoluzione massima ragionata (non caricare 12MB da fotocamera), color profile sRGB, compressione prima dell'upload nel CMS.

## 3. Font

- Self-hosted (Fraunces, Inter, IBM Plex Mono — Documento 3 §2) invece di caricarli dal CDN Google Fonts: elimina una richiesta a dominio terzo, migliora privacy/consenso (Documento 9 §5) e dà controllo totale sulla cache.
- Subsetting ai soli caratteri latini estesi necessari (niente cirillico/greco/CJK se non richiesto).
- `font-display: swap` per evitare testo invisibile (FOIT) — il layout può spostarsi minimamente al cambio font, mitigato con `size-adjust`/font di fallback dimensionalmente simili dichiarati esplicitamente.
- Preload solo del font di peso più usato in above-the-fold (Inter 400/500, Fraunces 500) — non tutti i pesi disponibili.

## 4. JavaScript & code splitting

- **Il layer 3D (R3F/Three.js/drei) non è mai nel bundle iniziale** di nessuna route (Documento 8 §4) — `next/dynamic` con caricamento on-demand.
- Ogni pagina carica solo i componenti che usa: niente "bundle unico" con tutto il sito — Next.js App Router con React Server Components di default, `"use client"` solo dove serve interattività reale (configuratore, header sticky, gallerie, form).
- GSAP importato solo nei moduli che lo usano (sequenza scroll 3D Home) via dynamic import, non globale.
- Terze parti (GTM, Meta Pixel) caricate **dopo** il consenso e comunque in modo asincrono/differito — mai bloccanti per il rendering iniziale.

## 5. Strategia responsive

- **Mobile-first** in ogni componente (Documento 3 §9): si scrive prima lo stile base (mobile), poi si aggiunge complessità ai breakpoint superiori — mai il contrario.
- Matrice di verifica manuale prima di ogni rilascio: `375px` (mobile piccolo, caso peggiore reale), `768px` (tablet), `1024px` (desktop piccolo/laptop), `1440px` (desktop standard), `1920px+` (schermi grandi, richiesti esplicitamente dal brief).
- Touch target ≥ 44×44px, gestures naturali (no swipe custom che confligge con lo scroll nativo) su gallerie e configuratore mobile.
- Orientamento landscape su mobile testato esplicitamente per il configuratore (è il caso d'uso più probabile per confrontare proporzioni di un tavolo).

## 6. Performance budget indicativo per tipo di pagina

| Tipo pagina | JS iniziale (gzip) | LCP asset max | Note |
|---|---|---|---|
| Home | ≤ 150KB (esclusa sezione 3D, lazy) | ≤ 200KB (immagine hero ottimizzata) | Sezione 3D caricata solo a scroll/viewport |
| Pagine editoriali (Chi Siamo, Processo, Servizi) | ≤ 100KB | ≤ 200KB | Nessun 3D, motion leggero |
| Configuratore | ≤ 250KB base + layer 3D lazy separato | — | Il canvas 3D è isolato, misurato a parte, non conta nel budget di primo caricamento della shell UI |
| Collezione/Case study | ≤ 120KB | ≤ 250KB per immagine gallery visibile | Lightbox caricata on-demand |

Questi numeri sono soglie di allarme in CI, non limiti teorici — se una PR li supera, va giustificata esplicitamente prima del merge (v. Documento 11, roadmap/processo).
