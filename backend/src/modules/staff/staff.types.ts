import type { Prisma } from "@prisma/client";
import type { PaginationInput } from "../../utils/pagination";

export type StaffActor = {
  userId: string;
  roles: string[];
};

export type StaffSortField = "createdAt" | "lastName" | "department";

export type ListStaffFilters = PaginationInput & {
  search?: string;
  department?: string;
  isActive?: boolean;
  sortBy?: StaffSortField;
  sortOrder?: "asc" | "desc";
};

export type CreateStaffInput = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  jobTitle?: string;
  department?: string;
  roleNames?: ("STAFF" | "ADMIN")[];
};

export type AdminUpdateStaffInput = {
  firstName?: string;
  lastName?: string;
  phone?: string | null;
  jobTitle?: string | null;
  department?: string | null;
  isActive?: boolean;
};

export type StaffProfile = {
  staff: Prisma.StaffGetPayload<{
    include: {
      user: {
        select: {
          id: true;
          email: true;
          firstName: true;
          lastName: true;
          phone: true;
          status: true;
        };
      };
    };
  }>;
  roles: { id: string; name: string; description: string | null; permissions: string[] }[];
  permissions: string[];
};

/** Roles that may be assigned through the staff management module. */
export const STAFF_ASSIGNABLE_ROLE_NAMES = ["STAFF", "ADMIN"] as const;
export type StaffAssignableRoleName = (typeof STAFF_ASSIGNABLE_ROLE_NAMES)[number];
