# V2 — The contraptions, "made for me" and the slot — Implementation Plan

> **For agentic workers:** execute with superpowers:subagent-driven-development. Task level: the implementer reads the code and the spec.

**Goal:** the five contraption rows (rotated, bleeding panels on desktop; straight panels in a column on mobile), "Made for me" and the empty slot, all from `src/data/site.ts`, so the local build meets the full Done of the brief.
**Architecture:** `ContraptionRow.astro` renders one row (panel + text) from a `Contraption`; `Panel.astro` renders the coloured panel (index, optional mark). Images are imported from `design/assets/` and rendered with `astro:assets` `<Image>`. Desktop geometry lives in one place, expressed in a scale unit.
**Tech stack:** Astro 7.3.5, TS 6, plain scoped CSS (as in V1).
**Spec:** `design-spec.md` § Contraptions, § Made for me, § Slot, § Assets, § Open points + `content/copy.md` + `slices.md` § V2 (including gotchas) + `lessons.md`.

## Global constraints

- Everything from V1 still holds: dark only, no animations or transitions, tokens only, breakpoint `@media (min-width: 960px)`, `--gutter`, `overflow-x: clip` on `.page` only, verbatim copy, gate `npm run check` 0/0/0 + `npm run build`.
- Images: only through `astro:assets` (`import x from '../../design/assets/…'` + `<Image>`), with `alt` text = the product name + " icon". The Slacky dot is decorative (`alt=""`). One `<Image>` per mark: `width={240} densities={[1, 2]}`, sized by CSS (240·k on desktop, `min(120px, 34vw)` on mobile). Slacky: `width={28} densities={[1, 2]}`. Task 1 proves first that importing from `design/assets/` works in `astro build`; if it doesn't, copy the three files to `src/assets/` and say so.
- Row order and sides on desktop: 01, 03, 05 panel left at −10°; 02, 04 panel right at +10°.
- Desktop panel: 780×500 at k = 1, accent fill, `overflow: hidden`, rotated around its centre. The centre of the rotated box sits 287.5·k from the page edge it bleeds out of, so the box's outer corner is about 140·k past the edge. Row height 660·k, 140·k between rows, 140·k from the List Header to the first row, about 160·k after the last row.
- Scale unit, desktop only: `--k: calc(min(100vw, 1440px) / 1440)`. It is a **length** (1px at 1440): write every dimension as `calc(300 * var(--k))`, never `* 1px`. Panel geometry and row spacing use it; text sizes don't. In the notation below, "N·k" means `calc(N * var(--k))`. Above 1440 the panels still touch the viewport edges, and the text column follows a centred 1440 container (its outer edge at `max(64px, (100vw − 1440px)/2 + 64px)`). Between 960 and 1440 the text column takes the remaining space (width ≤ 565px, ≥ 64px from the edge, ≥ 48px clear of the panel's visible box).
- Panel contents (unrotated coordinates × k): Index Bricolage 800, 300·k, letter-spacing −0.047em, line-height 1, colour `--on-accent`, top −40·k. Left-panel rows: left 190·k. Right-panel rows: left 300·k. Mark 240·k square, radius 54·k, shadow `0 20px 50px #00000055`. Quadra mark at (480, 200)·k, Maestro mark at (70, 220)·k. **No Panel Label anywhere** (open point 1, recommendation).
- Mobile panel: full width, height 220, Index 140px, letter-spacing −6px, at (20, −18). Mark `min(120px, 34vw)` square (it must not overlap the index at 320), radius 28, at right 22px / top 70. Panel first, then text (DOM order = panel, text on every row; desktop order via CSS only).
- Text block and Meta Row: exact sizes from the spec. Kind and Link use the card accent (`--acc-<accent>`). Contrast is already computed (see Close). Meta Row: `flex-wrap: wrap`, gap 8px 24px; the links group (`linkLabel` → `href`, then "repo →" → `repo` when present) stays right-aligned on desktop and stacks under `meta` on mobile.
- Long link labels wrap (`overflow-wrap: anywhere`) and never push the page wider.
- User decisions (2026-10-04): no Panel Label on any panel, Quadra included; main link + "repo →"; Condates label shortened to `datocms.com/marketplace →`; no x.com.
- Verification tool: a CDP script (Chrome headless, `Emulation.setDeviceMetricsOverride`, `Runtime.evaluate`, `Page.captureScreenshot`) **outside the repo**, whose path the controller gives at dispatch. Never `--window-size` below 500. Whoever starts `astro preview` runs `npx astro preview stop` before reporting.

## Review focus

1. Widths 960, 1100, 1440 and 1920, measured with `getBoundingClientRect` (`scrollWidth` alone proves nothing under `clip`): each panel's rotated box goes ≤ −130·k past its viewport edge; the text block keeps ≥ 48px from the panel's box and ≥ 64px (or the 1440-container edge) from the opposite edge; at 1440 the text starts at x≈811 (left-panel rows) or x=64 (right-panel rows).
2. Mobile 320 and 390: panels straight, full width, index not clipped on the left (it may bleed off the top as in the design), mark and index don't overlap (compare rects), long labels wrap.
3. Keyboard: every link in the rows is a real `<a>`, focus outline visible over the accent colours (outline in `--ink`, offset ≥ 2px).
4. Anchors: `#contraptions` still lands on the List Header after the rows are added.
5. Missing image or wrong path breaks the build rather than rendering a broken image (static import guarantees it, so check that no `src="…"` string paths are used).

---

### Task 1: Contraption rows (critical)
**Files:** create `src/components/ContraptionRow.astro`, `src/components/Panel.astro`; modify `src/pages/index.astro` (render `contraptions.map(...)` in place of the V2 comment inside `#contraptions`, plus section bottom spacing).
**Does:** everything in Global constraints about rows, panels, marks, text block, Meta Row (main link + "repo →").
**Verify:** gate green; with the CDP script, Review focus 1–2 by rects at 320, 390, 960, 1100, 1440, 1920, plus screenshots at 390 and 1440 checked against `design-spec.md`. Report the numbers.
**depends on:** —

### Task 2: Made for me + Slot
**Files:** create `src/components/MadeForMe.astro`, `src/components/Slot.astro`; modify `src/pages/index.astro` (in place of the V2 comment between `#contraptions` and About).
**Does:** spec § Made for me (Slacky icon via `<Image>`, Trama dot with the `--dot-trama` token (the data's `dot` value is the same colour; drop that field if it's unused), neither with a link, header as `<h2>` mono label) and § Slot (box border `--slot-border`, radius 2, kicker + note). Mobile and desktop.
**Verify:** gate green; same width checks as Task 1; Slacky text reads exactly "… Private, runs my week."
**depends on:** Task 1 (same file `index.astro`, sequential).

### Task 3: Nav on one line + label decisions
**Files:** modify `src/components/Nav.astro`, `src/data/site.ts`.
**Does:** keep the Nav on one line from 390 up (reduce the mobile link gap to 12px and/or the brand letter-spacing to 0, whichever fits with the real font; wrapping still allowed below 390). In `site.ts`: Condates `linkLabel` → `datocms.com/marketplace →` (the user's decision; `href` unchanged).
**Verify:** gate green; at 390 the Nav is one line (brand and links share a top); at 320 no horizontal scroll.
**depends on:** — (runs after Task 2 anyway: one implementer at a time).

## Close (in session)

- The Done of V2. The local build shows the five cards, Made for me, the slot, and About with ciao@spleenteo.com.
- Link check: every URL in `content/copy.md` appears as an `href` in `dist/index.html` (grep script).
- The contrast table below is copied into `slices.md` under "V2 — done on …".
- Contrast table, computed during planning, WCAG 2.x. All pairs pass AA for normal text (≥ 4.5):

| Pair | Ratio |
|---|---|
| Quadra `#2F7BFF` ↔ `#0A0A0A` (Kind/Link on bg, Index on panel) | 5.09 |
| Maestro `#FFB000` ↔ `#0A0A0A` | 10.81 |
| devflow `#C6FF3D` ↔ `#0A0A0A` | 16.76 |
| Dato bar `#FF3D8B` ↔ `#0A0A0A` | 5.93 |
| Condates `#9D7BFF` ↔ `#0A0A0A` | 6.33 |
| `ink-dim` on `bg` / on `bg-raised` | 6.79 / 6.31 |
