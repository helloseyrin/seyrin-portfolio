# Frontend Lessons Learned

## Layout

### L001 — Always verify layout with screenshots before marking done
- Never assume `ml-X` + fixed sidebar works without visual confirmation

### L002 — Tailwind v4: use inline styles for critical layout values
- `flex: 1` in Tailwind v4 doesn't reliably subtract margins in flex-row contexts
- For sidebar width + content offset: use explicit inline `style={{ marginLeft: "15rem" }}`
- Export a `SIDEBAR_WIDTH` constant and use it in BOTH sidebar and layout

### L003 — Copy exact HTML structure from reference, don't improvise
- Always curl the actual page source, never rely on WebFetch summaries
- amankumar.ai pattern: outer body has sidebar fixed, content wrapper has `marginLeft` = sidebar width

### L004 — Separate pages, not anchor scroll
- amankumar.ai uses Next.js routes (/stack, /projects etc), not anchor hash links
- Sidebar uses usePathname() for active state, not IntersectionObserver

### L005 — Design system first
- Use CSS custom properties (--space-*, --text-*, --bg-*) before writing any component
- All spacing on 8px grid: 8, 16, 24, 32, 40, 48, 64px
- Typography: h1=2rem/500, h2=1.5rem/500, body=0.9375rem/300, small=0.875rem

## Content

### C001 — Values: OpenAI objection is specific, not a blanket anti-proprietary stance
- I use Anthropic (proprietary) consciously because of genocide non-compliance
- The OpenAI objection is specifically about #QuitGPT movement and documented harm compliance
- Keep these as TWO separate value cards, not conflated into one callout

### C002 — Rename Experience → Stack
- Section is framed as "Stack" rather than "Experience" — skills, tools, and CV history over a traditional employment timeline

### C003 — Tools section is a first-class nav item
- Separate from projects, shows languages/ML/NLP/infra/workflow categories

### C004 — Never add content that wasn't asked for
- Do NOT add explanatory text, callout boxes, or editorial opinions to my content
- Do NOT expand or rephrase my original wording
- Only modify content when explicitly instructed to
- Hyperlinks to definitions: add only when asked, not proactively

### C005 — Use full-replace endpoints alongside path-patch endpoints when arrays need add/delete
- The `/api/save` route uses path-based `setByPath` mutations — adequate for editing a single field
- Adding/deleting array items needs a full-replace endpoint (e.g. `/api/resources`)
- Keep the two concerns separate rather than building a generic mutation API

### C006 — Discriminated unions over optional-field flat objects for multi-type tooltip data
- Use `kind: "cert" | "experience" | "project"` as a discriminated union for `SkillSource`
- Gives TypeScript full narrowing per branch — no optional property checks needed
- Safer and more readable than a flat object with fields that may or may not be present

### C007 — CSS var() chain across `:root`/`body` scope can silently fall back
- `--font-mono: var(--font-fira-code)` in `:root` silently fails when `--font-fira-code` is only set on `body` via a Next.js font class
- Fix: reference font vars directly at every use site: `font-family: var(--font-fira-code), "Fira Code", monospace`
- Never route through an intermediate token for Next.js font variables

### C008 — coverWord pattern: separate presentational metadata from semantic metadata
- `coverWord` frontmatter field: purely for the cover image watermark, never shown in tag lists
- Tags are semantic descriptors only (e.g. `["self-teaching", "education"]`)
- Display-only words (like "autodidactism") belong in `coverWord`, not `tags`

## Style Guide

### S001 — Font system: exactly two typefaces
- **Outfit** (300–600, sans-serif): all body text, headings, prose
- **Fira Code** (400–500, monospace): ALL mono contexts — tags, code, meta rows, entry prose, notepad titlebars, timestamps, nav slugs
- Never add a third font. No system-ui, no ui-sans-serif, no Inter, no Space Mono.
- Reference Next.js font vars directly: `font-family: var(--font-fira-code), "Fira Code", monospace`
- Do NOT use `--font-mono` as an intermediary — it fails to resolve across `:root`/`body` scope in Turbopack

### S002 — Tag gradient hover effect: universal pattern
All interactive label/tag/tab elements must use this hover pattern:
```css
background: linear-gradient(90deg, #8aaac8, #a78bfa);
-webkit-background-clip: text;
background-clip: text;
color: transparent;
box-shadow:
  0 0 0 1px rgba(137, 196, 225, 0.2),
  0 0 14px rgba(137, 196, 225, 0.3),
  0 0 28px rgba(137, 196, 225, 0.12);
```
Applies to: `.tag-pill:hover`, `.tab-btn:not([data-active="true"]):hover`
Use the shared `<Tag>` component (`components/Tag.tsx` → `.tag-pill`) for all pill tags.
Never use inline `<span>` with custom styles for tags — always use `<Tag>`.

### S003 — Color palette (dark purple text system)
- `--text-primary: #1e103c` — headings, strong text
- `--text-secondary: #3d2f5f` — body, prose
- `--text-muted: #5e5070` — meta, timestamps, captions
- `--text-dim: #7d728e` — placeholders, decorative text
- Gradient accent: `#8aaac8 → #a78bfa` (ice → lavender)
- Never use pure black (`#000`) or near-black (`#111`) for text — always use dark purple tokens

### S004 — Glassmorphic card system
Standard glass card pattern:
```css
background: rgba(255, 255, 255, 0.22);
border: 1px solid rgba(167, 139, 250, 0.25);
backdrop-filter: blur(12px) saturate(140%);
box-shadow: 0 8px 32px rgba(109, 40, 217, 0.08), inset 0 1px 0 rgba(255,255,255,0.5);
border-radius: 12px;
```
Notebook/notepad variant: stronger purple border (`rgba(167,139,250,0.4)`), deeper blur (24px).

### S005 — Page header consistency
Every section page must use:
```tsx
<h1 style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
  <IconXxx /> Section Title
</h1>
```
Where `IconXxx` is a `GradientIcon` variant from `components/GradientIcon.tsx`.
Never use a plain `<h1>` without an icon on section pages.
