"use client";

import { useState } from "react";

const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.45)",
  border: "1px solid var(--border)",
  borderRadius: "0.5rem",
  padding: "0.6rem 0.875rem",
  fontSize: "0.875rem",
  color: "var(--text-primary)",
  fontFamily: "var(--font-sans)",
  outline: "none",
} as React.CSSProperties;

const labelBubbleStyle = {
  alignSelf: "flex-start",
  padding: "0.4em 0.85em",
  borderRadius: "0 0.75rem 0.75rem 0.75rem",
  background: "rgba(14, 60, 140, 0.08)",
  border: "1px solid rgba(99, 170, 255, 0.2)",
  fontSize: "0.8125rem",
  color: "var(--text-secondary)",
} as React.CSSProperties;

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:smyrna.volzhevska@protonmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div style={{
      padding: "1.25rem 1.5rem",
      borderRadius: "0.75rem",
      border: "1px solid var(--border)",
      background: "linear-gradient(135deg, var(--bg-card), var(--bg-deep))",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      display: "flex",
      flexDirection: "column",
      gap: "1.25rem",
    }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div style={{
          width: "7px", height: "7px", borderRadius: "50%",
          background: "#4ade80",
          boxShadow: "0 0 6px rgba(74, 222, 128, 0.6)",
        }} />
        <p style={{ fontWeight: 500, fontSize: "0.9375rem", color: "var(--text-primary)" }}>Get in touch</p>
      </div>

      {sent ? (
        <div style={{
          padding: "1rem",
          borderRadius: "0.5rem",
          background: "rgba(14, 60, 140, 0.08)",
          border: "1px solid rgba(99, 170, 255, 0.25)",
          fontSize: "0.875rem",
          color: "var(--text-secondary)",
          lineHeight: 1.6,
        }}>
          Opening your email client — thanks for reaching out 🌊
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

          {/* Name */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={labelBubbleStyle}>What&apos;s your name?</div>
            <input
              type="text"
              placeholder="Full name"
              value={name}
              required
              onChange={e => setName(e.target.value)}
              className="form-input"
              style={inputStyle}
            />
          </div>

          {/* Email */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={labelBubbleStyle}>And your email?</div>
            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              required
              onChange={e => setEmail(e.target.value)}
              className="form-input"
              style={inputStyle}
            />
          </div>

          {/* Message */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={labelBubbleStyle}>How can I help?</div>
            <textarea
              placeholder="Tell me what you have in mind..."
              value={message}
              required
              rows={4}
              onChange={e => setMessage(e.target.value)}
              className="form-input"
              style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
            />
          </div>

          {/* Send */}
          <button
            type="submit"
            className="form-submit"
            style={{
              alignSelf: "flex-end",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.5rem 1.1rem",
              borderRadius: "9999px",
              border: "1px solid rgba(99, 170, 255, 0.4)",
              background: "linear-gradient(135deg, rgba(14, 60, 140, 0.15) 0%, rgba(7, 30, 90, 0.22) 100%)",
              backdropFilter: "blur(8px)",
              color: "#2563eb",
              fontSize: "0.875rem",
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Send
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          </button>

        </form>
      )}
    </div>
  );
}
