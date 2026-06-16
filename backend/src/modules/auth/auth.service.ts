import { prisma } from "../../lib/prisma";

import { ConflictError, NotFoundError, UnauthorizedError } from "../../utils/api-error";

import { expandCanonicalPermissions } from "../../middleware/permissions";

import { hashPassword, hashToken, verifyPassword, verifyTokenHash } from "../../utils/password";

import { getTokenExpiryDate, signAccessToken, signRefreshToken, verifyRefreshToken } from "../../utils/jwt";

import { parseDurationToMs } from "../../utils/parse-duration";

import { env } from "../../config";

import { ensureDefaultRoles, getUserRolesAndPermissions } from "../rbac/rbac.service";

import { writeAuditLog } from "../utilities/audit.service";

import { resolveTenantByIdOrSlug } from "../../utils/tenant-resolver";

import { assertTenantAllowsAccess, syncTenantTrialStatus } from "../onboarding/trial.service";

import { assertLoginNotLocked, recordLoginAttempt } from "../security/brute-force.service";

import {

  getUserTokenVersion,

  revokeAccessToken,

  revokeAllUserTokens,

} from "../security/token-revocation.service";



export async function buildAuthResponse(userId: string, tenantId: string, email: string) {

  const [{ roles, permissions }, tokenVersion] = await Promise.all([

    getUserRolesAndPermissions(userId, tenantId),

    getUserTokenVersion(userId),

  ]);



  const payload = { sub: userId, tenantId, email, roles, permissions };

  const accessToken = signAccessToken(payload, tokenVersion);

  const refreshToken = signRefreshToken(userId, tenantId, tokenVersion);

  const tokenHash = await hashToken(refreshToken);

  const refreshTtlMs = parseDurationToMs(env.JWT_REFRESH_EXPIRES_IN, 7 * 24 * 60 * 60 * 1000);



  await prisma.refreshToken.create({

    data: {

      userId,

      tokenHash,

      expiresAt: new Date(Date.now() + refreshTtlMs),

    },

  });



  return {

    accessToken,

    refreshToken,

    user: { id: userId, email, tenantId, roles, permissions },

  };

}



export type LoginResult =
  | Awaited<ReturnType<typeof buildAuthResponse>>
  | {
      requiresTenantSelection: true;
      tenants: Array<{ id: string; name: string; slug: string }>;
    };

async function completeLoginForUser(input: {
  user: { id: string; email: string; passwordHash: string; tenantId: string };
  tenant: { id: string; status: string };
  email: string;
  password: string;
  ipAddress?: string;
  userAgent?: string;
}) {
  const tenant = await syncTenantTrialStatus(input.tenant.id);
  assertTenantAllowsAccess(tenant, {
    allowTrialExpired: tenant.status === "TRIAL_EXPIRED",
    allowRegistered: tenant.status === "REGISTERED",
  });

  await assertLoginNotLocked({
    email: input.email,
    ipAddress: input.ipAddress,
    tenantId: tenant.id,
  });

  const valid = await verifyPassword(input.password, input.user.passwordHash);
  if (!valid) {
    await recordLoginAttempt({
      email: input.email,
      ipAddress: input.ipAddress,
      tenantId: tenant.id,
      userId: input.user.id,
      success: false,
      reason: "invalid_password",
    });
    throw new UnauthorizedError("Invalid credentials");
  }

  await recordLoginAttempt({
    email: input.email,
    ipAddress: input.ipAddress,
    tenantId: tenant.id,
    userId: input.user.id,
    success: true,
  });

  await prisma.user.update({
    where: { id: input.user.id },
    data: { lastLoginAt: new Date() },
  });

  await writeAuditLog({
    tenantId: tenant.id,
    userId: input.user.id,
    action: "auth.login",
    ipAddress: input.ipAddress,
    userAgent: input.userAgent,
  });

  return buildAuthResponse(input.user.id, tenant.id, input.user.email);
}

export async function login(input: {
  tenantSlug?: string;
  tenantId?: string;
  email: string;
  password: string;
  ipAddress?: string;
  userAgent?: string;
}): Promise<LoginResult> {
  const email = input.email.toLowerCase();

  await assertLoginNotLocked({
    email,
    ipAddress: input.ipAddress,
    tenantId: input.tenantId,
  });

  if (input.tenantSlug || input.tenantId) {
    const tenant = await resolveTenant(input.tenantSlug, input.tenantId);
    if (!tenant) {
      await recordLoginAttempt({
        email,
        ipAddress: input.ipAddress,
        success: false,
        reason: "invalid_tenant",
      });
      throw new UnauthorizedError("Invalid credentials");
    }

    const user = await prisma.user.findUnique({
      where: { tenantId_email: { tenantId: tenant.id, email } },
    });

    if (!user || user.status !== "ACTIVE") {
      await recordLoginAttempt({
        email,
        ipAddress: input.ipAddress,
        tenantId: tenant.id,
        success: false,
        reason: "invalid_user",
      });
      throw new UnauthorizedError("Invalid credentials");
    }

    return completeLoginForUser({
      user,
      tenant,
      email,
      password: input.password,
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
    });
  }

  const candidates = await prisma.user.findMany({
    where: { email, status: "ACTIVE" },
    include: { tenant: true },
  });

  if (candidates.length === 0) {
    await recordLoginAttempt({
      email,
      ipAddress: input.ipAddress,
      success: false,
      reason: "invalid_user",
    });
    throw new UnauthorizedError("Invalid credentials");
  }

  const validMatches = [];
  for (const candidate of candidates) {
    if (await verifyPassword(input.password, candidate.passwordHash)) {
      validMatches.push(candidate);
    }
  }

  if (validMatches.length === 0) {
    await recordLoginAttempt({
      email,
      ipAddress: input.ipAddress,
      tenantId: candidates[0]?.tenantId,
      success: false,
      reason: "invalid_password",
    });
    throw new UnauthorizedError("Invalid credentials");
  }

  if (validMatches.length > 1) {
    return {
      requiresTenantSelection: true,
      tenants: validMatches.map((entry) => ({
        id: entry.tenant.id,
        name: entry.tenant.name,
        slug: entry.tenant.slug,
      })),
    };
  }

  const user = validMatches[0]!;
  return completeLoginForUser({
    user,
    tenant: user.tenant,
    email,
    password: input.password,
    ipAddress: input.ipAddress,
    userAgent: input.userAgent,
  });
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

  const tokenVersion = await getUserTokenVersion(payload.sub);



  if (payload.tv !== tokenVersion) {

    throw new UnauthorizedError("Invalid refresh token");

  }



  const tokens = await prisma.refreshToken.findMany({

    where: { userId: payload.sub, revokedAt: null },

    orderBy: { createdAt: "desc" },

    take: 10,

  });



  let matched: (typeof tokens)[number] | null = null;

  for (const stored of tokens) {

    if (stored.expiresAt <= new Date()) {

      continue;

    }



    if (await verifyTokenHash(refreshToken, stored.tokenHash)) {

      matched = stored;

      break;

    }

  }



  if (!matched) {

    throw new UnauthorizedError("Invalid refresh token");

  }



  await prisma.refreshToken.update({

    where: { id: matched.id },

    data: { revokedAt: new Date() },

  });



  if (payload.jti) {

    await revokeAccessToken({

      jti: payload.jti,

      userId: payload.sub,

      tenantId: payload.tenantId,

      expiresAt: getTokenExpiryDate(payload.exp),

    });

  }



  const user = await prisma.user.findUnique({ where: { id: payload.sub } });

  if (!user || user.status !== "ACTIVE") {

    throw new UnauthorizedError("User inactive");

  }



  return buildAuthResponse(user.id, user.tenantId, user.email);

}



export async function logout(input: {

  userId: string;

  refreshToken?: string;

  accessTokenJti?: string;

  accessTokenExp?: number;

}): Promise<void> {

  if (input.refreshToken) {

    const tokens = await prisma.refreshToken.findMany({

      where: { userId: input.userId, revokedAt: null },

      orderBy: { createdAt: "desc" },

      take: 10,

    });



    for (const stored of tokens) {

      if (await verifyTokenHash(input.refreshToken, stored.tokenHash)) {

        await prisma.refreshToken.update({

          where: { id: stored.id },

          data: { revokedAt: new Date() },

        });

        break;

      }

    }

  }



  if (input.accessTokenJti) {

    await revokeAccessToken({

      jti: input.accessTokenJti,

      userId: input.userId,

      expiresAt: getTokenExpiryDate(input.accessTokenExp),

    });

  }

}



export async function logoutAllSessions(userId: string): Promise<void> {

  await revokeAllUserTokens(userId);

}



export async function requestPasswordReset(input: {

  tenantSlug?: string;

  tenantId?: string;

  email: string;

  ipAddress?: string;

}): Promise<{ accepted: true }> {

  const tenant = await resolveTenant(input.tenantSlug, input.tenantId);



  await writeAuditLog({

    tenantId: tenant?.id ?? "unknown",

    action: "auth.forgot_password",

    ipAddress: input.ipAddress,

    metadata: { email: input.email.toLowerCase() },

  });



  // Always return success to avoid account enumeration.

  return { accepted: true };

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

      passwordChangedAt: new Date(),

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

  const permissions = expandCanonicalPermissions(

    [...new Set(user.roles.flatMap((entry) => entry.role.permissions))],

  );



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

  input: { firstName?: string; lastName?: string; email?: string; phone?: string; password?: string },

) {

  const data: {

    firstName?: string;

    lastName?: string;

    email?: string;

    phone?: string;

    passwordHash?: string;

    passwordChangedAt?: Date;

  } = {

    ...(input.firstName !== undefined ? { firstName: input.firstName } : {}),

    ...(input.lastName !== undefined ? { lastName: input.lastName } : {}),

    ...(input.email !== undefined ? { email: input.email.toLowerCase() } : {}),

    ...(input.phone !== undefined ? { phone: input.phone } : {}),

  };



  if (input.password) {

    data.passwordHash = await hashPassword(input.password);

    data.passwordChangedAt = new Date();

    await revokeAllUserTokens(userId);

  }



  await prisma.user.update({

    where: { id: userId },

    data,

  });



  return getCurrentUser(userId, tenantId);

}


