# DOC03 local version checkpoint

Date: 2026-10-02. This is a recoverable local Git checkpoint, not a deployment or publication.

- Branch: `feat/renewal-guides-20260915`
- Commit: `be58a7b34a8da294041a576b54c5568f04b66565`
- Parent: `1cd82cde2fa5cc93bd5cb07cf8ba0f41c605bbf7`
- Message: `docs: qualify agent guides and localize navigation labels`
- Commit method: ordinary `git commit` with the configured global pre-commit hook active; no hook bypass, config change or workaround.
- Commit scope: exactly the 19 source/test paths frozen in DOC03-INTEGRATION.md. No directory staging and no evidence files included.

## Verification

Before staging: expected branch confirmed, index empty, dirty source/test set matched the approved 19 paths, and all working-file SHA-256 hashes matched DOC03-INTEGRATION.md. Only pre-existing untracked .doc02-evidence files were allowed outside that set.

Staged only the explicit 19 paths. Rechecked the staged path set, absence of unstaged tracked changes, branch, hook configuration and hashes before the commit.

The normal commit completed with exit 0. The active pre-commit hook performs staged gitleaks and the local index-aware secret scan and fails closed on scanner failure; it was left intact. Git additionally warned about unreachable loose objects; no prune or maintenance action was performed.

After the commit: HEAD's parent matched the captured previous HEAD; HEAD's changed-path set contained exactly the 19 expected files; every working-file hash remained equal to the frozen source hash; index was empty; status contained only untracked .doc02-evidence files. No source/test content was edited by this checkpoint worker.

Integration/test/build/browser evidence is recorded by its owners in DOC03-INTEGRATION.md and related evidence files. This checkpoint did not rerun those checks and does not establish deployment, provider behavior, full-site accessibility or live-user acceptance.

No push, remote command, publication, deployment, install, Claude-owned edit, hook bypass or cleanup was performed. Evidence remains local and untracked, including this note.

## Committed source/test set and unchanged working-file SHA-256

| Path | SHA-256 |
|---|---|
| src/data/agent-guides/aurora.ts | 551f773c815d02428a95d1872288f924661a029d4ca9eff09e8719e3222a518f |
| src/data/agent-guides/box.ts | 3c8cef09afbb7cf27c114f9ac8cea8769b0354f12ea2b6b325e769ddb0765424 |
| src/data/agent-guides/kami.ts | 33432b1d8520227c5427219382454759ad455ba0bb029f09fa0468de9f70d2ae |
| src/data/agent-guides/kaylee.ts | 54c2dac7fe57b30c99f081ebb267dca66213be2b5e731e65ce265b18aa73885c |
| src/data/agent-guides/ranch.ts | 660be42843db641a0b3121347b57b99b1270493e9264d5ae5cc376d9762aa513 |
| src/data/agent-guides/sailaco.ts | 2c98071707513e865fd502ee7ec06510cf50f21c1b3311b18f85139da13ccc43 |
| src/data/agent-guides/solis.ts | 9ff8f0152ee1f9b52f3c70679e34de614e381ba69fb28bfc49e1ecacaa144540 |
| src/data/agent-guides/en/aurora.ts | 2e069ab3642c7f2706516b2e4cecbde54b8041f128f8c76d93a65ea1ba974600 |
| src/data/agent-guides/en/box.ts | d6da673cd0ed7ac1f865890568d22d2d0b2d3515206f5dd40c43ec07866ab559 |
| src/data/agent-guides/en/kami.ts | 06be8dc5e6654aca3b6458953a3e39283eb10d95959b80b962d88a67ae8e0ba5 |
| src/data/agent-guides/en/kaylee.ts | 2b2d81a2574a7e6ac62579ab28c192d77fe553b1bd2fc84d1b12b4c1af507448 |
| src/data/agent-guides/en/ranch.ts | c45f90ad19e7d70ea543d55b9c5750fbfabc65cd2cacd7d6107303f72a7f3e41 |
| src/data/agent-guides/en/sailaco.ts | 4c67ef3f7c9745b0caeda5e988fc7b7ee13dc695d24b3e9af24cfb625b92ce37 |
| src/data/agent-guides/en/solis.ts | 867e0fabb768ad94d92e36dc89b52469510b7207d78fa5de27f28e92d3f331ae |
| src/components/providers/client-layout.tsx | 4c2b2b91b9297dde976fb99523e156c382e830c55f6adfc3d62fb4f3623ac3e7 |
| src/components/ui/navigation.tsx | 817f8f1ff1ce18b51bc06aa6723f079ecb89e6d82e52e7db727f9e00b002ccc0 |
| messages/en.json | ce82d436d07d44998d3497d6eae55c8c6db9aeb5ec94ec7445280877f42dd6d0 |
| messages/he.json | e3c2ebf8c9b02e82ffecb6538a83bf24fc8c73e9ddc4e75a6550b893af820376 |
| src/components/providers/__tests__/client-layout-locale.test.tsx | ef73ea13de0e193af36af6dc78d2e6a87dbbef15b2bb6fccbb80a057724f5d46 |

The Git blob may use normalized line endings because the existing repository configuration converts CRLF/LF. The SHA-256 values here identify the unchanged working-file bytes from the integration freeze; Git's commit identity is recorded above.

