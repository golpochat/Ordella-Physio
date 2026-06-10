"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody } from "@/components/ui/card";
import type { ClinicStaffMember } from "@/lib/clinic-portal-types";

export type ClinicStaffListProps = {
  members: ClinicStaffMember[];
  basePath: string;
  emptyTitle?: string;
  emptyDescription?: string;
};

export function ClinicStaffList({
  members,
  basePath,
  emptyTitle = "No members found",
  emptyDescription = "Add team members to get started.",
}: ClinicStaffListProps) {
  if (!members.length) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
        <p className="font-medium text-foreground">{emptyTitle}</p>
        <p className="mt-2">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {members.map((member) => (
        <Card key={member.id}>
          <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium">User {member.userId}</p>
                <Badge>{member.role}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Staff ID: {member.id}</p>
            </div>
            <Link
              href={`${basePath}/${member.id}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              View details
            </Link>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
