# DOC02 integration and dependency preparation

**Status:** `DEPENDENCIES_PREPARED / BASELINE_CHECKS_COMPLETE / AUTHOR_REPAIR_PENDING`  
**Worktree:** `C:\Users\eladj\projects\portfolio-wt-renewal-guides-20260915`  
**Prepared:** 2026-10-02  
**Owner boundary:** Dependency preparation and this report only. `portfolio_delivery` owns the guide data sources under `src/data/agent-guides/`; they were not read, edited, or reverted. Their tracked modifications remain in the shared worktree. Checks below are baseline evidence only and do not accept the final guide bytes.

## Preflight findings

- Existing Bun: `1.3.8`.
- `node_modules` was absent before setup.
- `.npmrc` sets `legacy-peer-deps=true`.
- `package.json` defines `typecheck` as `tsc --noEmit`, `build` as `next build`, and a `prebuild` lifecycle script that runs `node scripts/generate-skills.mjs`.
- The prebuild generator recursively reads markdown below the current user's `~/.claude/skills` and `~/.claude/commands`, reads the curated skills source, then writes `src/data/skills-universe-generated.ts`. It crosses outside the worktree into Claude-owned/private content and may write a tracked project file. It was inspected but not run. Therefore `bun run build` would invoke an out-of-scope prebuild hook; for any later authorized local build gate, call the installed Next CLI directly after the author handoff so this hook is bypassed.
- No code UI or project feature was changed. No install hooks or dependency lifecycle scripts were run.

## Bounded install record

Ran once because `node_modules` was absent:

```powershell
bun install --ignore-scripts --no-save
```

Result: exit code `0`; Bun reported `983 packages installed` in `83.53s`. Bun warned that it currently does not support nested `overrides` in `package.json` (the `gray-matter` nested `js-yaml` override). No retry, version upgrade, manifest edit, or lockfile regeneration was done. Treat this warning as an unresolved install-behavior caveat if a later check exposes a related issue.

Before/after SHA-256 values were identical:

| File | SHA-256 before and after |
|---|---|
| `bun.lock` | `AC3A82C4544F1EB0196B667AC72761152B2549177EC7EC3482DAFB842653E7AF` |
| `package.json` | `B226A71EF1BAE516CE25F43C622F1531314D0BE06980F31A0E31EED93613623F` |
| `package-lock.json` | `37E0924AEDCFA4CCDDE8968F250EA964EDA77732F1F5169F8DFC6715A1C14392` |

Post-install local tool checks resolved `node_modules/.bin/tsc.exe` → TypeScript `5.9.3` and `node_modules/.bin/next.exe` → Next.js `16.3.1`. These were version checks only; no typecheck, build, test, or generator execution was performed. The dependency tree is local and ignored by Git.

## Baseline integration run (not final acceptance)

The author requested a source freeze at 2026-10-02 07:34:35 UTC. SHA-256 was captured for all 14 modified guide files before checking, then compared again at 07:36:18 UTC. All 14 end hashes matched their pre-check hashes, so no guide source changed during these baseline checks. The follow-on Aurora copy repair was reported while the build was already running; root explicitly directed that this run be treated as prior-hash baseline only. Await the repaired-source freeze before claiming final acceptance or repeating checks.

| Source path | Baseline SHA-256 |
|---|---|
| `src/data/agent-guides/aurora.ts` | `B4BB9DFE2A8B0FA1A7DF97F4AFC08FE92EE23B6F56AA13E29478299C8E1B8959` |
| `src/data/agent-guides/box.ts` | `8EA12973DCB1466DDD86C18476A9B1853527D23C9BBA624878B747E109CA542A` |
| `src/data/agent-guides/kami.ts` | `34BCF4DA86758DA40B74093E3752224EF2B19763F401FBE17184FABDC3F12C94` |
| `src/data/agent-guides/kaylee.ts` | `DEDE7E9A41E1FC3B8139FB229540EB5E462C0E63F7A5787613926475BAC699D2` |
| `src/data/agent-guides/ranch.ts` | `7DF34D96AE50687CA3607DE8674ADB37D9DC168F5FE161B8946C140BCE999012` |
| `src/data/agent-guides/sailaco.ts` | `420626A377980C2569EED4ED0FA0F20C2924A696DF76075DFAFE48EFF0FB87D3` |
| `src/data/agent-guides/solis.ts` | `DD9C2859E8B608A5B8A2A64C6098203C226D6AF5E5FE7A5870124E7753AA9819` |
| `src/data/agent-guides/en/aurora.ts` | `2D8F8EBEB70532C2732BCB81BD7243CD70818C92C83930915A448EC46804E972` |
| `src/data/agent-guides/en/box.ts` | `634A8E30A4F0D1BDB063469C0E03D0522E3F55D390846AE3A8BC7ED25D142212` |
| `src/data/agent-guides/en/kami.ts` | `9B0C1A20DC7F574E0A94235D2376593BA9EE43DDAE8933FBE6E6D39025C92A22` |
| `src/data/agent-guides/en/kaylee.ts` | `1690247AADDD5B4F6741B4B28ED1B8778CACED334940D42610872333D14F5831` |
| `src/data/agent-guides/en/ranch.ts` | `143DC32226419BC383F682E5146A0382D705599BCB6BD5786E9EB4A04A990F4D` |
| `src/data/agent-guides/en/sailaco.ts` | `649EDC42DDE8E18AC0E1267772919D87736DCF36D0A978E3D615213E9BAD1F27` |
| `src/data/agent-guides/en/solis.ts` | `103EC7CDF34F6842C5F21DC2E992B680308C19D978BD75EC4D489F5FE02606EA` |

Checks on those baseline hashes:

| Check | Exact command | Result |
|---|---|---|
| TypeScript | `& .\node_modules\.bin\tsc.exe --noEmit` | Exit `0`; `TYPECHECK_EXIT=0`; no diagnostics. |
| Next production build | `& .\node_modules\.bin\next.exe build` | Exit `0`; compiled; TypeScript completed; static-page generation completed `103/103`; route table emitted. This bypassed the `prebuild` lifecycle hook. |

Next emitted two relevant warnings: Edge Runtime is deprecated, and using Edge Runtime on one page disables static generation for that page. These are recorded for follow-up; no unrelated fixes were made. The typecheck updated tracked `tsconfig.tsbuildinfo`; it was restored to its previously clean state. At the final status read, exactly the 14 author-owned guide files were modified and `.doc02-evidence/` was untracked; no other tracked path remained changed by this work. `.next/` is ignored build output.

This was a local typecheck/build only. It does not prove browser rendering, mobile layout, keyboard accessibility, live/provider behavior, or final guide content correctness.

## After final author handoff

Wait for `portfolio_delivery` to identify the corrected/final guide-source bytes and authorize the final-check rerun. Then capture the exact source hashes and run only the agreed final gates. To avoid the external/private prebuild generator, the direct local commands are:

```powershell
& .\node_modules\.bin\tsc.exe --noEmit
& .\node_modules\.bin\next.exe build
```

Keep each result tied to the captured source hashes. Do not launch `bun run build` unless the prebuild hook is separately in scope and its private read/write boundary has been handled. Do not change versions or regenerate either lockfile to work around the nested-override warning; stop and report if a required dependency cannot be verified as installed from the existing lock.

---

WORKFLOW_CONTINUES: YES  
CHAIN_COMPLETE: NO — baseline typecheck/build complete; awaiting corrected-source freeze for final verification.
