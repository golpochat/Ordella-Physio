import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

export function hash(value: string, salt?: string): string {
  const resolvedSalt = salt ?? randomBytes(16).toString("hex");
  const digest = createHash("sha256").update(`${resolvedSalt}:${value}`).digest("hex");
  return `${resolvedSalt}:${digest}`;
}

export function verifyHash(value: string, hashed: string): boolean {
  const [salt, digest] = hashed.split(":");
  if (!salt || !digest) {
    return false;
  }

  const computed = createHash("sha256").update(`${salt}:${value}`).digest("hex");
  const left = Buffer.from(digest, "hex");
  const right = Buffer.from(computed, "hex");

  if (left.length !== right.length) {
    return false;
  }

  return timingSafeEqual(left, right);
}
