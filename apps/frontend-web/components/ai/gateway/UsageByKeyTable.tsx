"use client";

import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import type { GatewayUsageByKey } from "@/lib/gateway-types";

export type UsageByKeyTableProps = {
  usage: GatewayUsageByKey[];
  keyNames?: Record<string, string>;
};

export function UsageByKeyTable({ usage, keyNames = {} }: UsageByKeyTableProps) {
  const sorted = [...usage].sort((a, b) => b.cost - a.cost);

  return (
    <DataTable columns={["API key", "Requests", "Tokens", "Cost"]} grid="default" isEmpty={!sorted.length} emptyMessage="No key usage yet.">
      {sorted.map((entry) => (
        <Row key={entry.keyId}>
          <div>{keyNames[entry.keyId] ?? entry.keyId}</div>
          <div>{entry.requests.toLocaleString()}</div>
          <div>{entry.tokens.toLocaleString()}</div>
          <div>${entry.cost.toFixed(2)}</div>
        </Row>
      ))}
    </DataTable>
  );
}
