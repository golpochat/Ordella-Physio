import { NextResponse } from "next/server";

import { signSessionPayload } from "@/lib/auth/session-signing";
import {
  getSecureCookieOptions,
  REFRESH_COOKIE_NAME,
  REFRESH_MAX_AGE_SECONDS,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/auth/cookie-names";
import type { SessionCookiePayload } from "@/lib/auth/session";

type SessionBody = {
  session?: SessionCookiePayload;
  refreshToken?: string;
};

export async function POST(request: Request) {
  let body: SessionBody;

  try {
    body = (await request.json()) as SessionBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.session?.user?.id) {
    return NextResponse.json({ error: "Invalid session payload" }, { status: 400 });
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set(
    SESSION_COOKIE_NAME,
    await signSessionPayload(body.session),
    getSecureCookieOptions(SESSION_MAX_AGE_SECONDS),
  );

  if (body.refreshToken) {
    response.cookies.set(
      REFRESH_COOKIE_NAME,
      body.refreshToken,
      getSecureCookieOptions(REFRESH_MAX_AGE_SECONDS),
    );
  }

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(REFRESH_COOKIE_NAME, "", getSecureCookieOptions(0));
  response.cookies.set(SESSION_COOKIE_NAME, "", getSecureCookieOptions(0));
  return response;
}
