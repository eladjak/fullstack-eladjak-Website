# G01 delivery manifest (approval packaging only)

Snapshot scope: current worktree, no staging/commit/push/deploy performed. SHA values are SHA-256 of the current working-tree bytes unless noted otherwise.

## Release-candidate whitelist

| Path | Purpose | SHA-256 |
| --- | --- | --- |
| `src/app/guide/page.tsx` | Hebrew guide page integration for discovery flow | `2359DF20DBD4A374DEABB7B9D0FE9041188046E60CD43FF732E3201231D0AF63` |
| `src/app/en/guide/page.tsx` | English guide page integration for discovery flow | `D8D962F2A9FFD8AC53462CB27ECEEFB9C95F71305F599C52F9418D66106ACBA1` |
| `src/app/loading.tsx` | Intentional removal; replacement is the route-local fallback below | deleted from worktree (Git records deletion) |
| `src/components/ui/route-loading-fallback.tsx` | Replacement route loading fallback | `A2BB82DF80458A2E021232799F44FFF1F1F492E0B36E0FEB03BD191E16CECB8F` |
| `src/components/guide-discovery/GuideDiscoveryForm.tsx` | Discovery UI component | `57F9B1D252F339B1A5957CB3586787B220468FBA37DBFE00EADC9CF21029F9A2` |
| `src/lib/guide-discovery.ts` | Discovery domain logic | `652429741674894611E9AB01DE3AE79523DE1C5B856428596AB79EE7A3B26957` |
| `src/lib/__tests__/guide-discovery.test.ts` | Focused discovery unit tests | `BEA24CF9EE5122B84C0A306ACBDA3A9019AD337786FCDBEC1C6651726FE7370B` |
| `playwright.guides-local.config.ts` | Local guide Playwright configuration | `6EA6C0677254265FF0012EDD973493EC7AD799774BA3F2CB426938FEC058E0DC` |
| `tests/guide-discovery/discovery.spec.ts` | Local discovery browser test | `61C2F0D8345DD54FFE86BDA304FC68C85409F7F0B19B1F317619F7732013872B` |
| `tests/guide-discovery/inspect-form.mjs` | Local discovery test helper | `ADFA01EA9A1FDBA4D3CD4A49240A1FACF67DCBA59F06B8E2CF35523CA7792E35` |
| `scripts/generate-skills.mjs` | Empty-source prebuild preservation guard | `4480BAC58FF9EADFEFDA0A9980016C42C53FEC51C3324900096DD1FB2226271F` |
| `src/lib/mdx.ts` | Explicit YAML v4 parser engine at both MDX parse calls | `AFC74EA28A5A6B6AB69DD1CCC6035506CAF24890707885697C739C3DF20DF911` |
| `src/types/js-yaml.d.ts` | Minimal strict TypeScript declaration for `load(string): unknown` | `6382ADA16478D3D630F5C8A5396B2829A9BECC27CC9C6FB75B60250483B713F6` |
| `src/lib/__tests__/mdx-yaml-engine.test.ts` | Explicit-engine regression controls | `9545D2B5B0E7FD5D3CD2FEAC4C1180B141F74525D23EE2A3EFD9F979C1541BD1` |
| `package.json` | Direct exact `js-yaml@4.3.1` application dependency | `B226A71EF1BAE516CE25F43C622F1531314D0BE06980F31A0E31EED93613623F` |
| `package-lock.json` | Root direct `js-yaml@4.3.1` metadata alignment | `37E0924AEDCFA4CCDDE8968F250EA964EDA77732F1F5169F8DFC6715A1C14392` |
| `bun.lock` | Deliberately adopted Bun-generated lock, including direct root YAML v4 metadata | `AC3A82C4544F1EB0196B667AC72761152B2549177EC7EC3482DAFB842653E7AF` |

## Preserved move/removal

`src/app/loading.tsx` is the only tracked deletion in the whitelist. The replacement `src/components/ui/route-loading-fallback.tsx` is separately listed and hashed above. This manifest records the removal/move relationship; it does not infer that the deleted path was independently reviewed in this packaging step.

## Explicit exclusions (not proposed for release)

| Path/group | Reason |
| --- | --- |
| `CLAUDE.md` | Unrelated existing modification; not part of G01 delivery scope. |
| `tsconfig.tsbuildinfo` | Generated build state; excluded. |
| `.g01-evidence/**` | Local evidence, fixtures, logs, backup lock, and this manifest; excluded from release payload. |
| `test-results/guides-local/**` | Generated local Playwright results; excluded. |
| Original `portfolio-website` worktree attribution changes | Outside this isolated worktree and this delivery payload. Its previously recorded staged work was not rechecked by this packaging step. Only the isolated worktree's staged diff was checked empty. |

No other changed source path was found outside the whitelist and explicit exclusions. The statement is a Git-status inventory result, not an independent behavior review.

## Gates

| Gate | Status | Scope/limit |
| --- | --- | --- |
| Latest full build | Complete | Reported passed in the current G01 evidence stream; this packaging step did not rerun it. |
| Focused discovery/YAML controls | Complete | Included as deliberate test artifacts; independent verification evidence exists separately. |
| Latest artifact smoke | Complete, local HTTP only | Build ID `k59_VT9N0VUGtEqokvDIt`; explicit canonical redirects, positive page markers and no-match/base-query responses passed. See `latest-artifact-smoke-20260915-1510/G01-LATEST-ARTIFACT-SMOKE-REPORT.md`. Not browser click/hydration or visual proof. |
| Browser console/screenshots | Policy-blocked | No browser-console or screenshot claim is made. |
| Public release | Unperformed | This document grants no deploy, send, commit, stage, push, or production authority. |

## Remaining approval boundary

The release candidate contains source, tests, lockfiles, and local test configuration only. Browser console/visual gates remain open after a tool-policy rejection; source packaging and local HTTP proof do not waive them. Exact release approval remains separate. This manifest is not a deployment authorization.
