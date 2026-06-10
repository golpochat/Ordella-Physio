"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/input";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useClinicStaff, useUpdateClinicStaffRole } from "@/hooks/useClinicPortal";
import type { ClinicStaffMember } from "@/lib/clinic-portal-types";

const STAFF_ROLES = ["OWNER", "ADMIN", "THERAPIST", "STAFF"] as const;

function RoleRow({ member }: { member: ClinicStaffMember }) {
  const [role, setRole] = useState(member.role);
  const updateRole = useUpdateClinicStaffRole(member.id);

  return (
    <Card>
      <CardBody className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-medium">User {member.userId}</p>
            <Badge>{member.role}</Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Staff ID: {member.id}</p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-64">
          <Label htmlFor={`role-${member.id}`}>Assign role</Label>
          <select
            id={`role-${member.id}`}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={role}
            onChange={(event) => setRole(event.target.value)}
          >
            {STAFF_ROLES.map((entry) => (
              <option key={entry} value={entry}>
                {entry}
              </option>
            ))}
          </select>
          <Button
            size="sm"
            disabled={updateRole.isPending || role === member.role}
            onClick={() => {
              updateRole.mutate(
                { role: role as (typeof STAFF_ROLES)[number] },
                {
                  onSuccess: () => toast.success("Role assigned"),
                  onError: () => toast.error("Failed to assign role"),
                },
              );
            }}
          >
            {updateRole.isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

export function ClinicRoleAssignment() {
  const { data, isLoading, isError, refetch } = useClinicStaff();

  if (isLoading) {
    return <PageLoading rows={4} />;
  }

  if (isError) {
    return <PageError onRetry={() => void refetch()} />;
  }

  const members = data ?? [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Role assignments</CardTitle>
          <CardDescription>
            Assign clinic roles to staff members. Full role API integration is placeholder until the
            dedicated roles service is available.
          </CardDescription>
        </CardHeader>
      </Card>

      {!members.length ? (
        <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          <p className="font-medium text-foreground">No staff members</p>
          <p className="mt-2">Add staff or therapists before assigning roles.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {members.map((member) => (
            <RoleRow key={member.id} member={member} />
          ))}
        </div>
      )}
    </div>
  );
}
