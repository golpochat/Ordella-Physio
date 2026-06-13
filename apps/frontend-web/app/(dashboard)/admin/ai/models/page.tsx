"use client";

import Link from "next/link";
import { AiAdminShell, ModelRegistryList } from "@/components/ai/admin";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { useModelRegistry } from "@/hooks/useTrainingPortal";
import { ADMIN_AI_BASE, adminAiPaths } from "@/lib/ai-admin-paths";
import { WithPermission } from "@/lib/auth/withPermission";

export default function AdminModelsPage() {
  const { data, isLoading, isError, refetch } = useModelRegistry();

  return (
    <WithPermission permission="ai.admin">
      <AiAdminShell>
        <ListPage
          title="Model registry"
          subtitle="Published and draft models from completed training jobs."
          action={
            <Button asChild variant="ghost"><Link href={adminAiPaths.training}>Training jobs</Link></Button>
          }
          isLoading={isLoading}
          isError={isError}
          onRetry={() => void refetch()}
          loadingRows={5}
        >
          <ModelRegistryList models={data ?? []} basePath={ADMIN_AI_BASE} />
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
