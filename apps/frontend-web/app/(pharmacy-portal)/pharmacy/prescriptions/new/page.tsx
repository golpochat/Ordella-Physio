"use client";

import { PharmacyPrescriptionForm } from "@/components/pharmacy-portal/prescription-form";
import { ListPage } from "@/components/dashboard/ListPage";

export default function PharmacyNewPrescriptionPage() {
  return (
    <ListPage
      title="New prescription"
      subtitle="Create a draft prescription for fulfillment."
      isLoading={false}
      isError={false}
    >
      <PharmacyPrescriptionForm mode="create" />
    </ListPage>
  );
}
