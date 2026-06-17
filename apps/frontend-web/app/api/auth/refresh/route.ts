import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getAuthRefreshUrl } from "@/lib/auth/bff-auth";
import { buildAuthUpstreamHeaders } from "@/lib/auth/bff-upstream-headers";
import { parseAuthUpstreamPayload } from "@/lib/auth/parse-auth-upstream";
import {
  getSecureCookieOptions,
  REFRESH_COOKIE_NAME,
  REFRESH_MAX_AGE_SECONDS,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/auth/cookie-names";
import { signSessionPayload } from "@/lib/auth/session-signing";
import type { SessionCookiePayload } from "@/lib/auth/session";

export async function POST() {
  const refreshToken = cookies().get(REFRESH_COOKIE_NAME)?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { error: { code: "UNAUTHORIZED", message: "No refresh session" } },
      { status: 401 },
    );
  }

  const upstream = await fetch(getAuthRefreshUrl(), {
    method: "POST",
    headers: buildAuthUpstreamHeaders({
      bodyText: JSON.stringify({ refreshToken }),
    }),
    body: JSON.stringify({ refreshToken }),
    cache: "no-store",
  });

  const payload = await upstream.json().catch(() => null);

  if (!upstream.ok) {
    const response = NextResponse.json(payload ?? { error: { message: "Refresh failed" } }, {
      status: upstream.status,
    });

    if (upstream.status === 401) {
      response.cookies.set(REFRESH_COOKIE_NAME, "", getSecureCookieOptions(0));
      response.cookies.set(SESSION_COOKIE_NAME, "", getSecureCookieOptions(0));
    }

    return response;
  }

  const data = parseAuthUpstreamPayload(payload);
  if (!data || !("accessToken" in data) || !data.user) {
    return NextResponse.json({ error: { message: "Invalid refresh response" } }, { status: 502 });
  }

  const response = NextResponse.json({
    data: {
      accessToken: data.accessToken,
      user: data.user,
    },
  });

  if (data.refreshToken) {
    response.cookies.set(
      REFRESH_COOKIE_NAME,
      data.refreshToken,
      getSecureCookieOptions(REFRESH_MAX_AGE_SECONDS),
    );
  }

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
