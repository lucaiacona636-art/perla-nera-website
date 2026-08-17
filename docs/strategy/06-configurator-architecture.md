# Architettura del Configuratore — "Crea il tuo tavolo"

> Documento 7 di 12. Funzionalità centrale del sito. Definisce modello dati, step, stato, contratto con il livello 3D (Documento 8) e flusso di lead generation. Nessun prezzo automatico in Fase 1 — obiettivo: lead qualificato con contesto completo.

## 1. Principio guida: catalogo dati, non codice

Ogni opzione (essenza, forma, bordo, resina, finitura, gamba) è un **record in un catalogo**, non un valore hardcoded nell'interfaccia. Aggiungere una nuova essenza o un nuovo colore di resina significa aggiungere una riga dati (via CMS in Fase 2, via file di configurazione versionato in Fase 1), mai toccare il codice dei componenti. Questo risponde direttamente al requisito "sistema facilmente estendibile" per resina/essenze/dettagli.

### Modello dati (TypeScript, indicativo)

```ts
interface CatalogOption {
  id: string;            // "noce", "resina-nera"
  label: string;         // "Noce"
  active: boolean;       // consente disattivazione senza cancellazione
  order: number;
  description?: string;  // per tooltip/microcopy
  thumbnailUrl: string;  // swatch fotografico reale (non colore piatto)
  material: {             // contratto verso il layer 3D (Documento 8)
    type: "pbr" | "flat-color" | "transparent";
    albedoMapUrl?: string;
    normalMapUrl?: string;
    roughness?: number;
    baseColor?: string;   // fallback CSS per swatch/preview statica
  };
}

interface Essence extends CatalogOption {}          // noce, rovere, olmo, ulivo, ...
interface ShapeOption extends CatalogOption {
  geometryId: string;                                 // riferimento alla mesh/parametrizzazione 3D
  dimensionRules: DimensionRules;
}
interface EdgeOption extends CatalogOption {}         // naturale, vivo, mosso, lavorato, regolare
interface ResinOption extends CatalogOption {}        // nessuna, trasparente, nera, [estendibile]
interface FinishOption extends CatalogOption {}       // naturale, opaca, satinata, ...
interface LegOption extends CatalogOption {
  category: "acciaio" | "legno" | "custom";
}
interface DetailOption extends CatalogOption {}       // Fase 2: incisioni, inserti metallici, ...

interface DimensionRules {
  length: { min: number; max: number; default: number; step: number };
  width:  { min: number; max: number; default: number; step: number };
  height?: { min: number; max: number; default: number; step: number };
}
```

I cataloghi vivono in Fase 1 come file dati statici tipizzati (es. `content/configurator/essenze.ts`), pronti per essere sostituiti 1:1 da una query CMS in Fase 2 senza cambiare i componenti che li consumano (stesso shape dei dati).

## 2. Step del configuratore

| # | Step | Obbligatorio | Influenza sulla preview |
|---|---|---|---|
| 1 | Essenza | Sì | Materiale/texture legno |
| 2 | Forma | Sì | Geometria base |
| 3 | Dimensioni | Sì | Scala/proporzioni geometria |
| 4 | Bordo | No (default: "regolare") | Modifica silhouette bordo |
| 5 | Resina | No (default: "nessuna") | Materiale/colore resina, trasparenza |
| 6 | Finitura | No (default: "naturale") | Shader (roughness/riflesso) |
| 7 | Gambe | No (default: prima gamba attiva del catalogo) | Modello gambe |
| — | Riepilogo — "Il tuo progetto" | — | Nessuna (schermata di conferma) |

Step opzionali mostrano sempre il CTA "Decido dopo" (microcopy, Documento 5 §4) con default sensato pre-applicato — l'utente non è mai bloccato da una scelta che non vuole ancora fare, requisito diretto del brief ("nessun prezzo, lead qualificato" implica anche "nessun attrito superfluo").

Step 8 "Dettagli" (incisioni, inserti) è predisposto nel modello dati come `DetailOption[]` ma **nascosto in Fase 1** finché non c'è un catalogo reale da mostrare — evita di promettere personalizzazioni non ancora disponibili.

## 3. Stato e persistenza

- Gestione stato locale con **Zustand** (store leggero, nessun boilerplate Redux, ottima integrazione con React Server Components/Next.js) — store dedicato `useConfiguratorStore` con: selezioni correnti per categoria, step attivo, storico step completati, timestamp ultima modifica.
- **Persistenza automatica** in `localStorage` (debounced) ad ogni modifica — implementa la promessa di microcopy "la tua configurazione resta salvata". Nessun account richiesto.
- Idratazione dello store al mount: se esiste una configurazione salvata recente (< 30 giorni), propone di riprenderla ("Hai una configurazione in corso, vuoi continuare?") invece di sovrascriverla silenziosamente.
- Lo stato del configuratore è **serializzabile 1:1** nel payload del lead (v. §5) — nessuna trasformazione ad-hoc tra "stato UI" e "dato inviato".

## 4. Contratto con il layer di preview (3D + fallback)

Il configuratore non disegna la preview: **emette uno stato** (`SceneState`) che il layer di rendering consuma, così UI e motore 3D restano disaccoppiati (dettagli motore in Documento 8):

```ts
interface SceneState {
  essenceId: string;
  shapeId: string;
  dimensions: { length: number; width: number; height?: number };
  edgeId: string;
  resinId: string;
  finishId: string;
  legId: string;
}
```

- **Percorso primario** (desktop/mobile capaci, WebGL disponibile, no `prefers-reduced-motion`): preview 3D interattiva in tempo reale via React Three Fiber, che consuma `SceneState` e ricompone geometria/materiali.
- **Percorso di fallback** (WebGL non disponibile, dispositivo di fascia bassa, `prefers-reduced-motion`, o 3D non ancora caricato): galleria di immagini fotografiche/render "closest match" filtrata per essenza+forma — non un composito automatico per ogni combinazione (irrealizzabile fotograficamente), ma un set curato che si aggiorna in base alle 2 selezioni con maggior peso visivo (essenza, forma). Il resto della configurazione resta comunque nel riepilogo testuale.
- In entrambi i percorsi, il riepilogo finale ("Il tuo progetto") è **sempre testuale e leggibile**, indipendente dal fatto che il 3D abbia caricato — nessuna informazione critica esiste solo dentro il canvas 3D (requisito di accessibilità e di robustezza del lead).

## 5. Lead capture — dati raccolti e payload

Campi form (schermata "Il tuo progetto"):

```
Nome*            Email*             Telefono*
Città                                 Dimensioni desiderate (precompilate da step 3, editabili)
Note (libere)                        Caricamento immagini (opzionale, max 5, riferimento ispirazione/spazio)
Consenso privacy* (checkbox, link a /privacy)
```

Payload inviato all'endpoint lead (`POST /api/lead`, v. Documento 11 per lo stack):

```json
{
  "source": "configurator",
  "submittedAt": "2026-08-17T10:00:00Z",
  "contact": { "name": "", "email": "", "phone": "", "city": "" },
  "desiredDimensions": { "length": 220, "width": 100 },
  "configuration": {
    "essence": "noce", "shape": "rettangolare",
    "dimensions": { "length": 220, "width": 100 },
    "edge": "bordo-vivo", "resin": "nera",
    "finish": "opaca", "legs": "acciaio-nero"
  },
  "configurationSummaryText": "Tavolo rettangolare in noce, 220×100cm, bordo vivo, resina nera, finitura opaca, gambe in acciaio nero.",
  "notes": "",
  "attachments": ["https://.../upload1.jpg"],
  "consent": true,
  "utm": { "source": "google", "medium": "cpc", "campaign": "..." }
}
```

- `configurationSummaryText` generato automaticamente (non scritto a mano) — è ciò che chi riceve il lead legge per primo, prima ancora di aprire il JSON strutturato.
- Anti-spam: honeypot field + rate limiting sull'endpoint, niente CAPTCHA visibile (frizione inutile per un lead già "caldo").
- Upload immagini gestito via storage esterno (v. Documento 11) con validazione tipo/dimensione file lato client prima dell'invio.
- Alla ricezione: email di conferma automatica al cliente (riepilogo + prossimi passi) + notifica interna (email/CRM, v. roadmap Fase 2) — il sito garantisce l'invio, l'automazione di notifica è infrastruttura leggera da collegare in MVP (es. servizio email transazionale), non un CRM completo.

## 6. Regole di validazione

- Dimensioni vincolate per forma (`DimensionRules` per `shapeId`) — non si può richiedere un ovale 40×40cm; gli step mostrano min/max coerenti e un messaggio se fuori range ("Per questa forma consigliamo lunghezze da X a Y cm — possiamo comunque valutare misure speciali, scrivilo nelle note").
- Nessun campo obbligatorio bloccante oltre contatto (nome/email/telefono) e consenso privacy nella schermata finale.
- Validazione email/telefono client-side + server-side (mai solo client-side per un endpoint pubblico).

## 7. Eventi analytics generati dal configuratore

Mappatura diretta sugli eventi richiesti (Documento 9): `start_configurator` (primo step aperto), `configurator_step` (ad ogni step completato, con `step_id` e `selection_id`), `complete_configurator` (arrivo al riepilogo), `submit_lead` (invio form riuscito). Questi eventi permettono di individuare esattamente a quale step si perde la maggior parte degli utenti — dato che guiderà le iterazioni post-lancio più di qualsiasi altra metrica.
