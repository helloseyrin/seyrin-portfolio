"use client";

import { useState } from "react";
import Tag from "./Tag";
import { IconSkills } from "./GradientIcon";

// ── Types ─────────────────────────────────────────

type CertSource = {
  kind: "cert";
  title: string;
  platform: string;
  issued: string;
  url?: string;
};

type ExperienceSource = {
  kind: "experience";
  role: string;
  org: string;
  period: string;
};

type ProjectSource = {
  kind: "project";
  title: string;
  status: string;
};

type SkillSource = CertSource | ExperienceSource | ProjectSource;

// ── Skill → source mapping ────────────────────────

const skillSources: Record<string, SkillSource[]> = {
  "Python": [
    { kind: "cert",       title: "Data Engineer in Python",           platform: "DataCamp",  issued: "in progress" },
    { kind: "cert",       title: "NLP in Python",                     platform: "DataCamp",  issued: "in progress" },
    { kind: "cert",       title: "IBM Data Engineering Professional",  platform: "Coursera",  issued: "in progress" },
    { kind: "project",    title: "Anima Mundi // Obsidian PKM",        status: "Active"      },
    { kind: "project",    title: "Strata // Data Pipeline",            status: "In progress" },
    { kind: "project",    title: "Recall // Document Q&A",             status: "Planning"    },
  ],
  "SQL": [
    { kind: "cert",       title: "Associate Data Engineer in SQL",     platform: "DataCamp",  issued: "Feb 2026", url: "/datacamp-associate-data-engineer.pdf" },
    { kind: "cert",       title: "IBM Data Engineering Professional",  platform: "Coursera",  issued: "in progress" },
  ],
  "Bash": [
    { kind: "cert",       title: "Associate Data Engineer in SQL",     platform: "DataCamp",  issued: "Feb 2026", url: "/datacamp-associate-data-engineer.pdf" },
    { kind: "cert",       title: "Data Engineer in Python",            platform: "DataCamp",  issued: "in progress" },
  ],
  "HTML/CSS": [
    { kind: "experience", role: "Translator & Research / Editing Assistant", org: "Freelance (ENG ↔ UA)", period: "Sep 2014 – May 2020" },
  ],
  "Markdown": [
    { kind: "experience", role: "Translator & Research / Editing Assistant", org: "Freelance (ENG ↔ UA)", period: "Sep 2014 – May 2020" },
  ],
  "PyTorch": [
    { kind: "project",    title: "Lexis // Text Classifier",           status: "In progress" },
  ],
  "pandas": [
    { kind: "cert",       title: "Data Engineer in Python",            platform: "DataCamp",  issued: "in progress" },
  ],
  "fastembed": [
    { kind: "project",    title: "Anima Mundi // Obsidian PKM",        status: "Active"      },
    { kind: "project",    title: "Meridian // Embedding Explorer",     status: "Planning"    },
  ],
  "ChromaDB": [
    { kind: "project",    title: "Anima Mundi // Obsidian PKM",        status: "Active"      },
    { kind: "project",    title: "Recall // Document Q&A",             status: "Planning"    },
  ],
  "HuggingFace Transformers": [
    { kind: "project",    title: "Lexis // Text Classifier",           status: "In progress" },
  ],
  "NLTK": [
    { kind: "cert",       title: "NLP in Python",                      platform: "DataCamp",  issued: "in progress" },
  ],
  "Vector Databases": [
    { kind: "project",    title: "Anima Mundi // Obsidian PKM",        status: "Active"      },
    { kind: "project",    title: "Recall // Document Q&A",             status: "Planning"    },
  ],
  "RAG": [
    { kind: "project",    title: "Recall // Document Q&A",             status: "Planning"    },
    { kind: "project",    title: "Aqua // Marine Bioremediation",      status: "Planning"    },
  ],
  "HNSW": [
    { kind: "project",    title: "Meridian // Embedding Explorer",     status: "Planning"    },
  ],
  "ANN": [
    { kind: "project",    title: "Meridian // Embedding Explorer",     status: "Planning"    },
  ],
  "PostgreSQL": [
    { kind: "cert",       title: "Associate Data Engineer in SQL",     platform: "DataCamp",  issued: "Feb 2026", url: "/datacamp-associate-data-engineer.pdf" },
    { kind: "project",    title: "Strata // Data Pipeline",            status: "In progress" },
    { kind: "project",    title: "Aqua // Marine Bioremediation",      status: "Planning"    },
  ],
  "ETL": [
    { kind: "cert",       title: "Associate Data Engineer in SQL",     platform: "DataCamp",  issued: "Feb 2026", url: "/datacamp-associate-data-engineer.pdf" },
    { kind: "cert",       title: "Data Engineer in Python",            platform: "DataCamp",  issued: "in progress" },
  ],
  "Airflow": [
    { kind: "cert",       title: "Data Engineer in Python",            platform: "DataCamp",  issued: "in progress" },
  ],
  "dbt": [
    { kind: "cert",       title: "Data Engineer in Python",            platform: "DataCamp",  issued: "in progress" },
    { kind: "project",    title: "Strata // Data Pipeline",            status: "In progress" },
  ],
  "Snowflake": [
    { kind: "cert",       title: "Data Engineer in Python",            platform: "DataCamp",  issued: "in progress" },
  ],
  "Docker": [
    { kind: "cert",       title: "Build a CI/CD Pipeline with Docker", platform: "Coursera",  issued: "Mar 2026", url: "https://coursera.org/share/6088dea18a423bcd24575ab3530dcf05" },
    { kind: "cert",       title: "IBM Data Engineering Professional",  platform: "Coursera",  issued: "in progress" },
    { kind: "project",    title: "Strata // Data Pipeline",            status: "In progress" },
  ],
  "Git": [
    { kind: "cert",       title: "Build a CI/CD Pipeline with Docker", platform: "Coursera",  issued: "Mar 2026", url: "https://coursera.org/share/6088dea18a423bcd24575ab3530dcf05" },
    { kind: "experience", role: "Translator & Research / Editing Assistant", org: "Freelance (ENG ↔ UA)", period: "Sep 2014 – May 2020" },
  ],
  "CI/CD": [
    { kind: "cert",       title: "Build a CI/CD Pipeline with Docker", platform: "Coursera",  issued: "Mar 2026", url: "https://coursera.org/share/6088dea18a423bcd24575ab3530dcf05" },
  ],
  "Figma": [
    { kind: "experience", role: "Business Analysis & UX Design",       org: "Freelance",      period: "Mar 2023 – Mar 2024" },
  ],
  "Zeplin": [
    { kind: "experience", role: "Business Analysis & UX Design",       org: "Freelance",      period: "Mar 2023 – Mar 2024" },
  ],
  "Wireframing": [
    { kind: "cert",       title: "Business Analysis in IT",            platform: "Beetroot Academy", issued: "Mar 2025", url: "https://beetroot-academy.trueoriginal.com/diploma-alumni-ba123-smyrna-volzhich-246013/" },
    { kind: "experience", role: "Business Analysis & UX Design",       org: "Freelance",      period: "Mar 2023 – Mar 2024" },
  ],
  "Prototyping": [
    { kind: "cert",       title: "Business Analysis in IT",            platform: "Beetroot Academy", issued: "Mar 2025", url: "https://beetroot-academy.trueoriginal.com/diploma-alumni-ba123-smyrna-volzhich-246013/" },
    { kind: "experience", role: "Business Analysis & UX Design",       org: "Freelance",      period: "Mar 2023 – Mar 2024" },
  ],
  "UX Research": [
    { kind: "cert",       title: "Business Analysis in IT",            platform: "Beetroot Academy", issued: "Mar 2025", url: "https://beetroot-academy.trueoriginal.com/diploma-alumni-ba123-smyrna-volzhich-246013/" },
    { kind: "experience", role: "Business Analysis & UX Design",       org: "Freelance",      period: "Mar 2023 – Mar 2024" },
  ],
};

// ── Style helpers ─────────────────────────────────

const platformColors: Record<string, string> = {
  "DataCamp":         "var(--platform-datacamp)",
  "Coursera":         "var(--platform-coursera)",
  "Beetroot Academy": "var(--platform-beetroot)",
  "IBM":              "var(--platform-ibm)",
};

const statusColors: Record<string, string> = {
  "Active":      "var(--accent-emerald)",
  "In progress": "var(--accent-purple)",
  "Planning":    "var(--accent-ice)",
};

// ── Tooltip section ───────────────────────────────

function TooltipSection({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", padding: "0.35rem 0.75rem 0.2rem", borderBottom: "1px solid rgba(137,196,225,0.12)" }}>
        {icon}
        <span style={{ fontSize: "0.55rem", fontFamily: "var(--font-mono)", color: "rgba(100,130,200,0.65)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>
      </div>
      {children}
    </div>
  );
}

// ── LinkedTag ─────────────────────────────────────

function LinkedTag({ skill }: { skill: string }) {
  const sources = skillSources[skill];
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  if (!sources?.length) return <Tag>{skill}</Tag>;

  const certs      = sources.filter((s): s is CertSource       => s.kind === "cert");
  const experience = sources.filter((s): s is ExperienceSource => s.kind === "experience");
  const projects   = sources.filter((s): s is ProjectSource    => s.kind === "project");

  return (
    <>
      <span
        className="tag-pill"
        onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })}
        onMouseLeave={() => setPos(null)}
        style={{ cursor: "default", display: "inline-flex", alignItems: "center", gap: "0.3em" }}
      >
        {skill}
        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--gradient-accent)", boxShadow: "0 0 4px rgba(var(--accent-ice-rgb),0.6)", flexShrink: 0, display: "inline-block" }} />
      </span>

      {pos && (
        <div style={{
          position: "fixed",
          left: pos.x + 14,
          top: pos.y + 14,
          width: "18rem",
          zIndex: 9999,
          pointerEvents: "none",
          borderRadius: "0.6rem",
          background: "linear-gradient(135deg, rgba(200,220,245,0.6) 0%, rgba(210,215,255,0.5) 50%, rgba(200,195,255,0.55) 100%)",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          border: "1px solid rgba(200,220,255,0.45)",
          boxShadow: "0 8px 32px rgba(100,140,255,0.1), inset 0 1px 0 rgba(255,255,255,0.6)",
          overflow: "hidden",
        }}>

          {/* Certs */}
          {certs.length > 0 && (
            <TooltipSection label="Certifications" icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(137,196,225,0.75)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
              </svg>
            }>
              {certs.map((c, i) => (
                <div key={i} style={{ padding: "0.35rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.15rem", borderBottom: i < certs.length - 1 ? "1px solid rgba(137,196,225,0.08)" : "none" }}>
                  <span style={{ fontSize: "0.775rem", color: "rgba(25,35,70,0.85)", lineHeight: 1.3, fontWeight: 500 }}>
                    {c.title}{c.url && <span style={{ marginLeft: "0.3em", color: "rgba(137,196,225,0.8)" }}>↗</span>}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: platformColors[c.platform] ?? "rgba(100,130,200,0.7)", fontWeight: 500 }}>{c.platform}</span>
                    <span style={{ fontSize: "0.6rem", color: "rgba(100,130,200,0.4)", fontFamily: "var(--font-mono)" }}>·</span>
                    <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: c.issued === "in progress" ? "rgba(167,139,250,0.8)" : "rgba(100,130,200,0.65)", fontStyle: c.issued === "in progress" ? "italic" : "normal" }}>{c.issued}</span>
                  </div>
                </div>
              ))}
            </TooltipSection>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <TooltipSection label="Experience" icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(137,196,225,0.75)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            }>
              {experience.map((e, i) => (
                <div key={i} style={{ padding: "0.35rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.15rem", borderBottom: i < experience.length - 1 ? "1px solid rgba(137,196,225,0.08)" : "none" }}>
                  <span style={{ fontSize: "0.775rem", color: "rgba(25,35,70,0.85)", lineHeight: 1.3, fontWeight: 500 }}>{e.role}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "rgba(100,130,180,0.75)" }}>{e.org}</span>
                    <span style={{ fontSize: "0.6rem", color: "rgba(100,130,200,0.4)", fontFamily: "var(--font-mono)" }}>·</span>
                    <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "rgba(100,130,200,0.65)" }}>{e.period}</span>
                  </div>
                </div>
              ))}
            </TooltipSection>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <TooltipSection label="Projects" icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(137,196,225,0.75)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11m0 0H5m4 0h10m-10 0v4a2 2 0 0 0 2 2h4a2 2 0 0 1 2-2v-4"/>
              </svg>
            }>
              {projects.map((p, i) => (
                <div key={i} style={{ padding: "0.35rem 0.75rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", borderBottom: i < projects.length - 1 ? "1px solid rgba(137,196,225,0.08)" : "none" }}>
                  <span style={{ fontSize: "0.775rem", color: "rgba(25,35,70,0.85)", lineHeight: 1.3, fontWeight: 500 }}>{p.title}</span>
                  <span style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", color: statusColors[p.status] ?? "#89c4e1", flexShrink: 0 }}>{p.status}</span>
                </div>
              ))}
            </TooltipSection>
          )}

        </div>
      )}
    </>
  );
}

// ── Section label ─────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-dim)", marginBottom: "0.75rem", fontFamily: "var(--font-mono)" }}>
      {children}
    </p>
  );
}

// ── Data ──────────────────────────────────────────

const skills = [
  { name: "Languages",        items: ["Python", "SQL", "Bash", "HTML/CSS", "Markdown"] },
  { name: "ML & Data",        items: ["PyTorch", "scikit-learn", "pandas", "Polars", "NumPy", "fastembed", "ChromaDB"] },
  { name: "NLP & Embeddings", items: ["HuggingFace Transformers", "sentence-transformers", "NLTK", "Vector Databases", "RAG", "HNSW", "ANN"] },
  { name: "Infrastructure",   items: ["PostgreSQL", "Snowflake", "Azure", "Docker", "Airflow", "dbt", "Linux", "Git", "CI/CD"] },
  { name: "Design",           items: ["Figma", "Zeplin", "Wireframing", "Prototyping", "UX Research"] },
];

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
              {sec.items.map(item => <LinkedTag key={item} skill={item} />)}
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--text-dim)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "linear-gradient(135deg, #89c4e1, #a78bfa)", display: "inline-block", flexShrink: 0 }} />
        hover tagged skills to see backing credentials, experience, and projects
      </p>
    </div>
  );
}
