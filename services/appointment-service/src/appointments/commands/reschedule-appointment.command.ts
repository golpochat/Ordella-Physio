import { Injectable } from "@nestjs/common";
import { AppointmentAggregate } from "@ordella/domain";
import type { RescheduleAppointmentDto } from "@/appointments/dto/reschedule-appointment.dto";
import { AppointmentsRepository } from "@/appointments/appointments.repository";
import { AppointmentEventPublisher } from "@/events/appointment-event.publisher";
import { toAppointmentResponse } from "@/appointments/appointments.mapper";

export type RescheduleAppointmentCommandInput = {
  tenantId: string;
  appointmentId: string;
  dto: RescheduleAppointmentDto;
  correlationId?: string;
};

@Injectable()
export class RescheduleAppointmentCommand {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly eventPublisher: AppointmentEventPublisher,
  ) {}

  async execute(input: RescheduleAppointmentCommandInput) {
    const existing = await this.appointmentsRepository.findById(input.tenantId, input.appointmentId);
    if (!existing) {
      throw new Error("Appointment not found");
    }

    const startTime = new Date(input.dto.startTime);
    const endTime = new Date(input.dto.endTime);
    const previousStartTime = existing.startTime.toISOString();
    const previousEndTime = existing.endTime.toISOString();

    const aggregate = AppointmentAggregate.create({
      id: existing.id,
      tenantId: existing.tenantId,
      patientId: existing.patientId,
      therapistId: existing.therapistId,
      locationId: existing.locationId,
      startTime: existing.startTime,
      endTime: existing.endTime,
      type: existing.type,
    });

    if (aggregate.isFailure) {
      throw new Error(String(aggregate.error));
    }

    const rescheduleResult = aggregate.value.reschedule(startTime, endTime, input.correlationId);
    if (rescheduleResult.isFailure) {
      throw new Error(String(rescheduleResult.error));
    }

    const appointment = await this.appointmentsRepository.update(input.tenantId, input.appointmentId, {
      startTime,
      endTime,
      status: "SCHEDULED",
    });

    await this.eventPublisher.publishAppointmentRescheduled(
      {
        tenantId: input.tenantId,
        appointmentId: appointment.id,
        previousStartTime,
        previousEndTime,
        startTime: appointment.startTime.toISOString(),
        endTime: appointment.endTime.toISOString(),
        rescheduledAt: appointment.updatedAt.toISOString(),
      },
      input.correlationId,
    );

    return toAppointmentResponse(appointment);
  }
}
