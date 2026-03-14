"use client";

export default function NotebookBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="entry-prose">
      {children}
    </div>
  );
}
