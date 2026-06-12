import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { PatientNoteController } from "@/patient-notes/patient-note.controller";
import { PatientNoteService } from "@/patient-notes/patient-note.service";
import { PatientNotesGuard } from "@/patient-notes/guards/patient-notes.guard";
import { PatientsRepository } from "@/patients/patients.repository";
import { PatientNoteRepository } from "@/repositories/patient-note.repository";
import { JwtGuard } from "@/patients/guards/jwt.guard";
import { JwtStrategy } from "@/patients/strategies/jwt.strategy";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  controllers: [PatientNoteController],
  providers: [
    PatientNoteService,
    PatientNoteRepository,
    PatientsRepository,
    PatientNotesGuard,
    JwtStrategy,
    JwtGuard,
  ],
  exports: [PatientNoteService],
})
export class PatientNotesModule {}
