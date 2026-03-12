const certs = [
  { course: "Associate Data Engineer", platform: "DataCamp", dates: "2025–2026", statement: "" },
  { course: "Natural Language Processing in Python", platform: "DataCamp", dates: "2025–2026", statement: "" },
  { course: "IBM Data Engineering Professional", platform: "Coursera", dates: "2025–2026", statement: "" },
];

export default function Certifications() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        <h1>Certifications</h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Courses and credentials completed.</p>
      </div>

      <div style={{ borderRadius: "0.5rem", overflow: "hidden", border: "1px solid var(--border)" }}>
        <table style={{ width: "100%", fontSize: "0.9rem", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-card)" }}>
              {["Course", "Platform", "Dates", "Statement"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "0.875rem 1.25rem", fontSize: "0.7rem", fontWeight: 400, textTransform: "uppercase", letterSpacing: "0.09em", color: "var(--text-muted)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {certs.map((c, i) => (
              <tr
                key={c.course}
                className="cert-row"
                style={i < certs.length - 1 ? { borderBottom: "1px solid var(--border)" } : {}}
              >
                <td style={{ padding: "0.875rem 1.25rem", color: "var(--text-accent)" }}>{c.course}</td>
                <td style={{ padding: "0.875rem 1.25rem", color: "var(--text-muted)" }}>{c.platform}</td>
                <td style={{ padding: "0.875rem 1.25rem" }}>
                  <span style={{ padding: "0.2em 0.6em", borderRadius: "0.25rem", fontSize: "0.8rem", background: "var(--badge-bg)", color: "var(--badge-text)" }}>{c.dates}</span>
                </td>
                <td style={{ padding: "0.875rem 1.25rem", fontSize: "0.8rem", color: "var(--text-dim)" }}>{c.statement || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
