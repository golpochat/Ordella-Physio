"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AiAdminShell, TrainingJobForm } from "@/components/ai/admin";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { useCreateTrainingJob } from "@/hooks/useTrainingPortal";
import { adminAiPaths } from "@/lib/ai-admin-paths";
import { WithPermission } from "@/lib/auth/withPermission";

export default function AdminNewTrainingPage() {
  const router = useRouter();
  const createJob = useCreateTrainingJob();

  return (
    <WithPermission permission="ai.training.manage">
      <AiAdminShell>
        <ListPage
          title="New training job"
          subtitle="Configure dataset, provider, hyperparameters, and tuning."
          action={<Button asChild variant="ghost"><Link href={adminAiPaths.training}>&larr; Jobs</Link></Button>}
          isLoading={false}
          isError={false}
          loadingRows={0}
        >
          <TrainingJobForm
            isSubmitting={createJob.isPending}
            onSubmit={(payload) =>
              void createJob.mutateAsync(payload).then((job) => {
                toast.success("Training job queued.");
                router.push(adminAiPaths.trainingJob(job.id));
              })
            }
          />
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
