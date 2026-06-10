"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useCreateClinicStaff } from "@/hooks/useClinicPortal";
import type { CreateClinicStaffPayload } from "@/lib/clinic-portal-types";

export type ClinicStaffCreateFormProps = {
  defaultRole: CreateClinicStaffPayload["role"];
  title: string;
  description: string;
  successRedirect: string;
};

export function ClinicStaffCreateForm({
  defaultRole,
  title,
  description,
  successRedirect,
}: ClinicStaffCreateFormProps) {
  const router = useRouter();
  const createStaff = useCreateClinicStaff();
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState<CreateClinicStaffPayload["role"]>(defaultRole);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardBody>
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (!userId.trim()) {
              toast.error("User ID is required");
              return;
            }
            createStaff.mutate(
              { userId: userId.trim(), role },
              {
                onSuccess: () => {
                  toast.success("Team member added");
                  router.push(successRedirect);
                },
                onError: () => toast.error("Failed to add team member"),
              },
            );
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="userId">User ID</Label>
            <Input
              id="userId"
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              placeholder="Existing user UUID"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={role}
              onChange={(event) =>
                setRole(event.target.value as CreateClinicStaffPayload["role"])
              }
            >
              <option value="THERAPIST">THERAPIST</option>
              <option value="STAFF">STAFF</option>
              <option value="ADMIN">ADMIN</option>
              <option value="OWNER">OWNER</option>
            </select>
          </div>
          <Button type="submit" disabled={createStaff.isPending}>
            {createStaff.isPending ? "Adding..." : "Add member"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
