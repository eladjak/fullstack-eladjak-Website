# DOC01 Box intro static verification — PASS

## Scope and method

This is a source-static, non-evaluating check. TypeScript `5.9.3` parsed both files into ASTs; no TypeScript module was imported or evaluated, no build/install/network/browser operation ran, and neither source file was edited by this lane.

The exact changed-file set against `HEAD` is only:

1. `src/data/agent-guides/box.ts`
2. `src/data/agent-guides/en/box.ts`

## Assertions

| File | AST parse | Hero fields | Non-hero text | Sentences | Localized links | Self-link | English Hebrew text |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `box.ts` | 0 diagnostics | exactly 1 and changed | byte-identical after replacing only its initializer | 5 | exactly 2: `/claude-code`, `/guide/...` | absent | n/a |
| `en/box.ts` | 0 diagnostics | exactly 1 and changed | byte-identical after replacing only its initializer | 5 | exactly 2: `/en/claude-code`, `/en/guide/...` | absent | no Hebrew characters |

The localized special route `/claude-code` (and `/en/claude-code`) is allowed alongside the locale-specific guide namespaces. All other source text, including code and text outside the hero initializer, is unchanged relative to `HEAD` after CRLF normalization.

## SHA-256

| File | HEAD | Current |
| --- | --- | --- |
| `src/data/agent-guides/box.ts` | `A5F1871316400133F8AA2FD180321F3C79118545E66DF1AF92AF67173309785A` | `789520A7FEC6527E3B43045288FCADC253BB78A4682734AD9BE1742A6B3BBD1E` |
| `src/data/agent-guides/en/box.ts` | `8CDC1E00760BBF7317377F92EC0C862232CD649098163943B39CFE5C58F52CE3` | `9BADAE08A8F4A1FACB9CC369D3A04D2ED30B224C8385C5E9F952FC6B03D84553` |

## Narrow verdict

PASS for the stated source contract only: exactly two revised `heroDescription` fields, all non-hero text unchanged, 5–6 sentences, two correctly localized links, no self-links, and no Hebrew in the English hero description.

Not checked: rendered HTML, visual layout, hydration, routing behavior, link reachability, build status, or deployment.

Machine-readable evidence: `doc01-results.json`.
