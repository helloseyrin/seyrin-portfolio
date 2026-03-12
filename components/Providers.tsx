"use client";

import { EditProvider } from "@/contexts/EditContext";
import EditToggle from "@/components/EditToggle";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <EditProvider>
      {children}
      <EditToggle />
    </EditProvider>
  );
}
