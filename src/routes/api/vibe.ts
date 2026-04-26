import { createAPIFileRoute } from "@tanstack/react-start/api";

/**
 * POST /api/vibe
 *
 * Body: { prompt: string; connectors: string[] }
 * Response: { previewUrl: string }
 *
 * Forwards the vibe prompt to an OpenClaw / Anthropic backend and returns
 * a preview URL that the ClawPlayground drops into the live-preview iframe.
 *
 * Set the following environment variables (Cloudflare Workers secrets or .dev.vars):
 *   OPENCLAW_API_URL  — base URL of your OpenClaw instance (required)
 *   OPENCLAW_API_KEY  — bearer token for the OpenClaw API (required)
 */
export const APIRoute = createAPIFileRoute("/api/vibe")({
  POST: async ({ request }) => {
    // --- validate content-type -------------------------------------------------
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return new Response("Expected application/json", { status: 415 });
    }

    // --- parse body ------------------------------------------------------------
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return new Response("Invalid JSON body", { status: 400 });
    }

    if (
      typeof body !== "object" ||
      body === null ||
      typeof (body as Record<string, unknown>).prompt !== "string" ||
      !(body as Record<string, unknown>).prompt
    ) {
      return new Response('Missing required field "prompt"', { status: 400 });
    }

    const { prompt, connectors = [] } = body as {
      prompt: string;
      connectors?: string[];
    };

    // --- resolve env -----------------------------------------------------------
    // In Cloudflare Workers, env vars are accessed via the global `process.env`
    // shim provided by nodejs_compat, or injected via wrangler secrets.
    const apiUrl = (process.env as Record<string, string | undefined>).OPENCLAW_API_URL;
    const apiKey = (process.env as Record<string, string | undefined>).OPENCLAW_API_KEY;

    if (!apiUrl || !apiKey) {
      return new Response(
        "Server misconfiguration: OPENCLAW_API_URL and OPENCLAW_API_KEY must be set.",
        { status: 503 }
      );
    }

    // --- call OpenClaw ---------------------------------------------------------
    const upstream = await fetch(`${apiUrl}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ prompt, connectors }),
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      return new Response(`OpenClaw upstream error: ${text}`, {
        status: upstream.status,
      });
    }

    const data = (await upstream.json()) as { previewUrl?: string };

    if (!data.previewUrl) {
      return new Response("OpenClaw did not return a previewUrl", { status: 502 });
    }

    return new Response(JSON.stringify({ previewUrl: data.previewUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  },
});
