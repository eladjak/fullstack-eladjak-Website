import {
  Workflow,
  GitBranch,
  Zap,
  Shield,
  Terminal,
  Github,
  ExternalLink,
  BookOpen,
  Rocket,
  Users,
  Mail,
  Activity,
  Package,
  CheckCircle,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const githubActionsGuideEn: AgentGuideData = {
  slug: "github-actions",
  agentName: "GitHub Actions",
  agentNameHe: "GitHub Actions — CI/CD Built Into Your Repo",
  category: "infra",
  brandIconSlug: "github",
  brandIconColor: "2088FF",
  heroBgImage: "/images/guides/guide-github-actions-hero.jpg",
  tagline: "every push runs tests, builds and deploys — without a separate CI server, free for open source",
  heroDescription:
    "GitHub Actions is a CI/CD (continuous integration / continuous deployment) system built directly into GitHub. CI/CD is the name for the automation that, every time you push code, runs tests, builds the application, and if everything is green — deploys it to production. Once upon a time, building such a pipeline required a separate CI server (Jenkins, TeamCity), hours of setup, and ongoing maintenance. With GitHub Actions, it's a single YAML file inside the repo (`.github/workflows/`) and GitHub itself runs everything on their servers — free for open source projects, and with 2,000 free minutes per month for private projects. For me (Elad), GitHub Actions builds this site (Next.js) every time something is pushed to main, deploys it automatically to Vercel, runs TypeScript checks, and verifies that no secrets accidentally leaked into the code. I also have actions that run daily tasks (cron triggers), open PRs automatically when dependencies are out of date (Dependabot) — all without a single server of mine. It's the tool that makes the difference between 'I'm just hacking alone' and 'I have a professional process'.",
  badgeText: "2026 · CI/CD · Practical guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/github-actions",
  stats: [
    { label: "workflows I run", value: "12+" },
    { label: "free minutes / month", value: "2,000" },
    { label: "site deploy time", value: "~90s" },
    { label: "OSS cost", value: "0" },
  ],
  paradigmTitle: "CI/CD without a CI server",
  paradigmSub:
    "Instead of standing up Jenkins, configuring agents, and maintaining them. The file in the repo is the config. The rest is GitHub's job.",
  paradigmShifts: [
    {
      before: "Jenkins server, 2 build agents, maintenance",
      after: "One YAML file, GitHub runs it",
      icon: Workflow,
    },
    {
      before: "Manual deploy: ssh, git pull, restart",
      after: "git push → 90 seconds → live",
      icon: Rocket,
    },
    {
      before: "Dependencies stale, security alerts ignored",
      after: "Dependabot opens a PR, CI runs tests",
      icon: Shield,
    },
    {
      before: "Daily task = cron on a personal server",
      after: "schedule trigger in Actions — no server",
      icon: Activity,
    },
  ],
  whoIsThisFor: [
    {
      title: "Solo developers",
      description:
        "You need automation the most — there's no one else to check your code. CI running tests = your safety net.",
      icon: Rocket,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Small teams maintaining open source",
      description:
        "Open source on GitHub = unlimited free Actions. Bonus: contributors feel comfortable opening PRs because tests run automatically.",
      icon: Github,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Anyone still doing manual deploys",
      description:
        "If you still `git pull && pm2 restart`, it's time. Automation = fewer production bugs.",
      icon: Terminal,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Anyone with a mono-repo",
      description:
        "Matrix builds (Node 18 + 20 + 22 in parallel), per-package workflows, deploy only what changed. Actions does it all.",
      icon: Package,
      color: "from-orange-500 to-amber-500",
    },
  ],
  toc: [
    { id: "what-is", label: "What it is" },
    { id: "first-workflow", label: "First workflow" },
    { id: "deploy-nextjs", label: "Deploy to Vercel" },
    { id: "secrets", label: "Secrets & OIDC" },
    { id: "advanced", label: "Advanced" },
    { id: "tips", label: "Tips" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Workflow,
      title: "What is GitHub Actions: workflow, jobs, steps",
      subtitle: "The hierarchy every YAML file describes",
      description:
        "GitHub Actions is built from three levels. Workflow = a single YAML file triggered by an event (push, PR, schedule, manual). Jobs = work units inside a workflow that can run in parallel or sequentially. Steps = commands inside a job. Each job runs on a runner — a brand-new VM GitHub provides, with Linux/Windows/macOS to choose from. After the workflow finishes, the runner is destroyed — clean slate every run.",
      color: "from-blue-600 to-cyan-500",
      difficulty: "beginner",
      beginner:
        "Think of a workflow like a recipe: 'when the flour matches' (event), 'prepare the dough' (job 1), 'add chocolate' (step), 'bake' (job 2). Every instruction is written. Each time you run the recipe you immediately get a brand-new kitchen — and at the end, a consistent result. That's exactly GitHub Actions.",
      content: [
        "Workflow file — a YAML file at `.github/workflows/<name>.yml` in your repo. Filename = workflow name",
        "Trigger (`on:`) — when to run. `push`, `pull_request`, `schedule` (cron), `workflow_dispatch` (manual)",
        "Jobs — each runs on its own runner. Default: in parallel. You can declare `needs:` to create dependencies",
        "Steps — inside each job, an ordered list of actions. Each step is either `run:` (a shell command) or `uses:` (a pre-built action)",
        "Actions — pre-built code packages. `actions/checkout@v4` (download the code), `actions/setup-node@v4` (install Node), and thousands more in the GitHub Marketplace",
        "Runners — machines that execute jobs. Default: GitHub-hosted (free up to 2,000 min/month for private). You can also self-host on your own server",
        "Artifacts — files preserved between jobs or kept after the workflow ends. Useful for build outputs",
      ],
      tips: [
        "The Actions Marketplace is gold — before writing your own action, search there. Almost always, someone has done it",
        "Always pin action versions: `actions/checkout@v4`, not `actions/checkout@main`. Otherwise your workflow can break when they ship a breaking change",
      ],
    },
    {
      id: "first-workflow",
      icon: GitBranch,
      title: "First workflow: TypeScript check on every PR",
      subtitle: "5 minutes from zero to real CI",
      description:
        "The best way to learn is to see a simple workflow that does something real. The example below runs `tsc --noEmit` and `eslint` on every push and every PR — so nothing ever merges to main that doesn't pass type-check.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "beginner",
      content: [
        "Create a folder: `mkdir -p .github/workflows`",
        "Create a file: `.github/workflows/ci.yml`",
        "Write the YAML (see the example below)",
        "Commit + push: `git add .github && git commit -m 'add CI' && git push`",
        "Open GitHub → Actions tab — you'll see the workflow run. Finishes in around a minute",
        "From now on, every push triggers it automatically. PRs will show a ✅ or ❌ next to the status",
        "You can add branch protection in GitHub Settings: 'require status checks to pass before merging' — now you can't merge without green CI",
      ],
      tips: [
        "Start simple — typecheck + lint is 80% of the value. Tests later, deploy after tests are in",
        "If CI fails, GitHub sends an automatic email. You can disable that in your account settings if it's noisy",
      ],
      codeExample: {
        label: ".github/workflows/ci.yml — typecheck + lint on every push",
        code: "name: CI\n\non:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\n\njobs:\n  typecheck:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Checkout\n        uses: actions/checkout@v4\n\n      - name: Setup Node\n        uses: actions/setup-node@v4\n        with:\n          node-version: '20'\n          cache: 'npm'\n\n      - name: Install dependencies\n        run: npm ci\n\n      - name: TypeScript check\n        run: npx tsc --noEmit\n\n      - name: Lint\n        run: npx eslint . --max-warnings=0",
      },
    },
    {
      id: "deploy-nextjs",
      icon: Rocket,
      title: "Auto-deploy Next.js to Vercel",
      subtitle: "Push to main = production deploy in under two minutes",
      description:
        "Once CI is working, the next step is automatic deploy. Vercel supports a GitHub integration that deploys on every push without a special workflow — but if you want full control (deploy only after tests pass, to a specific environment, with custom build args), a YAML workflow gives you that.",
      color: "from-purple-600 to-violet-500",
      difficulty: "intermediate",
      content: [
        "Option A: Vercel GitHub integration (the easy one) — just connect the repo to a Vercel project, and it starts working automatically. No workflow needed",
        "Option B: a custom workflow — you control when to deploy. The workflow below runs tests first, and only if they pass — sends to Vercel",
        "Vercel Token — get an API token from Vercel (vercel.com/account/tokens). Save it in GitHub Secrets as `VERCEL_TOKEN`",
        "Vercel Org ID + Project ID — from `.vercel/project.json` after `vercel link`. Save them in secrets as `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`",
        "Preview vs Production — `vercel deploy` creates a preview deployment with a unique URL; `vercel deploy --prod` deploys to the main domain",
        "PR comments — you can add `actions/github-script@v7` that posts a comment on the PR with the preview URL",
        "Rollback — if something is broken, in the Vercel dashboard you can roll back to a previous deployment with one click",
      ],
      tips: [
        "On this site (Next.js): tests + typecheck run in CI, and then Vercel deploys automatically. In 90% of cases, push-to-live is under 2 minutes",
        "Vercel is the easiest for Next.js, but the same workflow works with Cloudflare Pages, Netlify, and Railway — just with their respective CLIs",
      ],
      codeExample: {
        label: "Deploy to Vercel only after tests pass",
        code: "name: Deploy\n\non:\n  push:\n    branches: [main]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: '20', cache: 'npm' }\n      - run: npm ci\n      - run: npx tsc --noEmit\n      - run: npm test --if-present\n\n  deploy:\n    needs: test  # only runs if test succeeded\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: '20' }\n\n      - name: Install Vercel CLI\n        run: npm install --global vercel@latest\n\n      - name: Pull Vercel env\n        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}\n        env:\n          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}\n          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}\n\n      - name: Build\n        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}\n\n      - name: Deploy to Vercel\n        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}",
      },
    },
    {
      id: "secrets",
      icon: Shield,
      title: "Secrets & OIDC: don't put API keys in code",
      subtitle: "How to give CI cloud access without static credentials",
      description:
        "Every workflow that does a deploy needs access to some cloud (Vercel, AWS, Cloudflare). The old way is static tokens stored in GitHub Secrets — it works but isn't ideal (a leaked token = full account access). The modern way is OIDC (OpenID Connect): GitHub issues a unique JWT per workflow run, and you configure trust in the cloud that 'if this JWT came from repo X, branch Y, you can assume it's me'.",
      color: "from-amber-600 to-orange-500",
      difficulty: "advanced",
      content: [
        "GitHub Secrets — secure storage for sensitive settings. Settings → Secrets and variables → Actions. Accessible only inside workflows, never shown in logs",
        "Repository secrets — for the whole repo. Organization secrets — for the whole org. Environment secrets — only for deploys to a specific environment",
        "OIDC for AWS — instead of an AWS access key, configure an IAM role with a trust policy that accepts GitHub OIDC JWTs. Workflow generates a token, AWS validates it, gives back temporary credentials",
        "OIDC for GCP — similar. Workload Identity Federation. In GCP you configure a pool that trusts the GitHub provider",
        "OIDC for Cloudflare — Cloudflare supports OIDC for Workers deployments",
        "Secrets meant for development — `.env.local` not in git. Only on your machine",
        "Allow only the actions you use — Settings → Actions → 'Allow specific actions'. Add only the ones you know. Prevents supply chain attacks",
      ],
      tips: [
        "All my secrets are in GitHub Secrets, never in `.env` outside local. Once a secret leaks into code, it's in history forever — automated scanners will spot it within minutes",
        "GitHub has Secret Scanning that rejects pushes including known API keys (AWS, OpenAI, Anthropic, etc.). Make sure it's enabled on the repo",
      ],
      codeExample: {
        label: "OIDC to AWS — no static access keys",
        code: "name: Deploy to AWS\n\non:\n  push:\n    branches: [main]\n\npermissions:\n  id-token: write   # required for OIDC\n  contents: read\n\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n\n      - name: Configure AWS credentials via OIDC\n        uses: aws-actions/configure-aws-credentials@v4\n        with:\n          role-to-assume: arn:aws:iam::123456789012:role/GitHubActionsRole\n          aws-region: us-east-1\n          # No need for AWS_ACCESS_KEY_ID or SECRET!\n\n      - name: Deploy\n        run: |\n          aws s3 sync ./dist s3://my-bucket --delete\n          aws cloudfront create-invalidation \\\n            --distribution-id ${{ vars.CF_DIST_ID }} \\\n            --paths '/*'",
      },
    },
    {
      id: "advanced",
      icon: Zap,
      title: "Advanced: matrix, reusable, self-hosted",
      subtitle: "The features that make a difference",
      description:
        "Once you have a basic working workflow, here are the features that level you up.",
      color: "from-rose-600 to-pink-500",
      difficulty: "advanced",
      content: [
        "Matrix builds — run the same job with different variable combinations. For example Node 18, 20, 22 + Linux, Windows, macOS = 9 parallel runs. Catches compatibility issues immediately",
        "Reusable workflows — a workflow you can call with `uses: org/repo/.github/workflows/x.yml@main`. Excellent when 10 repos do the same things",
        "Composite actions — group several steps into a single action you can call from different workflows. Keeps things DRY",
        "Cache — `actions/cache@v4` saves directories between runs. For example `node_modules` or Rust's `target/`. Saves minutes per workflow",
        "Concurrency — `concurrency: { group: deploy, cancel-in-progress: true }` — if a new push arrives, cancels the previous one. Prevents deploy race conditions",
        "Self-hosted runners — run jobs on your own server instead of GitHub's. Useful for heavy work, internal-network access, or cost control",
        "Issue/PR automation — actions that respond automatically to PRs ('thanks for the contribution!'), label issues, close stale issues",
      ],
      tips: [
        "matrix exclude — if there's a combination you don't want (Windows + Node 18), use `exclude` to drop it",
        "Self-hosted runner on a VPS = a workflow that can talk to your internal agents, deploy to Docker, etc. But careful: actions run on your server, so make sure CI runs only from trusted PRs",
        "Your `actions/cache` can save 40-60% of CI time. Always make sure it's loaded before npm install",
      ],
    },
    {
      id: "tips",
      icon: CheckCircle,
      title: "Field tips",
      subtitle: "What I've learned from three years of GitHub Actions",
      description:
        "After three years of using GitHub Actions, here are the things I wish I knew at the start.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "intermediate",
      content: [
        "Always set `timeout-minutes` on a job. Default is 6 hours — a stuck workflow can eat all your free minutes",
        "Always add `permissions:` at the workflow level. Default is 'read all', but specific work needs less. Principle of least privilege",
        "Use `workflow_dispatch` for manual runs with inputs. Useful for deploys to different environments without pushing code",
        "GitHub Actions logs are deleted after 90 days. If something is important — save artifacts or push to S3 at the end",
        "A composite action lives in a repo `org/composite-actions` with `action.yml` in a folder. Then any repo in the org can call it",
        "Add `if: failure()` to a final step that notifies Slack/Discord. Then you immediately know when CI breaks",
        "Open the GitHub Actions tab occasionally and see 'most-run workflows'. You'll surprise yourself with how many minutes you wasted, and what to optimize",
      ],
      tips: [
        "Read GitHub's billing page once a month — `Settings → Billing → Plans and usage`. If you're suddenly paying for Actions, something is inefficient",
        "Dependabot and Renovate are actions themselves. Enable one of them on the repo — it'll open PRs automatically when there are security updates",
      ],
    },
  ],
  resources: [
    {
      title: "GitHub Actions Documentation",
      description: "The official docs — comprehensive and current",
      href: "https://docs.github.com/en/actions",
      icon: BookOpen,
    },
    {
      title: "GitHub Actions Marketplace",
      description: "Thousands of ready actions. Search before writing",
      href: "https://github.com/marketplace?type=actions",
      icon: Github,
    },
    {
      title: "act (test locally)",
      description: "A tool that runs Actions on your machine — saves time during workflow development",
      href: "https://github.com/nektos/act",
      icon: Github,
    },
    {
      title: "actions/checkout",
      description: "The first action in every workflow — to download the code",
      href: "https://github.com/actions/checkout",
      icon: Github,
    },
    {
      title: "Awesome Actions",
      description: "An organized list of great actions",
      href: "https://github.com/sdras/awesome-actions",
      icon: Github,
    },
    {
      title: "The Vercel guide",
      description: "Next.js deploy — how it works with Actions",
      href: "/en/guide/vercel",
      icon: BookOpen,
    },
  ],
  ctaTitle: "Need help setting up CI/CD?",
  ctaSub:
    "A good CI saves hours every week and prevents production bugs. I can set up your whole pipeline in an hour.",
  primaryCta: {
    label: "GitHub Actions Quickstart",
    href: "https://docs.github.com/en/actions/quickstart",
    icon: BookOpen,
  },
  secondaryCta: {
    label: "Book a CI/CD setup",
    href: "https://wa.me/972525427474",
    icon: Mail,
  },
  authorBio:
    "I have 12+ workflows running across my repos: every site has full CI, automatic deploy to Vercel, daily tasks that schedule themselves, and Dependabot keeping things up to date. Everything in the free tier (open source) or within the 2,000 free minutes. This guide is the distilled version of 3 years of active use across roughly 100 different repos.",
};
