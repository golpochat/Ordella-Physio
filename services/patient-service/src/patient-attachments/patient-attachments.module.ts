import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { PatientAttachmentController } from "@/patient-attachments/patient-attachment.controller";
import { PatientAttachmentService } from "@/patient-attachments/patient-attachment.service";
import { PatientAttachmentsGuard } from "@/patient-attachments/guards/patient-attachments.guard";
import { PatientsRepository } from "@/patients/patients.repository";
import { PatientAttachmentRepository } from "@/repositories/patient-attachment.repository";
import { JwtGuard } from "@/patients/guards/jwt.guard";
import { JwtStrategy } from "@/patients/strategies/jwt.strategy";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  controllers: [PatientAttachmentController],
  providers: [
    PatientAttachmentService,
    PatientAttachmentRepository,
    PatientsRepository,
    PatientAttachmentsGuard,
    JwtStrategy,
    JwtGuard,
  ],
  exports: [PatientAttachmentService],
})
export class PatientAttachmentsModule {}
