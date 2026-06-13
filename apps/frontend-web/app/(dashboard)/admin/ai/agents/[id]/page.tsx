"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { AiAdminShell } from "@/components/ai/admin";
import { AgentRunConsole } from "@/components/ai/agents/AgentRunConsole";
import { AgentStepTimeline } from "@/components/ai/agents/AgentStepTimeline";
import { ListPage } from "@/components/dashboard/ListPage";
import { useAgent, useAgentRuns, useRunAgent } from "@/hooks/useAiAgents";
import { adminAiPaths } from "@/lib/ai-admin-paths";
import { WithPermission } from "@/lib/auth/withPermission";

export default function AdminAgentDetailPage() {
  const params = useParams<{ id: string }>();
  const agentId = params.id;
  const { data: agent, isLoading, isError, refetch } = useAgent(agentId);
  const { data: runs } = useAgentRuns(agentId);
  const runAgent = useRunAgent();

  return (
    <WithPermission permission="ai.admin">
      <AiAdminShell>
        <ListPage
          title={agent?.name ?? "Agent"}
          subtitle={agent?.description ?? "Run multi-step agent workflows with full trace logging."}
          isLoading={isLoading}
          isError={isError}
          onRetry={() => void refetch()}
          loadingRows={4}
        >
          <Link href={adminAiPaths.agents} className="dashboard-link">← Back to agents</Link>
          {agent ? (
            <div className="ai-agents-detail-meta">
              <span>Model: {agent.modelId}</span>
              <span>Tools: {agent.tools.length}</span>
              <span>Max steps: {agent.maxSteps}</span>
            </div>
          ) : null}
          <AgentRunConsole
            running={runAgent.isPending}
            latestRun={runAgent.data ?? runs?.[0] ?? null}
            onRun={(input) => {
              void runAgent.mutateAsync({ agentId, input }).then(() => toast.success("Agent run completed."));
            }}
          />
          {runs && runs.length > 1 ? (
            <div className="ai-agents-history">
              <h4>Recent runs</h4>
              {runs.slice(1, 4).map((run) => (
                <div key={run.id} className="ai-agents-history-item">
                  <span>{new Date(run.createdAt).toLocaleString()}</span>
                  <span>{run.status}</span>
                  <AgentStepTimeline steps={run.steps} />
                </div>
              ))}
            </div>
          ) : null}
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
