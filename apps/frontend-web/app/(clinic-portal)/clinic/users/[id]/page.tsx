"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { UserDetail } from "@/components/users/UserDetail";
import { useClinicUser } from "@/hooks/useClinicPortal";
import { useTenant } from "@/hooks/useTenant";
import { WithPermission } from "@/lib/auth/withPermission";
import { isSystemRole } from "@/lib/auth/roleRedirect";
import { parseUserStatusActionErrors, parseUserUpdateErrors } from "@/lib/user-api-errors";
import { useAuthStore } from "@/store/auth.store";

export default function ClinicUserDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const userId = params.id;
  const actorRole = useAuthStore((state) => state.user?.role);
  const { tenantId } = useTenant();
  const { data: user, isLoading, isError, error, refetch } = useClinicUser(userId);

  useEffect(() => {
    if (!error) {
      return;
    }

    const statusResult = parseUserStatusActionErrors(error);
    const updateResult = parseUserUpdateErrors(error);
    const notFound = statusResult.notFound || updateResult.notFound;
    const tenantMismatch = statusResult.tenantMismatch || updateResult.tenantMismatch;

    if (tenantMismatch) {
      router.replace("/forbidden");
      return;
    }

    if (notFound) {
      toast.error("User not found.");
      router.replace("/clinic/users");
    }
  }, [error, router]);

  useEffect(() => {
    if (!user || isSystemRole(actorRole) || !tenantId) {
      return;
    }

    if (user.tenantId !== tenantId) {
      router.replace("/forbidden");
    }
  }, [actorRole, router, tenantId, user]);

  return (
    <WithPermission permission="user.manage">
      <Button asChild variant="ghost">
        <Link href="/clinic/users">&larr; Back to users</Link>
      </Button>

      {isLoading ? <PageLoading rows={4} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && user ? <UserDetail user={user} /> : null}
      {!isLoading && !isError && !user ? <PageError message="User not found." /> : null}
    </WithPermission>
  );
}
