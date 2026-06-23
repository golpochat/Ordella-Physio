"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/clinic-ui/confirm-dialog";
import { useDeleteClinicRole } from "@/hooks/useUserRolePortal";
import { parseRoleDeleteErrors } from "@/lib/user-role-api-errors";
import type { ClinicRole } from "@/lib/user-role-portal-types";

export type RoleDeleteButtonProps = {
  role: ClinicRole;
};

export function RoleDeleteButton({ role }: RoleDeleteButtonProps) {
  const router = useRouter();
  const deleteRole = useDeleteClinicRole(role.id);
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (role.isSystem) {
    return null;
  }

  function handleConfirm() {
    deleteRole.mutate(undefined, {
      onSuccess: (response) => {
        setConfirmOpen(false);
        toast.success(response.message ?? "Role deleted successfully.");
        router.push("/clinic/roles");
      },
      onError: (error) => {
        const result = parseRoleDeleteErrors(error);

        if (result.forbidden || result.tenantMismatch) {
          setConfirmOpen(false);
          router.replace("/forbidden");
          return;
        }

        if (result.notFound) {
          setConfirmOpen(false);
          toast.error(result.message ?? "Role does not exist.");
          router.push("/clinic/roles");
          return;
        }

        if (result.systemRole || result.assignedToUsers) {
          toast.error(result.message);
          return;
        }

        toast.error(result.message ?? "Failed to delete role.");
      },
    });
  }

  return (
    <>
      <Button variant="destructive" disabled={deleteRole.isPending} onClick={() => setConfirmOpen(true)}>
        Delete Role
      </Button>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete Role?"
        description="Are you sure you want to delete this role? This action cannot be undone."
        confirmLabel="Delete role"
        destructive
        loading={deleteRole.isPending}
        onConfirm={handleConfirm}
      />
    </>
  );
}
