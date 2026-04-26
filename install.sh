#!/bin/bash
set -e

echo "🦞 ClawSite OS Installer (2026 Edition)"

# Install dependencies
npm install

# Prompt for keys (input is not echoed for secret values)
read -p "Enter Anthropic API Key: " ANTHROPIC_KEY
read -s -p "Enter Stripe Secret Key: " STRIPE_SECRET
echo
read -s -p "Enter Vercel Token: " VERCEL_TOKEN
echo

# Validate that required values were provided
if [[ -z "$ANTHROPIC_KEY" || -z "$STRIPE_SECRET" || -z "$VERCEL_TOKEN" ]]; then
  echo "❌ All keys are required. Aborting."
  exit 1
fi

# Fetch GitHub token (requires gh CLI to be authenticated)
GITHUB_TOKEN_VALUE=$(gh auth token 2>/dev/null || echo "")

# Write .env.local — this file is gitignored and must never be committed
cat > .env.local << EOF
ANTHROPIC_API_KEY=${ANTHROPIC_KEY}
STRIPE_SECRET_KEY=${STRIPE_SECRET}
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_REPLACE_WITH_YOUR_PUBLISHABLE_KEY
GITHUB_TOKEN=${GITHUB_TOKEN_VALUE}
EOF

echo "✅ Installed. Now run: npm run dev"
echo "Then deploy with: vercel --prod"
