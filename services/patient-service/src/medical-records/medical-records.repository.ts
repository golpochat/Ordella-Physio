import { Injectable } from "@nestjs/common";
import type { MedicalRecord, Prisma } from "@/generated/prisma";
import { TenantRepository } from "@ordella/database";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class MedicalRecordsRepository {
  constructor(private readonly database: DatabaseService) {}

  private forTenant(tenantId: string) {
    return new TenantRepository<
      MedicalRecord,
      Prisma.MedicalRecordCreateInput,
      Prisma.MedicalRecordUpdateInput
    >(this.database.medicalRecord as never, { tenantId });
  }

  createForPatient(tenantId: string, patientId: string) {
    return this.forTenant(tenantId).create({
      patient: { connect: { id: patientId } },
    } as Prisma.MedicalRecordCreateInput);
  }

  findByPatientId(tenantId: string, patientId: string) {
    return this.database.medicalRecord.findFirst({
      where: { tenantId, patientId },
    });
  }

  updateByPatientId(tenantId: string, patientId: string, data: Prisma.MedicalRecordUpdateInput) {
    return this.database.medicalRecord.update({
      where: { patientId },
      data,
    });
  }
}
