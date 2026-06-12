import { Injectable } from "@nestjs/common";
import { randomString } from "@ordella/utils";
import type { AuthenticatedAppointmentUser } from "@/appointments/strategies/jwt.strategy";
import { AppointmentsRepository } from "@/appointments/appointments.repository";
import { AppointmentReminderRepository } from "@/repositories/appointment-reminder.repository";
import { toAppointmentReminderResponse } from "@/utils/appointment-reminder.mapper";
import {
  appointmentNotFoundError,
  appointmentReminderInPastError,
  appointmentReminderNotFoundError,
  appointmentReminderValidationError,
  appointmentTenantMismatchError,
  appointmentTenantRequiredError,
} from "@/utils/appointment-errors";
import {
  validateCreateReminder,
  validateUpdateReminder,
} from "@/validators/appointment-reminder.validator";

@Injectable()
export class AppointmentReminderService {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly appointmentReminderRepository: AppointmentReminderRepository,
  ) {}

  async listReminders(appointmentId: string, requestingUser: AuthenticatedAppointmentUser) {
    const tenantId = this.requireTenantId(requestingUser);
    await this.ensureAppointmentForTenant(tenantId, appointmentId);

    const reminders = await this.appointmentReminderRepository.listByAppointment(
      tenantId,
      appointmentId,
    );

    return reminders.map(toAppointmentReminderResponse);
  }

  async createReminder(
    appointmentId: string,
    payload: unknown,
    createdByUser: AuthenticatedAppointmentUser,
  ) {
    const tenantId = this.requireTenantId(createdByUser);
    const appointment = await this.ensureAppointmentForTenant(tenantId, appointmentId);

    const validation = validateCreateReminder(payload);
    if (!validation.valid) {
      throw appointmentReminderValidationError(validation.fields);
    }

    const scheduledFor = this.computeScheduledFor(
      appointment.startTime,
      validation.payload.offsetMinutes,
    );

    const reminder = await this.appointmentReminderRepository.create(tenantId, {
      id: randomString(24),
      appointmentId: appointment.id,
      patientId: appointment.patientId,
      staffId: validation.payload.staffId ?? null,
      channel: validation.payload.channel,
      offsetMinutes: validation.payload.offsetMinutes,
      status: "SCHEDULED",
      scheduledFor,
    });

    return {
      reminder: toAppointmentReminderResponse(reminder),
      message: "Reminder created successfully.",
    };
  }

  async updateReminder(
    appointmentId: string,
    reminderId: string,
    payload: unknown,
    updatedByUser: AuthenticatedAppointmentUser,
  ) {
    const tenantId = this.requireTenantId(updatedByUser);
    const appointment = await this.ensureAppointmentForTenant(tenantId, appointmentId);

    const existing = await this.appointmentReminderRepository.findByIdGlobal(reminderId);
    if (!existing || existing.appointmentId !== appointmentId) {
      throw appointmentReminderNotFoundError();
    }

    if (existing.tenantId !== tenantId) {
      throw appointmentTenantMismatchError("You cannot modify reminders from another tenant.");
    }

    const validation = validateUpdateReminder(payload);
    if (!validation.valid) {
      throw appointmentReminderValidationError(validation.fields);
    }

    const normalized = validation.payload;
    const updateData: {
      channel?: typeof normalized.channel;
      offsetMinutes?: number;
      status?: "CANCELLED";
      scheduledFor?: Date;
      lastError?: null;
    } = {};

    if (normalized.channel !== undefined) {
      updateData.channel = normalized.channel;
    }

    if (normalized.offsetMinutes !== undefined) {
      updateData.offsetMinutes = normalized.offsetMinutes;
      updateData.scheduledFor = this.computeScheduledFor(
        appointment.startTime,
        normalized.offsetMinutes,
      );
    }

    if (normalized.status === "CANCELLED") {
      updateData.status = "CANCELLED";
    }

    if (updateData.scheduledFor && normalized.status !== "CANCELLED") {
      this.assertScheduledForIsFuture(updateData.scheduledFor);
    }

    const reminder = await this.appointmentReminderRepository.update(tenantId, reminderId, updateData);

    return {
      reminder: toAppointmentReminderResponse(reminder),
      message: "Reminder updated successfully.",
    };
  }

  async cancelScheduledRemindersForAppointment(tenantId: string, appointmentId: string) {
    await this.appointmentReminderRepository.cancelScheduledForAppointment(tenantId, appointmentId);
  }

  async rescheduleRemindersForAppointment(
    tenantId: string,
    appointmentId: string,
    newStartTime: Date,
  ) {
    const reminders = await this.appointmentReminderRepository.findScheduledByAppointment(
      tenantId,
      appointmentId,
    );

    await Promise.all(
      reminders.map(async (reminder) => {
        const scheduledFor = this.computeScheduledFor(newStartTime, reminder.offsetMinutes);

        if (scheduledFor.getTime() <= Date.now()) {
          await this.appointmentReminderRepository.update(tenantId, reminder.id, {
            status: "CANCELLED",
          });
          return;
        }

        await this.appointmentReminderRepository.update(tenantId, reminder.id, {
          scheduledFor,
          status: "SCHEDULED",
          lastError: null,
        });
      }),
    );
  }

  private computeScheduledFor(startTime: Date, offsetMinutes: number): Date {
    const scheduledFor = new Date(startTime.getTime() - offsetMinutes * 60_000);
    this.assertScheduledForIsFuture(scheduledFor);
    return scheduledFor;
  }

  private assertScheduledForIsFuture(scheduledFor: Date) {
    if (scheduledFor.getTime() <= Date.now()) {
      throw appointmentReminderInPastError();
    }
  }

  private requireTenantId(user: AuthenticatedAppointmentUser): string {
    const tenantId = user.tenantId?.trim();
    if (!tenantId) {
      throw appointmentTenantRequiredError(
        "A tenant context is required to manage appointment reminders.",
      );
    }
    return tenantId;
  }

  private async ensureAppointmentForTenant(tenantId: string, appointmentId: string) {
    const appointment = await this.appointmentsRepository.findByIdGlobal(appointmentId);
    if (!appointment) {
      throw appointmentNotFoundError();
    }

    if (appointment.tenantId !== tenantId) {
      throw appointmentTenantMismatchError("You cannot modify reminders from another tenant.");
    }

    return appointment;
  }
}
