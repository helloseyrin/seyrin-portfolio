"use client";

import { useEffect, useRef } from "react";

const NODE_COUNT = 38;
const CONNECTION_DIST = 170;
const PULSE_INTERVAL = 2200;

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  twinkleOffset: number;
  r: number;
}

interface Pulse {
  fromIdx: number;
  toIdx: number;
  progress: number; // 0 → 1
  speed: number;
}

export default function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Init nodes
    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      twinkleOffset: Math.random() * Math.PI * 2,
      r: 1.5 + Math.random() * 1.5,
    }));

    const pulses: Pulse[] = [];
    let lastPulse = 0;
    let animId: number;
    let t = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", resize);

    const spawnPulse = () => {
      // Pick a random connected pair
      const candidates: [number, number][] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          if (Math.hypot(dx, dy) < CONNECTION_DIST) {
            candidates.push([i, j]);
          }
        }
      }
      if (candidates.length === 0) return;
      const [fi, ti] = candidates[Math.floor(Math.random() * candidates.length)];
      pulses.push({ fromIdx: fi, toIdx: ti, progress: 0, speed: 0.006 + Math.random() * 0.006 });
    };

    const draw = (timestamp: number) => {
      t = timestamp * 0.001;
      ctx.clearRect(0, 0, width, height);

      // Spawn pulses
      if (timestamp - lastPulse > PULSE_INTERVAL) {
        spawnPulse();
        lastPulse = timestamp;
      }

      // Move nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width)  n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.18;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(99, 170, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw & advance pulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) { pulses.splice(p, 1); continue; }

        const from = nodes[pulse.fromIdx];
        const to   = nodes[pulse.toIdx];
        const px = from.x + (to.x - from.x) * pulse.progress;
        const py = from.y + (to.y - from.y) * pulse.progress;

        // Glow
        const grd = ctx.createRadialGradient(px, py, 0, px, py, 8);
        grd.addColorStop(0,   "rgba(197, 230, 255, 0.9)");
        grd.addColorStop(0.4, "rgba(99, 170, 255, 0.4)");
        grd.addColorStop(1,   "rgba(99, 170, 255, 0)");
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(220, 240, 255, 0.95)";
        ctx.fill();
      }

      // Draw nodes (twinkle)
      for (const n of nodes) {
        const twinkle = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * 1.2 + n.twinkleOffset));
        const alpha = twinkle * 0.7;

        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 3);
        grd.addColorStop(0,   `rgba(180, 220, 255, ${alpha})`);
        grd.addColorStop(1,   `rgba(99, 170, 255, 0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 230, 255, ${alpha * 0.9})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.55,
      }}
    />
  );
}
