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

## V2 — The contraptions, "made for me" and the slot

**In**: the five cards from the data module. Desktop: panel rotated ±10°, alternating left and right, sticking out 140px past the page edge, the page clipping the overflow (`overflow-x: clip` or equivalent, no horizontal scroll). Mobile: straight panels in a column, panel first and then text. Quadra and Maestro marks via `astro:assets`. Panels without a mark show only the large number, no label. "Made for me" with Slacky (icon via `astro:assets`, the `[CHECK]` on "runs my week" left as is, meaning the text stays as written) and Trama. The empty slot. Text contrast on the accent colours checked and reported.

**Out**: deploy, animations.

**Done**: `astro check` and `astro build` green. The local build shows the five cards, the "made for me" section, the empty slot and the About section with ciao@spleenteo.com. Every link in `copy.md` is clickable and points to the right URL. No horizontal scroll at any width. A WCAG contrast table for text on the accents (Kind/Link on `bg`, Index on the accent), each pair passing at least AA for its size.

**Gotchas**: rotation plus overflow: `overflow: hidden` on `body` breaks `position: sticky` and anchors; prefer `overflow-x: clip` on a wrapper. The three open points at the end of `design-spec.md`.

## V3 — Deploy on Cloudflare Workers, spleenteo.com

**In**: `wrangler.jsonc` with static assets (`assets.directory: ./dist`, no Worker script unless needed). Deploy to `*.workers.dev` as a preview. Custom domain `spleenteo.com` (zone already on Cloudflare) via `cf` CLI or Cloudflare MCP. Before the production deploy and the domain binding: **stop for the user's confirmation**. Check for existing DNS records on the zone that would conflict.

**Out**: CI, analytics, redirects beyond what the domain needs.

**Done**: `curl -I https://spleenteo.com` answers 200 with the Astro page. The page in the browser matches the local build.

**Gotchas**: existing DNS records or routes on spleenteo.com (an old site?) to check with `cf` before binding. `www.spleenteo.com`: to be decided with the user.
