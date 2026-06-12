function estimateTokens(text: string) {
  return Math.max(1, Math.ceil(text.length / 4));
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function runWithMockLatency<T>(fn: () => T) {
  const start = Date.now();
  await sleep(40 + Math.floor(Math.random() * 80));
  const result = fn();
  return { result, latencyMs: Date.now() - start };
}

export function mockTextCompletion(prompt: string, providerLabel: string) {
  const summary = prompt.trim().slice(0, 120);
  return `[${providerLabel}] ${summary}${prompt.length > 120 ? "..." : ""}`;
}

export function mockJsonCompletion(prompt: string, schema: Record<string, unknown>) {
  const required = Array.isArray(schema.required) ? (schema.required as string[]) : [];
  const output: Record<string, unknown> = {};

  for (const key of required) {
    output[key] = `value_for_${key}`;
  }

  if (!required.length) {
    output.summary = mockTextCompletion(prompt, "json");
    output.confidence = 0.92;
  }

  return output;
}

export function mockEmbedding(text: string, dimensions = 8) {
  const seed = estimateTokens(text);
  return Array.from({ length: dimensions }, (_, index) =>
    Number((((seed + index * 13) % 97) / 97).toFixed(4)),
  );
}

export { estimateTokens };
