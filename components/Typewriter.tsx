"use client";

import { useState, useEffect } from "react";

const TITLES = ["Data Engineering", "NLP", "MLOps", "Process Automation"];
const TYPE_SPEED = 60;
const DELETE_SPEED = 35;
const PAUSE_AFTER_TYPE = 1800;
const PAUSE_AFTER_DELETE = 400;

export default function Typewriter() {
  const [displayed, setDisplayed] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "waiting">("typing");

  useEffect(() => {
    const target = TITLES[titleIndex];

    if (phase === "typing") {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), TYPE_SPEED);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("deleting"), PAUSE_AFTER_TYPE);
        return () => clearTimeout(t);
      }
    }

    if (phase === "deleting") {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), DELETE_SPEED);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          setTitleIndex((i) => (i + 1) % TITLES.length);
          setPhase("typing");
        }, PAUSE_AFTER_DELETE);
        return () => clearTimeout(t);
      }
    }
  }, [displayed, phase, titleIndex]);

  return (
    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", minHeight: "1.2em", fontFamily: "var(--font-fira-code), 'Fira Code', ui-monospace, monospace", whiteSpace: "nowrap" }}>
      {displayed}
      <span className="typewriter-cursor" />
    </p>
  );
}
