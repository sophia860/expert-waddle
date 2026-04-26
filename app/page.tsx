"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";

type BotMessage = {
  id: number;
  agent: string;
  text: string;
  time: string;
};

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [botMessages, setBotMessages] = useState<BotMessage[]>([
    { id: 0, agent: "Helix", text: "Agents online. Awaiting your commands.", time: new Date().toLocaleTimeString() },
  ]);
  const [botSending, setBotSending] = useState(false);

  async function sendTestBotMessage() {
    setBotSending(true);
    try {
      const res = await fetch('/api/bot-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent: 'Helix',
          message: 'Test ping from storefront — agents are live and reachable.',
          importance: 'high',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setBotMessages((prev) => [
          ...prev,
          { id: Date.now(), agent: 'Helix', text: 'Test ping sent. Endpoint confirmed live.', time: data.timestamp },
        ]);
      }
    } catch {
      setBotMessages((prev) => [
        ...prev,
        { id: Date.now(), agent: 'Error', text: 'Could not reach /api/bot-message.', time: new Date().toLocaleTimeString() },
      ]);
    } finally {
      setBotSending(false);
    }
  }

  async function handleCheckout(tier: "starter" | "pro" | "empire") {
    setLoading(true);
    try {
      const res = await fetch(`/api/checkout?tier=${tier}`, { method: "POST" });
      if (!res.ok) {
        throw new Error("Checkout request failed");
      }
      const { url } = await res.json();
      window.location.href = url;
    } catch {
      setLoading(false);
    }
  }

  const tiers = [
    {
      key: "starter" as const,
      name: "Starter",
      price: "$497",
      subtitle: "For solo builders shipping one money page fast.",
      features: ["1 production storefront", "Core conversion sections", "Stripe checkout wiring"],
    },
    {
      key: "pro" as const,
      name: "Pro",
      price: "$997",
      subtitle: "For operators optimizing conversion and launch velocity.",
      features: ["Everything in Starter", "Launch agent templates", "Priority support + updates"],
      featured: true,
    },
    {
      key: "empire" as const,
      name: "Empire",
      price: "$1,997",
      subtitle: "For agencies and teams scaling multiple offers.",
      features: ["Everything in Pro", "Unlimited storefronts", "White-label deployment rights"],
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#060b14] text-white">
      <Navbar />

      <section className="relative isolate px-6 pt-28 pb-24 text-center">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.16),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(6,182,212,0.2),transparent_32%),linear-gradient(180deg,#04070f_0%,#060b14_55%,#04070f_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.07)_1px,transparent_1px)] bg-[size:38px_38px] opacity-30" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-6xl"
        >
          <span className="mb-5 inline-block rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-cyan-300">
            2026 Founder Launch Window
          </span>

          <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            ClawSite OS - Turn Any GitHub Repo Into a $497-$1,997 Money Machine in 47 Seconds
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-zinc-300 md:text-xl">
            Fork once and ship a conversion-ready storefront with persuasive copy, clean pricing logic,
            Stripe checkout, and launch automation already wired.
          </p>

          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 text-left text-sm text-zinc-300 sm:grid-cols-3">
            {[
              "Deploy in under 47 seconds",
              "Charge $497-$1,997 immediately",
              "Designed to convert cold traffic",
            ].map((point) => (
              <div key={point} className="rounded-xl border border-cyan-500/20 bg-zinc-900/70 px-4 py-3">
                <span className="text-cyan-300">+ </span>
                {point}
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleCheckout("pro")}
              disabled={loading}
              className="rounded-xl bg-cyan-400 px-8 py-3 text-sm font-extrabold text-black shadow-[0_0_35px_-10px_rgba(34,211,238,0.85)] transition-colors hover:bg-cyan-300 disabled:opacity-60"
            >
              {loading ? "Redirecting..." : "Start with Pro - $997"}
            </motion.button>

            <a
              href="https://github.com/sophia860/expert-waddle"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-zinc-700 px-8 py-3 text-sm font-semibold text-zinc-300 hover:border-cyan-500 hover:text-cyan-400 transition-colors"
            >
              View GitHub Repo
            </a>
          </div>
        </motion.div>
      </section>

      <section id="features" className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            icon: "01",
            title: "Authority Hero",
            desc: "Position your offer like a premium product in the first viewport.",
          },
          {
            icon: "02",
            title: "Tiered Monetization",
            desc: "Capture budget and premium buyers with three clean offers.",
          },
          {
            icon: "03",
            title: "Stripe Native",
            desc: "Checkout routes users into Starter, Pro, or Empire instantly.",
          },
          {
            icon: "04",
            title: "Launch Agent",
            desc: "Automate social posting, outreach, and buyer follow-up.",
          },
          {
            icon: "05",
            title: "Fast Setup",
            desc: "Install once and get local + deploy-ready environment setup.",
          },
          {
            icon: "06",
            title: "Futuristic UX",
            desc: "Dark, cyan-first visual language engineered for trust and clicks.",
          },
        ].map(({ icon, title, desc }) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-cyan-500/15 bg-zinc-900/65 p-6 transition-colors hover:border-cyan-400/55"
          >
            <div className="mb-3 text-sm font-black tracking-[0.25em] text-cyan-300">{icon}</div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">{title}</h3>
            <p className="mt-2 text-sm text-zinc-400">{desc}</p>
          </motion.div>
        ))}
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-6 pb-28">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Pricing</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">Pick Your Revenue Mode</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <motion.div
              key={tier.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={`rounded-2xl border p-6 ${
                tier.featured
                  ? "border-cyan-300/60 bg-cyan-500/10 shadow-[0_0_32px_-16px_rgba(34,211,238,0.8)]"
                  : "border-zinc-800 bg-zinc-900/60"
              }`}
            >
              <p className="text-sm uppercase tracking-[0.18em] text-zinc-400">{tier.name}</p>
              <p className="mt-3 text-4xl font-black text-white">{tier.price}</p>
              <p className="mt-3 text-sm text-zinc-400">{tier.subtitle}</p>
              <ul className="mt-6 space-y-2 text-sm text-zinc-300">
                {tier.features.map((feature) => (
                  <li key={feature}>+ {feature}</li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout(tier.key)}
                disabled={loading}
                className="mt-7 w-full rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-bold text-black transition-colors hover:bg-cyan-300 disabled:opacity-60"
              >
                {loading ? "Redirecting..." : `Choose ${tier.name}`}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bot Status Panel */}
      <div className="fixed bottom-6 right-6 z-50 hidden md:block w-80">
        <div className="rounded-2xl border border-cyan-500/30 bg-zinc-900/95 p-5 shadow-[0_0_40px_-12px_rgba(34,211,238,0.4)] backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <p className="text-sm font-semibold text-white">Helix + Agents Online</p>
          </div>

          <div className="max-h-48 overflow-y-auto space-y-2 mb-4 pr-1">
            <AnimatePresence initial={false}>
              {botMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-xs rounded-lg bg-zinc-800/80 border border-zinc-700/50 px-3 py-2"
                >
                  <span className="text-cyan-400 font-semibold">{msg.agent}</span>
                  <span className="text-zinc-500 ml-1">· {msg.time}</span>
                  <p className="mt-1 text-zinc-300">{msg.text}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <button
            onClick={sendTestBotMessage}
            disabled={botSending}
            className="w-full py-2.5 rounded-xl bg-cyan-500 text-black text-xs font-bold hover:bg-cyan-400 transition-colors disabled:opacity-50"
          >
            {botSending ? 'Sending…' : 'Test Bot Message'}
          </button>
        </div>
      </div>

      <footer className="border-t border-zinc-800 py-8 text-center text-xs text-zinc-600">
        ClawSite OS · MIT License · Built for the 2026 OpenClaw gold rush
      </footer>
    </main>
  );
}
