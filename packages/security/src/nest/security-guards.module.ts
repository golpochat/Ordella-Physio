import { Global, Module } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PermissionGuard } from "../guards/permission.guard";
import { RoleGuard } from "../guards/role.guard";
import { TenantGuard } from "../guards/tenant.guard";

@Global()
@Module({
  providers: [Reflector, RoleGuard, PermissionGuard, TenantGuard],
  exports: [RoleGuard, PermissionGuard, TenantGuard],
})
export class SecurityGuardsModule {}
