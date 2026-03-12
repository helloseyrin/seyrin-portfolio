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
- User uses Anthropic (proprietary) consciously because of genocide non-compliance
- The OpenAI objection is specifically about #QuitGPT movement and documented harm compliance
- Keep these as TWO separate value cards, not conflated into one callout

### C002 — Rename Experience → Stack
- User doesn't have formal work experience, framing as "Stack" + CV history is more accurate

### C003 — Tools section is a first-class nav item
- Separate from projects, shows languages/ML/NLP/infra/workflow categories

### C004 — Never add content that wasn't asked for
- Do NOT add explanatory text, callout boxes, or editorial opinions to user-authored content
- Do NOT expand or rephrase the user's original wording
- Only modify content when explicitly instructed to
- Hyperlinks to definitions: add only when asked, not proactively
