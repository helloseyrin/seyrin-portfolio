"use client";

import { useState } from "react";
import Tag from "./Tag";
import { IconTools } from "./GradientIcon";
import { useEdit } from "@/contexts/EditContext";

// ── Types ─────────────────────────────────────────

type ResourceType = "Video" | "Paper" | "Book" | "Article";

type Resource = {
  id: string;
  type: ResourceType;
  title: string;
  author: string;
  url: string;
  note?: string;
  date: string;
  codeUrl?: string;
  abstract?: string;
  cover?: string;
};

type ResourceForm = {
  type: ResourceType;
  title: string;
  author: string;
  url: string;
  note: string;
  date: string;
  codeUrl: string;
  abstract: string;
  cover: string;
};

// ── Static data ───────────────────────────────────

const dailyTools = [
  { name: "Cursor",      category: "IDE",           icon: "https://cdn.simpleicons.org/cursor/89c4e1",     color: "#89c4e1" },
  { name: "Claude Code", category: "AI",            icon: "https://cdn.simpleicons.org/anthropic/c084fc",  color: "#c084fc" },
  { name: "Obsidian",    category: "PKM",           icon: "https://cdn.simpleicons.org/obsidian/a78bfa",   color: "#a78bfa" },
  { name: "Notion",      category: "Productivity",  icon: "https://cdn.simpleicons.org/notion/89c4e1",     color: "#89c4e1" },
  { name: "NotebookLM",  category: "Research",      icon: "https://cdn.simpleicons.org/google/4ade80",     color: "#4ade80" },
  { name: "Canva",       category: "Design",        icon: "https://cdn.simpleicons.org/canva/00c4cc",      color: "#00c4cc" },
  { name: "Protonmail",  category: "Communication", icon: "https://cdn.simpleicons.org/protonmail/6d4aff", color: "#6d4aff" },
];

const learningPlatforms = [
  { name: "DataCamp",          category: "Data",     icon: "https://cdn.simpleicons.org/datacamp/03ac8c",     color: "#03ac8c" },
  { name: "Coursera",          category: "Courses",  icon: "https://cdn.simpleicons.org/coursera/2563eb",     color: "#2563eb" },
  { name: "Anthropic Academy", category: "AI",       icon: "https://cdn.simpleicons.org/anthropic/c084fc",   color: "#c084fc" },
  { name: "Scrimba",           category: "Coding",   icon: "https://cdn.simpleicons.org/scrimba/f4a261",     color: "#f4a261" },
  { name: "Khan Academy",      category: "Learning", icon: "https://cdn.simpleicons.org/khanacademy/14bf96", color: "#14bf96" },
  { name: "MIT OpenLearning",  category: "Courses",  icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23c084fc' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z'/%3E%3Cpath d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'/%3E%3C/svg%3E", color: "#c084fc" },
];

type SpecItem = {
  label: string;
  value: string;
  image: string | null;
  info?: { label: string; value: string }[];
};

const specs: SpecItem[] = [
  {
    label: "Laptop",
    value: "ASUS VivoBook 15 OLED K513",
    image: "/specs/laptop-asus.png",
    info: [
      { label: "Display",  value: "15.6\" OLED FHD · 60Hz · 600 nits · 100% DCI-P3 · 0.2ms" },
      { label: "CPU",      value: "Intel Core i5/i7-1135G7/1165G7 · 4 cores · 11th Gen" },
      { label: "GPU",      value: "Intel Iris Xᵉ + NVIDIA GeForce MX350" },
      { label: "RAM",      value: "Up to 16GB DDR4 (4GB soldered + SO-DIMM)" },
      { label: "Storage",  value: "Up to 1TB NVMe SSD" },
      { label: "Battery",  value: "42Wh · ~9h browsing · 65W charger" },
      { label: "Weight",   value: "1.80 kg · 35.9 × 23.5 × 1.79 cm" },
      { label: "Ports",    value: "USB-C · USB-A ×3 · HDMI 1.4 · microSD · 3.5mm" },
    ],
  },
  {
    label: "OS",
    value: "Linux Mint 22.3 Cinnamon",
    image: "/specs/linux-mint.png",
    info: [
      { label: "Version",   value: "22.3 \"Zena\" · Cinnamon Edition" },
      { label: "Base",      value: "Ubuntu 24.04 LTS · 64-bit" },
      { label: "Kernel",    value: "Linux 6.8" },
      { label: "Desktop",   value: "Cinnamon 6.4" },
      { label: "ISO",       value: "2.9GB" },
      { label: "License",   value: "Free & open source" },
    ],
  },
  {
    label: "Mouse & Keys",
    value: "Logitech Pebble 2 Combo",
    image: "https://resource.logitech.com/w_544,h_466,ar_7:6,c_pad,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/logitech/en/products/combos/pebble-2-combo/gallery/pebble-2-combo-top-tonal-white-gallery-deu.png",
    info: [
      { label: "Mouse",      value: "Pebble Mouse 2 M350s · 400–4000 DPI · silent clicks · 99.8g" },
      { label: "Keyboard",   value: "Pebble Keys 2 K380s · compact · quiet keys" },
      { label: "Connect",    value: "Bluetooth 5.1 + Logi Bolt USB receiver · 10m range" },
      { label: "Devices",    value: "Easy-Switch · up to 3 paired devices" },
      { label: "Battery",    value: "Mouse: 1× AA ~18mo · Keyboard: 2× AAA ~36mo" },
      { label: "Compat",     value: "Windows · macOS · Linux · iPadOS · Android" },
      { label: "Material",   value: "45%+ post-consumer recycled plastic" },
    ],
  },
  {
    label: "Monitor",
    value: "Lenovo L27i-4A",
    image: "https://p3-ofp.static.pub//fes/cms/2024/09/02/y7pmh7qtou9q8932h2lfhie4lifs7m408333.png?width=400&height=400",
    info: [
      { label: "Display",   value: "27\" IPS · FHD 1920×1080 · 16:9" },
      { label: "Refresh",   value: "100Hz · 4ms GtG response" },
      { label: "Brightness", value: "250 nits · 1000:1 contrast" },
      { label: "Sync",      value: "AMD FreeSync" },
      { label: "Ports",     value: "HDMI 1.4 · VGA · 3.5mm audio out" },
      { label: "VESA",      value: "100 × 100mm · tilt adjustable" },
    ],
  },
  {
    label: "Headphones",
    value: "JBL Tune 520BT · Blue",
    image: "https://fi.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwfb620202/01.JBL_Tune_520BT_ProductImage_Hero_Blue.png?sw=1605&sh=1605",
    info: [
      { label: "Driver",   value: "33mm · 20Hz–20kHz · 102dB · 30Ω" },
      { label: "Battery",  value: "57h playtime · 2h charge · 5min → 3h quick charge" },
      { label: "Bluetooth", value: "5.3 · 10m range · AAC + SBC · multipoint" },
      { label: "Style",    value: "On-ear · 157g · USB-C charging" },
      { label: "Extras",   value: "Built-in mic · hands-free · JBL app EQ" },
    ],
  },
  {
    label: "iPad",
    value: "iPad Air 3 · Gold · 64GB",
    image: "/specs/ipad.png",
    info: [
      { label: "Model",    value: "iPad Air 3rd Gen · March 2019" },
      { label: "Display",  value: "10.5\" Retina · 2224×1668 · 264ppi" },
      { label: "Chip",     value: "Apple A12 Bionic · 64-bit" },
      { label: "Storage",  value: "64GB · Wi-Fi · no SIM" },
      { label: "Camera",   value: "8MP rear · 7MP FaceTime · 4K video" },
      { label: "Battery",  value: "~10h · Lightning · 30.8Wh" },
      { label: "Source",   value: "Back Market (refurbished) · Gold" },
    ],
  },
  {
    label: "Chair",
    value: "Cat Ear Gaming Chair · The Range",
    image: "/specs/chair.png",
    info: [
      { label: "Style",    value: "Gaming chair with cat ears" },
      { label: "Lumbar",   value: "Massage lumbar support cushion" },
      { label: "Retailer", value: "The Range (UK)" },
    ],
  },
  {
    label: "Desk",
    value: "IKEA LAGKAPTEN / ADILS",
    image: "/specs/desk.png",
    info: [
      { label: "Model",  value: "LAGKAPTEN tabletop + ADILS legs" },
      { label: "Size",   value: "140 × 60 cm" },
      { label: "Color",  value: "White" },
      { label: "Brand",  value: "IKEA" },
    ],
  },
];

// ── Style helpers ─────────────────────────────────

const categoryColor: Record<string, { bg: string; text: string; border: string }> = {
  "IDE":           { bg: "rgba(137,196,225,0.1)", text: "#89c4e1", border: "rgba(137,196,225,0.25)" },
  "AI":            { bg: "rgba(192,132,252,0.1)", text: "#c084fc", border: "rgba(192,132,252,0.25)" },
  "PKM":           { bg: "rgba(167,139,250,0.1)", text: "#a78bfa", border: "rgba(167,139,250,0.25)" },
  "Productivity":  { bg: "rgba(137,196,225,0.1)", text: "#89c4e1", border: "rgba(137,196,225,0.25)" },
  "Research":      { bg: "rgba(74,222,128,0.1)",  text: "#4ade80", border: "rgba(74,222,128,0.25)"  },
  "Design":        { bg: "rgba(0,196,204,0.1)",   text: "#00c4cc", border: "rgba(0,196,204,0.25)"   },
  "Communication": { bg: "rgba(109,74,255,0.1)",  text: "#6d4aff", border: "rgba(109,74,255,0.25)"  },
  "Data":          { bg: "rgba(3,172,140,0.1)",   text: "#03ac8c", border: "rgba(3,172,140,0.25)"   },
  "Courses":       { bg: "rgba(37,99,235,0.1)",   text: "#2563eb", border: "rgba(37,99,235,0.25)"   },
  "Coding":        { bg: "rgba(244,162,97,0.1)",  text: "#f4a261", border: "rgba(244,162,97,0.25)"  },
  "Learning":      { bg: "rgba(20,191,150,0.1)",  text: "#14bf96", border: "rgba(20,191,150,0.25)"  },
};

const typeColor: Record<string, { bg: string; text: string; border: string }> = {
  "Video":   { bg: "rgba(239,68,68,0.1)",   text: "#f87171", border: "rgba(239,68,68,0.25)"   },
  "Article": { bg: "rgba(37,99,235,0.1)",   text: "#2563eb", border: "rgba(37,99,235,0.25)"   },
  "Paper":   { bg: "rgba(192,132,252,0.1)", text: "#c084fc", border: "rgba(192,132,252,0.25)" },
  "Book":    { bg: "rgba(74,222,128,0.1)",  text: "#4ade80", border: "rgba(74,222,128,0.25)"  },
};

// ── Icon card ─────────────────────────────────────

function IconCard({ tool }: { tool: typeof dailyTools[0] }) {
  const pal = categoryColor[tool.category] ?? categoryColor["Learning"];
  return (
    <div
      className="card icon-card"
      style={{ padding: "1.25rem 0.75rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", textAlign: "center", cursor: "default" }}
    >
      <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.75rem", background: `${tool.color}18`, border: `1px solid ${tool.color}30`, display: "flex", alignItems: "center", justifyContent: "center", padding: "0.5rem" }}>
        <img src={tool.icon} alt={tool.name} width={24} height={24} style={{ width: "1.5rem", height: "1.5rem", objectFit: "contain" }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
      </div>
      <p style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.2 }}>{tool.name}</p>
      <span style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", padding: "0.15em 0.5em", borderRadius: "0.2rem", background: pal.bg, color: pal.text, border: `1px solid ${pal.border}` }}>
        {tool.category}
      </span>
    </div>
  );
}

// ── Section label ─────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-dim)", marginBottom: "0.75rem", fontFamily: "var(--font-mono)" }}>
      {children}
    </p>
  );
}

// ── Spec card ─────────────────────────────────────

function SpecCard({
  spec,
  onMouseMove,
  onMouseLeave,
}: {
  spec: SpecItem;
  onMouseMove?: (e: React.MouseEvent) => void;
  onMouseLeave?: () => void;
}) {
  const empty = spec.value === "—";
  return (
    <div
      className="card"
      onMouseMove={spec.info ? onMouseMove : undefined}
      onMouseLeave={spec.info ? onMouseLeave : undefined}
      style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", cursor: spec.info ? "default" : "default" }}
    >
      <div style={{
        aspectRatio: "4/3",
        background: "linear-gradient(135deg, rgba(138,170,200,0.18) 0%, rgba(192,132,252,0.14) 50%, rgba(167,139,250,0.18) 100%)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        flexShrink: 0,
        position: "relative",
      }}>
        {spec.image ? (
          <img
            src={spec.image}
            alt={spec.label}
            style={{ width: "100%", height: "100%", objectFit: "contain", padding: "0.75rem" }}
          />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(137,196,225,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>
          </svg>
        )}
        {spec.info && (
          <div style={{
            position: "absolute",
            bottom: "0.4rem",
            right: "0.4rem",
            width: "1.2rem",
            height: "1.2rem",
            borderRadius: "50%",
            background: "rgba(137,196,225,0.15)",
            border: "1px solid rgba(137,196,225,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgba(137,196,225,0.8)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
            </svg>
          </div>
        )}
      </div>
      <div style={{ padding: "0.625rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
        <p style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-dim)", margin: 0 }}>
          {spec.label}
        </p>
        <p style={{ fontSize: "0.8125rem", fontWeight: empty ? 400 : 500, color: empty ? "var(--text-dim)" : "var(--text-primary)", margin: 0, lineHeight: 1.3 }}>
          {spec.value}
        </p>
      </div>
    </div>
  );
}

// ── Resource editor panel ─────────────────────────

const BLANK_FORM: ResourceForm = {
  type: "Video",
  title: "",
  author: "",
  url: "",
  note: "",
  date: "",
  codeUrl: "",
  abstract: "",
  cover: "",
};

function generateId(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) + "-" + Date.now().toString(36);
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.4rem 0.6rem",
  fontSize: "0.8125rem",
  fontFamily: "var(--font-sans)",
  color: "var(--text-primary)",
  background: "rgba(255,255,255,0.5)",
  border: "1px solid var(--border)",
  borderRadius: "0.375rem",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.6rem",
  fontFamily: "var(--font-mono)",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "var(--text-dim)",
  display: "block",
  marginBottom: "0.25rem",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span style={labelStyle}>{label}</span>
      {children}
    </div>
  );
}

function ResourceEditorPanel({
  items,
  editingId,
  isAdding,
  form,
  saving,
  onFormChange,
  onEdit,
  onDelete,
  onStartAdd,
  onSave,
  onCancel,
}: {
  items: Resource[];
  editingId: string | null;
  isAdding: boolean;
  form: ResourceForm;
  saving: boolean;
  onFormChange: (patch: Partial<ResourceForm>) => void;
  onEdit: (r: Resource) => void;
  onDelete: (id: string) => void;
  onStartAdd: () => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  const showForm = isAdding || editingId !== null;

  return (
    <div className="card" style={{ padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem", marginTop: "0.5rem" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(137,196,225,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
          </svg>
          <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(137,196,225,0.9)" }}>
            resource editor
          </span>
        </div>
        {!showForm && (
          <button
            onClick={onStartAdd}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", padding: "0.3em 0.8em", fontSize: "0.75rem", fontFamily: "var(--font-mono)", borderRadius: "9999px", border: "1px solid rgba(137,196,225,0.35)", background: "rgba(137,196,225,0.08)", color: "var(--accent-ice)", cursor: "pointer" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            Add resource
          </button>
        )}
      </div>

      {/* Existing resources list */}
      {!showForm && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {items.map(r => {
            const tpal = typeColor[r.type] ?? typeColor["Article"];
            return (
              <div key={r.id} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem 0.75rem", borderRadius: "0.5rem", background: "rgba(255,255,255,0.3)", border: "1px solid var(--border)" }}>
                <span style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", padding: "0.15em 0.45em", borderRadius: "0.2rem", background: tpal.bg, color: tpal.text, border: `1px solid ${tpal.border}`, flexShrink: 0 }}>
                  {r.type}
                </span>
                <span style={{ fontSize: "0.8125rem", color: "var(--text-primary)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {r.title}
                </span>
                <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--text-dim)", flexShrink: 0 }}>{r.date}</span>
                <button
                  onClick={() => onEdit(r)}
                  title="Edit"
                  style={{ padding: "0.25rem", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex", flexShrink: 0 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                </button>
                <button
                  onClick={() => onDelete(r.id)}
                  title="Delete"
                  style={{ padding: "0.25rem", background: "none", border: "none", cursor: "pointer", color: "#f87171", display: "flex", flexShrink: 0 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit form */}
      {showForm && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0, fontFamily: "var(--font-mono)" }}>
            {editingId ? "editing resource" : "new resource"}
          </p>

          {/* Row 1: type + date */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <Field label="Type">
              <select
                value={form.type}
                onChange={e => onFormChange({ type: e.target.value as ResourceType })}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                {(["Video", "Paper", "Book", "Article"] as ResourceType[]).map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field label="Date">
              <input
                type="text"
                placeholder="e.g. Mar 2026"
                value={form.date}
                onChange={e => onFormChange({ date: e.target.value })}
                style={inputStyle}
              />
            </Field>
          </div>

          {/* Row 2: title */}
          <Field label="Title">
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={e => onFormChange({ title: e.target.value })}
              style={inputStyle}
            />
          </Field>

          {/* Row 3: author + url */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <Field label="Author">
              <input
                type="text"
                placeholder="Author · Publisher"
                value={form.author}
                onChange={e => onFormChange({ author: e.target.value })}
                style={inputStyle}
              />
            </Field>
            <Field label="URL">
              <input
                type="text"
                placeholder="https://..."
                value={form.url}
                onChange={e => onFormChange({ url: e.target.value })}
                style={inputStyle}
              />
            </Field>
          </div>

          {/* Note */}
          <Field label="My note (shows on hover)">
            <textarea
              placeholder="What made this worth reading / watching?"
              value={form.note}
              onChange={e => onFormChange({ note: e.target.value })}
              rows={4}
              style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
            />
          </Field>

          {/* Optional fields by type */}
          {form.type === "Paper" && (
            <>
              <Field label="Abstract (optional)">
                <textarea
                  placeholder="Short summary of the paper"
                  value={form.abstract}
                  onChange={e => onFormChange({ abstract: e.target.value })}
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                />
              </Field>
              <Field label="Author blog / code URL (optional)">
                <input
                  type="text"
                  placeholder="https://..."
                  value={form.codeUrl}
                  onChange={e => onFormChange({ codeUrl: e.target.value })}
                  style={inputStyle}
                />
              </Field>
            </>
          )}

          {form.type === "Book" && (
            <Field label="Cover image path (optional)">
              <input
                type="text"
                placeholder="/book-cover.jpg or https://..."
                value={form.cover}
                onChange={e => onFormChange({ cover: e.target.value })}
                style={inputStyle}
              />
            </Field>
          )}

          {/* Buttons */}
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
            <button
              onClick={onCancel}
              style={{ padding: "0.35em 1em", fontSize: "0.8rem", fontFamily: "var(--font-mono)", borderRadius: "9999px", border: "1px solid var(--border)", background: "transparent", color: "var(--text-muted)", cursor: "pointer" }}
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={saving || !form.title || !form.url}
              style={{ padding: "0.35em 1em", fontSize: "0.8rem", fontFamily: "var(--font-mono)", borderRadius: "9999px", border: "1px solid rgba(137,196,225,0.4)", background: "rgba(137,196,225,0.12)", color: saving ? "var(--text-dim)" : "var(--accent-ice)", cursor: saving ? "default" : "pointer" }}
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Tabs ──────────────────────────────────────────

type Tab = "Kit" | "Learning" | "Resources" | "Specs";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  {
    id: "Kit", label: "Kit",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  },
  {
    id: "Learning", label: "Learning",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  },
  {
    id: "Resources", label: "Resources",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/><path d="M8 10h8"/><path d="M8 14h6"/></svg>,
  },
  {
    id: "Specs", label: "Specs",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="8" x="5" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6 18h2"/><path d="M12 18h6"/></svg>,
  },
];

// ── Main component ────────────────────────────────

export default function Tools() {
  const { editMode, data } = useEdit();

  const [active, setActive] = useState<Tab>("Kit");
  const [hoveredId, setHoveredId] = useState<{ id: string; x: number; y: number } | null>(null);
  const [hoveredSpec, setHoveredSpec] = useState<{ spec: SpecItem; x: number; y: number } | null>(null);

  // Resource editor state
  const [localResources, setLocalResources] = useState<Resource[]>(() => data.resources.items as Resource[]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<ResourceForm>(BLANK_FORM);
  const [saving, setSaving] = useState(false);

  function handleFormChange(patch: Partial<ResourceForm>) {
    setForm(prev => ({ ...prev, ...patch }));
  }

  function startEdit(r: Resource) {
    setIsAdding(false);
    setEditingId(r.id);
    setForm({
      type: r.type,
      title: r.title,
      author: r.author,
      url: r.url,
      note: r.note ?? "",
      date: r.date,
      codeUrl: r.codeUrl ?? "",
      abstract: r.abstract ?? "",
      cover: r.cover ?? "",
    });
  }

  function startAdd() {
    setEditingId(null);
    setIsAdding(true);
    setForm(BLANK_FORM);
  }

  function cancel() {
    setEditingId(null);
    setIsAdding(false);
  }

  async function saveResource() {
    setSaving(true);
    const cleaned: Resource = {
      id: editingId ?? generateId(form.title),
      type: form.type,
      title: form.title,
      author: form.author,
      url: form.url,
      date: form.date,
      ...(form.note     ? { note: form.note }         : {}),
      ...(form.codeUrl  ? { codeUrl: form.codeUrl }   : {}),
      ...(form.abstract ? { abstract: form.abstract } : {}),
      ...(form.cover    ? { cover: form.cover }       : {}),
    };

    const newItems = isAdding
      ? [...localResources, cleaned]
      : localResources.map(r => r.id === editingId ? cleaned : r);

    setLocalResources(newItems);
    cancel();

    await fetch("/api/resources", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: newItems }),
    }).catch(console.error);

    setSaving(false);
  }

  async function deleteResource(id: string) {
    const newItems = localResources.filter(r => r.id !== id);
    setLocalResources(newItems);
    await fetch("/api/resources", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: newItems }),
    }).catch(console.error);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <IconTools />
          Tools
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>What I learn from, build with, and sit in front of.</p>
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
        {TABS.map(({ id, label, icon }) => {
          const isActive = id === active;
          return (
            <button
              key={id}
              onClick={() => setActive(id)}
              className="tab-btn"
              data-active={isActive}
              style={{
                padding: "0.35em 1em",
                borderRadius: "9999px",
                fontSize: "0.8125rem",
                fontFamily: "var(--font-mono)",
                fontWeight: isActive ? 500 : 400,
                letterSpacing: "0.02em",
                border: isActive ? "1px solid rgba(99,170,255,0.4)" : "1px solid var(--border)",
                background: isActive ? "linear-gradient(135deg, rgba(14,60,140,0.15) 0%, rgba(7,30,90,0.22) 100%)" : "transparent",
                color: isActive ? "#2563eb" : "var(--text-muted)",
                backdropFilter: isActive ? "blur(8px)" : undefined,
                WebkitBackdropFilter: isActive ? "blur(8px)" : undefined,
                boxShadow: isActive ? "0 0 10px rgba(147,197,253,0.08)" : undefined,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              {icon}{label}
            </button>
          );
        })}
      </div>

      {/* Kit — daily tools */}
      {active === "Kit" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
            The ones I use on a daily basis in work and study.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(8rem, 1fr))", gap: "0.75rem" }}>
            {dailyTools.map(tool => <IconCard key={tool.name} tool={tool} />)}
          </div>
        </div>
      )}

      {/* Learning */}
      {active === "Learning" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
          <div>
            <SectionLabel>Platforms</SectionLabel>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(8rem, 1fr))", gap: "0.75rem" }}>
              {learningPlatforms.map(tool => <IconCard key={tool.name} tool={tool} />)}
            </div>
          </div>
          <div>
            <SectionLabel>Certifications</SectionLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {["Associate Data Engineer in SQL — DataCamp", "Data Engineer in Python — DataCamp", "CISA — Coursera", "NLP in Python — DataCamp", "IBM Data Engineering — Coursera", "Business Analysis in IT — Beetroot Academy"].map(item => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </div>
          <div>
            <SectionLabel>Bootcamps</SectionLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              <Tag>Turing College — Data Science &amp; AI (Apr 2026)</Tag>
            </div>
          </div>
          <div>
            <SectionLabel>Special mentions</SectionLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              <Tag>3Blue1Brown — all things maths</Tag>
            </div>
          </div>
        </div>
      )}

      {/* Resources feed */}
      {active === "Resources" && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
            {localResources.map(r => {
              const tpal = typeColor[r.type] ?? typeColor["Article"];
              const rawId = r.url.includes("v=") ? r.url.split("v=")[1]?.split("&")[0] : r.url.split("/").pop()?.split("?")[0];
              const embedId = r.url.includes("youtu") ? rawId : null;
              return (
                <div
                  key={r.id}
                  className="card"
                  onMouseMove={r.note ? (e) => setHoveredId({ id: r.id, x: e.clientX, y: e.clientY }) : undefined}
                  onMouseLeave={r.note ? () => setHoveredId(null) : undefined}
                  style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", position: "relative" }}
                >
                  {/* Edit mode overlay buttons */}
                  {editMode && (
                    <div style={{ position: "absolute", top: "0.4rem", right: "0.4rem", zIndex: 10, display: "flex", gap: "0.25rem" }}>
                      <button
                        onClick={() => startEdit(r)}
                        title="Edit"
                        style={{ width: "1.5rem", height: "1.5rem", borderRadius: "50%", background: "rgba(137,196,225,0.2)", border: "1px solid rgba(137,196,225,0.4)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-ice)" }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                      </button>
                      <button
                        onClick={() => deleteResource(r.id)}
                        title="Delete"
                        style={{ width: "1.5rem", height: "1.5rem", borderRadius: "50%", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#f87171" }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                      </button>
                    </div>
                  )}

                  {/* Video embed */}
                  {embedId && (
                    <div style={{ width: "100%", borderRadius: "0.75rem 0.75rem 0 0", overflow: "hidden", aspectRatio: "16/9", background: "#000", flexShrink: 0 }}>
                      <iframe
                        src={`https://www.youtube.com/embed/${embedId}`}
                        title={r.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                      />
                    </div>
                  )}

                  {/* Book cover */}
                  {r.cover && (
                    <div style={{
                      width: "100%",
                      borderRadius: "0.75rem 0.75rem 0 0",
                      background: "linear-gradient(160deg, rgba(14,40,90,0.15) 0%, rgba(7,20,60,0.22) 100%)",
                      borderBottom: "1px solid rgba(137,196,225,0.15)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "1.25rem 1rem",
                      flexShrink: 0,
                    }}>
                      <img
                        src={r.cover}
                        alt={r.title}
                        style={{
                          width: "110px",
                          borderRadius: "0.25rem",
                          boxShadow: "0 8px 24px rgba(10,30,80,0.25), 0 2px 6px rgba(10,30,80,0.15)",
                          display: "block",
                        }}
                      />
                    </div>
                  )}

                  {/* Paper / Article header */}
                  {!embedId && !r.cover && (
                    <div style={{
                      width: "100%",
                      borderRadius: "0.75rem 0.75rem 0 0",
                      padding: "1.25rem 1.125rem 1rem",
                      background: "repeating-linear-gradient(to bottom, transparent 0, transparent calc(1.5rem - 1px), rgba(137,196,225,0.1) calc(1.5rem - 1px), rgba(137,196,225,0.1) 1.5rem), linear-gradient(160deg, rgba(14,40,90,0.18) 0%, rgba(7,20,60,0.25) 100%)",
                      backgroundSize: "100% 1.5rem, 100% 100%",
                      backgroundPositionY: "0.75rem, 0",
                      borderBottom: "1px solid rgba(137,196,225,0.15)",
                      flexShrink: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}>
                      <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.4, margin: 0 }}>{r.title}</p>
                      {r.abstract && (
                        <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>{r.abstract}</p>
                      )}
                      {r.codeUrl && (
                        <a href={r.codeUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "var(--accent-ice)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.25rem", width: "fit-content" }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                          author&apos;s blog ↗
                        </a>
                      )}
                    </div>
                  )}

                  {/* Info row */}
                  <div style={{ padding: "0.625rem 0.875rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", padding: "0.15em 0.5em", borderRadius: "0.2rem", background: tpal.bg, color: tpal.text, border: `1px solid ${tpal.border}`, flexShrink: 0 }}>
                        {r.type}
                      </span>
                      <span style={{ fontSize: "0.65rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)", flexShrink: 0 }}>{r.author} · {r.date}</span>
                    </div>
                    <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--text-primary)", textDecoration: "none", lineHeight: 1.4 }}>
                      {r.type === "Paper" ? `arxiv: ${r.url.split("/").pop()} ↗` : `${r.title} ↗`}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Editor panel — dev only */}
          {editMode && (
            <ResourceEditorPanel
              items={localResources}
              editingId={editingId}
              isAdding={isAdding}
              form={form}
              saving={saving}
              onFormChange={handleFormChange}
              onEdit={startEdit}
              onDelete={deleteResource}
              onStartAdd={startAdd}
              onSave={saveResource}
              onCancel={cancel}
            />
          )}
        </>
      )}

      {/* Specs */}
      {active === "Specs" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem" }}>
          {specs.map(spec => (
            <SpecCard
              key={spec.label}
              spec={spec}
              onMouseMove={e => setHoveredSpec({ spec, x: e.clientX, y: e.clientY })}
              onMouseLeave={() => setHoveredSpec(null)}
            />
          ))}
        </div>
      )}

      {/* Spec info popup */}
      {hoveredSpec?.spec.info && (
        <div style={{
          position: "fixed",
          left: hoveredSpec.x + 16,
          top: hoveredSpec.y + 16,
          width: "18rem",
          zIndex: 9999,
          pointerEvents: "none",
          borderRadius: "0.6rem",
          background: "linear-gradient(135deg, rgba(200,220,245,0.55) 0%, rgba(210,215,255,0.45) 50%, rgba(200,195,255,0.5) 100%)",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          border: "1px solid rgba(200,220,255,0.45)",
          boxShadow: "0 8px 32px rgba(100,140,255,0.1), inset 0 1px 0 rgba(255,255,255,0.6)",
          overflow: "hidden",
        }}>
          <div style={{ padding: "0.625rem 0.875rem 0.5rem", borderBottom: "1px solid rgba(137,196,225,0.2)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(100,130,200,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="14" height="8" x="5" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6 18h2"/><path d="M12 18h6"/>
            </svg>
            <span style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", color: "rgba(80,110,180,0.8)", letterSpacing: "0.09em", textTransform: "uppercase" }}>
              {hoveredSpec.spec.value}
            </span>
          </div>
          <div style={{ padding: "0.375rem 0" }}>
            {hoveredSpec.spec.info.map((row, idx) => (
              <div key={idx} style={{ display: "flex", gap: "0.75rem", padding: "0.3rem 0.875rem", alignItems: "baseline" }}>
                <span style={{ fontSize: "0.58rem", fontFamily: "var(--font-mono)", color: "rgba(100,130,200,0.6)", textTransform: "uppercase", letterSpacing: "0.07em", flexShrink: 0, width: "4rem" }}>
                  {row.label}
                </span>
                <span style={{ fontSize: "0.75rem", color: "rgba(30,40,80,0.85)", lineHeight: 1.45 }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hover note — retro window panel */}
      {hoveredId && localResources.find(r => r.id === hoveredId.id)?.note && (
        <div style={{
          position: "fixed",
          left: hoveredId.x + 16,
          top: hoveredId.y + 16,
          maxWidth: "22rem",
          minWidth: "14rem",
          zIndex: 9999,
          pointerEvents: "none",
          borderRadius: "7px",
          overflow: "hidden",
          border: "1.5px solid rgba(167, 139, 250, 0.55)",
          boxShadow: "0 12px 36px rgba(124, 58, 237, 0.18), 0 2px 8px rgba(0,0,0,0.1)",
        }}>
          {/* Titlebar */}
          <div style={{
            background: "linear-gradient(135deg, #6d28d9 0%, #a78bfa 55%, #c084fc 100%)",
            padding: "0.3rem 0.45rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.5rem",
          }}>
            {/* Icon + filename */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              <span style={{
                fontSize: "0.6rem",
                fontFamily: "var(--font-mono)",
                color: "rgba(255,255,255,0.92)",
                letterSpacing: "0.04em",
              }}>
                my_note.txt
              </span>
            </div>
            {/* Window controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
              {["─", "□"].map((glyph) => (
                <span key={glyph} style={{
                  width: "13px", height: "13px",
                  background: "rgba(255,255,255,0.18)",
                  border: "1px solid rgba(255,255,255,0.28)",
                  borderRadius: "2px",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.45rem", color: "rgba(255,255,255,0.85)",
                  lineHeight: 1,
                }}>{glyph}</span>
              ))}
              <span style={{
                width: "13px", height: "13px",
                background: "rgba(239,68,68,0.65)",
                border: "1px solid rgba(220,38,38,0.45)",
                borderRadius: "2px",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.45rem", color: "rgba(255,255,255,0.95)",
                fontWeight: 700, lineHeight: 1,
              }}>✕</span>
            </div>
          </div>

          {/* Body */}
          <div style={{
            background: "repeating-linear-gradient(to bottom, transparent 0, transparent calc(1.45rem - 1px), rgba(167,139,250,0.09) calc(1.45rem - 1px), rgba(167,139,250,0.09) 1.45rem), linear-gradient(180deg, rgba(250,248,255,0.98) 0%, rgba(245,242,255,0.98) 100%)",
            backgroundSize: "100% 1.45rem, 100% 100%",
            padding: "0.55rem 0.75rem 0.65rem",
          }}>
            {/* Code-style comment prefix */}
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "rgba(124, 58, 237, 0.45)",
              marginBottom: "0.3rem",
              letterSpacing: "0.02em",
            }}>
              {`// personal annotation`}
            </div>
            {/* Note text */}
            <div style={{
              fontSize: "0.775rem",
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              fontFamily: "var(--font-sans)",
            }}>
              {localResources.find(r => r.id === hoveredId.id)!.note}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
