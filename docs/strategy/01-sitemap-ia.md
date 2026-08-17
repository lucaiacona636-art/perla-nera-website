# Sitemap & Architettura dell'Informazione

> Documento 2 di 12. Definisce tutte le pagine del sito, la loro priorità (MVP vs Fase 2/3), gli URL e la struttura di navigazione.
>
> **Nota di revisione**: la versione precedente organizzava il sito intorno ai tavoli come prodotto centrale. Corretto — v. Documento 0 §1: Perla Nera è uno studio di artigianato e design, i tavoli sono una categoria (oggi la più matura), non il perimetro del brand. La sitemap sotto riflette un'architettura **per categoria di pezzo**, pensata per restare valida quando tra un anno si aggiunge una categoria che oggi non esiste.

## 1. Principio di struttura

Architettura **hub & spoke a tre assi**, non più a due:

- **Asse categoria** (*cosa realizziamo*): Collezione → categorie (Tavoli, Complementi d'arredo, Oggetti di design, Pezzi scultorei/Opere, Progetti speciali) → singolo pezzo/prodotto. Ogni categoria è un record dati (Documento 6 §1 aggiornato), non una sezione scritta a mano — aggiungerne una nuova è un'operazione di contenuto, mai di ristrutturazione del sito.
- **Asse progetto** (*cosa abbiamo realizzato*): Progetti/Case Study → singolo progetto, che può attraversare più categorie (es. un progetto hospitality con tavoli **e** complementi d'arredo nello stesso ambiente). Distinto dall'asse categoria perché risponde a una domanda diversa: non "che tipo di pezzo cerco" ma "cosa avete già fatto per un caso come il mio".
- **Asse servizio** (*come lavoriamo*): Studio, Processo, Materiali, Servizi (con le sotto-pagine Progettazione su misura, Consegna e installazione, Cura e manutenzione) → funzionale a tutte le categorie contemporaneamente, mai scritto pensando solo ai tavoli.

Il Configuratore (Documento 6-7, aggiornati) è il punto di convergenza dei tre assi: si entra scegliendo una categoria (asse 1), ispirandosi eventualmente a un progetto reale (asse 2), e si esce con una richiesta gestita secondo lo stesso servizio (asse 3) qualunque sia la categoria.

## 2. Sitemap — pagine da costruire ora

Le 5 pagine indicate come priorità per validare il sistema end-to-end, costruite con la massima cura prima di espandere:

```
/                                  Home
/collezione                        Collezione — hub categorie (Tavoli con contenuto reale;
                                    Complementi, Oggetti di design, Pezzi scultorei presenti in
                                    navigazione come "In arrivo"; Progetti speciali sempre attiva)
/progetta                          Configuratore — "Progetta il tuo pezzo": step 0 scelta
                                    categoria, poi flusso specifico (Documento 6 §2)
/studio                            Studio — chi siamo, filosofia, il nostro sguardo su materia
                                    e lavorazione (non solo "processo tavoli")
/richiedi-un-progetto              Richiesta progetto — form diretto, alternativa leggera al
                                    configuratore per chi ha già le idee chiare o una categoria
                                    non ancora configurabile (es. pezzo scultoreo)
```

Pagine tecniche obbligatorie anche ora (basso sforzo, non negoziabili):
```
/privacy   /cookie   /404   /sitemap.xml   /robots.txt
```

> `/contatti` in questa fase è un **anchor/sezione**, non ancora una pagina propria (NAP + form breve raggiungibile da header/footer di ogni pagina) — diventa pagina dedicata in Fase 1b insieme al resto (§3) senza cambiare nulla nell'impianto.

## 3. Sitemap — Fase 1b (subito dopo, stessa qualità, non "fase lontana")

Pagine già previste in architettura (routing, content model, nav) fin da ora, popolate con contenuto reale appena disponibile:

```
/progetti                          Progetti / Case Study — indice
/progetti/[slug-progetto]          Case study singolo (può referenziare più categorie)

/servizi                            Servizi / Cosa facciamo — hub
/servizi/progettazione-su-misura
/servizi/consegna-e-installazione
/servizi/cura-e-manutenzione        (include restauro, riverniciatura, lucidatura — Documento 5 §6)

/processo                           Processo di lavorazione — dal materiale al pezzo finito,
                                     scritto per essere vero per qualunque categoria (varianti
                                     per categoria dove necessario, non pagine duplicate)
/materiali                          Materiali — hub: legni, resina, [materiali futuri]
/materiali/legni                    /materiali/legni/[essenza]  (noce, rovere, olmo, ulivo, ...)
/materiali/resina                   /materiali/resina/[colore]

/assistenza                         Assistenza / FAQ
/contatti                           Contatti (promossa da anchor a pagina dedicata)
```

## 4. Sitemap — Fase 2 (espansione)

```
/collezione/complementi-arredo      Categoria attivata con contenuto reale
/collezione/oggetti-di-design       Categoria attivata con contenuto reale
/collezione/pezzi-scultorei         Categoria attivata con contenuto reale

/per-architetti-e-interior-designer
/hospitality

/giornale                           Blog / editoriale — indice
/giornale/[slug-articolo]

/atelier                            Showroom/laboratorio, visita su appuntamento
/note-legali
```

Attivare una categoria di Fase 2 significa: aggiungere il record categoria (Documento 6 §1), i primi pezzi in Collezione, ed eventualmente uno schema di configurazione dedicato — mai riscrivere il configuratore o la sitemap.

## 5. Sitemap — Fase 3 (predisposizione futura, non da costruire ora)

Invariata rispetto alla versione precedente: `/account`, `/negozio`, `/[locale]/...`, `/preventivo/[id]` — l'architettura a categorie rende anzi più naturale un futuro `/negozio` (pezzi pronti, non custom) perché "categoria" e "prodotto" sono già modellati come entità distinte da subito.

## 6. Struttura di navigazione

### Header (desktop)
```
[Logo Perla Nera]   Collezione ▾   Progetti   Studio   Servizi ▾   Materiali   [CTA: Progetta il tuo pezzo]
```
- "Collezione" è un mega-menu che elenca **tutte** le categorie, incluse quelle "In arrivo" (visibili ma non cliccabili su un catalogo vuoto — linkano a una sezione "raccontaci cosa hai in mente" nel configuratore/richiesta progetto) — comunica ampiezza dello studio da subito.
- Il CTA primario in header è ora **"Progetta il tuo pezzo"**, non più "...il tuo tavolo" — resta invariato indipendentemente dalla categoria che l'utente ha in mente; è il configuratore stesso a chiedere quale.
- "Servizi" mega-menu espone Progettazione su misura, Consegna e installazione, Cura e manutenzione (e, in Fase 2, Per Architetti/Hospitality).

### Mobile, Footer, Breadcrumb
Invariati nella logica del documento precedente (menu full-screen, footer a 4 colonne, breadcrumb da secondo livello in su) — cambia solo il contenuto delle voci, coerente con la nuova IA: il footer "Esplora" elenca ora le categorie di Collezione al posto dei soli link tavoli-centrici.

## 7. Convenzioni URL

Invariate (Documento 1 §6 versione precedente): italiano, minuscolo, trattini, niente parametri per contenuto indicizzabile, profondità massima 3 livelli. La struttura `/collezione/[categoria]/[prodotto]` e `/progetti/[slug]` rispetta questo vincolo.

## 8. Rationale "no pagine spam per città"

Invariato — v. versione precedente, ora applicabile a tutte le categorie e non solo ai tavoli: una sola pagina/area servita con `LocalBusiness` + `areaServed`, mai pagine doorway per comune o per combinazione categoria×città.
