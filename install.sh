#!/bin/bash
set -e

echo "🦞 ClawSite OS Installer (2026 Edition)"

if ! command -v npm >/dev/null 2>&1; then
  echo "❌ npm is required but was not found on PATH."
  exit 1
fi

echo "Installing dependencies..."
npm install

# Prompt for keys (input is not echoed for secret values)
read -r -p "Enter Anthropic API Key: " ANTHROPIC_KEY
read -r -s -p "Enter Stripe Secret Key: " STRIPE_SECRET
echo
read -r -p "Enter Stripe Publishable Key: " STRIPE_PUBLISHABLE
echo

# Validate that required values were provided
if [[ -z "$ANTHROPIC_KEY" || -z "$STRIPE_SECRET" || -z "$STRIPE_PUBLISHABLE" ]]; then
  echo "❌ Anthropic key, Stripe secret, and Stripe publishable key are required."
  exit 1
fi

# Fetch GitHub token (optional)
if command -v gh >/dev/null 2>&1; then
  GITHUB_TOKEN_VALUE=$(gh auth token 2>/dev/null || true)
else
  GITHUB_TOKEN_VALUE=""
fi

# Write .env.local — this file is gitignored and must never be committed
cat > .env.local << EOF
ANTHROPIC_API_KEY=${ANTHROPIC_KEY}
STRIPE_SECRET_KEY=${STRIPE_SECRET}
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${STRIPE_PUBLISHABLE}
GITHUB_TOKEN=${GITHUB_TOKEN_VALUE}
EOF

echo "✅ Installed. Now run: npm run dev"
echo "Then deploy with: vercel --prod"
