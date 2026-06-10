"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useCreatePlatformRole } from "@/hooks/useSuperAdminPortal";

export function PlatformRoleCreateForm() {
  const router = useRouter();
  const createRole = useCreatePlatformRole();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create role</CardTitle>
        <CardDescription>
          Define a custom platform role. Built-in roles are managed separately.
        </CardDescription>
      </CardHeader>
      <CardBody>
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            createRole.mutate(
              { name, description },
              {
                onSuccess: (role) => {
                  toast.success("Role created");
                  router.push(`/super-admin/roles/${role.id}`);
                },
                onError: () =>
                  toast.error("Unable to create role. The roles API may not be available yet."),
              },
            );
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="name">Role name</Label>
            <Input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <Button type="submit" disabled={createRole.isPending}>
            {createRole.isPending ? "Creating..." : "Create role"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
