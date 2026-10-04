# Lessons — hub

- Measure text widths in a browser with the real fonts loaded, never with Pencil's numbers: Bricolage renders about 10% wider than the design measures.
- For screenshots and widths below 500px, use CDP `Emulation.setDeviceMetricsOverride`. `--window-size` in headless Chrome on macOS crops instead of narrowing the viewport. The script is in the session scratchpad (`shot.mjs`); re-create it in the plan if it's missing.
- Before pinning a dependency, check the peer ranges against the latest versions (`npm view <pkg> peerDependencies`): TS 7 broke `@astrojs/check`.
- Task headings in plans are `### Task N: …`, otherwise the executor's `task-brief` script can't find them.
- Whoever starts `astro preview` stops it with `npx astro preview stop` before reporting.
- In specs, "full width" is ambiguous: always write the containing box (e.g. "inside the gutters, x=24, width 342 at 390").
- Before a full-page screenshot, scroll to the bottom and back: `loading="lazy"` images otherwise stay empty.
- With the page under `overflow-x: clip`, `scrollWidth === innerWidth` proves nothing about bleeds or overlaps: check them with `getBoundingClientRect`.
- `cf` (beta) doesn't build Astro 6+: publish the static `dist/` from a subfolder with its own `cloudflare.config.ts` + `wrangler.config.ts` (`assetsDirectory`).
- npm scripts only put the root `node_modules/.bin` on the PATH: after a `cd`, call the binary by its path (`./node_modules/.bin/cf`).
- Never write account/zone IDs into documents or config: environment variables at run time.
- Right after creating DNS records or redirect rules, the first response can be a 5xx (propagation): retry before concluding.
