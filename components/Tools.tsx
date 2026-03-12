"use client";

import { useState } from "react";
import Tag from "./Tag";

const tabs = [
  {
    id: "stack",
    label: "Stack",
    sections: [
      { name: "Languages", items: ["Python", "SQL", "Bash", "TypeScript"] },
      { name: "ML & Data", items: ["PyTorch", "scikit-learn", "pandas", "NumPy", "fastembed", "ChromaDB"] },
      { name: "NLP & Embeddings", items: ["spaCy", "HuggingFace Transformers", "sentence-transformers", "NLTK"] },
      { name: "Infrastructure", items: ["PostgreSQL", "Docker", "Linux", "Git"] },
      { name: "Workflow", items: ["Obsidian", "Cursor", "Jupyter", "VS Code"] },
    ],
  },
  {
    id: "learning",
    label: "Learning",
    sections: [
      { name: "Currently studying", items: ["Turing College — Data Science & AI", "DataCamp — Data Engineering track", "Coursera — IBM Data Engineering"] },
      { name: "Platforms", items: ["fast.ai", "Andrej Karpathy lectures", "Hugging Face courses", "Missing Semester (MIT)"] },
      { name: "Certifications in progress", items: ["Associate Data Engineer", "NLP in Python", "IBM Data Engineering Professional"] },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    sections: [
      { name: "Blogs & writing", items: ["Lilian Weng (lilianweng.github.io)", "Distill.pub", "The Gradient", "Eugene Yan"] },
      { name: "Newsletters", items: ["The Batch — deeplearning.ai", "Data Elixir", "Import AI"] },
      { name: "Papers", items: ["Attention Is All You Need", "BERT", "RAG (Lewis et al.)", "ColBERT"] },
    ],
  },
];

export default function Tools() {
  const [active, setActive] = useState("stack");
  const current = tabs.find((t) => t.id === active)!;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        <h1>Tools</h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>What I use to build and think.</p>
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: "0.375rem" }}>
        {tabs.map((t) => {
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

      {/* Tab content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
        {current.sections.map((sec) => (
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
    </div>
  );
}
