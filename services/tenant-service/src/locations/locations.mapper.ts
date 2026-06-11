import type { Location } from "@/generated/prisma";
import type { LocationResponse } from "@/models/Location";

export function toLocationResponse(location: Location): LocationResponse {
  return {
    id: location.id,
    tenantId: location.tenantId,
    name: location.name,
    code: location.code,
    addressLine1: location.addressLine1,
    addressLine2: location.addressLine2,
    city: location.city,
    state: location.state,
    postalCode: location.postalCode,
    country: location.country,
    phone: location.phone,
    email: location.email,
    timezone: location.timezone,
    status: location.status,
    createdAt: location.createdAt.toISOString(),
    updatedAt: location.updatedAt.toISOString(),
  };
}

export function toLocationListResponse(locations: Location[]) {
  return locations.map(toLocationResponse);
}
