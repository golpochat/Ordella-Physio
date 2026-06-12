import { Injectable } from "@nestjs/common";
import type { PatientAttachment, Prisma } from "@/generated/prisma";
import { buildSoftDeleteFilter } from "@ordella/database";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class PatientAttachmentRepository {
  constructor(private readonly database: DatabaseService) {}

  create(data: Prisma.PatientAttachmentCreateInput): Promise<PatientAttachment> {
    return this.database.patientAttachment.create({ data });
  }

  findById(attachmentId: string): Promise<PatientAttachment | null> {
    return this.database.patientAttachment.findFirst({
      where: { id: attachmentId },
    });
  }

  findByIdForPatient(
    attachmentId: string,
    patientId: string,
    tenantId: string,
  ): Promise<PatientAttachment | null> {
    return this.database.patientAttachment.findFirst({
      where: {
        id: attachmentId,
        patientId,
        tenantId,
        patient: buildSoftDeleteFilter(),
      },
    });
  }

  listByPatient(patientId: string, tenantId: string): Promise<PatientAttachment[]> {
    return this.database.patientAttachment.findMany({
      where: {
        patientId,
        tenantId,
        patient: buildSoftDeleteFilter(),
      },
      orderBy: { createdAt: "desc" },
    });
  }

  delete(attachmentId: string): Promise<PatientAttachment> {
    return this.database.patientAttachment.delete({
      where: { id: attachmentId },
    });
  }
}
