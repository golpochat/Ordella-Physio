"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AiAdminShell } from "@/components/ai/admin";
import { AgentEditor } from "@/components/ai/agents/AgentEditor";
import { AgentList } from "@/components/ai/agents/AgentList";
import { ListPage } from "@/components/dashboard/ListPage";
import { useAgentTools, useAgents, useCreateAgent } from "@/hooks/useAiAgents";
import { adminAiPaths } from "@/lib/ai-admin-paths";
import { WithPermission } from "@/lib/auth/withPermission";

export default function AdminAgentsPage() {
  const router = useRouter();
  const { data: agents, isLoading, isError, refetch } = useAgents();
  const { data: tools } = useAgentTools();
  const createAgent = useCreateAgent();

  return (
    <WithPermission permission="ai.admin">
      <AiAdminShell>
        <ListPage
          title="Sheba360 AI agents"
          subtitle="Define multi-step agents with tools, models, and observability-backed runs."
          isLoading={isLoading}
          isError={isError}
          onRetry={() => void refetch()}
          loadingRows={5}
        >
          <AgentEditor
            tools={tools ?? []}
            submitting={createAgent.isPending}
            onSubmit={(payload) => {
              void createAgent.mutateAsync(payload).then((agent) => {
                toast.success(`Agent "${agent.name}" created.`);
                void refetch();
              });
            }}
          />
          <AgentList
            agents={agents ?? []}
            basePath={adminAiPaths.agents}
            onRun={(agentId) => router.push(adminAiPaths.agent(agentId))}
          />
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
