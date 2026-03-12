const certs = [
  {
    course: "Associate Data Engineer",
    platform: "DataCamp",
    issued: "2025–2026",
    credentialUrl: "",
  },
  {
    course: "Natural Language Processing in Python",
    platform: "DataCamp",
    issued: "2025–2026",
    credentialUrl: "",
  },
  {
    course: "IBM Data Engineering Professional",
    platform: "Coursera",
    issued: "2025–2026",
    credentialUrl: "",
  },
];

const platformColors: Record<string, { bg: string; text: string; border: string }> = {
  DataCamp:  { bg: "rgba(3, 172, 140, 0.12)",  text: "#03ac8c", border: "rgba(3, 172, 140, 0.3)"  },
  Coursera:  { bg: "rgba(37, 99, 235, 0.1)",   text: "#2563eb", border: "rgba(37, 99, 235, 0.25)" },
  IBM:       { bg: "rgba(15, 98, 254, 0.1)",   text: "#0f62fe", border: "rgba(15, 98, 254, 0.25)" },
};

export default function Certifications() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        <h1>Certifications</h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Courses and credentials completed.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 18rem), 1fr))", gap: "var(--space-2)" }}>
        {certs.map((c) => {
          const pal = platformColors[c.platform] ?? platformColors["Coursera"];
          return (
            <div key={c.course} className="card" style={{ padding: "var(--space-3)", display: "flex", flexDirection: "column", gap: "0.75rem" }}>

              {/* Platform badge */}
              <span style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                padding: "0.2em 0.65em",
                borderRadius: "0.25rem",
                fontSize: "0.7rem",
                fontFamily: "var(--font-mono)",
                fontWeight: 500,
                letterSpacing: "0.04em",
                background: pal.bg,
                color: pal.text,
                border: `1px solid ${pal.border}`,
              }}>
                {c.platform}
              </span>

              {/* Course name */}
              <p style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.35 }}>
                {c.course}
              </p>

              {/* Footer row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>{c.issued}</span>
                {c.credentialUrl ? (
                  <a
                    href={c.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "0.8rem", color: "var(--accent-aqua)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.25rem" }}
                  >
                    View credential
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                  </a>
                ) : (
                  <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", fontStyle: "italic" }}>credential pending</span>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
