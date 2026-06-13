"use client";

import { Button } from "@/components/ui/button";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import type { AccessPolicyRecord } from "@/lib/security-types";

export type AccessPolicyTableProps = {
  policies: AccessPolicyRecord[];
  onRevoke?: (id: string) => void;
};

export function AccessPolicyTable({ policies, onRevoke }: AccessPolicyTableProps) {
  return (
    <DataTable columns={["Model", "Allowed roles", "Allowed users", "Actions"]} grid="default" isEmpty={!policies.length} emptyMessage="No access policies configured.">
      {policies.map((policy) => (
        <Row key={policy.id}>
          <div>{policy.modelId}</div>
          <div>{policy.allowedRoles.join(", ") || "—"}</div>
          <div>{policy.allowedUsers?.join(", ") ?? "—"}</div>
          <div>
            {onRevoke ? (
              <Button type="button" variant="ghost" onClick={() => onRevoke(policy.id)}>Remove</Button>
            ) : null}
          </div>
        </Row>
      ))}
    </DataTable>
  );
}
