import { buildPaginatedResponse } from "../../utils/pagination";
import { PatientEmailConflictError, PatientInactiveError } from "./patients.errors";
import { mapPatientProfile } from "./patients.mapper";
import {
  createPatientRecord,
  deactivatePatientRecord,
  findPatientByEmail,
  findPatientByIdOrThrow,
  findPatientProfile,
  findPatients,
  updatePatientRecord,
} from "./patients.repository";
import type {
  CreatePatientInput,
  ListPatientsFilters,
  PatientProfileOptions,
  UpdatePatientInput,
} from "./patients.types";

async function assertUniqueEmail(
  tenantId: string,
  email: string | undefined,
  excludeId?: string,
): Promise<void> {
  if (!email) {
    return;
  }

  const existing = await findPatientByEmail(tenantId, email, excludeId);
  if (existing) {
    throw new PatientEmailConflictError(email);
  }
}

export async function listPatients(tenantId: string, filters: ListPatientsFilters) {
  const { items, total } = await findPatients(tenantId, filters);
  return buildPaginatedResponse(items, total, filters);
}

export async function getPatient(tenantId: string, id: string) {
  return findPatientByIdOrThrow(tenantId, id);
}

export async function getPatientProfile(
  tenantId: string,
  id: string,
  options: PatientProfileOptions = {},
) {
  const patient = await findPatientByIdOrThrow(tenantId, id);
  if (!patient.isActive) {
    throw new PatientInactiveError();
  }

  const record = await findPatientProfile(tenantId, id, {
    appointmentLimit: options.appointmentLimit ?? 25,
    invoiceLimit: options.invoiceLimit ?? 25,
    noteLimit: options.noteLimit ?? 25,
    paymentLimit: options.paymentLimit ?? 50,
  });

  return mapPatientProfile(record);
}

export async function createPatient(tenantId: string, userId: string, data: CreatePatientInput) {
  await assertUniqueEmail(tenantId, data.email);

  const patient = await createPatientRecord(tenantId, data);

  return patient;
}

export async function updatePatient(
  tenantId: string,
  userId: string,
  id: string,
  data: UpdatePatientInput,
) {
  await assertUniqueEmail(tenantId, data.email, id);

  const patient = await updatePatientRecord(tenantId, id, data);

  return patient;
}

export async function deletePatient(tenantId: string, userId: string, id: string) {
  const patient = await deactivatePatientRecord(tenantId, id);

  return patient;
}
