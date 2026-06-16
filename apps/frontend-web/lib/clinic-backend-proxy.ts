import { type NextRequest, NextResponse } from "next/server";
import { API_ROUTES, TENANT_HEADER, type ApiServiceKey } from "./constants";

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
  tenant: "/api/tenant",
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
  const apiPrefix = API_ROUTES[service];
  const suffix = incomingPath.startsWith(apiPrefix)
    ? incomingPath.slice(apiPrefix.length)
    : incomingPath;

  if (service === "userRole") {
    if (suffix === "" || suffix === "/") {
      return "/api/rbac/roles";
    }
    if (suffix === "/permissions") {
      return "/api/rbac/roles";
    }
    return `/api/rbac${suffix}`;
  }

  const prefix = CLINIC_BACKEND_PREFIX[service];
  if (!prefix) {
    return `/api${incomingPath}`;
  }

  return `${prefix}${suffix}`;
}

function rewriteClinicBackendQuery(search: string, service: ApiServiceKey): string {
  const params = new URLSearchParams(search);
  if (params.has("limit") && !params.has("pageSize")) {
    params.set("pageSize", params.get("limit")!);
    params.delete("limit");
  }

  if (service === "staffMember") {
    const status = params.get("status");
    if (status && !params.has("isActive")) {
      params.set("isActive", status.toUpperCase() === "ACTIVE" ? "true" : "false");
      params.delete("status");
    }
  }

  if (service === "appointment") {
    const dateStart = params.get("dateStart");
    if (dateStart && !params.has("startFrom")) {
      params.set("startFrom", dateStart);
      params.delete("dateStart");
    }

    const dateEnd = params.get("dateEnd");
    if (dateEnd && !params.has("startTo")) {
      params.set("startTo", dateEnd);
      params.delete("dateEnd");
    }

    const staffId = params.get("staffId");
    if (staffId && !params.has("therapistId")) {
      params.set("therapistId", staffId);
      params.delete("staffId");
    }
  }

  return params.toString();
}

type ClinicSummaryReport = {
  patientsActive: number;
  appointmentsByStatus: Array<{ status: string; count: number }>;
  invoicesByStatus: Array<{ status: string; count: number; total: number }>;
  paymentsCompleted: { count: number; amount: number };
};

function appointmentStatusCount(
  rows: ClinicSummaryReport["appointmentsByStatus"],
  status: string,
): number {
  return rows.find((row) => row.status === status)?.count ?? 0;
}

function mapSummaryToKpi(summary: ClinicSummaryReport) {
  const totalAppointments = summary.appointmentsByStatus.reduce((sum, row) => sum + row.count, 0);
  const outstandingBalance = summary.invoicesByStatus
    .filter((row) => row.status === "ISSUED" || row.status === "OVERDUE")
    .reduce((sum, row) => sum + row.total, 0);

  return {
    totalAppointments,
    completedAppointments: appointmentStatusCount(summary.appointmentsByStatus, "COMPLETED"),
    cancelledAppointments: appointmentStatusCount(summary.appointmentsByStatus, "CANCELLED"),
    noShowAppointments: appointmentStatusCount(summary.appointmentsByStatus, "NO_SHOW"),
    newPatients: summary.patientsActive,
    revenue: summary.paymentsCompleted.amount,
    outstandingBalance,
  };
}

async function handleReportingClinicBackendProxy(
  request: NextRequest,
  backendBase: string,
  headers: Headers,
): Promise<NextResponse | null> {
  if (request.method !== "GET") {
    return null;
  }

  const apiPrefix = API_ROUTES.reporting;
  const suffix = request.nextUrl.pathname.startsWith(apiPrefix)
    ? request.nextUrl.pathname.slice(apiPrefix.length)
    : request.nextUrl.pathname;

  if (suffix === "/metrics/kpi" || suffix.startsWith("/metrics/kpi?")) {
    const summaryUrl = new URL("/api/reports/summary", backendBase);
    const upstream = await fetch(summaryUrl, { method: "GET", headers });

    if (!upstream.ok) {
      return NextResponse.json({
        totalAppointments: 0,
        completedAppointments: 0,
        cancelledAppointments: 0,
        noShowAppointments: 0,
        newPatients: 0,
        revenue: 0,
        outstandingBalance: 0,
      });
    }

    const payload = (await upstream.json()) as { data?: ClinicSummaryReport };
    const summary = payload.data;
    if (!summary) {
      return NextResponse.json({
        totalAppointments: 0,
        completedAppointments: 0,
        cancelledAppointments: 0,
        noShowAppointments: 0,
        newPatients: 0,
        revenue: 0,
        outstandingBalance: 0,
      });
    }

    return NextResponse.json(mapSummaryToKpi(summary));
  }

  if (suffix === "/reports" || suffix.startsWith("/reports?")) {
    const limit = Number(request.nextUrl.searchParams.get("limit") ?? "50");
    return NextResponse.json({
      items: [],
      total: 0,
      page: 1,
      limit: Number.isFinite(limit) && limit > 0 ? limit : 50,
    });
  }

  if (suffix.startsWith("/reports/revenue")) {
    const targetUrl = new URL("/api/reports/revenue", backendBase);
    const params = new URLSearchParams(request.nextUrl.search);
    const startDate = params.get("startDate");
    const endDate = params.get("endDate");
    if (startDate && !params.has("from")) {
      params.set("from", startDate);
      params.delete("startDate");
    }
    if (endDate && !params.has("to")) {
      params.set("to", endDate);
      params.delete("endDate");
    }
    targetUrl.search = params.toString();

    const upstream = await fetch(targetUrl, { method: "GET", headers });
    const responseHeaders = new Headers(upstream.headers);
    responseHeaders.delete("transfer-encoding");
    return new NextResponse(upstream.body, {
      status: upstream.status,
      headers: responseHeaders,
    });
  }

  return null;
}

export async function proxyToClinicBackend(
  request: NextRequest,
  service: ApiServiceKey,
): Promise<NextResponse> {
  const backendBase = getClinicBackendBaseUrl();

  const headers = new Headers(request.headers);
  for (const name of PROXY_STRIP_REQUEST_HEADERS) {
    headers.delete(name);
  }

  // Clinic backend binds tenant from the JWT — never forward client tenant headers.
  headers.delete(TENANT_HEADER);

  if (service === "reporting") {
    const reportingResponse = await handleReportingClinicBackendProxy(request, backendBase, headers);
    if (reportingResponse) {
      return reportingResponse;
    }
  }

  const targetPath = rewriteClinicBackendPath(service, request.nextUrl.pathname);
  const targetUrl = new URL(targetPath, backendBase);
  targetUrl.search = rewriteClinicBackendQuery(request.nextUrl.search, service);

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
