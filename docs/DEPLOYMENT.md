# Deployment

## Current state (2026-04-27)

Production: `https://fullstack-eladjak.co.il` (Vercel)
Project: `eladjak-website` (org `team_T6dJ4LNsyZ8LDt9uU9Po1exz`, project `prj_8SafUUr6VeV26vLClbq9MkgPyBXQ`)

## How to deploy

### Auto-deploy on push to main (PRIMARY)

**Status: RESTORED 2026-04-27** via `vercel git connect`.

Every push to `main` triggers a Vercel build automatically. The connection was re-established with:

```bash
vercel git connect https://github.com/eladjak/fullstack-eladjak-Website --yes
# > Connecting GitHub repository: https://github.com/eladjak/fullstack-eladjak-Website
# > Connected
```

If auto-deploy stops working again, run the same command from the project root.

To verify the integration is healthy:
1. Push a small commit to `main`.
2. Check Vercel dashboard → eladjak-website → Deployments — a new build should appear within ~30 seconds.
3. Check the GitHub webhook: `https://github.com/eladjak/fullstack-eladjak-Website/settings/hooks` — `vercel.com` webhook should be green (recent successful POSTs).

### Manual deploy from local (fallback)

```bash
npm run deploy   # → vercel --prod --yes
```

This builds locally, uploads, and aliases to `fullstack-eladjak.co.il`. Takes ~1 minute. Use this if auto-deploy is broken or you need to deploy a build that isn't pushed yet.

### Reconnect helper (one-liner)

If Vercel git integration breaks again, run from the project root:

```bash
vercel git connect https://github.com/eladjak/fullstack-eladjak-Website --yes
```

The CLI is already authenticated as `eladjak` on Elad's machine.

## CI build check

`.github/workflows/ci.yml` runs on every push + PR:
- Type-check (`npx tsc --noEmit`)
- Production build (`npm run build`)

This catches build errors BEFORE they hit Vercel. Does NOT deploy — Vercel handles that via the git integration above.

## GitHub Action fallback (only if Vercel git integration breaks irrecoverably)

If `vercel git connect` stops working on Vercel's side (e.g. they revoke the webhook and the CLI can't recreate it), use a GitHub Action to deploy on every push to main.

**Setup steps (one-time, requires Elad's manual action):**

1. **Create a Vercel token** — https://vercel.com/account/tokens → "Create Token" → name it `github-actions-deploy`, scope to `eladjaks-projects`, no expiry. Copy the token.

2. **Add three secrets** to the GitHub repo (https://github.com/eladjak/fullstack-eladjak-Website/settings/secrets/actions):
   - `VERCEL_TOKEN` = the token from step 1
   - `VERCEL_ORG_ID` = `team_T6dJ4LNsyZ8LDt9uU9Po1exz` (from `.vercel/project.json` — not secret)
   - `VERCEL_PROJECT_ID` = `prj_8SafUUr6VeV26vLClbq9MkgPyBXQ` (from `.vercel/project.json` — not secret)

3. **Create `.github/workflows/deploy.yml`** with:
   ```yaml
   name: Deploy to Vercel
   on:
     push:
       branches: [main]
     workflow_dispatch:

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with: { node-version: '20' }
         - run: npm ci
         - name: Deploy to Vercel
           run: npx vercel --prod --yes --token=${{ secrets.VERCEL_TOKEN }}
           env:
             VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
             VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
   ```

4. **Disable Vercel's auto-deploy** to avoid double builds: Vercel dashboard → Settings → Git → "Ignored Build Step" → set to `exit 0` (or disconnect git).

This workflow file is intentionally NOT committed — only spin it up if the primary integration fails permanently.

## Environment variables (production)

Set these on Vercel dashboard → Settings → Environment Variables:

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | yes | `https://fullstack-eladjak.co.il` |
| `RESEND_API_KEY` | optional | Newsletter signup (if absent, signup logs but doesn't store) |
| `RESEND_AUDIENCE_ID` | optional | Newsletter audience |
| `GEMINI_API_KEY` | optional | Image generation script (local only) |

## Vercel CLI authentication

Already authenticated as `eladjak` on this machine. To re-auth:
```bash
vercel login
```

## Skills generator (prebuild)

`scripts/generate-skills.mjs` runs before each build. Scans `~/.claude/skills/` and `~/.claude/commands/` to populate `src/data/skills-universe-generated.ts`.

In Vercel CI, this directory doesn't exist — the script exits cleanly and uses the committed `skills-universe-generated.ts` as fallback (CI-safe).
