import { Injectable } from "@nestjs/common";
import { LocationsRepository } from "@/locations/locations.repository";
import { TenantEventPublisher } from "@/events/tenant-event.publisher";
import type { CreateLocationDto } from "@/tenants/dto/create-location.dto";
import type { UpdateLocationDto } from "@/tenants/dto/update-location.dto";
import { toLocationListResponse, toLocationResponse } from "@/locations/locations.mapper";

@Injectable()
export class LocationsService {
  constructor(
    private readonly locationsRepository: LocationsRepository,
    private readonly eventPublisher: TenantEventPublisher,
  ) {}

  async addLocation(tenantId: string, dto: CreateLocationDto, correlationId?: string) {
    const location = await this.locationsRepository.create(tenantId, {
      name: dto.name,
      address: dto.address,
      phone: dto.phone,
    });

    await this.eventPublisher.publishLocationAdded(
      {
        tenantId,
        locationId: location.id,
        name: location.name,
        createdAt: location.createdAt.toISOString(),
      },
      correlationId,
    );

    return toLocationResponse(location);
  }

  async listLocations(tenantId: string) {
    const locations = await this.locationsRepository.findByTenant(tenantId);
    return toLocationListResponse(locations);
  }

  async updateLocation(tenantId: string, locationId: string, dto: UpdateLocationDto) {
    const location = await this.locationsRepository.update(tenantId, locationId, dto);
    return toLocationResponse(location);
  }

  async archiveLocation(tenantId: string, locationId: string) {
    const location = await this.locationsRepository.archive(tenantId, locationId);
    return toLocationResponse(location);
  }
}
