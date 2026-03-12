"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Typewriter from "./Typewriter";

const SIDEBAR_WIDTH = "15rem";

const navLinks = [
  {
    label: "Home", href: "/",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    label: "Stack", href: "/stack",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
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
    label: "Certifications", href: "/certifications",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>,
  },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/smyrna-v" },
  { label: "GitHub", href: "https://github.com/helloseyrin" },
  { label: "CV", href: "/cv.pdf" },
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
      background: "#0b1120",
      borderRight: "1px solid #1a2840",
    }}>

      {/* Avatar + name */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2.5rem", padding: "0 0.5rem" }}>
        <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "2px solid #1e2d45" }}>
          <Image src="/avatar.jpg" alt="Smyrna" width={56} height={56} style={{ objectFit: "cover", objectPosition: "center 15%", width: "100%", height: "100%" }} />
        </div>
        <div>
          <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#d0dae8", lineHeight: 1.2 }}>Smyrna</p>
          <p style={{ fontSize: "0.75rem", color: "#3a5070", marginTop: "0.2rem" }}>Data & ML Engineer</p>
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
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
                textDecoration: "none",
                border: isActive ? "1px solid #1e3a5a" : "1px solid transparent",
                background: isActive ? "#111f33" : "transparent",
                color: isActive ? "#7db8e0" : "#4a6070",
              }}
            >
              <span style={{ flexShrink: 0, color: isActive ? "#7db8e0" : "#2e4a60" }}>{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Connect */}
      <div style={{ marginTop: "2rem", padding: "0 0.25rem" }}>
        <p style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem", padding: "0 0.5rem", color: "#1e3045" }}>
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
    </aside>
  );
}
