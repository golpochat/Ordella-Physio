import type { Terminal } from "@/generated/prisma";
import type { TerminalRecord } from "@/models/Terminal";

export type AuthenticatedTerminalUser = {
  userId: string;
  tenantId: string;
  role: string;
  email?: string;
  permissions?: string[];
};

export function toTerminalListResponse(terminals: Terminal[]): TerminalRecord[] {
  return terminals.map(toTerminalResponse);
}

export function toTerminalResponse(terminal: Terminal): TerminalRecord {
  return {
    id: terminal.id,
    tenantId: terminal.tenantId,
    locationId: terminal.locationId,
    name: terminal.name,
    code: terminal.code,
    type: terminal.type,
    ipAddress: terminal.ipAddress,
    macAddress: terminal.macAddress,
    status: terminal.status,
    lastSeenAt: terminal.lastSeenAt?.toISOString() ?? null,
    createdAt: terminal.createdAt.toISOString(),
    updatedAt: terminal.updatedAt.toISOString(),
  };
}
