"use client";

export default function About() {
  return (
    <div style={{
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div className="card" style={{
        padding: "3rem 2.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.25rem",
        textAlign: "center",
        maxWidth: "26rem",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* Floating sparkle dots */}
        {[
          { top: "10%",  left: "8%",  size: 5, color: "#89c4e1", dur: "2s" },
          { top: "18%",  left: "84%", size: 3, color: "#a78bfa", dur: "3s" },
          { top: "62%",  left: "6%",  size: 4, color: "#c5d8f0", dur: "2.5s" },
          { top: "78%",  left: "88%", size: 5, color: "#89c4e1", dur: "2s" },
          { top: "42%",  left: "91%", size: 3, color: "#a78bfa", dur: "3.5s" },
          { top: "85%",  left: "38%", size: 4, color: "#c5d8f0", dur: "2.8s" },
          { top: "6%",   left: "52%", size: 3, color: "#89c4e1", dur: "3s"  },
        ].map((d, i) => (
          <div key={i} style={{
            position: "absolute",
            top: d.top, left: d.left,
            width: d.size, height: d.size,
            borderRadius: "50%",
            background: d.color,
            boxShadow: `0 0 ${d.size * 3}px ${d.color}`,
            animationName: "star-pulse",
            animationDuration: d.dur,
            animationDelay: `${i * 0.35}s`,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            pointerEvents: "none",
          }} />
        ))}

        {/* Chao */}
        <img
          src="/chao.png"
          alt="chao"
          style={{
            width: "6rem",
            height: "6rem",
            objectFit: "contain",
            animationName: "blob-1",
            animationDuration: "4s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
          }}
        />

        {/* Text */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <p style={{
            fontSize: "1.25rem",
            fontWeight: 500,
            background: "linear-gradient(90deg, #89c4e1, #c5d8f0, #a78bfa)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}>
            coming soon
          </p>
          <p style={{ fontSize: "0.8125rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
            the human behind the stack — writing this one carefully
          </p>
        </div>

      </div>
    </div>
  );
}
