import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class EnterpriseRepository {
  constructor(private readonly db: DatabaseService) {}

  listSsoConfigs(tenantId: string) {
    return this.db.ssoConfig.findMany({ where: { tenantId }, orderBy: { provider: "asc" } });
  }

  upsertSsoConfig(data: Prisma.SsoConfigCreateInput) {
    return this.db.ssoConfig.upsert({
      where: { tenantId_provider: { tenantId: data.tenantId, provider: data.provider } },
      create: data,
      update: {
        name: data.name,
        isEnabled: data.isEnabled,
        entityId: data.entityId,
        ssoUrl: data.ssoUrl,
        certificate: data.certificate,
        clientId: data.clientId,
        clientSecret: data.clientSecret,
        issuerUrl: data.issuerUrl,
        metadataUrl: data.metadataUrl,
        redirectUri: data.redirectUri,
        scopes: data.scopes,
        attributeMap: data.attributeMap,
      },
    });
  }

  deleteSsoConfig(tenantId: string, provider: string) {
    return this.db.ssoConfig.delete({ where: { tenantId_provider: { tenantId, provider } } });
  }

  findSsoConfig(tenantId: string, provider: string) {
    return this.db.ssoConfig.findUnique({ where: { tenantId_provider: { tenantId, provider } } });
  }

  listPermissionGroups(tenantId: string) {
    return this.db.permissionGroup.findMany({ where: { tenantId }, orderBy: { name: "asc" } });
  }

  createPermissionGroup(data: Prisma.PermissionGroupCreateInput) {
    return this.db.permissionGroup.create({ data });
  }

  listRoles(tenantId: string) {
    return this.db.customRole.findMany({
      where: { tenantId },
      include: { permissionGroup: true, parentRole: true },
      orderBy: { name: "asc" },
    });
  }

  createRole(data: Prisma.CustomRoleCreateInput) {
    return this.db.customRole.create({ data });
  }

  async updateRole(id: string, tenantId: string, data: Prisma.CustomRoleUpdateInput) {
    const role = await this.db.customRole.findFirst({ where: { id, tenantId } });
    if (!role) return null;
    return this.db.customRole.update({ where: { id }, data });
  }

  async deleteRole(id: string, tenantId: string) {
    const role = await this.db.customRole.findFirst({ where: { id, tenantId } });
    if (!role) return null;
    return this.db.customRole.delete({ where: { id } });
  }

  findRole(id: string, tenantId: string) {
    return this.db.customRole.findFirst({
      where: { id, tenantId },
      include: { parentRole: true, permissionGroup: true },
    });
  }

  createAuditLog(data: Prisma.AuditLogCreateInput) {
    return this.db.auditLog.create({ data });
  }

  listAuditLogs(tenantId: string | undefined, params?: { limit?: number; action?: string }) {
    return this.db.auditLog.findMany({
      where: {
        ...(tenantId ? { tenantId } : {}),
        ...(params?.action ? { action: params.action } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: params?.limit ?? 100,
    });
  }

  createActivityLog(data: Prisma.ActivityLogCreateInput) {
    return this.db.activityLog.create({ data });
  }

  listActivityLogs(tenantId: string | undefined, params?: { limit?: number; eventType?: string }) {
    return this.db.activityLog.findMany({
      where: {
        ...(tenantId ? { tenantId } : {}),
        ...(params?.eventType ? { eventType: params.eventType } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: params?.limit ?? 100,
    });
  }

  listApiKeys(tenantId: string) {
    return this.db.apiKey.findMany({
      where: { tenantId, revokedAt: null },
      orderBy: { createdAt: "desc" },
    });
  }

  createApiKey(data: Prisma.ApiKeyCreateInput) {
    return this.db.apiKey.create({ data });
  }

  findApiKey(id: string, tenantId: string) {
    return this.db.apiKey.findFirst({ where: { id, tenantId } });
  }

  revokeApiKey(id: string, tenantId: string) {
    return this.db.apiKey.update({
      where: { id, tenantId },
      data: { revokedAt: new Date() },
    });
  }

  rotateApiKey(id: string, tenantId: string, keyPrefix: string, keyHash: string) {
    return this.db.apiKey.update({
      where: { id, tenantId },
      data: { keyPrefix, keyHash, updatedAt: new Date() },
    });
  }

  logApiKeyUsage(data: Prisma.ApiKeyUsageLogCreateInput) {
    return this.db.apiKeyUsageLog.create({ data });
  }

  listApiKeyUsage(tenantId: string, apiKeyId?: string) {
    return this.db.apiKeyUsageLog.findMany({
      where: { tenantId, ...(apiKeyId ? { apiKeyId } : {}) },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  }

  listWebhooks(tenantId: string) {
    return this.db.webhookConfig.findMany({ where: { tenantId }, orderBy: { createdAt: "desc" } });
  }

  createWebhook(data: Prisma.WebhookConfigCreateInput) {
    return this.db.webhookConfig.create({ data });
  }

  updateWebhook(id: string, tenantId: string, data: Prisma.WebhookConfigUpdateInput) {
    return this.db.webhookConfig.update({ where: { id, tenantId }, data });
  }

  deleteWebhook(id: string, tenantId: string) {
    return this.db.webhookConfig.delete({ where: { id, tenantId } });
  }

  findWebhook(id: string, tenantId: string) {
    return this.db.webhookConfig.findFirst({ where: { id, tenantId } });
  }

  listWebhooksForEvent(tenantId: string, eventType: string) {
    return this.db.webhookConfig.findMany({
      where: { tenantId, isEnabled: true },
    }).then((hooks) =>
      hooks.filter((hook) => {
        const events = hook.eventTypes as string[];
        return events.includes(eventType);
      }),
    );
  }

  createWebhookDelivery(data: Prisma.WebhookDeliveryCreateInput) {
    return this.db.webhookDelivery.create({ data });
  }

  updateWebhookDelivery(id: string, data: Prisma.WebhookDeliveryUpdateInput) {
    return this.db.webhookDelivery.update({ where: { id }, data });
  }

  listPendingDeliveries() {
    return this.db.webhookDelivery.findMany({
      where: {
        status: { in: ["pending", "retrying"] },
        OR: [{ nextRetryAt: null }, { nextRetryAt: { lte: new Date() } }],
      },
      include: { webhook: true },
      take: 50,
    });
  }
}
