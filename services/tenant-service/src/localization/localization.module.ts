import { Module } from "@nestjs/common";
import { TenantLocalizationController } from "@/localization/tenant-localization.controller";
import { TenantLocalizationService } from "@/localization/tenant-localization.service";
import { TenantLocalizationRepository } from "@/localization/tenant-localization.repository";
import { TenantsModule } from "@/tenants/tenants.module";
import { JwtGuard } from "@/tenants/guards/jwt.guard";
import { TenantMatchGuard } from "@/tenants/guards/tenant-match.guard";

@Module({
  imports: [TenantsModule],
  controllers: [TenantLocalizationController],
  providers: [
    TenantLocalizationService,
    TenantLocalizationRepository,
    JwtGuard,
    TenantMatchGuard,
  ],
  exports: [TenantLocalizationService],
})
export class LocalizationModule {}
