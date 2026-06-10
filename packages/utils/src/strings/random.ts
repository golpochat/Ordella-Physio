const ALPHANUMERIC =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function randomString(length: number): string {
  if (length <= 0) return "";

  const bytes = new Uint8Array(length);
  globalThis.crypto.getRandomValues(bytes);

  return Array.from(bytes, (byte) => ALPHANUMERIC[byte % ALPHANUMERIC.length]).join("");
}
