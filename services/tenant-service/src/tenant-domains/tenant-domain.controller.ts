import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions } from "@ordella/security";
import { TenantDomainService } from "@/tenant-domains/tenant-domain.service";
import type {
  CreateTenantDomainPayload,
  VerifyTenantDomainPayload,
} from "@/models/TenantDomain";
import { JwtGuard } from "@/tenants/guards/jwt.guard";
import { TenantMatchGuard } from "@/tenants/guards/tenant-match.guard";
import { CurrentUser } from "@/tenants/guards/current-user.decorator";
import type { AuthenticatedTenantUser } from "@/utils/tenant-helpers";

@Controller("tenants")
export class TenantDomainController {
  constructor(private readonly tenantDomainService: TenantDomainService) {}

  @Get("internal/domain/:host")
  async resolveDomain(@Param("host") host: string) {
    const result = await this.tenantDomainService.resolveDomain(host);
    return result ?? { tenantId: null, verified: false };
  }

  @Get(":tenantId/domains")
  @UseGuards(JwtGuard, TenantMatchGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.TENANT_MANAGE)
  listDomains(@Param("tenantId") tenantId: string) {
    return this.tenantDomainService.listDomains(tenantId);
  }

  @Post(":tenantId/domains")
  @UseGuards(JwtGuard, TenantMatchGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.TENANT_MANAGE)
  createDomain(
    @Param("tenantId") tenantId: string,
    @Body() payload: CreateTenantDomainPayload,
    @CurrentUser() user: AuthenticatedTenantUser,
  ) {
    return this.tenantDomainService.createDomain(tenantId, payload, user);
  }

  @Post(":tenantId/domains/:domainId/verify")
  @UseGuards(JwtGuard, TenantMatchGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.TENANT_MANAGE)
  verifyDomain(
    @Param("tenantId") tenantId: string,
    @Param("domainId") domainId: string,
    @Body() payload: VerifyTenantDomainPayload,
  ) {
    return this.tenantDomainService.verifyDomain(tenantId, domainId, payload);
  }

  @Delete(":tenantId/domains/:domainId")
  @UseGuards(JwtGuard, TenantMatchGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.TENANT_MANAGE)
  deleteDomain(@Param("tenantId") tenantId: string, @Param("domainId") domainId: string) {
    return this.tenantDomainService.deleteDomain(tenantId, domainId);
  }
}
