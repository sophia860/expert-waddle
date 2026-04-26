# GitHubClaw OS

> The complete $5k/day ConnectorClaw business in a box — fork, run one command, and own a ready-to-sell $497 connector bundle in 47 seconds.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## What Is This?

**GitHubClaw OS** is a battle-hardened, turnkey GitHub repository that ships the full ConnectorClaw business stack:

- ✅ 12 production-ready `.claw` connector files
- ✅ One-command VPS installer (`install.sh`)
- ✅ Revised 24-hour $5k execution playbook (`playbook-v2.md`)
- ✅ Auto-launch agent (X/Reddit promotion + DM funnel)
- ✅ Pro Tier lifetime-update agent

---

## Quick Start

```bash
# 1. Fork this repo, then clone it onto your $5 VPS
git clone https://github.com/YOUR_USERNAME/githubclaw-os && cd githubclaw-os

# 2. Run the one-command installer
chmod +x install.sh && ./install.sh
```

The installer will guide you through setting all required API keys and launch the full connector stack automatically.

---

## Repo Structure

```
/connectors/              # 12 production-ready .claw connector files
  baileys-whatsapp-v2.claw
  telegram-bot-v2.claw
  playwright-browser-v2.claw
  stripe-payments-v2.claw
  google-workspace-v2.claw
  heyreach-linkedin-v2.claw
  composio-mcp-v2.claw
  docusign-v2.claw
  elevenlabs-voice-v2.claw
  obsidian-memory-v2.claw
  x-api-v2.claw
  cal-com-v2.claw

/install.sh               # One-command VPS spin-up (DigitalOcean / Hetzner)
/playbook-v2.md           # Revised 24h $5k execution script
/launch-agent.claw        # Auto-generates 8 X threads + $200 ad budget + DM funnel
/pro-tier-updater.claw    # Auto-pushes lifetime Pro Tier updates
```

---

## Required API Keys

| Connector | Key / Secret Needed |
|---|---|
| Anthropic Claude | `ANTHROPIC_API_KEY` |
| Composio MCP | `COMPOSIO_API_KEY` |
| Baileys WhatsApp | ngrok tunnel URL + WA session |
| Telegram | `TELEGRAM_BOT_TOKEN` |
| Playwright | no key required |
| Stripe | `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET` |
| Google Workspace | OAuth 2.0 client ID + secret |
| HeyReach LinkedIn | `HEYREACH_API_KEY` |
| ElevenLabs | `ELEVENLABS_API_KEY` |
| Obsidian Memory | local vault path |
| X API v2 | `X_BEARER_TOKEN` |
| Cal.com | `CALCOM_API_KEY` |

All keys are stored in `.env` (never committed — see `.gitignore`).

---

## Monetisation — Pro Tier ($97 lifetime)

The Pro Tier gives buyers:
- Private vault of stealth optimisation patches
- Nightly auto-updated connector bundle via `pro-tier-updater.claw`
- Priority Discord access in ClawHub

Run `launch-agent.claw` after install to start the autonomous sales funnel.

---

## Timeline

| Window | Activity |
|---|---|
| 0–3 h | Fork → `install.sh` → all connectors live |
| 3–10 h | Master agent tests full chain, generates sales assets |
| 10–24 h | `launch-agent.claw` runs X/Reddit promotion → 10–12 Pro Tier sales |

---

## License

MIT — fork freely, sell your stack.