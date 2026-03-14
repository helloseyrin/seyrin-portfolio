import { getEntry, getAllEntries } from "@/lib/entries";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import Tag from "@/components/Tag";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getAllEntries().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) return {};
  return {
    title: `${entry.title} | Smyrna V.`,
    description: entry.subheading,
  };
}

export default async function EntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) notFound();

  const dateFormatted = new Date(entry.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article style={{ maxWidth: "44rem" }}>
      {/* Back link */}
      <Link
        href="/entries"
        className="back-link"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.375rem",
          fontSize: "0.8125rem",
          color: "var(--text-muted)",
          textDecoration: "none",
          marginBottom: "2.5rem",
          fontFamily: "var(--font-mono)",
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        entries/
      </Link>

      {/* Header */}
      <header style={{ marginBottom: "2.5rem" }}>
        {/* Mono meta */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.625rem",
          marginBottom: "1rem",
          fontSize: "0.72rem",
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.01em",
        }}>
          <span>{dateFormatted}</span>
          <span style={{ opacity: 0.35 }}>·</span>
          <span>{entry.readingTime} min read</span>
        </div>

        <h1 style={{
          fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
          fontWeight: 600,
          lineHeight: 1.2,
          marginBottom: "0.875rem",
          color: "var(--text-primary)",
          letterSpacing: "-0.02em",
        }}>
          {entry.title}
        </h1>

        <p style={{
          fontSize: "1rem",
          color: "var(--text-secondary)",
          lineHeight: 1.65,
          marginBottom: "1.25rem",
        }}>
          {entry.subheading}
        </p>

        {/* Tags — using the shared tag-pill system */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
          {entry.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
      </header>

      {/* Notebook body */}
      <div className="entry-notebook">
        {/* File header bar */}
        <div className="entry-notebook-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          <span>{slug}.mdx</span>
          <span style={{ marginLeft: "auto", opacity: 0.5 }}>// personal notes</span>
        </div>

        {/* Ruled prose area */}
        <div className="entry-prose">
          <MDXRemote source={entry.content} />
        </div>
      </div>
    </article>
  );
}
