# G01 lock alignment result

## Scope and command

One isolated Bun 1.3.8 lock-only run was performed in the new, previously absent fixture `lock-sync-fixture-v1` after copying only the current `package.json` and root `bun.lock` into it:

```powershell
bun install --cwd=<fixture> --lockfile-only --ignore-scripts
```

It exited `0`, ran no lifecycle scripts, and wrote only the fixture lock. Bun warned that it does not support the existing nested override; the warning was observed but no override was changed.

## Result

`package-lock.json` was safely aligned by adding the already-declared exact root dependency:

```json
"js-yaml": "4.3.1"
```

Its existing `node_modules/js-yaml@4.3.1` package/integrity entry remains unchanged.

The fixture Bun lock added the expected root workspace metadata line:

```json
"js-yaml": "4.3.1"
```

but it also removed numerous existing alias/transitive entries (for example duplicate `css-tree`, `minimatch`, `picomatch`, and their nested aliases). This is broader than the single allowed root metadata change. The fixture lock was therefore **not copied** into the worktree, and no second Bun run was attempted.

## State and claim boundary

- `package.json` and `package-lock.json` now agree on direct `js-yaml@4.3.1`.
- Root `bun.lock` remains byte-for-byte at its pre-packet hash and does **not** yet declare that direct root dependency.
- `node_modules`, source, overrides, generated catalog, and runtime configuration were not changed in this packet.
- This does not establish a clean Bun install, lock convergence, or release proof. A separate decision is needed whether the Bun-pruned graph is acceptable after independent review, or whether a different supported Bun/version strategy is required.
