# G01 dependency compatibility scope check

Classification: environment alignment, not a feature-code fix.

## Preserved tracked manifests

Both hashes were taken before and after every non-mutating check in this note.

| File | SHA-256 |
| --- | --- |
| `package.json` | `76916E86780AE2A1AC2AD718765B26D1AB7BA9A03EC9795091C6F1E04E2E06E8` |
| `package-lock.json` | `BDDB2797A3AF02E783FD9E9EB3839A2A77513D089280A760DE17FAB3C333A5E6` |

No install was performed. Existing root `bun.lock` and all pre-existing dirty source files remain outside this task's ownership.

## Reproduced failure

`node -e "require('gray-matter')('---\\ntitle: G01\\n---\\nbody')"` fails in `gray-matter/lib/parse.js` because its `safeLoad` binds to the hoisted `js-yaml@4.3.1`, where that function deliberately throws.

The npm lock declares the intended incompatible-version separation:

- `node_modules/gray-matter/node_modules/js-yaml`: `3.15.1`, integrity `sha512-S99WuO3HlhO3XN41EtYUNl9zzXjoJx7QvmipxsJVxtCBT0YHEFy+iOJhjSvrmV12nYhWpZaM8lPHkJm0yUMbag==`.
- root `node_modules/js-yaml`: `4.3.1`, integrity `sha512-CY6crGq313MX8GkwvB7tzgp99vjQxY1++5y10/BKN/GUfHqWaOGQMNZkBvqSzsZKWk/ijwHlWzzkLulsGHhjWQ==`.

Before repair, `require.resolve('gray-matter/node_modules/js-yaml')` is `MISSING`, while `require.resolve('js-yaml')` points at the root 4.3.1 copy.

## Bun 1.3.8 scope result

The proposed scoped command was preflighted as dry-run only:

```powershell
bun install --cwd=<worktree>\node_modules\gray-matter --production --ignore-scripts --no-save --dry-run --backend=copyfile
```

It exited `0`, but resolved the package's dev graph (including `mocha` and `ansi-green`) and chose `js-yaml@3.15.2`. The counter-preflight using `--omit=dev` had the same two properties. That does not preserve the package-lock's exact nested `3.15.1` identity and is not a convincingly narrow production repair.

Decision: no mutating Bun install was attempted. A manually copied or downloaded package was explicitly out of scope. A lockfile-aware, package-managed strategy that can materialize the exact nested lock entry must be selected before retrying.
