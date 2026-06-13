"use client";

import Link from "next/link";
import { AIDashboardStats, AiAdminShell } from "@/components/ai/admin";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { useAiAdminDashboard } from "@/hooks/useAiAdminDashboard";
import { adminAiPaths } from "@/lib/ai-admin-paths";
import { WithPermission } from "@/lib/auth/withPermission";

export default function AdminAiDashboardPage() {
  const { stats, isLoading } = useAiAdminDashboard();

  return (
    <WithPermission permission="ai.admin">
      <AiAdminShell>
        <ListPage
          title="AI Platform"
          subtitle="Datasets, training, models, evaluation, promotion, and drift monitoring."
          isLoading={isLoading}
          isError={false}
          loadingRows={4}
        >
          <AIDashboardStats {...stats} />
          <div className="ai-admin-quick-links">
            <Button asChild variant="secondary">
              <Link href={adminAiPaths.datasets}>Manage datasets</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={adminAiPaths.trainingNew}>New training job</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={adminAiPaths.models}>Model registry</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={adminAiPaths.drift}>Drift monitoring</Link>
            </Button>
          </div>
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
