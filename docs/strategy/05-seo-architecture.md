# Architettura SEO

> Documento 6 di 12. Strategia SEO basata su search intent e topical authority, non su keyword stuffing. Collegato a Documento 1 (sitemap) per la mappatura URL↔keyword e a Documento 9 (performance) per Core Web Vitals.

## 1. Cluster di keyword e intent

| Cluster | Keyword principali | Intent | Pagina di atterraggio |
|---|---|---|---|
| **Materiale — legno massello** | tavoli in legno massello, tavoli design legno, tavoli artigianali italiani | Informativo/commerciale, parte alta-media funnel | `/tavoli-legno-massello`, `/legni` |
| **Materiale — legno+resina** | tavoli in legno e resina, tavoli in resina epossidica | Commerciale, riconosce già il prodotto di nicchia — utente "caldo" | `/tavoli-legno-e-resina`, `/tavoli-resina-epossidica`, `/resina` |
| **Su misura / artigianale** | tavoli su misura, tavoli artigianali | Commerciale, valuta fornitori | `/tavoli-su-misura` |
| **Local — Verona/Garda** | tavoli in legno massello Verona, tavoli resina Verona, tavoli su misura Verona, tavoli in legno Lago di Garda, falegnameria Verona, arredamento su misura Verona | Local + commerciale, alta intenzione | Home (ottimizzata local) + `/tavoli-su-misura` + pagina area servita in Contatti |
| **Informativo — editoriale** | come scegliere un tavolo in legno massello, quale essenza scegliere, quanto costa un tavolo in legno e resina, rovere o noce, cos'è il bordo vivo, come mantenere un tavolo in legno | Informativo, parte altissima funnel — costruisce topical authority e intercetta ricerche pre-acquisto | `/giornale/[slug]` |
| **Servizio — professionisti** | falegname per interior designer, fornitore tavoli su misura per ristoranti, arredi custom hospitality | Commerciale B2B | `/per-architetti-e-interior-designer`, `/hospitality` |
| **Servizio — post-vendita** | restauro tavoli in legno, manutenzione tavoli in resina, lucidatura resina epossidica | Commerciale/transazionale, funnel breve | `/servizi/manutenzione-e-restauro` |

Nessuna pagina viene creata per una sola keyword: ogni pagina copre un cluster intero con contenuto reale (testo, immagini, dati) — evita sia il keyword stuffing sia le pagine sottili.

## 2. Modello Pillar → Cluster (topical authority)

```
PILLAR: /tavoli-su-misura
  ├── /tavoli-legno-massello        (cluster: materiale)
  ├── /tavoli-legno-e-resina        (cluster: materiale)
  ├── /tavoli-resina-epossidica     (cluster: materiale)
  ├── /legni/[noce|rovere|olmo|ulivo]   (cluster: essenza)
  ├── /resina/[trasparente|nera|...]    (cluster: colore resina)
  └── /giornale/[articoli correlati]    (cluster: informativo, linka al pillar)

PILLAR: /processo
  └── /giornale/come-viene-realizzato-un-tavolo-in-legno-e-resina

PILLAR: /servizi
  ├── /servizi/manutenzione-e-restauro
  ├── /per-architetti-e-interior-designer
  └── /hospitality
```

Ogni pagina cluster linka al pillar nel corpo del testo (non solo in nav) e il pillar linka a tutti i cluster in una sezione "Approfondisci" — internal linking tematico, non footer-only.

## 3. Piano editoriale / blog ("Il Giornale")

Fase 2, ma l'architettura (`/giornale`, template articolo, schema `Article`) va predisposta da subito. Primi 8 articoli, in ordine di priorità per intent/volume atteso:

1. Legno e resina: come viene realizzato un tavolo (racconta il processo → linka a `/processo` e al configuratore)
2. Rovere o noce: quale scegliere per il tuo tavolo (→ linka `/legni`)
3. Come scegliere un tavolo in legno massello: guida pratica
4. Cos'è il bordo vivo (e perché non è un difetto)
5. Quanto costa un tavolo in legno e resina: come si forma il prezzo (senza dare un numero secco — spiega le variabili: dimensioni, essenza, complessità resina — e porta al configuratore/preventivo)
6. Come mantenere un tavolo in legno massello nel tempo (→ linka `/servizi/manutenzione-e-restauro`)
7. Legno massello vs impiallacciato: differenze reali
8. Tavoli su misura per ristoranti e hotel: cosa considerare (→ linka `/hospitality`)

Ogni articolo: 900–1500 parole, minimo 3 immagini reali con alt text descrittivo, 1 CTA contestuale (non invasiva), collegamento a 2-3 pagine di servizio/prodotto pertinenti.

## 4. Schema markup — strategia per tipo di pagina

| Tipo pagina | Schema |
|---|---|
| Tutto il sito | `Organization` + `LocalBusiness` (sede, NAP, aree servite, orari) in header/footer JSON-LD globale |
| Home | `WebSite` con `SearchAction` (se/quando presente ricerca interna) |
| Tutte le pagine di secondo livello+ | `BreadcrumbList` |
| Case study (Fase 2) | `CreativeWork` o `Product` (se rilevante mostrare come "prodotto" realizzato) + immagini con `ImageObject` |
| Servizi | `Service` con `areaServed`, `provider` → `LocalBusiness` |
| Manutenzione e Restauro | `Service` dedicato |
| FAQ (pagina e sezioni FAQ inline) | `FAQPage` |
| Articoli blog | `Article` / `BlogPosting` con `author`, `datePublished`, `dateModified` |
| Essenze/Resina (Fase 2, se venduti come "prodotto" configurabile) | `Product` con `additionalProperty` per essenza/colore, non prezzo fisso (è su preventivo — evitare `offers` con prezzo fittizio) |

`LocalBusiness` è dichiarato **una volta**, coerente su tutte le pagine (NAP identico ovunque, incluso Google Business Profile — coerenza NAP è un fattore diretto di local ranking).

## 5. Local SEO

- **NAP coerente**: stesso nome/indirizzo/telefono su sito, Google Business Profile, eventuali directory di settore (Archiproducts, Houzz se rilevante) — nessuna variazione di formato.
- **Area servita esplicita** nello schema (`areaServed`: Verona, Provincia di Verona, Lago di Garda, Veneto, Nord Italia) invece di pagine geografiche duplicate (v. Documento 1 §7).
- **Google Business Profile** attivo dal giorno del lancio, con foto reali del laboratorio e dei pezzi, categoria corretta (falegname/arredamento su misura), aggiornato in parallelo al sito.
- **Recensioni**: richiesta sistematica post-consegna (processo CRM, fuori scope tecnico del sito ma da prevedere nel workflow post-vendita).
- **Citazioni locali**: camera di commercio, associazioni di categoria artigiani Veneto, directory design/arredo — backlink locali di qualità piuttosto che link building generico.

## 6. SEO tecnica — checklist strutturale

- **HTML semantico**: un solo `<h1>` per pagina, gerarchia `h2`→`h6` senza salti, `<main>`/`<nav>`/`<header>`/`<footer>` come landmark.
- **URL puliti**: v. Documento 1 §6 (italiano, minuscolo, trattini, senza parametri per contenuto indicizzabile).
- **Canonical** autoreferenziale su ogni pagina; gestione esplicita di eventuali varianti (es. filtri collezione) con canonical verso la versione non filtrata.
- **Sitemap.xml** generata automaticamente (Next.js `sitemap.ts`), aggiornata a ogni build/pubblicazione contenuto.
- **Robots.txt** che consente il crawl di tutto tranne aree tecniche (`/api/`, eventuali route di preview CMS), con riferimento alla sitemap.
- **Open Graph / Twitter Card** su ogni pagina: immagine dedicata (non un logo generico) — per Home e Case study, immagine del prodotto reale; per servizi, immagine rappresentativa del servizio.
- **Immagini**: formato WebP/AVIF, `width`/`height` sempre dichiarati (CLS), `alt` descrittivo e specifico ("Tavolo ovale in noce massello con resina nera, vista dall'alto" non "tavolo1.jpg"), nome file leggibile prima dell'upload.
- **Core Web Vitals**: target LCP < 2.5s, CLS < 0.1, INP < 200ms — dettagli in Documento 9 (Performance). La SEO tecnica dipende direttamente da queste soglie: sono trattate come requisito, non come ottimizzazione facoltativa.
- **Dati strutturati**: validati in CI (v. Documento 11, roadmap) prima di ogni deploy in produzione, non solo controllati manualmente una volta.
- **Hreflang**: non necessario in Fase 1 (sito solo IT); predisposto in architettura per eventuale `en` futuro (Documento 1 §4).

## 7. Metadati — governance

Ogni pagina ha, obbligatoriamente, prima di andare online: title unico (≤60 car.), description unica (≤155 car.), almeno 1 immagine OG dedicata, alt text su tutte le immagini, canonical corretto. Questo è un gate di pubblicazione, non un'attività "se c'è tempo" — va integrato nel CMS (campo obbligatorio, v. Documento 11 CMS) così anche contenuti futuri (blog, case study) non possano essere pubblicati senza metadati.
