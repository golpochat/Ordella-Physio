import { BadRequestException, Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { AppointmentCreateService } from "@/services/appointment-create.service";
import { AppointmentUpdateService } from "@/services/appointment-update.service";
import { AppointmentListService } from "@/services/appointment-list.service";
import { AppointmentStatusService } from "@/services/appointment-status.service";
import { UpdateAppointmentCommand } from "@/appointments/commands/update-appointment.command";
import { RescheduleAppointmentCommand } from "@/appointments/commands/reschedule-appointment.command";
import { CancelAppointmentCommand } from "@/appointments/commands/cancel-appointment.command";
import { AppointmentsRepository } from "@/appointments/appointments.repository";
import { AvailabilityService } from "@/availability/availability.service";
import { BlockedSlotsService } from "@/blocked-slots/blocked-slots.service";
import type { UpdateAppointmentDto } from "@/appointments/dto/update-appointment.dto";
import type { RescheduleAppointmentDto } from "@/appointments/dto/reschedule-appointment.dto";
import type { CancelAppointmentDto } from "@/appointments/dto/cancel-appointment.dto";
import type { AuthenticatedAppointmentUser } from "@/appointments/strategies/jwt.strategy";
import type { ListAppointmentsDto } from "@/appointments/dto/list-appointments.dto";
import type { CreateAvailabilityDto } from "@/availability/dto/create-availability.dto";
import type { UpdateAvailabilityDto } from "@/availability/dto/update-availability.dto";
import type { CreateBlockedSlotDto } from "@/blocked-slots/dto/create-blocked-slot.dto";
import type { UpdateBlockedSlotDto } from "@/blocked-slots/dto/update-blocked-slot.dto";
import { buildTherapistCalendar } from "@/utils/calendar-helpers";
import { toAppointmentListResponse, toAppointmentResponse } from "@/appointments/appointments.mapper";
import { AppointmentMetricsService } from "@/services/appointment-metrics.service";
import { parseInternalMetricsRange } from "@/utils/internal-metrics-range";

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentCreateService: AppointmentCreateService,
    private readonly appointmentUpdateService: AppointmentUpdateService,
    private readonly appointmentListService: AppointmentListService,
    private readonly appointmentStatusService: AppointmentStatusService,
    private readonly updateAppointmentCommand: UpdateAppointmentCommand,
    private readonly rescheduleAppointmentCommand: RescheduleAppointmentCommand,
    private readonly cancelAppointmentCommand: CancelAppointmentCommand,
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly availabilityService: AvailabilityService,
    private readonly blockedSlotsService: BlockedSlotsService,
    private readonly appointmentMetricsService: AppointmentMetricsService,
  ) {}

  create(
    tenantId: string,
    payload: unknown,
    createdByUser: { tenantId: string; userId: string; role: string; permissions?: string[] },
  ) {
    return this.appointmentCreateService.createAppointment(payload, {
      userId: createdByUser.userId,
      tenantId,
      role: createdByUser.role,
      permissions: createdByUser.permissions,
    });
  }

  listAppointments(
    query: unknown,
    requestingUser: { tenantId: string; userId: string; role: string; permissions?: string[] },
  ) {
    return this.appointmentListService.listAppointments(query, {
      userId: requestingUser.userId,
      tenantId: requestingUser.tenantId,
      role: requestingUser.role,
      permissions: requestingUser.permissions,
    });
  }

  async list(tenantId: string, query: ListAppointmentsDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const where: Prisma.AppointmentWhereInput = {
      ...(query.patientId ? { patientId: query.patientId } : {}),
      ...(query.therapistId ? { therapistId: query.therapistId } : {}),
      ...(query.locationId ? { locationId: query.locationId } : {}),
      ...(query.status ? { status: query.status } : {}),
      ...(query.from || query.to
        ? {
            startTime: {
              ...(query.from ? { gte: new Date(query.from) } : {}),
              ...(query.to ? { lte: new Date(query.to) } : {}),
            },
          }
        : {}),
    };

    const [appointments, total] = await Promise.all([
      this.appointmentsRepository.list(tenantId, where, { skip: (page - 1) * limit, take: limit }),
      this.appointmentsRepository.count(tenantId, where),
    ]);

    return {
      data: toAppointmentListResponse(appointments),
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findById(tenantId: string, appointmentId: string) {
    const appointment = await this.appointmentsRepository.findById(tenantId, appointmentId);
    return appointment ? toAppointmentResponse(appointment) : null;
  }

  async getAiContext(tenantId: string, appointmentId: string) {
    const appointment = await this.getAppointmentInternal(tenantId, appointmentId);
    if (!appointment) {
      return null;
    }

    const history = appointment.patientId
      ? await this.getPatientAppointmentHistory(tenantId, appointment.patientId, 5)
      : { data: [] };

    return {
      appointment,
      providerNotes: appointment.notes ?? "",
      patientHistory: history.data,
    };
  }

  async getAppointmentInternal(tenantId: string, appointmentId: string) {
    if (!tenantId?.trim()) {
      return null;
    }

    const appointment = await this.appointmentsRepository.findById(tenantId.trim(), appointmentId);
    if (!appointment) {
      return null;
    }

    return {
      id: appointment.id,
      tenantId: appointment.tenantId,
      patientId: appointment.patientId,
      therapistId: appointment.therapistId,
      locationId: appointment.locationId,
      startTime: appointment.startTime.toISOString(),
      endTime: appointment.endTime.toISOString(),
      type: appointment.type,
      status: appointment.status,
      notes: appointment.notes,
      cancellationReason: appointment.cancellationReason,
    };
  }

  async getPatientAppointmentHistory(
    tenantId: string,
    patientId: string,
    limit = 10,
  ) {
    if (!tenantId?.trim() || !patientId?.trim()) {
      return { data: [] };
    }

    const safeLimit = Math.min(50, Math.max(1, limit));
    const appointments = await this.appointmentsRepository.list(
      tenantId.trim(),
      { patientId: patientId.trim() },
      { skip: 0, take: safeLimit, orderBy: { startTime: "desc" } },
    );

    return {
      data: appointments.map((appointment) => ({
        id: appointment.id,
        startTime: appointment.startTime.toISOString(),
        endTime: appointment.endTime.toISOString(),
        type: appointment.type,
        status: appointment.status,
        notes: appointment.notes,
      })),
    };
  }

  async hasActiveAppointmentsForLocation(tenantId: string, locationId: string) {
    const count = await this.appointmentsRepository.countActiveByLocation(tenantId, locationId);

    return {
      hasActive: count > 0,
      count,
    };
  }

  async hasActiveAppointmentsForStaff(tenantId: string, staffId: string) {
    const count = await this.appointmentsRepository.countActiveByTherapist(tenantId, staffId);

    return {
      hasActive: count > 0,
      count,
    };
  }

  async hasActiveAppointmentsForPatient(tenantId: string, patientId: string) {
    const count = await this.appointmentsRepository.countActiveByPatient(tenantId, patientId);

    return {
      hasActive: count > 0,
      count,
    };
  }

  update(
    tenantId: string,
    appointmentId: string,
    payload: unknown,
    updatedByUser: { tenantId: string; userId: string; role: string; permissions?: string[] },
  ) {
    return this.appointmentUpdateService.updateAppointment(appointmentId, payload, {
      userId: updatedByUser.userId,
      tenantId,
      role: updatedByUser.role,
      permissions: updatedByUser.permissions,
    });
  }

  patch(tenantId: string, appointmentId: string, dto: UpdateAppointmentDto, correlationId?: string) {
    return this.updateAppointmentCommand.execute({ tenantId, appointmentId, dto, correlationId });
  }

  reschedule(
    tenantId: string,
    appointmentId: string,
    dto: RescheduleAppointmentDto,
    correlationId?: string,
  ) {
    return this.rescheduleAppointmentCommand.execute({ tenantId, appointmentId, dto, correlationId });
  }

  cancelAppointment(appointmentId: string, performedByUser: AuthenticatedAppointmentUser) {
    return this.appointmentStatusService.cancelAppointment(appointmentId, performedByUser);
  }

  completeAppointment(appointmentId: string, performedByUser: AuthenticatedAppointmentUser) {
    return this.appointmentStatusService.completeAppointment(appointmentId, performedByUser);
  }

  markNoShow(appointmentId: string, performedByUser: AuthenticatedAppointmentUser) {
    return this.appointmentStatusService.markNoShow(appointmentId, performedByUser);
  }

  cancel(tenantId: string, appointmentId: string, dto: CancelAppointmentDto, correlationId?: string) {
    return this.cancelAppointmentCommand.execute({ tenantId, appointmentId, dto, correlationId });
  }

  createAvailability(tenantId: string, dto: CreateAvailabilityDto, correlationId?: string) {
    return this.availabilityService.create(tenantId, dto, correlationId);
  }

  listAvailability(tenantId: string, therapistId: string) {
    return this.availabilityService.listByTherapist(tenantId, therapistId);
  }

  updateAvailability(
    tenantId: string,
    availabilityId: string,
    dto: UpdateAvailabilityDto,
    correlationId?: string,
  ) {
    return this.availabilityService.update(tenantId, availabilityId, dto, correlationId);
  }

  createBlockedSlot(tenantId: string, dto: CreateBlockedSlotDto) {
    return this.blockedSlotsService.create(tenantId, dto);
  }

  listBlockedSlots(tenantId: string, therapistId: string) {
    return this.blockedSlotsService.listByTherapist(tenantId, therapistId);
  }

  updateBlockedSlot(tenantId: string, blockedSlotId: string, dto: UpdateBlockedSlotDto) {
    return this.blockedSlotsService.update(tenantId, blockedSlotId, dto);
  }

  async getTherapistCalendar(tenantId: string, therapistId: string) {
    const [appointments, availability, blockedSlots] = await Promise.all([
      this.appointmentsRepository.list(tenantId, { therapistId }, { skip: 0, take: 500 }),
      this.availabilityService.listByTherapist(tenantId, therapistId),
      this.blockedSlotsService.listByTherapist(tenantId, therapistId),
    ]);

    return {
      therapistId,
      entries: buildTherapistCalendar(
        therapistId,
        appointments,
        availability.map((item) => ({
          id: item.id,
          therapistId: item.therapistId,
          dayOfWeek: item.dayOfWeek as never,
          startTime: item.startTime,
          endTime: item.endTime,
          tenantId: item.tenantId,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
        })),
        blockedSlots,
      ),
    };
  }

  getAppointmentMetrics(tenantId: string, start: string, end: string) {
    if (!tenantId?.trim()) {
      throw new BadRequestException("tenantId is required");
    }

    const range = parseInternalMetricsRange(start, end);
    if (!range) {
      throw new BadRequestException("Invalid metrics date range");
    }

    return this.appointmentMetricsService.getMetrics(tenantId.trim(), range.start, range.end);
  }
}
