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
