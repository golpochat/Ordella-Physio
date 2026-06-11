import { Controller, Get, Param } from "@nestjs/common";
import { LocationsRepository } from "@/locations/locations.repository";
import { locationNotFoundError } from "@/utils/location-errors";

@Controller("tenants")
export class InternalLocationController {
  constructor(private readonly locationsRepository: LocationsRepository) {}

  @Get("internal/locations/:locationId")
  async getLocationInternal(@Param("locationId") locationId: string) {
    const location = await this.locationsRepository.findByIdGlobal(locationId);
    if (!location) {
      throw locationNotFoundError();
    }

    return {
      id: location.id,
      tenantId: location.tenantId,
      name: location.name,
      code: location.code,
      status: location.status,
    };
  }
}
