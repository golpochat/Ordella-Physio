"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import type { ModelRegistryRecord } from "@/lib/training-types";
import { CLINIC_AI_BASE } from "@/lib/ai-admin-paths";

export type ModelRegistryListProps = {
  models: ModelRegistryRecord[];
  basePath?: string;
};

export function ModelRegistryList({ models, basePath = CLINIC_AI_BASE }: ModelRegistryListProps) {
  return (
    <DataTable
      columns={["Model", "Version", "Base model", "Provider", "Status", "Actions"]}
      grid="default"
      emptyMessage="No registered models yet."
      isEmpty={models.length === 0}
    >
      {models.map((model) => (
        <Row key={model.id}>
          <div className="dataset-list-name">{model.modelName}</div>
          <div>{model.version}</div>
          <div>{model.baseModel}</div>
          <div>{model.trainingProvider}</div>
          <div>
            <Badge
              variant={
                model.status === "PUBLISHED"
                  ? "default"
                  : model.status === "DEPRECATED"
                    ? "secondary"
                    : "outline"
              }
            >
              {model.status}
            </Badge>
          </div>
          <div>
            <Link href={`${basePath}/models/${model.id}`} className="dashboard-link">
              Details
            </Link>
          </div>
        </Row>
      ))}
    </DataTable>
  );
}
