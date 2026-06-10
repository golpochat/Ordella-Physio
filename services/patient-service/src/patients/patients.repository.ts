import { Injectable } from "@nestjs/common";
import type { Patient, Prisma } from "@/generated/prisma";
import { TenantRepository, buildSoftDeleteFilter } from "@ordella/database";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class PatientsRepository {
  constructor(private readonly database: DatabaseService) {}

  private forTenant(tenantId: string) {
    return new TenantRepository<Patient, Prisma.PatientCreateInput, Prisma.PatientUpdateInput>(
      this.database.patient as never,
      { tenantId },
    );
  }

  create(tenantId: string, data: Omit<Prisma.PatientCreateInput, "tenantId">) {
    return this.forTenant(tenantId).create(data as Prisma.PatientCreateInput);
  }

  findById(tenantId: string, patientId: string) {
    return this.forTenant(tenantId).findById(patientId);
  }

  search(
    tenantId: string,
    where: Prisma.PatientWhereInput,
    options: { skip: number; take: number },
  ) {
    return this.database.patient.findMany({
      where: {
        ...where,
        tenantId,
        ...buildSoftDeleteFilter(),
      },
      skip: options.skip,
      take: options.take,
      orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
    });
  }

  count(tenantId: string, where: Prisma.PatientWhereInput) {
    return this.database.patient.count({
      where: {
        ...where,
        tenantId,
        ...buildSoftDeleteFilter(),
      },
    });
  }

  update(tenantId: string, patientId: string, data: Prisma.PatientUpdateInput) {
    return this.forTenant(tenantId).update(patientId, data);
  }

  softDelete(tenantId: string, patientId: string) {
    return this.forTenant(tenantId).softDelete(patientId);
  }
}
