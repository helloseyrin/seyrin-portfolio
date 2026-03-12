const education = [
  {
    institution: "Turing College",
    credential: "Data Science & AI",
    period: "Starting Apr 2026",
    desc: "Covers data wrangling, statistical inference, supervised & unsupervised ML, NLP, and computer vision. Specialisations in NLP (BERT, text classification, NER) and CV (CNNs, image segmentation).",
    type: "Programme",
    tags: ["Python", "SQL", "Pandas", "NumPy", "scikit-learn", "PyTorch", "XGBoost", "NLP", "BERT", "Computer Vision", "OpenCV", "Statistical Inference", "A/B Testing", "RAG"],
  },
  {
    institution: "Aalto University",
    credential: "Open University — Entrepreneurship Law",
    period: "Oct 2025 – Dec 2025",
    desc: "Legal opportunities and challenges for entrepreneurs in Finland, with introduction to taxation law.",
    type: "Course",
  },
  {
    institution: "Aalto University",
    credential: "Open University — Forests, Wood and Carbon",
    period: "Apr 2024 – Jun 2024",
    desc: "Role of forests and wood in the carbon cycle and bioeconomy. Sustainable forestry, wood properties, carbon storage, and life-cycle analysis of wood in construction.",
    type: "Course",
  },
  {
    institution: "Omnia",
    credential: "Yrittäjyyden opinnot (JOTPA)",
    period: "Jun 2024 – Aug 2024",
    desc: "Entrepreneurship studies for Ukrainian professionals in Finland.",
    type: "Certificate",
  },
  {
    institution: "The Open University",
    credential: "Design & Innovation",
    period: "May 2022 – Mar 2024",
    desc: "Interrupted Studies.",
    type: "Degree",
  },
  {
    institution: "Musik og Teaterhøjskolen, Toftlund",
    credential: "Højskolebevis — Performance Arts",
    period: "Jan 2020 – Jun 2020",
    desc: "Vocal & Dance line.",
    type: "Certificate",
  },
];

import Tag from "./Tag";
import { IconEducation } from "./GradientIcon";

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  Programme:   { bg: "rgba(37, 99, 235, 0.1)",   text: "#2563eb", border: "rgba(37, 99, 235, 0.25)"  },
  Course:      { bg: "rgba(71, 168, 189, 0.12)",  text: "#2a9db5", border: "rgba(71, 168, 189, 0.3)" },
  Certificate: { bg: "rgba(126, 207, 239, 0.12)", text: "#4a9ebe", border: "rgba(126, 207, 239, 0.4)"},
  Degree:      { bg: "rgba(100, 100, 120, 0.08)", text: "#71717a", border: "rgba(100,100,120,0.2)"   },
};

export default function Education() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <IconEducation />
            Education
          </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Institutions, programmes, and courses.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
        {education.map((e, idx) => {
          const pal = typeColors[e.type] ?? typeColors["Course"];
          const isProgramme = e.type === "Programme";
          const card = (
            <div key={`${e.institution}-${e.credential}`} className="card" style={{ padding: "var(--space-3)", height: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "var(--space-2)", marginBottom: "0.5rem" }}>
                <div>
                  <p style={{ fontWeight: 500, fontSize: "0.9375rem", color: "var(--text-primary)", lineHeight: 1.3 }}>{e.credential}</p>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>{e.institution}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.3rem", flexShrink: 0 }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)", whiteSpace: "nowrap" }}>{e.period}</span>
                  <span style={{
                    fontSize: "0.65rem",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                    padding: "0.15em 0.55em",
                    borderRadius: "0.2rem",
                    background: pal.bg,
                    color: pal.text,
                    border: `1px solid ${pal.border}`,
                    textTransform: "uppercase",
                  }}>{e.type}</span>
                </div>
              </div>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{e.desc}</p>
              {"tags" in e && e.tags && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "0.75rem" }}>
                  {e.tags.map((t: string) => <Tag key={t}>{t}</Tag>)}
                </div>
              )}
            </div>
          );
          if (isProgramme) return card;
          return null;
        })}

        {/* Two-column grid for everything else */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "var(--space-2)" }}>
          {education.filter(e => e.type !== "Programme").map((e) => {
            const pal = typeColors[e.type] ?? typeColors["Course"];
            return (
              <div key={`${e.institution}-${e.credential}`} className="card" style={{ padding: "var(--space-3)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "var(--space-2)", marginBottom: "0.5rem" }}>
                  <div>
                    <p style={{ fontWeight: 500, fontSize: "0.9375rem", color: "var(--text-primary)", lineHeight: 1.3 }}>{e.credential}</p>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>{e.institution}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.3rem", flexShrink: 0 }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)", whiteSpace: "nowrap" }}>{e.period}</span>
                    <span style={{
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 500,
                      letterSpacing: "0.05em",
                      padding: "0.15em 0.55em",
                      borderRadius: "0.2rem",
                      background: pal.bg,
                      color: pal.text,
                      border: `1px solid ${pal.border}`,
                      textTransform: "uppercase",
                    }}>{e.type}</span>
                  </div>
                </div>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{e.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
