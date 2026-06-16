import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { CSRF_COOKIE_NAME, validateBffCsrf } from "@/lib/auth/csrf";

export function readBffCsrfCookie(): string | undefined {
  return cookies().get(CSRF_COOKIE_NAME)?.value;
}

export function validateOnboardingBffCsrf(request: Request): boolean {
  return validateBffCsrf(request, readBffCsrfCookie());
}

export function csrfForbiddenResponse() {
  return NextResponse.json(
    { error: { message: "CSRF validation failed", code: "CSRF_VALIDATION_FAILED" } },
    { status: 403 },
  );
}
