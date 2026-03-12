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

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "flex-start" }}>
        {values.map((v, i) => {
          const isOpen = active === v.title;
          return (
            <div
              key={v.title}
              onMouseEnter={() => setActive(v.title)}
              onMouseLeave={() => setActive(null)}
              style={{
                animation: `fade-up 0.4s ease both`,
                animationDelay: `${i * 0.07}s`,
                borderRadius: isOpen ? "0.75rem" : "9999px",
                border: isOpen
                  ? "1px solid rgba(99, 170, 255, 0.4)"
                  : "1px solid rgba(99, 130, 200, 0.35)",
                background: isOpen
                  ? "linear-gradient(135deg, rgba(14, 60, 140, 0.12) 0%, rgba(7, 30, 90, 0.18) 100%)"
                  : "transparent",
                backdropFilter: isOpen ? "blur(8px)" : undefined,
                WebkitBackdropFilter: isOpen ? "blur(8px)" : undefined,
                padding: isOpen ? "0.875rem 1rem" : "0.35em 1em",
                cursor: "default",
                transition: "border-radius 0.2s ease, padding 0.2s ease, background 0.2s ease, border-color 0.2s ease",
                width: isOpen ? undefined : "fit-content",
                maxWidth: isOpen ? "28rem" : undefined,
              }}
            >
              {"titleHref" in v && v.titleHref ? (
                <a
                  href={v.titleHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: isOpen ? "#2563eb" : "var(--text-secondary)",
                    textDecoration: isOpen ? "underline" : "none",
                    transition: "color 0.2s ease",
                    display: "block",
                    whiteSpace: isOpen ? undefined : "nowrap",
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
                  whiteSpace: isOpen ? undefined : "nowrap",
                }}>
                  {v.title}
                </p>
              )}

              {isOpen && (
                <div style={{ animation: "fade-up 0.18s ease both" }}>
                  <p style={{
                    fontSize: "0.8125rem",
                    lineHeight: 1.65,
                    color: "var(--text-secondary)",
                    marginTop: "0.5rem",
                  }}>
                    {v.body}
                  </p>
                  {"callout" in v && v.callout && (
                    <p style={{
                      marginTop: "0.5rem",
                      fontSize: "0.8rem",
                      lineHeight: 1.6,
                      color: "var(--text-muted)",
                      fontStyle: "italic",
                    }}>
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
