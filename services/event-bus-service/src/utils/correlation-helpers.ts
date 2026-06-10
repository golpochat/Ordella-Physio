import { randomUUID } from "node:crypto";

export function resolveCorrelationId(existing?: string): string {
  return existing ?? randomUUID();
}

export function resolveCausationId(existing?: string, fallbackCorrelationId?: string): string | undefined {
  return existing ?? fallbackCorrelationId;
}
