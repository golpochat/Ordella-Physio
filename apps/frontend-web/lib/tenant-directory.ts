import { API_ROUTES } from "@/lib/constants";
import { getDefaultTenantId } from "@/lib/tenant-config";

export type TenantDirectoryEntry = {
  id: string;
  name: string;
  slug?: string;
};

type TenantListResponse = {
  data?: TenantDirectoryEntry[];
};

export async function fetchTenantDirectory(): Promise<TenantDirectoryEntry[]> {
  try {
    const response = await fetch(`${API_ROUTES.tenant}?limit=100`);
    if (!response.ok) {
      return buildFallbackTenants();
    }

    const payload = (await response.json()) as TenantListResponse | TenantDirectoryEntry[];
    if (Array.isArray(payload)) {
      return payload;
    }

    return payload.data?.length ? payload.data : buildFallbackTenants();
  } catch {
    return buildFallbackTenants();
  }
}

function buildFallbackTenants(): TenantDirectoryEntry[] {
  const defaultTenantId = getDefaultTenantId();
  if (!defaultTenantId) {
    return [];
  }

  return [{ id: defaultTenantId, name: defaultTenantId }];
}
