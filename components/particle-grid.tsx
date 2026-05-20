"use client";

import { useEffect, useRef } from "react";

function accentRgb(): string {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-accent")
    .trim();
  // hex → r,g,b
  const hex = raw.startsWith("#") ? raw.slice(1) : raw;
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `${r},${g},${b}`;
}

function isLight() {
  return document.documentElement.classList.contains("light");
}

export function ParticleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let mouse = { x: -999, y: -999 };
    let rafId: number;

    const SPACING = 45;
    const RADIUS = 130;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      const light = isLight();
      const rgb = accentRgb();
      const BASE_OPACITY = light ? 0.12 : 0.09;
      const HOVER_OPACITY = light ? 0.40 : 0.48;

      const cols = Math.ceil(canvas!.width / SPACING);
      const rows = Math.ceil(canvas!.height / SPACING);

      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const x = c * SPACING;
          const y = r * SPACING;

          let opacity = BASE_OPACITY;

          if (!reduce && !coarse) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < RADIUS) {
              const t = 1 - dist / RADIUS;
              opacity = BASE_OPACITY + (HOVER_OPACITY - BASE_OPACITY) * t * t;
            }
          }

          ctx!.beginPath();
          ctx!.arc(x, y, 1.1, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${rgb},${opacity})`;
          ctx!.fill();
        }
      }

      rafId = requestAnimationFrame(draw);
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };

    resize();
    window.addEventListener("resize", resize);
    if (!coarse) window.addEventListener("mousemove", onMouseMove);
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
