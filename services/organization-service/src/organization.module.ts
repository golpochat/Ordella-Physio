import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { OrganizationController } from "@/controllers/organization.controller";
import { InternalOrganizationController } from "@/controllers/internal-organization.controller";
import { SuperAdminOrganizationController } from "@/controllers/super-admin-organization.controller";
import { OrganizationConfigController } from "@/controllers/organization-config.controller";
import { OrganizationSsoController } from "@/controllers/organization-sso.controller";
import { OrganizationBillingService } from "@/services/organization-billing.service";
import { OrganizationService } from "@/services/organization.service";
import { OrganizationConfigService } from "@/services/organization-config.service";
import { OrganizationSsoService } from "@/services/organization-sso.service";
import { OrganizationRepository } from "@/repositories/organization.repository";
import { OrganizationConfigRepository } from "@/repositories/organization-config.repository";
import { OrganizationSsoRepository } from "@/repositories/organization-sso.repository";
import { JwtStrategy } from "@/strategies/jwt.strategy";
import { JwtGuard } from "@/guards/jwt.guard";
import { OrganizationManageGuard } from "@/guards/organization-manage.guard";
import { TenantServiceClient } from "@/integrations/tenant-service.client";
import { AuditLogClient } from "@/integrations/audit-log.client";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  controllers: [
    OrganizationController,
    InternalOrganizationController,
    SuperAdminOrganizationController,
    OrganizationConfigController,
    OrganizationSsoController,
  ],
  providers: [
    OrganizationService,
    OrganizationConfigService,
    OrganizationBillingService,
    OrganizationSsoService,
    OrganizationRepository,
    OrganizationConfigRepository,
    OrganizationSsoRepository,
    TenantServiceClient,
    AuditLogClient,
    JwtStrategy,
    JwtGuard,
    OrganizationManageGuard,
  ],
  exports: [OrganizationService],
})
export class OrganizationModule {}
