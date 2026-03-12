"use client";

import { useState, useEffect, useRef } from "react";
import Tag from "./Tag";
import Editable from "./Editable";
import { useEdit } from "@/contexts/EditContext";

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  "Contract":   { bg: "rgba(37, 99, 235, 0.08)",  text: "#2563eb", border: "rgba(37, 99, 235, 0.2)" },
  "Full-time":  { bg: "rgba(71, 168, 189, 0.1)",  text: "#2a9db5", border: "rgba(71, 168, 189, 0.25)" },
  "Freelance":  { bg: "rgba(99, 130, 200, 0.1)",  text: "#4a6fa5", border: "rgba(99, 130, 200, 0.25)" },
  "Volunteer":  { bg: "rgba(126, 207, 239, 0.1)", text: "#4a9ebe", border: "rgba(126, 207, 239, 0.3)" },
};

export default function Experience() {
  const { data } = useEdit();
  const experience = data.experience.entries;
  const [activeIndex, setActiveIndex] = useState(-1);
  const [bumpIndex, setBumpIndex] = useState(-1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const entryRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const el = containerRef.current;
      const rect = el.getBoundingClientRect();
      const total = el.scrollHeight;
      const scrolled = -rect.top + window.innerHeight * 0.4;
      const progress = Math.max(0, Math.min(1, scrolled / total));
      setScrollProgress(progress);

      // Find active entry via refs
      let found = -1;
      entryRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const r = ref.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.55) found = i;
      });
      if (found !== activeIndex) {
        setActiveIndex(found);
        setBumpIndex(found);
        setTimeout(() => setBumpIndex(-1), 450);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [activeIndex]);

  return (
    <div style={{ position: "relative" }}>

      {/* Main content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
          <h1>Experience</h1>
          <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Work history and roles.</p>
        </div>

        <div ref={containerRef} style={{ position: "relative", display: "flex", flexDirection: "column", gap: "0" }}>

          {/* Left axis line */}
          <div style={{
            position: "absolute",
            left: "0.5rem",
            top: "0.5rem",
            bottom: "2.5rem",
            width: "1px",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.7) 0%, rgba(210,225,248,0.4) 60%, transparent 100%)",
            boxShadow: "0 0 6px 2px rgba(255,255,255,0.2), 0 0 1px 0px rgba(255,255,255,0.8)",
            pointerEvents: "none",
          }} />

          {experience.map((e, i) => {
            const pal = typeColors[e.type] ?? typeColors["Freelance"];
            const isActive = i === activeIndex;
            const isBump = i === bumpIndex;
            return (
              <div
                key={i}
                ref={el => { entryRefs.current[i] = el; }}
                style={{ display: "flex", gap: "1.5rem", paddingBottom: "2.5rem" }}
              >
                {/* Synapse dot column */}
                <div style={{ flexShrink: 0, width: "1rem", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "0.35rem" }}>
                  <div style={{
                    width: isActive ? "0.75rem" : i % 3 === 0 ? "0.3rem" : "0.25rem",
                    height: isActive ? "0.75rem" : i % 3 === 0 ? "0.3rem" : "0.25rem",
                    borderRadius: "50%",
                    background: isActive
                      ? "radial-gradient(circle, #ffffff 0%, rgba(210,230,255,0.9) 50%, transparent 100%)"
                      : "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(210,225,248,0.5) 60%, transparent 100%)",
                    boxShadow: isActive
                      ? "0 0 8px 4px rgba(255,255,255,0.7), 0 0 20px 8px rgba(200,220,255,0.4)"
                      : "0 0 4px 1px rgba(255,255,255,0.35), 0 0 8px 2px rgba(210,225,248,0.15)",
                    transition: "width 0.4s ease, height 0.4s ease, box-shadow 0.4s ease",
                    ...(isActive ? {
                      animationName: "star-pulse",
                      animationDuration: "2.5s",
                      animationTimingFunction: "ease-in-out",
                      animationIterationCount: "infinite",
                    } : {}),
                    ...(isBump ? {
                      animationName: "synapse-bump",
                      animationDuration: "0.45s",
                      animationTimingFunction: "ease-out",
                      animationIterationCount: "1",
                    } : {}),
                  }} />
                </div>

                {/* Entry body */}
                <div style={{ flex: 1, paddingBottom: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
                      {e.period}{e.duration ? ` · ${e.duration}` : ""}
                    </span>
                    <span style={{
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 500,
                      letterSpacing: "0.05em",
                      padding: "0.12em 0.5em",
                      borderRadius: "0.2rem",
                      background: pal.bg,
                      color: pal.text,
                      border: `1px solid ${pal.border}`,
                      textTransform: "uppercase",
                    }}>{e.type}</span>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>{e.location}</span>
                  </div>

                  <p style={{ fontWeight: 500, fontSize: "0.9375rem", color: "var(--text-primary)", lineHeight: 1.3 }}>{e.role}</p>
                  <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", marginTop: "0.15rem", marginBottom: "0.75rem" }}>{e.org}</p>

                  {e.bullets.length > 0 && (
                    <ul style={{ paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.35rem", marginBottom: "0.875rem" }}>
                      {e.bullets.map((b, j) => (
                        <li key={j} style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                          <Editable file="experience" path={`entries[id=${e.id}].bullets[${j}]`} tag="span" multiline style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.65 }} />
                        </li>
                      ))}
                    </ul>
                  )}

                  {e.tags.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                      {e.tags.map((t) => <Tag key={t}>{t}</Tag>)}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
