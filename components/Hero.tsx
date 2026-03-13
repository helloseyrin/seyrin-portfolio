"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import ContactForm from "./ContactForm";
import Editable from "./Editable";
import { useEdit } from "@/contexts/EditContext";
import { statusStyle } from "@/lib/constants";

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

export default function Hero() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data } = useEdit();
  const [bioExpanded, setBioExpanded] = useState(false);
  const bioInnerRef = useRef<HTMLDivElement>(null);
  const [bioHeight, setBioHeight] = useState(0);

  useEffect(() => {
    if (!bioInnerRef.current) return;
    if (bioExpanded) {
      setBioHeight(bioInnerRef.current.scrollHeight);
    } else {
      setBioHeight(0);
    }
  }, [bioExpanded]);

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

        {/* H1 + H2 + meta row */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <h1 style={{ fontSize: "3rem", fontWeight: 500, lineHeight: 1.1, animation: "fade-down 0.45s ease both" }}>
            Nice to meet you, I&apos;m Smyrna.
          </h1>
          <h2 style={{ fontSize: "2.25rem", fontWeight: 400, lineHeight: 1.2, animation: "fade-down 0.45s 0.08s ease both", background: "linear-gradient(90deg, var(--text-muted) 0%, #8aaac8 60%, #a78bfa 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
            <Editable file="hero" path="subtitle" tag="span" />
          </h2>
          {/* Meta row */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", paddingTop: "0.25rem", animation: "fade-down 0.45s 0.16s ease both" }}>
            {[
              { label: "Helsinki GMT+3", dot: null },
              { label: "open to work", dot: "#4ade80" },
            ].map(({ label, dot }, i) => (
              <React.Fragment key={label}>
                {i > 0 && <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "var(--border-hover)", display: "inline-block" }} />}
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "0.35rem",
                  fontSize: "0.72rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-dim)",
                  letterSpacing: "0.02em",
                }}>
                  {dot && <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: dot, boxShadow: `0 0 6px ${dot}`, display: "inline-block", flexShrink: 0 }} />}
                  {label}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Bio — animated shimmer border */}
        <div style={{
          display: "flex",
          gap: "0",
          animation: "fade-down 0.45s 0.24s ease both",
        }}>
          <div className="bio-border-shimmer" />
          <div style={{
            paddingLeft: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.85rem",
            color: "var(--text-secondary)",
            fontSize: "0.9375rem",
            lineHeight: 1.75,
          }}>
          {/* First paragraph always visible */}
          <Editable file="hero" path="bio[0]" tag="p" multiline />

          {/* Expanded content — animated */}
          <div
            style={{
              overflow: "hidden",
              height: `${bioHeight}px`,
              transition: "height 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div ref={bioInnerRef} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {data.hero.bio.slice(1).map((_, i) => (
                <div
                  key={i + 1}
                  style={{
                    opacity: bioExpanded ? 1 : 0,
                    transform: bioExpanded ? "translateY(0)" : "translateY(8px)",
                    transition: `opacity 0.35s ease ${0.08 + i * 0.09}s, transform 0.35s ease ${0.08 + i * 0.09}s`,
                  }}
                >
                  <Editable file="hero" path={`bio[${i + 1}]`} tag="p" multiline />
                </div>
              ))}
              <div
                style={{
                  opacity: bioExpanded ? 1 : 0,
                  transform: bioExpanded ? "translateY(0)" : "translateY(8px)",
                  transition: `opacity 0.35s ease ${0.08 + data.hero.bio.slice(1).length * 0.09}s, transform 0.35s ease ${0.08 + data.hero.bio.slice(1).length * 0.09}s`,
                }}
              >
                <p>
                  I&apos;m currently applying all of this to{" "}
                  <a href="https://github.com/helloseyrin/anima-mundi" target="_blank" rel="noopener noreferrer" className="link-prose">Anima Mundi</a>
                  , my Obsidian PKM vault — ingestion, cleaning, vector embeddings, evaluating different models for semantic accuracy and discovery of connections. More recently I&apos;ve been following the{" "}
                  <a href="https://arxiv.org/html/2512.24601v1" target="_blank" rel="noopener noreferrer" className="link-prose">Recursive Language Model paradigm</a>
                  {" "}and thinking about how it maps onto the retrieval problem. The personal motivation is simple enough: I accumulate information faster than I can internalise or process it, so building infrastructure that supports continuous recall and adapts to my particular way of thinking and mind mapping was an obvious turn to take.
                </p>
              </div>
            </div>
          </div>

          {/* Expand / collapse toggle */}
          <button
            onClick={() => setBioExpanded(v => !v)}
            style={{
              alignSelf: "flex-start",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              fontSize: "0.72rem",
              fontFamily: "var(--font-mono)",
              color: "var(--text-dim)",
              letterSpacing: "0.04em",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
            className="bio-toggle"
          >
            {bioExpanded ? "— less" : "+ more"}
          </button>
          </div>
        </div>

        {/* Now strip */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", animation: "fade-down 0.45s 0.34s ease both" }}>
          <span style={{
            fontSize: "0.65rem",
            fontFamily: "var(--font-mono)",
            color: "var(--text-dim)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            flexShrink: 0,
          }}>now</span>
          <div style={{ width: "1px", height: "0.9rem", background: "var(--border)", flexShrink: 0 }} />
          {[
            "RAG",
            "NLP",
            "ELT pipelines",
            "Recursive Language Models",
            "Knowledge Graphs",
            "CI/CD",
          ].map(item => (
            <span key={item} style={{
              fontSize: "0.72rem",
              fontFamily: "var(--font-mono)",
              padding: "0.22em 0.65em",
              borderRadius: "0.3rem",
              border: "1px solid var(--border)",
              background: "var(--bg-card)",
              backdropFilter: "blur(12px)",
              color: "var(--text-muted)",
              letterSpacing: "0.01em",
            }}>{item}</span>
          ))}
        </div>

        {/* Contact pills + about link */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", marginTop: "-0.75rem", animation: "fade-down 0.45s 0.42s ease both" }}>
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
              href: "https://www.linkedin.com/in/smyrna/",
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
              className="tag-pill"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                textDecoration: "none",
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
            fontFamily: "var(--font-mono)",
            color: "var(--text-dim)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
            whiteSpace: "nowrap",
          }}
          className="about-link"
        >
          about me →
        </a>
        </div>

        {/* Featured projects — glass card wrapper */}
        <div className="card" style={{ padding: "1rem 1.25rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
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
                }}
                  className="carousel-btn"
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
