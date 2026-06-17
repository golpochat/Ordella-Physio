import { encrypt, decrypt } from "@ordella/security";
import { organizationConfig } from "@ordella/config";

export function encryptSsoSecret(value: string): string {
  return encrypt(value, organizationConfig.ssoEncryptionKey);
}

export function decryptSsoSecret(payload: string): string {
  return decrypt(payload, organizationConfig.ssoEncryptionKey);
}

export function maskSsoSecret(value: string | null | undefined): string | null {
  if (!value) {
    return null;
  }

  return "********";
}
