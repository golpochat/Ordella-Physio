import { Body, Controller, Get, Param, Put, UseGuards } from "@nestjs/common";
import { OrganizationConfigService } from "@/services/organization-config.service";
import { JwtGuard } from "@/guards/jwt.guard";
import { OrganizationManageGuard } from "@/guards/organization-manage.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { AuthenticatedOrganizationUser } from "@/utils/organization-helpers";

@Controller("organizations")
export class OrganizationConfigController {
  constructor(private readonly organizationConfigService: OrganizationConfigService) {}

  @Get(":orgId/config")
  @UseGuards(JwtGuard, OrganizationManageGuard)
  listNamespaces(@Param("orgId") orgId: string) {
    return this.organizationConfigService.listNamespaces(orgId);
  }

  @Get(":orgId/config/:namespace")
  @UseGuards(JwtGuard, OrganizationManageGuard)
  getConfig(@Param("orgId") orgId: string, @Param("namespace") namespace: string) {
    return this.organizationConfigService.getConfig(orgId, namespace);
  }

  @Put(":orgId/config/:namespace")
  @UseGuards(JwtGuard, OrganizationManageGuard)
  updateConfig(
    @Param("orgId") orgId: string,
    @Param("namespace") namespace: string,
    @Body() body: { data?: unknown },
    @CurrentUser() user: AuthenticatedOrganizationUser,
  ) {
    return this.organizationConfigService.updateConfig(
      orgId,
      namespace,
      body?.data ?? body,
      user,
    );
  }
}
