import { type NextRequest, NextResponse } from "next/server";
import { GATEWAY_PATHS, type ApiServiceKey } from "./constants";

const SERVICE_API_PREFIX: Record<ApiServiceKey, string> = {
  auth: "/api/auth",
  tenants: "/api/tenants",
  patients: "/api/patients",
  appointments: "/api/appointments",
  notes: "/api/notes",
  billing: "/api/billing",
  payments: "/api/payments",
  communication: "/api/communication",
  reporting: "/api/reporting",
};

export function getGatewayBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_GATEWAY_URL ?? "http://localhost:3049";
}

export async function proxyToGateway(
  request: NextRequest,
  service: ApiServiceKey,
  pathSuffix = "",
): Promise<NextResponse> {
  const gatewayBase = getGatewayBaseUrl();
  const gatewayPrefix = GATEWAY_PATHS[service];
  const apiPrefix = SERVICE_API_PREFIX[service];
  const incomingPath = request.nextUrl.pathname.slice(apiPrefix.length);
  const targetPath = `${gatewayPrefix}${pathSuffix || incomingPath}`;
  const targetUrl = new URL(targetPath, gatewayBase);
  targetUrl.search = request.nextUrl.search;

  const headers = new Headers(request.headers);
  headers.delete("host");

  const body =
    request.method === "GET" || request.method === "HEAD" ? undefined : await request.arrayBuffer();

  const upstream = await fetch(targetUrl, {
    method: request.method,
    headers,
    body,
    redirect: "manual",
  });

  const responseHeaders = new Headers(upstream.headers);
  responseHeaders.delete("transfer-encoding");

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
}

export function notImplementedResponse(feature: string): NextResponse {
  return NextResponse.json(
    { message: `${feature} proxy scaffold — implement business logic later.` },
    { status: 501 },
  );
}
