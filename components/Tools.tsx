"use client";

import { useState } from "react";
import Tag from "./Tag";

const dailyTools = [
  { name: "Cursor",      category: "IDE",           icon: "https://cdn.simpleicons.org/cursor/89c4e1",     color: "#89c4e1" },
  { name: "Claude Code", category: "AI",            icon: "https://cdn.simpleicons.org/anthropic/c084fc",  color: "#c084fc" },
  { name: "Obsidian",    category: "PKM",           icon: "https://cdn.simpleicons.org/obsidian/a78bfa",   color: "#a78bfa" },
  { name: "Notion",      category: "Productivity",  icon: "https://cdn.simpleicons.org/notion/89c4e1",     color: "#89c4e1" },
  { name: "NotebookLM",  category: "Research",      icon: "https://cdn.simpleicons.org/google/4ade80",     color: "#4ade80" },
  { name: "Canva",       category: "Design",        icon: "https://cdn.simpleicons.org/canva/00c4cc",      color: "#00c4cc" },
  { name: "Protonmail",  category: "Communication", icon: "https://cdn.simpleicons.org/protonmail/6d4aff", color: "#6d4aff" },
];


const tabs = [
  {
    id: "stack",
    label: "Stack",
    sections: [
      { name: "Languages", items: ["Python", "SQL", "Bash", "HTML/CSS", "Markdown"] },
      { name: "ML & Data", items: ["PyTorch", "scikit-learn", "pandas", "Polars", "NumPy", "fastembed", "ChromaDB"] },
      { name: "NLP & Embeddings", items: ["HuggingFace Transformers", "sentence-transformers", "NLTK", "Vector Databases"] },
      { name: "Infrastructure", items: ["PostgreSQL", "Snowflake", "Azure", "Docker", "Airflow", "dbt", "Linux", "Git"] },
      { name: "Design", items: ["Figma", "Zeplin", "Wireframing", "Prototyping", "UX Research"] },
      { name: "Workflow", items: ["Obsidian", "Cursor", "Claude Code", "Notion", "Jupyter", "VS Code"] },
    ],
  },
  {
    id: "learning",
    label: "Learning",
    sections: [
      { name: "Certifications", items: ["Associate Data Engineer in SQL — DataCamp", "Data Engineer in Python — DataCamp", "CISA — Coursera", "NLP in Python — DataCamp", "IBM Data Engineering — Coursera", "Business Analysis in IT — Beetroot Academy"] },
      { name: "Bootcamps", items: ["Turing College — Data Science & AI (Apr 2026)"] },
      { name: "Platforms", items: ["DataCamp", "Coursera", "Anthropic Academy", "Scrimba", "Khan Academy"] },
      { name: "Special mentions", items: ["3Blue1Brown — all things maths"] },
    ],
  },
];

const learningPlatforms = [
  { name: "DataCamp",          category: "Data",     icon: "https://cdn.simpleicons.org/datacamp/03ac8c",     color: "#03ac8c" },
  { name: "Coursera",          category: "Courses",  icon: "https://cdn.simpleicons.org/coursera/2563eb",     color: "#2563eb" },
  { name: "Anthropic Academy", category: "AI",       icon: "https://cdn.simpleicons.org/anthropic/c084fc",   color: "#c084fc" },
  { name: "Scrimba",           category: "Coding",   icon: "https://cdn.simpleicons.org/scrimba/f4a261",     color: "#f4a261" },
  { name: "Khan Academy",      category: "Learning", icon: "https://cdn.simpleicons.org/khanacademy/14bf96", color: "#14bf96" },
];

const categoryColor: Record<string, { bg: string; text: string; border: string }> = {
  "IDE":           { bg: "rgba(137,196,225,0.1)", text: "#89c4e1", border: "rgba(137,196,225,0.25)" },
  "AI":            { bg: "rgba(192,132,252,0.1)", text: "#c084fc", border: "rgba(192,132,252,0.25)" },
  "PKM":           { bg: "rgba(167,139,250,0.1)", text: "#a78bfa", border: "rgba(167,139,250,0.25)" },
  "Productivity":  { bg: "rgba(137,196,225,0.1)", text: "#89c4e1", border: "rgba(137,196,225,0.25)" },
  "Research":      { bg: "rgba(74,222,128,0.1)",  text: "#4ade80", border: "rgba(74,222,128,0.25)"  },
  "Design":        { bg: "rgba(0,196,204,0.1)",   text: "#00c4cc", border: "rgba(0,196,204,0.25)"   },
  "Communication": { bg: "rgba(109,74,255,0.1)",  text: "#6d4aff", border: "rgba(109,74,255,0.25)"  },
};

export default function Tools() {
  const [active, setActive] = useState("kit");
  const current = tabs.find((t) => t.id === active);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        <h1>Tools</h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>What I use to build and think.</p>
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
        {[{ id: "kit", label: "Kit" }, ...tabs].map((t) => {
          const isActive = t.id === active;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              style={{
                padding: "0.35em 1em",
                borderRadius: "9999px",
                fontSize: "0.8125rem",
                fontFamily: "var(--font-mono)",
                fontWeight: isActive ? 500 : 400,
                letterSpacing: "0.02em",
                border: isActive ? "1px solid rgba(99, 170, 255, 0.4)" : "1px solid var(--border)",
                background: isActive
                  ? "linear-gradient(135deg, rgba(14, 60, 140, 0.15) 0%, rgba(7, 30, 90, 0.22) 100%)"
                  : "transparent",
                color: isActive ? "#2563eb" : "var(--text-muted)",
                backdropFilter: isActive ? "blur(8px)" : undefined,
                WebkitBackdropFilter: isActive ? "blur(8px)" : undefined,
                boxShadow: isActive ? "0 0 10px rgba(147, 197, 253, 0.08)" : undefined,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Kit tab */}
      {active === "kit" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(8rem, 1fr))", gap: "0.75rem" }}>
                {dailyTools.map((tool) => {
                  const pal = categoryColor[tool.category] ?? categoryColor["IDE"];
            return (
              <div
                key={tool.name}
                className="card"
                style={{
                  padding: "1.25rem 0.75rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.75rem",
                  textAlign: "center",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  cursor: "default",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 24px rgba(0,0,0,0.12), 0 0 0 1px ${tool.color}22`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                }}
              >
                {/* Icon */}
                <div style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "0.75rem",
                  background: `${tool.color}18`,
                  border: `1px solid ${tool.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.5rem",
                }}>
                  <img
                    src={tool.icon}
                    alt={tool.name}
                    width={24}
                    height={24}
                    style={{ width: "1.5rem", height: "1.5rem", objectFit: "contain" }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                </div>

                {/* Name */}
                <p style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.2 }}>
                  {tool.name}
                </p>

                {/* Category */}
                <span style={{
                  fontSize: "0.6rem",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "0.15em 0.5em",
                  borderRadius: "0.2rem",
                  background: pal.bg,
                  color: pal.text,
                  border: `1px solid ${pal.border}`,
                }}>
                  {tool.category}
                </span>
              </div>
            );
          })}
          </div>
        </div>
      )}

      {/* Other tabs */}
      {current && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
          {/* Learning platforms card grid */}
          {active === "learning" && (
            <div>
              <p style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-dim)", marginBottom: "0.75rem", fontFamily: "var(--font-mono)" }}>
                Platforms
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(8rem, 1fr))", gap: "0.75rem" }}>
                {learningPlatforms.map((tool) => {
                  const pal = categoryColor[tool.category] ?? categoryColor["IDE"];
                  return (
                    <div
                      key={tool.name}
                      className="card"
                      style={{ padding: "1.25rem 0.75rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", textAlign: "center", transition: "transform 0.2s ease, box-shadow 0.2s ease", cursor: "default" }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 24px rgba(0,0,0,0.12), 0 0 0 1px ${tool.color}22`;
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                      }}
                    >
                      <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.75rem", background: `${tool.color}18`, border: `1px solid ${tool.color}30`, display: "flex", alignItems: "center", justifyContent: "center", padding: "0.5rem" }}>
                        <img src={tool.icon} alt={tool.name} width={24} height={24} style={{ width: "1.5rem", height: "1.5rem", objectFit: "contain" }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                      </div>
                      <p style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.2 }}>{tool.name}</p>
                      <span style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", padding: "0.15em 0.5em", borderRadius: "0.2rem", background: pal.bg, color: pal.text, border: `1px solid ${pal.border}` }}>{tool.category}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tag sections — skip Platforms since it's shown as cards above */}
          {current.sections.filter(s => s.name !== "Platforms").map((sec) => (
            <div key={sec.name}>
              <p style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-dim)", marginBottom: "0.75rem", fontFamily: "var(--font-mono)" }}>
                {sec.name}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {sec.items.map((item) => <Tag key={item}>{item}</Tag>)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
