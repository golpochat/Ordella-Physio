import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TenantsController } from "@/tenants/tenants.controller";
import { TenantsService } from "@/tenants/tenants.service";
import { TenantsRepository } from "@/tenants/tenants.repository";
import { CreateTenantCommand } from "@/tenants/commands/create-tenant.command";
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

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    EventsModule,
    LocationsModule,
    StaffModule,
    BrandingModule,
    SubscriptionModule,
  ],
  controllers: [TenantsController],
  providers: [
    TenantsService,
    TenantsRepository,
    CreateTenantCommand,
    UpdateTenantCommand,
    AddLocationCommand,
    UpdateLocationCommand,
    AddStaffCommand,
    UpdateStaffRoleCommand,
    JwtStrategy,
    JwtGuard,
    TenantMatchGuard,
  ],
  exports: [TenantsService, TenantsRepository],
})
export class TenantsModule {}
