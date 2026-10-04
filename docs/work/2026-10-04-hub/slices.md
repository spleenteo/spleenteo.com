# Slices — hub

The high-level plan. Each slice has its own detailed plan (`V<n>-plan.md`), written when the slice comes up.

Common sources: `design-spec.md` (from the `.pen`), `content/copy.md` (texts and links, which win over the design), `design/assets/`.

Constraints that apply to every slice:
- One static page, contents in the code (no CMS), dark theme only.
- Fonts from Google Fonts: Bricolage Grotesque, Instrument Sans, Fragment Mono.
- No entrance animations (deferred).
- Images go through `astro:assets`.
- No secrets and nothing tied to the local environment in the repo (`.dev.vars`, `.wrangler/`, `.claude/` are ignored).
- Gate: `astro check` and `astro build` green.

## V1 — Skeleton: Astro, tokens, frame sections

**In**: Astro project at the repo root, static output. CSS tokens from `design-spec.md` as custom properties. Google Fonts. Nav, Hero (with the Accent Strip), About (`bg-raised`, contacts ciao@spleenteo.com as `mailto:` and GitHub), Footer, desktop and mobile. An empty `#contraptions` section with only its List Header. Text in a data module (`src/data/` or similar) shared with V2.

**Out**: the five cards, "made for me", the slot, deploy.

**Done**: `astro check` and `astro build` green. The `dist/` page at 1440 and at 390 matches the design for Nav, Hero, About and Footer. No horizontal scroll at 390. The Nav links to `#contraptions`, `#about` and GitHub work.

**Gotchas**: the 184px title at intermediate widths, which needs a `clamp()`. The fonts' weights: Bricolage 700/800, Instrument Sans 400, Fragment Mono 400.

### V1 — done on 2026-10-04

Gate green (`astro check` 0/0/0, `astro build`). In headless Chrome with the real fonts loaded, at 320, 390, 960 and 1440, `scrollWidth` equals the viewport, `#contraptions` and `#about` exist, and no element sticks out. At 1440 the page matches the board for Nav, Hero, List Header, About and Footer.

What execution showed:
- With Bricolage actually loaded, "Contraptions" is about 6.03em wide, while Pencil measured about 5.4em. The design's 64px title can't fit at 390 with 24px gutters. Ruling: the mobile title is `clamp(44px, 14vw, 64px)`, about 55px at 390. Desktop is unchanged (`clamp(64px, 12.8vw, 184px)`).
- The same thing happens in the Nav: at 390 the links wrap onto a second line under the brand, while in the design they share one line. That's acceptable, and it goes to V2 as a touch-up (see V2 gotchas).
- `typescript@latest` is 7, which `@astrojs/check` 0.9 doesn't accept. TS is pinned to ^6.
- `linkLabel` in `site.ts` is provisional (href without `https://` plus " →"). Open point 2 settles it in V2. The Condates label is very long.
- Desktop List Header: the border sits right under the text (padding-bottom 0), fixed during review.

## V2 — The contraptions, "made for me" and the slot

**In**: the five cards from the data module. Desktop: panel rotated ±10°, alternating left and right, sticking out 140px past the page edge, the page clipping the overflow (`overflow-x: clip` or equivalent, no horizontal scroll). Mobile: straight panels in a column, panel first and then text. Quadra and Maestro marks via `astro:assets`. Panels without a mark show only the large number, no label. "Made for me" with Slacky (icon via `astro:assets`, the `[CHECK]` on "runs my week" left as is, meaning the text stays as written) and Trama. The empty slot. Text contrast on the accent colours checked and reported.

**Out**: deploy, animations.

**Done**: `astro check` and `astro build` green. The local build shows the five cards, the "made for me" section, the empty slot and the About section with ciao@spleenteo.com. Every link in `copy.md` is clickable and points to the right URL. No horizontal scroll at any width. A WCAG contrast table for text on the accents (Kind/Link on `bg`, Index on the accent), each pair passing at least AA for its size.

**Gotchas**: Nav at 390 wraps onto two lines (the design has one line): reduce the gap or the brand size to keep it on one line from 390 up, if it fits with the real font. The Condates link label is very long, so it must wrap (`overflow-wrap: anywhere`) or be shortened according to open point 2. Rotation plus overflow: `overflow: hidden` on `body` breaks `position: sticky` and anchors; prefer `overflow-x: clip` on a wrapper. The three open points at the end of `design-spec.md`.

### Deviations found while planning V2

- **Repo links.** The Done asks for every link in `copy.md` to be clickable. Quadra, Maestro and Condates have a repo URL in parentheses besides the main link, and the design shows only one link per card. The plan adds a second link, "repo →", to the Meta Row. To be confirmed by the user (open point 2).
- **Widths other than 1440.** The design doesn't say how the bleeding panels behave between 960 and 1440 or above 1440. The plan defines a scale unit `--k` (geometry proportional up to 1440), with the panels always on the viewport edges and the text in a centred 1440 container.
- **Contrast** computed during planning: every accent passes AA on `#0A0A0A`, the lowest being Quadra at 5.09.

## V3 — Deploy on Cloudflare Workers, spleenteo.com

**In**: `wrangler.jsonc` with static assets (`assets.directory: ./dist`, no Worker script unless needed). Deploy to `*.workers.dev` as a preview. Custom domain `spleenteo.com` (zone already on Cloudflare) via `cf` CLI or Cloudflare MCP. Before the production deploy and the domain binding: **stop for the user's confirmation**. Check for existing DNS records on the zone that would conflict.

**Out**: CI, analytics, redirects beyond what the domain needs.

**Done**: `curl -I https://spleenteo.com` answers 200 with the Astro page. The page in the browser matches the local build.

**Gotchas**: existing DNS records or routes on spleenteo.com (an old site?) to check with `cf` before binding. `www.spleenteo.com`: to be decided with the user.
