"use client";

import { useState } from "react";
import Image from "next/image";

const glitter = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: `${Math.random() * 100}%`,
  size: `${2 + Math.random() * 3}px`,
  color: [
    "rgba(137,196,225,0.9)",
    "rgba(192,132,252,0.85)",
    "rgba(255,255,255,0.95)",
    "rgba(168,216,240,0.9)",
    "rgba(216,180,254,0.8)",
    "rgba(186,230,253,0.9)",
  ][Math.floor(Math.random() * 6)],
  delay: `${(Math.random() * 0.4).toFixed(2)}s`,
  dur: `${(0.5 + Math.random() * 0.5).toFixed(2)}s`,
  drift: `${(Math.random() * 24 - 12).toFixed(1)}px`,
}));

export default function ChaoSticker() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ position: "relative", flexShrink: 0, width: "7rem", cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glitter rain */}
      {hovered && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "visible", zIndex: 10 }}>
          {glitter.map((g) => (
            <span
              key={g.id}
              style={{
                position: "absolute",
                left: g.x,
                top: "30%",
                width: g.size,
                height: g.size,
                borderRadius: "50%",
                background: g.color,
                boxShadow: `0 0 4px 1px ${g.color}`,
                animationName: "glitter-fall",
                animationDuration: g.dur,
                animationDelay: g.delay,
                animationTimingFunction: "ease-in",
                animationFillMode: "both",
                animationIterationCount: "infinite",
                ["--drift" as string]: g.drift,
              }}
            />
          ))}
        </div>
      )}

      {/* Chao */}
      <Image
        src="/chao.png"
        alt="chao :3"
        width={112}
        height={112}
        style={{
          imageRendering: "pixelated",
          width: "7rem",
          height: "7rem",
          objectFit: "contain",
          display: "block",
          transform: hovered ? "scale(1.12) translateY(-4px)" : "scale(1)",
          transition: "transform 0.25s ease, filter 0.25s ease",
          filter: hovered ? "drop-shadow(0 0 10px rgba(192,132,252,0.5))" : "none",
        }}
      />
    </div>
  );
}
