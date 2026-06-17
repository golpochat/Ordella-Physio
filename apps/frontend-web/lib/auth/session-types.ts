export type SessionUser = {
  id: string;
  role: string;
  effectiveRole?: string;
  tenantId?: string;
  organizationId?: string | null;
  roles?: string[];
  permissions?: string[];
  resolvedPermissions?: string[];
};

export type MiddlewareSession = {
  user: SessionUser;
};

export type SessionCookiePayload = MiddlewareSession;
