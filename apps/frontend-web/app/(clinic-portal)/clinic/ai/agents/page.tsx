"use client";

import { useRouter } from "next/navigation";
import { AgentList } from "@/components/ai/agents/AgentList";
import { ListPage } from "@/components/dashboard/ListPage";
import { useAgents } from "@/hooks/useAiAgents";
import { clinicAiPaths } from "@/lib/ai-admin-paths";
import { WithPermission } from "@/lib/auth/withPermission";

export default function ClinicAgentsPage() {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useAgents();

  return (
    <WithPermission permission="ai.model.view">
      <ListPage title="AI agents" subtitle="Run tenant-defined Sheba360 AI agents." isLoading={isLoading} isError={isError} onRetry={() => void refetch()} loadingRows={5}>
        <AgentList
          agents={data ?? []}
          basePath={clinicAiPaths.agents}
          onRun={(agentId) => router.push(clinicAiPaths.agent(agentId))}
        />
      </ListPage>
    </WithPermission>
  );
}
