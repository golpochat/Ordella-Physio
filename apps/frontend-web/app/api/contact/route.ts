import { NextResponse } from "next/server";
import { isSuspiciousBot, parseContactPayload } from "@/lib/security";

export async function POST(request: Request) {
  const userAgent = request.headers.get("user-agent");

  if (isSuspiciousBot(userAgent)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
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

  const { name, email, clinicName, message } = parsed.data;

  // Placeholder: wire to email provider or CRM webhook in production.
  console.log("Contact form submission:", {
    name,
    email,
    clinicName,
    message,
    submittedAt: new Date().toISOString(),
  });

  return NextResponse.json({ success: true });
}
