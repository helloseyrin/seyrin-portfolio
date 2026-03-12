"use client";

export default function Hero() {
  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>

      {/* Decorative vertical lines — water-toned */}
      {[
        { left: "8%",  height: "3.5rem" },
        { left: "20%", height: "1.5rem" },
        { left: "35%", height: "3.5rem" },
        { left: "55%", height: "5rem"   },
        { left: "70%", height: "3rem"   },
        { left: "85%", height: "2rem"   },
      ].map((line, i) => (
        <div key={i} style={{
          position: "absolute",
          left: line.left,
          top: "-5rem",
          width: "1px",
          height: line.height,
          borderRadius: "9999px",
          background: "linear-gradient(to bottom, var(--border-hover), var(--border), transparent)",
          opacity: 0.5,
        }} />
      ))}

      {/* Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

        {/* H1 + H2 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <h1 style={{ fontSize: "3rem", fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.1 }}>
            Hey, I&apos;m Smyrna
          </h1>
          <h2 style={{ fontSize: "2.25rem", fontWeight: 400, color: "var(--text-muted)", lineHeight: 1.2 }}>
            Data & ML Engineer
          </h2>
        </div>

        {/* Email CTA card — styled like reference's social card */}
        <a href="mailto:smyrna.volzhevska@protonmail.com" style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "0.875rem 1.25rem",
          borderRadius: "0.75rem",
          border: "1px solid var(--border)",
          background: "linear-gradient(135deg, var(--bg-card), var(--bg-hover))",
          textDecoration: "none",
          transition: "box-shadow 0.2s, border-color 0.2s",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          <p style={{ flex: 1, fontSize: "0.875rem", fontWeight: 400, color: "var(--text-primary)" }}>
            smyrna.volzhevska@protonmail.com
          </p>
          <span style={{ fontSize: "0.75rem", padding: "0.25rem 0.75rem", borderRadius: "9999px", background: "var(--bg-hover)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontWeight: 400 }}>
            Say hi
          </span>
        </a>

        {/* Body */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", color: "var(--text-secondary)", fontSize: "0.9375rem", lineHeight: 1.7 }}>
          <p>
            Student at{" "}
            <a href="https://turingcollege.com" target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--text-primary)", textDecoration: "underline", padding: "0 0.15em", borderRadius: "3px" }}>
              Turing College
            </a>{" "}
            studying Data Science & AI.
          </p>
          <p>Building ML engineering skills — NLP, embedding models, vectorization, predictive modeling.</p>
          <p>Interested in data systems for conservation: IoT and sensor data.</p>
        </div>

        {/* Featured project card — placeholder structure */}
        <a href="/projects" style={{
          display: "block",
          borderRadius: "0.75rem",
          border: "1px solid var(--border)",
          overflow: "hidden",
          textDecoration: "none",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.08)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            {/* Placeholder image area */}
            <div style={{ width: "10rem", flexShrink: 0, background: "var(--bg-deep)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--border-hover)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            </div>
            <div style={{ flex: 1, padding: "1.25rem 1.5rem", background: "var(--bg-card)", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "0.5rem" }}>
              <div>
                <p style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "0.4rem" }}>Featured project</p>
                <p style={{ fontSize: "1rem", fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.3 }}>Anima Mundi // Obsidian PKM</p>
                <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", marginTop: "0.4rem", lineHeight: 1.6 }}>
                  Self-organising PKM with semantic search across articles, videos, PDFs, and repos.
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                <span>View project</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </div>
            </div>
          </div>
        </a>

      </div>
    </div>
  );
}
