import type { Metadata } from "next";
import { Fira_Sans, Fira_Code } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const firaSans = Fira_Sans({
  variable: "--font-fira-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Smyrna V. | Data & ML Engineer",
  description: "Personal portfolio — Data & ML Engineer, Turing College",
};

const SIDEBAR_WIDTH = "15rem"; // 240px — must match sidebar inline style

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${firaSans.variable} ${firaCode.variable}`}>
        <Sidebar />
        <div style={{ marginLeft: SIDEBAR_WIDTH, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <main style={{ flexGrow: 1, padding: "8rem 3rem 4rem 3rem", maxWidth: "56rem", width: "100%", marginLeft: "auto", marginRight: "auto" }}>
            {children}
          </main>
          <footer style={{ padding: "1.5rem 3rem", maxWidth: "50rem", width: "100%", borderTop: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", color: "var(--text-muted)" }}>
              <a href="mailto:smyrna.volzhevska@protonmail.com" className="hover-link">Reach out →</a>
              <span>Smyrna V. © 2026</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
