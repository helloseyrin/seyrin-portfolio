import Image from "next/image";
import Link from "next/link";
import Tag from "./Tag";
import { IconEntries } from "./GradientIcon";
import type { EntryMeta } from "@/lib/entries";

export default function EntriesList({ entries }: { entries: EntryMeta[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <IconEntries />
          Entries
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
          Personal essays on learning, systems, and life.
        </p>
      </div>

      {entries.length === 0 ? (
        <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>No entries yet.</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 20rem), 1fr))",
          gap: "var(--space-2)",
        }}>
          {entries.map((entry) => (
            <EntryCard key={entry.slug} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}

function EntryCard({ entry }: { entry: EntryMeta }) {
  const dateFormatted = new Date(entry.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link href={`/entries/${entry.slug}`} style={{ textDecoration: "none" }}>
      <article className="project-card entry-card" style={{ padding: 0, overflow: "hidden", height: "100%", display: "flex", flexDirection: "column" }}>

        {/* Cover */}
        <div style={{ position: "relative", width: "100%", height: "9rem", overflow: "hidden", flexShrink: 0 }}>
          {entry.cover ? (
            <Image src={entry.cover} alt={entry.title} fill style={{ objectFit: "cover" }} />
          ) : (
            <div style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, rgba(109,40,217,0.55) 0%, rgba(167,139,250,0.45) 45%, rgba(137,196,225,0.4) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              {/* Decorative text as placeholder visual */}
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                userSelect: "none",
              }}>
                {entry.tags[0] ?? "entry"}
              </span>
            </div>
          )}
          {/* Fade-to-card gradient at bottom */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, rgba(240,246,252,0.7) 100%)" }} />
        </div>

        {/* Body */}
        <div style={{ padding: "var(--space-2) var(--space-3) var(--space-3)", display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
            {entry.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
          </div>

          {/* Title */}
          <p style={{
            fontWeight: 600,
            fontSize: "0.9375rem",
            color: "var(--text-primary)",
            lineHeight: 1.3,
            letterSpacing: "-0.015em",
            marginTop: "0.1rem",
          }}>
            {entry.title}
          </p>

          {/* Subheading */}
          <p style={{
            fontSize: "0.8125rem",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            flex: 1,
          }}>
            {entry.subheading}
          </p>

          {/* Metadata */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.72rem",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.01em",
            marginTop: "0.25rem",
          }}>
            <span>{dateFormatted}</span>
            <span style={{ opacity: 0.35 }}>·</span>
            <span>{entry.readingTime} min read</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
