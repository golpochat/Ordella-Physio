"use client";

import Link from "next/link";
import { toast } from "sonner";
import { ExperimentEditor } from "@/components/ai/experiments/ExperimentEditor";
import { ExperimentResults } from "@/components/ai/experiments/ExperimentResults";
import { ExperimentVariantChart } from "@/components/ai/experiments/ExperimentVariantChart";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import {
  useAbExperiment,
  useAbExperimentResults,
  useCompleteAbExperiment,
  usePauseAbExperiment,
  useStartAbExperiment,
} from "@/hooks/useFeatureFlags";
import { WithPermission } from "@/lib/auth/withPermission";

type Props = { params: { id: string } };

export default function ClinicAbExperimentDetailPage({ params }: Props) {
  const experimentId = params.id;
  const experimentQuery = useAbExperiment(experimentId);
  const resultsQuery = useAbExperimentResults(experimentId);
  const start = useStartAbExperiment();
  const pause = usePauseAbExperiment();
  const complete = useCompleteAbExperiment();

  return (
    <WithPermission permission="ai.model.view">
      <ListPage
        title={experimentQuery.data?.name ?? "Experiment"}
        subtitle="Variants, audience, metrics, and results."
        action={
          <Button asChild variant="ghost"><Link href="/clinic/ai/experiments">&larr; Experiments</Link></Button>
        }
        isLoading={experimentQuery.isLoading}
        isError={experimentQuery.isError}
        onRetry={() => {
          void experimentQuery.refetch();
          void resultsQuery.refetch();
        }}
        loadingRows={5}
      >
        <ExperimentEditor
          experiment={experimentQuery.data ?? null}
          onStart={() => void start.mutateAsync(experimentId).then(() => toast.success("Started."))}
          onPause={() => void pause.mutateAsync(experimentId).then(() => toast.success("Paused."))}
          onComplete={() => void complete.mutateAsync(experimentId).then(() => toast.success("Completed."))}
        />
        <ExperimentResults report={resultsQuery.data} />
        <ExperimentVariantChart report={resultsQuery.data} />
      </ListPage>
    </WithPermission>
  );
}
