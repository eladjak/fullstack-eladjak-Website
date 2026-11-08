# DOC05 — Guide chrome locale and floating-control recovery

## Change and boundary

Only the requested portfolio UI, locale JSON, and focused tests were changed.
The top navigation now routes Guides through the existing locale-path helper
and marks the English route active; newsletter layout direction follows the
active locale while its email field stays LTR; WhatsApp and scroll-to-top
accessible help comes from the existing locale messages; footer bottom padding
reserves room for fixed controls. Existing WhatsApp destination/message and
newsletter submission behavior are preserved. Fetch is mocked by the footer
component test; no newsletter was submitted and no external link was opened.

The DOC05 preimages are in `.doc02-evidence/DOC05-preimages/`. They were copied
from the worktree before the DOC05 component changes, including the accepted
DOC03/04 edits that were already present. The focused real-component predicate
was run against those unmodified component files before implementation: 3 test
files, 7 expected failing assertions identified the English newsletter RTL,
footer overlap reserve, English Guides path, and floating-control locale-label
defects. After the fix, the focused suite plus the existing client-layout locale
suite passed: 4 files, 10/10 tests.

Commands (from repository root):

* Baseline: `node node_modules/vitest/vitest.mjs run src/components/ui/__tests__/footer-locale.test.tsx src/components/ui/__tests__/navigation-locale-links.test.tsx src/components/ui/__tests__/floating-actions-locale.test.tsx` — expected nonzero on pre-change UI.
* Candidate: `node node_modules/vitest/vitest.mjs run src/components/ui/__tests__/footer-locale.test.tsx src/components/ui/__tests__/navigation-locale-links.test.tsx src/components/ui/__tests__/floating-actions-locale.test.tsx src/components/providers/__tests__/client-layout-locale.test.tsx` — 10/10 passed.

No build, app/server launch, deploy, provider call, form submission, or full
browser verification was performed. Root will perform the browser recheck after
the shared final build. Existing uncommitted `AgentNetworkStatus.tsx` work was
left untouched.

## Preimage SHA-256

* `DOC05-preimages/src/components/widgets/NewsletterSignup.tsx` — `cd39212a7dd3ba7d6f0968717b733da7cd9dd9f5786018fa4b0aad6306202380`
* `DOC05-preimages/src/components/ui/navigation.tsx` — `817f8f1ff1ce18b51bc06aa6723f079ecb89e6d82e52e7db727f9e00b002ccc0`
* `DOC05-preimages/src/components/ui/whatsapp-fab.tsx` — `bac5bc83f5798bf3761989cdfe4dcfdfdfcf999f27f7e99a06718c0a5a160cc2`
* `DOC05-preimages/src/components/ui/scroll-to-top.tsx` — `8208be7dfae916e3a8328571705a40722ae5e699d795a8cffead83a8d12c60c5`
* `DOC05-preimages/src/components/ui/footer.tsx` — `61f1623f71d6bd799dff22f3ee9f7384622ec75ddfc6a721d9ce483833ad26c18`
* `DOC05-preimages/messages/en.json` — `ab2806da9682d325db025c2a1229d2ddb9344128baa5bffd22dfdf8fd15171c4`
* `DOC05-preimages/messages/he.json` — `6488a59a8789232d676980419f9f08808ade904516c4393852557c3046fa98d9`
* `DOC05-preimages/src/components/ui/__tests__/footer-locale.test.tsx` — `8de0b5e6c5089593bd2db2bdea5c1e4e1792c12f5d7191f4a65326095e2fc4a0`

## Frozen candidate SHA-256

* `src/components/widgets/NewsletterSignup.tsx` — `073ed5631fd94c75499709d68ab42c6353349bc1952e67f6d06ed8cc9748e9b5`
* `src/components/ui/navigation.tsx` — `4239d387104394dd3bf4194fcb9482aaee0ae4c6f6c1d57aacd2745471fc833b`
* `src/components/ui/whatsapp-fab.tsx` — `5fee20091809441539819ff906d3c45668a46e8162bf1037d916a8bd6eb14ed6`
* `src/components/ui/scroll-to-top.tsx` — `648351e6457b1085f082301015f0a5da40f10d7458c25ebbb0d02b61ff8645b6`
* `src/components/ui/footer.tsx` — `2046af7e674d712e5730c818907e4d93765ef6c78a587b9e014ef45d76e03913`
* `messages/en.json` — `c5ac07a1278ade4b9dc5bf4b9bce4c6e549b08d407542a99a4fec76077d8a5a4`
* `messages/he.json` — `1152d2d83997d8fab346d4c9b857353a001d8cbc87fdd43e3e8b68e8f9c983bd`
* `src/components/ui/__tests__/footer-locale.test.tsx` — `6b11f257cfb8ddad202067ee97a3656719c0c20efe4c65162c78a2ceded7282a`
* `src/components/ui/__tests__/navigation-locale-links.test.tsx` — `53c8eba072ae88e7a9ed61a73ac0944015e895783c0f6a6f0eff0015fd0f85f1`
* `src/components/ui/__tests__/floating-actions-locale.test.tsx` — `b88723836c68eee1ed4f272220ba52847ad900dbe356bb126dc66795293977f4`
