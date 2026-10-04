# Spike — deploying with `cf` (2026-10-04)

**Questions**
1. Can `cf deploy` publish this Astro 7 project?
2. If it can't, how do we publish `dist/` with `cf` without Wrangler config files at the root?
3. What's already on the account and on the spleenteo.com zone?

**Outcomes**
1. **No.** In the repo, `cf` detects Astro, runs `astro build`, and then looks for a Build Output Spec at `.cloudflare/output/v0/config.json` that the static build doesn't produce. The docs confirm it: "Astro 6 and later does not build with cf during the beta".
2. **Yes, from a `deploy/` subfolder** with its own small `package.json` (`"type": "module"`, devDependency `wrangler`), plus:
   - `cloudflare.config.ts` with `defineConfig({ worker: { name, compatibilityDate, … } })`;
   - `wrangler.config.ts` with `defineWranglerConfig({ assetsDirectory: "../dist" })`.

   In that folder `cf` doesn't see Astro and hands the build to Wrangler. `cf deploy --dry-run` reads 9 files from `../dist` ("Dry run complete") with no API calls. Notes:
   - The docker warning is harmless.
   - `wrangler.config.ts` is an experimental format and "can change during the beta".
   - `cf init .` on a static folder generates exactly these two files.
3. **The account is clean.**
   - The zone is in the personal account. The `cf` login sees 8 accounts, so the target account is passed as `CLOUDFLARE_ACCOUNT_ID` and not committed.
   - DNS has only Email Routing records (3 MX, SPF, DKIM). There's no A, AAAA or CNAME on the apex or on `www`. Email Routing is enabled.
   - There are no Workers custom domains on the account and no Worker routes on the zone. The existing Workers (slacky, lavaggio-strade-bot, serva) don't collide with `spleenteo-com`.
   - The account's workers.dev subdomain gives the preview URL `spleenteo-com.<subdomain>.workers.dev`.

**Fallback** if the beta breaks: a `wrangler.jsonc` at the root with `assets.directory: "./dist"` and `wrangler deploy`. Under the global CLAUDE.md rule, a project with a Wrangler config uses Wrangler.
