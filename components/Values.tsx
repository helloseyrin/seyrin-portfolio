const values = [
  {
    title: "Responsible Design & Development",
    body: "Technology shapes behaviour at scale. Every design choice carries moral weight — I build with that in mind.",
  },
  {
    title: "Digital Sovereignty",
    body: "Nations, organisations, and individuals should control their own digital destiny — their data, infrastructure, and software — not rent access to it from a handful of corporations.",
  },
  {
    title: "Algorithmic Transparency",
    body: "If a system makes decisions that affect people, those people deserve to understand how. Black boxes are not neutral — they are a choice to obscure power.",
  },
  {
    title: "Human-in-the-Loop",
    body: "Automation should augment human judgment, not replace it. Especially where the stakes are high.",
  },
  {
    title: "Privacy by Design",
    body: "Privacy is not a feature you bolt on at the end. It is a constraint you design around from the start.",
  },
  {
    title: "Right to Lifelong Learning",
    body: "Access to education and skill development should not be gated by geography, income, or credential. I build in the open and share what I learn.",
  },
  {
    title: "Open Source Initiative",
    body: "The best infrastructure is infrastructure everyone can inspect, improve, and own.",
  },
  {
    title: "#QuitGPT",
    titleHref: "https://quitgpt.org",
    body: "None of my projects use or integrate OpenAI products.",
    callout: {
      type: "strong" as const,
      text: "I do not use, recommend, or integrate OpenAI API or ChatGPT and associated products.",
      href: undefined,
    },
  },
];

export default function Values() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        <h1>Values</h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>What guides how I build and why.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 22rem), 1fr))", gap: "var(--space-2)" }}>
        {values.map((v) => (
          <div key={v.title} className="card" style={{ padding: "var(--space-3)" }}>
            {"titleHref" in v && v.titleHref
              ? <a href={v.titleHref} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--text-accent)", marginBottom: "var(--space-1)", display: "block", textDecoration: "underline" }}>{v.title}</a>
              : <p style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--text-accent)", marginBottom: "var(--space-1)" }}>{v.title}</p>
            }
            <p style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "var(--text-secondary)" }}>{v.body}</p>
            {v.callout && (
              <div className={v.callout.type === "strong" ? "callout-warning" : "callout"}>
                {v.callout.href
                  ? <a href={v.callout.href} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>{v.callout.text}</a>
                  : v.callout.text
                }
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
