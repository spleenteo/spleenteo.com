# Changelog

What changed on spleenteo.com, one entry per release, newest first.
The version lives in `.version` at the repo root.

## v0.1.0 — 2026-10-04 — spleenteo.com is online

The first version of the site: one static page, "Contraptions", that collects the small tools Matteo has built, made from the Pencil design and the copy in `content/copy.md`, and published on Cloudflare.

- **The page**: nav, hero, the five contraptions (Quadra, Maestro, devflow / projectflow, Dato bar, Condates) with coloured panels rotated ±10° that bleed past the page edge on desktop and stand straight in a column on mobile, "Made for me" (Slacky, Trama), an empty slot reserved for the next experiment, About with ciao@spleenteo.com, and the footer. Dark theme only, no entrance animations.
- **Links**: every link in the copy is clickable, the repos included ("repo →" next to the main link). Text on the accent colours passes WCAG AA, at 5.09:1 or more.
- **Stack**: Astro 7 static output, copy in the code (`src/data/site.ts`), images through `astro:assets`, Google Fonts (Bricolage Grotesque, Instrument Sans, Fragment Mono).
- **Hosting**: an assets-only Cloudflare Worker (`spleenteo-com`) on the custom domain spleenteo.com, deployed with the `cf` CLI from the `deploy/` folder (`npm run deploy`, guarded by `CONFIRM_DEPLOY=1`). `www.spleenteo.com` redirects to the apex with a 301, and HTTP redirects to HTTPS.
- **Work**: `hub`

---
