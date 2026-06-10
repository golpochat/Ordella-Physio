import { Injectable } from "@nestjs/common";
import { CreateAvailabilityCommand } from "@/availability/commands/create-availability.command";
import { UpdateAvailabilityCommand } from "@/availability/commands/update-availability.command";
import { AvailabilityRepository } from "@/availability/availability.repository";
import type { CreateAvailabilityDto } from "@/availability/dto/create-availability.dto";
import type { UpdateAvailabilityDto } from "@/availability/dto/update-availability.dto";
import { buildWeeklyRecurringPlaceholder } from "@/utils/calendar-helpers";
import { toAvailabilityListResponse } from "@/availability/availability.mapper";

@Injectable()
export class AvailabilityService {
  constructor(
    private readonly createAvailabilityCommand: CreateAvailabilityCommand,
    private readonly updateAvailabilityCommand: UpdateAvailabilityCommand,
    private readonly availabilityRepository: AvailabilityRepository,
  ) {}

  create(tenantId: string, dto: CreateAvailabilityDto, correlationId?: string) {
    return this.createAvailabilityCommand.execute({ tenantId, dto }).then((result) => {
      void correlationId;
      return result;
    });
  }

  async listByTherapist(tenantId: string, therapistId: string) {
    const items = await this.availabilityRepository.findByTherapist(tenantId, therapistId);
    return toAvailabilityListResponse(items);
  }

  update(
    tenantId: string,
    availabilityId: string,
    dto: UpdateAvailabilityDto,
    correlationId?: string,
  ) {
    return this.updateAvailabilityCommand.execute({ tenantId, availabilityId, dto, correlationId });
  }

  getWeeklyRecurringPlaceholder(therapistId: string) {
    return buildWeeklyRecurringPlaceholder(therapistId);
  }
}
