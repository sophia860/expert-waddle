"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const params = useSearchParams();
  const tierParam = params.get("tier") ?? "pro";
  const tierLabels: Record<string, string> = {
    starter: "Starter ($497)",
    pro: "Pro ($997)",
    empire: "Empire ($1,997)",
  };
  const purchasedTier = tierLabels[tierParam] ?? tierLabels.pro;

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white font-mono flex items-center justify-center px-6">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-lg w-full rounded-2xl border border-cyan-500/30 bg-zinc-900/70 p-10 text-center shadow-2xl shadow-cyan-500/5"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 180 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-cyan-500/50 bg-cyan-500/10 text-4xl"
        >
          🦞
        </motion.div>

        <h1 className="text-3xl font-extrabold text-white">
          You&apos;re in, <span className="text-cyan-400">builder.</span>
        </h1>

        <p className="mt-4 text-zinc-400">
          Payment confirmed. ClawSite OS {purchasedTier} is yours - lifetime access, no expiry.
        </p>

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 text-left space-y-3">
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-1">Next steps</p>
          {[
            { icon: "📬", text: "Check your email for the receipt & access link" },
            { icon: "🔗", text: "Fork the repo and deploy to Vercel in < 2 min" },
            { icon: "📖", text: "Read the $5k playbook and launch in 24 hours" },
            { icon: "💬", text: "Join the private Discord for builder support" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-start gap-3 text-sm text-zinc-300">
              <span className="text-lg">{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href="https://github.com/sophia860/expert-waddle"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-cyan-500 px-6 py-2.5 text-sm font-bold text-black hover:bg-cyan-400 transition-colors"
          >
            Fork the Repo →
          </a>
          <Link
            href="/"
            className="rounded-xl border border-zinc-700 px-6 py-2.5 text-sm font-semibold text-zinc-300 hover:border-cyan-500 hover:text-cyan-400 transition-colors"
          >
            Back to Home
          </Link>
        </div>

        <p className="mt-6 text-xs text-zinc-600">
          Questions? DM{" "}
          <a
            href="mailto:helix@clawsite.dev"
            className="text-zinc-500 hover:text-cyan-400 transition-colors"
          >
            helix@clawsite.dev
          </a>
        </p>
      </motion.div>
    </main>
  );
}
