# Perla Nera — Brand & Direzione Creativa

> Documento 1 di 12. Fondamenta strategiche su cui si basano tutti gli altri documenti (design system, copy, SEO, configuratore).

## 1. Posizionamento

> **Nota di revisione**: la prima versione di questo documento posizionava Perla Nera come "atelier di tavoli". Corretto: i tavoli sono la categoria più matura, non il perimetro del brand. Il posizionamento corretto segue.

**Perla Nera è uno studio italiano di artigianato e design che progetta e realizza pezzi unici in legno massello e resina epossidica — tavoli, complementi d'arredo, oggetti di design, pezzi scultorei e progetti speciali su misura.**

Il brand non si definisce per *cosa* produce (un tipo di oggetto), ma per *come* lo produce: materia selezionata, tempo di lavorazione non compresso, unicità del risultato. Questo è ciò che rende il sistema estendibile — una nuova categoria (un'opera scultorea, un complemento mai fatto prima) non richiede un nuovo posizionamento, perché il posizionamento non è mai stato "chi fa tavoli".

Tre parole guida per ogni decisione, di design o di copy:

- **Materia** — il legno e la resina sono protagonisti, non sfondo. (Materiali futuri diversi da legno/resina restano compatibili con questo principio, se mai introdotti.)
- **Tempo** — lavorazione artigianale, non produzione seriale.
- **Unicità** — ogni pezzo è irripetibile, progettato per un luogo o una persona precisi.

### Categorie del brand (sistema aperto, non elenco chiuso)

I tavoli restano oggi la categoria con più prodotti, più prova sociale e più ricerca organica (Documento 6-SEO) — è quindi normale che compaiano con più peso nell'MVP. Ma l'architettura (sitemap, configuratore, content model) tratta ogni categoria come **applicazione dello stesso studio**, mai come un sito satellite:

| Categoria | Stato in MVP |
|---|---|
| Tavoli | Categoria completa: collezione, configuratore, materiali dedicati |
| Complementi d'arredo | Presente nell'architettura (Collezione, cataloghi), contenuto in crescita |
| Oggetti di design | Presente nell'architettura, "in arrivo" finché non c'è un primo pezzo reale |
| Pezzi scultorei / opere | Presente nell'architettura, "in arrivo" |
| Progetti speciali su misura | Sempre disponibile fin da subito — è per definizione la categoria "senza schema fisso": si accede via configuratore con un percorso libero (brief + riferimenti), non via catalogo di opzioni (Documento 6 §1) |

Una categoria "in arrivo" è comunque visibile in navigazione (non nascosta) — comunica ampiezza dello studio anche prima di avere il primo pezzo fotografato, senza mai promettere un catalogo di opzioni che non esiste ancora.

### Frame competitivo

| Non siamo | Siamo |
|---|---|
| Falegnameria di quartiere | Studio di progettazione e produzione |
| Negozio di tavoli online | Studio che realizza pezzi su commissione, su più categorie |
| Catalogo industriale | Collezione curata + progetti custom |
| Sito-vetrina statico | Esperienza che fa percepire la materia |
| Brand "artigianale rustico" | Artigianato italiano **contemporaneo** |
| "Il sito dei tavoli in resina" | Uno studio di materia e lavorazione, di cui i tavoli sono l'espressione più conosciuta |

Il rischio principale da evitare non è "sembrare troppo semplice", è **sembrare un template** — e, dopo questa correzione, anche **sembrare un e-commerce verticale su un solo prodotto**. Ogni pattern visivo troppo comune nei siti "luxury AI-generated" (oro lucido, Playfair Display ovunque, glass-morphism, hero con overlay scuro su foto stock) va evitato di proposito. Le scelte di design successive (tipografia, colore, motion) sono fatte per differenziarsi esplicitamente da quel linguaggio.

## 2. Target primari

1. **Cliente privato medio/alto spendente** — Verona, Veneto, Lago di Garda, Nord Italia. Cerca un pezzo unico per casa, spesso dopo aver già cercato "tavolo legno resina" su Google/Pinterest/Instagram. Decisione emotiva, validata razionalmente (materiali, durabilità, artigianalità).
2. **Interior designer / architetto** — prescrittore. Cerca affidabilità tecnica, tempi, capacità di custom, referenze, possibilità di campionatura. Decisione professionale, ripetuta nel tempo (partnership).
3. **Hospitality (ristoranti, hotel, locali premium)** — cerca capacità di realizzare più pezzi coerenti mantenendo identità e qualità, gestione progetto chiavi in mano.

Questi tre pubblici richiedono ingressi e CTA diversi ma la stessa qualità percepita — da qui la necessità di sezioni dedicate (`/architetti-interior-designer`, `/hospitality`) invece di un unico funnel generico.

## 3. Tono di voce

**Autorevole, concreto, materico. Mai urlato.**

- Frasi brevi, dichiarative. Il lusso vero non ha bisogno di aggettivi accumulati.
- Si parla di materia, gesto, tempo di lavorazione — mai di "eccellenza" o "qualità premium" dette a vuoto.
- Si usa la seconda persona per parlare allo spazio del cliente ("il tuo spazio", "il tuo progetto"), la prima plurale per parlare del mestiere ("lavoriamo", "selezioniamo").
- Zero superlativi da e-commerce ("il migliore", "unico nel suo genere" ripetuto). L'unicità si dimostra mostrando il processo, non dichiarandola.
- Italiano corretto, mai tradotto dall'inglese. Termini tecnici del mestiere usati con naturalezza (bordo vivo, resina epossidica, essenza, venatura) — educano il cliente e costruiscono autorità.

**Esempio di ciò che NON scriviamo:**
> "Scopri la nostra esclusiva collezione di tavoli premium realizzati con la massima cura artigianale per arredare i tuoi spazi con stile ed eleganza senza tempo."

**Esempio di ciò che scriviamo:**
> "Un tronco di noce, tagliato e stagionato per due anni. La resina che ne segue le crepe invece di nasconderle. Il risultato non si replica: è quel legno, quel giorno, quelle mani."

## 4. Direzione visiva — "Dark Materic Contemporary"

### Decisione chiave: sistema a doppia superficie, non "sito nero"

Il brief chiede nero presente ma non pesante. La soluzione non è un dark-mode uniforme (che dopo 3 sezioni affatica e appiattisce le fotografie di legno e resina, che hanno bisogno di luce per mostrare venature e trasparenze), ma un **ritmo editoriale a due superfici**:

- **Superfici scure** (`#0B0A09` nero caldo, non `#000000` puro) per hero, manifesto di brand, storytelling di processo, footer — dove il testo e il gesto narrativo devono dominare.
- **Superfici chiare calde** (`#F6F2EB` avorio, non bianco freddo `#FFFFFF`) per collezione, configuratore, case study — dove la fotografia di prodotto deve leggersi con fedeltà cromatica reale.

Questa alternanza è essa stessa un elemento di motion/narrazione: lo scroll passa fisicamente da "buio → materia illuminata → buio", ricreando la sensazione di entrare in un laboratorio e vedere un pezzo sotto la luce. Giustifica anche il pattern richiesto ("scroll-triggered storytelling") senza bisogno di effetti gratuiti: è la palette stessa a fare la scena.

Motivazione: un sito interamente `#000000` con testo bianco puro è lo stereotipo più comune ("dark luxury generico"); il nero caldo + avorio caldo + legno reale è più difficile da replicare con un prompt AI generico, quindi più distintivo e più coerente con "materia" come valore centrale.

### Cosa evitare esplicitamente

- Oro lucido/gradiente (`#FFD700` e simili) — lettura "casinò/lusso finto". Il metallico richiesto dal brief sarà bronzo/pewter fortemente desaturato, usato solo su dettagli minimi (v. Design System §4).
- Glassmorphism / blur decorativo — non coerente con un brand che parla di materia solida.
- Grandi border-radius arrotondati stile app SaaS — non trasmettono "falegnameria", trasmettono "prodotto tech". Il sistema userà raggi minimi, quasi architettonici (v. Design System §6).
- Ombre pesanti/drammatiche — sostituite da profondità ottenuta con luce, contrasto materico e composizione fotografica.
- Font "Playfair Display" come da ogni sito luxury-template — sostituito da un abbinamento meno atteso (v. Design System §2).

## 5. Riferimenti di categoria (non stilistici, di livello)

Il termine di paragone non è "un sito di falegnameria", ma studi editoriali/prodotto di fascia alta: siti di gallerie di design, atelier di alta orologeria, studi di architettura internazionali. Da questi si prende: uso dello spazio bianco/scuro, tipografia come elemento di design a sé, fotografia a piena pagina, narrazione lineare per scroll, assenza di rumore visivo (niente badge, niente pop-up invasivi, niente carosello automatico).
