# Roadmap di Sviluppo

> Documento 12 di 12. Sequenza di lavoro dall'MVP curato all'espansione, coerente con l'istruzione esplicita del brief: non costruire 30 pagine subito.

## Fase 0 — Strategia (questo pacchetto di documenti)

Completata con questo documento: brand/direzione creativa, sitemap/IA, user journey, design system, content/copy, SEO, configuratore, 3D, analytics, performance, stack/CMS. Nessuna riga di codice applicativo prima di questo checkpoint, come richiesto.

## Fase 1 — MVP curato (obiettivo: qualità prima di copertura)

Ordine di costruzione consigliato — ogni step si appoggia sul precedente, evita di scrivere componenti "alla cieca" prima che il sistema sia stabile:

1. **Setup progetto**: Next.js + TypeScript + Tailwind configurato con i token del Documento 3 (colori, tipografia, spaziatura come CSS variables/Tailwind theme), font self-hosted, struttura cartelle (`app/`, `components/`, `content/`, `lib/`).
2. **Component library di base**: `Button`, `Section` (dark/light), `SiteHeader`/`MobileMenu`, `SiteFooter`, tipografia (`Heading`, `Eyebrow`), `FormField` — costruiti e verificati isolatamente (storybook-like o pagina `/dev/components`) prima di comporre pagine reali, per garantire coerenza invece di ripetere stili pagina per pagina.
3. **Home page** — la pagina più importante per la prima impressione: hero, manifesto, teaser sezioni (Documento 5 §2), CTA finale. Motion design (reveal, parallax leggero) applicato qui per primo e poi riusato.
4. **Tavoli su misura** — hub prodotto con griglia progetti (versione ridotta della futura Collezione, Documento 1 §2).
5. **Chi Siamo, Processo, Servizi** — pagine editoriali, riutilizzano interamente il component system già pronto: velocità di costruzione alta se gli step 1-2 sono solidi.
6. **Contatti** — form + NAP + mappa; è anche il primo punto in cui si integra l'endpoint lead (Documento 10 §3), riusato poi dal configuratore.
7. **Configuratore** — la funzionalità più complessa: store Zustand, cataloghi dati (Documento 6 §1), step UI, preview fallback fotografica **prima** del 3D (garantisce un configuratore funzionante anche se il 3D richiede più iterazioni).
8. **Layer 3D** — flagship Home + preview live configuratore (Documento 8), integrato per ultimo e sempre lazy/opzionale rispetto a un sito già completo e funzionante senza di esso.
9. **SEO tecnica di base**: metadata per ogni pagina MVP, sitemap.xml/robots.txt, schema `Organization`/`LocalBusiness`, Open Graph.
10. **Analytics**: GTM + Consent Mode + eventi core (`start_configurator`, `submit_lead`, ecc.).
11. **QA finale**: Lighthouse (Documento 9 §1), test e2e flusso configuratore→lead (Documento 10 §6), verifica accessibilità (Documento 3 §10), verifica responsive sulla matrice breakpoint (Documento 9 §5).
12. **Lancio MVP** + Google Business Profile attivo in parallelo (Documento 6 §5) + Search Console verificata e sitemap sottomessa.

## Fase 2 — Espansione (dopo validazione MVP con traffico/lead reali)

Ordine indicativo, guidato dai dati raccolti in Fase 1 più che da un piano rigido:

- Migrazione contenuti da content-as-code a **Sanity CMS** (Documento 10 §4).
- **Collezione completa** + **Case study singoli** (richiede materiale fotografico/video accumulato nel frattempo).
- **Legni** e **Resina** come hub dedicati con pagine per singola essenza/colore.
- Pillar SEO (`/tavoli-legno-massello`, `/tavoli-legno-e-resina`, `/tavoli-resina-epossidica`) e primi articoli del **Giornale** (Documento 6 §3).
- **Per Architetti e Interior Designer** e **Hospitality** come sezioni dedicate con form specifici (Documento 2 §3-4).
- **Manutenzione e Restauro** come servizio strutturato (descrizione, processo, richiesta intervento con upload foto — stesso pattern tecnico del configuratore, Documento 7 §5).
- **3D nei case study** più fotogenici (Documento 8 §1).
- **FAQ** completa con schema dedicato per sezione.
- Sincronizzazione lead → CRM esterno (HubSpot/Pipedrive) al posto della sola tabella `leads` MVP.

## Fase 3 — Predisposizione futura (solo architettura, non costruzione)

Da tenere presente nelle decisioni tecniche di Fase 1-2 così da non doverle riscrivere: area e-commerce per complementi pronti (`/negozio`), area cliente/CRM (`/account`), marketing automation (nurturing lead non ancora convertiti), eventuale internazionalizzazione (`en`). Nessuna di queste è costruita ora — l'architettura dati (Documenti 6-7, 10) è scelta apposta per non richiedere una riscrittura quando questi moduli verranno attivati (es. tabella `leads` già compatibile con un CRM, cataloghi già a forma di CMS collection, routing già predisposto per un futuro prefisso `/[locale]`).

## Criterio di avanzamento tra fasi

Non si passa a un punto della lista successiva finché quello corrente non rispetta gli standard dei Documenti 3 (design system), 9 (performance) e SEO tecnica (Documento 6) — coerente con l'istruzione del brief di non sacrificare UX/performance/SEO per velocità o effetti visivi.
