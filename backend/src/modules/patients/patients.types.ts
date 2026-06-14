import type { Gender, Prisma } from "@prisma/client";
import type { PaginationInput } from "../../utils/pagination";

export type PatientSortField = "createdAt" | "lastName" | "firstName";

export type ListPatientsFilters = PaginationInput & {
  search?: string;
  email?: string;
  phone?: string;
  isActive?: boolean;
  gender?: Gender;
  createdFrom?: Date;
  createdTo?: Date;
  sortBy?: PatientSortField;
  sortOrder?: "asc" | "desc";
};

export type CreatePatientInput = {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: Gender;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
};

export type UpdatePatientInput = Partial<CreatePatientInput> & {
  isActive?: boolean;
};

export type PatientProfileOptions = {
  appointmentLimit?: number;
  invoiceLimit?: number;
  noteLimit?: number;
  paymentLimit?: number;
};

export type PatientListItem = Prisma.PatientGetPayload<{
  select: {
    id: true;
    firstName: true;
    lastName: true;
    email: true;
    phone: true;
    dateOfBirth: true;
    gender: true;
    isActive: true;
    createdAt: true;
    updatedAt: true;
  };
}>;
