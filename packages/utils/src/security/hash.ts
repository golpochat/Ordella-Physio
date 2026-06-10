import { createHash, randomBytes } from "node:crypto";

export function hash(value: string): string {
  const salt = randomBytes(16).toString("hex");
  const digest = createHash("sha256").update(`${salt}:${value}`).digest("hex");
  return `${salt}:${digest}`;
}
