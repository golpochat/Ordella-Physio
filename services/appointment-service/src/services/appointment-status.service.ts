import { Injectable } from "@nestjs/common";
import type { Appointment } from "@/generated/prisma";
import type { AuthenticatedAppointmentUser } from "@/appointments/strategies/jwt.strategy";
import { AppointmentsRepository } from "@/appointments/appointments.repository";
import { toAppointmentResponse } from "@/appointments/appointments.mapper";
import { AppointmentEventPublisher } from "@/events/appointment-event.publisher";
import { AppointmentReminderService } from "@/services/appointment-reminder.service";
import {
  appointmentAlreadyCancelledError,
  appointmentAlreadyCompletedError,
  appointmentAlreadyNoShowError,
  appointmentNotFoundError,
  appointmentTenantMismatchError,
  appointmentTenantRequiredError,
  cannotCancelCompletedAppointmentError,
  cannotCompleteFutureAppointmentError,
} from "@/utils/appointment-errors";
import { AuditLogClient } from "@/integrations/audit-log.client";

@Injectable()
export class AppointmentStatusService {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly eventPublisher: AppointmentEventPublisher,
    private readonly appointmentReminderService: AppointmentReminderService,
    private readonly auditLogClient: AuditLogClient,
  ) {}

  async cancelAppointment(appointmentId: string, performedByUser: AuthenticatedAppointmentUser) {
    const { tenantId, existing } = await this.loadAppointment(appointmentId, performedByUser);

    if (existing.status === "CANCELLED") {
      throw appointmentAlreadyCancelledError();
    }

    if (existing.status === "COMPLETED") {
      throw cannotCancelCompletedAppointmentError();
    }

    const appointment = await this.appointmentsRepository.update(tenantId, appointmentId, {
      status: "CANCELLED",
    });

    await this.appointmentReminderService.cancelScheduledRemindersForAppointment(
      tenantId,
      appointmentId,
    );

    await this.eventPublisher.publishAppointmentCancelled(
      {
        tenantId,
        appointmentId: appointment.id,
        patientId: appointment.patientId,
        therapistId: appointment.therapistId,
        reason: appointment.cancellationReason ?? undefined,
        cancelledAt: appointment.updatedAt.toISOString(),
      },
      undefined,
    );

    void this.auditLogClient.logAction({
      tenantId,
      actorUserId: performedByUser.userId,
      actorRole: performedByUser.role,
      entityType: "APPOINTMENT",
      entityId: appointment.id,
      action: "STATUS_CHANGE",
      metadata: { from: existing.status, to: "CANCELLED" },
    });

    return {
      appointment: toAppointmentResponse(appointment),
      message: "Appointment cancelled successfully.",
    };
  }

  async completeAppointment(appointmentId: string, performedByUser: AuthenticatedAppointmentUser) {
    const { tenantId, existing } = await this.loadAppointment(appointmentId, performedByUser);

    if (existing.status === "COMPLETED") {
      throw appointmentAlreadyCompletedError();
    }

    if (existing.startTime.getTime() > Date.now()) {
      throw cannotCompleteFutureAppointmentError();
    }

    const appointment = await this.appointmentsRepository.update(tenantId, appointmentId, {
      status: "COMPLETED",
    });

    await this.publishStatusUpdated(tenantId, appointment);

    void this.auditLogClient.logAction({
      tenantId,
      actorUserId: performedByUser.userId,
      actorRole: performedByUser.role,
      entityType: "APPOINTMENT",
      entityId: appointment.id,
      action: "STATUS_CHANGE",
      metadata: { from: existing.status, to: "COMPLETED" },
    });

    return {
      appointment: toAppointmentResponse(appointment),
      message: "Appointment completed successfully.",
    };
  }

  async markNoShow(appointmentId: string, performedByUser: AuthenticatedAppointmentUser) {
    const { tenantId, existing } = await this.loadAppointment(appointmentId, performedByUser);

    if (existing.status === "NO_SHOW") {
      throw appointmentAlreadyNoShowError();
    }

    const appointment = await this.appointmentsRepository.update(tenantId, appointmentId, {
      status: "NO_SHOW",
    });

    await this.publishStatusUpdated(tenantId, appointment);

    void this.auditLogClient.logAction({
      tenantId,
      actorUserId: performedByUser.userId,
      actorRole: performedByUser.role,
      entityType: "APPOINTMENT",
      entityId: appointment.id,
      action: "STATUS_CHANGE",
      metadata: { from: existing.status, to: "NO_SHOW" },
    });

    return {
      appointment: toAppointmentResponse(appointment),
      message: "Appointment marked as no-show.",
    };
  }

  private async loadAppointment(appointmentId: string, performedByUser: AuthenticatedAppointmentUser) {
    const tenantId = performedByUser.tenantId?.trim();
    if (!tenantId) {
      throw appointmentTenantRequiredError(
        "A tenant context is required to modify appointments.",
      );
    }

    const existing = await this.appointmentsRepository.findByIdGlobal(appointmentId);
    if (!existing) {
      throw appointmentNotFoundError();
    }

    if (existing.tenantId !== tenantId) {
      throw appointmentTenantMismatchError();
    }

    return { tenantId, existing };
  }

  private async publishStatusUpdated(tenantId: string, appointment: Appointment) {
    await this.eventPublisher.publishAppointmentUpdated(
      {
        tenantId,
        appointmentId: appointment.id,
        patientId: appointment.patientId,
        therapistId: appointment.therapistId,
        changes: { status: appointment.status },
        updatedAt: appointment.updatedAt.toISOString(),
      },
      undefined,
    );
  }
}
