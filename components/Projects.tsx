import Image from "next/image";
import Tag from "./Tag";
import { IconProjects } from "./GradientIcon";
import { statusStyle } from "@/lib/constants";
import { projects } from "@/lib/projects";

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
