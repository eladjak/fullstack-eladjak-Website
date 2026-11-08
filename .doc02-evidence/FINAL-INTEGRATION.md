# DOC02 final local integration and bounded UI evidence

Date: 2026-10-02  
Worktree: `C:\Users\eladj\projects\portfolio-wt-renewal-guides-20260915`  
Scope: final frozen 14 HE/EN agent-guide source files. This records local checks plus lead-supplied representative browser observations, not deployment, provider behavior, live messaging, complete browser/mobile coverage, accessibility signoff, or publication approval.

## Frozen-source binding

SHA-256 was captured for all 14 guide files immediately before and after the checks below. All before/after digests matched. The final digest list is in [CONTENT-REVIEW.md](CONTENT-REVIEW.md). The latest Sailaco HE/EN digests (`049bddf7…` / `a4feb332…`) supersede only those two hashes in [FINAL-RESIDUE.md](FINAL-RESIDUE.md); all other final-residue source hashes remain the binding snapshot. No guide source changed during these gates. Git status contained the 14 expected guide-source modifications and `.doc02-evidence/`; `tsconfig.tsbuildinfo` was not changed.

## Local commands and results

| Check | Command | Result |
|---|---|---|
| TypeScript | `& .\node_modules\.bin\tsc.exe --noEmit --incremental false` | Exit `0`, no diagnostics. Disabling incremental output avoided changing `tsconfig.tsbuildinfo`. |
| Next production build | `& .\node_modules\.bin\next.exe build` | Exit `0`; optimized build compiled, TypeScript completed, static generation completed `103/103`, route table emitted. |

Both commands invoked the installed local executables directly. `prebuild` was not run; the excluded prebuild generator reads Claude-owned skill/command content outside this worktree and writes a tracked generated file. No install, test suite, source edit, remote-server/provider, or production operation was performed in this check. The owned local HTTP server is recorded below.

Build warnings, not failures: Next reports Edge Runtime deprecation and warns that a page using Edge Runtime cannot be statically generated. The build still completed successfully. No attempt was made to change unrelated runtime configuration.

## Bounded local HTTP smoke

The direct build was served locally with `next start --port 4173` only after confirming port `4173` had no listener. Read-only requests used a unique query marker. Final responses after following canonical redirects:

| Route | Status | Content / negative control |
|---|---:|---|
| `/guide/sailaco?doc02=final-freeze-20261002` | `200` | Response contained `סיילאקו`. |
| `/en/guide/sailaco?doc02=final-freeze-20261002` | `200` | Response contained `Sailaco`. |
| `/guide?doc02=final-freeze-20261002` | `200` | Response contained `Sailaco`. |
| `/en/guide?doc02=final-freeze-20261002` | `200` | Response contained `Sailaco`. |
| `/guide/doc02-nonexistent-20261002?doc02=final-freeze-20261002` | `404` | Expected missing-guide negative control. |

Valid route requests followed canonical redirects where applicable and returned `200`; no response was posted or otherwise used to trigger an external effect. The local server was kept running for the lead's browser check, then stopped on request. A fresh listener check confirmed no process is listening on port `4173`.

This smoke verifies HTTP route responses and simple content markers only. It does not establish live service integrations.

## Lead-supplied representative browser observations

The lead reports final Sailaco HE desktop rendering and HE/EN screenshots at `390x844`; DOM locale/direction were `he/rtl` and `en/ltr`, with `document.scrollWidth=382 <= innerWidth=390` in both. In HE, the first “what-is” accordion expanded on Enter and collapsed on a second Enter. The English locale link navigated locally to `/en/guide/sailaco/`. The captured console error list was empty for that check (not proof that errors never occur).

Limitations and transient observations: a splash disappeared before one click, producing a stale-node error; a fresh state then showed the loaded page. The first EN screenshot was blank during animation; a subsequent screenshot showed content. The viewport was reset and the created tab closed. This is partial representative UI evidence, not all-14 route coverage, all-keyboard testing, or accessibility signoff.

Open browser findings carried into [CONTENT-REVIEW.md](CONTENT-REVIEW.md): unqualified Sailaco Firewall/integration/resource/CTA wording and shared English skip-link/menu labels still rendered in Hebrew. No fixes or rebuild followed these observations.

## Delivery boundary

The typecheck, build, and bounded HTTP smoke passed for the frozen local bytes. The exact previously selected passages were repaired in the focused re-review; this does not close their broader content categories. Overall guide/public content acceptance remains **open** for the specific Sailaco body/resource/CTA copy and English shared shell labels above. See [CONTENT-REVIEW.md](CONTENT-REVIEW.md). No deploy, push, external message, model/provider call, or live agent/server change occurred.

WORKFLOW_CONTINUES: YES  
CHAIN_COMPLETE: NO — local integration gates passed; specific content/UI follow-ups and owner/release decision remain.
