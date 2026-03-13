"use client";

import { useState } from "react";
import { IconValues } from "./GradientIcon";

const acid = [
  { abbr: "A", term: "Atomicity",   def: "Think of a transaction as a single indivisible action — even if it involves dozens of steps under the hood, the database treats it as one thing that either happened or didn't. A bank transfer is the textbook example: the debit and the credit are bound together, and if anything goes wrong between them, the whole thing unwinds. I wrap multi-step operations in explicit transactions for exactly this reason.", color: "#8aaac8" },
  { abbr: "C", term: "Consistency", def: "The database has rules baked into it — constraints, foreign keys, business logic encoded at the schema level — and every transaction has to leave things in a state that respects all of them. A transaction that would produce broken or contradictory data simply won't be allowed to complete. I define these rules in the schema itself rather than trusting application code to enforce them every time.", color: "#8aaac8" },
  { abbr: "I", term: "Isolation",   def: "When multiple transactions are running at the same time, they need to stay out of each other's way — the end result should be identical to what you'd get if they'd run one after another. In practice, databases offer different isolation levels as a tradeoff between strictness and performance. When building pipelines that write to shared tables, isolation levels are something I think through deliberately rather than leaving to defaults.", color: "#8aaac8" },
  { abbr: "D", term: "Durability",  def: "A committed transaction is a committed transaction, even if the server crashes seconds after the confirmation comes back. Most databases handle this through write-ahead logging — the record of what happened is written to disk before the operation is considered done. I treat a write as confirmed only once it's actually been committed, rather than assuming an in-flight operation will land.", color: "#8aaac8" },
];

const base = [
  { abbr: "BA", term: "Basically Available",  def: "Distributed systems have to make tradeoffs, and BASE systems choose to stay responsive over staying perfectly accurate. When part of the system goes down, you still get a response — it might reflect a slightly older state of the world, but it's there. For read-heavy workloads where a few seconds of staleness is acceptable, this is often the right call.", color: "#a78bfa" },
  { abbr: "S",  term: "Soft state",           def: "In a distributed system, different nodes can temporarily show different versions of the same data — and that's considered acceptable. Consistency is something the system works toward continuously rather than enforcing at every instant. I design with the expectation that state drifts and build logic that can handle disagreement between nodes gracefully.", color: "#a78bfa" },
  { abbr: "E",  term: "Eventually consistent", def: "The guarantee is that if you stop writing and wait long enough, every node in the system will end up showing the same value. It says nothing about when — just that it will happen. I use this model for caches, search indices, and read replicas where a brief lag is fine, and I'm deliberate about identifying the places in a system where it isn't.", color: "#a78bfa" },
];

function PrincipleChip({ abbr, term, def, color }: { abbr: string; term: string; def: string; color: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        className="card"
        style={{
          padding: "0.75rem 1.1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.25rem",
          cursor: "default",
          minWidth: "4rem",
          transition: "border-color 0.2s, background 0.2s",
          ...(open ? {
            borderColor: "rgba(99, 170, 255, 0.4)",
            background: "rgba(255,255,255,0.32)",
          } : {}),
        }}
      >
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "1.5rem",
          fontWeight: 600,
          color,
          letterSpacing: "0.04em",
          lineHeight: 1,
        }}>{abbr}</span>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem",
          color: "var(--text-dim)",
          letterSpacing: "0.04em",
          whiteSpace: "nowrap",
        }}>{term}</span>
      </div>

      {open && (
        <div style={{
          position: "absolute",
          bottom: "calc(100% + 0.5rem)",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
          minWidth: "18rem",
          maxWidth: "28rem",
          borderRadius: "0.75rem",
          border: "1px solid rgba(99, 170, 255, 0.4)",
          background: "linear-gradient(135deg, rgba(14, 60, 140, 0.12) 0%, rgba(7, 30, 90, 0.18) 100%)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          padding: "0.875rem 1rem",
          animationName: "fade-down",
          animationDuration: "0.18s",
          animationTimingFunction: "ease",
          animationFillMode: "both",
        }}>
          <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#2563eb", marginBottom: "0.4rem" }}>{term}</p>
          <p style={{ fontSize: "0.8125rem", lineHeight: 1.65, color: "var(--text-secondary)" }}>{def}</p>
        </div>
      )}
    </div>
  );
}

const values = [
  {
    title: "Responsible Design & Development",
    body: "Integrating sustainability, inclusivity, and social responsibility into the full lifecycle of what you build — accounting for downstream effects on people and the planet, not just the immediate deliverable. I avoid technologies and patterns that extract value at the expense of communities or the environment, and favour longevity and modularity over disposability.",
  },
  {
    title: "Design for Longevity",
    body: "In software, longevity means writing systems and interfaces that outlast their original authors — maintainable, documented, built on open standards rather than proprietary lock-in. The opposite of throwaway code. I favour solutions that can be understood, modified, and extended by whoever inherits them.",
  },
  {
    title: "Right to Repair",
    body: "Users and independent technicians should have the legal right and practical ability to repair the devices and software they own — with access to parts, documentation, and tools. Manufacturer-enforced obsolescence through repair restriction is both an environmental and a justice issue.",
  },
  {
    title: "Against Planned Obsolescence",
    body: "Deliberately designing products to fail, degrade, or become incompatible is an extraction strategy — extracting money, extracting materials, and externalising the environmental cost onto everyone else. In software it shows up as forced upgrades, dropped support for functional hardware, and dark patterns that push users toward paid tiers.",
  },
  {
    title: "Digital Sovereignty",
    body: "Nations, organisations, and individuals should control their own digital destiny — their data, infrastructure, and software — not rent access to it from a handful of foreign corporations.",
  },
  {
    title: "Algorithmic Autonomy",
    body: "Algorithms don't just surface content — they construct the version of reality you inhabit online. You should have the right to understand how that works and, crucially, to turn it off. Chronological feeds, no recommendation engines, no engagement-maximising loops — the choice should be yours. I don't build systems that optimise for attention capture.",
  },
  {
    title: "Human-in-the-Loop",
    body: "No matter how capable a system becomes — quantum, superintelligent, whatever comes next — only a human knows their immediate needs and lived reality. We read context instantly, intuit what isn't said, and adjust to the texture of a situation that no model has actually inhabited. Until a machine is precisely empathetic with that experience — not just simulating it — it has no business making judgement calls or executive decisions on someone's behalf.",
  },
  {
    title: "Privacy by Design",
    body: "Privacy is not a feature you bolt on at the end — it is a constraint you design around from the start. That means data minimisation, no collection of what you don't need, and encryption as a default. It also means local-first: your data should live on your device unless there is a specific, consented reason for it to leave. The cloud is someone else's computer, and most applications have no compelling reason to insist on being there.",
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
    callout: "I do not use, recommend, or integrate OpenAI API or ChatGPT and associated products.",
  },
  {
    title: "EuroStack",
    body: "The transition away from dependence on American tech giants to European-based service providers — for infrastructure, tooling, and data.",
  },
];

export default function Values() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <IconValues />
            Values
          </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>What guides how I build and why.</p>
      </div>

      {/* Quote card */}
      <div style={{
        borderLeft: "2px solid var(--border-hover)",
        paddingLeft: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}>
        <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.75, fontStyle: "italic" }}>
          "A computer can never be held accountable, therefore a computer must never make a management decision."
        </p>
        <p style={{ fontSize: "0.75rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
          IBM training manual, 1979
        </p>
        <p style={{ fontSize: "0.8rem", color: "var(--text-dim)", lineHeight: 1.6, marginTop: "0.25rem" }}>
          Cautionary tale:{" "}
          <a
            href="https://www.ft.com/content/934cc94b-32c4-497e-9718-d87d6a7835ca"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--text-secondary)", textDecoration: "none", borderBottom: "1px solid rgba(137,196,225,0.25)" }}
          >
            Deloitte issues refund for error-ridden Australian government report that used AI
          </a>
          {" "}— FT, Oct 2025
        </p>
      </div>

      {/* Ethics & commitments label + pills */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-secondary)" }}>
            Ethics & commitments
          </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "flex-start" }}>
        {values.map((v, i) => {
          const isOpen = active === v.title;
          return (
            <div
              key={v.title}
              onMouseEnter={() => setActive(v.title)}
              onMouseLeave={() => setActive(null)}
              style={{
                position: "relative",
                animationName: "fade-up",
                animationDuration: "0.4s",
                animationTimingFunction: "ease",
                animationFillMode: "both",
                animationDelay: `${i * 0.07}s`,
                borderRadius: "9999px",
                border: isOpen
                  ? "1px solid rgba(99, 170, 255, 0.4)"
                  : "1px solid rgba(99, 130, 200, 0.35)",
                background: isOpen
                  ? "linear-gradient(135deg, rgba(14, 60, 140, 0.12) 0%, rgba(7, 30, 90, 0.18) 100%)"
                  : "transparent",
                padding: "0.35em 1em",
                cursor: "default",
                width: "fit-content",
                transition: "background 0.2s ease, border-color 0.2s ease",
                ...(isOpen ? {
                  animationName: "neuron-fire",
                  animationDuration: "0.7s",
                  animationTimingFunction: "ease-out",
                  animationIterationCount: "1",
                  animationFillMode: "forwards",
                } : {}),
                zIndex: isOpen ? 10 : undefined,
              }}
            >
              {"titleHref" in v && v.titleHref ? (
                <a
                  href={v.titleHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: isOpen ? "#2563eb" : "var(--text-secondary)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {v.title}
                </a>
              ) : (
                <p style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: isOpen ? "#2563eb" : "var(--text-secondary)",
                  transition: "color 0.2s ease",
                  whiteSpace: "nowrap",
                }}>
                  {v.title}
                </p>
              )}

              {/* Expanded card — absolutely positioned, never affects flex layout */}
              {isOpen && (
                <div style={{
                  position: "absolute",
                  top: "calc(100% + 0.5rem)",
                  left: 0,
                  zIndex: 20,
                  minWidth: "18rem",
                  maxWidth: "28rem",
                  borderRadius: "0.75rem",
                  border: "1px solid rgba(99, 170, 255, 0.4)",
                  background: "linear-gradient(135deg, rgba(14, 60, 140, 0.12) 0%, rgba(7, 30, 90, 0.18) 100%)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  padding: "0.875rem 1rem",
                  animationName: "fade-up",
                  animationDuration: "0.18s",
                  animationTimingFunction: "ease",
                  animationFillMode: "both",
                }}>
                  <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#2563eb", marginBottom: "0.4rem" }}>
                    {v.title}
                  </p>
                  <p style={{ fontSize: "0.8125rem", lineHeight: 1.65, color: "var(--text-secondary)" }}>
                    {v.body}
                  </p>
                  {"callout" in v && v.callout && (
                    <p style={{ marginTop: "0.5rem", fontSize: "0.8rem", lineHeight: 1.6, color: "var(--text-muted)", fontStyle: "italic" }}>
                      {v.callout}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
        </div>
      </div>

      {/* Developing principles — ACID */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-secondary)" }}>
            Developing principles
          </p>
          <p style={{ fontSize: "0.8rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
            borrowed from database theory, applied to everything else
          </p>
        </div>
        {/* ACID */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "var(--text-dim)", letterSpacing: "0.1em", textTransform: "uppercase" }}>ACID — transactional systems</span>
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            {acid.map(p => <PrincipleChip key={p.term} {...p} />)}
          </div>
        </div>

        {/* BASE */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "var(--text-dim)", letterSpacing: "0.1em", textTransform: "uppercase" }}>BASE — distributed systems</span>
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            {base.map(p => <PrincipleChip key={p.term} {...p} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
