"use client";

import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import type { CostByFeature } from "@/lib/cost-types";

export type CostByFeatureTableProps = {
  features: CostByFeature[];
};

export function CostByFeatureTable({ features }: CostByFeatureTableProps) {
  const sorted = [...features].sort((a, b) => b.cost - a.cost);

  return (
    <DataTable columns={["Feature", "Requests", "Tokens", "Cost"]} grid="default" isEmpty={!sorted.length} emptyMessage="No feature cost data yet.">
      {sorted.map((entry) => (
        <Row key={entry.feature}>
          <div>{entry.feature}</div>
          <div>{entry.requests.toLocaleString()}</div>
          <div>{entry.tokens.toLocaleString()}</div>
          <div>${entry.cost.toFixed(2)}</div>
        </Row>
      ))}
    </DataTable>
  );
}
