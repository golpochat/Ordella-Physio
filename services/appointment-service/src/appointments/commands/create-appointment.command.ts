import { Injectable } from "@nestjs/common";
import { AppointmentAggregate } from "@ordella/domain";
import { randomString } from "@ordella/utils";
import type { CreateAppointmentDto } from "@/appointments/dto/create-appointment.dto";
import { AppointmentsRepository } from "@/appointments/appointments.repository";
import { BlockedSlotsRepository } from "@/blocked-slots/blocked-slots.repository";
import { AppointmentEventPublisher } from "@/events/appointment-event.publisher";
import { detectAppointmentConflicts } from "@/utils/conflict-detector";
import { runSchedulingRules } from "@/utils/scheduling-helpers";
import { toAppointmentResponse } from "@/appointments/appointments.mapper";

export type CreateAppointmentCommandInput = {
  tenantId: string;
  dto: CreateAppointmentDto;
  correlationId?: string;
};

@Injectable()
export class CreateAppointmentCommand {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly blockedSlotsRepository: BlockedSlotsRepository,
    private readonly eventPublisher: AppointmentEventPublisher,
  ) {}

  async execute(input: CreateAppointmentCommandInput) {
    const appointmentId = randomString(24);
    const startTime = new Date(input.dto.startTime);
    const endTime = new Date(input.dto.endTime);

    const aggregateResult = AppointmentAggregate.create({
      id: appointmentId,
      tenantId: input.tenantId,
      patientId: input.dto.patientId,
      therapistId: input.dto.therapistId,
      locationId: input.dto.locationId,
      startTime,
      endTime,
      type: input.dto.type,
      correlationId: input.correlationId,
    });

    if (aggregateResult.isFailure) {
      throw new Error(String(aggregateResult.error));
    }

    const [existing, blockedSlots] = await Promise.all([
      this.appointmentsRepository.findOverlapping(
        input.tenantId,
        input.dto.therapistId,
        startTime,
        endTime,
      ),
      this.blockedSlotsRepository.findByTherapist(input.tenantId, input.dto.therapistId),
    ]);

    const conflicts = detectAppointmentConflicts(
      {
        therapistId: input.dto.therapistId,
        patientId: input.dto.patientId,
        startTime,
        endTime,
      },
      existing,
      blockedSlots,
    );

    if (conflicts.length > 0) {
      throw new Error(conflicts[0]);
    }

    const rules = runSchedulingRules({
      tenantId: input.tenantId,
      therapistId: input.dto.therapistId,
      startTime,
      endTime,
      therapistIsActive: true,
      existingAppointments: existing.map((item) => ({
        therapistId: item.therapistId,
        startTime: item.startTime,
        endTime: item.endTime,
        status: item.status,
      })),
      blockedSlots,
    });

    if (rules.isFailure) {
      throw new Error(String(rules.error));
    }

    const appointment = await this.appointmentsRepository.create(input.tenantId, {
      id: appointmentId,
      patientId: input.dto.patientId,
      therapistId: input.dto.therapistId,
      locationId: input.dto.locationId,
      startTime,
      endTime,
      type: input.dto.type,
      notes: input.dto.notes,
      status: "SCHEDULED",
    });

    await this.eventPublisher.publishAppointmentCreated(
      {
        tenantId: input.tenantId,
        appointmentId: appointment.id,
        patientId: appointment.patientId,
        therapistId: appointment.therapistId,
        locationId: appointment.locationId,
        startTime: appointment.startTime.toISOString(),
        endTime: appointment.endTime.toISOString(),
        createdAt: appointment.createdAt.toISOString(),
      },
      input.correlationId,
    );

    return toAppointmentResponse(appointment);
  }
}
