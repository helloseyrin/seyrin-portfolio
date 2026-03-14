import type { Metadata } from "next";
import { Outfit, Fira_Code } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import NeuralCanvas from "@/components/NeuralCanvas";
import FloatingContact from "@/components/FloatingContact";
import Providers from "@/components/Providers";
import { SIDEBAR_WIDTH } from "@/lib/constants";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500"],
});


export const metadata: Metadata = {
  title: "Smyrna V. | Knowledge Engineering",
  description: "Personal portfolio — Knowledge Engineering, unstructured data, AI tooling.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${firaCode.variable}`}>
        <Providers>
          <BackgroundBlobs />
          <NeuralCanvas />
          <FloatingContact />
          <div className="sidebar-desktop"><Sidebar /></div>
          <div className="mobile-nav"><MobileNav /></div>
          <div className="main-content" style={{ marginLeft: SIDEBAR_WIDTH, minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>
            <main style={{ flexGrow: 1, padding: "8rem 3rem 4rem 3rem", maxWidth: "56rem", width: "100%", marginLeft: "auto", marginRight: "auto" }}>
              {children}
            </main>
            <footer style={{ padding: "1.5rem 3rem", width: "100%", borderTop: "1px solid var(--border)" }}>
              <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)", maxWidth: "56rem", marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                Smyrna V. © 2026 · Built with TypeScript &amp; Next.js · Deployed on Vercel
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
