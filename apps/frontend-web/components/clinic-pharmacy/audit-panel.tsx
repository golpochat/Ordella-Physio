"use client";

import type { ClinicPrescriptionAuditLog } from "@/lib/clinic-pharmacy-types";
import { formatPortalDateTime } from "@/lib/pharmacy-portal-utils";

export function PrescriptionAuditPanel({ logs }: { logs: ClinicPrescriptionAuditLog[] }) {
  if (!logs.length) {
    return (
      <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
        No audit events recorded yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {logs.map((log) => (
        <div key={log.id} className="rounded-lg border p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-medium capitalize">{log.action.replace(/\./g, " ")}</p>
            <p className="text-xs text-muted-foreground">{formatPortalDateTime(log.createdAt)}</p>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Actor: {log.actorId}</p>
          {log.payload && Object.keys(log.payload).length > 0 ? (
            <pre className="mt-2 overflow-x-auto rounded bg-muted p-2 text-xs">
              {JSON.stringify(log.payload, null, 2)}
            </pre>
          ) : null}
        </div>
      ))}
    </div>
  );
}
