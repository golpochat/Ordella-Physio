import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getAuthLogoutUrl } from "@/lib/auth/bff-auth";
import { buildAuthUpstreamHeaders } from "@/lib/auth/bff-upstream-headers";
import {
  getSecureCookieOptions,
  REFRESH_COOKIE_NAME,
  SESSION_COOKIE_NAME,
} from "@/lib/auth/cookie-names";

export async function POST(request: Request) {
  const refreshToken = cookies().get(REFRESH_COOKIE_NAME)?.value;
  const authorization = request.headers.get("authorization");

  if (authorization) {
    await fetch(getAuthLogoutUrl(), {
      method: "POST",
      headers: buildAuthUpstreamHeaders({
        incomingHeaders: request.headers,
        authorization,
      }),
      body: JSON.stringify(refreshToken ? { refreshToken } : {}),
      cache: "no-store",
    }).catch(() => undefined);
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(REFRESH_COOKIE_NAME, "", getSecureCookieOptions(0));
  response.cookies.set(SESSION_COOKIE_NAME, "", getSecureCookieOptions(0));
  return response;
}
