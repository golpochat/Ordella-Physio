import { Injectable, Logger } from "@nestjs/common";
import { AppointmentsRepository } from "@/appointments/appointments.repository";
import { AppointmentReminderRepository } from "@/repositories/appointment-reminder.repository";
import { PatientServiceClient } from "@/integrations/patient-service.client";
import { StaffServiceClient } from "@/integrations/staff-service.client";
import { TenantServiceClient } from "@/integrations/tenant-service.client";
import { appointmentReminderNotFoundError } from "@/utils/appointment-errors";
import { formatPortalDateTime } from "@/utils/appointment-notification-format";
import { sendEmail, sendPush, sendSms } from "@/utils/notification-providers";

@Injectable()
export class AppointmentNotificationService {
  private readonly logger = new Logger(AppointmentNotificationService.name);

  constructor(
    private readonly appointmentReminderRepository: AppointmentReminderRepository,
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly patientServiceClient: PatientServiceClient,
    private readonly staffServiceClient: StaffServiceClient,
    private readonly tenantServiceClient: TenantServiceClient,
  ) {}

  async sendReminder(reminderId: string) {
    const reminder = await this.appointmentReminderRepository.findByIdGlobal(reminderId);
    if (!reminder) {
      throw appointmentReminderNotFoundError();
    }

    if (reminder.status !== "SCHEDULED") {
      return { sent: false, reason: "Reminder is not scheduled." };
    }

    if (reminder.scheduledFor.getTime() > Date.now()) {
      return { sent: false, reason: "Reminder is not due yet." };
    }

    const appointment = await this.appointmentsRepository.findByIdGlobal(reminder.appointmentId);
    if (!appointment) {
      await this.markFailed(reminder.tenantId, reminder.id, "Appointment no longer exists.");
      return { sent: false, reason: "Appointment not found." };
    }

    const [patients, staffMembers, location] = await Promise.all([
      this.patientServiceClient.getPatientSummaries(reminder.tenantId, [reminder.patientId]),
      reminder.staffId
        ? this.staffServiceClient.getStaffSummaries(reminder.tenantId, [reminder.staffId])
        : Promise.resolve([]),
      appointment.locationId
        ? this.tenantServiceClient.getLocation(appointment.locationId)
        : Promise.resolve(null),
    ]);

    const patient = patients[0];
    const staff = staffMembers[0];
    const patientName = patient
      ? `${patient.firstName} ${patient.lastName}`.trim()
      : "Patient";
    const staffName = staff ? `${staff.firstName} ${staff.lastName}`.trim() : "Staff member";
    const when = formatPortalDateTime(appointment.startTime.toISOString());
    const locationLabel =
      appointment.type === "TELEMEDICINE"
        ? "Telemedicine appointment"
        : location?.name ?? "Clinic location";

    const subject = "Appointment reminder";
    const body = [
      `Reminder for ${patientName}.`,
      `Appointment: ${when}`,
      `With: ${staffName}`,
      `Type: ${locationLabel}`,
    ].join("\n");

    const recipient = reminder.staffId && staff ? staff.id : patient?.id ?? reminder.patientId;

    try {
      const result = await this.deliverReminder(reminder.channel, {
        tenantId: reminder.tenantId,
        to: recipient,
        subject,
        body,
        metadata: {
          appointmentId: appointment.id,
          reminderId: reminder.id,
          patientId: reminder.patientId,
          staffId: reminder.staffId,
        },
      });

      if (!result.success) {
        await this.markFailed(reminder.tenantId, reminder.id, result.error ?? "Delivery failed.");
        return { sent: false, reason: result.error ?? "Delivery failed." };
      }

      await this.appointmentReminderRepository.update(reminder.tenantId, reminder.id, {
        status: "SENT",
        sentAt: new Date(),
        lastError: null,
      });

      return { sent: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Delivery failed.";
      await this.markFailed(reminder.tenantId, reminder.id, message);
      this.logger.error(`Failed to send reminder ${reminder.id}: ${message}`);
      return { sent: false, reason: message };
    }
  }

  async notifyAppointmentCreated() {
    // Hook point for default tenant-configured reminders or immediate notifications.
  }

  private async deliverReminder(
    channel: "EMAIL" | "SMS" | "PUSH",
    payload: Parameters<typeof sendEmail>[0],
  ) {
    if (channel === "EMAIL") {
      return sendEmail(payload);
    }

    if (channel === "SMS") {
      return sendSms(payload);
    }

    return sendPush(payload);
  }

  private async markFailed(tenantId: string, reminderId: string, lastError: string) {
    await this.appointmentReminderRepository.update(tenantId, reminderId, {
      status: "FAILED",
      lastError,
    });
  }
}
