# ClawSite OS

### Turn any OpenClaw repo into a $497–$1,997 business in 47 seconds.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sophia860/expert-waddle)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-expert--waddle--eta.vercel.app-00f5ff?style=flat&logo=vercel)](https://expert-waddle-eta.vercel.app)

**One repo. Fork it. Deploy it. Sell it.**

---

## What Is This?

ClawSite OS is a turnkey monetized storefront template built for the OpenClaw AI ecosystem. Fork this repo and you instantly have:

- **Landing page** — high-converting dark-futuristic design with animated hero, features grid, and pricing tiers
- **Stripe checkout** — three tiers wired up ($497 Starter / $997 Pro / $1,997 Agency)
- **Live demo playground** — let visitors interact with your OpenClaw agent before buying
- **Cloudflare Workers API proxy** — keeps your API keys server-side, auto-scales globally

---

## Quick Start

```bash
git clone https://github.com/sophia860/expert-waddle.git
cd expert-waddle
./install.sh        # prompts for API keys, writes .env.local
npm run dev         # storefront at localhost:3000
```

---

## Architecture

| Directory | Framework | Deploy Target | Purpose |
|-----------|-----------|--------------|---------|
| `app/` | Next.js 15 App Router | Vercel | Public storefront + Stripe checkout |
| `src/` | TanStack Start + Vite | Cloudflare Workers | VibeCode Studio UI + OpenClaw API proxy |
| `components/` | Shared | Both | Navbar and shared layout components |
| `src/components/ui/` | shadcn/ui | Both | 45+ Radix UI components |

---

## Environment Variables

Create `.env.local` (or let `./install.sh` do it for you):

```bash
# Stripe
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Anthropic (for demo playground)
ANTHROPIC_API_KEY=sk-ant-...

# Cloudflare Workers (set via wrangler secrets)
OPENCLAW_API_URL=https://your-openclaw-endpoint.workers.dev
OPENCLAW_API_KEY=your-api-key
```

---

## Pricing Tiers (Editable in `app/page.tsx`)

| Tier | Price | Target |
|------|-------|--------|
| Starter | $497 | Solo founders |
| Pro ⭐ | $997 | Growing teams |
| Agency | $1,997 | Client work / resellers |

---

## Deploy

**Storefront (Vercel):**
1. Fork this repo
2. Connect to [vercel.com](https://vercel.com) — import the repo
3. Add environment variables in the Vercel dashboard
4. Push to `main` → auto-deploys

**API Proxy (Cloudflare):**
```bash
npx wrangler deploy
npx wrangler secret put OPENCLAW_API_KEY
```

---

## Tech Stack

- **Next.js 15** (App Router) — storefront and Stripe API routes
- **TanStack Start + Vite** — demo playground and Cloudflare proxy
- **Tailwind CSS** — dark futuristic theme with `cyber` color tokens
- **Framer Motion** — hero animations and micro-interactions
- **shadcn/ui** — 45+ accessible Radix UI components
- **Stripe** — checkout sessions and webhook handling
- **Cloudflare Workers** — edge-deployed API proxy

---

## License

MIT — fork freely, sell commercially, keep the hustle going.
