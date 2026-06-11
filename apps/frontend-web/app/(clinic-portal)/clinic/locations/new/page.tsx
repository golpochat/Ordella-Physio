"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WithPermission } from "@/lib/auth/withPermission";
import { LocationCreateForm } from "@/components/locations/LocationCreateForm";

export default function ClinicLocationCreatePage() {
  return (
    <WithPermission permission="location.manage">
      <Button asChild variant="ghost">
        <Link href="/clinic/locations">&larr; Back to locations</Link>
      </Button>
      <LocationCreateForm />
    </WithPermission>
  );
}
