# Roadmap di Sviluppo

> Documento 12 di 12. Sequenza di lavoro dall'MVP curato all'espansione, coerente con l'istruzione esplicita del brief: non costruire 30 pagine subito.

## Fase 0 — Strategia (questo pacchetto di documenti)

Completata con questo documento: brand/direzione creativa, sitemap/IA, user journey, design system, content/copy, SEO, configuratore, 3D, analytics, performance, stack/CMS. Nessuna riga di codice applicativo prima di questo checkpoint, come richiesto.

## Fase 1a — Sistema applicato (le 5 pagine che validano l'intero impianto)

> Aggiornata dopo la correzione di posizionamento (Documento 0 §1) e la richiesta esplicita di vedere il sistema applicato concretamente prima di espandere. Ordine di costruzione — ogni step si appoggia sul precedente:

1. **Setup progetto**: Next.js + TypeScript + Tailwind configurato con i token del Documento 3, font self-hosted, struttura cartelle (`app/`, `components/`, `content/`, `lib/`). `content/categories.ts` modella fin da subito le categorie del brand (Documento 0 §1, Documento 7 §1), non solo i tavoli.
2. **Component library di base**: `Button`, `Section` (dark/light), `SiteHeader`/`MobileMenu`, `SiteFooter`, tipografia (`Heading`, `Eyebrow`), `FormField`, `CategoryCard` — costruiti e verificati isolatamente prima di comporre pagine reali.
3. **Home** — hero, manifesto, teaser categorie (non solo tavoli), teaser configuratore, CTA finale. Motion design (reveal, parallax leggero) applicato qui per primo e poi riusato.
4. **Studio** — chi siamo, filosofia, sguardo su materia e lavorazione: riutilizza il component system, testo scritto per lo studio nel suo insieme (Documento 5 §3).
5. **Collezione** — hub categorie (Tavoli con contenuto reale, le altre "in arrivo" ma visibili, Documento 1 §2) + griglia progetti per la categoria Tavoli.
6. **Configuratore** — la funzionalità più complessa: store Zustand con `categoryId` (Documento 7 §4), step 0 di selezione categoria, schema Tavoli completo, schema `free-brief` per le altre categorie, preview fallback fotografica **prima** del 3D.
7. **Richiedi un progetto** — form standalone che riusa lo stesso endpoint/payload lead del configuratore (Documento 7 §6).
8. **Layer 3D** — flagship Home + preview live configuratore (Documento 8), integrato per ultimo e sempre lazy/opzionale.
9. **SEO tecnica di base** su queste 5 pagine: metadata, sitemap.xml/robots.txt, schema `Organization`/`LocalBusiness`, Open Graph.
10. **Analytics**: GTM + Consent Mode + eventi core con `category_id` (Documento 9 §3).
11. **QA**: Lighthouse (Documento 9 §1), test e2e flusso configuratore→lead, accessibilità (Documento 3 §10), matrice responsive (Documento 9 §5).

## Fase 1b — Completamento MVP (subito dopo, stessa qualità)

Pagine già previste in architettura (Documento 1 §3), costruite non appena la Fase 1a è stabile: Progetti/Case Study, Servizi (+ Progettazione su misura, Consegna e installazione, Cura e manutenzione), Processo, Materiali (Legni, Resina), Assistenza/FAQ, Contatti dedicata. Chiusura Fase 1 con Google Business Profile attivo, Search Console verificata, sitemap sottomessa.

## Fase 2 — Espansione (dopo validazione con traffico/lead reali)

Ordine indicativo, guidato dai dati raccolti in Fase 1 più che da un piano rigido:

- Migrazione contenuti da content-as-code a **Sanity CMS** (Documento 10 §4).
- **Attivazione di una seconda categoria reale** (Complementi d'arredo o Oggetti di design, secondo quale genera più interesse negli eventi `start_configurator`/`category_id` — Documento 7 §8): primo catalogo, primi pezzi in Collezione, eventuale nuovo `ConfigurationSchema` che riusa gli step-type esistenti.
- Pillar SEO (`/tavoli-legno-massello`, `/tavoli-legno-e-resina`, `/tavoli-resina-epossidica`) e primi articoli del **Giornale** (Documento 6 §3).
- **Per Architetti e Interior Designer** e **Hospitality** come sezioni dedicate con form specifici (Documento 2 §3-4).
- **3D nei case study** più fotogenici (Documento 8 §1).
- Sincronizzazione lead → CRM esterno (HubSpot/Pipedrive) al posto della sola tabella `leads` MVP.

## Fase 3 — Predisposizione futura (solo architettura, non costruzione)

Da tenere presente nelle decisioni tecniche di Fase 1-2 così da non doverle riscrivere: area e-commerce per complementi pronti (`/negozio`), area cliente/CRM (`/account`), marketing automation (nurturing lead non ancora convertiti), eventuale internazionalizzazione (`en`). Nessuna di queste è costruita ora — l'architettura dati (Documenti 6-7, 10) è scelta apposta per non richiedere una riscrittura quando questi moduli verranno attivati (es. tabella `leads` già compatibile con un CRM, cataloghi già a forma di CMS collection, routing già predisposto per un futuro prefisso `/[locale]`).

## Criterio di avanzamento tra fasi

Non si passa a un punto della lista successiva finché quello corrente non rispetta gli standard dei Documenti 3 (design system), 9 (performance) e SEO tecnica (Documento 6) — coerente con l'istruzione del brief di non sacrificare UX/performance/SEO per velocità o effetti visivi.
