"use client";

import Link from "next/link";
import { PrescriptionListTable } from "@/components/clinic-pharmacy/prescription-list";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { useClinicPrescriptions } from "@/hooks/useClinicPharmacy";
import { WithPermission } from "@/lib/auth/withPermission";
import { adminRoutes } from "@/lib/routes";

export default function ClinicPharmacyPage() {
  const { data, isLoading, isError, refetch } = useClinicPrescriptions();

  return (
    <WithPermission permission="prescriptions.read">
      <ListPage
        title="Pharmacy"
        subtitle="Manage prescriptions and fulfillment workflows."
        action={
          <WithPermission permission="prescriptions.create">
            <Button asChild className="btn-primary">
              <Link href={adminRoutes.pharmacyNew}>New prescription</Link>
            </Button>
          </WithPermission>
        }
        isLoading={isLoading}
        isError={isError}
        onRetry={() => void refetch()}
      >
        <PrescriptionListTable prescriptions={data ?? []} />
      </ListPage>
    </WithPermission>
  );
}
