# ClawSite OS

ClawSite OS is a turnkey monetized storefront template for the OpenClaw ecosystem.

## Headline Offer

ClawSite OS — Turn Any GitHub Repo Into a $497–$1,997 Money Machine in 47 Seconds

## What You Get

- Next.js storefront with dark futuristic UI and conversion-focused landing page
- Stripe checkout flow with tiered pricing: $497, $997, $1,997
- OpenClaw playground and API proxy powered by TanStack Start + Cloudflare
- Installer script for fast local setup and environment bootstrapping
- Launch workflow config in launch-agent.claw

## Quick Start

```bash
git clone https://github.com/sophia860/clawsite-os.git
cd clawsite-os
chmod +x install.sh
./install.sh
npm run dev
```

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sophia860/clawsite-os)

Set required environment variables in Vercel:

- ANTHROPIC_API_KEY
- STRIPE_SECRET_KEY
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- NEXT_PUBLIC_BASE_URL

## Pricing Tiers

- Starter: $497
- Operator: $997
- Empire: $1,997

## Scripts

- npm run dev: Start Next.js storefront
- npm run build: Build production storefront
- npm run start: Start production server
- npm run lint: Run lint checks

## Project Structure

- app: Next.js storefront and API routes
- components: Shared React components
- src: TanStack Start app, routes, and shared UI primitives
- launch-agent.claw: Launch automation config

## License

MIT
