"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { setByPath } from "@/lib/pathResolver";

import heroData from "@/data/hero.json";
import aboutData from "@/data/about.json";
import experienceData from "@/data/experience.json";
import resourcesData from "@/data/resources.json";

type EditData = {
  hero: typeof heroData;
  about: typeof aboutData;
  experience: typeof experienceData;
  resources: typeof resourcesData;
};

type EditContextValue = {
  editMode: boolean;
  setEditMode: (v: boolean) => void;
  data: EditData;
  updateField: (file: keyof EditData, path: string, value: string) => void;
};

const EditContext = createContext<EditContextValue | null>(null);

export function EditProvider({ children }: { children: React.ReactNode }) {
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState<EditData>({
    hero: heroData,
    about: aboutData,
    experience: experienceData,
    resources: resourcesData,
  });

  const updateField = useCallback(
    (file: keyof EditData, path: string, value: string) => {
      // Optimistic local update
      setData((prev) => ({
        ...prev,
        [file]: setByPath(prev[file], path, value),
      }));

      // Persist to disk in dev
      if (process.env.NODE_ENV === "development") {
        fetch("/api/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file, path, value }),
        }).catch(console.error);
      }
    },
    []
  );

  return (
    <EditContext.Provider value={{ editMode, setEditMode, data, updateField }}>
      {children}
    </EditContext.Provider>
  );
}

export function useEdit() {
  const ctx = useContext(EditContext);
  if (!ctx) throw new Error("useEdit must be used inside EditProvider");
  return ctx;
}
