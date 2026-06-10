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
import { MedicalRecordsModule } from "@/medical-records/medical-records.module";
import { EventsModule } from "@/events/events.module";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" }), EventsModule, MedicalRecordsModule],
  controllers: [PatientsController],
  providers: [
    PatientsService,
    PatientsRepository,
    CreatePatientCommand,
    UpdatePatientCommand,
    DeletePatientCommand,
    JwtStrategy,
    JwtGuard,
  ],
  exports: [PatientsService, PatientsRepository],
})
export class PatientsModule {}
