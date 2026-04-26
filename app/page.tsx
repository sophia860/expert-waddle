"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const { url } = await res.json();
      window.location.href = url;
    } catch {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white font-mono overflow-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-32 pb-24 text-center">
        {/* Background glow */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="mb-4 inline-block rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-1 text-xs text-cyan-400 uppercase tracking-widest">
            2026 OpenClaw Gold Rush
          </span>

          <h1 className="mt-4 text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
            <span className="text-cyan-400">ClawSite</span>{" "}
            <span className="text-white">OS</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
            Turn any OpenClaw repo into a{" "}
            <span className="text-cyan-300 font-semibold">$497–$1,997 business</span>{" "}
            in 47 seconds. One repo. Fork it. Deploy it. Sell it.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCheckout}
              disabled={loading}
              className="rounded-xl bg-cyan-500 px-8 py-3 text-sm font-bold text-black shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 disabled:opacity-60 transition-colors"
            >
              {loading ? "Redirecting…" : "Get Pro Tier — $97 Lifetime"}
            </motion.button>

            <a
              href="https://github.com/YOURUSERNAME/clawsite-os"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-zinc-700 px-8 py-3 text-sm font-semibold text-zinc-300 hover:border-cyan-500 hover:text-cyan-400 transition-colors"
            >
              View on GitHub →
            </a>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-6 pb-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { icon: "🦞", title: "Cyber Storefront", desc: "Dark, fast Next.js 15 site. Looks expensive. Costs nothing." },
          { icon: "⚡", title: "47-Second Deploy", desc: "Click the Vercel button. Push to main. Live forever." },
          { icon: "💳", title: "Stripe Checkout", desc: "One-click Pro Tier checkout wired up and ready to collect." },
          { icon: "🤖", title: "Launch Agent", desc: "Auto-post X thread, run ads, DM buyers — hands free." },
          { icon: "📖", title: "$5k Playbook", desc: "Exact scripts and phases to close 8–12 sales in 24 hours." },
          { icon: "🔓", title: "Fully Open Source", desc: "Fork it, brand it, sell it. MIT licensed." },
        ].map(({ icon, title, desc }) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 hover:border-cyan-500/50 transition-colors"
          >
            <div className="mb-3 text-3xl">{icon}</div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">{title}</h3>
            <p className="mt-2 text-sm text-zinc-400">{desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 text-center text-xs text-zinc-600">
        ClawSite OS · MIT License · Built for the 2026 OpenClaw gold rush
      </footer>
    </main>
  );
}
