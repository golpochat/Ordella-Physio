import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import type { Response } from "express";
import {
  createApiKeySchema,
  createCustomRoleSchema,
  createPermissionGroupSchema,
  createWebhookSchema,
  recordActivitySchema,
  recordAuditSchema,
  updateCustomRoleSchema,
  updateWebhookSchema,
  upsertSsoConfigSchema,
  UseZodValidation,
} from "@ordella/validation";
import { PermissionGuard, RequirePermissions, RequireRoles, RoleGuard } from "@ordella/security";
import type { OrdellaRequest } from "@ordella/middleware";
import { EnterprisePlanGuard } from "@/enterprise/guards/enterprise-plan.guard";
import { EnterpriseTenantGuard } from "@/enterprise/guards/enterprise-tenant.guard";
import { JwtGuard } from "@/enterprise/guards/jwt.guard";
import { TenantId } from "@/enterprise/guards/tenant-id.decorator";
import { EnterpriseService } from "@/enterprise/enterprise.service";
import type { AuthenticatedEnterpriseUser } from "@/utils/enterprise-helpers";
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

@Controller("enterprise")
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  @Get("health")
  health() {
    return { status: "ok", service: "enterprise-service" };
  }

  @Get("permissions/catalog")
  @UseGuards(JwtGuard, EnterpriseTenantGuard, PermissionGuard)
  @RequirePermissions("enterprise.read")
  permissionCatalog() {
    return this.enterpriseService.getPermissionCatalog();
  }

  @Get("sso")
  @UseGuards(JwtGuard, EnterpriseTenantGuard, EnterprisePlanGuard, PermissionGuard)
  @RequirePermissions("enterprise.read")
  listSso(@TenantId() tenantId: string) {
    return this.enterpriseService.listSsoConfigs(tenantId);
  }

  @Post("sso")
  @UseGuards(JwtGuard, EnterpriseTenantGuard, EnterprisePlanGuard, PermissionGuard)
  @RequirePermissions("enterprise.write")
  @UseZodValidation(upsertSsoConfigSchema)
  upsertSso(@TenantId() tenantId: string, @Body() dto: UpsertSsoConfigInput) {
    return this.enterpriseService.upsertSsoConfig(tenantId, dto);
  }

  @Delete("sso/:provider")
  @UseGuards(JwtGuard, EnterpriseTenantGuard, EnterprisePlanGuard, PermissionGuard)
  @RequirePermissions("enterprise.write")
  deleteSso(@TenantId() tenantId: string, @Param("provider") provider: string) {
    return this.enterpriseService.deleteSsoConfig(tenantId, provider);
  }

  @Get("sso/saml/metadata/:tenantId")
  samlMetadata(@Param("tenantId") tenantId: string) {
    return this.enterpriseService.getSamlMetadata(tenantId);
  }

  @Post("sso/saml/acs")
  samlAcs(@Query("tenantId") tenantId: string, @Body() payload: unknown) {
    return this.enterpriseService.handleSamlAcs(tenantId, payload);
  }

  @Get("sso/oauth/start")
  @UseGuards(JwtGuard, EnterpriseTenantGuard, EnterprisePlanGuard, PermissionGuard)
  @RequirePermissions("enterprise.write")
  startOAuth(@TenantId() tenantId: string, @Query("provider") provider: string) {
    return this.enterpriseService.startSsoOAuth(tenantId, provider);
  }

  @Get("sso/oauth/callback")
  async oauthCallback(
    @Query("code") code: string,
    @Query("state") state: string,
    @Res() response: Response,
  ) {
    const result = await this.enterpriseService.handleSsoOAuthCallback(code, state);
    return response.redirect(`${result.redirectUrl}?status=connected&provider=sso`);
  }

  @Get("permission-groups")
  @UseGuards(JwtGuard, EnterpriseTenantGuard, EnterprisePlanGuard, PermissionGuard)
  @RequirePermissions("enterprise.read")
  listPermissionGroups(@TenantId() tenantId: string) {
    return this.enterpriseService.listPermissionGroups(tenantId);
  }

  @Post("permission-groups")
  @UseGuards(JwtGuard, EnterpriseTenantGuard, EnterprisePlanGuard, PermissionGuard)
  @RequirePermissions("enterprise.write")
  @UseZodValidation(createPermissionGroupSchema)
  createPermissionGroup(@TenantId() tenantId: string, @Body() dto: CreatePermissionGroupInput) {
    return this.enterpriseService.createPermissionGroup(tenantId, dto);
  }

  @Get("roles")
  @UseGuards(JwtGuard, EnterpriseTenantGuard, EnterprisePlanGuard, PermissionGuard)
  @RequirePermissions("enterprise.read")
  listRoles(@TenantId() tenantId: string) {
    return this.enterpriseService.listRoles(tenantId);
  }

  @Post("roles")
  @UseGuards(JwtGuard, EnterpriseTenantGuard, EnterprisePlanGuard, PermissionGuard)
  @RequirePermissions("enterprise.write")
  @UseZodValidation(createCustomRoleSchema)
  createRole(@TenantId() tenantId: string, @Body() dto: CreateCustomRoleInput) {
    return this.enterpriseService.createRole(tenantId, dto);
  }

  @Patch("roles/:id")
  @UseGuards(JwtGuard, EnterpriseTenantGuard, EnterprisePlanGuard, PermissionGuard)
  @RequirePermissions("enterprise.write")
  @UseZodValidation(updateCustomRoleSchema)
  updateRole(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Body() dto: UpdateCustomRoleInput,
  ) {
    return this.enterpriseService.updateRole(tenantId, id, dto);
  }

  @Delete("roles/:id")
  @UseGuards(JwtGuard, EnterpriseTenantGuard, EnterprisePlanGuard, PermissionGuard)
  @RequirePermissions("enterprise.write")
  deleteRole(@TenantId() tenantId: string, @Param("id") id: string) {
    return this.enterpriseService.deleteRole(tenantId, id);
  }

  @Get("audit-logs")
  @UseGuards(JwtGuard, EnterpriseTenantGuard, EnterprisePlanGuard, PermissionGuard)
  @RequirePermissions("enterprise.read")
  auditLogs(@TenantId() tenantId: string, @Query("action") action?: string) {
    return this.enterpriseService.listAuditLogs(tenantId, action);
  }

  @Get("admin/audit-logs")
  @UseGuards(JwtGuard, RoleGuard, PermissionGuard)
  @RequireRoles("SYSTEM")
  @RequirePermissions("enterprise.manage")
  globalAuditLogs(@Query("action") action?: string) {
    return this.enterpriseService.listGlobalAuditLogs(action);
  }

  @Post("audit-logs")
  @UseGuards(JwtGuard, EnterpriseTenantGuard, PermissionGuard)
  @RequirePermissions("enterprise.write")
  @UseZodValidation(recordAuditSchema)
  recordAudit(
    @TenantId() tenantId: string,
    @Body() dto: RecordAuditInput,
    @Req() request: OrdellaRequest,
  ) {
    const user = request.user as AuthenticatedEnterpriseUser | undefined;
    return this.enterpriseService.recordAuditLog(tenantId, user, dto);
  }

  @Get("activity-logs")
  @UseGuards(JwtGuard, EnterpriseTenantGuard, EnterprisePlanGuard, PermissionGuard)
  @RequirePermissions("enterprise.read")
  activityLogs(@TenantId() tenantId: string, @Query("eventType") eventType?: string) {
    return this.enterpriseService.listActivityLogs(tenantId, eventType);
  }

  @Get("admin/activity-logs")
  @UseGuards(JwtGuard, RoleGuard, PermissionGuard)
  @RequireRoles("SYSTEM")
  @RequirePermissions("enterprise.manage")
  globalActivityLogs(@Query("eventType") eventType?: string) {
    return this.enterpriseService.listGlobalActivityLogs(eventType);
  }

  @Post("activity-logs")
  @UseGuards(JwtGuard, EnterpriseTenantGuard, PermissionGuard)
  @RequirePermissions("enterprise.write")
  @UseZodValidation(recordActivitySchema)
  recordActivity(@TenantId() tenantId: string, @Body() dto: RecordActivityInput) {
    return this.enterpriseService.recordActivity(tenantId, dto);
  }

  @Get("api-keys")
  @UseGuards(JwtGuard, EnterpriseTenantGuard, EnterprisePlanGuard, PermissionGuard)
  @RequirePermissions("enterprise.read")
  listApiKeys(@TenantId() tenantId: string) {
    return this.enterpriseService.listApiKeys(tenantId);
  }

  @Post("api-keys")
  @UseGuards(JwtGuard, EnterpriseTenantGuard, EnterprisePlanGuard, PermissionGuard)
  @RequirePermissions("enterprise.write")
  @UseZodValidation(createApiKeySchema)
  createApiKey(
    @TenantId() tenantId: string,
    @Body() dto: CreateApiKeyInput,
    @Req() request: OrdellaRequest,
  ) {
    const user = request.user as AuthenticatedEnterpriseUser;
    return this.enterpriseService.createApiKey(tenantId, user, dto);
  }

  @Post("api-keys/:id/rotate")
  @UseGuards(JwtGuard, EnterpriseTenantGuard, EnterprisePlanGuard, PermissionGuard)
  @RequirePermissions("enterprise.write")
  rotateApiKey(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Req() request: OrdellaRequest,
  ) {
    const user = request.user as AuthenticatedEnterpriseUser;
    return this.enterpriseService.rotateApiKey(tenantId, user, id);
  }

  @Delete("api-keys/:id")
  @UseGuards(JwtGuard, EnterpriseTenantGuard, EnterprisePlanGuard, PermissionGuard)
  @RequirePermissions("enterprise.write")
  revokeApiKey(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Req() request: OrdellaRequest,
  ) {
    const user = request.user as AuthenticatedEnterpriseUser;
    return this.enterpriseService.revokeApiKey(tenantId, user, id);
  }

  @Get("api-keys/usage")
  @UseGuards(JwtGuard, EnterpriseTenantGuard, EnterprisePlanGuard, PermissionGuard)
  @RequirePermissions("enterprise.read")
  apiKeyUsage(@TenantId() tenantId: string, @Query("apiKeyId") apiKeyId?: string) {
    return this.enterpriseService.listApiKeyUsage(tenantId, apiKeyId);
  }

  @Get("webhooks")
  @UseGuards(JwtGuard, EnterpriseTenantGuard, EnterprisePlanGuard, PermissionGuard)
  @RequirePermissions("enterprise.read")
  listWebhooks(@TenantId() tenantId: string) {
    return this.enterpriseService.listWebhooks(tenantId);
  }

  @Post("webhooks")
  @UseGuards(JwtGuard, EnterpriseTenantGuard, EnterprisePlanGuard, PermissionGuard)
  @RequirePermissions("enterprise.write")
  @UseZodValidation(createWebhookSchema)
  createWebhook(
    @TenantId() tenantId: string,
    @Body() dto: CreateWebhookInput,
    @Req() request: OrdellaRequest,
  ) {
    const user = request.user as AuthenticatedEnterpriseUser;
    return this.enterpriseService.createWebhook(tenantId, user, dto);
  }

  @Patch("webhooks/:id")
  @UseGuards(JwtGuard, EnterpriseTenantGuard, EnterprisePlanGuard, PermissionGuard)
  @RequirePermissions("enterprise.write")
  @UseZodValidation(updateWebhookSchema)
  updateWebhook(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Body() dto: UpdateWebhookInput,
  ) {
    return this.enterpriseService.updateWebhook(tenantId, id, dto);
  }

  @Delete("webhooks/:id")
  @UseGuards(JwtGuard, EnterpriseTenantGuard, EnterprisePlanGuard, PermissionGuard)
  @RequirePermissions("enterprise.write")
  deleteWebhook(@TenantId() tenantId: string, @Param("id") id: string) {
    return this.enterpriseService.deleteWebhook(tenantId, id);
  }

  @Post("webhooks/dispatch")
  @UseGuards(JwtGuard, EnterpriseTenantGuard, PermissionGuard)
  @RequirePermissions("enterprise.write")
  dispatchWebhook(
    @TenantId() tenantId: string,
    @Body() body: { eventType: string; payload: Record<string, unknown> },
  ) {
    return this.enterpriseService.dispatchWebhookEvent(tenantId, body.eventType, body.payload);
  }

  @Post("webhooks/retries/process")
  @UseGuards(JwtGuard, RoleGuard, PermissionGuard)
  @RequireRoles("SYSTEM")
  @RequirePermissions("enterprise.manage")
  processRetries() {
    return this.enterpriseService.processWebhookRetries();
  }
}
