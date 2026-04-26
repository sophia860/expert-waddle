"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-zinc-800 bg-[#0a0a0f]/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-sm font-bold text-white">
          <span className="text-xl">🦞</span>
          <span>
            <span className="text-cyan-400">Claw</span>Site OS
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm text-zinc-400 sm:flex">
          <Link href="#features" className="hover:text-white transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="hover:text-white transition-colors">
            Pricing
          </Link>
          <a
            href="https://github.com/YOURUSERNAME/clawsite-os"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="/api/checkout"
            className="rounded-lg bg-cyan-500 px-4 py-1.5 text-xs font-bold text-black hover:bg-cyan-400 transition-colors"
          >
            Get Pro — $97
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="sm:hidden text-zinc-400 hover:text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="sm:hidden border-t border-zinc-800 bg-[#0a0a0f] px-6 pb-4 pt-3 flex flex-col gap-3 text-sm text-zinc-400">
          <Link href="#features" onClick={() => setOpen(false)} className="hover:text-white">
            Features
          </Link>
          <Link href="#pricing" onClick={() => setOpen(false)} className="hover:text-white">
            Pricing
          </Link>
          <a
            href="https://github.com/YOURUSERNAME/clawsite-os"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            GitHub
          </a>
          <a
            href="/api/checkout"
            className="w-fit rounded-lg bg-cyan-500 px-4 py-1.5 text-xs font-bold text-black hover:bg-cyan-400"
          >
            Get Pro — $97
          </a>
        </div>
      )}
    </header>
  );
}
