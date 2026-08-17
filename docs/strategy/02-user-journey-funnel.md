# User Journey & Funnel di Conversione

> Documento 3 di 12. Come i tre pubblici principali attraversano il sito, dal primo contatto alla vendita.

## 1. Funnel generale (dal brief, con stadi resi operativi)

```
Visita → Scoperta → Desiderio → Configurazione → Richiesta → Contatto
   → Sopralluogo/Consulenza → Preventivo → Produzione → Consegna → Post-vendita
```

Le prime 5 fasi sono di competenza del sito e misurabili in analytics (v. documento Analytics). Le fasi da "Contatto" in poi sono operative/CRM ma il sito deve **predisporre i dati** (configurazione, note, dimensioni) perché chi risponde al lead abbia già tutto il contesto — questo è il vero valore del configuratore anche senza prezzo automatico.

## 2. Journey — Cliente privato (persona primaria)

| Fase | Cosa fa | Cosa deve trovare sul sito | Pagina chiave |
|---|---|---|---|
| Scoperta | Arriva da ricerca Google ("tavoli legno resina Verona"), Instagram/Pinterest, passaparola | Hero che comunica valore in 3 secondi, non un catalogo | Home |
| Validazione | Vuole capire se è "il brand giusto": vero artigiano o rivenditore? | Storytelling di processo, foto reali di lavorazione, nomi/volti | Chi Siamo, Processo |
| Ispirazione | Guarda esempi reali per capire cosa è possibile | Progetti simili al suo spazio (dimensioni, stile casa) | Collezione, Case Study |
| Desiderio → Azione | Vuole "provare" a immaginare il proprio tavolo | Configuratore visivo, non un modulo di richiesta generico | Configuratore |
| Richiesta | Ha configurato, vuole essere ricontattato senza impegno | Riepilogo chiaro, form breve, rassicurazione su tempi risposta | Configuratore → Riepilogo → Form |
| Attesa risposta | Prima del sopralluogo/chiamata | Email di conferma con riepilogo configurazione, prossimi passi chiari | Automazione post-invio |

**Rischio di abbandono più alto**: tra "Desiderio" e "Configurazione" se il configuratore sembra un modulo lungo. Mitigazione: preview visiva presente da subito (non un form testuale), possibilità di completare in <2 minuti, salvataggio automatico dello stato (no perdita dati se l'utente esce e torna).

## 3. Journey — Architetto / Interior Designer

| Fase | Cosa fa | Cosa deve trovare | Pagina chiave |
|---|---|---|---|
| Scoperta | Cerca un fornitore affidabile per un progetto specifico, spesso su referenza o ricerca mirata | Prova di capacità tecnica, non solo estetica | /per-architetti-e-interior-designer |
| Valutazione | Vuole capire: tempi, gestione custom, possibilità campioni, referenze con altri professionisti | Processo, case study con crediti al progettista, materiali scaricabili (scheda tecnica) | Processo, Collezione, sezione dedicata |
| Contatto | Preferisce un canale diretto, non un form generico da "richiedi preventivo privato" | CTA e form dedicati ("Parliamo del tuo progetto"), campo per allegare tavole/moodboard | /per-architetti-e-interior-designer → form dedicato |
| Collaborazione ricorrente | Se la prima esperienza è positiva, torna per altri progetti | Area "professionisti" riconoscibile, referral/vantaggi impliciti | Post-vendita (CRM, fuori scope sito Fase 1) |

Il form professionale è **distinto** da quello del configuratore: meno enfasi su "il tuo sogno", più su specifiche tecniche, tempistiche di progetto, volumi.

## 4. Journey — Hospitality (ristoranti, hotel, locali, aziende)

| Fase | Cosa fa | Cosa deve trovare | Pagina chiave |
|---|---|---|---|
| Scoperta | Ha bisogno di arredare più coperti/ambienti mantenendo identità coerente | Prova di capacità di produrre in serie limitata mantenendo artigianalità | /hospitality |
| Valutazione | Preoccupazione principale: costanza qualitativa su più pezzi, tempi di consegna per apertura/ristrutturazione | Case study hospitality reali, numeri (quanti pezzi, quanto tempo) | Case study dedicati |
| Contatto | Decisione spesso collegiale (proprietario + designer + general contractor) | Materiale condivisibile (PDF/scheda), referente diretto | Form dedicato + contatto diretto |

## 5. Mappa CTA per fase (coerenza cross-page richiesta dal brief)

| Fase del funnel | CTA primaria | CTA secondaria |
|---|---|---|
| Home / awareness | "Progetta il tuo pezzo" | "Scopri Perla Nera" |
| Collezione (categoria specifica, es. Tavoli) | "Progetta il tuo pezzo" | "Scopri il progetto" (→ case study correlato) |
| Collezione / Case study (indice) | "Richiedi un progetto simile" | "Scopri Perla Nera" |
| Processo, Studio | "Progetta il tuo pezzo" | "Parliamo del tuo spazio" |
| Servizi | "Richiedi un preventivo" | "Contattaci" |
| Cura e Manutenzione | "Richiedi un intervento" | — |
| Per Architetti | "Parliamo del tuo progetto" | "Scarica la scheda tecnica" (Fase 2) |
| Hospitality | "Parliamo del tuo progetto" | "Richiedi un preventivo" |
| Contatti | "Invia richiesta" | "Chiama" / "WhatsApp" |
| Footer (tutte le pagine) | "Progetta il tuo pezzo" | — |

Ogni pagina ha **una sola** CTA primaria visivamente dominante — coerente con la regola "un solo CTA principale per schermata" del design system (evita di diluire l'attenzione, principio confermato anche dai dati UX consultati).

## 6. Micro-conversioni da misurare (oltre al lead finale)

Utili perché il ciclo di vendita di un tavolo su misura è lungo (giorni/settimane) — il sito deve dare segnali di interesse anche prima del lead:
`view_project`, `start_configurator`, `configurator_step_completed`, `configurator_abandoned_at_step`, `phone_click`, `whatsapp_click`, `download_scheda_tecnica` (Fase 2). Dettagli in Documento 09 — Analytics.
