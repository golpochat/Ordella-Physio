import type { Request } from "express";
import { ForbiddenError } from "../../utils/api-error";
import type { AppointmentActor, AppointmentWithRelations } from "./appointments.types";
import { AppointmentAccessError } from "./appointments.errors";
import { findTherapistByUserId } from "./appointments.repository";

export function isAdminOrStaff(actor: AppointmentActor): boolean {
  const roles = new Set(actor.roles);
  return roles.has("ADMIN") || roles.has("STAFF");
}

export function isClinician(actor: AppointmentActor): boolean {
  return actor.roles.includes("THERAPIST");
}

export async function resolveClinicianTherapistId(tenantId: string, userId: string): Promise<string | null> {
  const therapist = await findTherapistByUserId(tenantId, userId);
  return therapist?.id ?? null;
}

export function assertCanReadAppointments(actor: AppointmentActor): void {
  if (actor.roles.includes("PATIENT")) {
    throw new ForbiddenError("Access denied for this role");
  }
}

export async function assertCanWriteAppointment(
  tenantId: string,
  actor: AppointmentActor,
  appointment?: Pick<AppointmentWithRelations, "therapistId"> & {
    therapist?: { userId: string };
  },
  targetTherapistId?: string,
): Promise<void> {
  if (actor.roles.includes("PATIENT")) {
    throw new AppointmentAccessError("Patients cannot manage appointments");
  }

  if (isAdminOrStaff(actor)) {
    return;
  }

  if (!isClinician(actor)) {
    throw new AppointmentAccessError("Insufficient role to manage appointments");
  }

  const ownTherapistId = await resolveClinicianTherapistId(tenantId, actor.userId);
  if (!ownTherapistId) {
    throw new AppointmentAccessError("Clinician profile not found");
  }

  if (appointment) {
    const appointmentTherapistUserId = appointment.therapist?.userId;
    if (appointment.therapistId !== ownTherapistId && appointmentTherapistUserId !== actor.userId) {
      throw new AppointmentAccessError();
    }
    return;
  }

  if (targetTherapistId && targetTherapistId !== ownTherapistId) {
    throw new AppointmentAccessError("Clinicians can only book appointments for themselves");
  }
}

export async function assertCanReadAppointment(
  tenantId: string,
  actor: AppointmentActor,
  appointment: Pick<AppointmentWithRelations, "therapistId"> & {
    therapist?: { userId: string };
  },
): Promise<void> {
  if (actor.roles.includes("PATIENT")) {
    throw new AppointmentAccessError("Patients cannot view clinic appointments");
  }

  if (isAdminOrStaff(actor)) {
    return;
  }

  if (isClinician(actor)) {
    const ownTherapistId = await resolveClinicianTherapistId(tenantId, actor.userId);
    if (!ownTherapistId || appointment.therapistId !== ownTherapistId) {
      throw new AppointmentAccessError();
    }
    return;
  }

  throw new AppointmentAccessError("Insufficient role to view appointments");
}

export function getActorFromRequest(req: Request): AppointmentActor {
  if (!req.user) {
    throw new ForbiddenError("Authentication required");
  }

  return {
    userId: req.user.id,
    roles: req.user.roles,
  };
}
