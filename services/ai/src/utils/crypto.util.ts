import { decrypt, encrypt } from "@ordella/security";
import { resolveAiConfig } from "@/config/ai.config";

export function encryptApiKey(value: string) {
  return encrypt(value, resolveAiConfig().encryptionKey);
}

export function decryptApiKey(value: string) {
  try {
    return decrypt(value, resolveAiConfig().encryptionKey);
  } catch {
    return value;
  }
}
