import { Injectable } from "@nestjs/common";
import type { Appointment } from "@/generated/prisma";
import type { AuthenticatedAppointmentUser } from "@/appointments/strategies/jwt.strategy";
import { AppointmentsRepository } from "@/appointments/appointments.repository";
import { AvailabilityRepository } from "@/availability/availability.repository";
import { AppointmentEventPublisher } from "@/events/appointment-event.publisher";
import { AppointmentReminderService } from "@/services/appointment-reminder.service";
import { PatientServiceClient } from "@/integrations/patient-service.client";
import { StaffServiceClient } from "@/integrations/staff-service.client";
import { TenantServiceClient } from "@/integrations/tenant-service.client";
import { toAppointmentResponse } from "@/appointments/appointments.mapper";
import { checkStaffAvailability } from "@/utils/availability-checker";
import {
  appointmentNotFoundError,
  appointmentTenantMismatchError,
  appointmentTenantRequiredError,
  appointmentValidationError,
  invalidLocationError,
  patientAlreadyBookedError,
  patientNotFoundForTenantError,
  staffNotAvailableError,
  staffNotFoundForTenantError,
} from "@/utils/appointment-errors";
import type { AppointmentType } from "@/models/Appointment";
import {
  validateUpdateAppointment,
  type NormalizedUpdateAppointmentPayload,
} from "@/validators/appointment.validator";
import { AuditLogClient } from "@/integrations/audit-log.client";

type ResolvedAppointmentFields = {
  patientId: string;
  staffId: string;
  locationId: string | null;
  appointmentType: AppointmentType;
  startTime: Date;
  endTime: Date;
  notes: string | null;
};

@Injectable()
export class AppointmentUpdateService {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly availabilityRepository: AvailabilityRepository,
    private readonly patientServiceClient: PatientServiceClient,
    private readonly staffServiceClient: StaffServiceClient,
    private readonly tenantServiceClient: TenantServiceClient,
    private readonly eventPublisher: AppointmentEventPublisher,
    private readonly appointmentReminderService: AppointmentReminderService,
    private readonly auditLogClient: AuditLogClient,
  ) {}

  async updateAppointment(
    appointmentId: string,
    payload: unknown,
    updatedByUser: AuthenticatedAppointmentUser,
  ) {
    const tenantId = updatedByUser.tenantId?.trim();
    if (!tenantId) {
      throw appointmentTenantRequiredError();
    }

    const existing = await this.appointmentsRepository.findByIdGlobal(appointmentId);
    if (!existing) {
      throw appointmentNotFoundError();
    }

    if (existing.tenantId !== tenantId) {
      throw appointmentTenantMismatchError();
    }

    const validation = validateUpdateAppointment(payload);
    if (!validation.valid) {
      throw appointmentValidationError(validation.fields);
    }

    const normalized = validation.payload;
    const resolved = this.resolveFields(existing, normalized);

    if (resolved.appointmentType === "IN_PERSON" && !resolved.locationId) {
      throw appointmentValidationError([
        { field: "locationId", message: "Location is required for in-person appointments." },
      ]);
    }

    if (resolved.endTime.getTime() <= resolved.startTime.getTime()) {
      throw appointmentValidationError([
        { field: "endTime", message: "End time must be after start time." },
      ]);
    }

    if (normalized.patientId !== undefined && normalized.patientId !== existing.patientId) {
      const patient = await this.patientServiceClient.getPatientForTenant(
        tenantId,
        resolved.patientId,
      );
      if (!patient || patient.tenantId !== tenantId) {
        throw patientNotFoundForTenantError();
      }
    }

    if (normalized.staffId !== undefined && normalized.staffId !== existing.therapistId) {
      const staff = await this.staffServiceClient.getStaffForTenant(tenantId, resolved.staffId);
      if (!staff || staff.tenantId !== tenantId) {
        throw staffNotFoundForTenantError();
      }
    }

    const locationChanged =
      normalized.locationId !== undefined || normalized.appointmentType !== undefined;
    if (locationChanged && resolved.appointmentType === "IN_PERSON" && resolved.locationId) {
      const location = await this.tenantServiceClient.getLocation(resolved.locationId);
      if (!location || location.tenantId !== tenantId) {
        throw invalidLocationError();
      }
    }

    const scheduleChanged =
      normalized.startTime !== undefined ||
      normalized.endTime !== undefined ||
      normalized.staffId !== undefined;

    const patientScheduleChanged =
      normalized.startTime !== undefined ||
      normalized.endTime !== undefined ||
      normalized.patientId !== undefined;

    if (scheduleChanged) {
      const staffSummary = await this.staffServiceClient.getStaffForTenant(tenantId, resolved.staffId);
      if (!staffSummary || staffSummary.tenantId !== tenantId) {
        throw staffNotFoundForTenantError();
      }

      const [staffOverlaps, availabilityRecords] = await Promise.all([
        this.appointmentsRepository.findOverlapping(
          tenantId,
          resolved.staffId,
          resolved.startTime,
          resolved.endTime,
          appointmentId,
        ),
        this.availabilityRepository.findByTherapist(tenantId, resolved.staffId),
      ]);

      const staffAvailable = checkStaffAvailability(
        resolved.staffId,
        resolved.startTime,
        resolved.endTime,
        {
          staffStatus: staffSummary.status,
          availabilityRecords,
          weeklySchedule: staffSummary.weeklySchedule,
          overlappingAppointments: staffOverlaps.map((item) => ({
            startTime: item.startTime,
            endTime: item.endTime,
          })),
        },
      );

      if (!staffAvailable) {
        throw staffNotAvailableError();
      }
    }

    if (patientScheduleChanged) {
      const patientOverlaps = await this.appointmentsRepository.findPatientOverlapping(
        tenantId,
        resolved.patientId,
        resolved.startTime,
        resolved.endTime,
        appointmentId,
      );

      if (patientOverlaps.length > 0) {
        throw patientAlreadyBookedError();
      }
    }

    const startTimeChanged = existing.startTime.getTime() !== resolved.startTime.getTime();

    const appointment = await this.appointmentsRepository.update(tenantId, appointmentId, {
      patientId: resolved.patientId,
      therapistId: resolved.staffId,
      locationId: resolved.appointmentType === "TELEMEDICINE" ? null : resolved.locationId,
      startTime: resolved.startTime,
      endTime: resolved.endTime,
      type: resolved.appointmentType,
      notes: resolved.notes,
    });

    if (startTimeChanged) {
      await this.appointmentReminderService.rescheduleRemindersForAppointment(
        tenantId,
        appointmentId,
        resolved.startTime,
      );
    }

    await this.eventPublisher.publishAppointmentUpdated(
      {
        tenantId,
        appointmentId: appointment.id,
        patientId: appointment.patientId,
        therapistId: appointment.therapistId,
        changes: normalized as Record<string, unknown>,
        updatedAt: appointment.updatedAt.toISOString(),
      },
      undefined,
    );

    void this.auditLogClient.logAction({
      tenantId,
      actorUserId: updatedByUser.userId,
      actorRole: updatedByUser.role,
      entityType: "APPOINTMENT",
      entityId: appointment.id,
      action: "UPDATE",
      metadata: {
        appointmentId: appointment.id,
        changedFields: Object.keys(normalized),
      },
    });

    return {
      appointment: toAppointmentResponse(appointment),
      message: "Appointment updated successfully.",
    };
  }

  private resolveFields(
    existing: Appointment,
    normalized: NormalizedUpdateAppointmentPayload,
  ): ResolvedAppointmentFields {
    const appointmentType = (normalized.appointmentType ??
      existing.type) as AppointmentType;
    const locationId =
      normalized.locationId !== undefined
        ? normalized.locationId
        : appointmentType === "TELEMEDICINE"
          ? null
          : existing.locationId;

    return {
      patientId: normalized.patientId ?? existing.patientId,
      staffId: normalized.staffId ?? existing.therapistId,
      locationId,
      appointmentType,
      startTime: normalized.startTime ?? existing.startTime,
      endTime: normalized.endTime ?? existing.endTime,
      notes: normalized.notes !== undefined ? normalized.notes : existing.notes,
    };
  }
}
