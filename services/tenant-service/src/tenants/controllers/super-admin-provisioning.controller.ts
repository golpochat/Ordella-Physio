import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import type { OrdellaRequest } from "@ordella/middleware";
import type { FullProvisioningPayload } from "@/models/FullProvisioning";
import { ProvisionFullCommand } from "@/tenants/commands/provision-full.command";
import { JwtGuard } from "@/tenants/guards/jwt.guard";
import { PermissionGuard, RequirePermissions, PERMISSIONS } from "@ordella/security";
import { CurrentUser } from "@/tenants/guards/current-user.decorator";
import type { AuthenticatedTenantUser } from "@/utils/tenant-helpers";

@Controller("super-admin/provisioning")
export class SuperAdminProvisioningController {
  constructor(private readonly provisionFullCommand: ProvisionFullCommand) {}

  @Post("full")
  @UseGuards(JwtGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.TENANT_MANAGE)
  provisionFull(
    @Body() payload: FullProvisioningPayload,
    @CurrentUser() user: AuthenticatedTenantUser,
    @Req() request: OrdellaRequest,
  ) {
    return this.provisionFullCommand.execute(payload, user, request.correlationId);
  }
}
