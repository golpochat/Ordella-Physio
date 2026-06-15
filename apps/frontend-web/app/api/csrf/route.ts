import { randomBytes } from "node:crypto";

import { NextResponse } from "next/server";

import { CSRF_COOKIE_NAME } from "@/lib/auth/csrf";

export async function GET() {
  const token = randomBytes(32).toString("hex");
  const response = NextResponse.json({ csrfToken: token });

  response.cookies.set(CSRF_COOKIE_NAME, token, {
    httpOnly: false,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60,
  });

  return response;
}
