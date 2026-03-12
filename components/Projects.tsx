const projects = [
  {
    title: "Anima Mundi // Obsidian PKM",
    desc: "Self-organising Personal Knowledge Management System built with Obsidian. Semantic search across clipped articles, videos, PDFs, GitHub repos, and links. The math finds structure in what you save.",
    tags: ["Python", "ChromaDB", "NLP", "embeddings", "fastembed"],
    href: "https://github.com/helloseyrin/anima-mundi",
    status: "Active",
  },
];

export default function Projects() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        <h1>Projects</h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Things I&apos;ve built and am building.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 22rem), 1fr))", gap: "var(--space-2)" }}>
        {projects.map((p) => (
          <a key={p.title} href={p.href} target="_blank" rel="noopener noreferrer" className="project-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--space-1)" }}>
              <p style={{ fontWeight: 500, color: "var(--text-primary)", fontSize: "0.9375rem" }}>{p.title}</p>
              <span style={{ fontSize: "0.7rem", padding: "0.2em 0.6em", borderRadius: "0.25rem", marginLeft: "0.75rem", flexShrink: 0, marginTop: "0.15rem", background: "var(--badge-bg)", color: "var(--badge-text)" }}>
                {p.status}
              </span>
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: "var(--space-2)" }}>{p.desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
