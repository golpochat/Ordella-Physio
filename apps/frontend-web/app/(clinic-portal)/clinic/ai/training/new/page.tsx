"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TrainingJobForm } from "@/components/ai/training/TrainingJobForm";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { useCreateTrainingJob } from "@/hooks/useTrainingPortal";
import { WithPermission } from "@/lib/auth/withPermission";

export default function NewTrainingJobPage() {
  const router = useRouter();
  const createJob = useCreateTrainingJob();

  async function handleSubmit(payload: Parameters<typeof createJob.mutateAsync>[0]) {
    try {
      const job = await createJob.mutateAsync(payload);
      toast.success("Training job queued.");
      router.push(`/clinic/ai/training/${job.id}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create training job.");
    }
  }

  return (
    <WithPermission permission="ai.training.manage">
      <ListPage
        title="New training job"
        subtitle="Select a dataset version, configure hyperparameters, and queue fine-tuning."
        action={
          <Button asChild variant="ghost">
            <Link href="/clinic/ai/training">&larr; Back to jobs</Link>
          </Button>
        }
        isLoading={false}
        isError={false}
        loadingRows={0}
      >
        <TrainingJobForm
          isSubmitting={createJob.isPending}
          onSubmit={(payload) => void handleSubmit(payload)}
        />
      </ListPage>
    </WithPermission>
  );
}
