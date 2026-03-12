"use client";

import { useRef } from "react";
import Image from "next/image";
import ContactForm from "./ContactForm";

const TITLE = Array.from("Hey, I'm Smyrna 🌊");

const featured = [
  {
    title: "Anima Mundi // Obsidian PKM",
    desc: "Self-organising PKM with semantic search across articles, videos, PDFs, and repos.",
    status: "Active",
    cover: "/project-anima-mundi.jpg",
    coverPosition: "center 40%",
    href: "https://github.com/helloseyrin/anima-mundi",
  },
  {
    title: "Lexis // Text Classifier",
    desc: "Fine-tuned transformer pipeline for multi-label document classification.",
    status: "In progress",
    cover: "/cover-aero.jpg",
    coverPosition: "center 60%",
    href: "/projects",
  },
  {
    title: "Strata // Data Pipeline",
    desc: "Modular ELT pipeline with schema inference, lineage tracking, and incremental loading.",
    status: "In progress",
    cover: "/cover-flow.jpg",
    coverPosition: "center 40%",
    href: "/projects",
  },
];

const statusStyle: Record<string, { bg: string; color: string; border: string }> = {
  "Active":      { bg: "rgba(10,30,60,0.72)", color: "#7ecfef", border: "rgba(126,207,239,0.3)" },
  "In progress": { bg: "rgba(10,30,50,0.72)", color: "#a8d8f0", border: "rgba(168,216,240,0.3)" },
};

export default function Hero() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 280 : -280, behavior: "smooth" });
  };

  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>

      {/* Decorative vertical lines — water-toned */}
      {[
        { left: "8%",  height: "3.5rem" },
        { left: "20%", height: "1.5rem" },
        { left: "35%", height: "3.5rem" },
        { left: "55%", height: "5rem"   },
        { left: "70%", height: "3rem"   },
        { left: "85%", height: "2rem"   },
      ].map((line, i) => (
        <div key={i} style={{
          position: "absolute",
          left: line.left,
          top: "-5rem",
          width: "1px",
          height: line.height,
          borderRadius: "9999px",
          background: "linear-gradient(to bottom, var(--border-hover), var(--border), transparent)",
          opacity: 0.5,
        }} />
      ))}

      {/* Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", paddingTop: "0.75rem" }}>

        {/* H1 + H2 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <h1 style={{ fontSize: "3rem", fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.1 }}>
            {TITLE.map((char, i) => (
              <span
                key={i}
                className="letter-float"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
          <h2 style={{ fontSize: "2.25rem", fontWeight: 400, color: "var(--text-muted)", lineHeight: 1.2 }}>
            Data & ML Engineer
          </h2>
        </div>

        {/* Bio — left quote border */}
        <div style={{
          borderLeft: "2px solid var(--border-hover)",
          paddingLeft: "1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.85rem",
          color: "var(--text-secondary)",
          fontSize: "0.9375rem",
          lineHeight: 1.75,
        }}>
          <p>
            Growing expertise at the intersection of Data & ML Engineering, with a background in
            business analysis and UI/UX design.
          </p>
          <p>
            The through-line is documents. As a translator, then as a business analyst, I kept
            running into the same problem — large volumes of information with no efficient way to
            navigate it. That frustration is what pulled me toward NLP specifically: the gap between
            raw text and something you can actually use.
          </p>
          <p>
            Right now I&apos;m deep in building a personal knowledge management system. New fields
            mean new papers, books, and threads to follow — and I accumulate information faster than
            I can process it. I need infrastructure that works.
          </p>
        </div>

        {/* Contact pills + about link */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {[
            {
              label: "Send an email",
              href: "mailto:smyrna.volzhevska@protonmail.com",
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
              external: false,
            },
            {
              label: "LinkedIn",
              href: "https://linkedin.com/in/smyrna-v",
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>,
              external: true,
            },
            {
              label: "GitHub",
              href: "https://github.com/helloseyrin",
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>,
              external: true,
            },
            {
              label: "Resume",
              href: "/cv.pdf",
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>,
              external: true,
            },
          ].map(({ label, href, icon, external }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.24em 0.75em",
                borderRadius: "9999px",
                border: "1px solid rgba(99, 130, 200, 0.35)",
                background: "transparent",
                fontSize: "0.78rem",
                fontFamily: "var(--font-fira-code), 'Fira Code', ui-monospace, monospace",
                fontWeight: 400,
                letterSpacing: "0.02em",
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "all 0.18s ease",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "linear-gradient(135deg, rgba(14, 60, 140, 0.18) 0%, rgba(7, 30, 90, 0.28) 100%)";
                el.style.borderColor = "rgba(99, 170, 255, 0.45)";
                el.style.color = "#2563eb";
                el.style.boxShadow = "0 0 12px rgba(147, 197, 253, 0.12)";
                el.style.backdropFilter = "blur(8px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "transparent";
                el.style.borderColor = "rgba(99, 130, 200, 0.35)";
                el.style.color = "var(--text-secondary)";
                el.style.boxShadow = "none";
                el.style.backdropFilter = "none";
              }}
            >
              {icon}
              {label}
            </a>
          ))}
        </div>
        <a
          href="/about"
          style={{
            fontSize: "0.78rem",
            fontFamily: "var(--font-fira-code), 'Fira Code', ui-monospace, monospace",
            color: "var(--text-dim)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
            transition: "color 0.18s ease",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-dim)"; }}
        >
          about me →
        </a>
        </div>

        {/* Featured projects carousel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-secondary)" }}>
                Featured projects
              </p>
              <p style={{ fontSize: "0.7rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
                LLM codes, I help
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.25rem" }}>
              {(["left", "right"] as const).map(dir => (
                <button key={dir} onClick={() => scroll(dir)} style={{
                  width: "1.75rem", height: "1.75rem",
                  borderRadius: "50%",
                  border: "1px solid var(--border)",
                  background: "var(--bg-card)",
                  color: "var(--text-muted)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                  transition: "border-color 0.15s, color 0.15s",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)"; (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                >
                  {dir === "left"
                    ? <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  }
                </button>
              ))}
            </div>
          </div>

          {/* Scroll track */}
          <div ref={scrollRef} className="carousel-track" style={{
            display: "flex",
            gap: "0.75rem",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            paddingBottom: "0.25rem",
          }}>
            {featured.map((p) => {
              const s = statusStyle[p.status] ?? statusStyle["In progress"];
              return (
                <a
                  key={p.title}
                  href={p.href}
                  target={p.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="project-card"
                  style={{
                    flexShrink: 0,
                    width: "260px",
                    padding: 0,
                    overflow: "hidden",
                    scrollSnapAlign: "start",
                    textDecoration: "none",
                  }}
                >
                  <div style={{ position: "relative", width: "100%", height: "8rem", overflow: "hidden" }}>
                    <Image src={p.cover} alt={p.title} fill style={{ objectFit: "cover", objectPosition: p.coverPosition }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 25%, rgba(240,246,252,0.85) 100%)" }} />
                    <span style={{
                      position: "absolute", top: "0.6rem", right: "0.6rem",
                      fontSize: "0.6rem", fontFamily: "var(--font-mono)", fontWeight: 500,
                      padding: "0.18em 0.6em", borderRadius: "0.2rem",
                      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
                      backdropFilter: "blur(8px)", letterSpacing: "0.06em", textTransform: "uppercase",
                    }}>
                      {p.status}
                    </span>
                  </div>
                  <div style={{ padding: "0.75rem 1rem 1rem" }}>
                    <p style={{ fontWeight: 500, color: "var(--text-primary)", fontSize: "0.875rem", marginBottom: "0.3rem", lineHeight: 1.3 }}>{p.title}</p>
                    <p style={{ fontSize: "0.775rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>{p.desc}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginTop: "0.6rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      <span>View</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <ContactForm />

      </div>
    </div>
  );
}
