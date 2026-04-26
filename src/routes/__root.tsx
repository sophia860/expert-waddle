import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { ClawPlayground } from "../components/ClawPlayground";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VibeCode Studio — OpenClaw-Native Website Builder" },
      { name: "description", content: "Vibe-code entire OpenClaw agent storefronts in natural language. Describe it, preview it, deploy it." },
      { property: "og:title", content: "VibeCode Studio — Build OpenClaw Sites with AI" },
      { property: "og:description", content: "The official OpenClaw website studio. Ship agent storefronts in under 90 minutes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[10%] h-[500px] w-[500px] rounded-full bg-cyan-400/20 blur-[160px]" />
        <div className="absolute top-[30%] right-[5%] h-[600px] w-[600px] rounded-full bg-purple-600/25 blur-[180px]" />
        <div className="absolute bottom-[-10%] left-[30%] h-[500px] w-[500px] rounded-full bg-pink-500/15 blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* NAV */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_-2px_rgba(34,211,238,0.6)]">
              <span className="text-xl">🦞</span>
            </div>
            <span className="text-xl font-bold tracking-tighter">
              VIBE<span className="text-cyan-400">CODE</span>{" "}
              <span className="text-white/40">STUDIO</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-white/50">
            <a
              href="https://github.com/sophia860/expert-waddle"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <span className="px-3 py-1 rounded-full border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-widest">
              OPENCLAW
            </span>
          </div>
        </div>
      </nav>

      {/* MAIN SPLIT LAYOUT */}
      <main className="relative z-10 pt-[65px] grid grid-cols-1 lg:grid-cols-2 h-screen">
        {/* LEFT — Vibe Prompt Area */}
        <div className="flex flex-col justify-center p-8 lg:p-14 border-r border-white/10 overflow-y-auto">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 text-xs tracking-widest text-cyan-400 mb-4 uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              OpenClaw Studio — Live
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tighter leading-none mb-4">
              Vibe Code Your
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                OpenClaw Empire
              </span>
            </h1>
            <p className="text-white/50 text-lg max-w-md">
              Describe your dream agent storefront. OpenClaw generates, previews, and deploys the full
              ClawSite repo — instantly.
            </p>
          </div>
          <ClawPlayground />
        </div>

        {/* RIGHT — Live Preview */}
        <div className="hidden lg:flex flex-col bg-zinc-950 p-6">
          <div className="flex items-center gap-2 mb-4 text-xs text-white/30 font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Live Preview
          </div>
          <iframe
            id="preview"
            className="flex-1 w-full border border-cyan-500/20 rounded-2xl bg-zinc-900"
            title="Live ClawSite Preview"
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        </div>
      </main>

      <Outlet />
    </div>
  );
}
