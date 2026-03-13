"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navLinks = [
  { label: "Home",           href: "/" },
  { label: "Projects",       href: "/projects" },
  { label: "Skills",         href: "/skills" },
  { label: "Tools",          href: "/tools" },
  { label: "Experience",     href: "/experience" },
  { label: "Values",         href: "/values" },
  { label: "Education",      href: "/education" },
  { label: "Certifications", href: "/certifications" },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/smyrna/" },
  { label: "GitHub",   href: "https://github.com/helloseyrin" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Top bar */}
      <div style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        height: "3.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.25rem",
        background: "rgba(240, 246, 255, 0.72)",
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
        borderBottom: "1px solid rgba(200, 225, 245, 0.3)",
        zIndex: 50,
      }}>
        <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--text-primary)" }}>Smyrna V.</span>
        <button
          onClick={() => setOpen(v => !v)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "0.25rem", color: "var(--text-muted)", display: "flex", alignItems: "center" }}
          aria-label="Toggle menu"
        >
          {open
            ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          }
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            top: "3.5rem",
            background: "rgba(240, 246, 255, 0.92)",
            backdropFilter: "blur(24px) saturate(160%)",
            WebkitBackdropFilter: "blur(24px) saturate(160%)",
            zIndex: 49,
            display: "flex",
            flexDirection: "column",
            padding: "1.5rem 1.25rem",
            gap: "0.25rem",
            overflowY: "auto",
            animationName: "fade-down",
            animationDuration: "0.2s",
            animationTimingFunction: "ease",
            animationFillMode: "both",
          }}
          onClick={() => setOpen(false)}
        >
          {navLinks.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                style={{
                  padding: "0.75rem 1rem",
                  borderRadius: "0.6rem",
                  fontSize: "1rem",
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? "#2563eb" : "var(--text-secondary)",
                  textDecoration: "none",
                  background: isActive ? "linear-gradient(135deg, rgba(14,60,140,0.1) 0%, rgba(7,30,90,0.15) 100%)" : "transparent",
                  border: isActive ? "1px solid rgba(99,170,255,0.3)" : "1px solid transparent",
                }}
              >
                {label}
              </Link>
            );
          })}

          <div style={{ height: "1px", background: "var(--border)", margin: "0.75rem 0" }} />

          {socialLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              style={{
                padding: "0.6rem 1rem",
                fontSize: "0.875rem",
                color: "var(--text-muted)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {label}
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
            </a>
          ))}
        </div>
      )}
    </>
  );
}
