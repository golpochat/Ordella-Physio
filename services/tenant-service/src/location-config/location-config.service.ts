import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import type { LocationConfigNamespace } from "@/models/LocationConfig";
import { LOCATION_CONFIG_NAMESPACES } from "@/models/LocationConfig";
import { LocationsRepository } from "@/locations/locations.repository";
import { LocationConfigRepository } from "@/location-config/location-config.repository";
import {
  toLocationConfigNamespaceSummary,
  toLocationConfigResponse,
} from "@/location-config/location-config.mapper";
import {
  isLocationConfigNamespace,
  normalizeConfigData,
  validateConfig,
} from "@/validators/location-config.validator";
import {
  invalidLocationNamespaceError,
  locationConfigTenantMismatchError,
  locationConfigValidationError,
  locationNotFoundError,
  locationTenantRequiredError,
} from "@/utils/location-errors";
import type { AuthenticatedTenantUser } from "@/utils/tenant-helpers";

@Injectable()
export class LocationConfigService {
  constructor(
    private readonly locationsRepository: LocationsRepository,
    private readonly locationConfigRepository: LocationConfigRepository,
  ) {}

  private assertNamespace(namespace: string): LocationConfigNamespace {
    if (!isLocationConfigNamespace(namespace)) {
      throw invalidLocationNamespaceError();
    }

    return namespace;
  }

  private async assertLocationAccess(locationId: string, user: AuthenticatedTenantUser) {
    const tenantId = user.tenantId?.trim();
    if (!tenantId) {
      throw locationTenantRequiredError();
    }

    const location = await this.locationsRepository.findByIdGlobal(locationId);
    if (!location) {
      throw locationNotFoundError();
    }

    if (location.tenantId !== tenantId) {
      throw locationConfigTenantMismatchError();
    }

    return location;
  }

  async listNamespaces(locationId: string, requestingUser: AuthenticatedTenantUser) {
    await this.assertLocationAccess(locationId, requestingUser);

    const stored = await this.locationConfigRepository.findAllByLocationId(locationId);
    const storedByNamespace = new Map(stored.map((entry) => [entry.namespace, entry]));

    return {
      namespaces: LOCATION_CONFIG_NAMESPACES.map((namespace) =>
        toLocationConfigNamespaceSummary(namespace, storedByNamespace.get(namespace) ?? null),
      ),
    };
  }

  async getConfig(
    locationId: string,
    namespaceInput: string,
    requestingUser: AuthenticatedTenantUser,
  ) {
    const namespace = this.assertNamespace(namespaceInput);
    await this.assertLocationAccess(locationId, requestingUser);

    const config = await this.locationConfigRepository.findByLocationAndNamespace(
      locationId,
      namespace,
    );

    return toLocationConfigResponse(namespace, config);
  }

  async updateConfig(
    locationId: string,
    namespaceInput: string,
    data: unknown,
    updatedByUser: AuthenticatedTenantUser,
  ) {
    const namespace = this.assertNamespace(namespaceInput);
    await this.assertLocationAccess(locationId, updatedByUser);

    const validationErrors = validateConfig(namespace, data);
    if (validationErrors.length > 0) {
      throw locationConfigValidationError(validationErrors);
    }

    const normalized = normalizeConfigData(namespace, data as Record<string, unknown>);

    const updated = await this.locationConfigRepository.upsert(
      locationId,
      namespace,
      normalized as Prisma.InputJsonValue,
      updatedByUser.userId,
    );

    return {
      config: toLocationConfigResponse(namespace, updated),
      message: "Configuration updated successfully.",
    };
  }
}
