const categories = [
  {
    name: "Languages",
    tools: ["Python", "SQL", "Bash", "TypeScript"],
  },
  {
    name: "ML & Data",
    tools: ["PyTorch", "scikit-learn", "pandas", "NumPy", "fastembed", "ChromaDB"],
  },
  {
    name: "NLP & Embeddings",
    tools: ["spaCy", "HuggingFace Transformers", "sentence-transformers", "NLTK"],
  },
  {
    name: "Infrastructure",
    tools: ["PostgreSQL", "Docker", "Linux", "Git"],
  },
  {
    name: "Workflow",
    tools: ["Obsidian", "Cursor", "Jupyter", "VS Code"],
  },
];

export default function Tools() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        <h1>Tools</h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>What I use to build and think.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
        {categories.map((cat) => (
          <div key={cat.name}>
            <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "var(--space-1)" }}>
              {cat.name}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {cat.tools.map((t) => (
                <span key={t} className="tag" style={{ fontSize: "0.875rem", padding: "0.35em 0.8em", color: "var(--text-accent)", borderColor: "var(--border)", border: "1px solid var(--border)" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
