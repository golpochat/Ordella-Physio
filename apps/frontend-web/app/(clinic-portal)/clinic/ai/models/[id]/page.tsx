"use client";

import Link from "next/link";
import { toast } from "sonner";
import { ModelDetails } from "@/components/ai/models/ModelDetails";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import {
  useDeprecateModel,
  usePublishModel,
  useRegistryModel,
} from "@/hooks/useTrainingPortal";
import { useAuth } from "@/hooks/useAuth";
import { userHasPermission } from "@/lib/auth/permissions";
import { WithPermission } from "@/lib/auth/withPermission";

type ModelDetailPageProps = {
  params: { id: string };
};

export default function ModelDetailPage({ params }: ModelDetailPageProps) {
  const modelId = params.id;
  const { user } = useAuth();
  const canManage = userHasPermission(user, "ai.model.manage");
  const modelQuery = useRegistryModel(modelId);
  const publish = usePublishModel(modelId);
  const deprecate = useDeprecateModel(modelId);

  async function handlePublish() {
    try {
      await publish.mutateAsync();
      toast.success("Model published for inference.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to publish model.");
    }
  }

  async function handleDeprecate() {
    try {
      await deprecate.mutateAsync();
      toast.success("Model deprecated.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to deprecate model.");
    }
  }

  return (
    <WithPermission permission="ai.model.view">
      <ListPage
        title={modelQuery.data?.modelName ?? "Model details"}
        subtitle="Metadata, training lineage, and publish controls."
        action={
          <Button asChild variant="ghost">
            <Link href="/clinic/ai/models">&larr; Registry</Link>
          </Button>
        }
        isLoading={modelQuery.isLoading}
        isError={modelQuery.isError}
        onRetry={() => void modelQuery.refetch()}
        loadingRows={4}
      >
        {modelQuery.data ? (
          <ModelDetails
            model={modelQuery.data}
            canManage={canManage}
            isBusy={publish.isPending || deprecate.isPending}
            onPublish={() => void handlePublish()}
            onDeprecate={() => void handleDeprecate()}
          />
        ) : null}
      </ListPage>
    </WithPermission>
  );
}
