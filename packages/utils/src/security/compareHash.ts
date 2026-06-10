import { createHash, timingSafeEqual } from "node:crypto";

export function compareHash(value: string, hashed: string): boolean {
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
