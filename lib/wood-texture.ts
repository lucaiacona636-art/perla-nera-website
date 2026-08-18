// Generatore di venatura procedurale — placeholder deliberato in attesa di
// fotografia/scan reali del legno. Non un colore piatto: ogni essenza ha un
// "carattere" di venatura diverso (n. linee, ondulazione, contrasto, nodi),
// e ogni chiamata con un seed diverso produce un'asse visivamente diversa
// dalla precedente — usato per dare a ogni tavola del tavolo la propria
// identità invece di ripetere la stessa texture ovunque.
// Sostituibile 1:1 con `albedoMapUrl` nel catalogo (Documento 6 §2) senza
// toccare i componenti che la consumano.

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

function shade(hex: string, amount: number) {
  const { r, g, b } = hexToRgb(hex);
  const clamp = (v: number) => Math.max(0, Math.min(255, v));
  const f = (c: number) => clamp(Math.round(c + amount));
  return `rgb(${f(r)}, ${f(g)}, ${f(b)})`;
}

export interface WoodGrainProfile {
  /** Numero di linee di venatura — più basso = tavole larghe e pulite (rovere), più alto = fitta (ulivo). */
  lineCount: [number, number];
  /** Ampiezza dell'ondulazione delle linee — bassa = regolare (rovere), alta = mossa (olmo). */
  waviness: number;
  /** Contrasto delle linee rispetto al fondo — deciso per noce/ulivo, tenue per rovere. */
  contrast: [number, number];
  /** Densità di nodi — alta per ulivo, bassa per rovere. */
  knotDensity: number;
  /** Variazione di tono tra bande — dà profondità/irregolarità naturale. */
  bandVariation: number;
}

// Un profilo per essenza coerente con le descrizioni in content/configurator/essences.ts:
// noce = venatura scura e decisa; rovere = ampia e regolare; olmo = mossa e
// imprevedibile; ulivo = fitta e nodosa con striature scure.
const GRAIN_PROFILES: Record<string, WoodGrainProfile> = {
  noce: { lineCount: [16, 22], waviness: 5, contrast: [30, 60], knotDensity: 0.5, bandVariation: 22 },
  rovere: { lineCount: [8, 12], waviness: 2, contrast: [14, 26], knotDensity: 0.2, bandVariation: 14 },
  olmo: { lineCount: [20, 30], waviness: 12, contrast: [18, 38], knotDensity: 0.6, bandVariation: 30 },
  ulivo: { lineCount: [30, 42], waviness: 7, contrast: [26, 52], knotDensity: 1.4, bandVariation: 26 },
};

const DEFAULT_PROFILE: WoodGrainProfile = GRAIN_PROFILES.noce!;

function resolveProfile(essenceId?: string): WoodGrainProfile {
  if (!essenceId) return DEFAULT_PROFILE;
  return GRAIN_PROFILES[essenceId] ?? DEFAULT_PROFILE;
}

export function paintWoodGrain(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  baseColor: string,
  seed: number,
  essenceId?: string
) {
  const rand = mulberry32(seed);
  const profile = resolveProfile(essenceId);

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, width, height);

  // Bande di tono per dare profondità prima della venatura vera e propria —
  // l'ampiezza della variazione dipende dal carattere dell'essenza.
  const bandCount = 5 + Math.floor(rand() * 3);
  for (let i = 0; i < bandCount; i++) {
    const y = (height / bandCount) * i + (rand() - 0.5) * (height / bandCount) * 0.6;
    const bandHeight = height / bandCount + rand() * 20;
    const tone = shade(baseColor, (rand() - 0.5) * profile.bandVariation);
    ctx.fillStyle = tone;
    ctx.globalAlpha = 0.35;
    ctx.fillRect(0, y, width, bandHeight);
  }
  ctx.globalAlpha = 1;

  // Linee di venatura: curve orizzontali, più o meno ondulate/fitte/contrastate
  // secondo il profilo dell'essenza.
  const [lineMin, lineMax] = profile.lineCount;
  const lineCount = Math.round(lineMin + rand() * (lineMax - lineMin));
  const [contrastMin, contrastMax] = profile.contrast;
  for (let i = 0; i < lineCount; i++) {
    const baseY = (height / lineCount) * i + rand() * 6;
    const darkness = -(contrastMin + rand() * (contrastMax - contrastMin));
    ctx.strokeStyle = shade(baseColor, darkness);
    ctx.globalAlpha = 0.16 + rand() * 0.22;
    ctx.lineWidth = 0.5 + rand() * 1.5;
    ctx.beginPath();
    const segments = 10;
    ctx.moveTo(0, baseY);
    let prevX = 0;
    let prevY = baseY;
    for (let s = 1; s <= segments; s++) {
      const x = (width / segments) * s;
      const y = baseY + Math.sin(s * 0.9 + seed) * profile.waviness + (rand() - 0.5) * profile.waviness * 1.4;
      const cpx = (prevX + x) / 2;
      const cpy = (prevY + y) / 2;
      ctx.quadraticCurveTo(prevX, prevY, cpx, cpy);
      prevX = x;
      prevY = y;
    }
    ctx.lineTo(width, prevY);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Nodi occasionali — densità secondo il profilo (l'ulivo ne ha molti di più del rovere).
  const knotCount = Math.round(profile.knotDensity * (0.6 + rand() * 1.2));
  for (let i = 0; i < knotCount; i++) {
    const cx = rand() * width;
    const cy = rand() * height;
    const r = 5 + rand() * 9;
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    gradient.addColorStop(0, shade(baseColor, -75));
    gradient.addColorStop(0.6, shade(baseColor, -42));
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
    // Anello concentrico per leggere il nodo come reale, non solo una macchia.
    ctx.strokeStyle = shade(baseColor, -55);
    ctx.globalAlpha = 0.4;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 1.4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  // Grana fine (rumore leggero).
  const noiseDots = Math.floor((width * height) / 900);
  for (let i = 0; i < noiseDots; i++) {
    const x = rand() * width;
    const y = rand() * height;
    ctx.fillStyle = `rgba(0,0,0,${rand() * 0.05})`;
    ctx.fillRect(x, y, 1, 1);
  }
}

export function createWoodCanvas(baseColor: string, seed: number, size = 256, essenceId?: string): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) paintWoodGrain(ctx, size, size, baseColor, seed, essenceId);
  return canvas;
}
