import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TenantsController } from "@/tenants/tenants.controller";
import { SuperAdminTenantController } from "@/tenants/controllers/super-admin-tenant.controller";
import { SuperAdminProvisioningController } from "@/tenants/controllers/super-admin-provisioning.controller";
import { TenantsService } from "@/tenants/tenants.service";
import { TenantsRepository } from "@/tenants/tenants.repository";
import { CreateTenantCommand } from "@/tenants/commands/create-tenant.command";
import { ProvisionTenantCommand } from "@/tenants/commands/provision-tenant.command";
import { ProvisionFullCommand } from "@/tenants/commands/provision-full.command";
import { UpdateTenantCommand } from "@/tenants/commands/update-tenant.command";
import { AddLocationCommand } from "@/tenants/commands/add-location.command";
import { UpdateLocationCommand } from "@/tenants/commands/update-location.command";
import { AddStaffCommand } from "@/tenants/commands/add-staff.command";
import { UpdateStaffRoleCommand } from "@/tenants/commands/update-staff-role.command";
import { JwtStrategy } from "@/tenants/strategies/jwt.strategy";
import { JwtGuard } from "@/tenants/guards/jwt.guard";
import { TenantMatchGuard } from "@/tenants/guards/tenant-match.guard";
import { LocationsModule } from "@/locations/locations.module";
import { StaffModule } from "@/staff/staff.module";
import { BrandingModule } from "@/branding/branding.module";
import { SubscriptionModule } from "@/subscription/subscription.module";
import { EventsModule } from "@/events/events.module";
import { TenantService } from "@/tenants/services/tenant.service";
import { TenantOrganizationService } from "@/tenants/services/tenant-organization.service";
import { ProvisioningCompensatorService } from "@/tenants/services/provisioning-compensator.service";
import { AuthUsersClient } from "@/integrations/auth-users.client";
import { OrganizationServiceClient } from "@/integrations/organization-service.client";
import { UserRoleClient } from "@/integrations/user-role.client";
import { AuditLogClient } from "@/integrations/audit-log.client";
import { BillingServiceClient } from "@/integrations/billing-service.client";
import { TenantDomainRepository } from "@/tenant-domains/tenant-domain.repository";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    EventsModule,
    LocationsModule,
    StaffModule,
    BrandingModule,
    SubscriptionModule,
  ],
  controllers: [TenantsController, SuperAdminTenantController, SuperAdminProvisioningController],
  providers: [
    TenantsService,
    TenantsRepository,
    CreateTenantCommand,
    ProvisionTenantCommand,
    ProvisionFullCommand,
    UpdateTenantCommand,
    AddLocationCommand,
    UpdateLocationCommand,
    AddStaffCommand,
    UpdateStaffRoleCommand,
    JwtStrategy,
    JwtGuard,
    TenantMatchGuard,
    TenantService,
    TenantOrganizationService,
    ProvisioningCompensatorService,
    AuthUsersClient,
    OrganizationServiceClient,
    UserRoleClient,
    AuditLogClient,
    BillingServiceClient,
    TenantDomainRepository,
  ],
  exports: [TenantsService, TenantsRepository],
})
export class TenantsModule {}
