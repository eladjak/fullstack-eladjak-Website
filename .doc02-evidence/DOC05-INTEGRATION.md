# DOC05 integration verification

## Result: VERIFIED_LOCAL for the bounded DOC05 UI slice

The approved candidate was verified without editing application source/tests.
The four focused test files passed, direct TypeScript checking passed, and one
direct Next build passed. Root completed bounded EN/HE browser verification on
the Node 22 loopback server; that owned server was stopped afterward. The result
is limited to the DOC05 UI slice, not whole-site or production acceptance.

| Scenario | Result | Evidence |
|---|---|---|
| Focused locale suite | PASS | `node node_modules/vitest/vitest.mjs run src/components/ui/__tests__/footer-locale.test.tsx src/components/ui/__tests__/navigation-locale-links.test.tsx src/components/ui/__tests__/floating-actions-locale.test.tsx src/components/providers/__tests__/client-layout-locale.test.tsx` — 4 files, 10 tests passed; exit 0. |
| Direct TypeScript check | PASS | `node node_modules/typescript/bin/tsc --noEmit --incremental false --pretty false` — exit 0. |
| Direct Next production build | PASS | `node node_modules/next/dist/bin/next build` — Next.js 16.3.1/Turbopack compiled; TypeScript passed; generated 103/103 static pages; exit 0. Emitted Edge Runtime deprecation and edge-runtime/static-generation warnings. The package `prebuild` script was not invoked. |
| Hebrew guide route | PASS | `GET http://127.0.0.1:4173/guide/` — 200; Hebrew guide title. |
| English guide route | PASS | `GET http://127.0.0.1:4173/en/guide/` — 200; `AI Agent + Infrastructure Guides`. |
| Invalid guide route | PASS | `GET http://127.0.0.1:4173/guide/this-doc05-route-must-not-exist/` — 404. |
| Root-reported browser review | PASS for affected UI slice | EN desktop (1280×720): Guides navigation stays on `/en/guide/`; newsletter is LTR with LTR email input; no Hebrew footer text or horizontal overflow. EN mobile (390×844): `scrollWidth=382`, footer BackToTop bottom `740.75` precedes WhatsApp top `764` (no overlap); keyboard Tab focuses the footer scroll control with a solid outline, and Return completes smooth-scroll to `scrollY=0` (an earlier immediate sample was mid-animation). The mobile English menu opens, its Guides item navigates to `/en/guide/`, and the menu closes. HE mobile: document is Hebrew RTL; newsletter is RTL with LTR email input; WhatsApp and floating scroll labels/titles are localized; no overflow and footer screenshot is clear. Root reports browser tab closed and viewport reset. |

The server uses the built artifact and direct Node 22 Next start, bound only to
`127.0.0.1`: exec session `93615`, PID `61200`, command
`node .\\node_modules\\next\\dist\\bin\\next start --hostname 127.0.0.1 --port 4173`.
The server was stopped through its exact owned session after root's review.
Post-review verification found PID `61200` absent and port `4173` clear.

## Frozen DOC05 pins

The ten candidate source/test hashes below were measured before and after the
suite, typecheck, build, and route checks: all ten matched `DOC05-REVIEW.md` /
`DOC05-EVIDENCE.md`, with zero mismatches.

| File | SHA-256 before and after |
|---|---|
| `src/components/widgets/NewsletterSignup.tsx` | `073ed5631fd94c75499709d68ab42c6353349bc1952e67f6d06ed8cc9748e9b5` |
| `src/components/ui/navigation.tsx` | `4239d387104394dd3bf4194fcb9482aaee0ae4c6f6c1d57aacd2745471fc833b` |
| `src/components/ui/whatsapp-fab.tsx` | `5fee20091809441539819ff906d3c45668a46e8162bf1037d916a8bd6eb14ed6` |
| `src/components/ui/scroll-to-top.tsx` | `648351e6457b1085f082301015f0a5da40f10d7458c25ebbb0d02b61ff8645b6` |
| `src/components/ui/footer.tsx` | `2046af7e674d712e5730c818907e4d93765ef6c78a587b9e014ef45d76e03913` |
| `messages/en.json` | `c5ac07a1278ade4b9dc5bf4b9bce4c6e549b08d407542a99a4fec76077d8a5a4` |
| `messages/he.json` | `1152d2d83997d8fab346d4c9b857353a001d8cbc87fdd43e3e8b68e8f9c983bd` |
| `src/components/ui/__tests__/footer-locale.test.tsx` | `6b11f257cfb8ddad202067ee97a3656719c0c20efe4c65162c78a2ceded7282a` |
| `src/components/ui/__tests__/navigation-locale-links.test.tsx` | `53c8eba072ae88e7a9ed61a73ac0944015e895783c0f6a6f0eff0015fd0f85f1` |
| `src/components/ui/__tests__/floating-actions-locale.test.tsx` | `b88723836c68eee1ed4f272220ba52847ad900dbe356bb126dc66795293977f4` |

The separate existing `src/components/widgets/AgentNetworkStatus.tsx` remained
at SHA-256 `8faec7dd5359dcc7e6e681e96a6b9e467aec3019f49b27196e136f6a43e1fefe`.
Existing DOC03 and DOC04 evidence hashes also remained unchanged:

| Existing evidence | SHA-256 before and after |
|---|---|
| `DOC03-INTEGRATION.md` | `9a7ea7457ea39232c27c1cb0dd8f32473eabdeb9985b99c31d52d36f6e336957` |
| `DOC03-REVIEW.md` | `3803f4aa94126b79aa7af1da7e49e03ac3990deed9fc5d4e2a496896008f6c0a` |
| `DOC03-UI.md` | `42ef14bedd5e3008932f525ae5ef56919698ab9642d37ae56714ece1f7261ff9` |
| `DOC03-COPY.md` | `a781e10b5cce1ecfd80ec6cb405333241b40415436bee835a9afd7e4b01938a9` |
| `DOC04-INTEGRATION.md` | `20171d5010b241f2df1b55e4f85e03c9491a7b3cc035c07c036e9e3ca30dfbd3` |

## Limits

Node `v22.16.0` was used. Requested model/effort was Luna/high; actual backend,
model, and cost were not exposed and remain unmeasured. No install, push,
deployment, newsletter submission, provider/model/API call, or real-data check
was performed. Root did not submit the newsletter form, click external links,
or validate a provider/health service; the status badge displayed unavailable
and no health claim is made. Browser evidence is root-reported and limited to
the affected EN/HE UI, viewport, navigation, focus, and scroll behaviors above.
This is bounded `VERIFIED_LOCAL`, not whole-project or production acceptance.

## Local version checkpoint (2026-10-03)

The approved DOC04/DOC05 source and test files were committed locally as
`eeee91d3fd92c6a0e8365d6436d0bccab371f02d` (`fix(guide): align chrome
locale and mobile controls`) on `feat/renewal-guides-20260915`. Exactly 11
intended paths were committed; their frozen hashes still match. The index is
empty afterward, and only the untracked `.doc02-evidence/` directory remains.
The normal secret-scanning pre-commit hook ran and reported `CLEAN`; no bypass,
push, publish, or deployment occurred. See `DOC05-LOCAL-VERSION.md` for the
checkpoint and hook details.
