"use client";

import Link from "next/link";
import { ModelRegistryList } from "@/components/ai/models/ModelRegistryList";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { useModelRegistry } from "@/hooks/useTrainingPortal";
import { WithPermission } from "@/lib/auth/withPermission";

export default function ClinicAiModelsPage() {
  const { data, isLoading, isError, refetch } = useModelRegistry();

  return (
    <WithPermission permission="ai.model.view">
      <ListPage
        title="Model Registry"
        subtitle="Published and draft models from completed training jobs."
        action={
          <Button asChild variant="ghost">
            <Link href="/clinic/ai/training">Training jobs</Link>
          </Button>
        }
        isLoading={isLoading}
        isError={isError}
        onRetry={() => void refetch()}
        loadingRows={5}
      >
        <ModelRegistryList models={data ?? []} />
      </ListPage>
    </WithPermission>
  );
}
