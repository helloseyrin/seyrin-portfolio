"use client";

import { useState } from "react";
import { IconValues } from "./GradientIcon";

const acid = [
  { abbr: "A", term: "Atomicity",   def: "A transaction is indivisible — it either completes in full or the whole thing unwinds, as if it never started. A payment where the debit goes through but the credit doesn't would leave money genuinely unaccounted for, and at scale those half-states compound into serious integrity failures. I wrap multi-step operations in explicit transactions so any mid-process failure leaves the database exactly as it was.", color: "#8aaac8" },
  { abbr: "C", term: "Consistency", def: "Every transaction has to leave the database in a valid state — constraints, foreign keys, business rules all enforced, every time. Inventory showing stock as both available and sold, or a user record pointing to a deleted account, creates real downstream failures: wrong orders shipped, broken reports, billing errors. I encode those rules at the schema level rather than trusting application code to remember them.", color: "#8aaac8" },
  { abbr: "I", term: "Isolation",   def: "Concurrent transactions should produce the same result as if they'd run one after another, even when they're happening simultaneously. Two people booking the last seat on a flight at the same time — without proper isolation, both get confirmations. I think through isolation levels deliberately when building pipelines that touch shared data, rather than leaving it to whatever the default is.", color: "#8aaac8" },
  { abbr: "D", term: "Durability",  def: "Committed means committed — a confirmed transaction survives crashes, power loss, and restarts. A payment confirmation that vanishes on server restart isn't just a bug, it's a trust breach. I don't treat in-flight or queued writes as done until they've actually been committed to disk.", color: "#8aaac8" },
];

const base = [
  { abbr: "BA", term: "Basically Available",  def: "The system stays responsive even when parts of it are down, accepting that some responses might be slightly stale. A social feed showing posts from 30 seconds ago is fine; a hospital system showing yesterday's medication records is a different matter entirely. I use this model where staleness is genuinely acceptable and I'm explicit about where it isn't.", color: "#a78bfa" },
  { abbr: "S",  term: "Soft state",           def: "Nodes in a distributed system are allowed to temporarily disagree — consistency is something the system works toward over time rather than enforcing at every instant. A shopping cart that shows different counts across devices for a few seconds is recoverable; an account balance doing the same is a compliance issue. I design with drift in mind and build logic that handles it rather than assuming it away.", color: "#a78bfa" },
  { abbr: "E",  term: "Eventually consistent", def: "All nodes will converge to the same value given enough time and no new writes — DNS propagation is a familiar real-world example, where your domain update goes live in some parts of the world before others. I use this model for caches, search indices, and read replicas where a brief lag is acceptable, and I'm deliberate about identifying the parts of a system where it isn't.", color: "#a78bfa" },
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
    body: "Every design decision has downstream effects on people and the planet — accounting for those is part of the job, not a bonus consideration. I inform the systems I contribute to with the goal of improving actual reality, not bending it toward a product owner's growth metrics.",
  },
  {
    title: "Design for Longevity",
    body: "Software that outlasts its authors requires deliberate choices: open standards, clear documentation, modularity over clever shortcuts. The real-world cost of throwaway code is accumulated technical debt that eventually falls on whoever can least afford to deal with it. I favour solutions that can be understood and extended by whoever inherits them.",
  },
  {
    title: "Against Disposability",
    body: "Designing products to fail prematurely — or restricting repair to force replacement — externalises the environmental and financial cost onto users and the planet. In software this shows up as forced upgrades, dropped support for functional hardware, and locked ecosystems. Users should have the legal right and practical ability to repair what they own.",
  },
  {
    title: "Digital Sovereignty",
    body: "Nations, organisations, and individuals should control their own digital destiny — their data, infrastructure, and software — not rent access to it from a handful of foreign corporations.",
  },
  {
    title: "Algorithmic Autonomy",
    body: "Algorithms shape the digital reality we inhabit online, which means they actively shape our views and beliefs. A feed optimised for engagement will always drift toward outrage and tribalism because those generate the most clicks. I don't build systems that optimise for attention capture, and I think opting out of algorithmic curation should be a default right.",
  },
  {
    title: "Human-in-the-Loop",
    body: "Only a human knows their immediate needs and lived reality — we read context instantly and intuit what isn't said. Delegating executive decisions to systems without that grounding produces outcomes that are technically optimised and humanly catastrophic. Until a machine actually inhabits experience rather than modelling it, the final call stays with a person.",
  },
  {
    title: "Privacy by Design",
    body: "Privacy is a constraint you design around from the start. In practice: local-first, data minimisation, encryption as default — your data stays on your device unless there's a specific consented reason for it to leave. Most applications that insist on the cloud do so because your data is the product.",
  },
  {
    title: "Right to Lifelong Learning",
    body: "Access to education shouldn't be gated by geography, income, or credential — knowledge compounds, and locking people out of it locks them out of everything downstream. I share what I learn in the open.",
  },
  {
    title: "Open Source Initiative",
    body: "The best infrastructure is infrastructure everyone can inspect, modify, and own. Closed systems that communities depend on are a single point of failure — political, commercial, and technical.",
  },
  {
    title: "Intentional Building",
    body: "The industry has a name for building things primarily because they look good on a CV — Resume-Driven Development. I try to work the other way around: start with a problem that genuinely exists, validate that it matters to someone other than me, and only then ask whether software is actually the right solution. YAGNI and problem-solution fit aren't just engineering principles — they're an argument against software that doesn't need to exist.",
  },
  {
    title: "#QuitGPT",
    titleHref: "https://quitgpt.org",
    body: "None of my projects use or integrate OpenAI products.",
    callout: "I do not use, recommend, or integrate OpenAI API or ChatGPT and associated products.",
  },
  {
    title: "EuroStack",
    body: "I support the shift away from dependency on American tech platforms toward European-based alternatives. In my own work and tooling I choose European providers where suitable options exist.",
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
