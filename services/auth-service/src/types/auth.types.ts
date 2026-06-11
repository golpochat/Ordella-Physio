import type { SecurityRole } from "@ordella/security";

export type AuthTokenPayload = {
  userId: string;
  tenantId: string;
  role: SecurityRole;
  email: string;
  sessionId?: string;
  jti?: string;
  tokenVersion?: number;
};

export type AuthSessionUser = {
  id: string;
  tenantId: string;
  email: string;
  role: string;
  emailVerified: boolean;
  firstName?: string;
  lastName?: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthSessionResponse = {
  user: AuthSessionUser;
  tenantId: string;
  role: string;
};

export type AuthLoginResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  sessionId: string;
  user: AuthSessionUser;
};

export type AuthenticatedUserContext = {
  userId: string;
  tenantId: string;
  role: SecurityRole;
  email?: string;
};
