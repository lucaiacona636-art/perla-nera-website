# Sitemap & Architettura dell'Informazione

> Documento 2 di 12. Definisce tutte le pagine del sito, la loro priorità (MVP vs Fase 2/3), gli URL e la struttura di navigazione.

## 1. Principio di struttura

Architettura **hub & spoke a doppio livello**, pensata per SEO topicale e per i tre pubblici (privati, professionisti, hospitality):

- **Hub di prodotto**: Legni, Resina, Tavoli su Misura → alimentano il Configuratore e le pagine dedicate a keyword cluster.
- **Hub di prova**: Collezione/Progetti → Case Study singoli → alimentano fiducia e SEO locale/referenziale.
- **Hub di servizio**: Servizi → Manutenzione e Restauro, Per Architetti, Per Hospitality → percorsi di conversione dedicati per pubblico.
- **Hub editoriale**: Blog/Giornale → alimenta topical authority e intercetta ricerche informative (parte alta del funnel).

Rispetto al brief aggiungo alcune pagine (segnalate `[proposta]`) motivate da SEO/UX/conversione; nessuna pagina "spam" per singola città — la local SEO si gestisce con **una** pagina di area servita ben fatta + schema markup, non con doppioni per ogni comune (v. documento SEO §5).

## 2. Sitemap — MVP (Fase 1)

Le 7 pagine da costruire per prime, curate al massimo livello:

```
/                                  Home
/tavoli-su-misura                  Tavoli su Misura (hub prodotto)
/configura-il-tuo-tavolo           Configuratore ("Crea il tuo tavolo")
/chi-siamo                         Chi Siamo (brand, atelier, persone)
/processo                          Il Processo artigianale
/servizi                           Servizi (panoramica, con anchor/link a Fase 2)
/contatti                          Contatti (form + mappa + NAP)
```

Pagine tecniche obbligatorie anche in MVP (non negoziabili per SEO/legale, basso sforzo):
```
/privacy
/cookie
/404
/sitemap.xml, /robots.txt          (file tecnici, non pagine di navigazione)
```

> Nota: **Collezione/Progetti** viene anticipata in forma ridotta *dentro* `/tavoli-su-misura` in MVP (griglia di 6-8 progetti con foto, senza pagine dedicate per singolo case study). Le pagine Case Study singole partono in Fase 2 quando c'è materiale fotografico sufficiente per farle bene — pubblicarle vuote danneggerebbe la percezione di qualità più che aiutare la SEO.

## 3. Sitemap completa — Fase 2 (espansione)

```
/collezione                        Collezione / Progetti (galleria completa)
/collezione/[slug-progetto]        Case Study singolo (es. /collezione/villa-affi-tavolo-noce)

/legni                             Hub Legni (le essenze)
/legni/[essenza]                   Pagina essenza singola: noce, rovere, olmo, ulivo

/resina                            Hub Resina epossidica
/resina/[colore]                   Pagina colore/tipologia resina: trasparente, nera, ...

/tavoli-legno-massello              [proposta] Pillar SEO — intento "tavoli in legno massello"
/tavoli-legno-e-resina              [proposta] Pillar SEO — intento "tavoli in legno e resina"
/tavoli-resina-epossidica           [proposta] Pillar SEO — intento "tavoli in resina epossidica"
/complementi-arredo                 Complementi d'arredo (panche, consolle, credenze, specchi)

/servizi/manutenzione-e-restauro    Manutenzione e Restauro (servizio con richiesta intervento)
/servizi/progettazione-personalizzata
/servizi/complementi-arredo

/per-architetti-e-interior-designer  Sezione professionale B2B
/hospitality                         Sezione ristoranti/hotel/locali/aziende

/faq                                 FAQ generali (+ FAQ per sezione con schema dedicato)
/giornale                            Blog / editoriale (indice)
/giornale/[slug-articolo]            Articolo singolo
/atelier                            [proposta] Showroom/laboratorio, indirizzo, visita su appuntamento — rafforza E-E-A-T e local SEO
/note-legali                        [proposta] Termini, garanzie, condizioni di vendita/preventivo
```

## 4. Sitemap — Fase 3 (predisposizione futura, non da costruire ora)

Solo architettura/placeholder, nessuna pagina reale in questa fase:

```
/account                            Area cliente (stato ordine/progetto) — richiede CRM
/negozio                            E-commerce complementi pronti (pezzi non custom)
/[locale]/...                       Internazionalizzazione (EN) se il mercato lo richiede
/preventivo/[id]                    Pagina preventivo condivisibile (link inviato al cliente dal CRM)
```

## 5. Struttura di navigazione

### Header (desktop)
```
[Logo Perla Nera]   Tavoli su Misura   Collezione   Processo   Legni & Resina   Servizi   Chi Siamo   Contatti   [CTA: Progetta il tuo tavolo]
```
- Il CTA primario è sempre visibile nell'header (sticky, contrasto alto), separato dal menu — è l'unica azione "urlata" concessa nel sistema.
- "Legni & Resina" è un mega-menu che raggruppa Legni, Resina, Tavoli su Misura per forma — evita di affollare la barra con troppe voci mantenendo profondità SEO.
- "Servizi" nel mega-menu espone anche Manutenzione/Restauro, Per Architetti, Hospitality.

### Header (mobile)
Menu a schermo intero, non drawer laterale stretto — coerente con l'impostazione editoriale: voci grandi, una per riga, CTA "Progetta il tuo tavolo" in fondo sempre visibile + tap-to-call/WhatsApp fisso.

### Footer
4 colonne: Esplora (sitemap principale) · Servizi · Per Professionisti (architetti/hospitality) · Contatti (NAP, orari, social, WhatsApp). Riga legale in fondo: P.IVA, Privacy, Cookie, Note legali.

### Breadcrumb
Presente su tutte le pagine di secondo livello e oltre (es. Collezione → Progetto, Legni → Noce), con `BreadcrumbList` schema. Assente su Home, Configuratore (per non distrarre durante il flusso) e pagine legali.

## 6. Convenzioni URL

- Minuscolo, trattini, italiano (`/tavoli-su-misura`, non `/custom-tables`) — coerente con intento di ricerca italiano e più naturale per il brand.
- Nessun parametro in URL per contenuti indicizzabili (niente `?id=123`); slug descrittivi (`/collezione/villa-affi-tavolo-noce-resina-nera`).
- Profondità massima 3 livelli dalla home per qualsiasi pagina rilevante SEO (`/collezione/[slug]`, `/legni/[essenza]`) — mantiene link equity concentrata.
- Redirect 301 pianificati fin dal giorno 1 (piano redirect vuoto ma predisposto) per qualsiasi futura ristrutturazione URL.

## 7. Rationale “no pagine spam per città”

Il brief chiede struttura local SEO per Verona/Veneto senza spam. Decisione: **una sola pagina di area servita**, integrata in Contatti/Chi Siamo, che elenca le zone realmente servite (Verona, Lago di Garda, Veneto, Nord Italia) con `LocalBusiness` + `areaServed` in schema — non pagine `/tavoli-legno-negrar`, `/tavoli-legno-bardolino`, ecc. Google penalizza pagine "doorway" quasi identiche; l'autorità locale si costruisce meglio con recensioni, NAP coerente, contenuti editoriali reali (case study con località pubblicabile) e citazioni locali (Google Business Profile, directory di settore).
