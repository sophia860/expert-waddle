import Link from "next/link";

const TIER_LABELS: Record<string, string> = {
  starter: "Starter - $497",
  operator: "Operator - $997",
  empire: "Empire - $1,997",
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string }>;
}) {
  const params = await searchParams;
  const tier = params?.tier && TIER_LABELS[params.tier] ? params.tier : "operator";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#06080d] px-6 text-white">
      <div className="w-full max-w-xl rounded-2xl border border-cyan-400/30 bg-zinc-900/70 p-8 text-center shadow-[0_0_45px_rgba(34,211,238,0.2)]">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Payment Confirmed</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight">Welcome to ClawSite OS</h1>
        <p className="mt-4 text-zinc-300">
          Your {TIER_LABELS[tier]} purchase is complete. You can now continue setup and launch.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-xl bg-cyan-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-cyan-300"
          >
            Back to Home
          </Link>
          <a
            href="https://github.com/sophia860/clawsite-os"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:border-cyan-400 hover:text-cyan-300"
          >
            Open Repository
          </a>
        </div>
      </div>
    </main>
  );
}