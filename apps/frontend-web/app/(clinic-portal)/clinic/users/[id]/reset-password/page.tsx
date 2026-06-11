"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { AdminResetPasswordForm } from "@/components/users/AdminResetPasswordForm";
import { useClinicUser } from "@/hooks/useClinicPortal";
import { useTenant } from "@/hooks/useTenant";
import { WithPermission } from "@/lib/auth/withPermission";
import { isSystemRole } from "@/lib/auth/roleRedirect";
import { parseUserUpdateErrors } from "@/lib/user-api-errors";
import { useAuthStore } from "@/store/auth.store";

export default function ClinicUserResetPasswordPage() {
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

    const result = parseUserUpdateErrors(error);
    if (result.tenantMismatch) {
      router.replace("/forbidden");
      return;
    }

    if (result.notFound) {
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
        <Link href={`/clinic/users/${userId}`}>&larr; Back to user</Link>
      </Button>

      {isLoading ? <PageLoading rows={4} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && user ? <AdminResetPasswordForm user={user} /> : null}
      {!isLoading && !isError && !user ? <PageError message="User not found." /> : null}
    </WithPermission>
  );
}
