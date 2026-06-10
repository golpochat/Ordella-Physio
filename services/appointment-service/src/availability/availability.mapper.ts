import type { Availability } from "@/generated/prisma";

export function toAvailabilityResponse(availability: Availability) {
  return {
    id: availability.id,
    tenantId: availability.tenantId,
    therapistId: availability.therapistId,
    dayOfWeek: availability.dayOfWeek,
    startTime: availability.startTime,
    endTime: availability.endTime,
    createdAt: availability.createdAt.toISOString(),
    updatedAt: availability.updatedAt.toISOString(),
  };
}

export function toAvailabilityListResponse(items: Availability[]) {
  return items.map(toAvailabilityResponse);
}
