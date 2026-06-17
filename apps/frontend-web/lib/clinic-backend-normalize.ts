import type { ClinicStaffListItem, ClinicStaffListResponse } from "@/lib/clinic-staff-member-types";
import type { ClinicStaffType } from "@/lib/clinic-staff-member-types";
import type { ClinicStaffMember, ClinicStripeSubscription } from "@/lib/clinic-portal-types";
import type { ClinicRoleListItem, ClinicRoleListResponse } from "@/lib/user-role-portal-types";

type PaginatedEnvelope<T> = {
  items?: T[];
  data?: T[] | PaginatedEnvelope<T>;
  total?: number;
  page?: number;
  pageSize?: number;
  limit?: number;
  totalPages?: number;
};

type BackendStaffProfile = {
  staff: {
    id: string;
    tenantId: string;
    userId: string;
    jobTitle?: string | null;
    department?: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
      phone?: string | null;
    };
  };
  roles: Array<{ id: string; name: string }>;
};

function unwrapPaginatedEnvelope<T>(response: unknown): PaginatedEnvelope<T> {
  if (!response || typeof response !== "object") {
    return {};
  }

  const record = response as Record<string, unknown>;

  if ("items" in record || "pageSize" in record || "totalPages" in record) {
    return record as PaginatedEnvelope<T>;
  }

  if ("data" in record && record.data && typeof record.data === "object") {
    const nested = record.data as Record<string, unknown>;
    if (Array.isArray(nested)) {
      return { data: nested as T[] };
    }
    if ("items" in nested || "pageSize" in nested) {
      return nested as PaginatedEnvelope<T>;
    }
    if (Array.isArray(nested.data)) {
      return { data: nested.data as T[] };
    }
  }

  if (Array.isArray(record.data)) {
    return { data: record.data as T[] };
  }

  return record as PaginatedEnvelope<T>;
}

function toPaginationMeta(envelope: PaginatedEnvelope<unknown>, itemCount: number) {
  return {
    page: envelope.page ?? 1,
    limit: envelope.pageSize ?? envelope.limit ?? itemCount,
    total: envelope.total ?? itemCount,
    totalPages: envelope.totalPages ?? (itemCount > 0 ? 1 : 0),
  };
}

function mapStaffProfileToListItem(profile: BackendStaffProfile): ClinicStaffListItem {
  const primaryRole = profile.roles[0];
  const staffType: ClinicStaffType =
    profile.staff.department?.toUpperCase() === "ADMIN"
      ? "ADMIN"
      : profile.staff.department?.toUpperCase() === "RECEPTION"
        ? "RECEPTIONIST"
        : "OTHER";

  return {
    id: profile.staff.id,
    tenantId: profile.staff.tenantId,
    firstName: profile.staff.user.firstName,
    lastName: profile.staff.user.lastName,
    email: profile.staff.user.email,
    phone: profile.staff.user.phone ?? null,
    staffType,
    roleId: primaryRole?.id ?? "",
    roleName: primaryRole?.name ?? null,
    status: profile.staff.isActive ? "ACTIVE" : "INACTIVE",
    locations: [],
    createdAt: profile.staff.createdAt,
    updatedAt: profile.staff.updatedAt,
    userId: profile.staff.userId,
  } as ClinicStaffListItem & { userId: string };
}

export function normalizeStaffMemberListResponse(response: unknown): ClinicStaffListResponse {
  const envelope = unwrapPaginatedEnvelope<BackendStaffProfile>(response);
  const rawItems = envelope.items ?? (Array.isArray(envelope.data) ? envelope.data : []);
  const items = rawItems.map((item) =>
    item && typeof item === "object" && "staff" in item
      ? mapStaffProfileToListItem(item as BackendStaffProfile)
      : (item as ClinicStaffListItem),
  );

  return {
    data: items,
    pagination: toPaginationMeta(envelope, items.length),
  };
}

/** Coerce API list payloads (array, `{ items }`, or `{ data }`) into a safe array. */
export function coerceListData<T>(value: unknown): T[] {
  if (Array.isArray(value)) {
    return value;
  }

  if (!value || typeof value !== "object") {
    return [];
  }

  const record = value as Record<string, unknown>;

  if (Array.isArray(record.items)) {
    return record.items as T[];
  }

  if (Array.isArray(record.data)) {
    return record.data as T[];
  }

  return [];
}

export function normalizeRoleListResponse(response: unknown): ClinicRoleListResponse {
  if (response && typeof response === "object" && "pagination" in response) {
    return response as ClinicRoleListResponse;
  }

  const record = response as { data?: unknown[] } | unknown[] | undefined;
  const roles = Array.isArray(record) ? record : Array.isArray(record?.data) ? record.data : [];

  const data: ClinicRoleListItem[] = roles.map((role) => {
    const entry = role as {
      id: string;
      tenantId: string;
      name: string;
      description?: string | null;
      isSystem?: boolean;
      permissions?: string[];
      createdAt: string;
      updatedAt: string;
    };

    return {
      id: entry.id,
      tenantId: entry.tenantId,
      name: entry.name,
      code: entry.name,
      description: entry.description ?? null,
      isSystem: entry.isSystem ?? false,
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt,
      permissionsCount: Array.isArray(entry.permissions) ? entry.permissions.length : 0,
    };
  });

  return {
    data,
    pagination: {
      page: 1,
      limit: data.length,
      total: data.length,
      totalPages: data.length > 0 ? 1 : 0,
    },
  };
}

export function mapStaffListItemsToPortalMembers(items: ClinicStaffListItem[]): ClinicStaffMember[] {
  return items.map((item) => {
    const extended = item as ClinicStaffListItem & { userId?: string };
    return {
      id: item.id,
      tenantId: item.tenantId,
      userId: extended.userId ?? item.id,
      role: item.roleName ?? "STAFF",
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  });
}

export function isClinicBackendClient(): boolean {
  return (
    process.env.NEXT_PUBLIC_USE_CLINIC_BACKEND === "true" ||
    process.env.NEXT_PUBLIC_USE_CLINIC_BACKEND === "1" ||
    Boolean(process.env.NEXT_PUBLIC_CLINIC_BACKEND_URL)
  );
}

export function getClinicBackendSubscriptionStub(tenantId: string): ClinicStripeSubscription {
  return {
    tenantId,
    stripeCustomerId: null,
    defaultPaymentMethodId: null,
    status: "none",
    plan: null,
    subscription: null,
  };
}
