import { createHmac, timingSafeEqual } from "node:crypto";

import type { MiddlewareSession, SessionCookiePayload } from "./session";

const SESSION_COOKIE_SECRET =
  process.env.SESSION_COOKIE_SECRET ?? "dev-session-cookie-secret-min-32-chars";

export function signSessionPayload(payload: SessionCookiePayload): string {
  const data = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const signature = createHmac("sha256", SESSION_COOKIE_SECRET).update(data).digest("base64url");
  return `${data}.${signature}`;
}

export function verifySignedSessionCookie(value: string | undefined | null): MiddlewareSession | null {
  if (!value) {
    return null;
  }

  const separator = value.lastIndexOf(".");
  if (separator <= 0) {
    return null;
  }

  const data = value.slice(0, separator);
  const signature = value.slice(separator + 1);
  const expected = createHmac("sha256", SESSION_COOKIE_SECRET).update(data).digest("base64url");

  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expected);
  if (sigBuf.length !== expectedBuf.length || !timingSafeEqual(sigBuf, expectedBuf)) {
    return null;
  }

  try {
    const json = Buffer.from(data, "base64url").toString("utf8");
    const parsed = JSON.parse(json) as SessionCookiePayload;
    if (!parsed?.user?.id || !parsed.user.role) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}
