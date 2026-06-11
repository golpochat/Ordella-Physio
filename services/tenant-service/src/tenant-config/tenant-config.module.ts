import { Module } from "@nestjs/common";
import { TenantConfigController } from "@/tenant-config/tenant-config.controller";
import { TenantConfigService } from "@/tenant-config/tenant-config.service";
import { TenantConfigRepository } from "@/tenant-config/tenant-config.repository";
import { TenantsModule } from "@/tenants/tenants.module";
import { JwtGuard } from "@/tenants/guards/jwt.guard";
import { TenantMatchGuard } from "@/tenants/guards/tenant-match.guard";

@Module({
  imports: [TenantsModule],
  controllers: [TenantConfigController],
  providers: [TenantConfigService, TenantConfigRepository, JwtGuard, TenantMatchGuard],
  exports: [TenantConfigService],
})
export class TenantConfigModule {}
