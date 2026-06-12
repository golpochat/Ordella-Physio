import { Module } from "@nestjs/common";
import { AppointmentServiceClient } from "@/integrations/appointment-service.client";
import { BillingServiceClient } from "@/integrations/billing-service.client";
import { PatientServiceClient } from "@/integrations/patient-service.client";
import { StaffServiceClient } from "@/integrations/staff-service.client";

@Module({
  providers: [
    PatientServiceClient,
    AppointmentServiceClient,
    BillingServiceClient,
    StaffServiceClient,
  ],
  exports: [
    PatientServiceClient,
    AppointmentServiceClient,
    BillingServiceClient,
    StaffServiceClient,
  ],
})
export class IntegrationsModule {}
