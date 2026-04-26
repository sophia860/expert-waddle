# ClawSite OS — Agent Instructions

## What This Project Is

A turnkey monetized storefront template for the OpenClaw AI ecosystem. One repo = landing page + Stripe checkout + live demo playground + Cloudflare-hosted API. See [README.md](README.md) for the pitch.

## Architecture — Critical: Dual Framework Monorepo

This repo runs **two separate frameworks** with different build systems and deployment targets:

| Directory | Framework | Deploy Target | Purpose |
|-----------|-----------|--------------|---------|
| `app/` | Next.js 15 App Router | Vercel | Public storefront + Stripe checkout |
| `src/` | TanStack Start + Vite | Cloudflare Workers | VibeCode Studio UI + OpenClaw API proxy |
| `components/` | Shared | Both | Components used by Next.js pages |
| `src/components/ui/` | shadcn/ui | Both | 45+ Radix UI components |

**Do not mix routing patterns.** Next.js routes live under `app/` (file-based App Router). TanStack routes live under `src/routes/` (using `createFileRoute()` / `createAPIFileRoute()`).

## Build & Dev Commands

```bash
npm run dev      # Next.js storefront — localhost:3000
npm run build    # Next.js production build
npm run lint     # ESLint (Next.js + TypeScript + Prettier)
./install.sh     # First-time setup: prompts for API keys, writes .env.local
```

TanStack Start builds via Vite (`vite.config.ts`) and deploys separately via `wrangler.jsonc`.

## Design System

- **Theme**: Dark futuristic — deep blacks, electric cyan `#00f5ff`, purple `#a855f7`
- **UI components**: shadcn/ui (New York style) in `src/components/ui/` — always prefer these over raw HTML
- **Animations**: Framer Motion is installed — use it for premium interactions
- **Tailwind**: Custom `cyber` color tokens configured in `tailwind.config.ts`. Note: Tailwind scans `app/`, `components/`, `pages/` — **NOT `src/`**. Add `src/` classes carefully or add the path to the config.
- **Tone**: High-energy, conversion-focused marketing copy. See [playbook.md](playbook.md) for voice/messaging.

## Key Conventions

- **Path alias**: `@/` maps to `./src/*` (see `tsconfig.json`)
- **Utility**: Use `cn()` from `src/lib/utils.ts` for conditional Tailwind classes
- **API routes (Next.js)**: Export named HTTP methods (`GET`, `POST`) from `app/api/*/route.ts`
- **API routes (TanStack)**: Use `createAPIFileRoute()` in `src/routes/api/*.ts`
- **Forms**: React Hook Form + Zod validation
- **No `@typescript-eslint/no-unused-vars`**: Rule is disabled — don't add it back

## Environment Variables

```bash
# .env.local (Next.js / Vercel)
ANTHROPIC_API_KEY
STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
GITHUB_TOKEN                          # optional

# Cloudflare Workers secrets (TanStack)
OPENCLAW_API_URL
OPENCLAW_API_KEY
```

## Pitfalls

- `tailwind.config.ts` does **not** scan `src/` — TanStack components need classes added via `safelist` or the scan path updated
- `app/success` route does not exist yet — Stripe redirects there but it's unimplemented
- `launch-agent.claw` is a config file for the OpenClaw runtime, not executable JavaScript
- `bun.lockb` exists but `npm` is the canonical package manager; use `npm` unless the task explicitly targets Bun
