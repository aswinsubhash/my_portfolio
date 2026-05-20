import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Aswin Subhash — Mobile Application Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#080c11",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 90px",
          position: "relative",
          fontFamily: "monospace",
        }}
      >
        {/* Subtle grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            display: "flex",
          }}
        />

        {/* Top-left badge */}
        <div
          style={{
            position: "absolute",
            top: 56,
            left: 90,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              border: "1.5px solid rgba(6,182,212,0.45)",
              background: "rgba(6,182,212,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#06b6d4",
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            A
          </div>
          <span style={{ color: "#566775", fontSize: 13, letterSpacing: "0.12em" }}>
            aswinsubhash.vercel.app
          </span>
        </div>

        {/* Eyebrow */}
        <div
          style={{
            color: "#06b6d4",
            fontSize: 14,
            letterSpacing: "0.22em",
            marginBottom: 28,
            display: "flex",
          }}
        >
          $ whoami
        </div>

        {/* Name */}
        <div
          style={{
            color: "#dfe8ec",
            fontSize: 80,
            fontWeight: 800,
            lineHeight: 1,
            marginBottom: 20,
            display: "flex",
            letterSpacing: "-0.02em",
          }}
        >
          Aswin Subhash
          <span style={{ color: "#06b6d4" }}>.</span>
        </div>

        {/* Title */}
        <div
          style={{
            color: "#8fa0aa",
            fontSize: 28,
            marginBottom: 52,
            display: "flex",
          }}
        >
          Mobile Application Developer
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: 10 }}>
          {["Flutter", "Dart", "Android", "iOS", "Clean Architecture"].map((tag) => (
            <div
              key={tag}
              style={{
                border: "1px solid rgba(6,182,212,0.25)",
                background: "rgba(6,182,212,0.07)",
                color: "#8fa0aa",
                padding: "7px 16px",
                fontSize: 13,
                letterSpacing: "0.08em",
                display: "flex",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Available badge */}
        <div
          style={{
            position: "absolute",
            bottom: 56,
            right: 90,
            display: "flex",
            alignItems: "center",
            gap: 8,
            border: "1px solid rgba(52,211,153,0.3)",
            background: "rgba(52,211,153,0.08)",
            padding: "6px 14px",
            color: "#34d399",
            fontSize: 12,
            letterSpacing: "0.16em",
          }}
        >
          ● AVAILABLE
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
