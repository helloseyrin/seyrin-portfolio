"use client";

import { useState, useRef, useEffect } from "react";
import { useEdit } from "@/contexts/EditContext";
import { getByPath } from "@/lib/pathResolver";

type Props = {
  file: "hero" | "about" | "experience" | "resources";
  path: string;
  tag?: keyof React.JSX.IntrinsicElements;
  style?: React.CSSProperties;
  className?: string;
  multiline?: boolean;
};

export default function Editable({ file, path, tag: Tag = "span", style, className, multiline = false }: Props) {
  const { editMode, data, updateField } = useEdit();
  const value = String(getByPath(data[file], path) ?? "");
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const ref = useRef<HTMLTextAreaElement & HTMLInputElement>(null);

  // Keep draft in sync when data changes externally
  useEffect(() => { if (!editing) setDraft(value); }, [value, editing]);

  // Auto-focus and size
  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      ref.current.selectionStart = ref.current.value.length;
      if (multiline) autoResize(ref.current);
    }
  }, [editing, multiline]);

  function autoResize(el: HTMLTextAreaElement) {
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }

  function save() {
    if (draft !== value) updateField(file, path, draft);
    setEditing(false);
  }

  if (!editMode) {
    return <Tag style={style} className={className}>{value}</Tag>;
  }

  if (editing) {
    const sharedStyle: React.CSSProperties = {
      ...style,
      display: "block",
      width: "100%",
      background: "rgba(14,40,100,0.12)",
      border: "1.5px solid rgba(99,170,255,0.5)",
      borderRadius: "0.3rem",
      color: "inherit",
      font: "inherit",
      lineHeight: "inherit",
      padding: "0.1em 0.3em",
      resize: "none",
      outline: "none",
      boxShadow: "0 0 0 3px rgba(99,170,255,0.12)",
    };

    if (multiline) {
      return (
        <textarea
          ref={ref}
          value={draft}
          style={{ ...sharedStyle, overflow: "hidden", minHeight: "2em" }}
          onChange={(e) => { setDraft(e.target.value); autoResize(e.target); }}
          onBlur={save}
          onKeyDown={(e) => { if (e.key === "Escape") { setDraft(value); setEditing(false); } }}
        />
      );
    }
    return (
      <input
        ref={ref}
        value={draft}
        style={sharedStyle}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => {
          if (e.key === "Enter") save();
          if (e.key === "Escape") { setDraft(value); setEditing(false); }
        }}
      />
    );
  }

  return (
    <Tag
      style={{ ...style, cursor: "text", outline: "1.5px dashed rgba(99,170,255,0.35)", outlineOffset: "2px", borderRadius: "0.2rem" }}
      className={className}
      onClick={() => { setDraft(value); setEditing(true); }}
    >
      {value}
    </Tag>
  );
}
