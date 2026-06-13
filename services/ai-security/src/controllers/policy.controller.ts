import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import { AccessPolicyService } from "@/services/access-policy.service";
import type { AuthenticatedSecurityUser } from "@/utils/security-user";

@Controller("security")
export class PolicyController {
  constructor(private readonly accessPolicyService: AccessPolicyService) {}

  @Get("policies")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  listPolicies(@CurrentUser() user: AuthenticatedSecurityUser) {
    return this.accessPolicyService.listPolicies(user.tenantId);
  }

  @Post("policies")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  assignPolicy(
    @CurrentUser() user: AuthenticatedSecurityUser,
    @Body() body: { modelId: string; allowedRoles: string[]; allowedUsers?: string[] },
  ) {
    return this.accessPolicyService.assignPolicy(user.tenantId, body.modelId, body.allowedRoles, body.allowedUsers);
  }

  @Delete("policies/:id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  revokePolicy(@CurrentUser() user: AuthenticatedSecurityUser, @Param("id") id: string) {
    return this.accessPolicyService.revokePolicy(user.tenantId, id);
  }
}
