import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { PatientsController } from "@/patients/patients.controller";
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
import { PatientInsuranceRepository } from "@/repositories/patient-insurance.repository";
import { MedicalRecordsModule } from "@/medical-records/medical-records.module";
import { EventsModule } from "@/events/events.module";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" }), EventsModule, MedicalRecordsModule],
  controllers: [PatientsController],
  providers: [
    PatientsService,
    PatientsRepository,
    PatientInsuranceRepository,
    AppointmentServiceClient,
    CreatePatientCommand,
    UpdatePatientCommand,
    DeletePatientCommand,
    JwtStrategy,
    JwtGuard,
    PatientListGuard,
    PatientManageGuard,
    PatientUpdateManageGuard,
  ],
  exports: [PatientsService, PatientsRepository],
})
export class PatientsModule {}
