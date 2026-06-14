import type { Request } from "express";

export type JwtPayload = {
  sub: string;
  tenantId: string;
  email: string;
  roles: string[];
  permissions: string[];
};

export type AuthenticatedUser = JwtPayload & {
  id: string;
};

declare global {
  namespace Express {
    interface Request {
      tenantId?: string;
      user?: AuthenticatedUser;
      correlationId?: string;
    }
  }
}

export type TenantScopedRequest = Request & {
  tenantId: string;
  user: AuthenticatedUser;
};
