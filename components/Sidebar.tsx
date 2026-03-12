"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Typewriter from "./Typewriter";

const SIDEBAR_WIDTH = "16.5rem";

const navLinks = [
  {
    label: "Home", href: "/",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    label: "Projects", href: "/projects",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  },
  {
    label: "Tools", href: "/tools",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  },
  {
    label: "Values", href: "/values",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  {
    label: "Education", href: "/education",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  },
  {
    label: "Certifications", href: "/certifications",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>,
  },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/smyrna-v" },
  { label: "GitHub", href: "https://github.com/helloseyrin" },
  { label: "Resume", href: "/cv.pdf" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      position: "fixed",
      left: 0,
      top: 0,
      height: "100vh",
      width: SIDEBAR_WIDTH,
      display: "flex",
      flexDirection: "column",
      padding: "2.5rem 1rem",
      overflowY: "auto",
      zIndex: 10,
      background: "var(--sidebar-bg)",
      backdropFilter: "blur(28px) saturate(160%)",
      WebkitBackdropFilter: "blur(28px) saturate(160%)",
      borderRight: "1px solid rgba(200, 225, 245, 0.3)",
      boxShadow: "inset -1px 0 0 rgba(255, 255, 255, 0.5)",
    }}>

      {/* Avatar + name */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "2.5rem", padding: "0 0.5rem" }}>
        <div style={{ width: "4rem", height: "4rem", borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "2px solid var(--border)" }}>
          <Image src="/avatar.jpg" alt="Smyrna" width={64} height={64} style={{ objectFit: "cover", objectPosition: "center 15%", width: "100%", height: "100%" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "0.2rem" }}>
          <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--text-primary)", lineHeight: 1 }}>Smyrna</p>
          <Typewriter />
        </div>
      </div>

      {/* Nav */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem", flex: 1 }}>
        {navLinks.map(({ label, href, icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              className="nav-link"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                padding: "0.5rem 0.75rem",
                borderRadius: "0.6rem",
                fontSize: "0.875rem",
                textDecoration: "none",
                border: isActive ? "1px solid rgba(99, 170, 255, 0.4)" : "1px solid transparent",
                background: isActive
                  ? "linear-gradient(135deg, rgba(14, 60, 140, 0.15) 0%, rgba(7, 30, 90, 0.22) 100%)"
                  : "transparent",
                color: isActive ? "#2563eb" : "var(--text-muted)",
                backdropFilter: isActive ? "blur(8px)" : undefined,
                WebkitBackdropFilter: isActive ? "blur(8px)" : undefined,
                boxShadow: isActive ? "0 0 10px rgba(147, 197, 253, 0.08)" : undefined,
              }}
            >
              <span style={{ flexShrink: 0, color: isActive ? "#2563eb" : "var(--text-dim)" }}>{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Connect */}
      <div style={{ marginTop: "2rem", padding: "0 0.25rem" }}>
        <p style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem", padding: "0 0.5rem", color: "var(--text-dim)" }}>
          Connect
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.125rem" }}>
          {socialLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="social-link"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.5rem 0.5rem",
                borderRadius: "0.25rem",
                fontSize: "0.875rem",
                textDecoration: "none",
              }}
            >
              <span>{label}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              </svg>
            </a>
          ))}
        </div>
      </div>
      <div className="sidebar-shimmer" />
    </aside>
  );
}
