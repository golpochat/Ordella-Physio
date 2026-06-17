import { Injectable } from "@nestjs/common";
import type { FulfillmentStatus, PrescriptionStatus, Prisma } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

export type CreatePrescriptionInput = {
  tenantId: string;
  patientId: string;
  therapistId: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
};

export type UpdatePrescriptionInput = Partial<
  Omit<CreatePrescriptionInput, "tenantId" | "patientId" | "therapistId">
>;

@Injectable()
export class PrescriptionsRepository {
  constructor(private readonly database: DatabaseService) {}

  create(data: CreatePrescriptionInput) {
    return this.database.prescription.create({
      data: {
        ...data,
        notes: data.notes ?? "",
        fulfillment: { create: {} },
      },
      include: { fulfillment: true },
    });
  }

  findById(tenantId: string, id: string) {
    return this.database.prescription.findFirst({
      where: { id, tenantId },
      include: { fulfillment: true },
    });
  }

  list(tenantId: string, filters: { patientId?: string; status?: PrescriptionStatus }) {
    const where: Prisma.PrescriptionWhereInput = { tenantId };
    if (filters.patientId) {
      where.patientId = filters.patientId;
    }
    if (filters.status) {
      where.status = filters.status;
    }

    return this.database.prescription.findMany({
      where,
      include: { fulfillment: true },
      orderBy: { createdAt: "desc" },
    });
  }

  update(tenantId: string, id: string, data: Prisma.PrescriptionUpdateInput) {
    return this.database.prescription.updateMany({
      where: { id, tenantId },
      data,
    });
  }

  findByIdOrThrow(tenantId: string, id: string) {
    return this.database.prescription.findFirstOrThrow({
      where: { id, tenantId },
      include: { fulfillment: true },
    });
  }
}

@Injectable()
export class FulfillmentRepository {
  constructor(private readonly database: DatabaseService) {}

  findByPrescriptionId(prescriptionId: string) {
    return this.database.pharmacyFulfillment.findUnique({
      where: { prescriptionId },
    });
  }

  updateByPrescriptionId(
    prescriptionId: string,
    data: {
      status?: FulfillmentStatus;
      filledBy?: string | null;
      filledAt?: Date | null;
      notes?: string;
    },
  ) {
    return this.database.pharmacyFulfillment.update({
      where: { prescriptionId },
      data,
    });
  }
}

@Injectable()
export class PharmacyAuditRepository {
  constructor(private readonly database: DatabaseService) {}

  create(input: {
    tenantId: string;
    prescriptionId: string;
    actorId: string;
    action: string;
    payload?: Record<string, unknown>;
  }) {
    return this.database.pharmacyAuditLog.create({
      data: {
        tenantId: input.tenantId,
        prescriptionId: input.prescriptionId,
        actorId: input.actorId,
        action: input.action,
        payload: (input.payload ?? {}) as Prisma.InputJsonValue,
      },
    });
  }

  listByPrescription(tenantId: string, prescriptionId: string) {
    return this.database.pharmacyAuditLog.findMany({
      where: { tenantId, prescriptionId },
      orderBy: { createdAt: "desc" },
    });
  }
}
