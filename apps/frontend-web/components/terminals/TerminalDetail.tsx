"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { TerminalStatusActions } from "@/components/terminals/TerminalStatusActions";
import { TerminalStatusBadge } from "@/components/terminals/TerminalStatusBadge";
import type { ClinicTerminal } from "@/lib/terminal-portal-types";

function formatDateTime(value: string | null): string {
  if (!value) {
    return "—";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export type TerminalDetailProps = {
  terminal: ClinicTerminal;
  locationName?: string;
};

export function TerminalDetail({ terminal: initialTerminal, locationName }: TerminalDetailProps) {
  const [terminal, setTerminal] = useState(initialTerminal);

  useEffect(() => {
    setTerminal(initialTerminal);
  }, [initialTerminal]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>{terminal.name}</CardTitle>
            <TerminalStatusBadge status={terminal.status} />
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-muted-foreground">Code</dt>
              <dd className="dashboard-cell-primary">{terminal.code}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Type</dt>
              <dd className="dashboard-cell-muted">{terminal.type}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Location</dt>
              <dd className="dashboard-cell-muted">{locationName ?? terminal.locationId}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">IP address</dt>
              <dd className="dashboard-cell-muted">{terminal.ipAddress ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">MAC address</dt>
              <dd className="dashboard-cell-muted">{terminal.macAddress ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Last seen</dt>
              <dd className="dashboard-cell-muted">{formatDateTime(terminal.lastSeenAt)}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Status</dt>
              <dd>
                <TerminalStatusBadge status={terminal.status} />
              </dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-3">
            <TerminalStatusActions terminal={terminal} onStatusChange={setTerminal} />
            <Button asChild variant="outline">
              <Link href={`/clinic/terminals/${terminal.id}/edit`}>Edit terminal</Link>
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
