# G01 Bun lock adoption receipt

## Two-stage fixture evidence

1. The original isolated frozen install populated `lock-sync-fixture-v1/node_modules`. Its retained log ends `983 packages installed [75.87s]`, but its process exit code was not captured because the initial command wait elapsed before process completion.
2. A subsequent convergence check on that same existing fixture was independently measured with an explicit `exit_code: 0`:

   ```powershell
   bun install --cwd=<same fixture> --frozen-lockfile --ignore-scripts
   ```

   Its output was `Checked 1027 installs across 1088 packages (no changes) [6.95s]`. It emitted the previously observed warning that Bun does not support the retained nested override. This was a convergence receipt, not a fresh install or cleanup.

The fixture lock SHA-256 was unchanged before adoption:

```text
AC3A82C4544F1EB0196B667AC72761152B2549177EC7EC3482DAFB842653E7AF
```

Independent fixture runtime controls already established direct/local `js-yaml@4.3.1`, explicit-engine ordinary parsing, and ordinary malformed-YAML rejection. The fixture has no custom `gray-matter/node_modules` subtree.

## Authorized generated-lock adoption

The old root lock was copied first to the new evidence backup:

```text
.g01-evidence/bun-lock-adoption-backup-v1/bun.lock.pre-adoption
SHA-256 3376F94FAAB9FD9AEF3BACD5AE3678795E877B7C6393FA124A4C65A5AD598DC2
```

Then the Bun-generated fixture `bun.lock` was copied to root `bun.lock`. Exact readback:

```text
root bun.lock SHA-256 AC3A82C4544F1EB0196B667AC72761152B2549177EC7EC3482DAFB842653E7AF
```

No package manifest, package lock, override, source, existing worktree `node_modules`, build, or deployment changed during adoption.

## Claim boundary

This establishes fixture frozen-install convergence and generated lock adoption only. It does not replace the original initial-install exit-code gap, and it is not a full Next build, preview, deployment, or release proof.
