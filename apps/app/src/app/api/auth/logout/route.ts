import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
  COOKIE_TENANT_ID,
  getGatewayUrl,
  HEADER_TENANT_ID,
} from "@/lib/constants";

export async function POST() {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get(COOKIE_REFRESH_TOKEN)?.value;
  const tenantId = cookieStore.get(COOKIE_TENANT_ID)?.value;

  if (refreshToken && tenantId) {
    await fetch(`${getGatewayUrl()}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [HEADER_TENANT_ID]: tenantId,
      },
      body: JSON.stringify({ refreshToken }),
    });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.delete(COOKIE_ACCESS_TOKEN);
  response.cookies.delete(COOKIE_REFRESH_TOKEN);
  response.cookies.delete(COOKIE_TENANT_ID);
  return response;
}
