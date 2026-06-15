import type { NextRequest } from "next/server";

import { verifySignedSessionCookie } from "@/lib/auth/session-signing";

import type { MiddlewareSession, SessionCookiePayload } from "./session-types";

export const SESSION_COOKIE_NAME = "ordella-session";

export function serializeSessionCookie(payload: SessionCookiePayload): string {
  return bytesToBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export async function parseSessionCookie(value: string | undefined | null): Promise<MiddlewareSession | null> {
  return verifySignedSessionCookie(value);
}

export async function getSession(request: NextRequest): Promise<MiddlewareSession | null> {
  const raw = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  return parseSessionCookie(raw);
}
