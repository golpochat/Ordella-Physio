import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { PatientsController } from "@/patients/patients.controller";
import { InternalPatientController } from "@/patients/internal-patient.controller";
import { PatientsService } from "@/patients/patients.service";
import { PatientsRepository } from "@/patients/patients.repository";
import { CreatePatientCommand } from "@/patients/commands/create-patient.command";
import { UpdatePatientCommand } from "@/patients/commands/update-patient.command";
import { DeletePatientCommand } from "@/patients/commands/delete-patient.command";
import { JwtStrategy } from "@/patients/strategies/jwt.strategy";
import { JwtGuard } from "@/patients/guards/jwt.guard";
import { PatientListGuard } from "@/patients/guards/patient-list.guard";
import { PatientManageGuard } from "@/patients/guards/patient-manage.guard";
import { PatientUpdateManageGuard } from "@/patients/guards/patient-update-manage.guard";
import { AppointmentServiceClient } from "@/integrations/appointment-service.client";
import { AuditLogClient } from "@/integrations/audit-log.client";
import { SubscriptionBillingClient } from "@/integrations/subscription-billing.client";
import { FileStorageClient } from "@/integrations/file-storage.client";
import { PatientInsuranceRepository } from "@/repositories/patient-insurance.repository";
import { MedicalRecordsModule } from "@/medical-records/medical-records.module";
import { EventsModule } from "@/events/events.module";
import { PatientReportService } from "@/services/patient-report.service";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" }), EventsModule, MedicalRecordsModule],
  controllers: [PatientsController, InternalPatientController],
  providers: [
    PatientsService,
    PatientsRepository,
    PatientInsuranceRepository,
    AppointmentServiceClient,
    AuditLogClient,
    SubscriptionBillingClient,
    FileStorageClient,
    CreatePatientCommand,
    UpdatePatientCommand,
    DeletePatientCommand,
    JwtStrategy,
    JwtGuard,
    PatientListGuard,
    PatientManageGuard,
    PatientUpdateManageGuard,
    PatientReportService,
  ],
  exports: [PatientsService, PatientsRepository],
})
export class PatientsModule {}
