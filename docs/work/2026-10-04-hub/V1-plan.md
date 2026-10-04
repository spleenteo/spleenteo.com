# V1 — Skeleton: Astro, tokens, frame sections — Implementation Plan

> **For agentic workers:** execute with superpowers:subagent-driven-development. Task level: the implementer reads the code and the spec.

**Goal:** an Astro static site at the repo root rendering Nav, Hero, an empty Contraptions section (List Header only), About and Footer, matching the design at 390 and 1440.
**Architecture:** one page (`src/pages/index.astro`) composed of one `.astro` component per section. Copy lives in a typed data module, reused by V2. Plain CSS: tokens as custom properties, scoped `<style>` in each component, mobile-first, one breakpoint.
**Tech stack:** Astro 7 (latest 7.x, needs Node ≥ 22.12), TypeScript **^6** (`@astrojs/check` 0.9.x rejects TS 7), strict, `@astrojs/check`, npm. No UI framework, no Tailwind.
**Spec:** `docs/work/2026-10-04-hub/design-spec.md` (measures) + `content/copy.md` (texts, which win over the design) + `slices.md` § V1.

## Global constraints

- Dark theme only. No `prefers-color-scheme` branches, no light tokens.
- No entrance animations or transitions.
- Fonts come from Google Fonts via `<link>` with `preconnect` and `display=swap`: Bricolage Grotesque 700;800, Instrument Sans 400, Fragment Mono 400.
- Breakpoint: mobile styles by default; desktop at `@media (min-width: 960px)`.
- Side gutter: 24px on mobile, 64px on desktop, as `--gutter`.
- No horizontal page scroll at any width ≥ 320. The page wrapper uses `overflow-x: clip`, never `overflow: hidden` on `body`/`html`.
- Text copied verbatim from `content/copy.md`, `·` and `→` included. Uppercase is written in the string, never `text-transform`.
- Nothing environment-specific or secret in the repo. `astro.config.mjs` has `site: 'https://spleenteo.com'`.
- No images in V1 (V2 brings them in, via `astro:assets`).
- Assumption to confirm with the user: `<title>Contraptions — spleenteo.com</title>` (not in `copy.md`).
- Gate: `npm run check` (astro check) and `npm run build` green, with zero errors and zero warnings from `astro check`.

## Review focus

1. Hero title at every width. "Contraptions" is about 5.4× its font size wide, and at 64px it is already 346px against 342 available at 390. Two clamps: mobile `clamp(44px, 16vw, 64px)` (deliberately ≤ 64px, as in the spec); desktop (≥ 960) `clamp(64px, 12.8vw, 184px)`. Letter-spacing in `em` (−0.033em). Check at 320, 390, 960 and 1100 for no overflow, and don't count on `clip` to hide one.
2. 320px width: the hero title (see 1) and the Nav (brand + three links at gap 16) must not overflow. Allow the links to wrap or shrink the gap; check with no horizontal scroll.
3. Fonts not loaded yet or blocked: the fallback stacks (`system-ui, sans-serif` and `ui-monospace, monospace`) keep the layout readable.
4. Anchors `#contraptions` and `#about` land on the right sections (ids present, no sticky offset needed).
5. The `mailto:` and external links: GitHub opens in the same tab (no `target` needed), and none of them is a `<button>` or a `<div>` with a click handler.

---

### T1: Scaffold Astro + tokens + base layout
**Files:** create `package.json` (scripts `dev`, `build`, `preview`, `check`), `astro.config.mjs`, `tsconfig.json` (extends `astro/tsconfigs/strict`), `src/styles/tokens.css`, `src/styles/global.css`, `src/layouts/Base.astro`, `src/pages/index.astro` (temporary placeholder `<main>`).
**Does:** write the files by hand (no interactive `npm create`) and run `npm install astro @astrojs/check typescript@^6`.
- `tokens.css`: every token in the spec table as `--bg`, `--bg-raised`, `--ink`, `--ink-dim`, `--line`, `--acc-quadra` … `--acc-condates`, `--slot-border: #3A3A3A`, `--dot-trama: #2EE59D`, `--on-accent: #0A0A0A`, `--font-head/body/mono` with fallback stacks, `--gutter`.
- `global.css`: a minimal reset, `body { background: var(--bg); color: var(--ink); font-family: var(--font-body); }`, links inheriting colour with a visible `:focus-visible` outline, and a `.mono-label` utility (mono 13px, letter-spacing 0.5px, `--ink-dim`).
- `Base.astro`: `<html lang="en">`, charset, viewport, `<title>Contraptions — spleenteo.com</title>`, meta description = the hero lede, `theme-color #0A0A0A`, `color-scheme: dark`, the font `<link>`s, the global CSS, and a `<div class="page">` wrapper with `overflow-x: clip` around `<slot />`.
**Interfaces produced:** `Base.astro` (props: none); CSS custom properties as named above; the class `.mono-label`.
**Verify:** `npm run check` and `npm run build` green, `dist/index.html` present.
**critical** (everything else builds on it).

### T2: Content data module
**Files:** create `src/data/site.ts`.
**Does:** export typed constants with all the copy from `content/copy.md`: `nav` (brand, links with `href`), `hero` (kicker, title, lede, byline), `listHeader` (title, count), `contraptions: Contraption[]` (index "01"…"05", name, kind, oneLiner, why, meta, href, `repo?`, `accent: 'quadra'|'maestro'|'devflow'|'datobar'|'condates'`, `mark?: 'quadra'|'maestro'`), `madeForMe` (header, items with name, desc, `icon?: 'slacky'`, `dot?: string`), `slot` (kicker, note), `about` (kicker "ABOUT", text, contacts with label and href: `ciao@spleenteo.com →` → `mailto:ciao@spleenteo.com`, `github.com/spleenteo →` → `https://github.com/spleenteo`; no x.com), `footer` (left, right). Slacky's description stays exactly "… Private, runs my week." (the `[CHECK]` marker is not in the string; leave a `// [CHECK] "runs my week" — to be confirmed by Matteo` comment beside it).
**Interfaces produced:** the exported names and the `Contraption` type above. V2 consumes `contraptions`, `madeForMe` and `slot` unchanged.
**Verify:** `npm run check` green. Compare the strings against `copy.md` by hand.
**depends on:** T1.

### T3: Nav + Hero
**Files:** create `src/components/Nav.astro` and `src/components/Hero.astro`; modify `src/pages/index.astro`.
**Does:** the Nav and Hero from the spec (§ Nav, § Hero), mobile and desktop, including the five-swatch Accent Strip (it uses the accent tokens). Hero title with the two `clamp()`s from Review focus 1. Nav links per `nav` in `site.ts`.
**Verify:** gate green; `npm run preview`, then at 390 and 1440 compare against the spec measures; at 320 no horizontal scroll.
**depends on:** T1, T2.

### T4: List Header + About + Footer
**Files:** create `src/components/ListHeader.astro`, `src/components/About.astro`, `src/components/Footer.astro`; modify `src/pages/index.astro`.
**Does:** `<section id="contraptions">` containing only `ListHeader` (V2 adds the rows inside it); `<section id="about">` on `--bg-raised` with the kicker/body two-column layout on desktop and stacked on mobile, contacts as `<a>` with " →"; a `<footer>`. Measures from the spec (§ Contraptions list header, § About, § Footer). Leave a clearly named empty spot in `index.astro` between Contraptions and About for V2's Made for me and Slot.
**Verify:** gate green; at 390 and 1440 compare against the spec; the `mailto:` and GitHub links work; `#about` anchor works.
**depends on:** T1, T2. **Parallel with T3.** Both touch `index.astro`: T3 adds `<Nav/><Hero/>` above `<main>`'s sections, T4 adds the sections. The merge is trivial; the second one to land rebases.

## Close (in session, not a task)

The Done of V1 from `slices.md`: gate green, plus screenshots of `npm run preview` at 1440, 960, 390 and 320 compared against the Pencil boards, with no horizontal scroll at any of them.
