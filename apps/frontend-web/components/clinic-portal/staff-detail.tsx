"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/input";
import { useDeleteClinicStaff, useUpdateClinicStaffRole } from "@/hooks/useClinicPortal";
import type { ClinicStaffMember } from "@/lib/clinic-portal-types";
import { formatPortalDateTime } from "@/lib/clinic-portal-utils";

const STAFF_ROLES = ["OWNER", "ADMIN", "THERAPIST", "STAFF"] as const;

export type ClinicStaffDetailProps = {
  member: ClinicStaffMember;
  backHref: string;
  backLabel: string;
};

export function ClinicStaffDetail({ member, backHref, backLabel }: ClinicStaffDetailProps) {
  const router = useRouter();
  const [role, setRole] = useState(member.role);
  const updateRole = useUpdateClinicStaffRole(member.id);
  const deleteStaff = useDeleteClinicStaff();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>Team member</CardTitle>
            <Badge>{member.role}</Badge>
          </div>
        </CardHeader>
        <CardBody className="grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <p className="font-medium">User ID</p>
            <p className="text-muted-foreground">{member.userId}</p>
          </div>
          <div>
            <p className="font-medium">Staff ID</p>
            <p className="text-muted-foreground">{member.id}</p>
          </div>
          <div>
            <p className="font-medium">Created</p>
            <p className="text-muted-foreground">{formatPortalDateTime(member.createdAt)}</p>
          </div>
          <div>
            <p className="font-medium">Updated</p>
            <p className="text-muted-foreground">{formatPortalDateTime(member.updatedAt)}</p>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
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
          </div>
        </CardBody>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button
          disabled={updateRole.isPending || role === member.role}
          onClick={() => {
            updateRole.mutate(
              { role: role as (typeof STAFF_ROLES)[number] },
              {
                onSuccess: () => toast.success("Role updated"),
                onError: () => toast.error("Failed to update role"),
              },
            );
          }}
        >
          {updateRole.isPending ? "Saving..." : "Save role"}
        </Button>
        <Button
          variant="destructive"
          disabled={deleteStaff.isPending}
          onClick={() => {
            if (!window.confirm("Remove this team member from the clinic?")) {
              return;
            }
            deleteStaff.mutate(member.id, {
              onSuccess: () => {
                toast.success("Team member removed");
                router.push(backHref);
              },
              onError: () => toast.error("Failed to remove team member"),
            });
          }}
        >
          Remove
        </Button>
        <Button asChild variant="outline">
          <Link href={backHref}>{backLabel}</Link>
        </Button>
      </div>
    </div>
  );
}
