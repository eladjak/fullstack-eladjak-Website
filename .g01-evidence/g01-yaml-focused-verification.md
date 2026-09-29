# G01 YAML focused local verification

- Command: `node node_modules\\vitest\\vitest.mjs run src\\lib\\__tests__\\mdx-yaml-engine.test.ts src\\lib\\__tests__\\guide-discovery.test.ts --reporter=verbose`
- Exit: `0`
- Result: `2/2` files and `10/10` tests passed.
- Reviewed test SHA-256: `src/lib/__tests__/mdx-yaml-engine.test.ts` = `9545D2B5B0E7FD5D3CD2FEAC4C1180B141F74525D23EE2A3EFD9F979C1541BD1`.
- MDX module SHA-256: `src/lib/mdx.ts` = `AFC74EA28A5A6B6AB69DD1CCC6035506CAF24890707885697C739C3DF20DF911`.
- Existing guide unit SHA-256: `src/lib/__tests__/guide-discovery.test.ts` = `BEA24CF9EE5122B84C0A306ACBDA3A9019AD337786FCDBEC1C6651726FE7370B`.
- Source inspection: `matter(fileContents, MDX_MATTER_OPTIONS)` is used by both `getAllMDXPosts` and `getMDXPostBySlug`; the explicit YAML parser is `loadYaml` from `js-yaml`.
- Not run: typecheck (already unchanged and passed), build, install, browser, network, or private-content scan.

Raw output: `g01-yaml-focused-vitest.stdout.log` and `g01-yaml-focused-vitest.stderr.log`.
