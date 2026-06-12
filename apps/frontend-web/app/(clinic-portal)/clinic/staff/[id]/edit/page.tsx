"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StaffEditForm } from "@/components/staff/StaffEditForm";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useClinicStaffMemberDetail } from "@/hooks/useClinicStaffMember";
import { WithPermission } from "@/lib/auth/withPermission";
import { parseStaffMemberFetchErrors } from "@/lib/clinic-staff-member-api-errors";
import { ApiError } from "@/lib/api-client";

type ClinicStaffEditPageProps = {
  params: { id: string };
};

export default function ClinicStaffEditPage({ params }: ClinicStaffEditPageProps) {
  const router = useRouter();
  const { data, isLoading, isError, error, refetch } = useClinicStaffMemberDetail(params.id);

  useEffect(() => {
    if (isLoading || !isError) {
      return;
    }

    const parsed = parseStaffMemberFetchErrors(error);

    if (parsed.forbidden || parsed.tenantMismatch) {
      router.replace("/forbidden");
      return;
    }

    if (parsed.notFound) {
      toast.error(parsed.message ?? "Staff member does not exist.");
      router.replace("/clinic/staff");
    }
  }, [error, isError, isLoading, router]);

  const staffName = data
    ? `${data.staff.firstName} ${data.staff.lastName}`.trim()
    : "staff member";

  return (
    <WithPermission permission="user.manage">
      <PageHeader
        title={data ? `Edit ${staffName}` : "Edit staff member"}
        subtitle="Update staff details, role, and location assignments."
        action={
          <Button asChild variant="ghost">
            <Link href="/clinic/staff">&larr; Back to staff</Link>
          </Button>
        }
      />

      {isLoading ? <PageLoading rows={4} /> : null}
      {isError && !(error instanceof ApiError) ? (
        <PageError onRetry={() => void refetch()} />
      ) : null}
      {!isLoading && !isError && data ? <StaffEditForm staff={data} /> : null}
    </WithPermission>
  );
}
