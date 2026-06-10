"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlatformUserDetail } from "@/components/super-admin-portal/user-detail";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { usePlatformUser } from "@/hooks/useSuperAdminPortal";

type SuperAdminUserDetailPageProps = {
  params: { id: string };
};

export default function SuperAdminUserDetailPage({ params }: SuperAdminUserDetailPageProps) {
  const searchParams = useSearchParams();
  const tenantId = searchParams.get("tenantId") ?? undefined;
  const { data, isLoading, isError, refetch } = usePlatformUser(params.id, tenantId);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost">
        <Link href="/super-admin/users">&larr; Back to users</Link>
      </Button>

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? <PlatformUserDetail user={data} /> : null}
      {!isLoading && !isError && !data ? <PageError message="User not found." /> : null}
    </div>
  );
}
