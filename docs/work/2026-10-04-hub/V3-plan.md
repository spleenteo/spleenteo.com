# V3 — Deploy on Cloudflare Workers, spleenteo.com — Implementation Plan

> **For agentic workers:** Task 1 via superpowers:subagent-driven-development. Tasks 2 and 3 run **in session**: they publish, so each one starts only after the user's explicit OK.

**Goal:** `https://spleenteo.com` serves the V2 build from a static-assets Worker deployed with `cf`.
**Architecture:** Astro builds `dist/` at the root as before. A `deploy/` subfolder holds the `cf` project (assets-only Worker `spleenteo-com`) whose assets directory is `../dist`. No Worker script, no bindings. Account and zone operations go through `cf` and the Cloudflare MCP.
**Tech stack:** `cf` 1.0.0-beta.12, Wrangler ^4.147 (as the build delegate only), Astro 7.3.5.
**Spec:** `slices.md` § V3, `spike-cf-deploy.md` (outcomes and the fallback).

## Global constraints

- Nothing account-specific in the repo: no account ID, zone ID or token in committed files. The commands get `CLOUDFLARE_ACCOUNT_ID` (the account that owns the zone; the controller knows it, the repo doesn't) from the environment at run time.
- No Wrangler config file at the repo root (`wrangler.jsonc`/`.toml`/`.json`). `wrangler.config.ts` lives only in `deploy/`.
- `.cloudflare/` (the build output of `cf`) is git-ignored; `node_modules/` already covers `deploy/node_modules`.
- Worker name `spleenteo-com`. `compatibilityDate` `2026-10-01` (from `cf init`). Observability on, as `cf init` generates it.
- **Publishing gates:** the preview deploy (workers.dev) and the production binding (custom domain) are two separate user confirmations. No `cf deploy` without `--dry-run` before them.
- Email Routing records (MX/SPF/DKIM) must still be there after binding the domain.

## Review focus

1. Stale build: `cf deploy` from `deploy/` doesn't run `astro build`; the deploy script must build at the root first, or it publishes an old `dist/`.
2. Wrong account: with 8 accounts, a missing `CLOUDFLARE_ACCOUNT_ID` fails non-interactively. The script must fail loudly, never pick an account.
3. `www.spleenteo.com`: the user chose a 301 redirect to the apex (Task 3).
4. After the domain binding: TLS certificate issuance can take minutes; `curl` may fail at first. Retry with backoff, don't conclude failure on the first error.
5. 404s: there's no 404 page; unknown paths return Cloudflare's empty 404 (acceptable, out of scope).

---

### Task 1: The `deploy/` project
**Files:** create `deploy/package.json` (`private`, `"type": "module"`, devDependencies `wrangler` ^4.147.0 and `cf` ^1.0.0-beta.12, invoked as `./node_modules/.bin/cf` so the pinned version runs, not the global shim), `deploy/cloudflare.config.ts`, `deploy/wrangler.config.ts`, `deploy/package-lock.json` (from `npm install` in `deploy/`); modify `.gitignore` (add unanchored `.cloudflare/`, so it also covers `deploy/.cloudflare/`), root `package.json` (scripts below).
**Does:**
- `cloudflare.config.ts`: `defineConfig({ worker: { name: "spleenteo-com", compatibilityDate: "2026-10-01", observability: { enabled: true }, workersDev: true } })`. No `domains` yet (Task 3 adds them).
- `wrangler.config.ts`: `defineWranglerConfig({ assetsDirectory: "../dist" })`.
- Root scripts: `"deploy:check"` = guard + `npm run build && cd deploy && ./node_modules/.bin/cf deploy --dry-run`; `"deploy"` = guard + `CONFIRM_DEPLOY` guard + `npm run build && cd deploy && ./node_modules/.bin/cf deploy`. Guards in POSIX sh: `: "${CLOUDFLARE_ACCOUNT_ID:?CLOUDFLARE_ACCOUNT_ID is not set}"` and, for `deploy` only, `[ "$CONFIRM_DEPLOY" = 1 ] || { echo 'Refusing to publish: set CONFIRM_DEPLOY=1' >&2; exit 1; }`. Escape the quotes correctly inside `package.json`.
**Verify:** `CLOUDFLARE_ACCOUNT_ID=… npm run deploy:check` ends with "Dry run complete" and reports 9 files read from the assets directory; without the variable it fails with the message; `npm run deploy` without `CONFIRM_DEPLOY=1` refuses **before** building or calling `cf` (test it with a fake account ID, so it can't publish even by mistake); `npm run check` 0/0/0; `git status` shows no `.cloudflare/` and no account ID in any committed file (`git grep -i account_id` shows only the variable name).
**depends on:** —

### Task 2 (in session, after the user's OK): preview on workers.dev
Gate: the user said OK to the preview in this conversation. `npm run deploy:check` green, then `CONFIRM_DEPLOY=1 npm run deploy` (with `CLOUDFLARE_ACCOUNT_ID` in the env). Then:
- `curl -sI the preview URL printed by `cf deploy`` → 200, `content-type: text/html`;
- the viewport tool (scroll first, `lessons.md`) at 390 and 1440 against the preview URL: same rects as the local close of V2;
- 10/10 links present in the served HTML.
Stop, show the user the preview URL.

### Task 3 (in session, after the user's OK): spleenteo.com + www redirect
Before asking for the OK: snapshot via MCP of the zone DNS records, Workers domains and zone routes (saved in the scratchpad, shown to the user). Assumption to state: a proxied apex record from the custom domain coexists with the apex MX/TXT records.
After the OK: add `domains: ["spleenteo.com"]` under `worker` in `deploy/cloudflare.config.ts`, commit, `npm run deploy:check`, then `CONFIRM_DEPLOY=1 npm run deploy`.
**www → apex (user's decision):** via `cf`/MCP, a proxied DNS record for `www` (`AAAA 100::`, proxied) and a zone Single Redirect rule (ruleset phase `http_request_dynamic_redirect`): host `www.spleenteo.com` → `https://spleenteo.com` + the original path, 301, query string kept. Then:
- via MCP: `GET /accounts/{id}/workers/domains` lists `spleenteo.com` → `spleenteo-com`; DNS diff against the snapshot shows only the new apex record and `www`, with MX/SPF/DKIM unchanged;
- `for i in $(seq 1 20); do curl -sfI https://spleenteo.com/ && break; sleep 30; done`, then a final `curl -sI` that must show 200 (a loop that only timed out is a failure);
- `curl -sI https://www.spleenteo.com/x?y=1` → 301 with `location: https://spleenteo.com/x?y=1` (same retry loop);
- the viewport check at 390 and 1440 on `https://spleenteo.com/`.

## Close (in session)

The Done of V3: `curl -I https://spleenteo.com` returns 200 with the Astro page, and the page matches the local build. Narrative in `slices.md`, lessons, STATUS, commit.
