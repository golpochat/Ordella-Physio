"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { StaffConfigEditor } from "@/components/staff/StaffConfigEditor";
import {
  useClinicStaffConfigNamespaces,
  useClinicStaffMemberDetail,
} from "@/hooks/useClinicStaffMember";
import { WithPermission } from "@/lib/auth/withPermission";
import {
  parseStaffMemberConfigErrors,
  parseStaffMemberFetchErrors,
} from "@/lib/clinic-staff-member-api-errors";
import { ApiError } from "@/lib/api-client";

type ClinicStaffConfigPageProps = {
  params: { id: string };
};

export default function ClinicStaffConfigPage({ params }: ClinicStaffConfigPageProps) {
  const router = useRouter();
  const staffQuery = useClinicStaffMemberDetail(params.id);
  const namespacesQuery = useClinicStaffConfigNamespaces(params.id);

  const isLoading = staffQuery.isLoading || namespacesQuery.isLoading;
  const loadError = staffQuery.error ?? namespacesQuery.error;

  const staffName = staffQuery.data?.staff
    ? `${staffQuery.data.staff.firstName} ${staffQuery.data.staff.lastName}`.trim()
    : "Staff member";

  useEffect(() => {
    if (isLoading || !loadError) {
      return;
    }

    const parsed =
      loadError === staffQuery.error
        ? parseStaffMemberFetchErrors(loadError)
        : parseStaffMemberConfigErrors(loadError);

    if ("forbidden" in parsed && (parsed.forbidden || parsed.tenantMismatch)) {
      router.replace("/forbidden");
      return;
    }

    if ("notFound" in parsed && parsed.notFound) {
      const errorMessage = "message" in parsed ? parsed.message : parsed.generalError;
      toast.error(errorMessage ?? "Staff member does not exist.");
      router.replace("/clinic/staff");
    }
  }, [isLoading, loadError, staffQuery.error, router]);

  useEffect(() => {
    if (!staffQuery.isLoading && !staffQuery.isError && !staffQuery.data) {
      toast.error("Staff member does not exist.");
      router.replace("/clinic/staff");
    }
  }, [staffQuery.data, staffQuery.isError, staffQuery.isLoading, router]);

  return (
    <WithPermission permission="user.manage">
      <PageHeader
        title={staffQuery.data?.staff ? `Configuration — ${staffName}` : "Staff configuration"}
        subtitle="Manage preferences, working hours, features, and restrictions for this staff member."
        action={
          <Button asChild variant="ghost">
            <Link href={`/clinic/staff/${params.id}`}>&larr; Back to staff</Link>
          </Button>
        }
      />

      {isLoading ? <PageLoading rows={4} /> : null}
      {loadError && !isLoading && !(loadError instanceof ApiError) ? (
        <PageError
          onRetry={() => {
            void staffQuery.refetch();
            void namespacesQuery.refetch();
          }}
        />
      ) : null}
      {!isLoading && !loadError && staffQuery.data ? (
        <StaffConfigEditor
          staffId={params.id}
          staffName={staffName}
          onForbidden={() => router.replace("/forbidden")}
          onNotFound={() => {
            toast.error("Staff member does not exist.");
            router.replace("/clinic/staff");
          }}
        />
      ) : null}
    </WithPermission>
  );
}
