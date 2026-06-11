import { Injectable } from "@nestjs/common";
import type { CreateLocationPayload } from "@/models/Location";
import { LocationsService } from "@/locations/locations.service";
import type { AuthenticatedTenantUser } from "@/utils/tenant-helpers";

export type AddLocationCommandInput = {
  tenantId: string;
  dto: CreateLocationPayload;
  createdByUser?: AuthenticatedTenantUser;
  correlationId?: string;
};

@Injectable()
export class AddLocationCommand {
  constructor(private readonly locationsService: LocationsService) {}

  execute(input: AddLocationCommandInput) {
    return this.locationsService.addLocation(
      input.tenantId,
      input.dto,
      input.createdByUser,
      input.correlationId,
    );
  }
}
