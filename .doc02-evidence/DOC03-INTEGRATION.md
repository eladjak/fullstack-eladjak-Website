# DOC03 Integration Verification

Date: 2026-10-02. Scope: frozen 19-file source/test set, focused locale behavior, typecheck, production build, and localhost HTTP markers. Static-review acceptance is recorded in `DOC03-REVIEW.md`.

## Result: PASS

| Scenario | Result | Evidence |
|---|---|---|
| Focused ClientLayout locale test | PASS | Exit 0; 1 file passed, 2 tests passed. English route labels and Hebrew labels/open-close behavior passed. |
| Direct TypeScript check | PASS | `node_modules/.bin/tsc.exe --noEmit --incremental false`; exit 0, no diagnostics. |
| Direct Next.js build | PASS | `node_modules/.bin/next.exe build`; exit 0. Compiled, completed TypeScript, generated 103/103 pages. Existing Edge Runtime deprecation/static-generation warnings only. |
| Hebrew Sailaco page | PASS | `GET /guide/sailaco` returned 200; rendered title: `המדריך המלא ל-סיילאקו (Sales/BD), סוכן-המכירות של הרשת`. |
| English Sailaco page | PASS | `GET /en/guide/sailaco` returned 200; rendered title: `Sailaco — The Complete Guide`. |
| Hebrew guide index | PASS | `GET /guide` returned 200; rendered title contains `מדריכי סוכני AI + תשתית בעברית`. |
| English guide index | PASS | `GET /en/guide` returned 200; rendered title: `AI Agent + Infrastructure Guides`. |
| Missing guide route | PASS | `GET /guide/this-doc03-route-must-not-exist` returned 404. |
| Frozen source hashes | PASS | All 19 SHA-256 hashes below matched before and after test, typecheck, build, and HTTP checks. |

### Commands and exit codes

```text
bun ./node_modules/vitest/vitest.mjs run src/components/providers/__tests__/client-layout-locale.test.tsx --reporter=verbose
exit 0; 2/2 tests passed

.\node_modules\.bin\tsc.exe --noEmit --incremental false
exit 0

.\node_modules\.bin\next.exe build
exit 0
```

### Frozen source set and SHA-256

| File | SHA-256 |
|---|---|
| `src/data/agent-guides/aurora.ts` | `551F773C815D02428A95D1872288F924661A029D4CA9EFF09E8719E3222A518F` |
| `src/data/agent-guides/box.ts` | `3C8CEF09AFBB7CF27C114F9AC8CEA8769B0354F12EA2B6B325E769DDB0765424` |
| `src/data/agent-guides/kami.ts` | `33432B1D8520227C5427219382454759AD455BA0BB029F09FA0468DE9F70D2AE` |
| `src/data/agent-guides/kaylee.ts` | `54C2DAC7FE57B30C99F081EBB267DCA66213BE2B5E731E65CE265B18AA73885C` |
| `src/data/agent-guides/ranch.ts` | `660BE42843DB641A0B3121347B57B99B1270493E9264D5AE5CC376D9762AA513` |
| `src/data/agent-guides/sailaco.ts` | `2C98071707513E865FD502EE7EC06510CF50F21C1B3311B18F85139DA13CCC43` |
| `src/data/agent-guides/solis.ts` | `9FF8F0152EE1F9B52F3C70679E34DE614E381BA69FB28BFC49E1ECACAA144540` |
| `src/data/agent-guides/en/aurora.ts` | `2E069AB3642C7F2706516B2E4CECBDE54B8041F128F8C76D93A65EA1BA974600` |
| `src/data/agent-guides/en/box.ts` | `D6DA673CD0ED7AC1F865890568D22D2D0B2D3515206F5DD40C43EC07866AB559` |
| `src/data/agent-guides/en/kami.ts` | `06BE8DC5E6654ACA3B6458953A3E39283EB10D95959B80B962D88A67AE8E0BA5` |
| `src/data/agent-guides/en/kaylee.ts` | `2B2D81A2574A7E6AC62579AB28C192D77FE553B1BD2FC84D1B12B4C1AF507448` |
| `src/data/agent-guides/en/ranch.ts` | `C45F90AD19E7D70EA543D55B9C5750FBFABC65CD2CACD7D6107303F72A7F3E41` |
| `src/data/agent-guides/en/sailaco.ts` | `4C67EF3F7C9745B0CAEDA5E988FC7B7EE13DC695D24B3E9AF24CFB625B92CE37` |
| `src/data/agent-guides/en/solis.ts` | `867E0FABB768AD94D92E36DC89B52469510B7207D78FA5DE27F28E92D3F331AE` |
| `src/components/providers/client-layout.tsx` | `4C2B2B91B9297DDE976FB99523E156C382E830C55F6ADFC3D62FB4F3623AC3E7` |
| `src/components/ui/navigation.tsx` | `817F8F1FF1CE18B51BC06AA6723F079ECB89E6D82E52E7DB727F9E00B002CCC0` |
| `messages/en.json` | `CE82D436D07D44998D3497D6EAE55C8C6DB9AEB5EC94EC7445280877F42DD6D0` |
| `messages/he.json` | `E3C2EBF8C9B02E82FFECB6538A83BF24FC8C73E9DDC4E75A6550B893AF820376` |
| `src/components/providers/__tests__/client-layout-locale.test.tsx` | `EF73EA13DE0E193AF36AF6DC78D2E6A87DBBEF15B2BB6FCCBB80A057724F5D46` |

## Build outputs and limits

`git status --short` showed the same 19 in-scope source/test changes plus the existing `.doc02-evidence/` directory before and after build. No additional status-visible generated changes appeared, so no restore was performed. This local build and the HTTP marker checks do not prove publication, provider behavior, or full guide UX. The Next server at `http://127.0.0.1:4173` was held for the root browser review and stopped afterward; the port has no listener.

## UI browser pass

Root completed browser verification at English and Hebrew 390×844 viewports; screenshots were captured. The English skip label was `Skip to main content`; the Hebrew label was `דלג לתוכן הראשי`. On English, `Open menu` opened the drawer and exposed `Close menu` / `Mobile navigation drawer`; Escape closed it and restored the `Open menu` toggle. Pressing Enter on the skip link moved `document.activeElement.id` to `main-content`. Selecting `עברית` navigated to `/guide/sailaco`. On Hebrew, `פתח תפריט` opened the drawer with `סגור תפריט` / `תפריט ניווט`; clicking its close button collapsed the toggle. The document reported `en`/`ltr` and `he`/`rtl`; both pages measured 382px scroll width within the 390px viewport. The viewport was reset and the browser tab closed.

This confirms the requested locale labels and representative guide UI behavior; it is not a full-site accessibility audit or proof of every guide page. Root noted existing Hebrew text in the English footer/other global chrome as a separate follow-up outside this DOC03 packet. No source changes occurred after build. My owned server was stopped after the browser pass; a listener check on port 4173 returned none.
