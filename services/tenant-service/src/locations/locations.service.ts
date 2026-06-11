import { Injectable } from "@nestjs/common";
import type { CreateLocationPayload, UpdateLocationPayload } from "@/models/Location";
import { LocationsRepository } from "@/locations/locations.repository";
import { TenantEventPublisher } from "@/events/tenant-event.publisher";
import { toLocationListResponse, toLocationResponse } from "@/locations/locations.mapper";
import { validateCreateLocation, validateUpdateLocation, parseListLocationsQuery } from "@/validators/location.validator";
import {
  locationCodeExistsError,
  locationNotFoundError,
  locationTenantMismatchError,
  locationTenantRequiredError,
  locationValidationError,
  invalidLocationFilterError,
  invalidLocationPaginationError,
  locationAlreadyInactiveError,
  locationAlreadyActiveError,
  locationHasActiveAppointmentsError,
} from "@/utils/location-errors";
import type { AuthenticatedTenantUser } from "@/utils/tenant-helpers";
import { AppointmentServiceClient } from "@/integrations/appointment-service.client";

@Injectable()
export class LocationsService {
  constructor(
    private readonly locationsRepository: LocationsRepository,
    private readonly eventPublisher: TenantEventPublisher,
    private readonly appointmentServiceClient: AppointmentServiceClient,
  ) {}

  private assertTenantAccess(
    location: { tenantId: string },
    user: AuthenticatedTenantUser,
  ): string {
    const tenantId = user.tenantId?.trim();
    if (!tenantId) {
      throw locationTenantRequiredError();
    }

    if (location.tenantId !== tenantId) {
      throw locationTenantMismatchError();
    }

    return tenantId;
  }

  async createLocation(payload: CreateLocationPayload, createdByUser: AuthenticatedTenantUser) {
    const tenantId = createdByUser.tenantId?.trim();
    if (!tenantId) {
      throw locationTenantRequiredError();
    }

    const validation = validateCreateLocation(payload);
    if (!validation.valid) {
      throw locationValidationError(validation.fields);
    }

    const normalized = validation.payload;

    const existing = await this.locationsRepository.findByCode(tenantId, normalized.code);
    if (existing) {
      throw locationCodeExistsError();
    }

    const location = await this.locationsRepository.create(tenantId, {
      name: normalized.name,
      code: normalized.code,
      addressLine1: normalized.addressLine1,
      addressLine2: normalized.addressLine2,
      city: normalized.city,
      state: normalized.state,
      postalCode: normalized.postalCode,
      country: normalized.country,
      phone: normalized.phone,
      email: normalized.email,
      timezone: normalized.timezone,
      status: "ACTIVE",
    });

    await this.eventPublisher.publishLocationAdded(
      {
        tenantId,
        locationId: location.id,
        name: location.name,
        createdAt: location.createdAt.toISOString(),
      },
      undefined,
    );

    return {
      location: toLocationResponse(location),
      message: "Location created successfully.",
    };
  }

  async addLocation(
    tenantId: string,
    payload: CreateLocationPayload,
    createdByUser?: AuthenticatedTenantUser,
    correlationId?: string,
  ) {
    void correlationId;

    if (createdByUser) {
      return this.createLocation(payload, { ...createdByUser, tenantId });
    }

    return this.createLocation(payload, {
      userId: "",
      tenantId,
      role: "OWNER",
    });
  }

  async listLocations(query: unknown, requestingUser: AuthenticatedTenantUser) {
    const tenantId = requestingUser.tenantId?.trim();
    if (!tenantId) {
      throw locationTenantRequiredError();
    }

    const parsed = parseListLocationsQuery(query);
    if (!parsed.valid) {
      if (parsed.error === "INVALID_PAGINATION") {
        throw invalidLocationPaginationError();
      }
      throw invalidLocationFilterError();
    }

    const { page, limit, search, status, sortBy, sortOrder } = parsed.payload;
    const filter = { tenantId, search, status };

    const [locations, total] = await Promise.all([
      this.locationsRepository.findManyFiltered({
        ...filter,
        skip: (page - 1) * limit,
        take: limit,
        sortBy,
        sortOrder,
      }),
      this.locationsRepository.countFiltered(filter),
    ]);

    const totalPages = total === 0 ? 0 : Math.ceil(total / limit);

    return {
      data: toLocationListResponse(locations),
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  async getLocation(locationId: string, requestedByUser: AuthenticatedTenantUser) {
    const location = await this.locationsRepository.findByIdGlobal(locationId);
    if (!location) {
      throw locationNotFoundError();
    }

    this.assertTenantAccess(location, requestedByUser);
    return toLocationResponse(location);
  }

  async updateLocation(
    locationId: string,
    payload: UpdateLocationPayload,
    updatedByUser: AuthenticatedTenantUser,
  ) {
    const location = await this.locationsRepository.findByIdGlobal(locationId);
    if (!location) {
      throw locationNotFoundError();
    }

    const tenantId = this.assertTenantAccess(location, updatedByUser);

    const validation = validateUpdateLocation(payload);
    if (!validation.valid) {
      throw locationValidationError(validation.fields);
    }

    const normalized = validation.payload;

    if (normalized.code && normalized.code !== location.code) {
      const existing = await this.locationsRepository.findByCode(tenantId, normalized.code);
      if (existing && existing.id !== locationId) {
        throw locationCodeExistsError();
      }
    }

    const updated = await this.locationsRepository.update(tenantId, locationId, {
      ...(normalized.name !== undefined ? { name: normalized.name } : {}),
      ...(normalized.code !== undefined ? { code: normalized.code } : {}),
      ...(normalized.addressLine1 !== undefined ? { addressLine1: normalized.addressLine1 } : {}),
      ...(normalized.addressLine2 !== undefined ? { addressLine2: normalized.addressLine2 } : {}),
      ...(normalized.city !== undefined ? { city: normalized.city } : {}),
      ...(normalized.state !== undefined ? { state: normalized.state } : {}),
      ...(normalized.postalCode !== undefined ? { postalCode: normalized.postalCode } : {}),
      ...(normalized.country !== undefined ? { country: normalized.country } : {}),
      ...(normalized.phone !== undefined ? { phone: normalized.phone } : {}),
      ...(normalized.email !== undefined ? { email: normalized.email } : {}),
      ...(normalized.timezone !== undefined ? { timezone: normalized.timezone } : {}),
      ...(normalized.status !== undefined ? { status: normalized.status } : {}),
    });

    return {
      location: toLocationResponse(updated),
      message: "Location updated successfully.",
    };
  }

  async deactivateLocation(locationId: string, performedByUser: AuthenticatedTenantUser) {
    const location = await this.locationsRepository.findByIdGlobal(locationId);
    if (!location) {
      throw locationNotFoundError();
    }

    const tenantId = this.assertTenantAccess(location, performedByUser);

    if (location.status === "INACTIVE") {
      throw locationAlreadyInactiveError();
    }

    const hasActiveAppointments =
      await this.appointmentServiceClient.hasActiveAppointmentsForLocation(tenantId, locationId);
    if (hasActiveAppointments) {
      throw locationHasActiveAppointmentsError();
    }

    const updated = await this.locationsRepository.setStatus(tenantId, locationId, "INACTIVE");

    return {
      location: toLocationResponse(updated),
      message: "Location deactivated successfully.",
    };
  }

  async activateLocation(locationId: string, performedByUser: AuthenticatedTenantUser) {
    const location = await this.locationsRepository.findByIdGlobal(locationId);
    if (!location) {
      throw locationNotFoundError();
    }

    const tenantId = this.assertTenantAccess(location, performedByUser);

    if (location.status === "ACTIVE") {
      throw locationAlreadyActiveError();
    }

    const updated = await this.locationsRepository.setStatus(tenantId, locationId, "ACTIVE");

    return {
      location: toLocationResponse(updated),
      message: "Location activated successfully.",
    };
  }

  async archiveLocation(tenantId: string, locationId: string) {
    const updated = await this.locationsRepository.setStatus(tenantId, locationId, "INACTIVE");
    return toLocationResponse(updated);
  }
}
