import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { StaffConfigController } from "@/controllers/staff-config.controller";
import { StaffController } from "@/controllers/staff.controller";
import { InternalStaffController } from "@/controllers/internal-staff.controller";
import { StaffConfigService } from "@/services/staff-config.service";
import { StaffService } from "@/services/staff.service";
import { StaffConfigRepository } from "@/repositories/staff-config.repository";
import { StaffRepository } from "@/repositories/staff.repository";
import { JwtStrategy } from "@/strategies/jwt.strategy";
import { JwtGuard } from "@/guards/jwt.guard";
import { StaffManageGuard } from "@/guards/staff-manage.guard";
import { AppointmentServiceClient } from "@/integrations/appointment-service.client";
import { SubscriptionBillingClient } from "@/integrations/subscription-billing.client";
import { TenantServiceClient } from "@/integrations/tenant-service.client";
import { UserRoleServiceClient } from "@/integrations/user-role-service.client";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  controllers: [StaffConfigController, StaffController, InternalStaffController],
  providers: [
    StaffService,
    StaffConfigService,
    StaffRepository,
    StaffConfigRepository,
    TenantServiceClient,
    UserRoleServiceClient,
    AppointmentServiceClient,
    SubscriptionBillingClient,
    JwtStrategy,
    JwtGuard,
    StaffManageGuard,
  ],
  exports: [StaffService],
})
export class StaffModule {}
