import { ImageResponse } from "next/og";
import { personal } from "@/lib/content";

export const runtime = "edge";
export const alt = `${personal.name} — ${personal.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(80% 60% at 50% 0%, rgba(96,165,250,0.18), transparent 60%), #08080b",
          color: "#ededed",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "20px",
            color: "#a1a1aa",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "999px",
              background: "#34d399",
            }}
          />
          {personal.location}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "92px",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {personal.name}
          </div>
          <div
            style={{
              fontSize: "32px",
              color: "#ededed",
              fontWeight: 500,
            }}
          >
            {personal.title}
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "#60a5fa",
              fontFamily: "monospace",
            }}
          >
            {personal.subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#71717a",
            fontFamily: "monospace",
            fontSize: "16px",
          }}
        >
          <span>aswin.dev</span>
          <span>2.5+ years · Flutter</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
