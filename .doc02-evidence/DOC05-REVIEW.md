# DOC05 — independent code review

## Review: Approve (bounded UI and locale slice)

- Functionality: The UI now uses English direction/copy on supported English views, links Guides to its existing English route, localizes the floating controls' accessible labels, and reserves footer space for fixed controls.
- Result: No issue at confidence 80 or higher found in the reviewed source or focused tests.
- Scope: Reviewed the DOC05 candidate paths, their listed preimages, the locale helper/routing setup, and the focused tests. Existing DOC03/04 evidence and the pre-existing `AgentNetworkStatus.tsx` work were preserved.
- Verification boundary: No tests, build, server, browser, provider, network request, or commit was run/performed in this review. Browser acceptance remains pending as stated in DOC05-EVIDENCE.

## Behavior checked

The changed components use the real `next-intl` client hooks (`useLocale` and `useTranslations`) beneath the application's `NextIntlClientProvider`. The `LocaleProvider` derives locale from the route and supplies the selected messages. The tests exercise the real components under that provider; they do not substitute locale hooks or render copied markup.

English route handling follows this repository's supported-route policy. `toggleLocaleInPath('/guide', 'en')` yields `/en/guide`, matching the existing `src/app/en/guide/page.tsx`; Hebrew remains `/guide`. The helper only adds the English prefix to the dedicated supported-route set, so links such as `/services` remain at their existing path. This fits the current physical route tree and `localePrefix: 'as-needed'` setup; it does not invent an English route where no dedicated page exists. Navigation applies the localized href to both desktop and mobile links and uses that same href for active-state and `aria-current` checks.

The newsletter direction and copy use the selected locale while the email input remains explicitly LTR. The WhatsApp URL and prefilled message are unchanged; only accessible label/title/tooltip text is translated. Scroll-to-top behavior is unchanged; its accessible label and title now use locale messages. Footer padding changes to `pb-24` at both breakpoints, leaving 96px below the content for controls positioned 24px from the viewport edge. External footer destinations remain unchanged.

The diff changes no newsletter submission endpoint, method, payload, loading/error/success state flow, health endpoint, or WhatsApp destination. DOC05-EVIDENCE records that newsletter submission was not performed and that the footer test mocks fetch; its asserted health call uses the same existing endpoint.

## Test review

The three focused tests import and render the actual `Navigation`, `Footer`, `NewsletterSignup` (through `Footer`), `WhatsAppFAB`, and `ScrollToTop` components. Mocks replace animation wrappers and, in the footer test, the health fetch; the tested locale logic and rendered component trees remain real. The navigation test uses the actual `LocaleProvider` with only `next/navigation` path/router state mocked.

The preimage comparison supports the reported negative control: the old navigation produces `/guide` and does not mark it active on `/en/guide`; the prior Newsletter is Hebrew-copy/RTL; the old floating labels mismatch one of the two locales; and the prior footer lacks the new reserved padding. The candidate assertions directly cover those differences, as well as retaining Hebrew paths, unsupported English-link paths, WhatsApp destination/message, and the existing health API call. I inspected the harness and evidence but did not rerun tests; the pass/fail counts below are author-reported.

## Frozen candidate SHA-256

All hashes below were independently measured and match `DOC05-EVIDENCE.md`.

| File | SHA-256 |
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

## Insight

For a site with only selected translated routes, locale-aware UI links should use the repository's supported-route helper and test both the supported destination and an unsupported path. A generic locale-prefixed link can create a plausible but nonexistent route.
