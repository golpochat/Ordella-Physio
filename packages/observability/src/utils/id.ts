import { randomUUID } from "node:crypto";

export function generateId(): string {
  return randomUUID();
}

export function generateTraceId(): string {
  return randomUUID().replace(/-/g, "");
}

export function generateSpanId(): string {
  return randomUUID().replace(/-/g, "").slice(0, 16);
}
