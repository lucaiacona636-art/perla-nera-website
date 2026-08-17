# Architettura 3D

> Documento 8 di 12. Il 3D ha due funzioni — narrativa (Home) e commerciale (Configuratore) — mai decorativa. Definisce dove appare, come si genera, come resta leggero.

## 1. Dove appare il 3D (e dove no)

| Sezione | Uso del 3D | Funzione |
|---|---|---|
| Home — sezione "hero prodotto" | Un singolo tavolo flagship, modello 3D di alta qualità, rotazione controllata dallo scroll (non autoplay libero) | Narrativa: mostra la materia (venature, trasparenza resina) meglio di una foto statica, ancora prima del configuratore |
| Configuratore | Preview live parametrica, consuma `SceneState` (Documento 7 §4) | Commerciale: è lo strumento di decisione, non uno show-off |
| Case study (Fase 2, dove ha senso) | Viewer "gira intorno al pezzo" per i progetti più fotogenici | Narrativa/prova: sostituisce in parte il sopralluogo fisico |
| Resto del sito (Chi Siamo, Processo, Servizi, liste, footer) | **Nessun 3D** | Il brief chiede funzione, non decorazione: qui bastano fotografia e motion 2D (Documento Design System + motion) |

Il 3D non deve mai essere la prima cosa che il browser carica: né in Home né altrove è nel critical rendering path (v. §4).

## 2. Stack tecnico

- **React Three Fiber (R3F)** come layer dichiarativo su Three.js, integrato naturalmente col resto dell'albero React/Next.js (stato del configuratore già in React/Zustand, nessun ponte imperativo separato da mantenere).
- **@react-three/drei** per helper standard (`Environment`, `ContactShadows`, `OrbitControls` limitati, `useGLTF`, `Preload`) — evita di reinventare utility comuni.
- **GSAP** solo per l'orchestrazione della sequenza scroll-driven in Home (rotazione/inquadratura del modello sincronizzata allo scroll) — non per animazioni interne alla scena 3D, che restano gestite da R3F/Three.js. Coerente con il brief ("GSAP solo dove realmente necessario").
- Formato asset: **glTF/GLB** con compressione **Draco** per le geometrie e **KTX2/Basis** per le texture — l'unico formato che garantisce dimensioni contenute mantenendo qualità PBR.

## 3. Pipeline asset — come nascono i modelli 3D

Due percorsi distinti, scelti in base al caso d'uso:

1. **Modello flagship (Home, Case study)** — realizzato una tantum da un 3D artist a partire da fotografie/misure reali del pezzo (o, se disponibile, photogrammetria di un pezzo esistente). Alta qualità, ottimizzato a mano, aggiornato raramente. Non è un processo automatizzato: è un asset curato come una fotografia professionale.
2. **Modello parametrico (Configuratore)** — geometria costruita a runtime combinando: (a) mesh base per forma (`geometryId` nel catalogo, Documento 7) deformata/scalata secondo le dimensioni scelte; (b) materiali PBR intercambiabili per essenza/resina/finitura (texture map referenziate nel catalogo, non mesh separate). Questo evita di dover produrre un modello 3D per ogni combinazione possibile (essenza × forma × bordo × resina × finitura × gambe = centinaia di combinazioni) — si combinano un numero limitato di geometrie base con un numero limitato di set di materiali.

Le gambe (`LegOption`) sono mesh separate, agganciate al piano tavolo via anchor point — cambiare gamba non richiede ricaricare l'intera scena.

## 4. Performance — il 3D non deve rallentare il sito

Requisito esplicito del brief, trattato come vincolo non negoziabile:

- **Lazy load rigoroso**: il bundle Three.js/R3F non è nel bundle iniziale di nessuna pagina. Caricato via `next/dynamic` con `ssr: false`, innescato solo quando la sezione 3D entra nel viewport (`IntersectionObserver`) o quando l'utente apre il configuratore.
- **Placeholder immediato**: finché il 3D non è pronto, si mostra un'immagine statica ad alta qualità dello stesso soggetto (stesso frame che il 3D animerà) — l'utente vede subito qualcosa di bello, mai uno spinner vuoto.
- **Budget di peso**: modello flagship compresso target < 2–3MB, texture 2K max (1K su mobile) via KTX2; modelli parametrici del configuratore ancora più leggeri (poche migliaia di poligoni, dato che sono forme geometriche pulite, non oggetti organici complessi).
- **Rilevamento capacità dispositivo**: su GPU/CPU deboli o connessione lenta (`navigator.connection`, quando disponibile) si passa direttamente al percorso fallback fotografico (Documento 7 §4) invece di caricare comunque il 3D e renderlo goffamente.
- **Un solo canvas 3D attivo alla volta**: se l'utente scrolla via dalla sezione Home 3D, il canvas si smonta (non resta a consumare GPU in background); il configuratore monta il proprio canvas solo quando aperto.
- **`prefers-reduced-motion`**: la sequenza scroll-driven Home si disattiva, il modello resta fermo in un'inquadratura finale ben composta invece di animare; nel configuratore i cambi di stato avvengono senza rotazione automatica continua (l'utente ruota manualmente se vuole).

## 5. Illuminazione e coerenza con il design system

L'ambiente luce (HDRI via `<Environment>` di drei) è impostato in due varianti coerenti con le due superfici del design system (Documento 3 §1): un setup "scena scura" (luce calda e direzionale, sfondo che si fonde con `--n-950`) per la Home, e un setup "scena chiara e neutra" (luce diffusa, sfondo `--n-50`) per il configuratore, dove la fedeltà cromatica di essenza/resina scelte conta più dell'atmosfera. Questo evita che il 3D sembri "incollato sopra" il resto del sito.

## 6. Accessibilità e robustezza

- Il canvas 3D ha sempre un'alternativa testuale (`aria-label` descrittivo) e non è mai l'unico modo per accedere a un'informazione (v. contratto SceneState + riepilogo testuale, Documento 7 §4).
- Controlli di rotazione (`OrbitControls` limitati, no zoom/pan libero che disorienta) utilizzabili anche da tastiera nel configuratore dove tecnicamente possibile; in ogni caso la selezione delle opzioni resta sempre gestibile senza interagire col canvas.
- Nessun autoplay sonoro/aggressivo; nessuna dipendenza funzionale dal 3D per completare il configuratore o inviare un lead.
