export type TerminalType = "POS" | "KIOSK" | "PRINTER" | "TABLET" | "OTHER";
export type TerminalStatus = "ACTIVE" | "INACTIVE";

export type ClinicTerminal = {
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

export type CreateClinicTerminalPayload = {
  name: string;
  code: string;
  type: TerminalType;
  locationId: string;
  ipAddress?: string;
  macAddress?: string;
};

export type CreateClinicTerminalResponse = {
  terminal: ClinicTerminal;
  message: string;
};

export type UpdateClinicTerminalPayload = {
  name?: string;
  code?: string;
  type?: TerminalType;
  locationId?: string;
  ipAddress?: string | null;
  macAddress?: string | null;
  status?: TerminalStatus;
};

export type UpdateClinicTerminalResponse = {
  terminal: ClinicTerminal;
  message: string;
};

export type ClinicTerminalListFilters = {
  page?: number;
  limit?: number;
  search?: string;
  type?: TerminalType;
  status?: TerminalStatus;
  locationId?: string;
  sortBy?: "createdAt" | "name" | "code" | "type" | "status" | "lastSeenAt";
  sortOrder?: "asc" | "desc";
};

export type ClinicTerminalListResponse = {
  data: ClinicTerminal[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type ClinicTerminalStatusActionResponse = {
  terminal: ClinicTerminal;
  message: string;
};
