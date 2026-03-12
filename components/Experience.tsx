import Tag from "./Tag";

const items = [
  {
    role: "Data Science & AI Student",
    org: "Turing College",
    period: "2024 – present",
    type: "Education",
    desc: "Intensive programme covering data engineering, machine learning, NLP, and system design. Building end-to-end ML pipelines and semantic search systems.",
    tags: ["Python", "SQL", "ML", "NLP", "Data Engineering"],
  },
];

export default function Experience() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        <h1>Stack</h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Work history and education.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
        {items.map((item) => (
          <div key={item.role} className="card" style={{ padding: "var(--space-3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "var(--space-3)", marginBottom: "var(--space-2)" }}>
              <div>
                <p style={{ fontWeight: 500, color: "var(--text-primary)" }}>{item.role}</p>
                <p style={{ fontSize: "0.875rem", color: "var(--text-accent-2)", marginTop: "0.25rem" }}>{item.org}</p>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>{item.period}</span>
                <p style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginTop: "0.2rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>{item.type}</p>
              </div>
            </div>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "var(--text-secondary)", marginBottom: "var(--space-2)" }}>{item.desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {item.tags.map((t) => <Tag key={t}>{t}</Tag>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
