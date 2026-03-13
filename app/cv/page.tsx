"use client";

import { useEffect } from "react";

export default function CVPage() {
  useEffect(() => {
    document.body.dataset.page = "cv";
    return () => { delete document.body.dataset.page; };
  }, []);
  const experience = [
    {
      role: "Business Analysis & UX Design",
      org: "Freelance",
      period: "Mar 2023 – Mar 2024",
      location: "Remote",
      bullets: [
        "Gathered and maintained stakeholder requirements; produced user personas, journey maps, and UX deliverables bridging client, designer, and developer teams.",
        "Conducted market research and competitor analysis (SWOT) to inform product strategy and design decisions.",
        "Managed feature prioritisation and documentation in JIRA/Confluence; facilitated design hand-offs via Figma, Miro, and Zeplin.",
      ],
      tags: ["Figma", "Miro", "JIRA", "Confluence", "UX Research", "Requirements Gathering"],
    },
    {
      role: "Volunteer Content Manager & Editor",
      org: "FinUA",
      period: "Sep 2024 – Dec 2024",
      location: "Finland",
      bullets: [
        "Managed website content, wrote and edited articles, and organised social media for FinUA — an information hub connecting Ukrainians in Finland to legal consulting and support services.",
        "Refined communication strategy for outreach to Ukrainian communities.",
      ],
      tags: ["Content Management", "Copyediting", "Social Media"],
    },
    {
      role: "Front Desk Operations",
      org: "The Witchery · Kimpton · Yotel",
      period: "Jun 2022 – Jan 2023",
      location: "Edinburgh, Scotland",
      bullets: [
        "Managed guest operations using ResDiary, Reslynx, and Opera PMS; generated daily reports and cross-department handovers.",
        "Coordinated transport, deliveries, and urgent logistics; ensured compliance with safety protocols.",
      ],
      tags: ["Opera PMS", "Reporting", "Customer Service"],
    },
    {
      role: "Administrative Assistant",
      org: "Array Property Group",
      period: "Oct 2020 – Mar 2022",
      location: "New York, US · Remote",
      bullets: [
        "Conducted rental market research and maintained up-to-date property database reports.",
        "Managed client correspondence, documentation, scheduling, and CRM records for a distributed team.",
      ],
      tags: ["Market Research", "CRM", "Documentation"],
    },
    {
      role: "Translator & Research / Editing Assistant",
      org: "Freelance (ENG ↔ UA)",
      period: "Sep 2014 – May 2020",
      location: "Ukraine · Remote",
      bullets: [
        "Translated technical documentation, user manuals, and academic content across liberal arts, cultural studies, and social sciences.",
        "Developed information architecture and structured content using Markdown, HTML, Git, CMS platforms, and Confluence.",
        "Interviewed subject-matter experts to clarify domain terminology; rapidly onboarded to new fields including software APIs and engineering specifications.",
      ],
      tags: ["Technical Writing", "Information Architecture", "Markdown", "HTML", "Git", "Confluence"],
    },
  ];

  const skills = [
    { name: "Languages",        items: ["Python", "SQL", "Bash", "HTML/CSS", "Markdown"] },
    { name: "ML & Data",        items: ["PyTorch", "scikit-learn", "pandas", "Polars", "NumPy", "fastembed", "ChromaDB"] },
    { name: "NLP & Embeddings", items: ["HuggingFace Transformers", "sentence-transformers", "NLTK", "Vector Databases", "RAG"] },
    { name: "Infrastructure",   items: ["PostgreSQL", "Snowflake", "Azure", "Docker", "Airflow", "dbt", "Linux", "Git", "CI/CD"] },
    { name: "Design & Analysis", items: ["Figma", "Zeplin", "UX Research", "Wireframing", "JIRA", "Confluence", "SWOT"] },
  ];

  const education = [
    { credential: "Data Science & AI", institution: "Turing College", period: "Starting Apr 2026", note: "Python · SQL · NLP · PyTorch · RAG · Computer Vision" },
    { credential: "Open University — Entrepreneurship Law", institution: "Aalto University", period: "Oct – Dec 2025", note: "" },
    { credential: "Open University — Forests, Wood and Carbon", institution: "Aalto University", period: "Apr – Jun 2024", note: "" },
    { credential: "Yrittäjyyden opinnot (JOTPA)", institution: "Omnia", period: "Jun – Aug 2024", note: "Entrepreneurship studies for Ukrainian professionals in Finland" },
    { credential: "Design & Innovation (Interrupted)", institution: "The Open University", period: "May 2022 – Mar 2024", note: "" },
    { credential: "Højskolebevis — Performance Arts", institution: "Musik og Teaterhøjskolen, Toftlund", period: "Jan – Jun 2020", note: "Vocal & Dance line" },
  ];

  const projects = [
    { title: "Anima Mundi", desc: "Self-organising Personal Knowledge Management System with semantic search across clipped articles, PDFs, and GitHub repos." },
    { title: "Recall // Document Q&A", desc: "RAG-based natural language Q&A over personal document collections using vector retrieval." },
    { title: "Lexis // Text Classifier", desc: "Fine-tuned transformer pipeline for multi-label document classification with low-resource domain adaptation." },
    { title: "Strata // Data Pipeline", desc: "Modular ELT pipeline with schema inference, lineage tracking, and incremental loading." },
  ];

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: var(--font-outfit, 'Outfit', sans-serif);
          background: #fff;
          color: #1a1f2e;
          font-size: 10pt;
          line-height: 1.55;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .page {
          width: 210mm;
          min-height: 297mm;
          margin: 0 auto;
          padding: 14mm 16mm 14mm 16mm;
          background: #fff;
        }

        /* ── Header ──────────────────────────────── */
        .cv-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1.5px solid #c5d8f0;
          padding-bottom: 10px;
          margin-bottom: 14px;
          gap: 1rem;
        }
        .cv-name {
          font-size: 22pt;
          font-weight: 600;
          letter-spacing: -0.01em;
          background: linear-gradient(90deg, #6baed0 0%, #8aaac8 50%, #a78bfa 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1.1;
        }
        .cv-title {
          font-size: 10pt;
          color: #5a6a85;
          font-weight: 400;
          margin-top: 3px;
          letter-spacing: 0.01em;
        }
        .cv-contact {
          text-align: right;
          font-family: var(--font-fira-code, 'Fira Code', monospace);
          font-size: 7.5pt;
          color: #7a8ba0;
          line-height: 1.8;
          flex-shrink: 0;
        }
        .cv-contact a { color: #7a8ba0; text-decoration: none; }

        /* ── Section heading ─────────────────────── */
        .section-label {
          font-size: 6.5pt;
          font-family: var(--font-fira-code, 'Fira Code', monospace);
          text-transform: uppercase;
          letter-spacing: 0.13em;
          color: #8aaac8;
          margin-bottom: 7px;
          font-weight: 500;
        }
        .section {
          margin-bottom: 14px;
        }

        /* ── Profile ─────────────────────────────── */
        .profile-text {
          font-size: 9.5pt;
          color: #3a4a60;
          line-height: 1.65;
          max-width: 95%;
        }

        /* ── Skills grid ─────────────────────────── */
        .skills-grid {
          display: grid;
          grid-template-columns: 7.5rem 1fr;
          gap: 4px 10px;
          align-items: baseline;
        }
        .skill-category {
          font-size: 7.5pt;
          font-family: var(--font-fira-code, 'Fira Code', monospace);
          color: #7a8ba0;
          letter-spacing: 0.02em;
          padding-top: 2px;
        }
        .skill-items {
          font-size: 8.5pt;
          color: #2c3a50;
          line-height: 1.6;
        }
        .skill-dot {
          color: #c5d8f0;
          margin: 0 3px;
        }

        /* ── Experience ──────────────────────────── */
        .exp-entry {
          margin-bottom: 10px;
          page-break-inside: avoid;
        }
        .exp-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 0.5rem;
          margin-bottom: 2px;
        }
        .exp-role {
          font-size: 10pt;
          font-weight: 500;
          color: #1a1f2e;
          letter-spacing: -0.01em;
        }
        .exp-meta {
          font-family: var(--font-fira-code, 'Fira Code', monospace);
          font-size: 7pt;
          color: #8a9ab0;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .exp-org {
          font-size: 8.5pt;
          color: #5a7090;
          margin-bottom: 4px;
        }
        .exp-bullets {
          list-style: none;
          padding: 0;
        }
        .exp-bullets li {
          font-size: 8.5pt;
          color: #3a4a60;
          line-height: 1.6;
          padding-left: 10px;
          position: relative;
          margin-bottom: 1px;
        }
        .exp-bullets li::before {
          content: "–";
          position: absolute;
          left: 0;
          color: #8aaac8;
        }
        .exp-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 3px;
          margin-top: 4px;
        }
        .exp-tag {
          font-family: var(--font-fira-code, 'Fira Code', monospace);
          font-size: 6.5pt;
          padding: 1px 5px;
          border-radius: 2px;
          border: 1px solid #d4e5f5;
          color: #5a7090;
          background: #f4f8fc;
          letter-spacing: 0.01em;
        }

        /* ── Education ───────────────────────────── */
        .edu-entry {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 0.5rem;
          margin-bottom: 5px;
          page-break-inside: avoid;
        }
        .edu-left { flex: 1; }
        .edu-credential {
          font-size: 9pt;
          font-weight: 500;
          color: #1a1f2e;
        }
        .edu-institution {
          font-size: 8pt;
          color: #5a7090;
          margin-top: 1px;
        }
        .edu-note {
          font-size: 7.5pt;
          color: #8a9ab0;
          font-family: var(--font-fira-code, 'Fira Code', monospace);
          margin-top: 1px;
        }
        .edu-period {
          font-family: var(--font-fira-code, 'Fira Code', monospace);
          font-size: 7pt;
          color: #8a9ab0;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* ── Projects ────────────────────────────── */
        .projects-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
        }
        .project-entry {
          page-break-inside: avoid;
        }
        .project-title {
          font-size: 8.5pt;
          font-weight: 500;
          color: #1a1f2e;
          margin-bottom: 2px;
        }
        .project-desc {
          font-size: 8pt;
          color: #5a7090;
          line-height: 1.5;
        }

        /* ── Divider ─────────────────────────────── */
        .divider {
          border: none;
          border-top: 1px solid #e8f0f8;
          margin: 10px 0;
        }

        /* ── Two-column layout ───────────────────── */
        .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 24px;
        }

        /* ── Print ───────────────────────────────── */
        @media print {
          body { background: #fff !important; }
          .page { margin: 0; padding: 10mm 13mm; width: 100%; }
          @page { size: A4; margin: 0; }
        }

        /* ── Screen preview ──────────────────────── */
        @media screen {
          body { background: #e8edf5; }
          .page {
            margin: 2rem auto;
            box-shadow: 0 4px 40px rgba(100,140,180,0.15);
            border-radius: 4px;
          }
          .print-btn {
            display: block;
            text-align: center;
            padding: 0.75rem;
            background: transparent;
            font-family: var(--font-fira-code, 'Fira Code', monospace);
            font-size: 0.75rem;
            color: #7a8ba0;
            cursor: pointer;
            border: 1px solid #c5d8f0;
            border-radius: 4px;
            width: 210mm;
            margin: 0 auto 1rem;
            letter-spacing: 0.06em;
          }
          .print-btn:hover { background: #f4f8fc; }
        }
        @media print { .print-btn { display: none !important; } }
      `}</style>

      <button className="print-btn" onClick={() => window.print()}>
        ↓ &nbsp; save as pdf — cmd/ctrl + p → save as pdf
      </button>

      <div className="page">

        {/* ── Header ── */}
        <div className="cv-header">
          <div>
            <div className="cv-name">Smyrna V.</div>
            <div className="cv-title">Knowledge Engineering &amp; Unstructured Data</div>
          </div>
          <div className="cv-contact">
            <div><a href="mailto:smyrna.volzhevska@protonmail.com">smyrna.volzhevska@protonmail.com</a></div>
            <div><a href="https://www.linkedin.com/in/smyrna/" target="_blank" rel="noopener noreferrer">linkedin.com/in/smyrna</a></div>
            <div><a href="https://github.com/helloseyrin" target="_blank" rel="noopener noreferrer">github.com/helloseyrin</a></div>
            <div><a href="https://helloseyrin.dev" target="_blank" rel="noopener noreferrer">helloseyrin.dev</a></div>
            <div>Helsinki, Finland · GMT+3</div>
          </div>
        </div>

        {/* ── Profile ── */}
        <div className="section">
          <div className="section-label">Profile</div>
          <p className="profile-text">
            Knowledge engineer focused on unstructured data processing, NLP, and retrieval-augmented systems.
            Background in business analysis and UX design — I came to data engineering through the practical problem
            of navigating large document collections at work, which pulled me toward RAG and the full pipeline
            from ingestion to queryable knowledge bases. Currently building toward a Data Science &amp; AI specialisation
            with emphasis on NLP and semantic search.
          </p>
        </div>

        <hr className="divider" />

        {/* ── Skills ── */}
        <div className="section">
          <div className="section-label">Technical Skills</div>
          <div className="skills-grid">
            {skills.map(s => (
              <div key={s.name} style={{ display: "contents" }}>
                <div className="skill-category">{s.name}</div>
                <div className="skill-items">
                  {s.items.join("  ·  ")}
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="divider" />

        {/* ── Experience ── */}
        <div className="section">
          <div className="section-label">Experience</div>
          {experience.map(e => (
            <div key={e.role + e.org} className="exp-entry">
              <div className="exp-header">
                <span className="exp-role">{e.role}</span>
                <span className="exp-meta">{e.period} · {e.location}</span>
              </div>
              <div className="exp-org">{e.org}</div>
              <ul className="exp-bullets">
                {e.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
              <div className="exp-tags">
                {e.tags.map(t => <span key={t} className="exp-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>

        <hr className="divider" />

        {/* ── Projects + Education side by side ── */}
        <div className="two-col">

          {/* Projects */}
          <div className="section">
            <div className="section-label">Projects</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
              {projects.map(p => (
                <div key={p.title} className="project-entry">
                  <div className="project-title">{p.title}</div>
                  <div className="project-desc">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="section">
            <div className="section-label">Education</div>
            {education.map(e => (
              <div key={e.credential} className="edu-entry">
                <div className="edu-left">
                  <div className="edu-credential">{e.credential}</div>
                  <div className="edu-institution">{e.institution}</div>
                  {e.note && <div className="edu-note">{e.note}</div>}
                </div>
                <div className="edu-period">{e.period}</div>
              </div>
            ))}
          </div>

        </div>

        {/* ── Languages ── */}
        <hr className="divider" />
        <div className="section" style={{ marginBottom: 0 }}>
          <div className="section-label">Languages</div>
          <div className="skills-grid">
            <div style={{ display: "contents" }}>
              <div className="skill-category">Ukrainian</div>
              <div className="skill-items">Native</div>
            </div>
            <div style={{ display: "contents" }}>
              <div className="skill-category">English</div>
              <div className="skill-items">Full professional proficiency (C1/C2)</div>
            </div>
            <div style={{ display: "contents" }}>
              <div className="skill-category">Finnish</div>
              <div className="skill-items">Elementary (A2, ongoing)</div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
