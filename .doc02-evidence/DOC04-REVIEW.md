# DOC04 footer locale repair — independent review

## Review: Approve (bounded footer locale slice)

- Functionality: Footer copy and the two direct widgets use the active `next-intl` locale. Links are prefixed only for routes supported by `toggleLocaleInPath`; unsupported routes remain unprefixed.
- Scope: The review is limited to Footer, `NewsletterSignup`, `AgentNetworkStatus`, their en/he message keys, and the locale-render test. The existing 19 committed guide/client-layout changes were not part of this diff review and are left untouched.
- Result: No ≥80-confidence blocker found. No tests, build, browser, or network calls were run for this review.

### Snapshot and reviewed paths

Branch `feat/renewal-guides-20260915`, `HEAD` `be58a7b34a8da294041a576b54c5568f04b66565`. The unstaged source delta is limited to:

- `src/components/ui/footer.tsx`
- `src/components/widgets/NewsletterSignup.tsx`
- `src/components/widgets/AgentNetworkStatus.tsx`
- `messages/en.json`
- `messages/he.json`
- `src/components/ui/__tests__/footer-locale.test.tsx` (untracked test)

The only untracked evidence item added by this packet is this review; the pre-existing `.doc02-evidence/` contents were preserved.

The six author-reported source/test hashes in `DOC04-EVIDENCE.md` match the current file bytes. The change uses the existing English route helper, whose supported routes are `/guide`, `/claude-code`, and `/methodology` (`src/lib/locale-path.ts`). The footer currently has one supported footer destination, `/guide`; other footer paths remain unprefixed. The CV path, personal/project URLs, brand labels, and project destinations are unchanged.

### Behavior checked statically

`footer.tsx` now translates the related-project heading/descriptions, CV text/accessible name, accessibility link text, and scroll-to-top accessible name. `NewsletterSignup` gets its default title, subtitle, placeholder, button, success, privacy, and error strings from `footer.newsletter`, while preserving explicit `title`/`subtitle` props. Its submit handler, fetch call, endpoint, and success/error state flow are otherwise unchanged in the diff.

`AgentNetworkStatus` translates loading, unavailable, maintenance, active-count, accessible-link, tooltip, and timestamp labels; it formats the timestamp for the active locale. Its health fetch and endpoint are unchanged. Its guide link uses `/en/guide` only in English, through the existing route helper, and stays `/guide` in Hebrew.

The en/he message additions have corresponding key structures. The real `Footer` is rendered under `NextIntlClientProvider` in the authored test; the test mocks the health fetch and Framer Motion primitives. It checks the English rendered footer has no Hebrew characters, selected translated labels/destinations, the matching Hebrew footer labels and paths, and the health endpoint call. `DOC04-EVIDENCE.md` reports that restoring the fixed Hebrew related-project heading caused the same English no-Hebrew assertion to fail, then the restored candidate passed. This review inspected the test/evidence but did not rerun it.

The focused source diff changes labels, translation lookups, locale-aware links, and timestamp locale formatting. It does not change newsletter submission behavior, status endpoint/fetch behavior, project branding/URLs, CV asset path, or other application APIs.

### Limits

This is not a full build, browser/accessibility audit, or verification of the status provider. The test mocks fetch and animation primitives, so it verifies locale rendering with controlled status data rather than a live network-backed widget. No production/provider claims are made.

---
WORKFLOW_CONTINUES: YES
NEXT_AGENT: independent runner
CHAIN_PROGRESS: bug-investigator ✓ → code-reviewer ✓ → independent runner
