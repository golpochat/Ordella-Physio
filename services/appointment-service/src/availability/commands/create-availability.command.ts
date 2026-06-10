import { Injectable } from "@nestjs/common";
import type { CreateAvailabilityDto } from "@/availability/dto/create-availability.dto";
import { AvailabilityRepository } from "@/availability/availability.repository";
import { mapDayOfWeekToPrisma } from "@/utils/scheduling-helpers";
import { toAvailabilityResponse } from "@/availability/availability.mapper";

export type CreateAvailabilityCommandInput = {
  tenantId: string;
  dto: CreateAvailabilityDto;
};

@Injectable()
export class CreateAvailabilityCommand {
  constructor(private readonly availabilityRepository: AvailabilityRepository) {}

  async execute(input: CreateAvailabilityCommandInput) {
    const availability = await this.availabilityRepository.create(input.tenantId, {
      therapistId: input.dto.therapistId,
      dayOfWeek: mapDayOfWeekToPrisma(input.dto.dayOfWeek),
      startTime: input.dto.startTime,
      endTime: input.dto.endTime,
    });

    return toAvailabilityResponse(availability);
  }
}
