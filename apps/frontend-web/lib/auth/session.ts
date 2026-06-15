import type { NextRequest } from "next/server";
import { isSystemRole, mapAuthRoleToPortalRole } from "@/lib/auth/roleRedirect";
import { verifySignedSessionCookie } from "@/lib/auth/session-signing";

export const SESSION_COOKIE_NAME = "ordella-session";

export type SessionUser = {
  id: string;
  role: string;
  tenantId?: string;
  roles?: string[];
};

export type MiddlewareSession = {
  user: SessionUser;
};

export type SessionCookiePayload = MiddlewareSession;

const PUBLIC_ROUTE_PREFIXES = ["/login", "/auth"] as const;

/** Maps authenticated roles to their guarded portal namespace root. */
export function resolveMiddlewarePortalHome(role: string, roles?: string[]): string {
  const resolved = roles?.length
    ? roles.map((entry) => mapAuthRoleToPortalRole(entry))
    : [mapAuthRoleToPortalRole(role)];

  if (resolved.includes("SYSTEM")) {
    return "/super-admin";
  }

  if (resolved.some((entry) => entry === "CLINIC_ADMIN" || entry === "ADMIN" || entry === "OWNER")) {
    return "/clinic";
  }

  if (resolved.includes("STAFF")) {
    return "/staff";
  }

  if (resolved.includes("THERAPIST")) {
    return "/therapist";
  }

  return "/login";
}

export function resolveAllowedPortalPrefix(role: string, roles?: string[]): string | null {
  const home = resolveMiddlewarePortalHome(role, roles);
  return home === "/login" ? null : home;
}

export function isPublicMiddlewarePath(pathname: string): boolean {
  if (pathname === "/") {
    return true;
  }

  return PUBLIC_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function isGuardedPortalPath(pathname: string): boolean {
  const guardedPrefixes = [
    "/clinic",
    "/staff",
    "/therapist",
    "/super-admin",
    "/patient",
    "/pharmacy",
    "/user",
    "/admin",
    "/settings",
    "/billing",
  ];

  return guardedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export function serializeSessionCookie(payload: SessionCookiePayload): string {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}

export function parseSessionCookie(value: string | undefined | null): MiddlewareSession | null {
  return verifySignedSessionCookie(value);
}

export function getSession(request: NextRequest): MiddlewareSession | null {
  const raw = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  return parseSessionCookie(raw);
}

export function sessionRequiresTenant(session: MiddlewareSession): boolean {
  const { role, roles } = session.user;
  if (isSystemRole(role)) {
    return false;
  }

  return !roles?.some((entry) => isSystemRole(entry));
}

export function hasValidTenant(session: MiddlewareSession): boolean {
  if (!sessionRequiresTenant(session)) {
    return true;
  }

  return Boolean(session.user.tenantId);
}
