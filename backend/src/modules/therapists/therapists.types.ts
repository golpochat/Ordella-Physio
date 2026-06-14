import type { AppointmentStatus, DayOfWeek, Prisma } from "@prisma/client";
import type { PaginationInput } from "../../utils/pagination";

export type TherapistActor = {
  userId: string;
  roles: string[];
};

export type TherapistSortField = "createdAt" | "lastName" | "specialty";

export type ListTherapistsFilters = PaginationInput & {
  search?: string;
  specialty?: string;
  isActive?: boolean;
  sortBy?: TherapistSortField;
  sortOrder?: "asc" | "desc";
};

export type CreateTherapistInput = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  specialty?: string;
  licenseNumber?: string;
  bio?: string;
};

export type AdminUpdateTherapistInput = {
  firstName?: string;
  lastName?: string;
  phone?: string | null;
  specialty?: string | null;
  licenseNumber?: string | null;
  bio?: string | null;
  isActive?: boolean;
};

export type SelfUpdateTherapistInput = {
  firstName?: string;
  lastName?: string;
  phone?: string | null;
  specialty?: string | null;
  bio?: string | null;
};

export type WorkingHoursBlock = {
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
};

export type ServiceTypeInput = {
  name: string;
  durationMinutes?: number;
  description?: string;
  isActive?: boolean;
};

export type ListTherapistAppointmentsFilters = PaginationInput & {
  status?: AppointmentStatus;
  startFrom?: Date;
  startTo?: Date;
  sortOrder?: "asc" | "desc";
};

export type TherapistWithUser = Prisma.TherapistGetPayload<{
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
    serviceTypes: true;
    availability: true;
  };
}>;
