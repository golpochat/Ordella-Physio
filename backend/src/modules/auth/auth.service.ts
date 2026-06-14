import { prisma } from "../../lib/prisma";
import { ConflictError, NotFoundError, UnauthorizedError } from "../../utils/api-error";
import { hashPassword, hashToken, verifyPassword, verifyTokenHash } from "../../utils/password";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../../utils/jwt";
import { ensureDefaultRoles, getUserRolesAndPermissions } from "../rbac/rbac.service";
import { writeAuditLog } from "../utilities/audit.service";
import { resolveTenantByIdOrSlug } from "../../utils/tenant-resolver";

async function buildAuthResponse(userId: string, tenantId: string, email: string) {
  const { roles, permissions } = await getUserRolesAndPermissions(userId, tenantId);
  const payload = { sub: userId, tenantId, email, roles, permissions };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(userId, tenantId);
  const tokenHash = await hashToken(refreshToken);

  await prisma.refreshToken.create({
    data: {
      userId,
      tokenHash,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return {
    accessToken,
    refreshToken,
    user: { id: userId, email, tenantId, roles, permissions },
  };
}

export async function login(input: {
  tenantSlug?: string;
  tenantId?: string;
  email: string;
  password: string;
  ipAddress?: string;
  userAgent?: string;
}) {
  const tenant = await resolveTenant(input.tenantSlug, input.tenantId);
  if (!tenant || tenant.status !== "ACTIVE") {
    throw new UnauthorizedError("Invalid credentials");
  }

  const user = await prisma.user.findUnique({
    where: { tenantId_email: { tenantId: tenant.id, email: input.email.toLowerCase() } },
  });

  if (!user || user.status !== "ACTIVE") {
    throw new UnauthorizedError("Invalid credentials");
  }

  const valid = await verifyPassword(input.password, user.passwordHash);
  if (!valid) {
    throw new UnauthorizedError("Invalid credentials");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  await writeAuditLog({
    tenantId: tenant.id,
    userId: user.id,
    action: "auth.login",
    ipAddress: input.ipAddress,
    userAgent: input.userAgent,
  });

  return buildAuthResponse(user.id, tenant.id, user.email);
}

async function resolveTenant(tenantSlug?: string, tenantId?: string) {
  if (tenantId) {
    const resolved = await resolveTenantByIdOrSlug(tenantId);
    if (resolved) return resolved;
  }

  if (tenantSlug) {
    const resolved = await resolveTenantByIdOrSlug(tenantSlug);
    if (resolved) return resolved;
  }

  return null;
}

export async function refresh(refreshToken: string) {
  const payload = verifyRefreshToken(refreshToken);
  const tokens = await prisma.refreshToken.findMany({
    where: { userId: payload.sub, revokedAt: null },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  let matchedId: string | null = null;
  for (const stored of tokens) {
    if (await verifyTokenHash(refreshToken, stored.tokenHash)) {
      matchedId = stored.id;
      break;
    }
  }

  if (!matchedId) {
    throw new UnauthorizedError("Invalid refresh token");
  }

  await prisma.refreshToken.update({
    where: { id: matchedId },
    data: { revokedAt: new Date() },
  });

  const user = await prisma.user.findUnique({ where: { id: payload.sub } });
  if (!user || user.status !== "ACTIVE") {
    throw new UnauthorizedError("User inactive");
  }

  return buildAuthResponse(user.id, user.tenantId, user.email);
}

export async function registerTenantUser(input: {
  tenantId: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  roleName?: "ADMIN" | "THERAPIST" | "STAFF";
}) {
  const tenant = await prisma.tenant.findUnique({ where: { id: input.tenantId } });
  if (!tenant) {
    throw new NotFoundError("Tenant not found");
  }

  await ensureDefaultRoles(tenant.id);

  const existing = await prisma.user.findUnique({
    where: { tenantId_email: { tenantId: tenant.id, email: input.email.toLowerCase() } },
  });
  if (existing) {
    throw new ConflictError("Email already registered for this tenant");
  }

  const passwordHash = await hashPassword(input.password);
  const user = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      email: input.email.toLowerCase(),
      passwordHash,
      firstName: input.firstName,
      lastName: input.lastName,
    },
  });

  const role = await prisma.role.findUnique({
    where: {
      tenantId_name: {
        tenantId: tenant.id,
        name: input.roleName ?? "STAFF",
      },
    },
  });

  if (role) {
    await prisma.userRole.create({ data: { userId: user.id, roleId: role.id } });
  }

  return buildAuthResponse(user.id, user.tenantId, user.email);
}

export async function getCurrentUser(userId: string, tenantId: string) {
  const user = await prisma.user.findFirst({
    where: { id: userId, tenantId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      status: true,
      tenantId: true,
      roles: { include: { role: true } },
    },
  });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const roles = user.roles.map((entry) => entry.role.name);
  const permissions = [...new Set(user.roles.flatMap((entry) => entry.role.permissions))];

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    status: user.status,
    tenantId: user.tenantId,
    roles,
    permissions,
  };
}

export async function updateCurrentUser(
  userId: string,
  tenantId: string,
  input: { firstName?: string; lastName?: string; email?: string; phone?: string },
) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      ...(input.firstName !== undefined ? { firstName: input.firstName } : {}),
      ...(input.lastName !== undefined ? { lastName: input.lastName } : {}),
      ...(input.email !== undefined ? { email: input.email.toLowerCase() } : {}),
      ...(input.phone !== undefined ? { phone: input.phone } : {}),
    },
  });

  return getCurrentUser(userId, tenantId);
}
