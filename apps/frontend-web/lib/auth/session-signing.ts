import type { MiddlewareSession, SessionCookiePayload } from "./session-types";

const SESSION_COOKIE_SECRET =
  process.env.SESSION_COOKIE_SECRET ?? "dev-session-cookie-secret-min-32-chars";

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToString(value: string): string {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const padLength = (4 - (padded.length % 4)) % 4;
  const normalized = padded + "=".repeat(padLength);
  const binary = atob(normalized);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return new TextDecoder().decode(bytes);
}

function timingSafeEqualStrings(left: string, right: string): boolean {
  if (left.length !== right.length) {
    return false;
  }

  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) {
    mismatch |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }

  return mismatch === 0;
}

async function signData(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SESSION_COOKIE_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return bytesToBase64Url(new Uint8Array(signature));
}

export async function signSessionPayload(payload: SessionCookiePayload): Promise<string> {
  const data = bytesToBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const signature = await signData(data);
  return `${data}.${signature}`;
}

export async function verifySignedSessionCookie(
  value: string | undefined | null,
): Promise<MiddlewareSession | null> {
  if (!value) {
    return null;
  }

  const separator = value.lastIndexOf(".");
  if (separator <= 0) {
    return null;
  }

  const data = value.slice(0, separator);
  const signature = value.slice(separator + 1);
  const expected = await signData(data);

  if (!timingSafeEqualStrings(signature, expected)) {
    return null;
  }

  try {
    const parsed = JSON.parse(base64UrlToString(data)) as SessionCookiePayload;
    if (!parsed?.user?.id || !parsed.user.role) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}
