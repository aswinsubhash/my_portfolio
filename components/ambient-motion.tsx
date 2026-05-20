"use client";

export function AmbientMotion() {
  return (
    <div className="ambient-motion" aria-hidden="true">
      <span className="ambient-motion__glow ambient-motion__glow--primary" />
      <span className="ambient-motion__glow ambient-motion__glow--secondary" />
      <span className="ambient-motion__scan ambient-motion__scan--one" />
      <span className="ambient-motion__scan ambient-motion__scan--two" />
      <span className="ambient-motion__trace ambient-motion__trace--one" />
      <span className="ambient-motion__trace ambient-motion__trace--two" />
      <span className="ambient-motion__trace ambient-motion__trace--three" />
    </div>
  );
}
