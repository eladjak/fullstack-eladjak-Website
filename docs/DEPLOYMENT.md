# Deployment

## Current state (2026-04-27)

Production: `https://fullstack-eladjak.co.il` (Vercel)
Project: `eladjak-website` (team `T6dJ4LNsyZ8LDt9uU9Po1exz`, project `prj_8SafUUr6VeV26vLClbq9MkgPyBXQ`)

## How to deploy

### Quick path — manual deploy from local

```bash
npm run deploy   # → vercel --prod --yes
```

This builds locally, uploads, and aliases to `fullstack-eladjak.co.il`. Takes ~1 minute.

### Auto-deploy on push to main

**Status: BROKEN since 2026-04-10.**

Vercel git integration stopped triggering deployments around April 10, 2026. The previous "Deploy to Vercel" GitHub Actions workflow (now removed from the repo) was also failing since 2026-02-13.

**Fix to re-enable auto-deploy:**

1. Open Vercel dashboard → eladjak-website project → Settings → Git
2. Verify the GitHub repo `eladjak/fullstack-eladjak-Website` is connected
3. If disconnected: click "Connect GitHub" and re-authorize (1 click)
4. Production branch should be `main`
5. Verify webhook on GitHub side: `https://github.com/eladjak/fullstack-eladjak-Website/settings/hooks` — should have `vercel.com` webhook with green status

After reconnecting, every push to `main` triggers a Vercel build automatically. Until then, run `npm run deploy` manually.

## CI build check

`.github/workflows/ci.yml` runs on every push + PR:
- Type-check (`npx tsc --noEmit`)
- Production build (`npm run build`)

This catches build errors BEFORE they hit Vercel. Does NOT deploy.

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
