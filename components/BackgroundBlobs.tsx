"use client";

export default function BackgroundBlobs() {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 0,
      pointerEvents: "none",
      overflow: "hidden",
    }}>
      {/* Blob 1 — electric blue, upper right */}
      <div style={{
        position: "absolute",
        top: "-12rem",
        right: "5%",
        width: "52rem",
        height: "52rem",
        borderRadius: "50%",
        background: `radial-gradient(circle, var(--blob-blue-1) 0%, var(--blob-blue-2) 40%, transparent 70%)`,
        opacity: 0.28,
        filter: "blur(60px)",
        animation: "blob-1 28s ease-in-out infinite",
      }} />
      {/* Blob 2 — deep indigo, lower left */}
      <div style={{
        position: "absolute",
        bottom: "-6rem",
        left: "10%",
        width: "46rem",
        height: "46rem",
        borderRadius: "50%",
        background: `radial-gradient(circle, var(--blob-indigo-1) 0%, var(--blob-indigo-2) 40%, transparent 70%)`,
        opacity: 0.22,
        filter: "blur(70px)",
        animation: "blob-2 34s ease-in-out infinite",
      }} />
      {/* Blob 3 — cyan glow, centre */}
      <div style={{
        position: "absolute",
        top: "35%",
        left: "35%",
        width: "36rem",
        height: "36rem",
        borderRadius: "50%",
        background: `radial-gradient(circle, var(--blob-cyan-1) 0%, var(--blob-cyan-2) 35%, transparent 70%)`,
        opacity: 0.14,
        filter: "blur(55px)",
        animation: "blob-3 22s ease-in-out infinite",
      }} />
      {/* Blob 4 — periwinkle accent, upper left */}
      <div style={{
        position: "absolute",
        top: "20%",
        left: "-8rem",
        width: "32rem",
        height: "32rem",
        borderRadius: "50%",
        background: `radial-gradient(circle, var(--blob-violet-1) 0%, var(--blob-violet-2) 40%, transparent 70%)`,
        opacity: 0.1,
        filter: "blur(65px)",
        animation: "blob-1 36s ease-in-out infinite reverse",
      }} />
      {/* Dot grid */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `radial-gradient(circle, var(--blob-dot) 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
        opacity: 0.05,
      }} />
    </div>
  );
}
