"use client";

import { useState } from "react";

export default function Tag({ children }: { children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-block",
        padding: "0.24em 0.75em",
        borderRadius: "9999px",
        fontFamily: "var(--font-fira-code), 'Fira Code', ui-monospace, monospace",
        fontSize: "0.78rem",
        fontWeight: 400,
        letterSpacing: "0.02em",
        background: hovered
          ? "linear-gradient(135deg, rgba(14, 60, 140, 0.18) 0%, rgba(7, 30, 90, 0.28) 100%)"
          : "transparent",
        backdropFilter: hovered ? "blur(8px)" : undefined,
        WebkitBackdropFilter: hovered ? "blur(8px)" : undefined,
        color: hovered ? "#2563eb" : "var(--text-secondary)",
        border: hovered
          ? "1px solid rgba(99, 170, 255, 0.45)"
          : "1px solid rgba(99, 130, 200, 0.35)",
        boxShadow: hovered ? "0 0 12px rgba(147, 197, 253, 0.12)" : "none",
        transition: "all 0.18s ease",
        cursor: "default",
      }}
    >
      {children}
    </span>
  );
}
