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

### V2 — done on 2026-10-04

Gate green. The local build shows the five cards, Made for me (Slacky with the `[CHECK]` left as is, Trama), the empty slot, and About with ciao@spleenteo.com. All 10 links in `copy.md` are `href`s in `dist/index.html`. No Panel Label. In headless Chrome at 320, 390, 960, 1440 and 1920, `scrollWidth` equals the viewport. At 1440 the panels bleed exactly 140px (−140..715 and 725..1580) and the text starts at 811 or 64, as on the board. Above 1440 the panels stay on the viewport edges and the text follows the centred container.

Text contrast on the accents (WCAG 2.x, all AA for normal text):

| Pair | Ratio |
|---|---|
| Quadra `#2F7BFF` ↔ `#0A0A0A` (Kind/Link on bg, Index on panel) | 5.09 |
| Maestro `#FFB000` ↔ `#0A0A0A` | 10.81 |
| devflow `#C6FF3D` ↔ `#0A0A0A` | 16.76 |
| Dato bar `#FF3D8B` ↔ `#0A0A0A` | 5.93 |
| Condates `#9D7BFF` ↔ `#0A0A0A` | 6.33 |
| `ink-dim` on `bg` / on `bg-raised` | 6.79 / 6.31 |

What execution showed:
- The close caught what the task reviews missed: on mobile the panels spanned the whole viewport instead of sitting inside the 24px gutters. The spec said "full width (342 at 390)", which is ambiguous. Fixed. Ruling: on mobile the mark is `min(120px, 28vw)` and the index `min(140px, 36vw)`, so they don't overlap at 320.
- Importing images from `design/assets/` with `astro:assets` works. The files aren't duplicated in `src/`.
- In full-page screenshots, `loading="lazy"` images below the fold don't show up. That's a screenshot artefact, not a bug: scroll the page before capturing.
- Nav on one line at 390: 12px gap, letter-spacing 0 on mobile, 0.5 again from 960.
- At 960 the devflow text is taller than the row (about 33px over each side) but stays clear of the panels (about 70px of margin). Re-measure if the copy gets longer.

## V3 — Deploy on Cloudflare Workers, spleenteo.com

**In**: `wrangler.jsonc` with static assets (`assets.directory: ./dist`, no Worker script unless needed). Deploy to `*.workers.dev` as a preview. Custom domain `spleenteo.com` (zone already on Cloudflare) via `cf` CLI or Cloudflare MCP. Before the production deploy and the domain binding: **stop for the user's confirmation**. Check for existing DNS records on the zone that would conflict.

**Out**: CI, analytics, redirects beyond what the domain needs.

**Done**: `curl -I https://spleenteo.com` answers 200 with the Astro page. The page in the browser matches the local build.

**Gotchas**: existing DNS records or routes on spleenteo.com (an old site?) to check with `cf` before binding. `www.spleenteo.com`: a 301 redirect to the apex (the user's decision, 2026-10-04).

### Deviations found while planning V3

- `cf` doesn't build Astro 7 (beta). Deploy from a `deploy/` subfolder that publishes `../dist` (see `spike-cf-deploy.md`), instead of a `wrangler.jsonc` at the root.
- The `www` redirect isn't in the original mandate. It was added by the user's decision.

### V3 — done on 2026-10-04

The user approved the preview and the production domain in a single message. `https://spleenteo.com` answers `HTTP/2 200`, `content-type: text/html`, and the HTML served is byte-for-byte the same as the local `dist/index.html`. The viewport check at 390 and 1440 gives the same rects as the V2 close, and all 10 links are present. The preview `spleenteo-com.<subdomain>.workers.dev` stays active (`workersDev: true`).

How it's published:
- `npm run deploy` (with `CLOUDFLARE_ACCOUNT_ID` in the environment and `CONFIRM_DEPLOY=1`) builds Astro at the root, then `deploy/` runs `cf deploy`, which hands the upload of `../dist` to Wrangler. The assets-only Worker `spleenteo-com` uses the custom domain `spleenteo.com` (`domains` in `deploy/cloudflare.config.ts`).
- **www → apex**, done through MCP and not described in the repo: on the zone, a proxied `AAAA 100::` record for `www` plus a Single Redirect rule (phase `http_request_dynamic_redirect`) that sends `www.spleenteo.com` to `https://spleenteo.com` plus the path, with a 301 that keeps the query string. Checked on https and http.
- DNS after the binding: compared with the snapshot, the only additions are `AAAA spleenteo.com` (proxied, from the custom domain) and `AAAA www`. MX, SPF and DKIM are unchanged, and Email Routing stays `enabled/ready`.

What execution showed:
- The first `http://www` request returned 523 right after the rule was created, then 301 on the next attempt: that was propagation. Don't judge the first response.
- `http://spleenteo.com` serves the page over plain HTTP: the zone's "Always Use HTTPS" setting is `off`. This is out of the mandate and is flagged to the user.
- The zone redirect and the `www` record live only in the Cloudflare account. Whoever rebuilds the zone from scratch has to recreate them by hand (this note is the record).

