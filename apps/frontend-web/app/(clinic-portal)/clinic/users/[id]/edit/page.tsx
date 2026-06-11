"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageLoading } from "@/components/patient-portal/page-state";
import { UserEditForm } from "@/components/users/UserEditForm";
import { useClinicUser } from "@/hooks/useClinicPortal";
import { useTenant } from "@/hooks/useTenant";
import { WithPermission } from "@/lib/auth/withPermission";
import { parseUserUpdateErrors } from "@/lib/user-api-errors";
import { useAuthStore } from "@/store/auth.store";
import { isSystemRole } from "@/lib/auth/roleRedirect";

export default function ClinicUserEditPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const userId = params.id;
  const actorRole = useAuthStore((state) => state.user?.role);
  const { tenantId } = useTenant();
  const { data: user, isLoading, isError, error } = useClinicUser(userId);

  useEffect(() => {
    if (!error) {
      return;
    }

    const parsed = parseUserUpdateErrors(error);
    if (parsed.tenantMismatch) {
      router.replace("/forbidden");
      return;
    }

    if (parsed.notFound) {
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

      {isLoading ? <PageLoading rows={6} /> : null}

      {!isLoading && isError ? (
        <p className="tenant-create-form-error">Unable to load user. Please try again.</p>
      ) : null}

      {!isLoading && user ? <UserEditForm user={user} /> : null}
    </WithPermission>
  );
}
