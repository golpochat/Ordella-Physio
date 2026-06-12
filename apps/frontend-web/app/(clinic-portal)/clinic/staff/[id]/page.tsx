"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { StaffStatusActions } from "@/components/staff/StaffStatusActions";
import { StaffStatusBadge } from "@/components/staff/StaffStatusBadge";
import { useClinicStaffMemberDetail } from "@/hooks/useClinicStaffMember";
import { WithPermission } from "@/lib/auth/withPermission";
import { parseStaffMemberFetchErrors } from "@/lib/clinic-staff-member-api-errors";
import type { ClinicStaffMemberRecord } from "@/lib/clinic-staff-member-types";
import { ApiError } from "@/lib/api-client";

type ClinicStaffDetailPageProps = {
  params: { id: string };
};

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ClinicStaffDetailPage({ params }: ClinicStaffDetailPageProps) {
  const router = useRouter();
  const { data, isLoading, isError, error, refetch } = useClinicStaffMemberDetail(params.id);
  const [staff, setStaff] = useState<ClinicStaffMemberRecord | null>(null);

  useEffect(() => {
    if (data?.staff) {
      setStaff(data.staff);
    }
  }, [data]);

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

  const staffName = staff ? `${staff.firstName} ${staff.lastName}`.trim() : "Staff member";

  const locationLabels = (data?.locations ?? [])
    .map((location) => location.name ?? location.code ?? location.locationId)
    .join(", ");

  return (
    <WithPermission permission="user.manage">
      <PageHeader
        title={staff ? staffName : "Staff member"}
        subtitle="Staff profile and assignments."
        action={
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="ghost">
              <Link href="/clinic/staff">&larr; Back to staff</Link>
            </Button>
            {staff ? (
              <>
                <Button asChild variant="outline">
                  <Link href={`/clinic/staff/${params.id}/config`}>Configuration</Link>
                </Button>
                <Button asChild>
                  <Link href={`/clinic/staff/${params.id}/edit`}>Edit</Link>
                </Button>
              </>
            ) : null}
          </div>
        }
      />

      {isLoading ? <PageLoading rows={3} /> : null}
      {isError && !(error instanceof ApiError) ? (
        <PageError onRetry={() => void refetch()} />
      ) : null}
      {!isLoading && !isError && staff && data ? (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle>{staffName}</CardTitle>
                <StaffStatusBadge status={staff.status} />
              </div>
            </CardHeader>
            <CardBody className="grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <p className="font-medium">Email</p>
                <p className="text-muted-foreground">{staff.email}</p>
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-muted-foreground">{staff.phone ?? "—"}</p>
              </div>
              <div>
                <p className="font-medium">Staff type</p>
                <p className="text-muted-foreground">{staff.staffType}</p>
              </div>
              <div>
                <p className="font-medium">Status</p>
                <StaffStatusBadge status={staff.status} />
              </div>
              <div className="sm:col-span-2">
                <p className="font-medium">Locations</p>
                <p className="text-muted-foreground">{locationLabels || "—"}</p>
              </div>
              <div>
                <p className="font-medium">Created</p>
                <p className="text-muted-foreground">{formatDate(staff.createdAt)}</p>
              </div>
              <div>
                <p className="font-medium">Updated</p>
                <p className="text-muted-foreground">{formatDate(staff.updatedAt)}</p>
              </div>
            </CardBody>
          </Card>

          <StaffStatusActions staff={staff} onStatusChange={setStaff} />
        </div>
      ) : null}
    </WithPermission>
  );
}
