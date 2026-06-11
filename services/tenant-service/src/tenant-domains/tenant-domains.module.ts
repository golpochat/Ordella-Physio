import { Module } from "@nestjs/common";
import { TenantDomainController } from "@/tenant-domains/tenant-domain.controller";
import { TenantDomainService } from "@/tenant-domains/tenant-domain.service";
import { TenantDomainRepository } from "@/tenant-domains/tenant-domain.repository";
import { TenantsModule } from "@/tenants/tenants.module";
import { JwtGuard } from "@/tenants/guards/jwt.guard";
import { TenantMatchGuard } from "@/tenants/guards/tenant-match.guard";

@Module({
  imports: [TenantsModule],
  controllers: [TenantDomainController],
  providers: [TenantDomainService, TenantDomainRepository, JwtGuard, TenantMatchGuard],
  exports: [TenantDomainService, TenantDomainRepository],
})
export class TenantDomainsModule {}
