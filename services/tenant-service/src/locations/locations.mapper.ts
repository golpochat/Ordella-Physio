import type { Location } from "@/generated/prisma";
import { toLocationResponse } from "@/tenants/tenants.mapper";

export { toLocationResponse };

export function toLocationListResponse(locations: Location[]) {
  return locations.map(toLocationResponse);
}
