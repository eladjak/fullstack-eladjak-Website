# DOC04 footer locale — integration verification

## Result: PARTIAL — focused checks/build pass; browser review found a locale-direction defect

`DOC04-REVIEW.md` approves this bounded footer/widget locale slice. The six
frozen source/test hashes matched before verification and again after the local
build/server checks (6/6 pins match, 0 mismatches). Existing DOC03 evidence
files were not edited; their integration/review/UI/copy hashes were captured
after verification for preservation. No source, test, package, or lockfile
edits were made.

| Scenario | Result | Evidence |
|---|---|---|
| Footer English/Hebrew locale rendering | PASS | `bun ./node_modules/vitest/vitest.mjs run src/components/ui/__tests__/footer-locale.test.tsx`; 2 tests passed; exit 0 |
| Prior ClientLayout locale regression | PASS | `bun ./node_modules/vitest/vitest.mjs run src/components/providers/__tests__/client-layout-locale.test.tsx --reporter=verbose`; 2 tests passed; exit 0 |
| Direct TypeScript check | PASS | `node ./node_modules/typescript/bin/tsc --noEmit --incremental false --pretty false`; exit 0 |
| Direct Next.js build | PASS | `node ./node_modules/next/dist/bin/next build`; Next 16.3.1 compiled, TypeScript passed, generated 103/103 static pages; exit 0. Edge Runtime deprecation and static-generation warnings were emitted. Package `prebuild` was not invoked. |
| Bun `next start` route responses | FAIL | `GET /guide` and `/en/guide` returned 308 to trailing-slash paths; the same routes and invalid route returned 500. Server logged a Bun/Next CommonJS runtime error. That process was stopped after verifying its PID and listener identity. |
| Node `next start` on the same build artifact | PASS | Reused `.next/BUILD_ID` `M93On38PK7gD7R-Xwy1HO`; Node `v22.16.0` (Bun `1.3.8` was the failed server runtime). Direct `node ./node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 4173` served `/guide/` 200 with the Hebrew guides title, `/en/guide/` 200 with `AI Agent + Infrastructure Guides`, and `/guide/this-doc04-route-must-not-exist/` 404. Only these three paths were requested. |
| Root-reported EN/HE browser checks | PARTIAL | Visible footer locale and locale-correct footer guide paths passed in English and Hebrew; mobile had no horizontal overflow. However, the English `NewsletterSignup` container is hardcoded `dir="rtl"`, which right-aligns text and reverses English punctuation. This blocks browser acceptance pending a scoped UI correction. Root reports its browser tab closed and viewport reset. |

The failed Bun server was verified as the packet's process (`bun.exe ... next
start --hostname 127.0.0.1 --port 4173`, PID `10532`, handle `92706`), then
stopped through its exact exec session; PID and listener were confirmed absent
before starting Node. The error was `Failed to load external module
next/dist/compiled/next-server/app-page-turbo.runtime.prod.js: TypeError:
Expected CommonJS module to have a function wrapper`. After root completed its
browser review, the exact Node process (PID `45476`, exec handle `3877`) was
stopped through its owned session. Verification confirmed the process absent
and no listener on port `4173`.

Root-reported adjacent observations, not attributed to this DOC04 slice: the
top navigation's Guides link targets `/guide` on English pages; the WhatsApp
control retains Hebrew aria/title text on English pages; ScrollToTop retains
an English label on Hebrew pages; and floating widgets overlap footer bottom
controls on mobile. Root did not submit the newsletter form or click external
links. These observations are follow-up scope and do not change the focused
route/build findings above.

## Frozen DOC04 source/test hashes

The values below matched the review/evidence pins both before and after tests,
typecheck, build, and local route checks (6/6, zero mismatches):

| File | SHA-256 before and after |
|---|---|
| `messages/en.json` | `ab2806da9682d325db025c2a1229d2ddb9344128baa5bffd22dfdf8fd15171c4` |
| `messages/he.json` | `6488a59a8789232d676980419f9f08808ade904516c4393852557c3046fa98d9` |
| `src/components/ui/footer.tsx` | `61f1623f71d6bd799df22f3ee9f7384622ec75ddfc6a721d9ce483833ad26c18` |
| `src/components/ui/__tests__/footer-locale.test.tsx` | `8de0b5e6c5089593bd2db2bdea5c1e4e1792c12f5d7191f4a65326095e2fc4a0` |
| `src/components/widgets/NewsletterSignup.tsx` | `cd39212a7dd3ba7d6f0968717b733da7cd9dd9f5786018fa4b0aad6306202380` |
| `src/components/widgets/AgentNetworkStatus.tsx` | `8faec7dd5359dcc7e6e681e96a6b9e467aec3019f49b27196e136f6a43e1fefe` |

The four existing DOC03 files were hash-checked after verification and remain
untouched: `DOC03-INTEGRATION.md` `9a7ea7457ea39232c27c1cb0dd8f32473eabdeb9985b99c31d52d36f6e336957`,
`DOC03-REVIEW.md` `3803f4aa94126b79aa7af1da7e49e03ac3990deed9fc5d4e2a496896008f6c0a`,
`DOC03-UI.md` `42ef14bedd5e3008932f525ae5ef56919698ab9642d37ae56714ece1f7261ff9`,
and `DOC03-COPY.md` `a781e10b5cce1ecfd80ec6cb405333241b40415436bee835a9afd7e4b01938a9`.

## Scope and limits

The footer unit test stubs the status fetch, so it proves locale rendering with
controlled status data, not status-provider health. No request was sent to the
existing public health endpoint. Root's limited browser pass establishes
visible locale/footer behavior and mobile overflow results only; the
English-direction defect remains open. No provider behavior, deployment, or
public release is established. This is not whole-site or public acceptance.
