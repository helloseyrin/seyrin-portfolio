"use client";

import { useEffect, useRef } from "react";

const NODE_COUNT_DESKTOP  = 52;
const NODE_COUNT_MOBILE   = 20;
const CONN_DIST_DESKTOP   = 185;
const CONN_DIST_MOBILE    = 120;
const PULSE_INTERVAL      = 900;

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  twinkleOffset: number;
  r: number;
  colorIdx: number;
}

interface Pulse {
  fromIdx: number;
  toIdx:   number;
  progress: number;
  speed:    number;
}

function hexToRgb(hex: string): string {
  const h = hex.trim().replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

export default function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const style  = getComputedStyle(document.documentElement);
    const ice        = hexToRgb(style.getPropertyValue("--accent-ice").trim());
    const periwinkle = hexToRgb(style.getPropertyValue("--accent-periwinkle").trim());
    const violet     = "192, 132, 252";
    const palette    = [ice, periwinkle, violet];

    let width  = window.innerWidth;
    let height = window.innerHeight;
    canvas.width  = width;
    canvas.height = height;

    const isMobile = width <= 768;
    const NODE_COUNT    = isMobile ? NODE_COUNT_MOBILE  : NODE_COUNT_DESKTOP;
    const CONNECTION_DIST = isMobile ? CONN_DIST_MOBILE : CONN_DIST_DESKTOP;

    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x:             Math.random() * width,
      y:             Math.random() * height,
      vx:            (Math.random() - 0.5) * 0.3,
      vy:            (Math.random() - 0.5) * 0.3,
      twinkleOffset: Math.random() * Math.PI * 2,
      r:             1.2 + Math.random() * 1.6,
      colorIdx:      Math.floor(Math.random() * 3),
    }));

    const pulses: Pulse[] = [];
    let lastPulse = 0;
    let animId: number;
    let t = 0;

    const resize = () => {
      width = window.innerWidth; height = window.innerHeight;
      canvas.width = width; canvas.height = height;
    };
    window.addEventListener("resize", resize);

    const spawnPulse = () => {
      const candidates: [number, number][] = [];
      for (let i = 0; i < nodes.length; i++)
        for (let j = i + 1; j < nodes.length; j++)
          if (Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y) < CONNECTION_DIST)
            candidates.push([i, j]);
      if (!candidates.length) return;
      const [fi, ti] = candidates[Math.floor(Math.random() * candidates.length)];
      pulses.push({ fromIdx: fi, toIdx: ti, progress: 0, speed: 0.008 + Math.random() * 0.008 });
    };

    const draw = (timestamp: number) => {
      t = timestamp * 0.001;
      ctx.clearRect(0, 0, width, height);

      // Spawn pulses
      if (timestamp - lastPulse > PULSE_INTERVAL) {
        spawnPulse();
        if (!isMobile) spawnPulse();
        if (!isMobile && Math.random() > 0.4) spawnPulse();
        lastPulse = timestamp;
      }

      // Move nodes
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > width)  n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      // ── Edges ──────────────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (dist >= CONNECTION_DIST) continue;

          const proximity = 1 - dist / CONNECTION_DIST;
          const c = palette[nodes[i].colorIdx];

          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);

          // Glow pass
          ctx.save();
          ctx.shadowColor  = `rgba(${c}, ${proximity * 0.9})`;
          ctx.shadowBlur   = 6;
          ctx.strokeStyle  = `rgba(${c}, ${proximity * 0.55})`;
          ctx.lineWidth    = 0.9;
          ctx.stroke();
          ctx.restore();
        }
      }

      // ── Pulse trails ───────────────────────────────
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) { pulses.splice(p, 1); continue; }

        const from = nodes[pulse.fromIdx];
        const to   = nodes[pulse.toIdx];
        const px   = from.x + (to.x - from.x) * pulse.progress;
        const py   = from.y + (to.y - from.y) * pulse.progress;
        const pc   = palette[from.colorIdx];

        // Trailing glow line
        const trailStart = Math.max(0, pulse.progress - 0.18);
        const tx1 = from.x + (to.x - from.x) * trailStart;
        const ty1 = from.y + (to.y - from.y) * trailStart;
        const trailGrad = ctx.createLinearGradient(tx1, ty1, px, py);
        trailGrad.addColorStop(0, `rgba(${pc}, 0)`);
        trailGrad.addColorStop(1, `rgba(${pc}, 0.9)`);

        ctx.save();
        ctx.shadowColor = `rgba(${pc}, 1)`;
        ctx.shadowBlur  = 8;
        ctx.beginPath();
        ctx.moveTo(tx1, ty1);
        ctx.lineTo(px, py);
        ctx.strokeStyle = trailGrad;
        ctx.lineWidth   = 1.5;
        ctx.stroke();
        ctx.restore();

        // Hot core dot
        ctx.save();
        ctx.shadowColor = `rgba(255, 255, 255, 1)`;
        ctx.shadowBlur  = 12;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.fill();
        ctx.restore();
      }

      // ── Nodes ──────────────────────────────────────
      for (const n of nodes) {
        const twinkle = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(t * 1.3 + n.twinkleOffset));
        const nc  = palette[n.colorIdx];
        const nc2 = palette[(n.colorIdx + 1) % 3];

        // Iridescent halo via shadowBlur on a slightly-off-center ghost circle
        ctx.save();
        ctx.shadowColor = `rgba(${nc}, ${twinkle * 0.85})`;
        ctx.shadowBlur  = n.r * 9;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nc2}, ${twinkle * 0.35})`;
        ctx.fill();
        ctx.restore();

        // White-hot core
        ctx.save();
        ctx.shadowColor = "rgba(255, 255, 255, 0.9)";
        ctx.shadowBlur  = n.r * 5;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${twinkle})`;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.7 }}
    />
  );
}
