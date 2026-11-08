# DOC03-UI: locale-aware accessibility labels

## Scope and control

- Changed only the skip link, mobile drawer labels, their existing `nav` translations, one focused test, and this evidence note.
- Pre-edit SHA-256: `src/components/providers/client-layout.tsx` = `5BFA3231A04EC1E09E7214DCC4E05106A3FD583F430A2E5EF1497129DA98A884`; `src/components/ui/navigation.tsx` = `F5EF25966F547544349FF84C5F007C03538F22BD6D403B91CF0C54D823199123`.
- Guide-data changes were already present before this work and were left untouched.

## Reproduction

- Rendered the actual `ClientLayout` and `Navigation` consumers under the real `LocaleProvider` with `/en/guide` and canonical Hebrew `/guide` path controls.
- Before the fix, the English-route assertion failed with expected `Skip to main content` but received `דלג לתוכן הראשי`. The initial `/he/guide` control passed, but that path is not the canonical Hebrew route and is historical only; the corrected post-fix test uses `/guide`.
- The navigation source also exposed Hebrew literals for the mobile menu open/close accessible names and drawer dialog name.
- An initial attempt with the repository's installed React Testing Library failed before executing tests because `@testing-library/dom` is missing. No dependency was installed; the focused test uses React DOM and the existing jsdom environment directly.

## Change

- `SkipLink` is a child rendered inside `LocaleProvider`, so it safely reads the existing `nav` translation context.
- Mobile menu toggle, drawer close button, and drawer dialog names use locale messages. Hebrew strings and the existing open/close state logic remain intact.
- Added matching English and Hebrew `nav` message keys.

## Verification

- `bun ./node_modules/vitest/vitest.mjs run src/components/providers/__tests__/client-layout-locale.test.tsx --reporter=verbose` -> exit 0; 2 tests passed. Covers English skip label, English drawer and open/close labels and behavior, and Hebrew skip, drawer, and open/close controls.
- Same test before the fix -> exit 1 on the English skip-link text assertion, with the Hebrew control passing.
- `git diff --check` -> exit 0. Git printed only the existing Windows CRLF conversion warnings.
- Post-edit SHA-256: `src/components/providers/client-layout.tsx` = `4C2B2B91B9297DDE976FB99523E156C382E830C55F6ADFC3D62FB4F3623AC3E7`; `src/components/ui/navigation.tsx` = `817F8F1FF1CE18B51BC06AA6723F079ECB89E6D82E52E7DB727F9E00B002CCC0`.
- No full build, browser run, server, install, network, provider action, deploy, or commit was performed.
