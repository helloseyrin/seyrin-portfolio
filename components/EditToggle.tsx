"use client";

import { useEffect } from "react";
import { useEdit } from "@/contexts/EditContext";

export default function EditToggle() {
  const { editMode, setEditMode } = useEdit();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.ctrlKey && e.shiftKey && e.key === "E") {
        e.preventDefault();
        setEditMode(!editMode);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setEditMode]);

  if (!editMode) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: "1.5rem",
      right: "1.5rem",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.4rem 0.875rem",
      borderRadius: "9999px",
      background: "linear-gradient(135deg, rgba(14,60,140,0.85) 0%, rgba(7,30,90,0.92) 100%)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      border: "1px solid rgba(99,170,255,0.4)",
      boxShadow: "0 0 16px rgba(99,170,255,0.2), 0 4px 12px rgba(0,0,0,0.2)",
      color: "#7ec8f0",
      fontSize: "0.7rem",
      fontFamily: "var(--font-mono)",
      letterSpacing: "0.08em",
      cursor: "pointer",
      userSelect: "none",
    }}
      onClick={() => setEditMode(false)}
      title="Click or Ctrl+Shift+E to exit edit mode"
    >
      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#7ec8f0", boxShadow: "0 0 6px #7ec8f0", flexShrink: 0 }} />
      EDIT MODE — click to exit
    </div>
  );
}
