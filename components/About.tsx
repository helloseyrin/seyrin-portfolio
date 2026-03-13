"use client";

import ChaoSticker from "@/components/ChaoSticker";
import Editable from "@/components/Editable";
import { useEdit } from "@/contexts/EditContext";
import { IconAbout } from "@/components/GradientIcon";

export default function About() {
  const { data } = useEdit();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)", maxWidth: "42rem" }}>

      {/* Header + chao */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem" }}>
        <ChaoSticker />
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
          <h1 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <IconAbout />
              About
            </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>The human behind the stack.</p>
          <p style={{
            marginTop: "0.75rem",
            fontSize: "0.8125rem",
            color: "var(--text-secondary)",
            fontStyle: "italic",
            fontFamily: "var(--font-mono)",
            lineHeight: 1.6,
            maxWidth: "26rem",
          }}>
            &ldquo;A carbon-based life form for carb-to-code operations to ensure delivering actionable insights and maximising stakeholder engagement&rdquo;
          </p>
        </div>
      </div>

      {/* Sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {data.about.sections.map((section) => (
          <div
            key={section.id}
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
              {section.label}
            </p>
            <Editable
              file="about"
              path={`sections[id=${section.id}].text`}
              tag="p"
              multiline
              style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.8 }}
            />
          </div>
        ))}
      </div>

    </div>
  );
}
