export const TERMINAL_TYPES = ["POS", "KIOSK", "PRINTER", "TABLET", "OTHER"] as const;
export type TerminalType = (typeof TERMINAL_TYPES)[number];

export const TERMINAL_STATUSES = ["ACTIVE", "INACTIVE"] as const;
export type TerminalStatus = (typeof TERMINAL_STATUSES)[number];

export type TerminalValidationFieldError = {
  field: string;
  message: string;
};

export type CreateTerminalPayload = {
  name?: string;
  code?: string;
  type?: TerminalType;
  locationId?: string;
  ipAddress?: string;
  macAddress?: string;
};

export type UpdateTerminalPayload = {
  name?: string;
  code?: string;
  type?: TerminalType;
  locationId?: string;
  ipAddress?: string | null;
  macAddress?: string | null;
  status?: TerminalStatus;
};

export type TerminalRecord = {
  id: string;
  tenantId: string;
  locationId: string;
  name: string;
  code: string;
  type: TerminalType;
  ipAddress: string | null;
  macAddress: string | null;
  status: TerminalStatus;
  lastSeenAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export const LIST_TERMINAL_SORT_FIELDS = [
  "createdAt",
  "name",
  "code",
  "type",
  "status",
  "lastSeenAt",
] as const;

export type ListTerminalSortField = (typeof LIST_TERMINAL_SORT_FIELDS)[number];

export type ListTerminalsQuery = {
  page: number;
  limit: number;
  search?: string;
  type?: TerminalType;
  status?: TerminalStatus;
  locationId?: string;
  sortBy: ListTerminalSortField;
  sortOrder: "asc" | "desc";
};

export type ListTerminalsResponse = {
  data: TerminalRecord[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
