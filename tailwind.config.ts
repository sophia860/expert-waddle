import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        cyber: {
          bg: "#0a0a0f",
          card: "#111118",
          border: "#1f1f2e",
          cyan: "#22d3ee",
          glow: "rgba(34,211,238,0.15)",
        },
      },
      boxShadow: {
        "glow-cyan": "0 0 40px rgba(34,211,238,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
