# G01 latest-artifact local HTTP smoke — PASS

## Artifact and scope

- Reused the immediately preceding full-build artifact only; no build, install, source, config, browser, or remote request was run in this smoke lane.
- `.next/BUILD_ID`: `k59_VT9N0VUGtEqokvDIt`
- SHA-256 values before the smoke were preserved from the full-build receipt:
  - `scripts/generate-skills.mjs`: `4480BAC58FF9EADFEFDA0A9980016C42C53FEC51C3324900096DD1FB2226271F`
  - `src/lib/mdx.ts`: `AFC74EA28A5A6B6AB69DD1CCC6035506CAF24890707885697C739C3DF20DF911`
  - `src/data/skills-universe-generated.ts`: `3C1B67365D3EA26E3F383C6CFFAD6892A3EC59B82A10A25BF139C1F62756DA35`
  - `bun.lock`: `AC3A82C4544F1EB0196B667AC72761152B2549177EC7EC3482DAFB842653E7AF`

## Local-server custody

- Port `127.0.0.1:4381` was checked free before start.
- Owned process tree was started as `bun run start -- -H 127.0.0.1 -p 4381`, persisted under `server.json` with root PID `28080`.
- `server.stdout.log` records Next `Ready`; no browser or public network target was used.
- After verification, the owned receipt was validated and only its PID tree was stopped. `server-stop.json` records `taskkill /PID 28080 /T /F` exit `0`; port 4381 was no longer listening and no owned Bun/Next/Node process remained.

## Assertions

Every final response was HTTP `200` and contained the listed positive public marker:

| Request | Positive marker(s) |
| --- | --- |
| `/` | `אלעד יעקובוביץ` |
| `/blog` | `בלוג` |
| `/projects` | `פרויקטים` |
| `/guide` | `מצאו מדריך`, `מדריכים נמצאו` |
| `/en/guide` | `Find a guide`, `guides found` |
| `/sitemap.xml` | `https://fullstack-eladjak.co.il/blog` |
| `/guide?q=zzzz-g01-benign-no-match-20260915` | `לא נמצאו מדריכים מתאימים`, `הצג את כל המדריכים` |
| `/guide` reset | base guide markers restored |
| `/en/guide?q=zzzz-g01-benign-no-match-20260915` | `No matching guides found`, `Browse all guides` |
| `/en/guide` reset | base English guide markers restored |

The server sends a documented `308` to the trailing-slash canonical local URL for all non-root page requests; the smoke recorded both initial status and redirect location, then required the final target to return `200` plus its expected marker. This is an explicit redirect assertion, not a `200`-only claim.

## Limitations

- This is a local HTTP server smoke only. It does not validate browser interaction, client hydration, visual layout, external images, production deployment, or public-network behavior.
- The initial manual-redirect harness observed the 308s and failed its content checks by design; the retained final `smoke-results.json` performs explicit single-hop redirect handling and is the passing evidence.

## Evidence

- `server.json`, `server.stdout.log`, `server.stderr.log`, and `server-stop.json`
- `smoke-results.json` — 10/10 assertions pass
