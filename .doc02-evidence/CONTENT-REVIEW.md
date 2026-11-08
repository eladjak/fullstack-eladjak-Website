# DOC02 — Focused final content re-review (not full-guide approval)

Date: 2026-10-02  
Scope: focused content re-review of the 14 frozen HE/EN guide sources listed below, limited to previously reported findings and their locale counterparts, compared with [DOC01](C:/Users/eladj/.codex/programs/agent-system-renewal-2026-08-24/DOC01-GUIDE-CONTENT-AUDIT-2026-09-15.md) and the `guide-writing-standards` skill (read in full). No source was changed. Local typecheck/build/HTTP checks and lead-supplied browser evidence are recorded separately in [FINAL-INTEGRATION.md](FINAL-INTEGRATION.md). This is not a broad copy audit or full publication/accessibility acceptance.

## Result

Current result for the definitive freeze: the exact previously selected passages were repaired, not their entire broader content categories; overall guide/public content acceptance remains open. Aurora's HE/EN copy does not establish whether Aurora and Oracle are the same or different component; its `review_agent` example is clearly illustrative. Remaining bounded issues are Sailaco body/resource/CTA claims identified below and English shared skip-link/menu labels still appearing in Hebrew in the lead's browser check. Earlier findings below are preserved as historical pre-final notes only.

## Latest bounded disposition — 2026-10-02

Re-read only the previously reported groups and their paired locales, including the final Sailaco card correction, plus Solis and Aurora identity/example wording. Current focused dispositions:

- Kami, Box, Kaylee, Ranch, and Solis repairs close their previously reported findings; Aurora attribution is correctly left unresolved and its payload is illustrative.
- Sailaco's comparison cards are now qualified: source configuration/testing, dedup as reduction not guarantee, drafts for review, and a tested human gate before connecting a send channel. The two final card hashes match the lead-provided freeze.
- Overall copy acceptance stays open because browser review identified existing Sailaco Firewall/integration/resource/CTA copy that still presents unverified guarantees: HE [sailaco.ts:202](../src/data/agent-guides/sailaco.ts#L202), [sailaco.ts:206](../src/data/agent-guides/sailaco.ts#L206), [sailaco.ts:230](../src/data/agent-guides/sailaco.ts#L230), [sailaco.ts:252](../src/data/agent-guides/sailaco.ts#L252), [sailaco.ts:287](../src/data/agent-guides/sailaco.ts#L287); EN [sailaco.ts:200](../src/data/agent-guides/en/sailaco.ts#L200), [sailaco.ts:206](../src/data/agent-guides/en/sailaco.ts#L206), [sailaco.ts:252](../src/data/agent-guides/en/sailaco.ts#L252), [sailaco.ts:287](../src/data/agent-guides/en/sailaco.ts#L287). These include “all safe actions run alone,” Firewall/send-block guarantees, an Elad-click gate, “100%” and “without risking reputation” language. Treat these as the next bounded copy task; they were not repaired in this pass. Browser review also found shared English skip-link/menu labels still rendered in Hebrew; their owning source was not identified in this bounded pass.
- Browser evidence is lead-supplied and representative only; see [FINAL-INTEGRATION.md](FINAL-INTEGRATION.md). It does not close all-guide, all-keyboard, accessibility, or publication acceptance.
- No new broad scan or source edit was performed. A passing build or local route smoke does not establish live behavior or publication acceptance.

## Historical interim re-review (superseded by latest disposition above)

Re-read only the five previously reported groups, the five paired Solis passages changed by root, and Aurora's actor-label example. The two authored freezes remained unchanged through the typecheck/build (hashes below). Current dispositions:

- Kami: the named 24/7, provider-price, adoption-popularity, and production promises have been removed or made conditional. One low-noise guarantee remains unqualified: the anti-spam section says every proactive message is checked, the same alert never arrives twice, and bursts are bundled ([HE](../src/data/agent-guides/kami.ts#L227), [EN](../src/data/agent-guides/en/kami.ts#L227)). The adjacent quiet-hours line also says Kami only sends urgent items without saying this is an example/configuration ([HE](../src/data/agent-guides/kami.ts#L228), [EN](../src/data/agent-guides/en/kami.ts#L228)). Qualify these as behaviors an implementation may provide after configuration and testing; do not promise exactly-once delivery.
- Box: the numeric ICS sync estimate and unverified live endpoint/dashboard/state promises are corrected. The body still includes personal health-context copy about Elad's weight-loss/strength program ([HE](../src/data/agent-guides/box.ts#L225), [EN](../src/data/agent-guides/en/box.ts#L116)) and says the model makes “no mistakes” with almost any phrasing ([EN](../src/data/agent-guides/en/box.ts#L142)). The first is a personal anecdote in a health-tracking guide; the second overpromises input interpretation. These were not part of the original sync finding, but remain scoped DOC02 content follow-ups under the public-copy/privacy and factual-boundary instructions.
- Kaylee: heartbeat/retry/morning-report/self-heal details are now framed as examples; the Docker-socket account has been generalized. However, the HE/EN copy still describes four months of Elad's daily production use, reliability and cost improvements, and says each line will save readers weeks ([HE](../src/data/agent-guides/kaylee.ts#L263), [HE](../src/data/agent-guides/kaylee.ts#L267), [EN](../src/data/agent-guides/en/kaylee.ts#L263), [EN](../src/data/agent-guides/en/kaylee.ts#L265), [EN](../src/data/agent-guides/en/kaylee.ts#L269)). Its Gemini section still gives an uncited current “free up to several thousand requests per day” assertion ([HE](../src/data/agent-guides/kaylee.ts#L118), [EN](../src/data/agent-guides/en/kaylee.ts#L120)). Remove/generalize the personal/internal account and qualify or source the dynamic provider terms before approval.
- Sailaco/Ranch: conditional channel labels and most approval/digest descriptions are improved, but not all sections match the qualified framing. Sailaco's CTA still promises automatic discovery/city rotation/dedup/drafts and guaranteed approval ([HE](../src/data/agent-guides/sailaco.ts#L289), [EN](../src/data/agent-guides/en/sailaco.ts#L289)); its EN author bio still says “I built Sailaco” ([HE](../src/data/agent-guides/sailaco.ts#L301), [EN](../src/data/agent-guides/en/sailaco.ts#L301)). Ranch's HE “what is” description still says it actively mines conversation memory and sends work through a Firewall as current network behavior ([HE](../src/data/agent-guides/ranch.ts#L106)), while EN now labels it a design ([EN](../src/data/agent-guides/en/ranch.ts#L106)); its HE/EN code examples still state that mining runs alone and the Elad-click approval queue is wired, without the illustrative label added to Sailaco ([HE](../src/data/agent-guides/ranch.ts#L221), [EN](../src/data/agent-guides/en/ranch.ts#L221)). Qualify both locales and mark the code as a design example, or provide live receipts. These are same-group residuals, not new groups.
- Solis: resolved in both locales for this review. The stat now reads conditionally, the copy says this is not a verified current service, and mood notes are optional/user-controlled. The removed personal crisis anecdote and former claim of live network role are not present in the reviewed edits.
- Aurora: the guide consistently says it does not establish whether Aurora and Oracle are the same component. The HE/EN example now uses `author:'review_agent'`, and the failure/rate-limit content is explicitly marked as a design example ([HE](../src/data/agent-guides/aurora.ts#L176), [EN](../src/data/agent-guides/en/aurora.ts#L175)); this resolves the prior attribution concern without asserting either identity equivalence or difference.

Content status: the principal repairs landed, but this is **not a clean content approval** while the specific scoped follow-ups above remain. No further generic scan was done. The report does not claim that unsupported statements are false; it identifies exactly where evidence or bounded wording is still missing.

## Historical provisional findings (pre-final-residue snapshot)

### 1. Kami — specific availability, popularity, provider, price, and production claims remain unsubstantiated

The current copy still says Kami is “always available” and remembers what the reader said ([HE](../src/data/agent-guides/kami.ts#L116), [EN](../src/data/agent-guides/en/kami.ts#L116)); EN calls voice replies the “number-one reason people adopt Kami” ([EN](../src/data/agent-guides/en/kami.ts#L163)); and HE/EN state specific free-provider/model and savings claims, including Gemini TTS pricing and a free 768-dimensional embedding ([HE](../src/data/agent-guides/kami.ts#L178), [HE](../src/data/agent-guides/kami.ts#L198), [EN](../src/data/agent-guides/en/kami.ts#L178), [EN](../src/data/agent-guides/en/kami.ts#L198)). The six-month daily-use/bug-fix account and production/voice/long-term-memory/reminder claims remain in [HE](../src/data/agent-guides/kami.ts#L270), [EN](../src/data/agent-guides/en/kami.ts#L270), [HE](../src/data/agent-guides/kami.ts#L342), and [EN](../src/data/agent-guides/en/kami.ts#L342). The newer generic voice-flow explanation at HE/EN `:167` is appropriately configuration-qualified, but does not qualify these adjacent assertions. DOC01 records that current file/process locus does not prove provider paths, costs, feature behavior, or adoption claims.

Smallest fix: remove the popularity claim and unsupported personal-use anecdote; make provider/model/cost statements dated examples with authoritative evidence, or label them as options that depend on current provider terms and configuration. Describe availability, memory, and production behavior as intended/configured rather than guaranteed unless supported by current end-to-end receipts.

### 2. Box — hero/conclusion caveats conflict with specific sync and “live state” promises in the body

The current summary says an ICS endpoint and dashboard are not verified, but the body still promises that Google Calendar will refresh every few minutes and that a changed schedule will appear on connected devices; it also states a typical 5–15 minute sync interval ([HE](../src/data/agent-guides/box.ts#L376), [HE](../src/data/agent-guides/box.ts#L388), [EN](../src/data/agent-guides/en/box.ts#L198)). Other sections say state updates immediately and is “live,” and that the Dashboard shows Box health ([EN](../src/data/agent-guides/en/box.ts#L171), [EN](../src/data/agent-guides/en/box.ts#L248), [HE](../src/data/agent-guides/box.ts#L486)). These statements can be read as current integration/availability guarantees despite nearby caveats; DOC01 has no live-endpoint or sync receipt.

Smallest fix: describe ICS refresh timing as provider-controlled and unverified, remove the numeric sync estimate unless sourced, and consistently phrase state/dashboard features as implementation options unless a current endpoint/output receipt is supplied. Keep the body consistent with the newly qualified summary.

### 3. Kaylee — detailed live monitoring and self-healing walkthrough plus a personal security incident remain presented as fact

Specific claims include 5-minute heartbeat, 10-minute self-heal with up to three retries, automated reporting, and an 08:00 Telegram summary ([HE](../src/data/agent-guides/kaylee.ts#L194), [HE](../src/data/agent-guides/kaylee.ts#L195), [HE](../src/data/agent-guides/kaylee.ts#L197), [EN](../src/data/agent-guides/en/kaylee.ts#L196), [EN](../src/data/agent-guides/en/kaylee.ts#L197), [EN](../src/data/agent-guides/en/kaylee.ts#L199)); a night-time failure/restart/recovery story claims detection within ten minutes and escalation after three attempts ([HE](../src/data/agent-guides/kaylee.ts#L219), [EN](../src/data/agent-guides/en/kaylee.ts#L221)). The current evidence boundary does not establish these active jobs or delivery paths. Separately, the public guide calls out a “true security story” about Elad mounting and later removing Docker’s host socket ([HE](../src/data/agent-guides/kaylee.ts#L153), [EN](../src/data/agent-guides/en/kaylee.ts#L155)); the writing standard excludes personal/internal anecdotes from the public guide.

Smallest fix: frame schedules, retries, dashboard and alerting as one possible configuration and state that this guide does not prove activation; remove or generalize the personal incident while retaining the general least-privilege lesson.

### 4. Sailaco and Ranch — current workflow/channel/approval claims and personal project-history claims remain

Sailaco metadata still labels the digest `Daily` and channel `Telegram` ([HE](../src/data/agent-guides/sailaco.ts#L32), [HE](../src/data/agent-guides/sailaco.ts#L34), [EN](../src/data/agent-guides/en/sailaco.ts#L32), [EN](../src/data/agent-guides/en/sailaco.ts#L34)), while the prose promises only-new-business daily output, batch approval from a digest, an active dashboard/bot path, and a standalone Telegram bot ([EN](../src/data/agent-guides/en/sailaco.ts#L158), [EN](../src/data/agent-guides/en/sailaco.ts#L210), [EN](../src/data/agent-guides/en/sailaco.ts#L211), [HE](../src/data/agent-guides/sailaco.ts#L113), [EN](../src/data/agent-guides/en/sailaco.ts#L240)). Sailaco's guide also says it “started as a simple lead scanner” and became a full sales assistant ([HE](../src/data/agent-guides/sailaco.ts#L234), [EN](../src/data/agent-guides/en/sailaco.ts#L234)). Ranch says its Telegram bot is active in a group and recounts a personal evolution into a “full content factory” ([HE](../src/data/agent-guides/ranch.ts#L113), [EN](../src/data/agent-guides/en/ranch.ts#L234)). DOC01 has no job/output/queue or active-channel receipts for these claims.

Smallest fix: label stats and mechanisms as intended/configured workflow, remove “active” channel/bot and functioning approval guarantees unless proven, and remove the personal origin/evolution anecdotes. Keep the valuable design guidance on human review before external sends/publishing.

### 5. Solis — fixed Telegram metadata contradicts its conditional channel description

The HE/EN stats hard-code `Telegram` ([HE](../src/data/agent-guides/solis.ts#L34), [EN](../src/data/agent-guides/en/solis.ts#L34)), but both detailed descriptions say Telegram is only a possible channel if connected and enabled ([HE](../src/data/agent-guides/solis.ts#L113), [EN](../src/data/agent-guides/en/solis.ts#L113)); the conclusion describes what to build, not what is live ([EN](../src/data/agent-guides/en/solis.ts#L233)). DOC01 did not find current interaction evidence. This internal inconsistency can make the reader infer a working Telegram integration.

Smallest fix: change the stat to “possible channel / לפי חיבור” or make the conditional wording consistent throughout. Keep mood tracking and support framed as the intended, non-therapeutic design rather than an enabled service.

## Historical static checks and limits (pre-final-residue snapshot)

- DOC01's checks found HE/EN slugs, canonical locale prefixes, section IDs, and target routes aligned, with no English-file Hebrew leakage or self-links. In the current diff, the scoped changed-line scan found no edits to slug, canonical, section IDs, icons, colors, difficulty, code-example bodies, or external hrefs. This is a source-only check, not a runtime/render test.
- Aurora HE/EN now identify Aurora as a review/reflection pattern and explicitly state that Oracle is a separate observed router not attributed to Aurora; no alias-equivalence claim remains in its reviewed hero.
- No guide content change was made by the reviewer. `tsconfig.tsbuildinfo` is modified in the shared worktree and is outside review ownership; it was not altered.
- Build/typecheck status is intentionally omitted here because another worker owns integration checks. No browser, server, provider, messaging, or production action was performed.
- Not a final approval: the five findings above should be resolved or explicitly accepted by the content owner, and only repaired sections need a focused final re-read.

## Reviewed source snapshot hashes (SHA-256)

| Guide file | SHA-256 |
|---|---|
| `src/data/agent-guides/aurora.ts` | `551f773c815d02428a95d1872288f924661a029d4ca9eff09e8719e3222a518f` |
| `src/data/agent-guides/en/aurora.ts` | `2e069ab3642c7f2706516b2e4cecbde54b8041f128f8c76d93a65ea1ba974600` |
| `src/data/agent-guides/box.ts` | `3c8cef09afbb7cf27c114f9ac8cea8769b0354f12ea2b6b325e769ddb0765424` |
| `src/data/agent-guides/en/box.ts` | `d6da673cd0ed7ac1f865890568d22d2d0b2d3515206f5dd40c43ec07866ab559` |
| `src/data/agent-guides/kami.ts` | `33432b1d8520227c5427219382454759ad455ba0bb029f09fa0468de9f70d2ae` |
| `src/data/agent-guides/en/kami.ts` | `06be8dc5e6654aca3b6458953a3e39283eb10d95959b80b962d88a67ae8e0ba5` |
| `src/data/agent-guides/kaylee.ts` | `54c2dac7fe57b30c99f081ebb267dca66213be2b5e731e65ce265b18aa73885c` |
| `src/data/agent-guides/en/kaylee.ts` | `2b2d81a2574a7e6ac62579ab28c192d77fe553b1bd2fc84d1b12b4c1af507448` |
| `src/data/agent-guides/ranch.ts` | `660be42843db641a0b3121347b57b99b1270493e9264d5ae5cc376d9762aa513` |
| `src/data/agent-guides/en/ranch.ts` | `c45f90ad19e7d70ea543d55b9c5750fbfabc65cd2cacd7d6107303f72a7f3e41` |
| `src/data/agent-guides/sailaco.ts` | `049bddf7e16fb42281e894508acf2106d98e5871c220a73d048a15b3b2aa8f03` |
| `src/data/agent-guides/en/sailaco.ts` | `a4feb3327e21b8a2db44d6aca52c6be340f6f34d8b8d3600473547218ffd776d` |
| `src/data/agent-guides/solis.ts` | `9ff8f0152ee1f9b52f3c70679e34de614e381ba69fb28bfc49e1ecacaa144540` |
| `src/data/agent-guides/en/solis.ts` | `867e0fabb768ad94d92e36dc89b52469510b7207d78fa5de27f28e92d3f331ae` |
