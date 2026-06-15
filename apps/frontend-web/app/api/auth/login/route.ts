import { NextResponse } from "next/server";

import { getAuthLoginUrl } from "@/lib/auth/bff-auth";
import {
  getSecureCookieOptions,
  REFRESH_COOKIE_NAME,
  REFRESH_MAX_AGE_SECONDS,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/auth/cookie-names";
import { signSessionPayload } from "@/lib/auth/session-signing";
import type { SessionCookiePayload } from "@/lib/auth/session";

type LoginUpstreamUser = {
  id: string;
  email: string;
  tenantId: string;
  role?: string;
  roles?: string[];
  permissions?: string[];
  firstName?: string;
  lastName?: string;
};

type LoginUpstreamData = {
  accessToken: string;
  refreshToken: string;
  user: LoginUpstreamUser;
};

export async function POST(request: Request) {
  const body = await request.text();
  const loginUrl = getAuthLoginUrl();

  const upstream = await fetch(loginUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    cache: "no-store",
  });

  const payload = await upstream.json().catch(() => null);

  if (!upstream.ok) {
    return NextResponse.json(payload ?? { error: { message: "Login failed" } }, {
      status: upstream.status,
    });
  }

  const data = (payload as { data?: LoginUpstreamData })?.data;
  if (!data?.accessToken || !data.refreshToken || !data.user) {
    return NextResponse.json({ error: { message: "Invalid login response" } }, { status: 502 });
  }

  const response = NextResponse.json({
    data: {
      accessToken: data.accessToken,
      user: data.user,
    },
  });

  response.cookies.set(
    REFRESH_COOKIE_NAME,
    data.refreshToken,
    getSecureCookieOptions(REFRESH_MAX_AGE_SECONDS),
  );

  const sessionPayload: SessionCookiePayload = {
    user: {
      id: data.user.id,
      role: data.user.roles?.[0] ?? data.user.role ?? "STAFF",
      tenantId: data.user.tenantId,
      roles: data.user.roles,
    },
  };

  response.cookies.set(
    SESSION_COOKIE_NAME,
    await signSessionPayload(sessionPayload),
    getSecureCookieOptions(SESSION_MAX_AGE_SECONDS),
  );

  return response;
}
