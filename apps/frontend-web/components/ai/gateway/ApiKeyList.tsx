"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import type { GatewayKeyRecord } from "@/lib/gateway-types";

export type ApiKeyListProps = {
  keys: GatewayKeyRecord[];
  onToggleActive?: (id: string, isActive: boolean) => void;
  onRotate?: (id: string) => void;
  onRevoke?: (id: string) => void;
};

export function ApiKeyList({ keys, onToggleActive, onRotate, onRevoke }: ApiKeyListProps) {
  return (
    <DataTable columns={["Name", "Prefix", "Scopes", "Last used", "Status", "Actions"]} grid="default" isEmpty={!keys.length} emptyMessage="No API keys yet.">
      {keys.map((key) => (
        <Row key={key.id}>
          <div className="dataset-list-name">{key.name}</div>
          <div>{key.keyPrefix}…</div>
          <div>{key.scopes.join(", ") || "—"}</div>
          <div>{key.lastUsedAt ? new Date(key.lastUsedAt).toLocaleString() : "Never"}</div>
          <div className="automation-builder-actions">
            <Badge variant={key.isActive ? "default" : "secondary"}>{key.isActive ? "Active" : "Revoked"}</Badge>
            {key.isFlagged ? <Badge variant="destructive">Flagged</Badge> : null}
            {key.isThrottled ? <Badge variant="outline">Throttled</Badge> : null}
          </div>
          <div className="automation-builder-actions">
            {onToggleActive && key.isActive ? (
              <Button type="button" variant="ghost" onClick={() => onToggleActive(key.id, !key.isActive)}>
                {key.isActive ? "Disable" : "Enable"}
              </Button>
            ) : null}
            {onRotate && key.isActive ? (
              <Button type="button" variant="ghost" onClick={() => onRotate(key.id)}>Rotate</Button>
            ) : null}
            {onRevoke && key.isActive ? (
              <Button type="button" variant="ghost" onClick={() => onRevoke(key.id)}>Revoke</Button>
            ) : null}
          </div>
        </Row>
      ))}
    </DataTable>
  );
}
