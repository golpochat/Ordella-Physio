import { Body, Controller, Get, Param, Post, Query, Req, Res, UseGuards } from "@nestjs/common";
import type { Response } from "express";
import {
  connectIntegrationSchema,
  disconnectIntegrationSchema,
  exerciseSyncSchema,
  googleCalendarSyncSchema,
  sendEmailSchema,
  sendSmsSchema,
  uploadNoteSchema,
  UseZodValidation,
} from "@ordella/validation";
import { PermissionGuard, RequirePermissions } from "@ordella/security";
import type { OrdellaRequest } from "@ordella/middleware";
import { MarketplaceTenantGuard } from "@/marketplace/guards/marketplace-tenant.guard";
import { JwtGuard } from "@/marketplace/guards/jwt.guard";
import { TenantId } from "@/marketplace/guards/tenant-id.decorator";
import { MarketplaceService } from "@/marketplace/marketplace.service";
import type { AuthenticatedMarketplaceUser } from "@/utils/marketplace-helpers";
import type {
  ConnectIntegrationInput,
  DisconnectIntegrationInput,
  ExerciseSyncInput,
  GoogleCalendarSyncInput,
  SendEmailInput,
  SendSmsInput,
  UploadNoteInput,
} from "@ordella/validation";

@Controller("marketplace")
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Get("health")
  health() {
    return { status: "ok", service: "marketplace-service" };
  }

  @Get("providers")
  @UseGuards(JwtGuard, MarketplaceTenantGuard, PermissionGuard)
  @RequirePermissions("marketplace.read")
  listProviders() {
    return this.marketplaceService.listProviders();
  }

  @Get("tenant-integrations")
  @UseGuards(JwtGuard, MarketplaceTenantGuard, PermissionGuard)
  @RequirePermissions("marketplace.read")
  listTenantIntegrations(@TenantId() tenantId: string) {
    return this.marketplaceService.listTenantIntegrations(tenantId);
  }

  @Post("tenant-integrations/connect")
  @UseGuards(JwtGuard, MarketplaceTenantGuard, PermissionGuard)
  @RequirePermissions("marketplace.write")
  @UseZodValidation(connectIntegrationSchema)
  connect(
    @TenantId() tenantId: string,
    @Body() dto: ConnectIntegrationInput,
    @Req() request: OrdellaRequest,
  ) {
    const user = request.user as AuthenticatedMarketplaceUser;
    return this.marketplaceService.connect(tenantId, user, dto);
  }

  @Post("tenant-integrations/disconnect")
  @UseGuards(JwtGuard, MarketplaceTenantGuard, PermissionGuard)
  @RequirePermissions("marketplace.write")
  @UseZodValidation(disconnectIntegrationSchema)
  disconnect(@TenantId() tenantId: string, @Body() dto: DisconnectIntegrationInput) {
    return this.marketplaceService.disconnect(tenantId, dto);
  }

  @Get("oauth/redirect")
  async oauthRedirect(
    @Query("code") code: string,
    @Query("state") state: string,
    @Res() response: Response,
  ) {
    const result = await this.marketplaceService.handleOAuthRedirect(code, state);
    const redirectUrl = new URL(result.frontendRedirect);
    redirectUrl.searchParams.set("provider", result.providerSlug);
    redirectUrl.searchParams.set("status", "connected");
    return response.redirect(redirectUrl.toString());
  }

  @Get("usage-logs")
  @UseGuards(JwtGuard, MarketplaceTenantGuard, PermissionGuard)
  @RequirePermissions("marketplace.read")
  usageLogs(@TenantId() tenantId: string, @Query("integrationId") integrationId?: string) {
    return this.marketplaceService.getUsageLogs(tenantId, integrationId);
  }

  @Post("hooks/google-calendar/sync")
  @UseGuards(JwtGuard, MarketplaceTenantGuard, PermissionGuard)
  @RequirePermissions("marketplace.write")
  @UseZodValidation(googleCalendarSyncSchema)
  syncGoogleCalendar(@TenantId() tenantId: string, @Body() dto: GoogleCalendarSyncInput) {
    return this.marketplaceService.syncGoogleCalendar(tenantId, dto);
  }

  @Post("hooks/notes/upload")
  @UseGuards(JwtGuard, MarketplaceTenantGuard, PermissionGuard)
  @RequirePermissions("marketplace.write")
  @UseZodValidation(uploadNoteSchema)
  uploadNote(@TenantId() tenantId: string, @Body() dto: UploadNoteInput) {
    return this.marketplaceService.uploadNote(tenantId, dto);
  }

  @Post("hooks/sms/send")
  @UseGuards(JwtGuard, MarketplaceTenantGuard, PermissionGuard)
  @RequirePermissions("marketplace.write")
  @UseZodValidation(sendSmsSchema)
  sendSms(@TenantId() tenantId: string, @Body() dto: SendSmsInput) {
    return this.marketplaceService.sendSms(tenantId, dto);
  }

  @Post("hooks/email/send")
  @UseGuards(JwtGuard, MarketplaceTenantGuard, PermissionGuard)
  @RequirePermissions("marketplace.write")
  @UseZodValidation(sendEmailSchema)
  sendEmail(@TenantId() tenantId: string, @Body() dto: SendEmailInput) {
    return this.marketplaceService.sendEmail(tenantId, dto);
  }

  @Post("hooks/exercise/sync")
  @UseGuards(JwtGuard, MarketplaceTenantGuard, PermissionGuard)
  @RequirePermissions("marketplace.write")
  @UseZodValidation(exerciseSyncSchema)
  syncExercise(@TenantId() tenantId: string, @Body() dto: ExerciseSyncInput) {
    return this.marketplaceService.syncExerciseProgram(tenantId, dto);
  }

  @Post("webhooks/:providerSlug")
  handleWebhook(@Param("providerSlug") providerSlug: string, @Body() payload: unknown) {
    return this.marketplaceService.handleWebhook(providerSlug, payload);
  }
}
