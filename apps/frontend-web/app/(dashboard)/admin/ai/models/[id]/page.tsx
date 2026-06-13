"use client";

import Link from "next/link";
import { toast } from "sonner";
import { AiAdminShell, ModelDetails } from "@/components/ai/admin";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { useDeprecateModel, usePublishModel, useRegistryModel } from "@/hooks/useTrainingPortal";
import { ADMIN_AI_BASE, adminAiPaths } from "@/lib/ai-admin-paths";
import { useAuth } from "@/hooks/useAuth";
import { userHasPermission } from "@/lib/auth/permissions";
import { WithPermission } from "@/lib/auth/withPermission";

type Props = { params: { id: string } };

export default function AdminModelDetailPage({ params }: Props) {
  const modelId = params.id;
  const { user } = useAuth();
  const canManage = userHasPermission(user, "ai.model.manage");
  const modelQuery = useRegistryModel(modelId);
  const publish = usePublishModel(modelId);
  const deprecate = useDeprecateModel(modelId);

  return (
    <WithPermission permission="ai.admin">
      <AiAdminShell>
        <ListPage
          title={modelQuery.data?.modelName ?? "Model details"}
          subtitle="Metadata, training lineage, and publish controls."
          action={<Button asChild variant="ghost"><Link href={adminAiPaths.models}>&larr; Registry</Link></Button>}
          isLoading={modelQuery.isLoading}
          isError={modelQuery.isError}
          onRetry={() => void modelQuery.refetch()}
          loadingRows={4}
        >
          {modelQuery.data ? (
            <ModelDetails
              model={modelQuery.data}
              basePath={ADMIN_AI_BASE}
              canManage={canManage}
              isBusy={publish.isPending || deprecate.isPending}
              onPublish={() => void publish.mutateAsync().then(() => toast.success("Published."))}
              onDeprecate={() => void deprecate.mutateAsync().then(() => toast.success("Deprecated."))}
            />
          ) : null}
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
