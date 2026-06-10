import type { createApiClient } from "@/lib/api-client";
import type {
  ActivityLog,
  AuditLog,
  ApiKey,
  CreateApiKeyResponse,
  CustomRole,
  SsoConfig,
  WebhookConfig,
} from "@/lib/enterprise-types";

export type EnterpriseApiClient = ReturnType<typeof createApiClient>;

export function createEnterpriseApi(api: EnterpriseApiClient) {
  return {
    listSso() {
      return api.get<SsoConfig[]>("enterprise", "/sso");
    },

    upsertSso(payload: Record<string, unknown>) {
      return api.post<SsoConfig>("enterprise", "/sso", payload);
    },

    deleteSso(provider: string) {
      return api.delete<{ deleted: boolean }>("enterprise", `/sso/${provider}`);
    },

    startSsoOAuth(provider: string) {
      return api.get<{ authUrl: string; provider: string }>("enterprise", "/sso/oauth/start", {
        params: { provider },
      });
    },

    listRoles() {
      return api.get<CustomRole[]>("enterprise", "/roles");
    },

    createRole(payload: Record<string, unknown>) {
      return api.post<CustomRole>("enterprise", "/roles", payload);
    },

    deleteRole(roleId: string) {
      return api.delete<{ deleted: boolean }>("enterprise", `/roles/${roleId}`);
    },

    listAuditLogs(action?: string) {
      return api.get<AuditLog[]>("enterprise", "/audit-logs", {
        params: action ? { action } : undefined,
      });
    },

    listGlobalAuditLogs(action?: string) {
      return api.get<AuditLog[]>("enterprise", "/admin/audit-logs", {
        params: action ? { action } : undefined,
      });
    },

    listActivityLogs(eventType?: string) {
      return api.get<ActivityLog[]>("enterprise", "/activity-logs", {
        params: eventType ? { eventType } : undefined,
      });
    },

    listGlobalActivityLogs(eventType?: string) {
      return api.get<ActivityLog[]>("enterprise", "/admin/activity-logs", {
        params: eventType ? { eventType } : undefined,
      });
    },

    listApiKeys() {
      return api.get<ApiKey[]>("enterprise", "/api-keys");
    },

    createApiKey(payload: { name: string; scopes: string[] }) {
      return api.post<CreateApiKeyResponse>("enterprise", "/api-keys", payload);
    },

    rotateApiKey(apiKeyId: string) {
      return api.post<{ id: string; keyPrefix: string; rawKey: string }>(
        "enterprise",
        `/api-keys/${apiKeyId}/rotate`,
      );
    },

    revokeApiKey(apiKeyId: string) {
      return api.delete<{ revoked: boolean }>("enterprise", `/api-keys/${apiKeyId}`);
    },

    listWebhooks() {
      return api.get<WebhookConfig[]>("enterprise", "/webhooks");
    },

    createWebhook(payload: Record<string, unknown>) {
      return api.post<WebhookConfig>("enterprise", "/webhooks", payload);
    },

    deleteWebhook(webhookId: string) {
      return api.delete<{ deleted: boolean }>("enterprise", `/webhooks/${webhookId}`);
    },

    permissionCatalog() {
      return api.get<{ permissions: string[] }>("enterprise", "/permissions/catalog");
    },
  };
}
