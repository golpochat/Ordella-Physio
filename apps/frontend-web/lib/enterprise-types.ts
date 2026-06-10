export type SsoConfig = {
  id: string;
  tenantId: string;
  provider: string;
  name: string;
  isEnabled: boolean;
  entityId: string | null;
  ssoUrl: string | null;
  clientId: string | null;
  clientSecretMasked: string | null;
  issuerUrl: string | null;
  metadataUrl: string | null;
  redirectUri: string | null;
  scopes: unknown;
  createdAt: string;
  updatedAt: string;
};

export type CustomRole = {
  id: string;
  tenantId: string;
  name: string;
  slug: string;
  description: string | null;
  parentRoleId: string | null;
  permissions: string[];
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AuditLog = {
  id: string;
  tenantId: string;
  actorId: string | null;
  actorEmail: string | null;
  action: string;
  resource: string;
  resourceId: string | null;
  status: string;
  metadata: unknown;
  ipAddress: string | null;
  createdAt: string;
};

export type ActivityLog = {
  id: string;
  tenantId: string;
  userId: string | null;
  eventType: string;
  source: string;
  status: string;
  metadata: unknown;
  createdAt: string;
};

export type ApiKey = {
  id: string;
  name: string;
  keyPrefix: string;
  scopes: string[];
  lastUsedAt: string | null;
  expiresAt: string | null;
  createdAt: string;
};

export type CreateApiKeyResponse = ApiKey & { rawKey: string };

export type WebhookConfig = {
  id: string;
  tenantId: string;
  name: string;
  url: string;
  eventTypes: string[];
  isEnabled: boolean;
  maxRetries: number;
  createdAt: string;
  updatedAt: string;
};
