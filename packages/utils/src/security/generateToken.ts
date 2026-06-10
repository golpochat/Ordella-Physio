import { randomBytes } from "node:crypto";

export function generateToken(length = 32): string {
  return randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}
