import type { AppointmentStatus } from "@prisma/client";
import { NotFoundError } from "../../utils/api-error";
import { buildPaginatedResponse } from "../../utils/pagination";
import { ensureAutoInvoiceOnCompletion } from "../billing/billing.service";
import {
  notifyAppointmentCancellation,
  notifyAppointmentConfirmation,
} from "../notifications/notifications.dispatch";
import {
  assertCanReadAppointment,
  assertCanWriteAppointment,
  isAdminOrStaff,
  isClinician,
  resolveClinicianTherapistId,
} from "./appointments.access";
import type { AppointmentActor, AvailabilityCheckInput, CreateAppointmentInput, ListAppointmentsFilters, UpdateAppointmentInput } from "./appointments.types";
import { AppointmentStatusTransitionError, AppointmentTerminalStateError } from "./appointments.errors";
import {
  createAppointmentRecord,
  deleteAppointmentRecord,
  findAppointmentByIdOrThrow,
  findAppointments,
  findPatientById,
  findTherapistById,
  updateAppointmentRecord,
} from "./appointments.repository";
import { assertAppointmentAvailability, checkAppointmentAvailability } from "./appointments.schedule";
import {
  assertValidStatusTransition,
  isTerminalStatus,
  statusTimestampPatch,
} from "./appointments.status";

async function enforceClinicianTherapistId(
  tenantId: string,
  actor: AppointmentActor,
  therapistId: string,
): Promise<string> {
  if (isAdminOrStaff(actor)) {
    return therapistId;
  }

  if (isClinician(actor)) {
    const ownTherapistId = await resolveClinicianTherapistId(tenantId, actor.userId);
    if (!ownTherapistId) {
      throw new NotFoundError("Clinician profile not found");
    }
    return ownTherapistId;
  }

  return therapistId;
}

async function validateReferences(tenantId: string, patientId: string, therapistId: string) {
  const [patient, therapist] = await Promise.all([
    findPatientById(tenantId, patientId),
    findTherapistById(tenantId, therapistId),
  ]);

  if (!patient) throw new NotFoundError("Patient not found");
  if (!therapist) throw new NotFoundError("Therapist not found");

  return { patient, therapist };
}

export async function listAppointments(
  tenantId: string,
  actor: AppointmentActor,
  filters: ListAppointmentsFilters,
) {
  const scopedFilters = { ...filters };

  if (isClinician(actor) && !isAdminOrStaff(actor)) {
    const ownTherapistId = await resolveClinicianTherapistId(tenantId, actor.userId);
    if (ownTherapistId) {
      scopedFilters.therapistId = ownTherapistId;
    }
  }

  const { items, total } = await findAppointments(tenantId, scopedFilters);
  return buildPaginatedResponse(items, total, filters);
}

export async function getAppointment(tenantId: string, actor: AppointmentActor, id: string) {
  const appointment = await findAppointmentByIdOrThrow(tenantId, id);
  await assertCanReadAppointment(tenantId, actor, appointment);
  return appointment;
}

export async function checkAvailability(tenantId: string, input: AvailabilityCheckInput) {
  return checkAppointmentAvailability(tenantId, input);
}

export async function createAppointment(
  tenantId: string,
  actor: AppointmentActor,
  userId: string,
  data: CreateAppointmentInput,
) {
  await assertCanWriteAppointment(tenantId, actor, undefined, data.therapistId);

  const therapistId = await enforceClinicianTherapistId(tenantId, actor, data.therapistId);
  await validateReferences(tenantId, data.patientId, therapistId);

  await assertAppointmentAvailability(tenantId, {
    therapistId,
    patientId: data.patientId,
    startTime: data.startTime,
    endTime: data.endTime,
  });

  const appointment = await createAppointmentRecord(tenantId, { ...data, therapistId });

  notifyAppointmentConfirmation(tenantId, appointment.id, userId);

  return appointment;
}

export async function updateAppointment(
  tenantId: string,
  actor: AppointmentActor,
  userId: string,
  id: string,
  data: UpdateAppointmentInput,
) {
  const existing = await findAppointmentByIdOrThrow(tenantId, id);
  await assertCanWriteAppointment(tenantId, actor, existing);

  if (isTerminalStatus(existing.status)) {
    throw new AppointmentTerminalStateError(existing.status);
  }

  const therapistId = data.therapistId
    ? await enforceClinicianTherapistId(tenantId, actor, data.therapistId)
    : existing.therapistId;
  const patientId = data.patientId ?? existing.patientId;
  const startTime = data.startTime ?? existing.startTime;
  const endTime = data.endTime ?? existing.endTime;

  if (data.patientId || data.therapistId) {
    await validateReferences(tenantId, patientId, therapistId);
  }

  const scheduleChanged =
    therapistId !== existing.therapistId ||
    patientId !== existing.patientId ||
    startTime.getTime() !== existing.startTime.getTime() ||
    endTime.getTime() !== existing.endTime.getTime();

  if (scheduleChanged) {
    await assertAppointmentAvailability(tenantId, {
      therapistId,
      patientId,
      startTime,
      endTime,
      excludeAppointmentId: id,
    });
  }

  const appointment = await updateAppointmentRecord(tenantId, id, {
    ...data,
    therapistId,
    patientId,
    startTime,
    endTime,
  });

  return appointment;
}

export async function transitionAppointmentStatus(
  tenantId: string,
  actor: AppointmentActor,
  userId: string,
  id: string,
  status: AppointmentStatus,
  cancellationReason?: string,
) {
  const existing = await findAppointmentByIdOrThrow(tenantId, id);
  await assertCanWriteAppointment(tenantId, actor, existing);

  if (isTerminalStatus(existing.status) && existing.status !== status) {
    throw new AppointmentTerminalStateError(existing.status);
  }

  assertValidStatusTransition(existing.status, status);

  const appointment = await updateAppointmentRecord(tenantId, id, {
    status,
    ...(status === "CANCELLED" && cancellationReason ? { cancellationReason } : {}),
    ...statusTimestampPatch(status),
  });

  if (status === "COMPLETED") {
    await ensureAutoInvoiceOnCompletion(tenantId, id, userId);
  }

  if (status === "CANCELLED") {
    notifyAppointmentCancellation(tenantId, id, userId);
  }

  return appointment;
}

function nextStatusTowardComplete(current: AppointmentStatus): AppointmentStatus | null {
  if (current === "SCHEDULED") return "CHECKED_IN";
  if (current === "CHECKED_IN") return "IN_PROGRESS";
  if (current === "IN_PROGRESS") return "COMPLETED";
  return null;
}

export async function completeAppointment(
  tenantId: string,
  actor: AppointmentActor,
  userId: string,
  id: string,
) {
  let appointment = await findAppointmentByIdOrThrow(tenantId, id);

  if (appointment.status === "COMPLETED") {
    return appointment;
  }

  if (appointment.status === "CANCELLED") {
    throw new AppointmentTerminalStateError(appointment.status);
  }

  while (appointment.status !== "COMPLETED") {
    const nextStatus = nextStatusTowardComplete(appointment.status);
    if (!nextStatus) {
      throw new AppointmentStatusTransitionError(appointment.status, "COMPLETED");
    }

    appointment = await transitionAppointmentStatus(tenantId, actor, userId, id, nextStatus);
  }

  return appointment;
}

export async function cancelAppointment(
  tenantId: string,
  actor: AppointmentActor,
  userId: string,
  id: string,
  cancellationReason?: string,
) {
  const existing = await findAppointmentByIdOrThrow(tenantId, id);

  if (existing.status === "CANCELLED") {
    return existing;
  }

  return transitionAppointmentStatus(
    tenantId,
    actor,
    userId,
    id,
    "CANCELLED",
    cancellationReason ?? "Appointment cancelled",
  );
}

export async function deleteAppointment(
  tenantId: string,
  actor: AppointmentActor,
  userId: string,
  id: string,
  cancellationReason?: string,
) {
  const existing = await findAppointmentByIdOrThrow(tenantId, id);
  await assertCanWriteAppointment(tenantId, actor, existing);

  if (existing.status === "COMPLETED") {
    throw new AppointmentTerminalStateError(existing.status);
  }

  if (existing.status !== "CANCELLED") {
    return transitionAppointmentStatus(
      tenantId,
      actor,
      userId,
      id,
      "CANCELLED",
      cancellationReason ?? "Appointment deleted",
    );
  }

  await deleteAppointmentRecord(tenantId, id);

  return { id, deleted: true };
}
