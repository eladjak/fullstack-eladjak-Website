# DOC04 Footer locale repair evidence

Snapshot: `feat/renewal-guides-20260915` at base `be58a7b34a8da294041a576b54c5568f04b66565`.

## Change

- Footer headings, companion-project descriptions, CV text and accessible label, accessibility link text, and scroll-to-top accessible label now use the existing `next-intl` provider.
- Footer navigation and the agent-status widget use `toggleLocaleInPath` for routes that already have an English page. Unsupported routes stay unprefixed; the CV asset path and external project URLs are unchanged.
- Newsletter and agent-network widget labels use the active locale. Fetch behavior, newsletter submission behavior, and endpoints are unchanged.

## Verification

- `bun ./node_modules/vitest/vitest.mjs run src/components/ui/__tests__/footer-locale.test.tsx` — 2 tests passed for English and Hebrew. The test renders the real `Footer` under `NextIntlClientProvider` with repository messages. It stubs `fetch` to avoid contacting the status service and stubs only Framer Motion animation primitives for jsdom.
- Regression control: temporarily restored the original hardcoded Hebrew companion-project heading in the rendered Footer. The same English no-Hebrew assertion failed on that text; the source was restored and the test passed again.
- `bun ./node_modules/typescript/bin/tsc --noEmit --pretty false` — exit 0.
- `git diff --check` — exit 0.

## Changed file SHA-256

| Path | SHA-256 |
| --- | --- |
| `messages/en.json` | `AB2806DA9682D325DB025C2A1229D2DDB9344128BAA5BFFD22DFDF8FD15171C4` |
| `messages/he.json` | `6488A59A8789232D676980419F9F08808ADE904516C4393852557C3046FA98D9` |
| `src/components/ui/footer.tsx` | `61F1623F71D6BD799DF22F3EE9F7384622EC75DDFC6A721D9CE483833AD26C18` |
| `src/components/ui/__tests__/footer-locale.test.tsx` | `8DE0B5E6C5089593BD2DB2BDEA5C1E4E1792C12F5D7191F4A65326095E2FC4A0` |
| `src/components/widgets/NewsletterSignup.tsx` | `CD39212A7DD3BA7D6F0968717B733DA7CD9DD9F5786018FA4B0AAD6306202380` |
| `src/components/widgets/AgentNetworkStatus.tsx` | `8FAEC7DD5359DCC7E6E681E96A6B9E467AEC3019F49B27196E136F6A43E1FEFE` |

## Boundary

No newsletter submission, production/provider request, push, commit, server, browser run, or full build was performed. `.doc02-evidence/` contained prior untracked files before this task; this report is additive. Candidate is ready for independent review. Whole-site release and deployment status remain outside this slice.
