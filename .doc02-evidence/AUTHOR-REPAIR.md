# DOC02 author repair evidence — 2026-10-02

## Scope and boundary

Content repair pass for the assigned guide pairs: Kami, Kaylee, Sailaco, Box, and Aurora (HE/EN). The separate Ranch/Solis edits are owned by another worker. The candidate source set is now frozen for independent final review and integration checks. No build, typecheck, app import, browser, provider, network, or production behavior is claimed by this note.

Baseline for the worktree: `1cd82cde2fa5cc93bd5cb07cf8ba0f41c605bbf7`. Only assigned guide source pairs were edited by this author. The repository status also contains the separate Ranch/Solis source pair and shared `.doc02-evidence/` files owned by other workers; these were not edited by this author.

## Repairs made

- Kami: replaced availability, message-count, timing, price/free-tier, six-month personal-use, popularity, and production-operation promises with provider/configuration-dependent guidance. Setup, voice, semantic memory, hosting, and maintenance are described as patterns requiring local configuration and verification.
- Kaylee: presented cron/heartbeat, retries, morning reports, dashboard updates, and self-healing as configurable examples rather than verified active jobs; removed the personal Docker socket incident and retained the least-privilege lesson. Cleanup/deletion, reset, and image rebuild guidance now calls for explicit scope and review rather than being a default action.
- Sailaco: changed daily/channel metadata to conditional configuration, scoped deduplication and draft generation to data/configuration quality, removed personal origin-history claims, and made the approval queue, phone/batch review, Telegram, and sending connections conditional. Safety example labels now say they are illustrative and not live integrations; code bodies were retained.
- Box: made ICS refresh timing provider-controlled and unverified, removed the numeric sync estimate and live calendar/dashboard promises, and made state updates conditional on implementation.
- Aurora: clarified that the guide describes a review/reflection pattern and does not establish an identity relationship with Oracle. The illustrative `author` field was changed from `oracle` to `review_agent` in the HE/EN schema/example to avoid implying that Oracle behavior is Aurora behavior. This is the only intentional change to an example payload; it is a narrow identity-boundary correction. Other example payloads were preserved.

## Checks performed

- `git diff --check` on the ten assigned files completed with exit code 0. Git emitted only its standard LF-to-CRLF conversion notices.
- Static HE/EN structure check: all five pairs retained matching `slug` values and identical ordered section `id` lists. This does not prove rendered localization, route resolution, or accessibility.
- Negative controls against the original HEAD showed the baseline did contain representative unsupported promises and the candidate no longer contains those exact phrases: Kami `always available` and `$39/month`; Box “syncs automatically every few minutes”; Kaylee “three consecutive attempts fail”.
- Author proofread covered the paired edited copy for the named findings. The reviewer owns the independent final content pass; this is not a claim of human acceptance.
- No source build/typecheck was run by this author. Integration worker owns those checks against the frozen bytes.

## SHA-256 of the ten assigned candidate files

| File | SHA-256 |
|---|---|
| `src/data/agent-guides/kami.ts` | `14eed016297823175ea4f41f680fe5b7c67339e9f6a3c50593d8856f51c3ddc6` |
| `src/data/agent-guides/en/kami.ts` | `2e8a456484abcaf7d11c192cbce4efdbdcfa7700e18305cfac0d287992cd1584` |
| `src/data/agent-guides/kaylee.ts` | `5051e771b38fbf6fdc9719ffd53d75f6450eeebd0872ce529821339a299889e6` |
| `src/data/agent-guides/en/kaylee.ts` | `04f97680edd9d7b6e39ce0d320b0055483389e750759f9d9e63cac194009a95c` |
| `src/data/agent-guides/sailaco.ts` | `e5b729eb66b7e50b7df19a2dfef06c06144fb40a06caeab312d25e16138b8ee8` |
| `src/data/agent-guides/en/sailaco.ts` | `657a3fa5aeda1f7e3d95071595fc538133e4042b18af21e2cfd8230629807b62` |
| `src/data/agent-guides/box.ts` | `8cda7171c6ef3c53beced39409d95df77d5b026c12db706bc939f786ba80d124` |
| `src/data/agent-guides/en/box.ts` | `2c4786c759f98829a9bd4dd49fccee5433f2750cbd5e85a5a6a5552965a11dd9` |
| `src/data/agent-guides/aurora.ts` | `551f773c815d02428a95d1872288f924661a029d4ca9eff09e8719e3222a518f` |
| `src/data/agent-guides/en/aurora.ts` | `2e069ab3642c7f2706516b2e4cecbde54b8041f128f8c76d93a65ea1ba974600` |

## Remaining limits

This closes the assigned content repair pass, not the guide-publication task. Independent review, TypeScript/build checks, rendered responsive/RTL inspection, delivery-manifest reconciliation, and any later release/human acceptance remain separate gates. Do not describe these guides as deployed, provider-verified, or accepted based on this source-only evidence.
