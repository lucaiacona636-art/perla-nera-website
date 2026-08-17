import type { Config } from "tailwindcss";

// Design tokens — mirror docs/strategy/03-design-system.md exactly.
// Do not hand-tune values here without updating that document too.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0A09",
        "ink-2": "#1B1712",
        "ink-3": "#2A241D",
        ivory: "#F6F2EB",
        "ivory-2": "#FBF9F5",
        "line-dark": "#33291F",
        "line-light": "#E4DDCF",
        "text-dark": "#F6F2EB",
        "text-dark-muted": "#A79E8E",
        "text-light": "#17140F",
        "text-light-muted": "#6B6153",
        bronze: "#8A7458",
        "bronze-hi": "#B4A17F",
        wood: {
          noce: "#6B4B34",
          rovere: "#B08D5B",
          olmo: "#8C7355",
          ulivo: "#A99461",
        },
        resin: {
          black: "#141414",
        },
        success: "#5C7A5E",
        error: "#A24B3F",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      // Nota: niente override delle chiavi numeriche 9-12 — Tailwind ha già
      // 96/128/160/192px sotto le chiavi standard 24/32/40/48 (v. sotto:
      // Documento 3 §3 "sp-9..sp-12" corrisponde a queste). Ridefinire 9-12
      // qui aveva silenziosamente rotto ogni py-10/gap-9/mt-12 "normale"
      // usato altrove nel codice per spaziature piccole.
      borderRadius: {
        sm: "2px",
        md: "4px",
      },
      boxShadow: {
        sm: "0 2px 8px rgba(11,10,9,0.08)",
        md: "0 8px 24px rgba(11,10,9,0.12)",
        lg: "0 16px 48px rgba(11,10,9,0.18)",
      },
      maxWidth: {
        container: "1440px",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
