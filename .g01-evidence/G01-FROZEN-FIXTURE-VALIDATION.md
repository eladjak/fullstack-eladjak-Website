# G01 isolated frozen Bun validation

## Preconditions

- Fixture: `.g01-evidence/lock-sync-fixture-v1`, a previously absent non-reparse directory.
- Before the run: no fixture `node_modules`; fixture `bun.lock` SHA-256 was `AC3A82C4544F1EB0196B667AC72761152B2549177EC7EC3482DAFB842653E7AF`.
- Resources: 51.6 GiB free disk and 4.92 GiB free RAM (both above the requested 8 GiB / sufficient-memory check).

## One install attempt

```powershell
bun install --cwd=<fixture> --frozen-lockfile --ignore-scripts
```

Bun was `1.3.8+b64edcb49`. It emitted the known warning that nested overrides are unsupported. No lifecycle-script output was observed. The tool's 30-second wait ended while Bun was still running, so its exit code was not captured; the same PID later no longer existed, and the retained fixture log ends with:

```text
983 packages installed [75.87s]
```

No retry was run. The retained process log is `lock-sync-fixture-v1/frozen-install.log`.

## Assertions after completion

- Fixture `bun.lock` hash remained `AC3A82C4544F1EB0196B667AC72761152B2549177EC7EC3482DAFB842653E7AF`.
- `gray-matter@4.0.3`, direct `js-yaml@4.3.1`, and `gray-matter`'s resolved `js-yaml` all resolved under the fixture's own `node_modules` paths.
- No `fixture/node_modules/gray-matter/node_modules` subtree exists; no custom copy was used.
- `gray-matter` with an explicit `{ engines: { yaml: { parse: jsYaml.load } } }` parsed ordinary title/body input and rejected ordinary malformed YAML as `YAMLException`.

## Boundary

This demonstrates a populated, frozen-lock fixture whose application-facing explicit v4 YAML engine works without the custom nested-v3 copy. It does not adopt the fixture lock into the worktree, remove the nested override, prove a captured zero exit code, prove a full Next build, or establish a release deployment.
