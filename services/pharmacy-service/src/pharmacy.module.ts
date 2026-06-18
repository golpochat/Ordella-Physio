import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "@/strategies/jwt.strategy";
import { DatabaseModule } from "@/database/database.module";
import { PrescriptionsController } from "@/controllers/prescriptions.controller";
import { FulfillmentController } from "@/controllers/fulfillment.controller";
import { PharmacyHealthController } from "@/controllers/pharmacy-health.controller";
import { PrescriptionsService } from "@/services/prescriptions.service";
import { FulfillmentService } from "@/services/fulfillment.service";
import {
  FulfillmentRepository,
  PharmacyAuditRepository,
  PrescriptionsRepository,
} from "@/repositories/pharmacy.repository";
import { PatientServiceClient } from "@/integrations/patient-service.client";
import { StaffServiceClient } from "@/integrations/staff-service.client";
import { TherapistServiceClient } from "@/integrations/therapist-service.client";
import { AuditLogClient } from "@/integrations/audit-log.client";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" }), DatabaseModule],
  controllers: [PharmacyHealthController, PrescriptionsController, FulfillmentController],
  providers: [
    JwtStrategy,
    PrescriptionsService,
    FulfillmentService,
    PrescriptionsRepository,
    FulfillmentRepository,
    PharmacyAuditRepository,
    PatientServiceClient,
    TherapistServiceClient,
    StaffServiceClient,
    AuditLogClient,
  ],
})
export class PharmacyModule {}
