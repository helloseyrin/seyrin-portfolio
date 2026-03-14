"use client";

import { useState } from "react";
import Tag from "./Tag";
import { IconCertifications } from "./GradientIcon";

// ── Data ─────────────────────────────────────────

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

const learningProjects = [
  {
    title: "Build a CI/CD Pipeline with Docker: From Code to Deployment",
    platform: "Coursera",
    issued: "Mar 2026",
    credentialUrl: "https://coursera.org/share/6088dea18a423bcd24575ab3530dcf05",
    tasks: [
      "Containerize app with Docker and Docker Compose",
      "Set up GitHub Actions pipeline for building Docker image",
      "Authenticate and push Docker images to AWS ECR with GitHub Actions",
      "Set up EC2 to pull and run Docker images from ECR",
      "Automate deployment of app to EC2 with CD pipeline",
    ],
    skills: ["Application Deployment", "DevOps", "Containerization", "Continuous Integration", "Continuous Deployment", "Cloud Deployment", "CI/CD"],
    tools: ["Docker", "GitHub Actions", "Amazon ECR", "Amazon EC2", "AWS", "Spring Boot"],
  },
];

// ── Style helpers ─────────────────────────────────

const platformColors: Record<string, { bg: string; text: string; border: string }> = {
  DataCamp:           { bg: "rgba(3, 172, 140, 0.12)",  text: "#03ac8c", border: "rgba(3, 172, 140, 0.3)"  },
  Coursera:           { bg: "rgba(37, 99, 235, 0.1)",   text: "#2563eb", border: "rgba(37, 99, 235, 0.25)" },
  IBM:                { bg: "rgba(15, 98, 254, 0.1)",   text: "#0f62fe", border: "rgba(15, 98, 254, 0.25)" },
  "Beetroot Academy": { bg: "rgba(74, 183, 73, 0.1)",   text: "#4ab749", border: "rgba(74, 183, 73, 0.25)" },
};

// ── Main component ────────────────────────────────

type Tab = "Certifications" | "Learning Projects";

export default function Certifications() {
  const [active, setActive] = useState<Tab>("Certifications");

  const tabs: Tab[] = ["Certifications", "Learning Projects"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <IconCertifications />
          Certifications
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Courses, credentials, and hands-on learning projects.</p>
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
        {tabs.map(tab => {
          const isActive = tab === active;
          return (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className="tab-btn"
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
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Certifications grid */}
      {active === "Certifications" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 18rem), 1fr))", gap: "var(--space-2)" }}>
          {certs.map((c) => {
            const pal = platformColors[c.platform] ?? platformColors["Coursera"];
            return (
              <div key={c.course} className="card" style={{ padding: "var(--space-3)", display: "flex", flexDirection: "column", gap: "0.75rem" }}>

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

                <p style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.35 }}>
                  {c.course}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                  {c.tags.map(t => <Tag key={t}>{t}</Tag>)}
                </div>

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
      )}

      {/* Learning Projects */}
      {active === "Learning Projects" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          {learningProjects.map((p) => {
            const pal = platformColors[p.platform] ?? platformColors["Coursera"];
            return (
              <div key={p.title} className="card" style={{ padding: "var(--space-3) var(--space-4)", display: "flex", flexDirection: "column", gap: "1rem" }}>

                {/* Header row */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
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
                      {p.platform} · Guided Project
                    </span>
                    <p style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.35, margin: 0 }}>
                      {p.title}
                    </p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.35rem", flexShrink: 0 }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>{p.issued}</span>
                    {p.credentialUrl && (
                      <a
                        href={p.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: "0.8rem", color: "var(--accent-aqua)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.25rem" }}
                      >
                        View credential
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                      </a>
                    )}
                  </div>
                </div>

                {/* Tasks */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  <p style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-dim)", margin: 0 }}>Tasks completed</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                    {p.tasks.map((task, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(137,196,225,0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "0.15rem" }}>
                          <path d="M20 6 9 17l-5-5"/>
                        </svg>
                        <span style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>{task}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills + Tools */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <p style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-dim)", margin: 0 }}>Skills & tools</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {p.tools.map(t => <Tag key={t}>{t}</Tag>)}
                    {p.skills.map(s => <Tag key={s}>{s}</Tag>)}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
