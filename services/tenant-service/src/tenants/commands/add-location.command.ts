import { Injectable } from "@nestjs/common";
import type { CreateLocationDto } from "@/tenants/dto/create-location.dto";
import { LocationsService } from "@/locations/locations.service";

export type AddLocationCommandInput = {
  tenantId: string;
  dto: CreateLocationDto;
  correlationId?: string;
};

@Injectable()
export class AddLocationCommand {
  constructor(private readonly locationsService: LocationsService) {}

  execute(input: AddLocationCommandInput) {
    return this.locationsService.addLocation(input.tenantId, input.dto, input.correlationId);
  }
}
