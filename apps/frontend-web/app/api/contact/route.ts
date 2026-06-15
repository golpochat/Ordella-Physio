import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { CSRF_COOKIE_NAME, CSRF_HEADER_NAME } from "@/lib/auth/csrf";
import { isSuspiciousBot, parseContactPayload } from "@/lib/security";

function validateCsrf(request: Request): boolean {
  const cookieStore = cookies();
  const cookieToken = cookieStore.get(CSRF_COOKIE_NAME)?.value;
  const headerToken = request.headers.get(CSRF_HEADER_NAME);
  return Boolean(cookieToken && headerToken && cookieToken === headerToken);
}

export async function POST(request: Request) {
  const userAgent = request.headers.get("user-agent");

  if (isSuspiciousBot(userAgent)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (!validateCsrf(request)) {
    return NextResponse.json({ error: "CSRF validation failed" }, { status: 403 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = parseContactPayload(body);

  if (!parsed.ok) {
    const status = parsed.error === "Bot detected" ? 403 : 400;
    return NextResponse.json({ error: parsed.error }, { status });
  }

  if (process.env.NODE_ENV !== "production") {
    console.info(
      JSON.stringify({
        level: "info",
        type: "contact_form",
        submittedAt: new Date().toISOString(),
      }),
    );
  }

  return NextResponse.json({ success: true });
}
