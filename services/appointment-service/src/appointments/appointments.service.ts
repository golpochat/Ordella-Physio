import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { CreateAppointmentCommand } from "@/appointments/commands/create-appointment.command";
import { UpdateAppointmentCommand } from "@/appointments/commands/update-appointment.command";
import { RescheduleAppointmentCommand } from "@/appointments/commands/reschedule-appointment.command";
import { CancelAppointmentCommand } from "@/appointments/commands/cancel-appointment.command";
import { AppointmentsRepository } from "@/appointments/appointments.repository";
import { AvailabilityService } from "@/availability/availability.service";
import { BlockedSlotsService } from "@/blocked-slots/blocked-slots.service";
import type { CreateAppointmentDto } from "@/appointments/dto/create-appointment.dto";
import type { UpdateAppointmentDto } from "@/appointments/dto/update-appointment.dto";
import type { RescheduleAppointmentDto } from "@/appointments/dto/reschedule-appointment.dto";
import type { CancelAppointmentDto } from "@/appointments/dto/cancel-appointment.dto";
import type { ListAppointmentsDto } from "@/appointments/dto/list-appointments.dto";
import type { CreateAvailabilityDto } from "@/availability/dto/create-availability.dto";
import type { UpdateAvailabilityDto } from "@/availability/dto/update-availability.dto";
import type { CreateBlockedSlotDto } from "@/blocked-slots/dto/create-blocked-slot.dto";
import type { UpdateBlockedSlotDto } from "@/blocked-slots/dto/update-blocked-slot.dto";
import { buildTherapistCalendar } from "@/utils/calendar-helpers";
import { toAppointmentListResponse, toAppointmentResponse } from "@/appointments/appointments.mapper";

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly createAppointmentCommand: CreateAppointmentCommand,
    private readonly updateAppointmentCommand: UpdateAppointmentCommand,
    private readonly rescheduleAppointmentCommand: RescheduleAppointmentCommand,
    private readonly cancelAppointmentCommand: CancelAppointmentCommand,
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly availabilityService: AvailabilityService,
    private readonly blockedSlotsService: BlockedSlotsService,
  ) {}

  create(tenantId: string, dto: CreateAppointmentDto, correlationId?: string) {
    return this.createAppointmentCommand.execute({ tenantId, dto, correlationId });
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

  async hasActiveAppointmentsForLocation(tenantId: string, locationId: string) {
    const count = await this.appointmentsRepository.countActiveByLocation(tenantId, locationId);

    return {
      hasActive: count > 0,
      count,
    };
  }

  update(tenantId: string, appointmentId: string, dto: UpdateAppointmentDto, correlationId?: string) {
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
}
