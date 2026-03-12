const certs = [
  {
    course: "Associate Data Engineer in SQL",
    platform: "DataCamp",
    issued: "Feb 09, 2026",
    hours: "28 hr",
    credentialUrl: "/datacamp-associate-data-engineer.pdf",
    tags: ["SQL", "PostgreSQL", "Database Design", "Data Warehousing", "ETL", "Window Functions", "Data Modeling", "Shell"],
  },
  {
    course: "Data Engineer in Python",
    platform: "DataCamp",
    issued: "pending",
    hours: "57 hr",
    credentialUrl: "",
    tags: ["Python", "Pandas", "ETL", "Airflow", "Shell", "SQL", "APIs", "Data Pipelines", "Software Engineering"],
  },
  {
    course: "Natural Language Processing in Python",
    platform: "DataCamp",
    issued: "pending",
    hours: null,
    credentialUrl: "",
    tags: ["Python", "NLP", "spaCy", "NLTK", "Text Classification", "Named Entity Recognition"],
  },
  {
    course: "Business Analysis in IT",
    platform: "Beetroot Academy",
    issued: "Mar 26, 2025",
    hours: null,
    credentialUrl: "https://beetroot-academy.trueoriginal.com/diploma-alumni-ba123-smyrna-volzhich-246013/",
    tags: ["Business Analysis", "Requirements Engineering", "User Stories", "BPMN", "UML", "Agile", "Stakeholder Management", "Wireframing", "Jira", "Confluence"],
  },
  {
    course: "CISA: Certified Information Systems Auditor",
    platform: "Coursera",
    issued: "pending",
    hours: null,
    credentialUrl: "",
    tags: ["IT Audit", "Information Security", "Risk Management", "IT Governance", "Compliance", "Access Control", "Incident Response", "Business Continuity"],
  },
  {
    course: "IBM Data Engineering Professional",
    platform: "Coursera",
    issued: "pending",
    hours: null,
    credentialUrl: "",
    tags: ["Python", "SQL", "NoSQL", "Apache Spark", "Hadoop", "ETL", "Docker", "Kafka"],
  },
];

import Tag from "./Tag";

const platformColors: Record<string, { bg: string; text: string; border: string }> = {
  DataCamp:        { bg: "rgba(3, 172, 140, 0.12)",  text: "#03ac8c", border: "rgba(3, 172, 140, 0.3)"  },
  Coursera:        { bg: "rgba(37, 99, 235, 0.1)",   text: "#2563eb", border: "rgba(37, 99, 235, 0.25)" },
  IBM:             { bg: "rgba(15, 98, 254, 0.1)",   text: "#0f62fe", border: "rgba(15, 98, 254, 0.25)" },
  "Beetroot Academy": { bg: "rgba(74, 183, 73, 0.1)", text: "#4ab749", border: "rgba(74, 183, 73, 0.25)" },
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

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                {c.tags.map(t => <Tag key={t}>{t}</Tag>)}
              </div>

              {/* Footer row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>{c.issued}</span>
                  {c.hours && <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>· {c.hours}</span>}
                </div>
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
