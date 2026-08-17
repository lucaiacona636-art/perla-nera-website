# Architettura Analytics & Tracking

> Documento 9 di 12. Predisposizione tecnica per GA4, Search Console, GTM, Meta Pixel — conforme GDPR (consenso prima del tracciamento, requisito legale in Italia/UE, non opzionale).

## 1. Stack

- **Google Tag Manager (GTM)** come unico punto di iniezione tag — GA4 e Meta Pixel si configurano *dentro* GTM, mai hardcoded nel codice sorgente: permette di aggiungere/modificare tag senza deploy.
- **Google Analytics 4** — comportamento e funnel.
- **Google Search Console** — verificata via DNS/meta tag dal giorno del lancio, sitemap sottomessa subito (Documento 6 SEO).
- **Meta Pixel** — remarketing/campagne, attivato via GTM con lo stesso gate di consenso di GA4.
- **Google Consent Mode v2** — obbligatorio: nessun tag di misurazione/marketing carica dati identificativi prima del consenso esplicito; GA4/Meta Pixel partono in modalità "consent denied" (solo dati aggregati/anonimi ammessi da Consent Mode) finché l'utente non accetta dal cookie banner (Documento 1 — pagina `/cookie`, componente `CookieConsentBanner` del design system).

## 2. Ambienti

Container GTM distinti per `production` e `staging/preview` (i deploy preview di Next.js su Vercel non devono inquinare i dati reali) — variabile d'ambiente seleziona il container ID corretto in build.

## 3. Tassonomia eventi

Eventi custom GA4 (oltre agli automatici: `page_view`, `scroll`, `session_start`):

| Evento | Trigger | Parametri |
|---|---|---|
| `view_project` | Apertura card/pagina progetto in Collezione | `project_id`, `project_name` |
| `start_configurator` | Primo step del configuratore aperto | `entry_point` (home/nav/progetto correlato), `category_id` (Documento 7 §1 — quale categoria è stata scelta allo step 0) |
| `configurator_step` | Completamento di uno step | `category_id`, `step_id`, `step_name`, `selection_id` |
| `configurator_abandoned` | Uscita dal configuratore prima del riepilogo (su `beforeunload`/cambio route) | `last_step_id` |
| `complete_configurator` | Arrivo alla schermata "Il tuo progetto" | `steps_completed_count` |
| `submit_lead` | Invio riuscito di un form lead (configuratore, contatti, professionisti, hospitality, restauro) | `form_type`, `source_page` |
| `contact_click` | Click su indirizzo/mappa | `page` |
| `phone_click` | Click su numero di telefono (`tel:`) | `page` |
| `whatsapp_click` | Click su link WhatsApp | `page` |
| `download_scheda_tecnica` *(Fase 2)* | Download PDF scheda tecnica/area professionisti | `document_id` |

Ogni evento passa dal `dataLayer` (push standardizzato via un unico helper `trackEvent(name, params)` lato frontend) verso GTM, che instrada a GA4/Meta Pixel — mai chiamate dirette sparse nel codice ai SDK dei singoli tool, per restare disaccoppiati dal provider.

## 4. Conversioni chiave (da marcare come conversione in GA4)

`submit_lead` (tutti i `form_type`) è la conversione primaria. `complete_configurator` e `phone_click`/`whatsapp_click` sono conversioni secondarie (segnali di intenzione alta anche senza form completato) — utili per valutare canali/campagne che generano interesse anche quando il lead esplicito non arriva subito.

## 5. Privacy by design

- Nessun dato personale (nome, email, telefono) finisce mai nei parametri evento GA4/Meta — solo identificatori di configurazione/pagina, mai PII.
- IP anonimizzato (comportamento default GA4).
- Cookie banner con tre stati chiari (accetta tutto / rifiuta / personalizza), non un dark pattern con "accetta" evidenziato e "rifiuta" nascosto — coerente con l'immagine di brand autorevole e con la normativa Garante Privacy italiana.
- Link diretto a `/cookie` e `/privacy` dal banner stesso.

## 6. Search Console — uso operativo, non solo installazione

Collegata a GA4 (link nativo), monitorata per: query con impression alte e CTR basso (opportunità di migliorare title/description, Documento 6 §7), errori di copertura/indicizzazione dopo ogni rilascio di nuove pagine, Core Web Vitals reali da traffico utente (a complemento dei test in Documento 10 — Performance, fatti in laboratorio).
