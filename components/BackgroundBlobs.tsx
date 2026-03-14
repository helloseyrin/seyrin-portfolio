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
        background: "radial-gradient(circle, #1d6fa4 0%, #0a3d6b 40%, transparent 70%)",
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
        background: "radial-gradient(circle, #1a4fa8 0%, #0d2860 40%, transparent 70%)",
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
        background: "radial-gradient(circle, #0ea5e9 0%, #0369a1 35%, transparent 70%)",
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
        background: "radial-gradient(circle, #6366f1 0%, #3730a3 40%, transparent 70%)",
        opacity: 0.1,
        filter: "blur(65px)",
        animation: "blob-1 36s ease-in-out infinite reverse",
      }} />
      {/* Dot grid */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        opacity: 0.05,
      }} />
    </div>
  );
}
