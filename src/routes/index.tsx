import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Zap, Rocket, Github as GithubIcon, Shield, Users, Sparkles, Terminal, GitBranch } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "ClawSite OS — Turn Your GitHub Repo Into a Money Machine" },
      {
        name: "description",
        content:
          "One-click cyber-agent storefront that turns GitHub stars into paying customers. Deploy in 47 seconds with OpenClaw.",
      },
      { property: "og:title", content: "ClawSite OS — Your Repo, Now a Money Machine" },
      {
        property: "og:description",
        content: "Sleek, dark, OpenClaw-powered storefronts that convert 10x better than raw GitHub.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden font-mono relative">
      {/* Ambient glow background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[10%] h-[500px] w-[500px] rounded-full bg-claw-cyan/20 blur-[160px]" />
        <div className="absolute top-[30%] right-[5%] h-[600px] w-[600px] rounded-full bg-claw-purple/25 blur-[180px]" />
        <div className="absolute bottom-[-10%] left-[30%] h-[500px] w-[500px] rounded-full bg-claw-pink/15 blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* NAV */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-background/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-claw-cyan to-claw-purple rounded-xl flex items-center justify-center shadow-[0_0_20px_-2px_var(--color-claw-cyan)]">
              <span className="text-xl">🦞</span>
            </div>
            <span className="text-2xl font-bold tracking-tighter">
              CLAW<span className="text-claw-cyan">SITE</span>
            </span>
          </div>
          <div className="hidden md:flex gap-8 text-xs uppercase tracking-[0.2em] text-foreground/70">
            <a href="#demo" className="hover:text-claw-cyan transition">Live Demo</a>
            <a href="#features" className="hover:text-claw-cyan transition">Connectors</a>
            <a href="#pricing" className="hover:text-claw-cyan transition">Get It</a>
          </div>
          <a
            href="#deploy"
            className="px-4 py-2 text-xs uppercase tracking-widest border border-white/20 rounded-lg hover:border-claw-cyan hover:text-claw-cyan transition"
          >
            Deploy
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 pt-40 pb-28 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-claw-cyan/40 bg-claw-cyan/5 mb-8 text-xs uppercase tracking-[0.25em]"
          >
            <Zap className="w-3.5 h-3.5 text-claw-cyan" />
            <span>Powered by OpenClaw</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8"
          >
            YOUR REPO.
            <br />
            NOW A{" "}
            <span className="bg-gradient-to-r from-claw-cyan via-claw-purple to-claw-pink bg-clip-text text-transparent">
              MONEY MACHINE
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-foreground/60 max-w-2xl mx-auto mb-12 font-sans"
          >
            One-click storefront that turns GitHub stars into{" "}
            <span className="text-claw-cyan">$497–$1997</span> customers while you sleep.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#deploy"
              className="group px-8 py-4 bg-foreground text-background font-semibold rounded-2xl hover:scale-[1.03] transition flex items-center justify-center gap-3 text-base shadow-[0_0_40px_-10px_var(--color-claw-cyan)]"
            >
              DEPLOY IN 47 SECONDS
              <Rocket className="w-5 h-5 group-hover:rotate-12 transition" />
            </a>
            <a
              href="#demo"
              className="px-8 py-4 border border-white/20 hover:bg-white/5 hover:border-claw-cyan/50 rounded-2xl transition text-base"
            >
              Watch Live Agent Demo
            </a>
          </motion.div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { v: "10x", l: "Conversion" },
              { v: "47s", l: "To Deploy" },
              { v: "$1997", l: "Avg Sale" },
            ].map((s) => (
              <div key={s.l} className="border border-white/10 rounded-2xl p-6 bg-white/[0.02] backdrop-blur">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-claw-cyan to-claw-purple bg-clip-text text-transparent">
                  {s.v}
                </div>
                <div className="text-xs uppercase tracking-widest text-foreground/50 mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE DEMO */}
      <section id="demo" className="relative z-10 border-t border-white/10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-claw-cyan mb-3">// LIVE_PLAYGROUND</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Watch Your Repo Sell Itself
            </h2>
          </div>

          <div className="aspect-video bg-zinc-950/80 rounded-3xl border border-claw-cyan/20 overflow-hidden relative shadow-[0_0_80px_-20px_var(--color-claw-purple)]">
            <div className="absolute top-0 left-0 right-0 px-5 py-3 border-b border-white/10 flex items-center gap-2 bg-black/50">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-4 text-xs text-foreground/40">openclaw://agent/run</span>
            </div>
            <div className="absolute inset-0 pt-12 flex items-center justify-center">
              <div className="text-center">
                <Terminal className="w-12 h-12 mx-auto text-claw-cyan mb-4 animate-pulse" />
                <p className="text-claw-cyan text-lg md:text-xl font-mono">
                  &gt; LIVE OPENCLAW DEMO PLAYGROUND
                </p>
                <p className="text-foreground/40 text-sm mt-2">Streaming agent output...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONNECTORS / FEATURES */}
      <section id="features" className="relative z-10 border-t border-white/10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-claw-purple mb-3">// CONNECTORS</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Plug In. <span className="text-foreground/40">Print Money.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { i: Github, t: "GitHub Sync", d: "Auto-pulls README, stars, releases. Your repo becomes a living storefront." },
              { i: Sparkles, t: "Agent Personalization", d: "OpenClaw rewrites your headline for every visitor segment in real time." },
              { i: Rocket, t: "1-Click Vercel", d: "Fork, deploy, profit. Edge-cached globally in under a minute." },
              { i: Shield, t: "Built-in Stripe", d: "Tier pricing from $497 to $1997 wired up out of the box." },
              { i: GitBranch, t: "Repo Variants", d: "Generate personalized sites for every fork or product line." },
              { i: Users, t: "Lead Capture", d: "Every star becomes an email. Every email becomes a customer." },
            ].map((f) => (
              <div
                key={f.t}
                className="group relative p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-claw-cyan/40 hover:bg-white/[0.04] transition overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-claw-cyan/0 group-hover:bg-claw-cyan/10 rounded-full blur-2xl transition" />
                <f.i className="w-7 h-7 text-claw-cyan mb-5" strokeWidth={1.5} />
                <h3 className="text-lg font-bold mb-2 tracking-tight">{f.t}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed font-sans">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative z-10 border-t border-white/10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-claw-pink mb-3">// PRICING</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Pick Your Tier.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { n: "STARTER", p: "$497", f: ["1 ClawSite", "GitHub sync", "Stripe checkout", "Email capture"] },
              { n: "OPERATOR", p: "$997", f: ["5 ClawSites", "Agent personalization", "Custom domains", "Priority support"], hi: true },
              { n: "EMPIRE", p: "$1997", f: ["Unlimited sites", "Master OpenClaw agent", "White label", "Revenue share"] },
            ].map((t) => (
              <div
                key={t.n}
                className={`relative p-8 rounded-3xl border ${
                  t.hi
                    ? "border-claw-cyan bg-gradient-to-b from-claw-cyan/10 to-claw-purple/5 shadow-[0_0_60px_-20px_var(--color-claw-cyan)]"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                {t.hi && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-claw-cyan text-background text-[10px] font-bold uppercase tracking-widest rounded-full">
                    Most Picked
                  </div>
                )}
                <div className="text-xs uppercase tracking-[0.25em] text-foreground/50 mb-4">{t.n}</div>
                <div className="text-5xl font-bold tracking-tighter mb-6">{t.p}</div>
                <ul className="space-y-3 mb-8">
                  {t.f.map((feat) => (
                    <li key={feat} className="flex items-center gap-3 text-sm text-foreground/70 font-sans">
                      <div className="w-1.5 h-1.5 rounded-full bg-claw-cyan" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <a
                  href="#deploy"
                  className={`block text-center py-3 rounded-xl font-semibold transition ${
                    t.hi
                      ? "bg-foreground text-background hover:scale-[1.02]"
                      : "border border-white/20 hover:border-claw-cyan hover:text-claw-cyan"
                  }`}
                >
                  Get {t.n}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="deploy" className="relative z-10 py-32 border-t border-white/10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-claw-cyan mb-6">// DEPLOY_NOW</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Ready to turn your repo
            <br />
            into a <span className="bg-gradient-to-r from-claw-cyan to-claw-pink bg-clip-text text-transparent">business?</span>
          </h2>
          <p className="text-lg text-foreground/50 mb-12 font-sans">
            Fork the vibe code. Deploy on Vercel. Wake up to Stripe pings.
          </p>
          <a
            href="https://github.com"
            className="inline-flex items-center gap-4 px-10 py-5 text-lg md:text-xl font-bold bg-gradient-to-r from-claw-cyan to-claw-purple rounded-2xl hover:scale-[1.03] transition shadow-[0_0_60px_-15px_var(--color-claw-purple)]"
          >
            <Github className="w-6 h-6" />
            FORK THE VIBE CODE
            <span className="text-2xl">→</span>
          </a>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-8 px-6 text-center text-xs text-foreground/40 uppercase tracking-widest">
        © ClawSite OS — Built with OpenClaw 🦞
      </footer>
    </div>
  );
}
