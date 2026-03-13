"use client";

import { useState, useEffect, useRef } from "react";
import ContactForm from "./ContactForm";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "fixed", top: "1.25rem", right: "1.5rem", zIndex: 100 }}>

      {/* Trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        title="Get in touch"
        data-open={open}
        className="floating-btn"
        style={{
          width: "2.25rem",
          height: "2.25rem",
          borderRadius: "50%",
          border: "1px solid rgba(137,196,225,0.2)",
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          boxShadow: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(137,196,225,0.45)",
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m22 2-7 20-4-9-9-4Z"/>
          <path d="M22 2 11 13"/>
        </svg>
      </button>

      {/* Dropdown form */}
      {open && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 0.75rem)",
          right: 0,
          width: "22rem",
          animationName: "fade-up",
          animationDuration: "0.18s",
          animationTimingFunction: "ease",
          animationFillMode: "both",
        }}>
          <ContactForm />
        </div>
      )}
    </div>
  );
}
