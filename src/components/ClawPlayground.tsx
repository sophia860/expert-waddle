VERCEL_TOKEN=your_token_here
VERCEL_ORG_ID=your_org_id_here
VERCEL_PROJECT_ID=your_project_id_hereimport { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Rocket, Github, Globe } from "lucide-react";

const EXAMPLE_PROMPTS = [
  "Dark cyberpunk OpenClaw sales page with live agent demo and Stripe checkout",
  "Minimal white-label SaaS storefront for a GitHub repo monetization tool",
  "Neon lobster theme with hero video, pricing table, and Discord community section",
];

export function ClawPlayground() {
  const [prompt, setPrompt] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [agentResponse, setAgentResponse] = useState<string | null>(null);

  const runVibe = async () => {
    if (!prompt.trim()) return;
    setIsRunning(true);
    setError(null);
    setAgentResponse(null);
    setStatus("Sending prompt to Ollama...");

    try {
      const response = await fetch("/api/vibe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt.trim(),
          connectors: ["stripe", "github", "vercel"],
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Server error: ${response.status}`);
      }

      const { response: agentText } = (await response.json()) as { response: string };
      setAgentResponse(agentText);
      setStatus("Done — Ollama responded!");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus(null);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Prompt textarea */}
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              void runVibe();
            }
          }}
          placeholder="Describe your dream OpenClaw sales site…&#10;e.g. dark lobster cyberpunk with live agent demo and Stripe"
          rows={6}
          className="w-full bg-zinc-900 border border-white/10 focus:border-cyan-500/50 rounded-2xl p-5 text-base text-white placeholder:text-white/25 resize-none outline-none transition-colors"
        />
        <span className="absolute bottom-3 right-4 text-xs text-white/20 select-none">
          ⌘ + Enter to run
        </span>
      </div>

      {/* Example prompts */}
      <div className="flex flex-wrap gap-2">
        {EXAMPLE_PROMPTS.map((p) => (
          <button
            key={p}
            onClick={() => setPrompt(p)}
            className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-white/40 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors truncate max-w-[260px]"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Run button */}
      <motion.button
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => void runVibe()}
        disabled={isRunning || !prompt.trim()}
        className="w-full py-5 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl text-lg font-bold tracking-tight disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-[0_0_40px_-8px_rgba(34,211,238,0.5)]"
      >
        <Sparkles className="w-5 h-5" />
        {isRunning ? "🦞 OLLAMA IS THINKING…" : "RUN OLLAMA AGENT → GENERATE"}
      </motion.button>

      {/* Status / error */}
      <AnimatePresence>
        {(status || error) && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`text-sm px-4 py-3 rounded-xl border font-mono ${
              error
                ? "border-red-500/30 bg-red-500/10 text-red-400"
                : "border-cyan-500/20 bg-cyan-500/5 text-cyan-300"
            }`}
          >
            {error ?? status}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Agent response */}
      <AnimatePresence>
        {agentResponse && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-cyan-500/20 bg-zinc-900 p-5"
          >
            <p className="mb-2 text-xs font-mono uppercase tracking-widest text-cyan-400/60">Ollama response</p>
            <pre className="whitespace-pre-wrap text-sm text-white/80 font-mono leading-relaxed">{agentResponse}</pre>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connector badges */}
      <div className="flex items-center gap-3 pt-1">
        <span className="text-xs text-white/25 uppercase tracking-widest">Connectors</span>
        {[
          { label: "Stripe", icon: <Rocket className="w-3 h-3" /> },
          { label: "GitHub", icon: <Github className="w-3 h-3" /> },
          { label: "Vercel", icon: <Globe className="w-3 h-3" /> },
        ].map(({ label, icon }) => (
          <span
            key={label}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border border-white/10 text-white/40"
          >
            {icon}
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
