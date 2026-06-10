import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import type {
  CreateApiKeyInput,
  CreateCustomRoleInput,
  CreatePermissionGroupInput,
  CreateWebhookInput,
  RecordActivityInput,
  RecordAuditInput,
  UpdateCustomRoleInput,
  UpdateWebhookInput,
  UpsertSsoConfigInput,
} from "@ordella/validation";
import { ENTERPRISE_PERMISSIONS_CATALOG } from "@/constants";
import { EnterpriseRepository } from "@/enterprise/enterprise.repository";
import { SsoService } from "@/enterprise/sso.service";
import { WebhookDispatcherService } from "@/enterprise/webhook-dispatcher.service";
import {
  generateApiKey,
  resolveInheritedPermissions,
  type AuthenticatedEnterpriseUser,
} from "@/utils/enterprise-helpers";

@Injectable()
export class EnterpriseService {
  constructor(
    private readonly repository: EnterpriseRepository,
    private readonly ssoService: SsoService,
    private readonly webhookDispatcher: WebhookDispatcherService,
  ) {}

  getPermissionCatalog() {
    return { permissions: ENTERPRISE_PERMISSIONS_CATALOG };
  }

  listSsoConfigs(tenantId: string) {
    return this.ssoService.listConfigs(tenantId);
  }

  upsertSsoConfig(tenantId: string, input: UpsertSsoConfigInput) {
    return this.ssoService.upsertConfig(tenantId, input);
  }

  deleteSsoConfig(tenantId: string, provider: string) {
    return this.ssoService.deleteConfig(tenantId, provider);
  }

  getSamlMetadata(tenantId: string) {
    return this.ssoService.getSamlMetadata(tenantId);
  }

  handleSamlAcs(tenantId: string, payload: unknown) {
    return this.ssoService.handleSamlAcs(tenantId, payload);
  }

  startSsoOAuth(tenantId: string, provider: string) {
    return this.ssoService.createOAuthAuthorizationUrl(tenantId, provider);
  }

  handleSsoOAuthCallback(code: string, state: string) {
    return this.ssoService.handleOAuthCallback(code, state);
  }

  listPermissionGroups(tenantId: string) {
    return this.repository.listPermissionGroups(tenantId);
  }

  createPermissionGroup(tenantId: string, input: CreatePermissionGroupInput) {
    return this.repository.createPermissionGroup({
      tenantId,
      name: input.name,
      description: input.description,
      permissions: input.permissions,
    });
  }

  async listRoles(tenantId: string) {
    const roles = await this.repository.listRoles(tenantId);
    return roles.map((role) => this.toRoleResponse(role));
  }

  async createRole(tenantId: string, input: CreateCustomRoleInput) {
    let inherited: string[] = [];
    if (input.parentRoleId) {
      const parent = await this.repository.findRole(input.parentRoleId, tenantId);
      if (!parent) throw new BadRequestException("Parent role not found");
      inherited = (parent.permissions as string[]) ?? [];
    }

    const role = await this.repository.createRole({
      tenantId,
      name: input.name,
      slug: input.slug,
      description: input.description,
      permissions: resolveInheritedPermissions(input.permissions, inherited),
      parentRole: input.parentRoleId ? { connect: { id: input.parentRoleId } } : undefined,
      permissionGroup: input.permissionGroupId
        ? { connect: { id: input.permissionGroupId } }
        : undefined,
    });

    return this.toRoleResponse(role);
  }

  async updateRole(tenantId: string, roleId: string, input: UpdateCustomRoleInput) {
    const existing = await this.repository.findRole(roleId, tenantId);
    if (!existing) throw new NotFoundException("Role not found");

    let permissions = input.permissions ?? (existing.permissions as string[]);
    if (input.parentRoleId) {
      const parent = await this.repository.findRole(input.parentRoleId, tenantId);
      if (parent) {
        permissions = resolveInheritedPermissions(permissions, parent.permissions as string[]);
      }
    }

    const role = await this.repository.updateRole(roleId, tenantId, {
      name: input.name,
      description: input.description,
      permissions,
      parentRole: input.parentRoleId
        ? { connect: { id: input.parentRoleId } }
        : input.parentRoleId === null
          ? { disconnect: true }
          : undefined,
    });

    if (!role) throw new NotFoundException("Role not found");
    return this.toRoleResponse(role);
  }

  deleteRole(tenantId: string, roleId: string) {
    return this.repository.deleteRole(roleId, tenantId);
  }

  recordAuditLog(tenantId: string, user: AuthenticatedEnterpriseUser | undefined, input: RecordAuditInput) {
    return this.repository.createAuditLog({
      tenantId,
      actorId: user?.userId ?? input.actorId,
      actorEmail: user?.email ?? input.actorEmail,
      action: input.action,
      resource: input.resource,
      resourceId: input.resourceId,
      status: input.status ?? "success",
      metadata: input.metadata as Prisma.InputJsonValue | undefined,
      ipAddress: input.ipAddress,
    });
  }

  listAuditLogs(tenantId: string, action?: string) {
    return this.repository.listAuditLogs(tenantId, { action }).then((logs) =>
      logs.map((log) => ({
        id: log.id,
        tenantId: log.tenantId,
        actorId: log.actorId,
        actorEmail: log.actorEmail,
        action: log.action,
        resource: log.resource,
        resourceId: log.resourceId,
        status: log.status,
        metadata: log.metadata,
        ipAddress: log.ipAddress,
        createdAt: log.createdAt.toISOString(),
      })),
    );
  }

  listGlobalAuditLogs(action?: string) {
    return this.repository.listAuditLogs(undefined, { action }).then((logs) =>
      logs.map((log) => ({
        id: log.id,
        tenantId: log.tenantId,
        actorId: log.actorId,
        actorEmail: log.actorEmail,
        action: log.action,
        resource: log.resource,
        resourceId: log.resourceId,
        status: log.status,
        metadata: log.metadata,
        ipAddress: log.ipAddress,
        createdAt: log.createdAt.toISOString(),
      })),
    );
  }

  recordActivity(tenantId: string, input: RecordActivityInput) {
    return this.repository.createActivityLog({
      tenantId,
      userId: input.userId,
      eventType: input.eventType,
      source: input.source,
      status: input.status ?? "success",
      metadata: input.metadata as Prisma.InputJsonValue | undefined,
    });
  }

  listActivityLogs(tenantId: string, eventType?: string) {
    return this.repository.listActivityLogs(tenantId, { eventType }).then((logs) =>
      logs.map((log) => ({
        id: log.id,
        tenantId: log.tenantId,
        userId: log.userId,
        eventType: log.eventType,
        source: log.source,
        status: log.status,
        metadata: log.metadata,
        createdAt: log.createdAt.toISOString(),
      })),
    );
  }

  listGlobalActivityLogs(eventType?: string) {
    return this.repository.listActivityLogs(undefined, { eventType }).then((logs) =>
      logs.map((log) => ({
        id: log.id,
        tenantId: log.tenantId,
        userId: log.userId,
        eventType: log.eventType,
        source: log.source,
        status: log.status,
        metadata: log.metadata,
        createdAt: log.createdAt.toISOString(),
      })),
    );
  }

  async createApiKey(tenantId: string, user: AuthenticatedEnterpriseUser, input: CreateApiKeyInput) {
    const { rawKey, prefix, hash } = generateApiKey();
    const apiKey = await this.repository.createApiKey({
      tenantId,
      name: input.name,
      keyPrefix: prefix,
      keyHash: hash,
      scopes: input.scopes,
      createdById: user.userId,
      expiresAt: input.expiresAt ? new Date(input.expiresAt) : undefined,
    });

    await this.recordAuditLog(tenantId, user, {
      action: "api_key.created",
      resource: "api_key",
      resourceId: apiKey.id,
    });

    return {
      id: apiKey.id,
      name: apiKey.name,
      keyPrefix: apiKey.keyPrefix,
      scopes: apiKey.scopes,
      rawKey,
      expiresAt: apiKey.expiresAt?.toISOString() ?? null,
      createdAt: apiKey.createdAt.toISOString(),
    };
  }

  listApiKeys(tenantId: string) {
    return this.repository.listApiKeys(tenantId).then((keys) =>
      keys.map((key) => ({
        id: key.id,
        name: key.name,
        keyPrefix: key.keyPrefix,
        scopes: key.scopes,
        lastUsedAt: key.lastUsedAt?.toISOString() ?? null,
        expiresAt: key.expiresAt?.toISOString() ?? null,
        createdAt: key.createdAt.toISOString(),
      })),
    );
  }

  async rotateApiKey(tenantId: string, user: AuthenticatedEnterpriseUser, apiKeyId: string) {
    const existing = await this.repository.findApiKey(apiKeyId, tenantId);
    if (!existing) throw new NotFoundException("API key not found");

    const { rawKey, prefix, hash } = generateApiKey();
    const apiKey = await this.repository.rotateApiKey(apiKeyId, tenantId, prefix, hash);

    await this.recordAuditLog(tenantId, user, {
      action: "api_key.rotated",
      resource: "api_key",
      resourceId: apiKeyId,
    });

    return { id: apiKey.id, keyPrefix: prefix, rawKey };
  }

  async revokeApiKey(tenantId: string, user: AuthenticatedEnterpriseUser, apiKeyId: string) {
    const existing = await this.repository.findApiKey(apiKeyId, tenantId);
    if (!existing) throw new NotFoundException("API key not found");

    await this.repository.revokeApiKey(apiKeyId, tenantId);
    await this.recordAuditLog(tenantId, user, {
      action: "api_key.revoked",
      resource: "api_key",
      resourceId: apiKeyId,
    });

    return { revoked: true, apiKeyId };
  }

  listApiKeyUsage(tenantId: string, apiKeyId?: string) {
    return this.repository.listApiKeyUsage(tenantId, apiKeyId);
  }

  async createWebhook(tenantId: string, user: AuthenticatedEnterpriseUser, input: CreateWebhookInput) {
    const webhook = await this.repository.createWebhook({
      tenantId,
      name: input.name,
      url: input.url,
      secret: input.secret,
      eventTypes: input.eventTypes,
      isEnabled: input.isEnabled ?? true,
      maxRetries: input.maxRetries ?? 3,
    });

    await this.recordAuditLog(tenantId, user, {
      action: "webhook.created",
      resource: "webhook",
      resourceId: webhook.id,
    });

    return this.toWebhookResponse(webhook);
  }

  listWebhooks(tenantId: string) {
    return this.repository.listWebhooks(tenantId).then((hooks) =>
      hooks.map((hook) => this.toWebhookResponse(hook)),
    );
  }

  async updateWebhook(tenantId: string, webhookId: string, input: UpdateWebhookInput) {
    const webhook = await this.repository.updateWebhook(webhookId, tenantId, input);
    return this.toWebhookResponse(webhook);
  }

  deleteWebhook(tenantId: string, webhookId: string) {
    return this.repository.deleteWebhook(webhookId, tenantId);
  }

  dispatchWebhookEvent(tenantId: string, eventType: string, payload: Record<string, unknown>) {
    return this.webhookDispatcher.dispatchEvent(tenantId, eventType, payload);
  }

  processWebhookRetries() {
    return this.webhookDispatcher.processRetries();
  }

  private toRoleResponse(role: {
    id: string;
    tenantId: string;
    name: string;
    slug: string;
    description: string | null;
    parentRoleId: string | null;
    permissions: unknown;
    isSystem: boolean;
    createdAt: Date;
    updatedAt: Date;
  }) {
    return {
      id: role.id,
      tenantId: role.tenantId,
      name: role.name,
      slug: role.slug,
      description: role.description,
      parentRoleId: role.parentRoleId,
      permissions: role.permissions,
      isSystem: role.isSystem,
      createdAt: role.createdAt.toISOString(),
      updatedAt: role.updatedAt.toISOString(),
    };
  }

  private toWebhookResponse(webhook: {
    id: string;
    tenantId: string;
    name: string;
    url: string;
    eventTypes: unknown;
    isEnabled: boolean;
    maxRetries: number;
    createdAt: Date;
    updatedAt: Date;
  }) {
    return {
      id: webhook.id,
      tenantId: webhook.tenantId,
      name: webhook.name,
      url: webhook.url,
      eventTypes: webhook.eventTypes,
      isEnabled: webhook.isEnabled,
      maxRetries: webhook.maxRetries,
      createdAt: webhook.createdAt.toISOString(),
      updatedAt: webhook.updatedAt.toISOString(),
    };
  }
}
