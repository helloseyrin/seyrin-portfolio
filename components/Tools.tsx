"use client";

import { useState, useRef } from "react";
import Tag from "./Tag";

// ── Data ─────────────────────────────────────────

const skills = [
  { name: "Languages",        items: ["Python", "SQL", "Bash", "HTML/CSS", "Markdown"] },
  { name: "ML & Data",        items: ["PyTorch", "scikit-learn", "pandas", "Polars", "NumPy", "fastembed", "ChromaDB"] },
  { name: "NLP & Embeddings", items: ["HuggingFace Transformers", "sentence-transformers", "NLTK", "Vector Databases", "RAG"] },
  { name: "Infrastructure",   items: ["PostgreSQL", "Snowflake", "Azure", "Docker", "Airflow", "dbt", "Linux", "Git", "CI/CD"] },
  { name: "Design",           items: ["Figma", "Zeplin", "Wireframing", "Prototyping", "UX Research"] },
];

const dailyTools = [
  { name: "Cursor",      category: "IDE",           icon: "https://cdn.simpleicons.org/cursor/89c4e1",     color: "#89c4e1" },
  { name: "Claude Code", category: "AI",            icon: "https://cdn.simpleicons.org/anthropic/c084fc",  color: "#c084fc" },
  { name: "Obsidian",    category: "PKM",           icon: "https://cdn.simpleicons.org/obsidian/a78bfa",   color: "#a78bfa" },
  { name: "Notion",      category: "Productivity",  icon: "https://cdn.simpleicons.org/notion/89c4e1",     color: "#89c4e1" },
  { name: "NotebookLM",  category: "Research",      icon: "https://cdn.simpleicons.org/google/4ade80",     color: "#4ade80" },
  { name: "Canva",       category: "Design",        icon: "https://cdn.simpleicons.org/canva/00c4cc",      color: "#00c4cc" },
  { name: "Protonmail",  category: "Communication", icon: "https://cdn.simpleicons.org/protonmail/6d4aff", color: "#6d4aff" },
];

const learningPlatforms = [
  { name: "DataCamp",          category: "Data",     icon: "https://cdn.simpleicons.org/datacamp/03ac8c",     color: "#03ac8c" },
  { name: "Coursera",          category: "Courses",  icon: "https://cdn.simpleicons.org/coursera/2563eb",     color: "#2563eb" },
  { name: "Anthropic Academy", category: "AI",       icon: "https://cdn.simpleicons.org/anthropic/c084fc",   color: "#c084fc" },
  { name: "Scrimba",           category: "Coding",   icon: "https://cdn.simpleicons.org/scrimba/f4a261",     color: "#f4a261" },
  { name: "Khan Academy",      category: "Learning", icon: "https://cdn.simpleicons.org/khanacademy/14bf96", color: "#14bf96" },
];

const resources = [
  {
    type: "Video",
    title: "The most beautiful formula not enough people understand",
    author: "3Blue1Brown",
    url: "https://www.youtube.com/watch?v=fsLh-NYhOoU",
    note: "Got me thinking about hyperdimensional spaces at the right level to reason about vector databases at scale — specifically the 21:14 section on Why 4πr². I couldn't do the maths but the intuition was directly applicable.",
    date: "Mar 2026",
  },
  {
    type: "Video",
    title: "Linux Mint Cinnamon — why it might be the best desktop",
    author: "YouTube",
    url: "https://youtu.be/z4iSZetVkRg",
    note: "Switched to Linux Mint Cinnamon on Feb 27 after a Windows update fried itself and its own bootloader — got sick of it the same day and just installed this instead. Two weeks in: my 2020 mid-grade laptop is visibly happier, I customised it to look better than Windows ever did, and it didn't cost €200 for a license key Microsoft might invalidate in three years.",
    date: "Feb 2026",
  },
  {
    type: "Paper",
    title: "Recursive Language Models",
    author: "Alex Zhang et al. · MIT",
    url: "https://arxiv.org/pdf/2512.24601",
    codeUrl: "https://alexzhang13.github.io/blog/2025/rlm/",
    abstract: "We study allowing LLMs to process arbitrarily long prompts through inference-time scaling. Rather than feeding a giant context into the neural network directly, the prompt is stored as a plain-text variable in a Python environment and the model is given search tools to navigate it recursively — going deeper into relevant sections and back out, no summarisation, no lossy compression.",
    note: "The elegant bit is that the problem was never really about context windows — it was about treating the neural network as the *only* place information could live. Offload the text, give the model grep. Relevant to anything involving long docs, giant codebases, or vector DB retrieval strategies where you want the model to stay precise at scale rather than hallucinating under context rot.",
    date: "Jan 2026",
  },
];

// ── Style helpers ─────────────────────────────────

const categoryColor: Record<string, { bg: string; text: string; border: string }> = {
  "IDE":           { bg: "rgba(137,196,225,0.1)", text: "#89c4e1", border: "rgba(137,196,225,0.25)" },
  "AI":            { bg: "rgba(192,132,252,0.1)", text: "#c084fc", border: "rgba(192,132,252,0.25)" },
  "PKM":           { bg: "rgba(167,139,250,0.1)", text: "#a78bfa", border: "rgba(167,139,250,0.25)" },
  "Productivity":  { bg: "rgba(137,196,225,0.1)", text: "#89c4e1", border: "rgba(137,196,225,0.25)" },
  "Research":      { bg: "rgba(74,222,128,0.1)",  text: "#4ade80", border: "rgba(74,222,128,0.25)"  },
  "Design":        { bg: "rgba(0,196,204,0.1)",   text: "#00c4cc", border: "rgba(0,196,204,0.25)"   },
  "Communication": { bg: "rgba(109,74,255,0.1)",  text: "#6d4aff", border: "rgba(109,74,255,0.25)"  },
  "Data":          { bg: "rgba(3,172,140,0.1)",   text: "#03ac8c", border: "rgba(3,172,140,0.25)"   },
  "Courses":       { bg: "rgba(37,99,235,0.1)",   text: "#2563eb", border: "rgba(37,99,235,0.25)"   },
  "Coding":        { bg: "rgba(244,162,97,0.1)",  text: "#f4a261", border: "rgba(244,162,97,0.25)"  },
  "Learning":      { bg: "rgba(20,191,150,0.1)",  text: "#14bf96", border: "rgba(20,191,150,0.25)"  },
};

const typeColor: Record<string, { bg: string; text: string; border: string }> = {
  "Video":   { bg: "rgba(239,68,68,0.1)",   text: "#f87171", border: "rgba(239,68,68,0.25)"   },
  "Article": { bg: "rgba(37,99,235,0.1)",   text: "#2563eb", border: "rgba(37,99,235,0.25)"   },
  "Paper":   { bg: "rgba(192,132,252,0.1)", text: "#c084fc", border: "rgba(192,132,252,0.25)" },
  "Book":    { bg: "rgba(74,222,128,0.1)",  text: "#4ade80", border: "rgba(74,222,128,0.25)"  },
};

// ── Icon card ─────────────────────────────────────

function IconCard({ tool }: { tool: typeof dailyTools[0] }) {
  const pal = categoryColor[tool.category] ?? categoryColor["IDE"];
  return (
    <div
      className="card"
      style={{ padding: "1.25rem 0.75rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", textAlign: "center", transition: "transform 0.2s ease, box-shadow 0.2s ease", cursor: "default" }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 24px rgba(0,0,0,0.1), 0 0 0 1px ${tool.color}22`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "";
      }}
    >
      <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.75rem", background: `${tool.color}18`, border: `1px solid ${tool.color}30`, display: "flex", alignItems: "center", justifyContent: "center", padding: "0.5rem" }}>
        <img src={tool.icon} alt={tool.name} width={24} height={24} style={{ width: "1.5rem", height: "1.5rem", objectFit: "contain" }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
      </div>
      <p style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.2 }}>{tool.name}</p>
      <span style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", padding: "0.15em 0.5em", borderRadius: "0.2rem", background: pal.bg, color: pal.text, border: `1px solid ${pal.border}` }}>
        {tool.category}
      </span>
    </div>
  );
}

// ── Section label ─────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-dim)", marginBottom: "0.75rem", fontFamily: "var(--font-mono)" }}>
      {children}
    </p>
  );
}

// ── Main component ────────────────────────────────

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "Skills",    label: "Skills",    icon: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.84A2.5 2.5 0 0 1 9.5 2"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.84A2.5 2.5 0 0 0 14.5 2"/></svg> },
  { id: "Tools",     label: "Tools",     icon: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg> },
  { id: "Learning",  label: "Learning",  icon: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg> },
  { id: "Resources", label: "Resources", icon: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/><path d="M8 10h8"/><path d="M8 14h6"/></svg> },
];
type Tab = "Skills" | "Tools" | "Learning" | "Resources";

export default function TechStack() {
  const [active, setActive] = useState<Tab>("Skills");
  const [hoveredNote, setHoveredNote] = useState<{ i: number; x: number; y: number } | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        <h1>Tech Stack</h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>What I use to build and think.</p>
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
        {TABS.map(({ id, label, icon }) => {
          const isActive = id === active;
          return (
            <button
              key={id}
              onClick={() => setActive(id)}
              style={{
                padding: "0.35em 1em",
                borderRadius: "9999px",
                fontSize: "0.8125rem",
                fontFamily: "var(--font-mono)",
                fontWeight: isActive ? 500 : 400,
                letterSpacing: "0.02em",
                border: isActive ? "1px solid rgba(99,170,255,0.4)" : "1px solid var(--border)",
                background: isActive ? "linear-gradient(135deg, rgba(14,60,140,0.15) 0%, rgba(7,30,90,0.22) 100%)" : "transparent",
                color: isActive ? "#2563eb" : "var(--text-muted)",
                backdropFilter: isActive ? "blur(8px)" : undefined,
                WebkitBackdropFilter: isActive ? "blur(8px)" : undefined,
                boxShadow: isActive ? "0 0 10px rgba(147,197,253,0.08)" : undefined,
                cursor: "pointer",
                transition: "all 0.15s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              {icon}{label}
            </button>
          );
        })}
      </div>

      {/* Skills */}
      {active === "Skills" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          {skills.map(sec => (
            <div key={sec.name}>
              <SectionLabel>{sec.name}</SectionLabel>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {sec.items.map(item => <Tag key={item}>{item}</Tag>)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tools (Kit) */}
      {active === "Tools" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(8rem, 1fr))", gap: "0.75rem" }}>
          {dailyTools.map(tool => <IconCard key={tool.name} tool={tool} />)}
        </div>
      )}

      {/* Learning */}
      {active === "Learning" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
          <div>
            <SectionLabel>Platforms</SectionLabel>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(8rem, 1fr))", gap: "0.75rem" }}>
              {learningPlatforms.map(tool => <IconCard key={tool.name} tool={tool} />)}
            </div>
          </div>
          <div>
            <SectionLabel>Certifications</SectionLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {["Associate Data Engineer in SQL — DataCamp", "Data Engineer in Python — DataCamp", "CISA — Coursera", "NLP in Python — DataCamp", "IBM Data Engineering — Coursera", "Business Analysis in IT — Beetroot Academy"].map(item => <Tag key={item}>{item}</Tag>)}
            </div>
          </div>
          <div>
            <SectionLabel>Bootcamps</SectionLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {["Turing College — Data Science & AI (Apr 2026)"].map(item => <Tag key={item}>{item}</Tag>)}
            </div>
          </div>
          <div>
            <SectionLabel>Special mentions</SectionLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              <Tag>3Blue1Brown — all things maths</Tag>
            </div>
          </div>
        </div>
      )}

      {/* Resources feed */}
      {active === "Resources" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
          {resources.map((r, i) => {
            const tpal = typeColor[r.type] ?? typeColor["Article"];
            const rawId = r.url.includes("v=") ? r.url.split("v=")[1]?.split("&")[0] : r.url.split("/").pop()?.split("?")[0];
            const embedId = r.url.includes("youtu") ? rawId : null;
            return (
              <div
                key={i}
                className="card"
                onMouseMove={r.note ? (e) => setHoveredNote({ i, x: e.clientX, y: e.clientY }) : undefined}
                onMouseLeave={r.note ? () => setHoveredNote(null) : undefined}
                style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}
              >
                {/* Video embed */}
                {embedId && (
                  <div style={{ width: "100%", borderRadius: "0.75rem 0.75rem 0 0", overflow: "hidden", aspectRatio: "16/9", background: "#000", flexShrink: 0 }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${embedId}`}
                      title={r.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                    />
                  </div>
                )}

                {/* Paper header */}
                {!embedId && (
                  <div style={{
                    width: "100%",
                    borderRadius: "0.75rem 0.75rem 0 0",
                    padding: "1.25rem 1.125rem 1rem",
                    background: "repeating-linear-gradient(to bottom, transparent 0, transparent calc(1.5rem - 1px), rgba(137,196,225,0.1) calc(1.5rem - 1px), rgba(137,196,225,0.1) 1.5rem), linear-gradient(160deg, rgba(14,40,90,0.18) 0%, rgba(7,20,60,0.25) 100%)",
                    backgroundSize: "100% 1.5rem, 100% 100%",
                    backgroundPositionY: "0.75rem, 0",
                    borderBottom: "1px solid rgba(137,196,225,0.15)",
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}>
                    <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.4, margin: 0 }}>{r.title}</p>
                    {"abstract" in r && r.abstract && (
                      <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>{(r as { abstract: string }).abstract}</p>
                    )}
                    {"codeUrl" in r && r.codeUrl && (
                      <a href={(r as { codeUrl: string }).codeUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "var(--accent-ice)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.25rem", width: "fit-content" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                        author&apos;s blog ↗
                      </a>
                    )}
                  </div>
                )}

                {/* Info row */}
                <div style={{ padding: "0.625rem 0.875rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", padding: "0.15em 0.5em", borderRadius: "0.2rem", background: tpal.bg, color: tpal.text, border: `1px solid ${tpal.border}`, flexShrink: 0 }}>
                      {r.type}
                    </span>
                    <span style={{ fontSize: "0.65rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)", flexShrink: 0 }}>{r.author} · {r.date}</span>
                  </div>
                  <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--text-primary)", textDecoration: "none", lineHeight: 1.4 }}>
                    {r.type === "Paper" ? "arxiv: 2512.24601 ↗" : `${r.title} ↗`}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cursor-following note tooltip */}
      {hoveredNote && resources[hoveredNote.i]?.note && (
        <div style={{
          position: "fixed",
          left: hoveredNote.x + 16,
          top: hoveredNote.y + 16,
          maxWidth: "22rem",
          zIndex: 9999,
          pointerEvents: "none",
          borderRadius: "0.6rem",
          background: "repeating-linear-gradient(to bottom, transparent 0, transparent calc(1.5rem - 1px), rgba(137,196,225,0.15) calc(1.5rem - 1px), rgba(137,196,225,0.15) 1.5rem), linear-gradient(160deg, rgba(255,253,250,0.97) 0%, rgba(237,246,255,0.95) 100%)",
          backgroundSize: "100% 1.5rem, 100% 100%",
          backgroundPositionY: "0.8rem, 0",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(137,196,225,0.3)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.9)",
          padding: "0.75rem 1rem",
          fontSize: "0.775rem",
          color: "var(--text-secondary)",
          lineHeight: 1.6,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", marginBottom: "0.4rem" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(137,196,225,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
            </svg>
            <span style={{ fontSize: "0.58rem", fontFamily: "var(--font-mono)", color: "rgba(137,196,225,0.9)", letterSpacing: "0.09em", textTransform: "uppercase" }}>my note</span>
          </div>
          {resources[hoveredNote.i].note}
        </div>
      )}

    </div>
  );
}
