"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import type { AgentRecord } from "@/lib/agent-types";

export type AgentListProps = {
  agents: AgentRecord[];
  basePath: string;
  onRun?: (agentId: string) => void;
};

export function AgentList({ agents, basePath, onRun }: AgentListProps) {
  return (
    <DataTable columns={["Name", "Model", "Tools", "Created by", "Actions"]} grid="default" isEmpty={!agents.length} emptyMessage="No agents defined yet.">
      {agents.map((agent) => (
        <Row key={agent.id}>
          <div>
            <Link href={`${basePath}/${agent.id}`} className="dashboard-link">
              {agent.name}
            </Link>
          </div>
          <div>{agent.modelId}</div>
          <div>{agent.tools.length}</div>
          <div>{agent.createdByUserId}</div>
          <div className="ai-agents-actions">
            <Button type="button" variant="ghost" onClick={() => onRun?.(agent.id)}>
              Run
            </Button>
          </div>
        </Row>
      ))}
    </DataTable>
  );
}
