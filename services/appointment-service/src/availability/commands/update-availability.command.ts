import { Injectable } from "@nestjs/common";
import type { UpdateAvailabilityDto } from "@/availability/dto/update-availability.dto";
import { AvailabilityRepository } from "@/availability/availability.repository";
import { AppointmentEventPublisher } from "@/events/appointment-event.publisher";
import { mapDayOfWeekToPrisma } from "@/utils/scheduling-helpers";
import { toAvailabilityResponse } from "@/availability/availability.mapper";

export type UpdateAvailabilityCommandInput = {
  tenantId: string;
  availabilityId: string;
  dto: UpdateAvailabilityDto;
  correlationId?: string;
};

@Injectable()
export class UpdateAvailabilityCommand {
  constructor(
    private readonly availabilityRepository: AvailabilityRepository,
    private readonly eventPublisher: AppointmentEventPublisher,
  ) {}

  async execute(input: UpdateAvailabilityCommandInput) {
    const availability = await this.availabilityRepository.update(
      input.tenantId,
      input.availabilityId,
      {
        dayOfWeek: input.dto.dayOfWeek ? mapDayOfWeekToPrisma(input.dto.dayOfWeek) : undefined,
        startTime: input.dto.startTime,
        endTime: input.dto.endTime,
      },
    );

    await this.eventPublisher.publishAvailabilityUpdated(
      {
        tenantId: input.tenantId,
        availabilityId: availability.id,
        therapistId: availability.therapistId,
        changes: input.dto as Record<string, unknown>,
        updatedAt: availability.updatedAt.toISOString(),
      },
      input.correlationId,
    );

    return toAvailabilityResponse(availability);
  }
}
