import Image from "next/image";
import Tag from "./Tag";
import { IconProjects } from "./GradientIcon";
import { statusStyle } from "@/lib/constants";

const projects = [
  {
    title: "Anima Mundi // Obsidian PKM",
    desc: "Self-organising Personal Knowledge Management System. Semantic search across clipped articles, videos, PDFs, GitHub repos, and links.",
    tags: ["Python", "ChromaDB", "NLP", "embeddings", "fastembed"],
    href: "https://github.com/helloseyrin/anima-mundi",
    status: "Active",
    cover: "/project-anima-mundi.jpg",
    coverPosition: "center 40%",
  },
  {
    title: "Sensor Drift // IoT Conservation",
    desc: "Pipeline for ingesting and anomaly-detecting wildlife sensor streams. Time-series analysis on environmental monitoring data.",
    tags: ["Python", "PostgreSQL", "IoT", "time-series"],
    href: "#",
    status: "Planning",
    cover: "/cover-spheres.jpg",
    coverPosition: "center 50%",
  },
  {
    title: "Lexis // Text Classifier",
    desc: "Fine-tuned transformer pipeline for multi-label document classification. Built for low-resource domain adaptation.",
    tags: ["HuggingFace", "spaCy", "PyTorch", "NLP"],
    href: "#",
    status: "In progress",
    cover: "/cover-aero.jpg",
    coverPosition: "center 60%",
  },
  {
    title: "Strata // Data Pipeline",
    desc: "Modular ELT pipeline with schema inference, lineage tracking, and incremental loading. Designed for reproducibility.",
    tags: ["Python", "Docker", "PostgreSQL", "dbt"],
    href: "#",
    status: "In progress",
    cover: "/cover-flow.jpg",
    coverPosition: "center 40%",
  },
  {
    title: "Meridian // Embedding Explorer",
    desc: "Interactive visualisation of high-dimensional embedding spaces. Dimensionality reduction with UMAP and clustering overlays.",
    tags: ["Python", "UMAP", "ChromaDB", "fastembed"],
    href: "#",
    status: "Planning",
    cover: "/cover-wave.jpg",
    coverPosition: "center 50%",
  },
  {
    title: "Aqua // Predictive Modeling",
    desc: "Ensemble models for ecological risk prediction. Feature engineering on satellite and sensor data for conservation outcomes.",
    tags: ["scikit-learn", "pandas", "NumPy", "ML"],
    href: "#",
    status: "Planning",
    cover: "/cover-deep.jpg",
    coverPosition: "center 30%",
  },
];

export default function Projects() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <IconProjects />
            Projects
          </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Things I&apos;ve built and am building.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 22rem), 1fr))", gap: "var(--space-2)" }}>
        {projects.map((p) => {
          const s = statusStyle[p.status] ?? statusStyle["Planning"];
          return (
            <a
              key={p.title}
              href={p.href}
              target={p.href !== "#" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="project-card"
              style={{ padding: 0, overflow: "hidden" }}
            >
              {/* Cover */}
              <div style={{ position: "relative", width: "100%", height: "10rem", overflow: "hidden" }}>
                <Image src={p.cover} alt={p.title} fill style={{ objectFit: "cover", objectPosition: p.coverPosition }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 25%, rgba(240,246,252,0.85) 100%)" }} />
                <span style={{
                  position: "absolute", top: "0.75rem", right: "0.75rem",
                  fontSize: "0.6rem", fontFamily: "var(--font-mono)", fontWeight: 500,
                  padding: "0.2em 0.65em", borderRadius: "0.2rem",
                  background: s.bg, color: s.color, border: `1px solid ${s.border}`,
                  backdropFilter: "blur(8px)", letterSpacing: "0.06em", textTransform: "uppercase",
                }}>
                  {p.status}
                </span>
              </div>

              {/* Body */}
              <div style={{ padding: "var(--space-2) var(--space-3) var(--space-3)" }}>
                <p style={{ fontWeight: 500, color: "var(--text-primary)", fontSize: "0.9375rem", marginBottom: "0.4rem" }}>{p.title}</p>
                <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "var(--space-2)" }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                  {p.tags.map((t) => <Tag key={t}>{t}</Tag>)}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
