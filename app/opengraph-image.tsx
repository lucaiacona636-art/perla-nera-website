import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Card OG tipografica di brand — non una fotografia, per non far passare
// per "immagine di un lavoro reale" qualcosa che non lo è (Documento 1,
// vincolo esplicito). Sostituibile con una foto reale in seguito.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0B0A09",
          color: "#F6F2EB",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: "#A79E8E" }}>
          Studio di artigianato e design — Verona
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 92, fontFamily: "serif", lineHeight: 1.05 }}>
          Materia. Tempo. Unicità.
        </div>
      </div>
    ),
    size
  );
}
