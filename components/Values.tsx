"use client";

import { useState } from "react";

const values = [
  {
    title: "Responsible Design & Development",
    body: "Technology shapes behaviour at scale. Every design choice carries moral weight — I build with that in mind.",
  },
  {
    title: "Digital Sovereignty",
    body: "Nations, organisations, and individuals should control their own digital destiny — their data, infrastructure, and software — not rent access to it from a handful of corporations.",
  },
  {
    title: "Algorithmic Transparency",
    body: "If a system makes decisions that affect people, those people deserve to understand how. Black boxes are not neutral — they are a choice to obscure power.",
  },
  {
    title: "Human-in-the-Loop",
    body: "Automation should augment human judgment, not replace it. Especially where the stakes are high.",
  },
  {
    title: "Privacy by Design",
    body: "Privacy is not a feature you bolt on at the end. It is a constraint you design around from the start.",
  },
  {
    title: "Right to Lifelong Learning",
    body: "Access to education and skill development should not be gated by geography, income, or credential. I build in the open and share what I learn.",
  },
  {
    title: "Open Source Initiative",
    body: "The best infrastructure is infrastructure everyone can inspect, improve, and own.",
  },
  {
    title: "#QuitGPT",
    titleHref: "https://quitgpt.org",
    body: "None of my projects use or integrate OpenAI products.",
    callout: "I do not use, recommend, or integrate OpenAI API or ChatGPT and associated products.",
  },
];

export default function Values() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        <h1>Values</h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>What guides how I build and why.</p>
      </div>

      {/* Quote card */}
      <div style={{
        borderLeft: "2px solid var(--border-hover)",
        paddingLeft: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}>
        <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.75, fontStyle: "italic" }}>
          "A computer can never be held accountable, therefore a computer must never make a management decision."
        </p>
        <p style={{ fontSize: "0.75rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
          IBM training manual, 1979
        </p>
        <p style={{ fontSize: "0.8rem", color: "var(--text-dim)", lineHeight: 1.6, marginTop: "0.25rem" }}>
          Cautionary tale:{" "}
          <a
            href="https://www.ft.com/content/934cc94b-32c4-497e-9718-d87d6a7835ca"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--text-secondary)", textDecoration: "none", borderBottom: "1px solid rgba(137,196,225,0.25)" }}
          >
            Deloitte issues refund for error-ridden Australian government report that used AI
          </a>
          {" "}— FT, Oct 2025
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "flex-start" }}>
        {values.map((v, i) => {
          const isOpen = active === v.title;
          return (
            <div
              key={v.title}
              onMouseEnter={() => setActive(v.title)}
              onMouseLeave={() => setActive(null)}
              style={{
                position: "relative",
                animationName: "fade-up",
                animationDuration: "0.4s",
                animationTimingFunction: "ease",
                animationFillMode: "both",
                animationDelay: `${i * 0.07}s`,
                borderRadius: "9999px",
                border: isOpen
                  ? "1px solid rgba(99, 170, 255, 0.4)"
                  : "1px solid rgba(99, 130, 200, 0.35)",
                background: isOpen
                  ? "linear-gradient(135deg, rgba(14, 60, 140, 0.12) 0%, rgba(7, 30, 90, 0.18) 100%)"
                  : "transparent",
                padding: "0.35em 1em",
                cursor: "default",
                width: "fit-content",
                transition: "background 0.2s ease, border-color 0.2s ease",
                ...(isOpen ? {
                  animationName: "neuron-fire",
                  animationDuration: "0.7s",
                  animationTimingFunction: "ease-out",
                  animationIterationCount: "1",
                  animationFillMode: "forwards",
                } : {}),
                zIndex: isOpen ? 10 : undefined,
              }}
            >
              {"titleHref" in v && v.titleHref ? (
                <a
                  href={v.titleHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: isOpen ? "#2563eb" : "var(--text-secondary)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {v.title}
                </a>
              ) : (
                <p style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: isOpen ? "#2563eb" : "var(--text-secondary)",
                  transition: "color 0.2s ease",
                  whiteSpace: "nowrap",
                }}>
                  {v.title}
                </p>
              )}

              {/* Expanded card — absolutely positioned, never affects flex layout */}
              {isOpen && (
                <div style={{
                  position: "absolute",
                  top: "calc(100% + 0.5rem)",
                  left: 0,
                  zIndex: 20,
                  minWidth: "18rem",
                  maxWidth: "28rem",
                  borderRadius: "0.75rem",
                  border: "1px solid rgba(99, 170, 255, 0.4)",
                  background: "linear-gradient(135deg, rgba(14, 60, 140, 0.12) 0%, rgba(7, 30, 90, 0.18) 100%)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  padding: "0.875rem 1rem",
                  animationName: "fade-up",
                  animationDuration: "0.18s",
                  animationTimingFunction: "ease",
                  animationFillMode: "both",
                }}>
                  <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#2563eb", marginBottom: "0.4rem" }}>
                    {v.title}
                  </p>
                  <p style={{ fontSize: "0.8125rem", lineHeight: 1.65, color: "var(--text-secondary)" }}>
                    {v.body}
                  </p>
                  {"callout" in v && v.callout && (
                    <p style={{ marginTop: "0.5rem", fontSize: "0.8rem", lineHeight: 1.6, color: "var(--text-muted)", fontStyle: "italic" }}>
                      {v.callout}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
