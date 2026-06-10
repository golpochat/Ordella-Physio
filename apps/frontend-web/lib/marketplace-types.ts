export type IntegrationProvider = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  authType: "oauth" | "apiKey" | "none" | string;
  createdAt: string;
};

export type TenantIntegration = {
  id: string;
  tenantId: string;
  providerId: string;
  provider: IntegrationProvider;
  status: string;
  hasAccessToken: boolean;
  hasRefreshToken: boolean;
  apiKeyMasked: string | null;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ConnectIntegrationResponse =
  | { type: "oauth"; authUrl: string; providerId: string }
  | { type: "apiKey"; integration: TenantIntegration }
  | { type: "linked"; integration: TenantIntegration };

export type IntegrationUsageLog = {
  id: string;
  tenantId: string;
  integrationId: string;
  action: string;
  status: string;
  metadata: unknown;
  createdAt: string;
};
