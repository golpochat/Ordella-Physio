export type PrescriptionStatus = "DRAFT" | "ISSUED" | "DISPENSED" | "CANCELLED";
export type FulfillmentStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED";

export type PharmacyFulfillment = {
  id: string;
  prescriptionId: string;
  status: FulfillmentStatus;
  filledBy: string | null;
  filledAt: string | null;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type ClinicPrescription = {
  id: string;
  tenantId: string;
  patientId: string;
  therapistId: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes: string;
  status: PrescriptionStatus;
  createdAt: string;
  updatedAt: string;
  fulfillment?: PharmacyFulfillment | null;
};

export type ClinicPrescriptionAuditLog = {
  id: string;
  tenantId: string;
  prescriptionId: string;
  actorId: string;
  action: string;
  payload: Record<string, unknown> | null;
  createdAt: string;
};

export type CreateClinicPrescriptionPayload = {
  patientId: string;
  therapistId: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
};

export type UpdateClinicPrescriptionPayload = Partial<
  Omit<CreateClinicPrescriptionPayload, "patientId" | "therapistId">
>;

export type FulfillmentActionPayload = {
  filledBy?: string;
  notes?: string;
};
