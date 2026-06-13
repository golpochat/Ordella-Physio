"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { AgentRunConsole } from "@/components/ai/agents/AgentRunConsole";
import { ListPage } from "@/components/dashboard/ListPage";
import { useAgent, useAgentRuns, useRunAgent } from "@/hooks/useAiAgents";
import { clinicAiPaths } from "@/lib/ai-admin-paths";
import { WithPermission } from "@/lib/auth/withPermission";

export default function ClinicAgentDetailPage() {
  const params = useParams<{ id: string }>();
  const agentId = params.id;
  const { data: agent, isLoading, isError, refetch } = useAgent(agentId);
  const { data: runs } = useAgentRuns(agentId);
  const runAgent = useRunAgent();

  return (
    <WithPermission permission="ai.use">
      <ListPage title={agent?.name ?? "Agent"} isLoading={isLoading} isError={isError} onRetry={() => void refetch()} loadingRows={4}>
        <Link href={clinicAiPaths.agents} className="dashboard-link">← Back to agents</Link>
        <AgentRunConsole
          running={runAgent.isPending}
          latestRun={runAgent.data ?? runs?.[0] ?? null}
          onRun={(input) => {
            void runAgent.mutateAsync({ agentId, input }).then(() => toast.success("Agent run completed."));
          }}
        />
      </ListPage>
    </WithPermission>
  );
}
