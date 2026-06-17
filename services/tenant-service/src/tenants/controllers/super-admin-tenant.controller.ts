import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import type { OrdellaRequest } from "@ordella/middleware";
import type { CreateTenantPayload } from "@/models/Tenant";
import { TenantService } from "@/tenants/services/tenant.service";
import { JwtGuard } from "@/tenants/guards/jwt.guard";
import { PermissionGuard, RequirePermissions, PERMISSIONS } from "@ordella/security";
import { CurrentUser } from "@/tenants/guards/current-user.decorator";
import type { AuthenticatedTenantUser } from "@/utils/tenant-helpers";

@Controller("super-admin/tenants")
export class SuperAdminTenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  @UseGuards(JwtGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.TENANT_MANAGE)
  create(
    @Body() dto: CreateTenantPayload,
    @CurrentUser() user: AuthenticatedTenantUser,
    @Req() request: OrdellaRequest,
  ) {
    return this.tenantService.createTenant(dto, user, request.correlationId);
  }
}
