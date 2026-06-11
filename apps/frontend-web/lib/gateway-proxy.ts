import { type NextRequest, NextResponse } from "next/server";
import { TENANT_HEADER, GATEWAY_PATHS, type ApiServiceKey } from "./constants";
import { getDefaultTenantId } from "./tenant-config";

const SERVICE_GATEWAY_MAP: Record<ApiServiceKey, string> = {
  auth: GATEWAY_PATHS.auth,
  tenant: GATEWAY_PATHS.tenant,
  patient: GATEWAY_PATHS.patient,
  appointment: GATEWAY_PATHS.appointment,
  notes: GATEWAY_PATHS.notes,
  billing: GATEWAY_PATHS.billing,
  payment: GATEWAY_PATHS.payment,
  communication: GATEWAY_PATHS.communication,
  reporting: GATEWAY_PATHS.reporting,
  messaging: GATEWAY_PATHS.messaging,
  notifications: GATEWAY_PATHS.notifications,
  ai: GATEWAY_PATHS.ai,
  marketplace: GATEWAY_PATHS.marketplace,
  enterprise: GATEWAY_PATHS.enterprise,
  organization: GATEWAY_PATHS.organization,
  terminal: GATEWAY_PATHS.terminal,
};

const SERVICE_API_PREFIX: Record<ApiServiceKey, string> = {
  auth: "/api/auth",
  tenant: "/api/tenant",
  patient: "/api/patient",
  appointment: "/api/appointment",
  notes: "/api/notes",
  billing: "/api/billing",
  payment: "/api/payment",
  communication: "/api/communication",
  reporting: "/api/reporting",
  messaging: "/api/messaging",
  notifications: "/api/notifications",
  ai: "/api/ai",
  marketplace: "/api/marketplace",
  enterprise: "/api/enterprise",
  organization: "/api/organization",
  terminal: "/api/terminal",
};

const PROXY_STRIP_REQUEST_HEADERS = [
  "host",
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "proxy-connection",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "expect",
  "content-length",
];

export function getGatewayBaseUrl(): string {
  return (
    process.env.API_GATEWAY_INTERNAL_URL ??
    process.env.NEXT_PUBLIC_API_GATEWAY_URL ??
    "http://localhost:3049"
  );
}

export async function proxyToGateway(
  request: NextRequest,
  service: ApiServiceKey,
  pathSuffix = "",
): Promise<NextResponse> {
  const gatewayBase = getGatewayBaseUrl();
  const gatewayPrefix = SERVICE_GATEWAY_MAP[service];
  const apiPrefix = SERVICE_API_PREFIX[service];
  const incomingPath = request.nextUrl.pathname.slice(apiPrefix.length);
  const targetPath = `${gatewayPrefix}${pathSuffix || incomingPath}`;
  const targetUrl = new URL(targetPath, gatewayBase);
  targetUrl.search = request.nextUrl.search;

  const headers = new Headers(request.headers);
  for (const name of PROXY_STRIP_REQUEST_HEADERS) {
    headers.delete(name);
  }

  if (service === "auth" && !headers.get(TENANT_HEADER)) {
    const defaultTenantId = getDefaultTenantId();
    if (defaultTenantId) {
      headers.set(TENANT_HEADER, defaultTenantId);
    }
  }

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
