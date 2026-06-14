import { type NextRequest, NextResponse } from "next/server";
import { API_ROUTES, TENANT_HEADER, type ApiServiceKey } from "./constants";
import { getDefaultTenantId } from "./tenant-config";

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

const CLINIC_BACKEND_PREFIX: Partial<Record<ApiServiceKey, string>> = {
  auth: "/api/auth",
  patient: "/api/patients",
  appointment: "/api/appointments",
  notes: "/api/notes",
  billing: "/api/billing",
  reporting: "/api/reports",
  audit: "/api/audit-logs",
  notifications: "/api/notifications",
  staffMember: "/api/staff",
  userRole: "/api/rbac",
};

export function isClinicBackendService(service: ApiServiceKey): boolean {
  return service in CLINIC_BACKEND_PREFIX;
}

export function useClinicBackend(): boolean {
  return (
    process.env.USE_CLINIC_BACKEND === "true" ||
    process.env.USE_CLINIC_BACKEND === "1" ||
    Boolean(process.env.CLINIC_BACKEND_INTERNAL_URL)
  );
}

export function getClinicBackendBaseUrl(): string {
  return (
    process.env.CLINIC_BACKEND_INTERNAL_URL ??
    process.env.NEXT_PUBLIC_CLINIC_BACKEND_URL ??
    "http://localhost:4000"
  );
}

function rewriteClinicBackendPath(service: ApiServiceKey, incomingPath: string): string {
  const prefix = CLINIC_BACKEND_PREFIX[service];
  if (!prefix) {
    return `/api${incomingPath}`;
  }

  const apiPrefix = API_ROUTES[service];
  const suffix = incomingPath.startsWith(apiPrefix)
    ? incomingPath.slice(apiPrefix.length)
    : incomingPath;

  return `${prefix}${suffix}`;
}

function rewriteClinicBackendQuery(search: string): string {
  const params = new URLSearchParams(search);
  if (params.has("limit") && !params.has("pageSize")) {
    params.set("pageSize", params.get("limit")!);
    params.delete("limit");
  }
  return params.toString();
}

export async function proxyToClinicBackend(
  request: NextRequest,
  service: ApiServiceKey,
): Promise<NextResponse> {
  const backendBase = getClinicBackendBaseUrl();
  const targetPath = rewriteClinicBackendPath(service, request.nextUrl.pathname);
  const targetUrl = new URL(targetPath, backendBase);
  targetUrl.search = rewriteClinicBackendQuery(request.nextUrl.search);

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
