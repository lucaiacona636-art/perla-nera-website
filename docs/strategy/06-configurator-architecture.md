# Architettura del Configuratore — "Progetta il tuo pezzo"

> Documento 7 di 12. Funzionalità centrale del sito. Definisce modello dati, step, stato, contratto con il livello 3D (Documento 8) e flusso di lead generation. Nessun prezzo automatico in Fase 1 — obiettivo: lead qualificato con contesto completo.
>
> **Nota di revisione**: la versione precedente partiva dal presupposto "si configura un tavolo". Corretto in linea con Documento 0 §1 e Documento 1: il configuratore parte dalla **categoria di pezzo**, e il flusso a 7 step descritto qui sotto è lo schema di configurazione della categoria Tavoli — oggi la più completa, non l'unica prevista dall'architettura.

## 1. Modello a due livelli: Categoria → Schema di configurazione

```
ProductCategory ("tavoli", "complementi-arredo", "oggetti-design",
                  "pezzi-scultorei", "progetto-speciale")
        │
        └── ConfigurationSchema  →  sequenza ordinata di Step
                                     (ogni Step è un "tipo" riusabile:
                                     Essenza, Forma, Dimensioni, Bordo,
                                     Resina, Finitura, Base/Gambe, Dettagli,
                                     Brief libero)
```

```ts
interface ProductCategory {
  id: string;              // "tavoli", "complementi-arredo", ...
  label: string;           // "Tavoli"
  status: "available" | "coming-soon" | "bespoke-only";
  schemaId: string;        // quale ConfigurationSchema usa
  heroImage: string;
  shortDescription: string;
}

interface ConfigurationSchema {
  id: string;               // "schema-tavoli"
  steps: StepDefinition[];  // riferimenti a tipi di step, in ordine
}

interface StepDefinition {
  type: "essence" | "shape" | "dimensions" | "edge" | "resin" | "finish" | "base" | "detail" | "free-brief";
  required: boolean;
  catalogKey?: string;      // quale catalogo di opzioni alimenta questo step (v. §2)
}
```

- **Categoria "Tavoli"** (`status: "available"`) usa lo `ConfigurationSchema` a 7 step descritto in §3 — è l'unica, oggi, con cataloghi reali (essenze, forme, resine...).
- **Categorie "in arrivo"** (Complementi d'arredo, Oggetti di design, Pezzi scultorei — `status: "coming-soon"`) sono visibili in Collezione e nello step 0 del configuratore, ma non aprono un flusso a step: portano a `/richiedi-un-progetto` con la categoria precompilata, oppure a una versione ridotta del configuratore con solo lo step `free-brief` (v. sotto) — mai a un catalogo di opzioni che non esiste ancora.
- **Categoria "Progetti speciali su misura"** (`status: "bespoke-only"`) non ha *mai* uno schema a opzioni: usa uno `ConfigurationSchema` di un solo step, `free-brief` — descrizione libera, riferimenti/immagini, dimensioni indicative. È la valvola per tutto ciò che non rientra in nessuna categoria ancora modellata, requisito esplicito del brief precedente ("senza che il sito sembri progettato esclusivamente per i tavoli").
- **Aggiungere una categoria reale in futuro** (es. attivare "Complementi d'arredo" con un vero schema a step) significa: creare il `ConfigurationSchema` combinando step-type già esistenti (Essenza, Dimensioni...) più eventuali nuovi step-type se serve un concetto mai visto — mai riscrivere il configuratore esistente.

### Step 0 — Selezione categoria (nuovo, precede tutto)

```
Titolo:      Che pezzo vuoi progettare?
Sottotitolo: Scegli una categoria per iniziare — se non la trovi, raccontacelo comunque.

[ Tavoli ]  [ Complementi d'arredo — presto disponibile ]
[ Oggetti di design — presto disponibile ]  [ Pezzi scultorei — presto disponibile ]
[ Ho in mente un progetto speciale → ]
```

Selezionare "Tavoli" apre lo schema §3. Selezionare una categoria "in arrivo" o "Progetto speciale" apre il singolo step `free-brief`. In entrambi i casi l'evento `start_configurator` registra `category_id` (Documento 9 §3, aggiornato).

## 2. Principio guida per i cataloghi: dati, non codice

Invariato nella sostanza rispetto alla versione precedente — vale per ogni categoria, non solo Tavoli. Ogni opzione (essenza, forma, bordo, resina, finitura, base) è un **record in un catalogo**, non un valore hardcoded nell'interfaccia:

```ts
interface CatalogOption {
  id: string;
  label: string;
  active: boolean;
  order: number;
  description?: string;
  thumbnailUrl: string;
  material: {
    type: "pbr" | "flat-color" | "transparent";
    albedoMapUrl?: string;
    normalMapUrl?: string;
    roughness?: number;
    baseColor?: string;
  };
}

interface Essence extends CatalogOption {}
interface ShapeOption extends CatalogOption { geometryId: string; dimensionRules: DimensionRules; }
interface EdgeOption extends CatalogOption {}
interface ResinOption extends CatalogOption {}
interface FinishOption extends CatalogOption {}
interface BaseOption extends CatalogOption { category: "acciaio" | "legno" | "custom"; }
interface DetailOption extends CatalogOption {}

interface DimensionRules {
  length: { min: number; max: number; default: number; step: number };
  width:  { min: number; max: number; default: number; step: number };
  height?: { min: number; max: number; default: number; step: number };
}
```

I cataloghi (per ora solo quelli della categoria Tavoli hanno contenuto reale) vivono come file dati tipizzati in Fase 1 (`content/configurator/`), pronti per una query CMS in Fase 2 — stesso `shape` dei dati, nessun refactor dei componenti che li consumano. Una futura categoria "Complementi d'arredo" con base legno/acciaio riuserà `BaseOption` così com'è.

## 3. Schema "Tavoli" (riferimento — la categoria oggi completa)

| # | Step | Tipo | Obbligatorio | Influenza sulla preview |
|---|---|---|---|---|
| 0 | Categoria | `category` | Sì | — (seleziona lo schema) |
| 1 | Essenza | `essence` | Sì | Materiale/texture legno |
| 2 | Forma | `shape` | Sì | Geometria base |
| 3 | Dimensioni | `dimensions` | Sì | Scala/proporzioni geometria |
| 4 | Bordo | `edge` | No (default: "regolare") | Modifica silhouette bordo |
| 5 | Resina | `resin` | No (default: "nessuna") | Materiale/colore resina, trasparenza |
| 6 | Finitura | `finish` | No (default: "naturale") | Shader (roughness/riflesso) |
| 7 | Base/Gambe | `base` | No (default: prima opzione attiva) | Modello gambe |
| — | Riepilogo — "Il tuo progetto" | — | — | Nessuna (schermata di conferma) |

Step opzionali mostrano sempre il CTA "Decido dopo" (microcopy, Documento 5 §4) con default sensato pre-applicato. Lo step `detail` (incisioni, inserti) resta predisposto nel modello ma nascosto finché non c'è un catalogo reale.

**Perché questo schema resta "di riferimento" e non "il" configuratore**: quando una seconda categoria (es. Complementi d'arredo) avrà cataloghi reali, il suo `ConfigurationSchema` riuserà `essence`, `dimensions`, `finish`, `base` da qui e aggiungerà solo ciò che è realmente specifico (es. per una consolle potrebbe non servire `shape` ma servire un nuovo step `mounting` — a muro/a terra). Il codice che renderizza uno step non sa "sono nel flusso tavoli": sa solo "sto renderizzando uno step di tipo `essence`".

## 4. Stato e persistenza

Invariato nella logica: **Zustand**, store `useConfiguratorStore` con selezioni per step, persistenza `localStorage` debounced, ripresa configurazione entro 30 giorni. Aggiunta: lo store tiene ora anche `categoryId` come primo campo — determina quale schema/cataloghi caricare, tutto il resto della logica di stato è identico indipendentemente dalla categoria scelta.

## 5. Contratto con il layer di preview (3D + fallback)

`SceneState` resta il contratto verso il rendering (Documento 8), ora esplicitamente parametrizzato per categoria invece di assumere sempre un piano tavolo:

```ts
interface SceneState {
  categoryId: string;
  // campi seguenti presenti/assenti secondo lo schema della categoria attiva
  essenceId?: string;
  shapeId?: string;
  dimensions?: { length: number; width: number; height?: number };
  edgeId?: string;
  resinId?: string;
  finishId?: string;
  baseId?: string;
}
```

Per la categoria "Progetto speciale"/`free-brief`, non esiste `SceneState` renderizzabile: la preview è sostituita da un pannello che mostra in tempo reale il riepilogo testuale del brief e le immagini caricate — coerente con il principio (§4 del documento precedente, qui §6) che il riepilogo è sempre leggibile indipendentemente dal 3D.

Percorsi primario/fallback invariati (Documento 8): 3D live dove possibile, galleria fotografica curata come fallback, riepilogo testuale sempre presente.

## 6. Lead capture — dati raccolti e payload

Campi form invariati, con l'aggiunta esplicita della categoria:

```json
{
  "source": "configurator",
  "category": "tavoli",
  "submittedAt": "2026-08-17T10:00:00Z",
  "contact": { "name": "", "email": "", "phone": "", "city": "" },
  "desiredDimensions": { "length": 220, "width": 100 },
  "configuration": {
    "essence": "noce", "shape": "rettangolare",
    "dimensions": { "length": 220, "width": 100 },
    "edge": "bordo-vivo", "resin": "nera",
    "finish": "opaca", "base": "acciaio-nero"
  },
  "configurationSummaryText": "Tavolo rettangolare in noce, 220×100cm, bordo vivo, resina nera, finitura opaca, base in acciaio nero.",
  "notes": "",
  "attachments": ["https://.../upload1.jpg"],
  "consent": true,
  "utm": { "source": "google", "medium": "cpc", "campaign": "..." }
}
```

Per categorie `coming-soon`/`bespoke-only`, `configuration` è sostituito da `{ "freeBrief": "testo libero descrizione" }` — stesso endpoint, stesso payload di contatto, campo `configuration` semplicemente diverso nella forma. Resto del flusso (email conferma, notifica interna, storage) invariato dalla versione precedente.

## 7. Regole di validazione

Invariate, applicate per-categoria dove rilevante (`DimensionRules` esiste solo per categorie con step `dimensions`). Nessun campo obbligatorio bloccante oltre contatto e consenso privacy nella schermata finale, qualunque categoria.

## 8. Eventi analytics generati dal configuratore

Come da Documento 9 §3, con l'aggiunta di `category_id` come parametro su tutti gli eventi: `start_configurator` (ora con `category_id` fin dallo step 0), `configurator_step`, `complete_configurator`, `submit_lead`. Permette di leggere in analytics non solo "dove abbandonano" ma "quali categorie generano interesse anche prima di avere un catalogo reale" — segnale diretto per decidere quale categoria attivare per prima in Fase 2.
