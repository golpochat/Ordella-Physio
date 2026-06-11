import type { Request } from "express";

export type AuthRole = "OWNER" | "ADMIN" | "STAFF" | "SYSTEM" | "THERAPIST";

export interface AuthContext {
  userId: string;
  tenantId?: string | null;
  role: AuthRole;
  email?: string;
  isSystem?: boolean;
}

export interface OrdellaRequest extends Request {
  correlationId?: string;
  tenantId?: string;
  isSystem?: boolean;
  startTime?: number;
  authContext?: AuthContext;
  rawBody?: Buffer;
}

declare global {
  namespace Express {
    interface Request {
      correlationId?: string;
      tenantId?: string;
      isSystem?: boolean;
      startTime?: number;
      authContext?: AuthContext;
      rawBody?: Buffer;
    }
  }
}
