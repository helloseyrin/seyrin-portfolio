import ChaoSticker from "@/components/ChaoSticker";

export default function AboutPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)", maxWidth: "42rem" }}>

      {/* Header + chao */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem" }}>
        <ChaoSticker />
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
          <h1>About</h1>
          <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>The human behind the stack.</p>
          <p style={{
            marginTop: "0.75rem",
            fontSize: "0.8125rem",
            color: "var(--text-secondary)",
            fontStyle: "italic",
            fontFamily: "'Fira Code', var(--font-mono)",
            lineHeight: 1.6,
            maxWidth: "26rem",
          }}>
            "A carbon-based life form for carb-to-code operations to ensure delivering actionable insights and maximising stakeholder engagement"
          </p>
        </div>
      </div>

      {/* Sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {[
          {
            label: "the non-cv part",
            text: "I'm DMing my first D&D campaign and it is going okay I think. I paint sometimes, sing sometimes, take way too many notes always. Big fan of museums, conceptual cafes, and places that feel like they exist slightly outside of normal time.",
          },
          {
            label: "things i think about too much",
            text: "Cognition. How information moves and mutates. Liminal spaces — the kind where disciplines blur and nobody's really sure whose job it is yet. That's also kind of why I ended up in data, I think. It sits right at that edge.",
          },
          {
            label: "how i got into this",
            text: "I came from business analysis and UX, did some translation work, moved around a lot. At some point I realised the part I kept caring about was always the data layer — why systems fail, where information gets lost or distorted, what you'd actually need to fix it. So here I am.",
          },
          {
            label: "what i'm trying to do",
            text: "Build things I'm not embarrassed by. Ideally things that are useful outside of a quarterly report — environmental data pipelines, conservation infrastructure, that kind of thing. I don't have it all figured out but I have strong opinions about not feeding the machine for free.",
          },
        ].map(({ label, text }) => (
          <div
            key={label}
            style={{
              borderLeft: "2px solid var(--border-hover)",
              paddingLeft: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <p style={{
              fontSize: "0.7rem",
              fontFamily: "var(--font-mono)",
              color: "var(--text-muted)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}>
              {label}
            </p>
            <p style={{
              fontSize: "0.9375rem",
              color: "var(--text-secondary)",
              lineHeight: 1.8,
            }}>
              {text}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
