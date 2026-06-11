import { Injectable } from "@nestjs/common";
import type { UpdateLocationPayload } from "@/models/Location";
import { LocationsService } from "@/locations/locations.service";
import type { AuthenticatedTenantUser } from "@/utils/tenant-helpers";

export type UpdateLocationCommandInput = {
  tenantId: string;
  locationId: string;
  dto: UpdateLocationPayload;
  updatedByUser?: AuthenticatedTenantUser;
};

@Injectable()
export class UpdateLocationCommand {
  constructor(private readonly locationsService: LocationsService) {}

  execute(input: UpdateLocationCommandInput) {
    if (input.updatedByUser) {
      return this.locationsService.updateLocation(input.locationId, input.dto, {
        ...input.updatedByUser,
        tenantId: input.tenantId,
      });
    }

    return this.locationsService.updateLocation(input.locationId, input.dto, {
      userId: "",
      tenantId: input.tenantId,
      role: "OWNER",
    });
  }
}
