# DOC03-COPY — Sailaco claim-consistency repair

Date: 2026-10-02. Ownership: only `src/data/agent-guides/sailaco.ts`, `src/data/agent-guides/en/sailaco.ts`, and this note. Both sources are frozen after one complete paired-file patch. No mechanical failures or retries.

## DEBUG finding and correction

Root cause: earlier repairs qualified introductions and selected cards, while tagline, persona descriptions, body bullets, section subtitles, resource captions and CTA still implied that discovery, delegation, the Firewall and an Elad-click sending gate were active and verified. HE's Firewall/integration prose additionally promised all preparation would run alone, 100% completion and no reputation risk. A qualified introduction cannot make those independent claims accurate.

Read both full source files before the patch and both full final files afterward. The final copy consistently presents an agent design and practical implementation instructions: choose sources, save/search records, check duplicates, review drafts, define reviewer and approval scope, and verify both permitted and rejected/missing-approval paths before connecting sending. Kept useful drafting and audience advice. No new provider, pricing, runtime or personal-history claim was added.

## Passage map (same locations in HE and EN unless noted)

| Surface / locations | Final treatment |
|---|---|
| Tagline :24; hero :26; stat :31; paradigm introduction :39 | Design and implementation framing. Search area is proposed; duplicate checks reduce repeats. Human review is a requirement to implement and test, not an observed live gate. |
| Personas :64,71,85; what-is subtitle :104 and bullets :112–117 | Research/drafting benefits without active-service promises. Preserved Sailaco's male identity and Elad's network identity. Dependencies and sending endpoint are options with explicit handoff/enforcement checks. |
| Rotation subtitle :128; bullets :136–141; persistence tip :145 | City selection, coverage, dedup and durable records are configuration instructions. Removed always-fresh and never-repeat promises. |
| Discovery title/subtitle :151–152; bullets :160–164 | Duplicate review and suggested schema/targeting replace only-new and guaranteed-need claims. Optional Hermes handoff requires defined inputs and checked results. |
| Outreach subtitle :176; bullets :185–188; tip :192 | Optional content integrations and review interface; separate preparation and sending permissions. No blanket safe-drafting or currently blocked-sending assertion. |
| Firewall title/subtitle :199–200; description/beginner :202,206; bullets :209,212–213; tip :217 | A planned permission gate with concrete approval/rejection checks. Removed automatic-all-prep, exact Elad-click, 100%, internal-equals-safe and zero-risk implications. |
| Code-example label :220 | Schematic classification and queue example. The `safe` label is explicitly a placeholder rather than proof of safety; data permissions and approval/rejection need implementation checks. Code bodies preserved byte-for-byte as source lines. |
| Integration HE description :230; paired bullets :236,238,241; tip :245 | Components and delegation are design choices. Start with a sample, check data, permit draft editing/rejection, and verify task/result handoffs. Existing conditional EN description preserved. |
| Resources :252,264,270,275–276,282 | Describe permission principles, optional integrations and an actual GitHub profile rather than verified live infrastructure, blocked sends or an exact code distribution. All hrefs preserved. |
| CTA title :287 | Invitation to design an assistant for human review. Removed no-reputation-risk promise. Existing qualified CTA subtext and author explanation preserved. |
| Previously repaired comparison cards :42,47,52,57 | Preserved exactly; not reverted or made unconditional. |

## Source checks and limits

- Pre-edit sources contain the assertive passages; final replacements were checked against that pre-edit capture. This provides the textual before/after control, not a runtime test.
- Compared pre-edit/final protected source lines: imports are untouched; identity, slugs, assets, canonical fields, section IDs, icons, colors, difficulty, href fields and every code line match. Ordered Markdown link targets also match.
- `git diff --check -- src/data/agent-guides/sailaco.ts src/data/agent-guides/en/sailaco.ts`: exit 0, no whitespace errors; Git warns that LF will become CRLF when it next touches the files.
- Full paired-source reread covers the specific claim-consistency bug. Locators/string checks are not used as whole-content proof. Independent content review and final integration checks belong to the lead/reviewer; no approval for publication or live behavior is claimed here.
- No installs, builds, tests, servers, browsers, providers, sends, deployment, commits, memory writes or recursive delegation. cc10x DEBUG is used for the reproduction/root-cause/repair packet; parent retains ownership of the reviewer/integration chain. The three workspace cc10x memory files were absent and were not created under this packet's explicit boundary.
- Routing remains the lead-requested gpt-6.1-sol / high. Actual backend billing and account-wide usage are not exposed in this worker.

## Frozen hashes (SHA-256)

| Source | Prior | Final |
|---|---|---|
| src/data/agent-guides/sailaco.ts | 049bddf7e16fb42281e894508acf2106d98e5871c220a73d048a15b3b2aa8f03 | 14809e17f7ebd7dec86518b7994cc24c7ddc15382a51132c24304e1d74a18b6c |
| src/data/agent-guides/en/sailaco.ts | a4feb3327e21b8a2db44d6aca52c6be340f6f34d8b8d3600473547218ffd776d | 85f2a5486138a9019227e3434b7a83d3c8979286129404713d6841a93dd06ccb |

Additional changed path: `.doc02-evidence/DOC03-COPY.md` (this note).

