import { Injectable } from "@nestjs/common";
import { randomString } from "@ordella/utils";
import type { AuthenticatedAppointmentUser } from "@/appointments/strategies/jwt.strategy";
import { AppointmentsRepository } from "@/appointments/appointments.repository";
import { AvailabilityRepository } from "@/availability/availability.repository";
import { AppointmentEventPublisher } from "@/events/appointment-event.publisher";
import { AppointmentNotificationService } from "@/services/appointment-notification.service";
import { PatientServiceClient } from "@/integrations/patient-service.client";
import { StaffServiceClient } from "@/integrations/staff-service.client";
import { TenantServiceClient } from "@/integrations/tenant-service.client";
import { toAppointmentResponse } from "@/appointments/appointments.mapper";
import { checkStaffAvailability } from "@/utils/availability-checker";
import {
  appointmentTenantRequiredError,
  appointmentValidationError,
  invalidLocationError,
  patientAlreadyBookedError,
  patientNotFoundForTenantError,
  staffNotAvailableError,
  staffNotFoundForTenantError,
} from "@/utils/appointment-errors";
import { validateCreateAppointment } from "@/validators/appointment.validator";
import { AuditLogClient } from "@/integrations/audit-log.client";
import { SubscriptionBillingClient } from "@/integrations/subscription-billing.client";

@Injectable()
export class AppointmentCreateService {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly availabilityRepository: AvailabilityRepository,
    private readonly patientServiceClient: PatientServiceClient,
    private readonly staffServiceClient: StaffServiceClient,
    private readonly tenantServiceClient: TenantServiceClient,
    private readonly eventPublisher: AppointmentEventPublisher,
    private readonly appointmentNotificationService: AppointmentNotificationService,
    private readonly auditLogClient: AuditLogClient,
    private readonly subscriptionBillingClient: SubscriptionBillingClient,
  ) {}

  async createAppointment(payload: unknown, createdByUser: AuthenticatedAppointmentUser) {
    const tenantId = createdByUser.tenantId?.trim();
    if (!tenantId) {
      throw appointmentTenantRequiredError();
    }

    const validation = validateCreateAppointment(payload);
    if (!validation.valid) {
      throw appointmentValidationError(validation.fields);
    }

    const normalized = validation.payload;

    await this.subscriptionBillingClient.enforceAppointmentCreate(tenantId);

    const [patient, staff] = await Promise.all([
      this.patientServiceClient.getPatientForTenant(tenantId, normalized.patientId),
      this.staffServiceClient.getStaffForTenant(tenantId, normalized.staffId),
    ]);

    if (!patient || patient.tenantId !== tenantId) {
      throw patientNotFoundForTenantError();
    }

    if (!staff || staff.tenantId !== tenantId) {
      throw staffNotFoundForTenantError();
    }

    if (normalized.locationId) {
      const location = await this.tenantServiceClient.getLocation(normalized.locationId);
      if (!location || location.tenantId !== tenantId) {
        throw invalidLocationError();
      }
    }

    const [staffOverlaps, patientOverlaps, availabilityRecords] = await Promise.all([
      this.appointmentsRepository.findOverlapping(
        tenantId,
        normalized.staffId,
        normalized.startTime,
        normalized.endTime,
      ),
      this.appointmentsRepository.findPatientOverlapping(
        tenantId,
        normalized.patientId,
        normalized.startTime,
        normalized.endTime,
      ),
      this.availabilityRepository.findByTherapist(tenantId, normalized.staffId),
    ]);

    if (patientOverlaps.length > 0) {
      throw patientAlreadyBookedError();
    }

    const staffAvailable = checkStaffAvailability(
      normalized.staffId,
      normalized.startTime,
      normalized.endTime,
      {
        staffStatus: staff.status,
        availabilityRecords,
        weeklySchedule: staff.weeklySchedule,
        overlappingAppointments: staffOverlaps.map((item) => ({
          startTime: item.startTime,
          endTime: item.endTime,
        })),
      },
    );

    if (!staffAvailable) {
      throw staffNotAvailableError();
    }

    const appointmentId = randomString(24);
    const appointment = await this.appointmentsRepository.create(tenantId, {
      id: appointmentId,
      patientId: normalized.patientId,
      therapistId: normalized.staffId,
      locationId: normalized.locationId ?? undefined,
      startTime: normalized.startTime,
      endTime: normalized.endTime,
      type: normalized.appointmentType,
      notes: normalized.notes,
      status: "SCHEDULED",
    });

    // Default tenant-configured reminders can be created here in a future iteration.
    await this.appointmentNotificationService.notifyAppointmentCreated();

    await this.eventPublisher.publishAppointmentCreated(
      {
        tenantId,
        appointmentId: appointment.id,
        patientId: appointment.patientId,
        therapistId: appointment.therapistId,
        locationId: appointment.locationId ?? "",
        startTime: appointment.startTime.toISOString(),
        endTime: appointment.endTime.toISOString(),
        createdAt: appointment.createdAt.toISOString(),
      },
      undefined,
    );

    void this.subscriptionBillingClient.recordAppointmentCreated(tenantId);

    void this.auditLogClient.logAction({
      tenantId,
      actorUserId: createdByUser.userId,
      actorRole: createdByUser.role,
      entityType: "APPOINTMENT",
      entityId: appointment.id,
      action: "CREATE",
      metadata: {
        patientId: appointment.patientId,
        staffId: appointment.therapistId,
        status: appointment.status,
      },
    });

    return {
      appointment: toAppointmentResponse(appointment),
      message: "Appointment created successfully.",
    };
  }
}
