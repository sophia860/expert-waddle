"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";

async function startCheckout(tier: "starter" | "operator" | "empire") {
  const res = await fetch(`/api/checkout?tier=${tier}`, { method: "POST" });
  const data = await res.json();
  if (data.url) {
    window.location.href = data.url;
  }
}

const PRICING = [
  {
    id: "starter" as const,
    label: "Starter",
    price: "$497",
    tagline: "Launch your first ClawSite",
    features: [
      "Full Next.js storefront",
      "Stripe checkout wired in",
      "OpenClaw playground",
      "Vercel one-click deploy",
      "Community support",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    id: "operator" as const,
    label: "Operator",
    price: "$997",
    tagline: "For serious builders",
    features: [
      "Everything in Starter",
      "Helix autonomous agents",
      "Custom domain + branding",
      "Advanced analytics",
      "Priority support",
    ],
    cta: "Go Operator",
    highlight: true,
  },
  {
    id: "empire" as const,
    label: "Empire",
    price: "$1,997",
    tagline: "Build the whole network",
    features: [
      "Everything in Operator",
      "Multi-site management",
      "White-label licensing",
      "Done-for-you setup call",
      "Lifetime updates",
    ],
    cta: "Build Empire",
    highlight: false,
  },
] as const;

export default function Home() {
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  const handleCheckout = async (tier: "starter" | "operator" | "empire") => {
    setLoadingTier(tier);
    await startCheckout(tier);
    setLoadingTier(null);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen overflow-hidden bg-[#06080d] text-white">
        {/* Hero */}
        <div className="relative px-6 pb-20 pt-32">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-4 inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-400">
              🦞 Powered by Helix + OpenClaw — 2026 Edition
            </div>

            <h1 className="mb-6 text-6xl font-extrabold tracking-tighter md:text-7xl lg:text-8xl">
              Turn Any GitHub Repo
              <br />
              Into a{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                $497–$1,997
              </span>
              <br />
              Money Machine
            </h1>

            <p className="mx-auto mb-4 max-w-2xl text-xl text-zinc-400 md:text-2xl">
              Deploy a beautiful storefront in{" "}
              <span className="font-bold text-white">47 seconds</span>. Powered
              by autonomous OpenClaw agents that write copy, set prices, and
              close sales while you sleep.
            </p>

            <p className="mb-10 text-sm font-medium uppercase tracking-widest text-cyan-500">
              ClawSite OS — Fork → Deploy → Collect
            </p>

            <div className="mb-14 flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={() => handleCheckout("starter")}
                disabled={!!loadingTier}
                className="rounded-xl bg-cyan-400 px-10 py-4 text-lg font-bold text-black transition hover:bg-cyan-300 disabled:opacity-60"
              >
                {loadingTier === "starter" ? "Redirecting…" : "Deploy Your ClawSite — $497"}
              </button>
              <a
                href="#pricing"
                className="rounded-xl border border-white/20 px-10 py-4 text-lg font-semibold transition hover:bg-white/5"
              >
                See All Plans
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-10 text-sm">
              <div>
                <div className="font-mono text-3xl font-bold text-cyan-400">$2,847</div>
                <div className="mt-1 text-zinc-500">Revenue Generated Today</div>
              </div>
              <div>
                <div className="font-mono text-3xl font-bold text-cyan-400">183</div>
                <div className="mt-1 text-zinc-500">ClawSites Deployed</div>
              </div>
              <div>
                <div className="font-mono text-3xl font-bold text-cyan-400">47s</div>
                <div className="mt-1 text-zinc-500">Average Deploy Time</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div id="features" className="border-t border-white/10 py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Everything you need to{" "}
              <span className="text-cyan-400">ship and sell</span>
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: "🔗",
                  title: "Connect GitHub",
                  desc: "Auto-pulls your repo and generates a full conversion-optimised store page.",
                },
                {
                  icon: "🧬",
                  title: "Helix Agents",
                  desc: "OpenClaw agents rewrite copy, A/B test prices, and respond to DFY leads automatically.",
                },
                {
                  icon: "💰",
                  title: "Instant Payments",
                  desc: "Stripe checkout is pre-wired. Accept cards globally from minute one — no config needed.",
                },
                {
                  icon: "🚀",
                  title: "Vercel Deploy",
                  desc: "Push to main and you're live. Edge CDN, HTTPS, and custom domains included.",
                },
                {
                  icon: "🌐",
                  title: "Cloudflare API",
                  desc: "TanStack Start proxy routes run on Cloudflare Workers — sub-10ms response worldwide.",
                },
                {
                  icon: "📊",
                  title: "Sales Analytics",
                  desc: "Live revenue dashboard, Stripe webhooks, and automatic buyer DMs via launch-agent.",
                },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 transition hover:border-cyan-500/40"
                >
                  <div className="mb-3 text-3xl">{icon}</div>
                  <h3 className="mb-2 text-lg font-semibold">{title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div id="pricing" className="border-t border-white/10 py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="mb-4 text-center text-3xl font-bold">Simple, one-time pricing</h2>
            <p className="mb-12 text-center text-zinc-400">
              Pay once, own it forever. No subscriptions, no revenue splits.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              {PRICING.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative flex flex-col rounded-2xl border p-8 ${
                    plan.highlight
                      ? "border-cyan-400/60 bg-zinc-900 shadow-[0_0_40px_rgba(34,211,238,0.15)]"
                      : "border-white/10 bg-zinc-900/50"
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cyan-400 px-4 py-1 text-xs font-bold text-black">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="mb-1 text-sm font-semibold uppercase tracking-widest text-cyan-400">
                    {plan.label}
                  </div>
                  <div className="mb-2 text-4xl font-extrabold">{plan.price}</div>
                  <div className="mb-6 text-sm text-zinc-400">{plan.tagline}</div>
                  <ul className="mb-8 flex-1 space-y-2.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                        <span className="mt-0.5 text-cyan-400">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleCheckout(plan.id)}
                    disabled={!!loadingTier}
                    className={`w-full rounded-xl py-3 text-sm font-bold transition disabled:opacity-60 ${
                      plan.highlight
                        ? "bg-cyan-400 text-black hover:bg-cyan-300"
                        : "border border-white/20 text-white hover:bg-white/5"
                    }`}
                  >
                    {loadingTier === plan.id ? "Redirecting…" : plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className="border-t border-white/10 py-10 text-center text-sm text-zinc-500">
          <p className="mb-1">
            <span className="text-cyan-400 font-semibold">ClawSite OS</span> — Built for the 2026 OpenClaw gold rush
          </p>
          <p>
            <a
              href="https://github.com/sophia860/clawsite-os"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              GitHub
            </a>
            {" · "}
            <a href="/api/checkout?tier=starter" className="hover:text-cyan-400 transition-colors">
              Get Starter
            </a>
          </p>
        </footer>
      </main>
    </>
  );
}
