import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { TenantGuard as SecurityTenantGuard } from "@ordella/security";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { PermissionEnforcementGuard, RequireAuthPermission } from "@/auth/guards/permission-enforcement.guard";
import { PlatformIntegrationService } from "@/platform-integrations/platform-integration.service";
import type {
  AddressLookupConnectionTestInput,
  CreateAddressLookupIntegrationInput,
  UpdateAddressLookupIntegrationInput,
} from "@/platform-integrations/platform-integration.types";
import type { AuthenticatedRequestUser } from "@/utils/auth-helpers";

type RequestWithUser = {
  user?: AuthenticatedRequestUser;
  ip?: string;
  headers?: Record<string, string | string[] | undefined>;
};

function actorFromRequest(request: RequestWithUser) {
  const user = request.user;
  if (!user?.userId) {
    throw new UnauthorizedException();
  }

  const forwarded = request.headers?.["x-forwarded-for"];
  const ipAddress =
    request.ip ??
    (typeof forwarded === "string" ? forwarded.split(",")[0]?.trim() : undefined) ??
    null;
  const userAgent =
    typeof request.headers?.["user-agent"] === "string" ? request.headers["user-agent"] : null;

  return { userId: user.userId, ipAddress, userAgent };
}

@Controller("auth/platform/integrations")
@UseGuards(JwtGuard, SecurityTenantGuard, PermissionEnforcementGuard)
export class PlatformIntegrationController {
  constructor(private readonly platformIntegrationService: PlatformIntegrationService) {}

  @Get("address-lookup")
  @RequireAuthPermission("platform.integrations.manage")
  listAddressLookupIntegrations() {
    return this.platformIntegrationService.listAddressLookupIntegrations();
  }

  @Post("address-lookup/test")
  @RequireAuthPermission("platform.integrations.manage")
  testAddressLookupCredentials(
    @Body() body: AddressLookupConnectionTestInput,
    @Req() request: RequestWithUser,
  ) {
    return this.platformIntegrationService.testAddressLookupCredentials(body, actorFromRequest(request));
  }

  @Post("address-lookup/:id/test")
  @RequireAuthPermission("platform.integrations.manage")
  testAddressLookupIntegration(@Param("id") id: string, @Req() request: RequestWithUser) {
    return this.platformIntegrationService.testAddressLookupIntegration(id, actorFromRequest(request));
  }

  @Post("address-lookup")
  @RequireAuthPermission("platform.integrations.manage")
  createAddressLookupIntegration(
    @Body() body: CreateAddressLookupIntegrationInput,
    @Req() request: RequestWithUser,
  ) {
    return this.platformIntegrationService.createAddressLookupIntegration(body, actorFromRequest(request));
  }

  @Patch("address-lookup/:id")
  @RequireAuthPermission("platform.integrations.manage")
  updateAddressLookupIntegration(
    @Param("id") id: string,
    @Body() body: UpdateAddressLookupIntegrationInput,
    @Req() request: RequestWithUser,
  ) {
    return this.platformIntegrationService.updateAddressLookupIntegration(
      id,
      body,
      actorFromRequest(request),
    );
  }

  @Delete("address-lookup/:id")
  @RequireAuthPermission("platform.integrations.manage")
  deleteAddressLookupIntegration(@Param("id") id: string, @Req() request: RequestWithUser) {
    return this.platformIntegrationService.deleteAddressLookupIntegration(id, actorFromRequest(request));
  }

  @Put("address-lookup/active")
  @RequireAuthPermission("platform.integrations.manage")
  setActiveAddressLookupIntegration(
    @Body() body: { integrationId?: string | null },
    @Req() request: RequestWithUser,
  ) {
    const integrationId =
      body.integrationId === null || body.integrationId === undefined
        ? null
        : String(body.integrationId).trim() || null;

    return this.platformIntegrationService.setActiveAddressLookupIntegration(
      integrationId,
      actorFromRequest(request),
    );
  }
}
