"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RoleCreateForm } from "@/components/roles/RoleCreateForm";
import { WithPermission } from "@/lib/auth/withPermission";

export default function ClinicRoleCreatePage() {
  return (
    <WithPermission permission="role.manage">
      <Button asChild variant="ghost">
        <Link href="/clinic/roles">&larr; Back to roles</Link>
      </Button>
      <RoleCreateForm />
    </WithPermission>
  );
}
