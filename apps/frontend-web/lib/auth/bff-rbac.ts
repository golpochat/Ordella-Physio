import { NextResponse, type NextRequest } from "next/server";
import { parseSessionCookie } from "@/lib/auth/session-middleware";
import {
  canAccessOrganizationPortal,
  canAccessSuperAdminPortal,
  canAccessTenantPortal,
  userHasPlatformPermission,
} from "@/lib/platform-rbac";
import { PLATFORM_PERMISSIONS } from "@ordella/security/rbac";

type SessionUser = {
  role?: string;
  effectiveRole?: string;
  permissions?: string[];
  resolvedPermissions?: string[];
  organizationId?: string | null;
};

function toSubject(user: SessionUser) {
  return {
    role: user.role,
    effectiveRole: user.effectiveRole,
    permissions: user.resolvedPermissions ?? user.permissions ?? [],
    organizationId: user.organizationId,
  };
}

async function readSessionUser(request: NextRequest): Promise<SessionUser | null> {
  const raw = request.cookies.get("ordella-session")?.value;
  const session = await parseSessionCookie(raw);
  return session?.user ?? null;
}

export async function enforceBffPermission(
  request: NextRequest,
  requiredPermission: string,
): Promise<NextResponse | null> {
  const user = await readSessionUser(request);
  if (!user) {
    return NextResponse.json({ message: "Authentication required" }, { status: 401 });
  }

  if (!userHasPlatformPermission(toSubject(user), requiredPermission)) {
    return NextResponse.json({ message: "Missing required permission" }, { status: 403 });
  }

  return null;
}

export async function enforceBffPortalIsolation(
  request: NextRequest,
  pathname: string,
): Promise<NextResponse | null> {
  const user = await readSessionUser(request);
  if (!user) {
    return null;
  }

  const subject = toSubject(user);

  if (pathname.startsWith("/api/super-admin") && !canAccessSuperAdminPortal(subject)) {
    return NextResponse.json({ message: "Super-admin access required" }, { status: 403 });
  }

  if (
    pathname.includes("/organization") &&
    !canAccessOrganizationPortal(subject) &&
    !canAccessSuperAdminPortal(subject)
  ) {
    if (!userHasPlatformPermission(subject, PLATFORM_PERMISSIONS.ORG_TENANTS_READ)) {
      return NextResponse.json({ message: "Organization access required" }, { status: 403 });
    }
  }

  if (
    (pathname.startsWith("/api/patient") ||
      pathname.startsWith("/api/appointment") ||
      pathname.startsWith("/api/notes")) &&
    !canAccessTenantPortal(subject) &&
    !canAccessSuperAdminPortal(subject)
  ) {
    return NextResponse.json({ message: "Tenant portal access required" }, { status: 403 });
  }

  return null;
}
