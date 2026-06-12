import { Injectable } from "@nestjs/common";
import { AppointmentAggregate } from "@ordella/domain";
import type { CancelAppointmentDto } from "@/appointments/dto/cancel-appointment.dto";
import { AppointmentsRepository } from "@/appointments/appointments.repository";
import { AppointmentEventPublisher } from "@/events/appointment-event.publisher";
import { enforceCancellationPolicy } from "@/utils/scheduling-helpers";
import { toAppointmentResponse } from "@/appointments/appointments.mapper";

export type CancelAppointmentCommandInput = {
  tenantId: string;
  appointmentId: string;
  dto: CancelAppointmentDto;
  correlationId?: string;
};

@Injectable()
export class CancelAppointmentCommand {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly eventPublisher: AppointmentEventPublisher,
  ) {}

  async execute(input: CancelAppointmentCommandInput) {
    const existing = await this.appointmentsRepository.findById(input.tenantId, input.appointmentId);
    if (!existing) {
      throw new Error("Appointment not found");
    }

    if (!enforceCancellationPolicy(existing.startTime)) {
      throw new Error("Cancellation policy not met");
    }

    const aggregate = AppointmentAggregate.create({
      id: existing.id,
      tenantId: existing.tenantId,
      patientId: existing.patientId,
      therapistId: existing.therapistId,
      locationId: existing.locationId ?? "",
      startTime: existing.startTime,
      endTime: existing.endTime,
      type: existing.type,
    });

    if (aggregate.isFailure) {
      throw new Error(String(aggregate.error));
    }

    const cancelResult = aggregate.value.cancel(input.dto.reason, input.correlationId);
    if (cancelResult.isFailure) {
      throw new Error(String(cancelResult.error));
    }

    const appointment = await this.appointmentsRepository.update(input.tenantId, input.appointmentId, {
      status: "CANCELLED",
      cancellationReason: input.dto.reason,
    });

    await this.eventPublisher.publishAppointmentCancelled(
      {
        tenantId: input.tenantId,
        appointmentId: appointment.id,
        patientId: appointment.patientId,
        therapistId: appointment.therapistId,
        reason: input.dto.reason,
        cancelledAt: appointment.updatedAt.toISOString(),
      },
      input.correlationId,
    );

    return toAppointmentResponse(appointment);
  }
}
