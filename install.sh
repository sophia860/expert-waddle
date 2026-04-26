#!/usr/bin/env bash
# install.sh — GitHubClaw OS one-command VPS installer
# Supports: DigitalOcean, Hetzner, or any Ubuntu 22.04+ VPS
# Usage:  chmod +x install.sh && ./install.sh

set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$REPO_DIR/.env"
SESSIONS_DIR="$REPO_DIR/sessions/whatsapp"

echo "============================================"
echo "  GitHubClaw OS — Installer v2.0"
echo "============================================"
echo ""

# ── 1. System dependencies ────────────────────────────────────────────────────
echo "[1/6] Installing system dependencies..."
if command -v apt-get &>/dev/null; then
  sudo apt-get update -qq
  sudo apt-get install -y -qq curl jq git unzip nodejs npm
elif command -v brew &>/dev/null; then
  brew install curl jq git node
else
  echo "  ⚠ Unsupported package manager. Install curl, jq, git, nodejs manually."
fi
echo "  ✓ System dependencies ready."

# ── 2. Node.js / npm packages ─────────────────────────────────────────────────
echo "[2/6] Installing Node.js packages..."
cd "$REPO_DIR"
if [ ! -f package.json ]; then
  npm init -y --quiet
fi
npm install --silent @anthropic-ai/sdk stripe googleapis @composio/sdk ngrok baileys elevenlabs
echo "  ✓ Node packages installed."

# ── 3. Environment file ───────────────────────────────────────────────────────
echo "[3/6] Configuring environment variables..."
if [ ! -f "$ENV_FILE" ]; then
  cp "$REPO_DIR/.env.example" "$ENV_FILE"
  echo "  ➜ A fresh .env file has been created from .env.example."
  echo "    Fill in all API keys before continuing, then re-run this script."
  echo ""
  echo "    Required keys:"
  grep -E '^[A-Z_]+=' "$ENV_FILE" | cut -d= -f1 | sed 's/^/      /'
  echo ""
  exit 0
else
  echo "  ✓ .env file found."
fi

# shellcheck source=/dev/null
source "$ENV_FILE"

# ── 4. Sessions directory ─────────────────────────────────────────────────────
echo "[4/6] Creating session directories..."
mkdir -p "$SESSIONS_DIR"
echo "  ✓ Session directories ready."

# ── 5. Connector self-test ────────────────────────────────────────────────────
echo "[5/6] Running connector smoke-tests..."

test_connector() {
  local name="$1"
  local key_var="$2"
  if [ -n "${!key_var:-}" ]; then
    echo "  ✓ $name — key present"
  else
    echo "  ✗ $name — missing $key_var"
    MISSING_KEYS=true
  fi
}

MISSING_KEYS=false
test_connector "Anthropic Claude"       "ANTHROPIC_API_KEY"
test_connector "Composio MCP"           "COMPOSIO_API_KEY"
test_connector "Telegram Bot"           "TELEGRAM_BOT_TOKEN"
test_connector "Stripe"                 "STRIPE_SECRET_KEY"
test_connector "Stripe Webhook"         "STRIPE_WEBHOOK_SECRET"
test_connector "Google OAuth (client)"  "GOOGLE_CLIENT_ID"
test_connector "HeyReach LinkedIn"      "HEYREACH_API_KEY"
test_connector "ElevenLabs"             "ELEVENLABS_API_KEY"
test_connector "X API"                  "X_BEARER_TOKEN"
test_connector "Cal.com"                "CALCOM_API_KEY"

if [ "$MISSING_KEYS" = "true" ]; then
  echo ""
  echo "  ⚠ Some API keys are missing. Add them to .env and re-run install.sh."
  exit 1
fi

# ── 6. Launch confirmation ────────────────────────────────────────────────────
echo "[6/6] All checks passed."
echo ""
echo "============================================"
echo "  ✅ GitHubClaw OS is ready!"
echo "============================================"
echo ""
echo "  Next steps:"
echo "    • Follow /playbook-v2.md for the full 24h \$5k execution guide."
echo "    • Run the launch agent:  node run-agent.js launch-agent"
echo "    • Activate Pro Tier updater: node run-agent.js pro-tier-updater"
echo ""
