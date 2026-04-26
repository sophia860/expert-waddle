# 24-Hour $5k Execution Playbook

## Overview
This playbook walks you through launching ClawSite OS from a fresh fork to your first Pro Tier sales within 24 hours.

---

## Phase 0 — Setup (0–30 min)

1. Fork this repo on GitHub and make it public.
2. Clone locally:
   ```bash
   git clone https://github.com/sophia860/clawsite-os.git
   cd clawsite-os
   chmod +x install.sh
   ./install.sh
   ```
3. Confirm `npm run dev` shows the site at `http://localhost:3000`.

---

## Phase 1 — Deploy (30–90 min)

1. Push any customizations (logo, color tweaks, pricing copy) to `main`.
2. Click the **Deploy with Vercel** button in README, or run:
   ```bash
   vercel --prod
   ```
3. Set environment variables in the Vercel dashboard (same keys as `.env.local`).
4. Confirm live URL is working end-to-end (page load → Stripe checkout → success page).

---

## Phase 2 — Launch Agent (90–240 min)

1. Review and edit `launch-agent.claw` with your real X handle, ad budget, and DM templates.
2. Run the agent sequence (requires your OpenClaw runtime to be configured).
3. Monitor Stripe dashboard for incoming payments.

---

## Phase 3 — Close Sales (4–24 h)

**Targets:**
- 3-5 Starter sales @ $497
- 2-4 Operator sales @ $997
- 2–3 Done-For-You (DFY) engagements @ $1,997

**Channels:**
- X (Twitter) thread using the template in `launch-agent.claw`
- Direct outreach to followers who engage with the thread
- Paid ads (budget: $200, targeting indie hackers / developer audience)

**Qualifying DFY buyers:** Look for replies asking "can you set this up for me?" — those are your $1,997 leads.

---

## Notes
- Keep `.env.local` out of version control (it is gitignored).
- Rotate API keys immediately if accidentally exposed.
- All financial projections are estimates; results depend on your audience and execution.
