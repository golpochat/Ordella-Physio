import type { AppointmentStatus, Prisma } from "@prisma/client";
import type { PaginationInput } from "../../utils/pagination";

export type AppointmentSortField = "startTime" | "createdAt" | "status";

export type ListAppointmentsFilters = PaginationInput & {
  search?: string;
  patientId?: string;
  therapistId?: string;
  status?: AppointmentStatus;
  startFrom?: Date;
  startTo?: Date;
  sortBy?: AppointmentSortField;
  sortOrder?: "asc" | "desc";
};

export type CreateAppointmentInput = {
  patientId: string;
  therapistId: string;
  startTime: Date;
  endTime: Date;
  type: string;
  notes?: string;
};

export type UpdateAppointmentInput = Partial<CreateAppointmentInput>;

export type AvailabilityCheckInput = {
  therapistId: string;
  startTime: Date;
  endTime: Date;
  excludeAppointmentId?: string;
  patientId?: string;
};

export type AvailabilityCheckResult = {
  available: boolean;
  reasons: string[];
  therapistConflict: boolean;
  patientConflict: boolean;
  outsideSchedule: boolean;
  blockedSlot: boolean;
};

export type AppointmentActor = {
  userId: string;
  roles: string[];
};

export type AppointmentWithRelations = Prisma.AppointmentGetPayload<{
  include: {
    patient: true;
    therapist: { include: { user: true } };
  };
}>;
