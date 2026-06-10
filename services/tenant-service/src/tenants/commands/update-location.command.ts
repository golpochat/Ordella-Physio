import { Injectable } from "@nestjs/common";
import type { UpdateLocationDto } from "@/tenants/dto/update-location.dto";
import { LocationsService } from "@/locations/locations.service";

export type UpdateLocationCommandInput = {
  tenantId: string;
  locationId: string;
  dto: UpdateLocationDto;
};

@Injectable()
export class UpdateLocationCommand {
  constructor(private readonly locationsService: LocationsService) {}

  execute(input: UpdateLocationCommandInput) {
    return this.locationsService.updateLocation(input.tenantId, input.locationId, input.dto);
  }
}
