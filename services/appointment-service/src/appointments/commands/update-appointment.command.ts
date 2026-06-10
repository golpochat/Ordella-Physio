import { Injectable } from "@nestjs/common";
import type { UpdateAppointmentDto } from "@/appointments/dto/update-appointment.dto";
import { AppointmentsRepository } from "@/appointments/appointments.repository";
import { AppointmentEventPublisher } from "@/events/appointment-event.publisher";
import { toAppointmentResponse } from "@/appointments/appointments.mapper";

export type UpdateAppointmentCommandInput = {
  tenantId: string;
  appointmentId: string;
  dto: UpdateAppointmentDto;
  correlationId?: string;
};

@Injectable()
export class UpdateAppointmentCommand {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly eventPublisher: AppointmentEventPublisher,
  ) {}

  async execute(input: UpdateAppointmentCommandInput) {
    const appointment = await this.appointmentsRepository.update(input.tenantId, input.appointmentId, {
      patientId: input.dto.patientId,
      therapistId: input.dto.therapistId,
      locationId: input.dto.locationId,
      startTime: input.dto.startTime ? new Date(input.dto.startTime) : undefined,
      endTime: input.dto.endTime ? new Date(input.dto.endTime) : undefined,
      status: input.dto.status,
      type: input.dto.type,
      notes: input.dto.notes,
    });

    await this.eventPublisher.publishAppointmentUpdated(
      {
        tenantId: input.tenantId,
        appointmentId: appointment.id,
        patientId: appointment.patientId,
        therapistId: appointment.therapistId,
        changes: input.dto as Record<string, unknown>,
        updatedAt: appointment.updatedAt.toISOString(),
      },
      input.correlationId,
    );

    return toAppointmentResponse(appointment);
  }
}
