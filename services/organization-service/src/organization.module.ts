import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { OrganizationController } from "@/controllers/organization.controller";
import { OrganizationConfigController } from "@/controllers/organization-config.controller";
import { OrganizationService } from "@/services/organization.service";
import { OrganizationConfigService } from "@/services/organization-config.service";
import { OrganizationRepository } from "@/repositories/organization.repository";
import { OrganizationConfigRepository } from "@/repositories/organization-config.repository";
import { JwtStrategy } from "@/strategies/jwt.strategy";
import { JwtGuard } from "@/guards/jwt.guard";
import { OrganizationManageGuard } from "@/guards/organization-manage.guard";
import { TenantServiceClient } from "@/integrations/tenant-service.client";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  controllers: [OrganizationController, OrganizationConfigController],
  providers: [
    OrganizationService,
    OrganizationConfigService,
    OrganizationRepository,
    OrganizationConfigRepository,
    TenantServiceClient,
    JwtStrategy,
    JwtGuard,
    OrganizationManageGuard,
  ],
  exports: [OrganizationService],
})
export class OrganizationModule {}
