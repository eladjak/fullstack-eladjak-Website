# Elad Jakobovits - Portfolio Website

A modern, full-stack personal portfolio and developer website built with Next.js 16. Features a blog with MDX support, project showcase, interactive UI components, and comprehensive i18n (Hebrew + English).

## Features

- Developer portfolio with project showcase
- Blog powered by MDX (Markdown + React components)
- Bilingual support (Hebrew RTL + English)
- Responsive, mobile-first design
- Dark/light theme support
- Framer Motion animations
- Vercel Analytics and Speed Insights
- Headless UI and Radix UI accessible components
- Playwright E2E testing
- Jest unit testing

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| [Next.js 16](https://nextjs.org/) | React framework (App Router) |
| [React 18](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [MDX](https://mdxjs.com/) | Blog content |
| [Radix UI](https://www.radix-ui.com/) | Accessible UI primitives |
| [Headless UI](https://headlessui.com/) | Accessible components |
| [Geist](https://vercel.com/font) | Typography |
| [Lucide React](https://lucide.dev/) | Icons |
| [Playwright](https://playwright.dev/) | E2E testing |
| [Jest](https://jestjs.io/) | Unit testing |

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 20+

### Installation

```bash
git clone https://github.com/eladjak/fullstack-eladjak-Website.git
cd fullstack-eladjak-Website
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
bun run build
bun start
```

### Run Tests

```bash
bun test           # Unit tests
bun run test:e2e   # E2E tests
```

## Project Structure

```
fullstack-eladjak-Website/
├── app/          # Next.js App Router pages and layouts
├── components/   # Reusable React components
├── constants/    # App-wide constants
├── hooks/        # Custom React hooks
├── i18n/         # Internationalization config and translations
├── lib/          # Utility functions
├── styles/       # Global styles
├── test/         # Test configuration
├── types/        # TypeScript type definitions
└── package.json
```

## License

MIT

---

⭐ If you find this useful, please star the repo!

*[README בעברית](README.he.md)*
