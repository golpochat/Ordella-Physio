"use client";

import { PrescriptionIssueForm } from "@/components/clinic-pharmacy/prescription-form";
import { ListPage } from "@/components/dashboard/ListPage";
import { WithPermission } from "@/lib/auth/withPermission";

export default function ClinicPharmacyNewPage() {
  return (
    <WithPermission permission="prescriptions.create">
      <ListPage
        title="Issue prescription"
        subtitle="Create a draft prescription for therapist review and issuance."
      >
        <PrescriptionIssueForm />
      </ListPage>
    </WithPermission>
  );
}
