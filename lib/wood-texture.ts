// Generatore di venatura procedurale — placeholder deliberato in attesa di
// fotografia/scan reali del legno (v. conversazione di progetto: l'utente ha
// chiesto materiali percepiti come reali, non swatch piatti; qui non esiste
// ancora fotografia, quindi si genera una venatura credibile via canvas invece
// di un colore pieno). Sostituibile 1:1 con `albedoMapUrl` nel catalogo
// (Documento 6 §2) senza toccare i componenti che la consumano.

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

export function paintWoodGrain(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  baseColor: string,
  seed: number
) {
  const rand = mulberry32(seed);

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, width, height);

  // Bande di tono per dare profondità prima della venatura vera e propria.
  const bandCount = 5 + Math.floor(rand() * 3);
  for (let i = 0; i < bandCount; i++) {
    const y = (height / bandCount) * i + (rand() - 0.5) * (height / bandCount) * 0.6;
    const bandHeight = height / bandCount + rand() * 20;
    const tone = shade(baseColor, (rand() - 0.5) * 26);
    ctx.fillStyle = tone;
    ctx.globalAlpha = 0.35;
    ctx.fillRect(0, y, width, bandHeight);
  }
  ctx.globalAlpha = 1;

  // Linee di venatura: curve orizzontali leggermente ondulate, più scure.
  const lineCount = 26 + Math.floor(rand() * 10);
  for (let i = 0; i < lineCount; i++) {
    const baseY = (height / lineCount) * i + rand() * 6;
    const darkness = -18 - rand() * 40;
    ctx.strokeStyle = shade(baseColor, darkness);
    ctx.globalAlpha = 0.18 + rand() * 0.22;
    ctx.lineWidth = 0.6 + rand() * 1.6;
    ctx.beginPath();
    const segments = 8;
    ctx.moveTo(0, baseY);
    let prevX = 0;
    let prevY = baseY;
    for (let s = 1; s <= segments; s++) {
      const x = (width / segments) * s;
      const y = baseY + Math.sin(s * 0.9 + seed) * (4 + rand() * 10) + (rand() - 0.5) * 6;
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

  // Nodi occasionali.
  const knotCount = 1 + Math.floor(rand() * 2);
  for (let i = 0; i < knotCount; i++) {
    const cx = rand() * width;
    const cy = rand() * height;
    const r = 6 + rand() * 10;
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    gradient.addColorStop(0, shade(baseColor, -70));
    gradient.addColorStop(0.6, shade(baseColor, -40));
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
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

export function createWoodCanvas(baseColor: string, seed: number, size = 256): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) paintWoodGrain(ctx, size, size, baseColor, seed);
  return canvas;
}
