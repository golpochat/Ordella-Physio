import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import {
  refreshOrganizationSsoMetadataSchema,
  upsertOrganizationSsoConfigSchema,
  UseZodValidation,
} from "@ordella/validation";
import { PermissionGuard, RequirePermissions } from "@ordella/security";
import type { UpsertOrganizationSsoConfigInput } from "@ordella/validation";
import { JwtGuard } from "@/guards/jwt.guard";
import { OrganizationManageGuard } from "@/guards/organization-manage.guard";
import { OrganizationSsoService } from "@/services/organization-sso.service";

type AuthenticatedRequest = Request & { user?: { userId?: string } };

@Controller("organizations")
export class OrganizationSsoController {
  constructor(private readonly organizationSsoService: OrganizationSsoService) {}

  @Get(":organizationId/sso")
  @UseGuards(JwtGuard, OrganizationManageGuard, PermissionGuard)
  @RequirePermissions("organization.manage")
  getConfig(@Param("organizationId") organizationId: string) {
    return this.organizationSsoService.getConfigForOrganization(organizationId);
  }

  @Post(":organizationId/sso")
  @UseGuards(JwtGuard, OrganizationManageGuard, PermissionGuard)
  @RequirePermissions("organization.manage")
  @UseZodValidation(upsertOrganizationSsoConfigSchema)
  upsertConfig(
    @Param("organizationId") organizationId: string,
    @Body() dto: UpsertOrganizationSsoConfigInput,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.organizationSsoService.upsertConfig(organizationId, dto, {
      userId: request.user?.userId,
      ipAddress: request.ip,
    });
  }

  @Post(":organizationId/sso/refresh-metadata")
  @UseGuards(JwtGuard, OrganizationManageGuard, PermissionGuard)
  @RequirePermissions("organization.manage")
  @UseZodValidation(refreshOrganizationSsoMetadataSchema)
  refreshMetadata(
    @Param("organizationId") organizationId: string,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.organizationSsoService.refreshMetadata(organizationId, {
      userId: request.user?.userId,
      ipAddress: request.ip,
    });
  }
}
