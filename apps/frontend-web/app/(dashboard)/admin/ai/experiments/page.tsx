"use client";

import Link from "next/link";
import { useMemo } from "react";
import { AiAdminShell } from "@/components/ai/admin";
import { ExperimentList } from "@/components/ai/training/ExperimentList";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import { useTrainingExperiments, useTrainingJobs } from "@/hooks/useTrainingPortal";
import { ADMIN_AI_BASE, adminAiPaths } from "@/lib/ai-admin-paths";
import { WithPermission } from "@/lib/auth/withPermission";

function JobExperiments({ jobId }: { jobId: string }) {
  const { data } = useTrainingExperiments(jobId);
  if (!data?.length) return null;
  return <ExperimentList jobId={jobId} experiments={data} basePath={ADMIN_AI_BASE} />;
}

export default function AdminExperimentsPage() {
  const jobsQuery = useTrainingJobs();
  const jobs = jobsQuery.data ?? [];
  const running = useMemo(() => jobs.filter((j) => j.status === "RUNNING"), [jobs]);

  return (
    <WithPermission permission="ai.admin">
      <AiAdminShell>
        <ListPage
          title="Experiments"
          subtitle="Track hyperparameter runs across training jobs."
          action={<Button asChild variant="ghost"><Link href={adminAiPaths.training}>&larr; Training</Link></Button>}
          isLoading={jobsQuery.isLoading}
          isError={jobsQuery.isError}
          onRetry={() => void jobsQuery.refetch()}
          loadingRows={4}
        >
          <DataTable columns={["Job", "Status", "Model", "Actions"]} grid="default" isEmpty={!jobs.length} emptyMessage="No training jobs.">
            {jobs.map((job) => (
              <Row key={job.id}>
                <div>{job.id.slice(0, 10)}…</div>
                <div>{job.status}</div>
                <div>{job.baseModel}</div>
                <div>
                  <Link href={adminAiPaths.trainingJob(job.id)} className="dashboard-link">Open job</Link>
                </div>
              </Row>
            ))}
          </DataTable>
          {running.map((job) => (
            <section key={job.id} className="training-dashboard-section">
              <h3>Job {job.id.slice(0, 8)}…</h3>
              <JobExperiments jobId={job.id} />
            </section>
          ))}
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
