# Design System — Perla Nera

> Documento 4 di 12. Fondazioni visive: colore, tipografia, spaziatura, griglia, componenti, accessibilità. Prodotto con il supporto della skill `ui-ux-pro-max` (query su style/color/typography per il segmento arredo di lusso), poi adattato in modo specifico al posizionamento definito nel Documento 0.

## 1. Colore

### 1.1 Decisione chiave: due superfici, non un solo "dark mode"

Come motivato nel Documento 0 §4, il sistema non è un dark theme classico ma **due palette di superficie** che si alternano per sezione (`data-surface="dark" | "light"`), con lo stesso set di token semantici che punta a valori diversi a seconda della superficie attiva.

### 1.2 Token primitivi

```css
/* Neutri — caldi, mai puramente acromatici */
--n-950: #0B0A09;   /* nero profondo, base superfici scure */
--n-900: #14110D;
--n-800: #1E1A15;   /* superficie scura elevata (card su dark) */
--n-700: #2A241D;   /* bordo su dark */
--n-500: #6B6153;   /* grigio caldo medio (testo mutato) */
--n-300: #A79E8E;   /* grigio caldo chiaro (testo mutato su dark) */
--n-100: #E4DDCF;   /* bordo su light */
--n-50:  #F6F2EB;   /* avorio, base superfici chiare */
--n-0:   #FBF9F5;   /* superficie chiara elevata (card su light) */

/* Legno — usati come "material tag", non come colori UI diffusi */
--wood-noce:  #6B4B34;
--wood-rovere: #B08D5B;
--wood-olmo:   #8C7355;
--wood-ulivo:  #A99461;

/* Accento metallico discreto (bronzo/pewter desaturato) */
--accent-bronze:       #8A7458;
--accent-bronze-hover: #A6906D;

/* Resina (estendibile — v. Documento Configuratore) */
--resin-black: #141414;
--resin-clear: transparent; /* resa via materiale 3D/foto, non swatch piatto */

/* Funzionali — desaturati per restare nella palette */
--state-success: #5C7A5E;
--state-error:   #A24B3F;
```

**Perché niente oro lucido**: è il token più esplicitamente evitato. `--accent-bronze` ha saturazione bassa apposta — deve leggersi come un dettaglio metallico reale (una vite, una maniglia in ottone anticato), mai come "colore lusso da template".

### 1.3 Token semantici (per superficie)

| Token semantico | Su superficie **dark** | Su superficie **light** |
|---|---|---|
| `--surface-base` | `--n-950` | `--n-50` |
| `--surface-elevated` (card, header sticky) | `--n-800` | `--n-0` |
| `--border` | `--n-700` | `--n-100` |
| `--text-primary` | `--n-50` | `--n-950` |
| `--text-muted` | `--n-300` | `--n-500` |
| `--accent` | `--accent-bronze-hover` | `--accent-bronze` |
| `--focus-ring` | `--n-50` (max contrasto) | `--n-950` (max contrasto) |

### 1.4 Sistema CTA (decisione di design, non solo colore)

**Il bronzo non è mai il riempimento del CTA primario.** Il pulsante primario usa sempre **inversione a massimo contrasto** rispetto alla superficie:

- Su superficie dark → CTA primario: fondo `--n-50` (avorio), testo `--n-950`.
- Su superficie light → CTA primario: fondo `--n-950` (nero), testo `--n-50`.
- CTA secondario (outline): bordo 1px `--accent`, testo `--text-primary`, sfondo trasparente.
- CTA terziario/link: solo testo + sottolineatura animata (`--accent`).

Motivazione: un bottone "oro pieno" è la firma visiva di ogni sito luxury-template generico. L'inversione netta nero/avorio comunica sicurezza e materia senza ricorrere al cliché, ed è per costruzione sempre ad alto contrasto (accessibilità superata "gratis").

### 1.5 Contrasto — verifica

| Coppia | Ratio | Esito |
|---|---|---|
| `--n-50` su `--n-950` (testo su dark) | 17.9:1 | AAA |
| `--n-950` su `--n-50` (testo su light) | 17.9:1 | AAA |
| `--n-300` su `--n-950` (muted su dark) | 7.1:1 | AAA |
| `--n-500` su `--n-50` (muted su light) | 5.6:1 | AA |
| `--accent-bronze` su `--n-50` (link su light) | 3.1:1 | AA large text / UI, non per body text piccolo |
| `--n-950` testo su `--accent-bronze-hover` (bottone outline hover) | 4.6:1 | AA |

Regola applicata nel component system: `--accent` non si usa mai per body text sotto i 18px, solo per elementi large/UI (v. §7 Accessibilità).

## 2. Tipografia

### 2.1 Font selezionati

| Ruolo | Font | Perché |
|---|---|---|
| Display / titoli | **Fraunces** (variable, optical size + soft axis) | Serif contemporaneo e "caldo": ha dettagli quasi disegnati a mano che evocano artigianalità senza scadere nel classico-fashion. Alternativa deliberata a Playfair Display, il font più abusato nei siti luxury generati o da template — Fraunces è meno atteso, più distintivo, e si adatta bene a pesi molto grandi (hero) restando leggibile. |
| Testo / UI | **Inter** | Massima leggibilità e supporto tecnico (variable font, ottima resa su schermo, ampio hinting), neutro rispetto al display font così la voce del brand resta nel serif e nel copy, non nella UI. |
| Label / eyebrow / dati tecnici | **IBM Plex Mono** (solo per micro-testo: didascalie, numeri di catalogo, dimensioni, tag essenza, breadcrumb) | Rinforza il concetto di "scheda tecnica da atelier" — coerente con un brand che mostra misure, essenze e processo come parte del valore. Usato con tracking largo e maiuscolo, mai per body text. |

```
Google Fonts:
Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700
Inter:wght@400;500;600;700
IBM+Plex+Mono:wght@400;500
```

Self-host consigliato in produzione (v. Documento Performance) invece del CDN Google Fonts, per Core Web Vitals e privacy (nessuna richiesta a domini terzi).

### 2.2 Scala tipografica (fluida, `clamp()`)

| Token | Font | Mobile → Desktop | Uso |
|---|---|---|---|
| `--text-display-1` | Fraunces 500 | `clamp(2.75rem, 6vw, 6rem)` | H1 hero |
| `--text-display-2` | Fraunces 500 | `clamp(2.25rem, 4.5vw, 4rem)` | H1 pagine interne |
| `--text-h2` | Fraunces 500 | `clamp(1.75rem, 3vw, 2.75rem)` | Titoli di sezione |
| `--text-h3` | Fraunces 500 | `clamp(1.375rem, 2vw, 1.875rem)` | Sottotitoli |
| `--text-lead` | Inter 400 | `clamp(1.125rem, 1.4vw, 1.375rem)` | Sub-headline, intro |
| `--text-body` | Inter 400 | `1.0625rem` (17px) | Testo corrente |
| `--text-small` | Inter 400 | `0.9375rem` (15px) | Microcopy, caption |
| `--text-label` | IBM Plex Mono 500 | `0.75rem` + tracking `0.08em` uppercase | Eyebrow, tag, dati tecnici |

Line-height: 1.1–1.15 per i display, 1.5 per lead/body, 1.4 per small/label (soglie skill: 1.5–1.75 body — qui 1.5 in quanto misura riga controllata, v. sotto).

Misura riga (line length): contenuto testuale in colonne max `65ch` — mai testo a piena larghezza su desktop, per leggibilità (principio confermato dalla skill: 65–75 caratteri per riga).

## 3. Spaziatura

Scala 8pt, con step aggiuntivi larghi per il ritmo "editoriale" richiesto da un brand premium (il lusso si esprime anche con lo spazio vuoto):

```
--space-1: 4px   --space-2: 8px    --space-3: 12px   --space-4: 16px
--space-5: 24px  --space-6: 32px   --space-7: 48px   --space-8: 64px
--space-9: 96px  --space-10: 128px --space-11: 160px --space-12: 192px
```

- Padding interno componenti: `--space-3`–`--space-5`.
- Gap tra elementi correlati (card in griglia): `--space-5`–`--space-6`.
- Spaziatura tra sezioni: `--space-9` mobile → `--space-12` desktop (il "respiro" che distingue un sito premium da un sito compresso).

## 4. Griglia & layout

- Container max-width: `1440px` (full-bleed consentito per immagini/hero fino a `100vw`).
- Colonne: 12 desktop (`lg`+), 6 tablet (`md`), 4 mobile.
- Gutter: `24px` desktop, `16px` mobile.
- Margine laterale minimo: `5vw` mobile, `clamp(24px, 6vw, 96px)` desktop — mai contenuto "incollato" al bordo tranne immagini full-bleed intenzionali.

## 5. Border radius

Deliberatamente minimo — un brand di falegnameria comunica precisione con angoli netti, non con la morbidezza da "app SaaS":

```
--radius-sm: 2px   /* input, bottoni, tag */
--radius-md: 4px   /* card piccole, badge */
--radius-none: 0px /* immagini, card prodotto/progetto, contenitori editoriali */
```

Nessun elemento userà radius superiore a 4px. Le foto di prodotto sono sempre a spigolo vivo (coerenza col linguaggio "bordo vivo" del prodotto stesso).

## 6. Ombre

Uso minimo, solo per elementi realmente sopraelevati (dropdown, modale, header sticky dopo scroll) — mai come decorazione di card statiche:

```css
--shadow-sm: 0 2px 8px rgba(11,10,9,0.08);
--shadow-md: 0 8px 24px rgba(11,10,9,0.12);
--shadow-lg: 0 16px 48px rgba(11,10,9,0.18);
```

Colore ombra sempre derivato da `--n-950` (mai nero puro/freddo), per restare coerenti con la palette calda.

## 7. Sistema bottoni & interazioni

| Variante | Stato default | Hover | Focus | Disabled |
|---|---|---|---|---|
| Primario | fill inversione (v. §1.4) | leggero scale 1.0→1.02 + darken/lighten 6% | ring 2px `--focus-ring` offset 2px | opacity 0.4, no pointer |
| Secondario (outline) | bordo `--accent` 1px | fill `--accent` 8% opacity | ring 2px `--focus-ring` | opacity 0.4 |
| Link/terziario | testo + underline `--accent` 1px offset | underline thickness 2px | ring visibile su testo | opacity 0.5 |

Transizioni: `150–250ms ease-out` per hover, `200ms` per focus-ring — mai istantanee (checklist skill), mai oltre 300ms (sensazione di lentezza su un'azione diretta).

Target touch minimo 44×44px su tutti gli elementi interattivi, `cursor: pointer` esplicito su ogni elemento cliccabile.

## 8. Component system (inventario base per l'MVP)

Ogni componente esiste in variante `dark` e `light` pilotata dal token di superficie, mai con classi duplicate:

- `SiteHeader` (sticky, trasparente su hero → superficie piena dopo scroll)
- `MobileMenu` (full-screen overlay)
- `SiteFooter`
- `Section` (wrapper con prop `surface="dark"|"light"` + spaziatura verticale standard)
- `Hero` (varianti: home / pagina interna)
- `Button` (primario/secondario/terziario, come sopra)
- `ProjectCard` (Collezione, Home) — immagine + eyebrow (mono) + titolo (Fraunces) + essenza/resina tag
- `EssenceSwatch` (chip materiale con texture reale, non solo colore piatto)
- `MaterialTag` (badge piccolo: essenza, resina, finitura)
- `Accordion` (FAQ)
- `Testimonial` / `PullQuote`
- `StatBlock` (numeri: anni esperienza, pezzi realizzati, ecc. — con IBM Plex Mono)
- `ProcessTimeline` (verticale, per pagina Processo)
- `FormField` (input, select, textarea, file upload — label sempre visibile, mai solo placeholder)
- `ConfiguratorStepNav`, `ConfiguratorPreviewStage`, `ConfiguratorSummary` (v. Documento Configuratore)
- `Lightbox`/`Gallery`
- `CTABanner` (sezione di chiusura pagina)
- `Breadcrumb`
- `CookieConsentBanner`

## 9. Breakpoint responsive

```
base:  0–479px    (mobile piccolo)
sm:    480–767px  (mobile grande)
md:    768–1023px (tablet)
lg:    1024–1279px (desktop)
xl:    1280–1535px (desktop grande)
2xl:   1536px+     (schermi molto grandi — il brief chiede esplicitamente supporto qui)
```

Approccio mobile-first in ogni componente; verifica esplicita a `375px` (iPhone SE-class, il caso peggiore reale) oltre ai breakpoint sopra.

## 10. Accessibilità (target WCAG 2.2 AA)

- Contrasto testo normale ≥ 4.5:1, testo largo/UI ≥ 3:1 — tabella di verifica in §1.5, da ricontrollare a ogni nuova coppia colore introdotta.
- Focus visibile su ogni elemento interattivo (`:focus-visible`, mai `outline: none` senza sostituto).
- Navigazione completa da tastiera, incluso il configuratore (step navigabili con Tab/Invio, preview annunciata via `aria-live="polite"` quando cambia una selezione).
- `prefers-reduced-motion`: tutte le reveal/parallax disabilitate o ridotte a semplice fade, il 3D passa a stato statico finale.
- HTML semantico (landmark `header/nav/main/footer`, heading gerarchici senza salti), skip-link "Vai al contenuto".
- Alt text descrittivo su ogni immagine di prodotto (materiale, essenza, contesto — utile anche per SEO immagini, v. Documento SEO).
- Form: label sempre visibili e associate (`for`/`id`), errori annunciati vicino al campo + `aria-describedby`, non solo colore per indicare errore.
- Video/3D: alternativa testuale/immagine statica per chi disattiva JS o ha connessione lenta (v. Documento 3D).
