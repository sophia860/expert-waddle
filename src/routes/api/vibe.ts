import { createAPIFileRoute } from "@tanstack/react-start/api";

/**
 * POST /api/vibe
 *
 * Body: { prompt: string; connectors: string[] }
 * Response: { response: string }
 *
 * Forwards the vibe prompt to a local Ollama instance and streams back the
 * generated text.
 *
 * Optional environment variables:
 *   OLLAMA_BASE_URL — base URL of your Ollama instance (default: http://localhost:11434)
 *   OLLAMA_MODEL    — model name to use            (default: llama3.2)
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
    const env = process.env as Record<string, string | undefined>;
    const ollamaBaseUrl = env.OLLAMA_BASE_URL ?? "http://localhost:11434";
    const ollamaModel = env.OLLAMA_MODEL ?? "llama3.2";

    // Build a system-enriched prompt that includes connectors if provided
    const fullPrompt =
      connectors.length > 0
        ? `You are an expert web developer and copywriter. The user has the following connectors available: ${connectors.join(", ")}.\n\n${prompt}`
        : prompt;

    // --- call Ollama -----------------------------------------------------------
    let upstream: Response;
    try {
      upstream = await fetch(`${ollamaBaseUrl}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: ollamaModel, prompt: fullPrompt, stream: false }),
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return new Response(`Failed to reach Ollama at ${ollamaBaseUrl}: ${msg}`, { status: 503 });
    }

    if (!upstream.ok) {
      const text = await upstream.text();
      return new Response(`Ollama error: ${text}`, { status: upstream.status });
    }

    const data = (await upstream.json()) as { response?: string };

    if (typeof data.response !== "string") {
      return new Response("Ollama did not return a response", { status: 502 });
    }

    return new Response(JSON.stringify({ response: data.response }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  },
});
