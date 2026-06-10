import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from "node:crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;

function deriveKey(secret: string, salt: Buffer): Buffer {
  return scryptSync(secret, salt, 32);
}

export function encrypt(value: string, key: string): string {
  const salt = randomBytes(16);
  const iv = randomBytes(IV_LENGTH);
  const derivedKey = deriveKey(key, salt);
  const cipher = createCipheriv(ALGORITHM, derivedKey, iv);

  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return Buffer.concat([salt, iv, authTag, encrypted]).toString("base64");
}

export function decrypt(payload: string, key: string): string {
  const buffer = Buffer.from(payload, "base64");
  const salt = buffer.subarray(0, 16);
  const iv = buffer.subarray(16, 16 + IV_LENGTH);
  const authTag = buffer.subarray(16 + IV_LENGTH, 16 + IV_LENGTH + 16);
  const encrypted = buffer.subarray(16 + IV_LENGTH + 16);

  const derivedKey = deriveKey(key, salt);
  const decipher = createDecipheriv(ALGORITHM, derivedKey, iv);
  decipher.setAuthTag(authTag);

  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8");
}
