# Stack Tecnologico & CMS

> Documento 11 di 12. Valutazione (non solo conferma) dello stack indicato nel brief, più raccomandazione CMS/hosting/backend minimo per il lead capture.

## 1. Valutazione dello stack proposto

Il brief indica Next.js/TypeScript/React/Tailwind/R3F/GSAP "se necessario", chiedendo però di verificarne l'idoneità prima di procedere. Confronto sintetico:

| Alternativa considerata | Perché scartata per questo progetto |
|---|---|
| **WordPress + page builder** (Elementor/Divi) | Rapido da avviare ma incompatibile con gli obiettivi: Core Web Vitals difficili da controllare, 3D/R3F non ha integrazione nativa, il configuratore richiederebbe comunque un'app React separata — risultato ibrido, non "moderno tra 3-5 anni" come richiesto. |
| **Astro** | Eccellente per siti a contenuto statico/performance estrema, ma il configuratore è un'applicazione stateful complessa (store, step, 3D live) — Astro richiederebbe comunque "isole" React per quella parte; si perderebbe la coerenza SSR/RSC di Next.js senza guadagni reali dato che il sito non è puro contenuto statico. |
| **Remix / Vite SPA pura** | Remix è valido ma l'ecosistema Next.js (image optimization nativa, App Router/RSC, integrazione Vercel, community R3F) è più maturo specificamente per questo mix (marketing site + app 3D interattiva). Una SPA pura perderebbe SSR/SEO out-of-the-box, rischioso per un progetto dove la SEO è priorità dichiarata. |
| **Nuxt/Vue** | Stack valido in astratto, ma R3F (React Three Fiber) è l'integrazione React↔Three.js più matura e documentata rispetto all'equivalente Vue (TresJS, più giovane) — per un progetto dove il 3D è funzionalità centrale, conviene lo stack con l'ecosistema 3D più consolidato. |

**Conclusione**: lo stack proposto nel brief è confermato come il migliore per questo specifico progetto — non per default, ma perché è l'unico che soddisfa contemporaneamente: SEO/SSR forte, performance controllabile, integrazione 3D matura, e capacità di gestire un'app stateful complessa (configuratore) nello stesso framework del sito di marketing, senza due codebase separate.

## 2. Stack confermato

```
Framework:        Next.js (App Router, React Server Components)
Linguaggio:        TypeScript, strict mode
UI:                 React 19+ · Tailwind CSS (design tokens da Documento 3)
Stato applicativo:  Zustand (store configuratore, v. Documento 7)
3D:                 React Three Fiber + drei · GSAP solo per orchestrazione scroll (Documento 8)
Form/validazione:   React Hook Form + Zod (validazione dati coerente client/server, stesso schema)
Animazioni 2D:      Framer Motion (reveal, transizioni pagina) — libreria nativa React, meno codice
                    imperativo di GSAP per i casi semplici; GSAP resta riservato ai casi realmente
                    complessi (Documento 8), evitando due librerie che si sovrappongono ovunque.
```

## 3. Backend minimo per il lead capture (MVP, senza CRM completo)

Il brief non richiede un CRM in Fase 1, ma il configuratore deve comunque affidabilmente raccogliere e notificare i lead:

- **Route Handler Next.js** (`/api/lead`) che valida il payload (stesso schema Zod usato nel form) e lo scrive su un database minimo.
- **Database**: Postgres gestito (es. Supabase o Neon, entrambi con region EU disponibile — rilevante per GDPR/data residency) — una singola tabella `leads` in MVP, sufficiente a non perdere nessuna richiesta e già pronta per essere sincronizzata verso un CRM vero in Fase 2 (HubSpot/Pipedrive) via integrazione successiva.
- **Notifica**: email transazionale (es. Resend) sia al team Perla Nera sia di conferma al cliente, inviata dallo stesso Route Handler dopo la scrittura su DB — nessuna dipendenza da automazioni esterne per il funzionamento base.
- **Upload immagini** (allegati configuratore/restauro): storage oggetti compatibile S3 (es. Supabase Storage) con URL firmati, mai file caricati direttamente nel filesystem dell'app.

Questo layer è deliberatamente minimo: fa "una cosa" (non perdere lead) senza costruire un CRM che il brief esplicitamente colloca in Fase futura.

## 4. CMS — raccomandazione

**Fase 1 (MVP): content-as-code.** Con 7 pagine e cataloghi di configuratore piccoli (4 essenze, poche forme/resine), un CMS headless completo sarebbe complessità prematura. Testi e cataloghi vivono come file TypeScript/MDX tipizzati nel repo (`content/`), versionati in Git, modificabili via PR — coerente con "non complicare inutilmente la prima versione".

**Fase 2 (quando entrano blog, case study multipli, cataloghi in crescita): Sanity.io come CMS headless.**

| Motivo | Dettaglio |
|---|---|
| Content modeling strutturato | Adatto 1:1 ai modelli già definiti (Documento 7 §1: `CatalogOption`, e i tipi Progetto/Servizio/Articolo/FAQ) — nessun redesign dei dati, solo migrazione della fonte. |
| Pipeline immagini nativa | CDN + trasformazioni on-the-fly (resize, formato) — rilevante per un sito fotografia-intensivo come questo, riduce lavoro manuale di ottimizzazione (Documento 9 §2). |
| Editing non tecnico | Interfaccia (Sanity Studio) personalizzabile, utilizzabile da chi in Perla Nera gestirà i contenuti senza toccare codice. |
| Integrazione Next.js | `next-sanity` maturo, preview live, ISR compatibile — nessun compromesso su performance/SEO nel passaggio da file statici a CMS. |
| Data residency EU | Disponibile su piani a pagamento — da verificare/attivare in Fase 2 per piena conformità GDPR se richiesto. |

**Alternativa se si preferisce autogestione/self-hosting completo dei dati**: **Payload CMS** (TypeScript-nativo, database proprio, self-hosted su infrastruttura scelta) — più controllo e sovranità del dato, meno "batteries included" sulla pipeline immagini rispetto a Sanity. Da valutare in Fase 2 solo se la sovranità del dato è un requisito esplicito del cliente più che una preferenza tecnica.

## 5. Hosting

**Vercel** (creatore di Next.js): integrazione nativa con App Router/RSC/image optimization, edge network con region EU, deploy preview automatici per ogni PR (utili anche per QA design/copy prima del merge, e per il container GTM di staging — Documento 9 §2). Alternativa self-hosted (Docker su VPS EU) resta possibile senza cambi architetturali se in futuro serve maggiore controllo infrastrutturale.

## 6. Qualità & CI

- **TypeScript strict** ovunque, nessun `any` implicito.
- **Lighthouse CI** su ogni PR per le pagine principali (soglie Documento 9 §6 come gate, non solo warning).
- **Playwright** per test end-to-end del flusso critico (configuratore completo → invio lead) — è l'unico flusso dove un bug in produzione costa direttamente un lead perso, quindi l'unico che giustifica test e2e fin dall'MVP.
- **Validazione schema strutturati** (JSON-LD) in CI prima del deploy (Documento 6 §6).
