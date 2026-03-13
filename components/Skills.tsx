"use client";

import Tag from "./Tag";
import { IconSkills } from "./GradientIcon";

// ── Data ─────────────────────────────────────────

const skills = [
  { name: "Languages",        items: ["Python", "SQL", "Bash", "HTML/CSS", "Markdown"] },
  { name: "ML & Data",        items: ["PyTorch", "scikit-learn", "pandas", "Polars", "NumPy", "fastembed", "ChromaDB"] },
  { name: "NLP & Embeddings", items: ["HuggingFace Transformers", "sentence-transformers", "NLTK", "Vector Databases", "RAG"] },
  { name: "Infrastructure",   items: ["PostgreSQL", "Snowflake", "Azure", "Docker", "Airflow", "dbt", "Linux", "Git", "CI/CD"] },
  { name: "Design",           items: ["Figma", "Zeplin", "Wireframing", "Prototyping", "UX Research"] },
];

// ── Section label ─────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-dim)", marginBottom: "0.75rem", fontFamily: "var(--font-mono)" }}>
      {children}
    </p>
  );
}

// ── Main component ────────────────────────────────

export default function Skills() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <IconSkills />
          Skills
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>What I know and what I build with.</p>
      </div>

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
    </div>
  );
}
