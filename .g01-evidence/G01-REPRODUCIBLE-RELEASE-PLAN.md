# G01 reproducible release installation plan

Scope: read-only assessment, 2026-09-15. This is an environment-alignment plan, not a source or MDX change.

## Measured state

| Item | Observed fact |
| --- | --- |
| Bun | `1.3.8+b64edcb49` |
| Authoritative tracked installer lock | `package-lock.json`, lockfile v3 |
| Required root resolution in that lock | `node_modules/js-yaml@4.3.1`, integrity `sha512-CY6crGq...` |
| Required gray-matter resolution in that lock | `node_modules/gray-matter/node_modules/js-yaml@3.15.1`, integrity `sha512-S99WuO...` |
| Package policy | `package.json` has root `js-yaml: ^4.3.1` plus `gray-matter -> js-yaml: ^3.15.1` override |
| Current Bun lock | untracked `bun.lock`, lockfile v1, contains `js-yaml@4.3.1` once and contains **zero** exact `js-yaml@3.15.1` entries |
| Vercel metadata | no `.vercel/project.json`, `.vercel/README.txt`, or `.vercel` directory was present to inspect |

The prior local G01 repair proved the desired runtime only by package-managing the four-library v3 closure in a dedicated installer and copying it into an otherwise absent `gray-matter/node_modules` subtree. It is a local compatibility bridge, not clean-install release proof.

## Recommendation

Root decision: do not adopt the npm installer path. This project requires a Bun-only release process.

Only one Bun executable is currently available on this machine: `C:\Users\eladj\.bun\bin\bun.exe`, `1.3.8+b64edcb49`. `Get-Command bun -All` found no second Bun, and the bundled workspace dependency inventory provides Node/pnpm/Python but no Bun executable. Therefore no already-available newer Bun can be recommended for the clean-lock experiment.

Do **not** make the current untracked root `bun.lock` a release artifact or recommend root `bun install --frozen-lockfile` yet: its recorded graph cannot demonstrate the required nested `3.15.1` pin. This is a fact about the inspected lock, not a claim that Bun can never express such a graph.

### Proposed Bun-only reproducible package step

The already-proven route is a dedicated, tracked G01 runtime manifest and Bun lock containing exactly the v3 closure: `js-yaml@3.15.1`, `argparse@1.0.10`, `esprima@4.0.1`, and `sprintf-js@1.0.3`. In a fresh worktree, the release preparation step would:

1. Run Bun 1.3.8 in that dedicated directory with `--frozen-lockfile --ignore-scripts --backend=copyfile`.
2. Verify its four package versions and that no unexpected library directories exist (excluding package-manager `.bin`).
3. Verify `gray-matter/node_modules` is absent, then copy only the verified Bun output there; refuse an existing/reparse target.
4. Assert nested `3.15.1`, root `4.3.1`, benign parse, malformed-YAML rejection, and unchanged root manifests/root Bun lock.

This retains Bun as the sole installer and preserves the explicit four-library closure rather than trusting Bun's root hoisting. Tradeoff: it is a reviewed custom materialization step, not conventional single-command root dependency installation. It needs a new authorized implementation/clean-worktree packet before it can be called release-ready.

## `generate-skills.mjs` release consideration

`build` invokes `prebuild`, which invokes `node scripts/generate-skills.mjs`. The script reads `~/.claude/skills` and `~/.claude/commands`. If **both** scans find zero entries, lines 344-352 exit cleanly before `writeFile`, preserving the committed generated catalog. If either source is nonempty, it writes `src/data/skills-universe-generated.ts` (lines 428-429). Thus the empty-source CI path is source-grounded; a partial-source preservation claim is not.

Cheapest bounded proof (not run): in a disposable worktree, point only the child process's home directory at an empty temporary home, hash the existing generated catalog before/after, run `node scripts/generate-skills.mjs`, and require exit `0` plus byte-identical output. It neither reads private Claude files nor writes the catalog if the documented empty-source branch is correct.

## Tested versus untested

Tested: current lock contents; Bun version; isolated v3 runtime; local parser behavior; absence of local Vercel config; source branch that preserves an empty catalog.

Untested: clean `npm ci` tree; clean Bun tree; production/preview build; Vercel's actual install command and environment. No install, build, deployment, config, source, or lock change occurred in this packet.

## Later read-only architecture assessment: explicit application YAML engine

### Result

An application-level repair is simpler than custom nested dependency materialization for the two actual `src/lib/mdx.ts` calls. `gray-matter@4.0.3` publicly supports `options.engines`; its own defaults merge caller engines after its built-ins, and its declaration accepts `{ engines: { yaml: { parse } } }`. Its internal YAML engine binds legacy `safeLoad`; the caller engine replaces that binding.

The installed `js-yaml@4.3.1` exports `load`; its own source documents that the removed `safeLoad` should be replaced by `load`, which is safe by default, and `load` defaults to `DEFAULT_SCHEMA` when no schema is supplied. No custom schema is needed for the current corpus.

Measured public-corpus differential: all 13 `content/blog/*.mdx` files produced deep-equal `data`, identical `content`, and identical `language` under legacy nested `js-yaml@3.15.1` versus a caller engine using root `js-yaml@4.3.1.load`. A normally malformed YAML front matter string was rejected as `YAMLException` by the caller engine.

### Exact bounded implementation proposal (not applied)

1. Make `js-yaml` a direct production dependency, pinned to `4.3.1` (not merely present transitively).
2. Remove the `gray-matter -> js-yaml: ^3.15.1` nested override; retain a root `js-yaml` policy pinned to `4.3.1`. This removes the layout that Bun 1.3.8 failed to materialize while preserving root YAML v4.
3. In `src/lib/mdx.ts`, add one root import and one shared option constant:

   ```ts
   import { load as loadYaml } from 'js-yaml';

   const MDX_MATTER_OPTIONS = {
     engines: { yaml: { parse: (source: string) => loadYaml(source) as object } },
   };
   ```

   Pass `MDX_MATTER_OPTIONS` to both existing `matter(fileContents)` calls. There are exactly two of those calls.
4. Add a type source for that direct import. The installed `js-yaml@4.3.1` has no declarations and no installed `@types/js-yaml`; with `strict: true`, use a pinned `@types/js-yaml` dev dependency selected during the authorized lock update, or a small local declaration that exposes only `load(input: string): unknown`. The exact `@types` version/integrity is not source-grounded in the current lock, so this read-only packet does not invent one.
5. Regenerate the tracked package lock and intended Bun lock in a separate authorized clean-worktree packet. The acceptance condition is a clean Bun installation with only root YAML v4; the old nested v3 package is no longer a release requirement.

### Required regression controls

- Corpus differential over every public `content/blog/*.mdx`: compare `data`, `content`, and `language` between the pre-change v3 parser and the proposed v4 engine; require 13/13 parity (or an explicit reviewed semantic delta).
- Benign front-matter title/body parsing through the application helper.
- Ordinary malformed YAML rejection as `YAMLException`.
- Typecheck plus the selected project test scope after the dependency/lock change.
- A source-static guard that `src/lib/mdx.ts` has no bare `matter(fileContents)` call.

### Boundary

`mdx-bundler@10.1.1` imports and calls `gray-matter` with its own options when its `bundleMDX` API is used. No `bundleMDX` call was found under `src`, so it does not defeat the measured `src/lib/mdx.ts` path today. If that API is adopted later, it needs the same explicit-engine review; this proposal does not claim to repair every transitive package's default gray-matter use.

## Implementation checkpoint: explicit application engine

The approved bounded implementation now makes `src/lib/mdx.ts` pass one shared explicit YAML v4 engine to both application `matter(fileContents)` calls, declares only `load(string): unknown` locally for strict TypeScript, and adds focused exported-API controls. The controls use unique temporary fixture roots (not the real catalog or private Claude paths), pass ordinary metadata/body through both list and slug functions, make the legacy default parser throw to prove the caller engine is selected, and require malformed ordinary YAML to reject as `YAMLException`.

**Lock synchronization is intentionally pending independent review.** `package.json` now declares direct exact `js-yaml@4.3.1`, but neither `package-lock.json` nor `bun.lock` was regenerated in this packet. This is not clean-install or release proof. Focused Vitest and `tsc --noEmit` passed; no full build or prebuild was run.
