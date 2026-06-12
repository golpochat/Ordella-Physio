import { Injectable } from "@nestjs/common";
import type { PatientInsurance, Prisma } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class PatientInsuranceRepository {
  constructor(private readonly database: DatabaseService) {}

  create(data: Prisma.PatientInsuranceCreateInput): Promise<PatientInsurance> {
    return this.database.patientInsurance.create({ data });
  }

  findByPatientId(patientId: string): Promise<PatientInsurance | null> {
    return this.database.patientInsurance.findUnique({
      where: { patientId },
    });
  }

  upsertForPatient(
    patientId: string,
    data: {
      providerName: string;
      policyNumber: string;
      expiryDate: Date;
      notes?: string | null;
    },
  ): Promise<PatientInsurance> {
    return this.database.patientInsurance.upsert({
      where: { patientId },
      create: {
        patient: { connect: { id: patientId } },
        providerName: data.providerName,
        policyNumber: data.policyNumber,
        expiryDate: data.expiryDate,
        notes: data.notes ?? null,
      },
      update: {
        providerName: data.providerName,
        policyNumber: data.policyNumber,
        expiryDate: data.expiryDate,
        notes: data.notes ?? null,
      },
    });
  }
}
