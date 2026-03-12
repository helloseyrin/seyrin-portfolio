# Portfolio Style Guide

Reference document for design decisions, tokens, and component conventions used across the site.

---

## Aesthetic

**Frutiger Aero / Ami Mizuno** — clean, luminous, water-toned. Light background with glassmorphism cards, subtle blue-ice accents, monospace type for code/tags. Not sterile, not maximalist. The feeling: professional but alive.

---

## Color Tokens

Defined in `app/globals.css` `:root`.

| Token | Value | Use |
|---|---|---|
| `--bg` | `#f2f6fb` | Page background |
| `--bg-card` | `rgba(255,255,255,0.22)` | Glass card fill |
| `--bg-hover` | `rgba(232,238,248,0.7)` | Hover state fills |
| `--bg-deep` | `rgba(234,240,248,0.6)` | Callout backgrounds |
| `--border` | `#ccd8ea` | Default border |
| `--border-hover` | `#8aaac8` | Hovered/active border |
| `--border-active` | `#18181b` | Focused input border |
| `--text-primary` | `#18181b` | Headings, strong copy |
| `--text-secondary` | `#52525b` | Body text |
| `--text-muted` | `#71717a` | Supporting text |
| `--text-dim` | `#a1a1aa` | Faint labels |
| `--text-accent-2` | `#2563eb` | Accent blue (badges) |
| `--accent-ice` | `#89c4e1` | Shimmer / glow start |
| `--accent-aqua` | `#4a9ebe` | Shimmer / glow mid |
| `--accent-periwinkle` | `#c5d8f0` | Shimmer / glow end |

### Gradient — blue→lavender

Used on interactive text elements (tag pills, links, contact pills) on hover.

```css
background: linear-gradient(90deg, #8aaac8, #a78bfa);
-webkit-background-clip: text;
background-clip: text;
color: transparent;
```

Stops: `#8aaac8` (steel blue) → `#a78bfa` (soft lavender/violet).

---

## Typography

| Role | Font | Weight | Size |
|---|---|---|---|
| Body | Fira Sans | 300 | 0.9375rem |
| H1 | Fira Sans | 500 | 3rem |
| H2 | Fira Sans | 400 | 2.25rem |
| H3 | Fira Sans | 500 | 1.125rem |
| Tags / pills | Fira Code | 400 | 0.78rem |
| Code / mono | Fira Code | — | 0.875rem |

Font variables: `--font-sans`, `--font-mono` (loaded via Next.js `next/font`).

---

## Spacing

8px grid. Custom properties:

| Token | Value |
|---|---|
| `--space-1` | 0.5rem (8px) |
| `--space-2` | 1rem (16px) |
| `--space-3` | 1.5rem (24px) |
| `--space-4` | 2rem (32px) |
| `--space-5` | 2.5rem (40px) |
| `--space-6` | 3rem (48px) |
| `--space-8` | 4rem (64px) |

---

## Components

### Glass Card — `.card`

```css
background: rgba(255,255,255,0.22);
backdrop-filter: blur(20px) saturate(140%);
border: 1px solid rgba(255,255,255,0.45);
box-shadow: inset 0 1px 0 rgba(255,255,255,0.6), 0 4px 24px rgba(10,40,100,0.08);
border-radius: 0.75rem;
```

Hover: `background` → `rgba(255,255,255,0.32)`, border → `rgba(147,197,253,0.4)`.

### Tag Pill — `.tag-pill`

Transparent pill with Fira Code, rounded full, light blue border. On hover: blue→lavender gradient text.

Used via `<Tag>` component (`components/Tag.tsx`).

### Inline Link — `.link-prose`

Fira Code, muted base color, subtle bottom border. On hover: gradient text fill + gradient underline expands to full width.

```css
background: linear-gradient(90deg, #8aaac8, #a78bfa);
background-size: 0% 1.5px;
background-position: 0 100%;
/* hover: background-size: 100% 1.5px, 100%; */
```

### Code Tag — `.tag`

Dark navy background, teal text. Used for inline `<code>`-style tags in content.

```css
background: linear-gradient(135deg, #0f1e3a 0%, #0a2a4a 60%, #0d3060 100%);
color: #7ecfef;
border: 1px solid #1a4a7a;
```

### Sidebar shimmer — `.sidebar-shimmer`

1px right-edge border on sidebar, animates a gradient wash downward over 5s. Ice → periwinkle → aqua.

---

## Animations

| Name | Description | Duration |
|---|---|---|
| `blink` / `cursor-blink` | Typewriter cursor blink | 530ms step-end |
| `letter-float` | Vertical float wave (removed from hero, reserved) | 3s ease-in-out |
| `fade-up` | Entrance: opacity 0→1, translateY 10→0 | — |
| `blob-1/2/3` | Background blob drift | 18–22s |
| `synapse-pulse` | Glow pulse on neural network nodes | — |
| `neuron-fire` | Node fire burst | — |
| `synapse-bump` | Node scale bump on fire | — |
| `shimmer-down` | Sidebar border wash | 5s linear |
| `glitter-fall` | Particle fall effect | — |

---

## Content Tone

- Direct, first-person, not performative.
- No corporate-speak. Not "delivering actionable insights" unironically.
- Definitions over declarations — describe what something is, not your stance on it.
- Technical but readable. Code terms inline when precise (e.g. `RAG`, `ELT`).
- Fira Code for any inline technical identifiers even in prose context.

---

## Edit Mode

`Ctrl+Shift+E` toggles inline edit mode. Editable fields are backed by JSON files in `/data/`. Changes POST to `/api/save` (dev only) and update JSON on disk.

Path syntax for `<Editable>`: dot notation with `[id=slug]` for keyed arrays, `[n]` for indexed.

---

## File Conventions

| Path | Purpose |
|---|---|
| `app/globals.css` | All tokens, base styles, keyframes, utility classes |
| `components/Tag.tsx` | Single-purpose tag pill wrapper |
| `components/Editable.tsx` | Inline edit-mode field |
| `contexts/EditContext.tsx` | Global edit state + data store |
| `data/*.json` | Content source of truth |
| `public/` | Static assets (images, PDFs, GIFs) |
