"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

const COUNT = 55;
const CONNECT_DIST = 110;
const SPEED = 0.35;

function accentRgb(): string {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-accent")
    .trim();
  const hex = raw.startsWith("#") ? raw.slice(1) : raw;
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `${r},${g},${b}`;
}

function isLight() {
  return document.documentElement.classList.contains("light");
}

export function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = window.innerWidth;
    let H = window.innerHeight;
    let rafId: number;

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width = W;
      canvas!.height = H;
    }

    function makeParticle(): Particle {
      const angle = Math.random() * Math.PI * 2;
      const speed = reduce ? 0 : SPEED * (0.4 + Math.random() * 0.8);
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 1 + Math.random() * 1.2,
        opacity: 0.18 + Math.random() * 0.32,
      };
    }

    const particles: Particle[] = Array.from({ length: COUNT }, makeParticle);

    function draw() {
      ctx!.clearRect(0, 0, W, H);

      const light = isLight();
      const rgb = accentRgb();
      // light mode: slightly lower opacity so particles don't overpower the bg
      const opacityScale = light ? 0.65 : 1;
      const lineAlphaScale = light ? 0.7 : 1;

      if (!reduce) {
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x += W;
          if (p.x > W) p.x -= W;
          if (p.y < 0) p.y += H;
          if (p.y > H) p.y -= H;
        }
      }

      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.12 * lineAlphaScale;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `rgba(${rgb},${alpha})`;
            ctx!.lineWidth = 0.7;
            ctx!.stroke();
          }
        }
      }

      // Dots
      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${rgb},${p.opacity * opacityScale})`;
        ctx!.fill();
      }

      rafId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
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
